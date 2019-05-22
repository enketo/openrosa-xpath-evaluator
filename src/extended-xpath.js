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
  ['*', '/', '%']
];

var DIGIT = /[0-9]/;
// TODO fix duplicate
var DATE_STRING = /^\d\d\d\d-\d{1,2}-\d{1,2}(?:T\d\d:\d\d:\d\d\.?\d?\d?(?:Z|[+-]\d\d:\d\d)|.*)?$/;
var FUNCTION_NAME = /^[a-z]/;

var TOO_MANY_ARGS = new Error('too many args');
var TOO_FEW_ARGS = new Error('too few args');
var INVALID_ARGS = new Error('invalid args');

/**
 * Converts a native Date UTC String to a RFC 3339-compliant date string with local offsets
 * used in ODK, so it replaces the Z in the ISOstring with a local offset
 * @return {string} a datetime string formatted according to RC3339 with local offset
 */
Date.prototype.toISOLocalString = function() {
  //2012-09-05T12:57:00.000-04:00 (ODK)

  if (this.toString() === 'Invalid Date') {
    return this.toString();
  }

  var dt = new Date(this.getTime() - (this.getTimezoneOffset() * 60 * 1000)).toISOString()
      .replace('Z', this.getTimezoneOffsetAsTime());

  if (dt.indexOf('T00:00:00.000') > 0) {
    return dt.split('T')[0];
  } else {
    return dt;
  }
};

Date.prototype.getTimezoneOffsetAsTime = function() {
  var offsetMinutesTotal;
  var hours;
  var minutes;
  var direction;
  var pad2 = function(x) {
    return (x < 10) ? '0' + x : x;
  };

  if (this.toString() === 'Invalid Date') {
    return this.toString();
  }

  offsetMinutesTotal = this.getTimezoneOffset();

  direction = (offsetMinutesTotal < 0) ? '+' : '-';
  hours = pad2(Math.abs(Math.floor(offsetMinutesTotal / 60)));
  minutes = pad2(Math.abs(Math.floor(offsetMinutesTotal % 60)));

  return direction + hours + ':' + minutes;
};

function dateToDays(d) {
  var temp = null;
  if(d.indexOf('T') > 0) {
    temp = new Date(d);
  } else {
    temp = d.split('-');
    temp = new Date(temp[0], temp[1]-1, temp[2]);
  }
  return (temp.getTime()) / (1000 * 60 * 60 * 24);
}

// TODO remove all the checks for cur.t==='?' - what else woudl it be?
var ExtendedXpathEvaluator = function(wrapped, extensions) {
  var
    extendedFuncs = extensions.func || {},
    extendedProcessors = extensions.process || {},
    toInternalResult = function(r) {
      var n, v;
      if(r.resultType === XPathResult.NUMBER_TYPE) return { t:'num', v:r.numberValue };
      if(r.resultType === XPathResult.BOOLEAN_TYPE) return {  t:'bool', v:r.booleanValue };
      if(r.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE) {
        v = [];
        while((n = r.iterateNext())) v.push(n.textContent);
        return { t:'arr', v:v };
      }
      return { t:'str', v:r.stringValue };
    },
    toExternalResult = function(r, rt) {

      if(extendedProcessors.toExternalResult) {
        var res = extendedProcessors.toExternalResult(r);
        if(res) return res;
      }
      if( (r.t === 'arr' && rt === XPathResult.NUMBER_TYPE && DATE_STRING.test(r.v[0])) ||
          (r.t === 'str' && rt === XPathResult.NUMBER_TYPE && DATE_STRING.test(r.v))) {
        var val = r.t === 'arr' ? r.v[0] : r.v;
        var days = dateToDays(val);
        return {
          resultType:XPathResult.NUMBER_TYPE,
          numberValue:days,
          stringValue:days
        };
      }
      if(r.t === 'num') return { resultType:XPathResult.NUMBER_TYPE, numberValue:r.v, stringValue:r.v.toString() };
      if(r.t === 'bool') return { resultType:XPathResult.BOOLEAN_TYPE, booleanValue:r.v, stringValue:r.v.toString() };
      return { resultType:XPathResult.STRING_TYPE, stringValue: r.v===null ? '' : r.v.toString() };
    },
    callFn = function(name, args, rt) {
      if(extendedFuncs.hasOwnProperty(name)) {
        // TODO can we pass rt all the time
        if(rt && (name.startsWith('date') || name === 'now' || name === 'today')) {
          args.push(rt)
        }
        return callExtended(name, args);
      }
      //TODO structure this better depending on how many more
      // native functions need to be patched
      if(name === 'number' && args.length) {
        if(args[0].t === 'arr') {
          args = [{t: 'num', v: args[0].v[0]}];
        } else if(args[0].t === 'str' && DATE_STRING.test(args[0].v)) {
          args = [{t: 'num', v: dateToDays(args[0].v)}];
        } else if(args[0].t === 'num' &&
          args[0].v.toString().indexOf('e-') > 0) {
          args = [{t: 'num', v: 0}];
        }
      }
      if(name === 'name' && args.length < 2) throw TOO_FEW_ARGS;
      if(name === 'namespace-uri') {
        if(args.length > 1) throw TOO_MANY_ARGS;
        if(args.length === 0) throw TOO_FEW_ARGS;
        if(args.length === 1 && !isNaN(args[0].v)) throw INVALID_ARGS;
      }
      if(name === 'local-name') {
        if(args.length > 1) throw TOO_MANY_ARGS;
        if(args.length === 1 && !isNaN(args[0].v)) throw INVALID_ARGS;
      }
      return callNative(name, args);
    },
    callExtended = function(name, args) {
      var argVals = [], res, i;
      for(i=0; i<args.length; ++i) argVals.push(args[i]);
      res = extendedFuncs[name].apply(null, argVals);
      return res;
    },
    callNative = function(name, args) {
      var argString = '', arg, quote, i;
      for(i=0; i<args.length; ++i) {
        arg = args[i];
        if(arg.t !== 'num' && arg.t !== 'bool') {
          quote = arg.v.indexOf('"') === -1 ? '"' : "'";
          argString += quote;
        }
        argString += arg.v;
        if(arg.t === 'bool') argString += '()';
        if(arg.t !== 'num' && arg.t !== 'bool') argString += quote;
        if(i < args.length - 1) argString += ', ';
      }
      return toInternalResult(wrapped(name + '(' + argString + ')'));
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
  this.evaluate = function(input, cN, nR, rT, r) {
    if(rT > 3 || input.startsWith('count(')) return wrapped(input, cN, nR, rT, r);

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

        switch(op.v) {
          case '+':  return lhs.v + rhs.v;
          case '-':  return lhs.v - rhs.v;
          case '*':  return lhs.v * rhs.v;
          case '/':  return lhs.v / rhs.v;
          case '%':  return lhs.v % rhs.v;
          case '=':  return lhs.v == rhs.v;
          case '<':  return lhs.v < rhs.v;
          case '>':  return lhs.v > rhs.v;
          case '<=': return lhs.v <= rhs.v;
          case '>=': return lhs.v >= rhs.v;
          case '!=': return lhs.v != rhs.v;
          case '&':  return Boolean(lhs.v && rhs.v);
          case '|':  return Boolean(lhs.v || rhs.v);
        }
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
      handleXpathExpr = function() {
        var expr = cur.v;
        var evaluated;
        if(['position'].includes(peek().v)) {
          evaluated = wrapped(expr);
        } else {
          evaluated = toInternalResult(wrapped(expr));
        }
        peek().tokens.push(evaluated);
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
      if (cur.t === 'num') {
        if(DIGIT.test(c) || ['e', '"', "'"].includes(c) ||
            (c === '-' && input[i-1] === 'e')) {
          cur.string += c;
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
          if(cur.v === 'once') {
            newCurrent();
            cur.v = '.';
            handleXpathExpr();
          }
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
          if(cur.v !== '') handleXpathExpr();
          backtrack();
          cur = stack.pop();
          if(cur.t !== 'fn') err();
          if(cur.v) {
            peek().tokens.push(callFn(cur.v, cur.tokens, rT));
          } else {
            if(cur.tokens.length !== 1) err();
            peek().tokens.push(cur.tokens[0]);
          }
          newCurrent();
          break;
        case ',':
          if(cur.v !== '') handleXpathExpr();
          if(peek().t !== 'fn') err();
          break;
        case '*':
          if(c === '*' && (cur.v !== '' || peek().tokens.length === 0)) {
            cur.v += c;
            if(cur.v === './*') {
              handleXpathExpr();
            }
          } else if(cur.v === '' &&
            ( [')', ''].includes(nextChar()) ||
            input.substring(i+1).trim() === ')')
          ) {
            cur.v = c;
            handleXpathExpr();
          } else {
            pushOp(c);
          }
          break;
        case '-':
          if(cur.v !== '') {
            // function name expr
            cur.v += c;
          } else if(peek().tokens.length === 0 || prevToken().t === 'op' ||
            // two argument function
            (prevToken().t === 'num' && stack.length > 1 && stack[1].t === 'fn') ||
            // negative argument
            (prevToken().t !== 'num' && isNum(nextChar()))) {
            // -ve number
            cur = { t:'num', string:'-' };
          } else {
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
        case ' ':
          switch(cur.v) {
            case '': break; // trim leading whitespace
            case 'mod': pushOp('%'); break;
            case 'div': pushOp('/'); break;
            case 'and': pushOp('&'); break;
            case 'or':  pushOp('|'); break;
            default: if(!FUNCTION_NAME.test(cur.v)) handleXpathExpr();
          }
          break;
        case '[':
          cur.sq = (cur.sq || 0) + 1;
          /* falls through */
        case '.':
          if(cur.v === '' && nextChar() === ')') {
            cur.v = c;
            handleXpathExpr();
            break;
          }
          /* falls through */
        default:
          cur.v += c;
      }
    }

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

var XPathException = function(code, message) {
  var err;
  this.code = code;
  switch(this.code) {
    case XPathException.INVALID_EXPRESSION_ERR:
      this.name = 'INVALID_EXPRESSION_ERR';
      break;
    case XPathException.TYPE_ERR:
      this.name = 'TYPE_ERR';
      break;
    default:
      err = new Error('Unsupported XPathException code: ' + this.code);
      err.name = 'XPathExceptionInternalError';
      throw err;
  }
  this.message = (message || '');
};

XPathException.prototype.toString = function() {
  return 'XPathException: "' + this.message + '"' +
    ', code: "' + this.code + '"' +
    ', name: "' + this.name + '"'
  ;
};

XPathException.INVALID_EXPRESSION_ERR = 51;
XPathException.TYPE_ERR = 52;

if(typeof define === 'function') {
  define(function() { return ExtendedXpathEvaluator; });
} else if(typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = ExtendedXpathEvaluator;
}
