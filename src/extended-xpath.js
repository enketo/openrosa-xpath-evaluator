var {isNamespaceExpr, handleNamespaceExpr} = require('./utils/ns');
const dbg = require('./dbg');
var {handleOperation} = require('./utils/operation');
var {preprocessNativeArgs} = require('./utils/native');
var {toSnapshotResult} = require('./utils/result');
var {preprocessInput} = require('./utils/input');
var {asBoolean, asNumber, asString} = require('./utils/xpath-cast');
/*
 * From http://www.w3.org/TR/xpath/#section-Expressions XPath infix
 * operator precedence is left-associative, and as follows:
 */
var OP_PRECEDENCE = [
  ['|'],
  ['&'],
  ['=', '!='],
  ['<', '<=', '>=', '>'],
  ['+', '-'],
  ['*', '/', '%'],
  ['union'],
];

var DIGIT = /[0-9]/;
var FUNCTION_NAME = /^[a-z]/;

var INVALID_ARGS = new Error('invalid args');

// TODO remove all the checks for cur.t==='?' - what else woudl it be?
var ExtendedXPathEvaluator = function(wrapped, extensions) {
  var
    extendedFuncs = extensions.func || {},
    extendedProcessors = extensions.process || {},
    toInternalResult = function(r) {
      dbg('toInternalResult()', { resultType:r.resultType });
      var n, v;
      if(r.resultType === XPathResult.NUMBER_TYPE)  return { t:'num',  v:r.numberValue  };
      if(r.resultType === XPathResult.BOOLEAN_TYPE) return { t:'bool', v:r.booleanValue };
      if(r.resultType === XPathResult.STRING_TYPE)  return { t:'str',  v:r.stringValue  };
      if( r.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE ||
          r.resultType === XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
        v = [];
        while((n = r.iterateNext())) v.push(n);
        return { t:'arr', v:v };
      }
      if( r.resultType === XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE ||
          r.resultType === XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
        v = [];
        for(let i=0; i<r.snapshotLength; ++i) {
          v.push(r.snapshotItem(i));
        }
        return { t:'arr', v:v };
      }
      if( r.resultType === XPathResult.ANY_UNORDERED_NODE_TYPE ||
          r.resultType === XPathResult.FIRST_ORDERED_NODE_TYPE) {
        return { t:'arr', v:[r.singleNodeValue] };
      }
      throw new Error(`no handling for result type: ${r.resultType}`);
    },
    toExternalResult = function(r, rt) {
      dbg('toExternalResult()', { r, rt });
      if(extendedProcessors.toExternalResult) {
        var res = extendedProcessors.toExternalResult(r);
        if(res) return res;
      }

      switch(rt) {
        case null:
        case undefined:
        case XPathResult.ANY_TYPE:
          // don't convert
          switch(r.t) {
            case 'num':  return { resultType:XPathResult.NUMBER_TYPE,  numberValue:r.v,  stringValue:r.v.toString() };
            case 'str':  return { resultType:XPathResult.BOOLEAN_TYPE, stringValue:r.v };
            case 'bool': return { resultType:XPathResult.BOOLEAN_TYPE, booleanValue:r.v, stringValue:r.v.toString() };
            case 'arr':  return toSnapshotResult(r.v, rt);
            default: throw new Error('unrecognised internal type: ' + r.t);
          }
        case XPathResult.NUMBER_TYPE:  return { resultType:rt, numberValue: asNumber(r),  stringValue:r.v.toString() };
        case XPathResult.STRING_TYPE:  return { resultType:rt, stringValue: asString(r)  };
        case XPathResult.BOOLEAN_TYPE: return { resultType:rt, booleanValue:asBoolean(r), stringValue:r.v.toString() };
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
        case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
        case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
        case XPathResult.ANY_UNORDERED_NODE_TYPE:
        case XPathResult.FIRST_ORDERED_NODE_TYPE:
          return toSnapshotResult(r.v, rt);
        default: throw new Error('unrecognised return type:', rt);
      }
    },
    callFn = function(cN, name, supplied) {
      dbg('callFn()', { cN, name, supplied });
      // Every second arg should be a comma, but we allow for a trailing comma.
      // From the spec, this looks valid, if you assume that ExprWhitespace is a
      // valid Expr.
      // see: https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Function-Calls
      var args = [], i;
      for(i=0; i<supplied.length; ++i) {
        if(i % 2) {
          if(supplied[i] !== ',') throw new Error('Weird args (should be separated by commas):' + JSON.stringify(supplied));
        } else args.push(supplied[i]);
      }

      if(extendedFuncs.hasOwnProperty(name)) {
        return extendedFuncs[name].apply(cN, args);
      }

      return callNative(name, preprocessNativeArgs(name, args));
    },
    callNative = function(name, args) {
      dbg('callNative', { name, args });
      var argString = '', arg, quote, i;
      for(i=0; i<args.length; ++i) {
        arg = args[i];
        if(arg.t !== 'num' && arg.t !== 'bool') {
          quote = arg.v.indexOf('"') === -1 ? '"' : "'";
          argString += quote;
        }
        argString += arg.v;
        if(arg.t === 'arr') throw new Error(`callNative() can't handle nodeset functions yet for ${name}()`);
        if(arg.t === 'bool') argString += '()';
        if(arg.t !== 'num' && arg.t !== 'bool') argString += quote;
        if(i < args.length - 1) argString += ', ';
      }
      const expr = name + '(' + argString + ')';
      dbg('callNative()', { expr });
      return toInternalResult(wrapped(expr));
    },
    typefor = function(val) {
      if(extendedProcessors.typefor) {
        var res = extendedProcessors.typefor(val);
        if(res) return res;
      }
      if(typeof val === 'boolean') return 'bool';
      if(typeof val === 'number') return 'num';
      return 'str';
    };

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate
   */
  this.evaluate = function(input, cN, nR, rT) {
    input = preprocessInput(input);
    if(isNamespaceExpr(input)) return handleNamespaceExpr(input, cN);
    dbg('evaluate() nR:', nR);

    var i, cur, stack = [{ t:'root', tokens:[] }],
      peek = function() { return stack[stack.length-1]; },
      err = function(message) { throw new Error((message||'') + ' [stack=' + JSON.stringify(stack) + '] [cur=' + JSON.stringify(cur) + ']'); },
      newCurrent = function() { cur = { t:'?', v:'' }; },
      pushOp = function(t) {
        peek().tokens.push({ t:'op', v:t });
        newCurrent();
      },
      evalOp = function(lhs, op, rhs) {
        if(extendedProcessors.handleInfix) {
          var res = extendedProcessors.handleInfix(err, lhs, op, rhs);
          if(res && res.t === 'continue') {
            lhs = res.lhs; op = res.op; rhs = res.rhs; res = null;
          }

          if(typeof res !== 'undefined' && res !== null) return res;
        }
        return handleOperation(lhs, op, rhs);
      },
      evalOpAt = function(tokens, opIndex) {
        var res = evalOp(
            tokens[opIndex - 1],
            tokens[opIndex],
            tokens[opIndex + 1]);

        if(typeof res !== 'undefined' && res !== null) {
          tokens.splice(opIndex, 2);
          tokens[opIndex - 1] = { t:typefor(res), v:res };
        }
      },
      backtrack = function() {
        // handle infix operators
        var i, j, ops, tokens;
        tokens = peek().tokens;
        for(j=OP_PRECEDENCE.length-1; j>=0; --j) {
          ops = OP_PRECEDENCE[j];
          i = 1;
          while(i < tokens.length-1) {
            if(tokens[i].t === 'op' && ops.indexOf(tokens[i].v) !== -1) {
              evalOpAt(tokens, i);
            } else ++i;
          }
        }
      },
      handleXpathExpr = function(returnType) {
        var expr = cur.v;
        var tokens = peek().tokens;
        dbg('handleXpathExpr()', { returnType, expr, stack, tokens, cur });
        if(tokens.length && tokens[tokens.length-1].t === 'arr') {
          dbg('handleXpathExpr()', 'new handling...');
          // chop the leading slash from expr
          if(expr.charAt(0) !== '/') throw new Error(`not sure how to handle expression called on nodeset that doesn't start with a '/': ${expr}`);
          expr = new XPathEvaluator().createExpression(expr.substring(1)); // TODO can we cache this evaluator?  Can we use it instead of `wrapped`?
          const newNodeset = [];
          tokens[tokens.length-1].v.map(node => {
            const res = toInternalResult(expr.evaluate(node));
            dbg('handleXpathExpr()', { res });
            newNodeset.push(...res.v);
          });
          tokens[tokens.length-1].v = newNodeset;
          //throw new Error('handleXpathExpr() should evaluate within the context of the nodeset: ' + expr);
        } else {
          dbg('handleXpathExpr()', 'classic handling...');
          var evaluated = toInternalResult(wrapped(expr, cN, nR, returnType));

          peek().tokens.push(evaluated);
        }
        newCurrent();
      },
      nextChar = function() {
        return input.charAt(i+1);
      },
      finaliseNum = function() {
        cur.v = parseFloat(cur.string);
        peek().tokens.push(cur);
        newCurrent();
      },
      prevToken = function() {
        var peeked = peek().tokens;
        return peeked[peeked.length - 1];
      },
      isNum = function(c) {
        return c >= '0' && c <= '9';
      };

    newCurrent();

    for(i=0; i<input.length; ++i) {
      var c = input.charAt(i);
      if(cur.sq) {
        cur.v += c;
        if(c === ']') --cur.sq;
        else if(c === '[') ++cur.sq;
        continue;
      }
      if(cur.t === 'str') {
        if(c === cur.quote) {
          peek().tokens.push(cur);
          newCurrent();
        } else cur.v += c;
        continue;
      }
      if(cur.t === 'num') {
        if(DIGIT.test(c) || c === 'e' ||
            (c === '-' && input[i-1] === 'e')) {
          cur.string += c;
          continue;
        } else if(c === ' ' && cur.string === '-') {
          continue;
        } else if(c === '.' && !cur.decimal) {
          cur.decimal = 1;
          cur.string += c;
        } else finaliseNum();
      }
      if(isNum(c)) {
        if(cur.v === '') {
          cur = { t:'num', string:c };
        } else cur.v += c;
      } else switch(c) {
        case "'":
        case '"':
          if(cur.v === '') {
            cur = { t:'str', quote:c, v:'' };
          } else err('Not sure how to handle: ' + c);
          break;
        case '(':
          cur.t = 'fn';
          cur.tokens = [];
          stack.push(cur);
          newCurrent();
          break;
        case ')':
          if(nextChar() === '[') {
            // collapse the stack, and let the native evaluator handle this...
            var tail = stack.pop();
            tail.v = tail.v + '(' + cur.v + c;
            tail.t = '?';
            cur = tail;
            break;
          }

          if(cur.v !== '') {
            handleXpathExpr();
          }
          backtrack();
          cur = stack.pop();

          if(cur.t !== 'fn') err('")" outside function!');
          if(cur.v) {
            peek().tokens.push(callFn(cN, cur.v, cur.tokens));
          } else {
            if(cur.tokens.length !== 1) err('Expected one token, but found: ' + cur.tokens.length);
            peek().tokens.push(cur.tokens[0]);
          }
          newCurrent();
          break;
        case ',':
          if(peek().t !== 'fn') err('Unexpected comma outside function arguments.');
          if(cur.v !== '') handleXpathExpr();
          peek().tokens.push(',');
          break;
        case '*':
          if(c === '*' && (cur.v !== '' || peek().tokens.length === 0)) {
            cur.v += c;
            if(cur.v === './*') handleXpathExpr();
          } else if(cur.v === '' &&
            ([')', ''].includes(nextChar()) ||
            input.substring(i+1).trim() === ')')) {
            cur.v = c;
            handleXpathExpr();
          } else {
            pushOp(c);
          }
          break;
        case '-':
          var prev = prevToken();
          if(cur.v !== '' && nextChar() !== ' ' && input.charAt(i-1) !== ' ') {
            // function name expr
            cur.v += c;
          } else if(cur.v === '' && (
              !prev ||
              // match case: ...+-1
              prev.t === 'op' ||
              // previous was a separate function arg
              prev === ',')) {
            // -ve number
            cur = { t:'num', string:'-' };
          } else {
            if(cur.v !== '') {
              if(!DIGIT.test(cur.v) && input[i-1] !== ' ') throw INVALID_ARGS;
              peek().tokens.push(cur);
            }
            pushOp(c);
          }
          break;
        case '=':
          if(cur.v === '<' || cur.v === '&lt;' ||
              cur.v === '>' || cur.v === '&gt;' || cur.v === '!') {
            cur.v += c;
            switch(cur.v) {
              case '<=': case '&lt;=': pushOp('<='); break;
              case '>=': case '&gt;=': pushOp('>='); break;
              case '!=':               pushOp('!='); break;
            }
          } else {
            if(cur.v) handleXpathExpr();
            pushOp(c);
          }
          break;
        case ';':
          switch(cur.v) {
            case '&lt': cur.v = ''; c = '<'; break;
            case '&gt': cur.v = ''; c = '>'; break;
            default: cur.v += c; continue;
          }
          /* falls through */
        case '>':
        case '<':
          if(cur.v) handleXpathExpr();
          if(nextChar() === '=') {
            cur.v = c; break;
          }
          /* falls through */
        case '+':
          pushOp(c);
          break;
        case '|':
          pushOp('union');
          break;
        case '\n':
        case '\r':
        case '\t':
        case ' ':
          // whitespace, as defined at https://www.w3.org/TR/REC-xml/#NT-S
          if(cur.v === '') break; // trim leading whitespace
          // trim trailing space from function names:
          if(!FUNCTION_NAME.test(cur.v)) handleXpathExpr();
          break;
        case 'v':
          // Mad as it seems, according to https://www.w3.org/TR/1999/REC-xpath-19991116/#exprlex,
          // there is no requirement for ExprWhitespace before or after any
          // ExprToken, including OperatorName.
          if(cur.v === 'di') { // OperatorName: 'div'
            pushOp('/');
          } else cur.v += c;
          break;
        case 'r':
          // Mad as it seems, according to https://www.w3.org/TR/1999/REC-xpath-19991116/#exprlex,
          // there is no requirement for ExprWhitespace before or after any
          // ExprToken, including OperatorName.
          if(cur.v === 'o') { // OperatorName: 'or'
            pushOp('|');
          } else cur.v += c;
          break;
        case 'd':
          // Mad as it seems, according to https://www.w3.org/TR/1999/REC-xpath-19991116/#exprlex,
          // there is no requirement for ExprWhitespace before or after any
          // ExprToken, including OperatorName.
          if(cur.v === 'an') { // OperatorName: 'and'
            pushOp('&');
          } else if(cur.v === 'mo') { // OperatorName: 'mod'
            pushOp('%');
          } else cur.v += c;
          break;
        case '[':
          cur.sq = (cur.sq || 0) + 1;
          /* falls through */
        case '.':
          if(cur.v === '' && isNum(nextChar())) {
            cur = { t:'num', string:c };
            break;
          }
          /* falls through */
        default:
          cur.v += c;
      }
    }

    dbg('evaluate() finishing', { stack, cur });

    if(cur.t === 'num') finaliseNum();
    if(cur.t === '?' && cur.v !== '') handleXpathExpr();
    if(cur.t !== '?' || cur.v !== '' || (cur.tokens && cur.tokens.length)) err('Current item not evaluated!');
    if(stack.length > 1) err('Stuff left on stack.');
    if(stack[0].t !== 'root') err('Weird stuff on stack.');
    if(stack[0].tokens.length === 0) err('No tokens.');
    if(stack[0].tokens.length >= 3) backtrack();
    if(stack[0].tokens.length > 1) err('Too many tokens.');

    return toExternalResult(stack[0].tokens[0], rT);
  };
};

module.exports = ExtendedXPathEvaluator;
