(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("node-forge"));
	else if(typeof define === 'function' && define.amd)
		define("orxe", ["node-forge"], factory);
	else if(typeof exports === 'object')
		exports["orxe"] = factory(require("node-forge"));
	else
		root["orxe"] = factory(root["node-forge"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var DATE_STRING = /^\d\d\d\d-\d{1,2}-\d{1,2}(?:T\d\d:\d\d:\d\d\.?\d?\d?(?:Z|[+-]\d\d:\d\d)|.*)?$/;

  function dateToDays(d, rounded) {
    var temp = null;

    if (d.indexOf('T') > 0) {
      temp = new Date(d);
    } else {
      temp = d.split('-');
      temp = new Date(temp[0], temp[1] - 1, temp[2]);
    }

    var r = temp.getTime() / (1000 * 60 * 60 * 24);
    return rounded === false ? r : Math.round(r * 100000) / 100000;
  }

  module.exports = {
    DATE_STRING: DATE_STRING,
    dateToDays: dateToDays
  };
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  module.exports = {
    allowStringComparison: true,
    includeTimeForTodayString: false,
    returnCurrentTimeForToday: true
  };
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function toNodes(r) {
    var n,
        v = [];

    while (n = r.iterateNext()) {
      v.push(n);
    }

    return v;
  }

  function getNamespaceAtts(result) {
    var v = [],
        n;

    while (n = result.iterateNext()) {
      if (n.name.indexOf(':') > 0) v.unshift(n);
    }

    return v;
  }

  function toSnapshotResult(nodes, rt, singleItem) {
    return function () {
      var idx = 0;
      return {
        resultType: rt,
        singleNodeValue: nodes.length ? singleItem || nodes[0] : null,
        snapshotLength: nodes.length,
        snapshotItem: function snapshotItem(i) {
          return nodes[i];
        },
        iterateNext: function iterateNext() {
          return nodes.length > idx ? nodes[idx++] : null;
        }
      };
    }();
  }

  module.exports = {
    getNamespaceAtts: getNamespaceAtts,
    toNodes: toNodes,
    toSnapshotResult: toSnapshotResult
  };
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  module.exports = __webpack_require__(4);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  __webpack_require__(5);

  var ExtendedXpathEvaluator = __webpack_require__(6);

  var openrosaExtensions = __webpack_require__(12);

  var config = __webpack_require__(1);

  var extensions = openrosaExtensions(config);

  module.exports = function () {
    var module = {
      extendedXpathEvaluator: ExtendedXpathEvaluator,
      openrosaXpathExtensions: openrosaExtensions,
      config: config,
      customXPathFunction: {
        type: {
          StringType: extensions.XPR.string,
          NumberType: extensions.XPR.number,
          BooleanType: extensions.XPR["boolean"],
          DateType: extensions.XPR.date
        },
        add: function add(name, fnObj) {
          extensions.func[name] = fnObj;
        },
        remove: function remove(name) {
          delete extensions.func[name];
        },
        all: function all() {
          return extensions.func;
        }
      },
      getCurrentDomLevel3XPathBindings: function getCurrentDomLevel3XPathBindings() {
        return {
          'window': {
            XPathException: window.XPathException,
            XPathExpression: window.XPathExpression,
            XPathNSResolver: window.XPathNSResolver,
            XPathResult: window.XPathResult,
            XPathNamespace: window.XPathNamespace
          },
          'document': {
            createExpression: document.createExpression,
            createNSResolver: document.createNSResolver,
            evaluate: document.evaluate
          }
        };
      },
      createDomLevel3XPathBindings: function createDomLevel3XPathBindings(options) {
        var evaluator = new XPathEvaluator(options);
        return {
          'document': {
            evaluate: function evaluate(e, contextPath, namespaceResolver, resultType, result) {
              var wrappedXpathEvaluator = function wrappedXpathEvaluator(v, node, rt) {
                if (resultType < 7 || v.startsWith('//')) resultType = null;
                var wrappedResultType = rt || resultType || XPathResult.ANY_TYPE;
                return evaluator.evaluate(v, node || contextPath, namespaceResolver, wrappedResultType || XPathResult.ANY_TYPE, result);
              };

              var xevaluator = new ExtendedXpathEvaluator(wrappedXpathEvaluator, extensions);
              return xevaluator.evaluate.apply(xevaluator, arguments);
            }
          }
        };
      },
      bindDomLevel3XPath: function bindDomLevel3XPath(doc, bindings) {
        var newBindings = bindings || module.createDomLevel3XPathBindings(),
            currentBindings = module.getCurrentDomLevel3XPathBindings(),
            i;
        doc = doc || document;

        for (i in newBindings['document']) {
          doc[i] = newBindings['document'][i];
        }

        return currentBindings;
      }
    };
    return module;
  }();
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  Date.prototype.toISOLocalString = function () {
    if (this.toString() === 'Invalid Date') {
      return this.toString();
    }

    var dt = new Date(this.getTime() - this.getTimezoneOffset() * 60 * 1000).toISOString().replace('Z', this.getTimezoneOffsetAsTime());

    if (dt.indexOf('T00:00:00.000') > 0) {
      return dt.split('T')[0];
    } else {
      return dt;
    }
  };

  Date.prototype.getTimezoneOffsetAsTime = function () {
    var offsetMinutesTotal;
    var hours;
    var minutes;
    var direction;

    var pad2 = function pad2(x) {
      return x < 10 ? '0' + x : x;
    };

    if (this.toString() === 'Invalid Date') {
      return this.toString();
    }

    offsetMinutesTotal = this.getTimezoneOffset();
    direction = offsetMinutesTotal < 0 ? '+' : '-';
    hours = pad2(Math.floor(Math.abs(offsetMinutesTotal / 60)));
    minutes = pad2(Math.floor(Math.abs(offsetMinutesTotal % 60)));
    return direction + hours + ':' + minutes;
  };
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var config = __webpack_require__(1);

  var shuffle = __webpack_require__(7);

  var _require = __webpack_require__(8),
      isNamespaceExpr = _require.isNamespaceExpr,
      handleNamespaceExpr = _require.handleNamespaceExpr;

  var _require2 = __webpack_require__(9),
      handleOperation = _require2.handleOperation;

  var _require3 = __webpack_require__(10),
      isNativeFunction = _require3.isNativeFunction,
      preprocessNativeArgs = _require3.preprocessNativeArgs;

  var _require4 = __webpack_require__(0),
      DATE_STRING = _require4.DATE_STRING,
      dateToDays = _require4.dateToDays;

  var _require5 = __webpack_require__(2),
      toNodes = _require5.toNodes,
      toSnapshotResult = _require5.toSnapshotResult;

  var _require6 = __webpack_require__(11),
      inputArgs = _require6.inputArgs,
      preprocessInput = _require6.preprocessInput;

  var OP_PRECEDENCE = [['|'], ['&'], ['=', '!='], ['<', '<=', '>=', '>'], ['+', '-'], ['*', '/', '%']];
  var DIGIT = /[0-9]/;
  var FUNCTION_NAME = /^[a-z]/;
  var NUMERIC_COMPARATOR = /(>|<)/;
  var BOOLEAN_COMPARATOR = /(=)/;
  var BOOLEAN_FN_COMPARATOR = /(true\(\)|false\(\))/;
  var COMPARATOR = /(=|<|>)/;
  var INVALID_ARGS = new Error('invalid args');
  var TOO_MANY_ARGS = new Error('too many args');
  var TOO_FEW_ARGS = new Error('too few args');

  var ExtendedXpathEvaluator = function ExtendedXpathEvaluator(wrapped, extensions) {
    var extendedFuncs = extensions.func || {},
        extendedProcessors = extensions.process || {},
        toInternalResult = function toInternalResult(r) {
      var n, v;
      if (r.resultType === XPathResult.NUMBER_TYPE) return {
        t: 'num',
        v: r.numberValue
      };
      if (r.resultType === XPathResult.BOOLEAN_TYPE) return {
        t: 'bool',
        v: r.booleanValue
      };

      if (r.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE) {
        v = [];

        while (n = r.iterateNext()) {
          v.push(n.textContent);
        }

        return {
          t: 'arr',
          v: v
        };
      }

      return {
        t: 'str',
        v: r.stringValue
      };
    },
        toExternalResult = function toExternalResult(r, rt) {
      if (extendedProcessors.toExternalResult) {
        var res = extendedProcessors.toExternalResult(r);
        if (res) return res;
      }

      if (r.v && typeof r.v.then === 'function' && rt === XPathResult.STRING_TYPE) {
        return {
          resultType: XPathResult.STRING_TYPE,
          stringValue: r.v
        };
      }

      if (r.t === 'arr' && rt === XPathResult.NUMBER_TYPE && DATE_STRING.test(r.v[0]) || r.t === 'str' && rt === XPathResult.NUMBER_TYPE && DATE_STRING.test(r.v)) {
        var val = r.t === 'arr' ? r.v[0] : r.v;
        var days = dateToDays(val);
        return {
          resultType: XPathResult.NUMBER_TYPE,
          numberValue: days,
          stringValue: days
        };
      }

      if (r.t === 'num') return {
        resultType: XPathResult.NUMBER_TYPE,
        numberValue: r.v,
        stringValue: r.v.toString()
      };
      if (r.t === 'bool') return {
        resultType: XPathResult.BOOLEAN_TYPE,
        booleanValue: r.v,
        stringValue: r.v.toString()
      };

      if (rt > 3) {
        r = shuffle(r[0], r[1]);
        return toSnapshotResult(r, XPathResult.UNORDERED_SNAPSHOT_TYPE);
      }

      if (!r.t && Array.isArray(r)) {
        if (rt === XPathResult.NUMBER_TYPE) {
          var v = parseInt(r[0].textContent);
          return {
            resultType: XPathResult.NUMBER_TYPE,
            numberValue: v,
            stringValue: v.toString()
          };
        } else if (rt === XPathResult.STRING_TYPE) {
          return {
            resultType: XPathResult.STRING_TYPE,
            stringValue: r.length ? r[0] : ''
          };
        }
      }

      return {
        resultType: XPathResult.STRING_TYPE,
        stringValue: r.v === null ? '' : r.v.toString()
      };
    },
        callFn = function callFn(name, args, rt) {
      if (extendedFuncs.hasOwnProperty(name)) {
        if (rt && /^(date|now$|today$|randomize$)/.test(name)) args.push(rt);
        if (/^(true$|false$)/.test(name)) args.push(rt || XPathResult.BOOLEAN_TYPE);
        return callExtended(name, args);
      }

      if (name === 'normalize-space' && args.length) {
        var res = args[0].v;
        res = res.replace(/\f/g, '\\f');
        res = res.replace(/\r\v/g, '\v');
        res = res.replace(/\v/g, '\\v');
        res = res.replace(/\s+/g, ' ');
        res = res.replace(/^\s+|\s+$/g, '');
        res = res.replace(/\\v/g, '\v');
        res = res.replace(/\\f/g, '\f');
        return {
          t: 'str',
          v: res
        };
      }

      if (name === 'string' && args.length > 0 && (args[0].v === Number.POSITIVE_INFINITY || args[0].v === Number.NEGATIVE_INFINITY || args[0].v !== args[0].v)) {
        return {
          t: 'str',
          v: args[0].v
        };
      }

      return callNative(name, preprocessNativeArgs(name, args));
    },
        callExtended = function callExtended(name, args) {
      var argVals = [],
          res,
          i;

      for (i = 0; i < args.length; ++i) {
        argVals.push(args[i]);
      }

      res = extendedFuncs[name].apply(null, argVals);
      return res;
    },
        callNative = function callNative(name, args) {
      var argString = '',
          arg,
          quote,
          i;

      for (i = 0; i < args.length; ++i) {
        arg = args[i];

        if (arg.t !== 'num' && arg.t !== 'bool') {
          quote = arg.v.indexOf('"') === -1 ? '"' : "'";
          argString += quote;
        }

        argString += arg.v;
        if (arg.t === 'bool') argString += '()';
        if (arg.t !== 'num' && arg.t !== 'bool') argString += quote;
        if (i < args.length - 1) argString += ', ';
      }

      return toInternalResult(wrapped(name + '(' + argString + ')'));
    },
        typefor = function typefor(val) {
      if (extendedProcessors.typefor) {
        var res = extendedProcessors.typefor(val);
        if (res) return res;
      }

      if (typeof val === 'boolean') return 'bool';
      if (typeof val === 'number') return 'num';
      return 'str';
    };

    this.evaluate = function (input, cN, nR, rT, r) {
      input = preprocessInput(input, rT);
      if (isNamespaceExpr(input)) return handleNamespaceExpr(input, cN);

      if (isNativeFunction(input)) {
        var args = inputArgs(input);

        if (args.length && args[0].length && !isNaN(args[0])) {
          throw INVALID_ARGS;
        }

        if (input === 'lang()') throw TOO_FEW_ARGS;
        if (/^lang\(/.test(input) && cN.nodeType === 2) cN = cN.ownerElement;

        var _res = wrapped(input, cN);

        if (rT === XPathResult.NUMBER_TYPE && (_res.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE || _res.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE)) {
          var val = parseInt(_res.iterateNext().textContent);
          return {
            resultType: XPathResult.NUMBER_TYPE,
            numberValue: val,
            stringValue: val
          };
        }

        return _res;
      }

      if (rT > 3 && !input.startsWith('randomize') || /^count\(|boolean\(/.test(input)) {
        if (input.startsWith('count(')) {
          if (input.indexOf(',') > 0) throw TOO_MANY_ARGS;
          if (input === 'count()') throw TOO_FEW_ARGS;
          if (!isNaN(/\((.*)\)/.exec(input)[1])) throw INVALID_ARGS;
        }

        if (input.startsWith('boolean(')) {
          if (input === 'boolean()') throw TOO_FEW_ARGS;
          var bargs = input.substring(8, input.indexOf(')')).split(',');
          if (bargs.length > 1) throw TOO_MANY_ARGS;
        }

        if (input === '/') cN = cN.ownerDocument || cN;
        return wrapped(input, cN);
      }

      if (rT === XPathResult.BOOLEAN_TYPE && input.indexOf('(') < 0 && input.indexOf('/') < 0 && input.indexOf('=') < 0 && input.indexOf('!=') < 0) {
        input = input.replace(/(\n|\r|\t)/g, '');
        input = input.replace(/"(\d)"/g, '$1');
        input = input.replace(/'(\d)'/g, '$1');
        input = "boolean-from-string(" + input + ")";
      }

      if (rT === XPathResult.NUMBER_TYPE && input.indexOf('string-length') < 0) {
        input = input.replace(/(\n|\r|\t)/g, '');
      }

      var i,
          cur,
          stack = [{
        t: 'root',
        tokens: []
      }],
          peek = function peek() {
        return stack[stack.length - 1];
      },
          err = function err(message) {
        throw new Error((message || '') + ' [stack=' + JSON.stringify(stack) + '] [cur=' + JSON.stringify(cur) + ']');
      },
          newCurrent = function newCurrent() {
        cur = {
          t: '?',
          v: ''
        };
      },
          pushOp = function pushOp(t) {
        peek().tokens.push({
          t: 'op',
          v: t
        });
        newCurrent();
      },
          evalOp = function evalOp(lhs, op, rhs) {
        if (extendedProcessors.handleInfix) {
          var res = extendedProcessors.handleInfix(err, lhs, op, rhs);

          if (res && res.t === 'continue') {
            lhs = res.lhs;
            op = res.op;
            rhs = res.rhs;
            res = null;
          }

          if (typeof res !== 'undefined' && res !== null) return res;
        }

        return handleOperation(lhs, op, rhs, config);
      },
          evalOpAt = function evalOpAt(tokens, opIndex) {
        var res = evalOp(tokens[opIndex - 1], tokens[opIndex], tokens[opIndex + 1]);

        if (typeof res !== 'undefined' && res !== null) {
          tokens.splice(opIndex, 2);
          tokens[opIndex - 1] = {
            t: typefor(res),
            v: res
          };
        }
      },
          backtrack = function backtrack() {
        var i, j, ops, tokens;
        tokens = peek().tokens;

        for (j = OP_PRECEDENCE.length - 1; j >= 0; --j) {
          ops = OP_PRECEDENCE[j];
          i = 1;

          while (i < tokens.length - 1) {
            if (tokens[i].t === 'op' && ops.indexOf(tokens[i].v) !== -1) {
              evalOpAt(tokens, i);
            } else ++i;
          }
        }
      },
          handleXpathExpr = function handleXpathExpr() {
        var expr = cur.v;
        var evaluated;

        if (['position'].includes(peek().v)) {
          evaluated = wrapped(expr);
        } else {
          if (rT > 3 || cur.v.indexOf('position()=') >= 0 && stack.length === 1 && !/^[a-z]*[\(|\[]{1}/.test(cur.v)) {
            evaluated = toNodes(wrapped(expr));
          } else {
            if (expr.startsWith('$')) {
              evaluated = expr;
            } else {
              evaluated = toInternalResult(wrapped(expr));
            }
          }
        }

        peek().tokens.push(evaluated);
        newCurrent();
      },
          nextChar = function nextChar() {
        return input.charAt(i + 1);
      },
          finaliseNum = function finaliseNum() {
        cur.v = parseFloat(cur.string);
        peek().tokens.push(cur);
        newCurrent();
      },
          prevToken = function prevToken() {
        var peeked = peek().tokens;
        return peeked[peeked.length - 1];
      },
          isNum = function isNum(c) {
        return c >= '0' && c <= '9';
      };

      newCurrent();

      for (i = 0; i < input.length; ++i) {
        var c = input.charAt(i);

        if (cur.sq) {
          cur.v += c;
          if (c === ']') --cur.sq;else if (c === '[') ++cur.sq;
          continue;
        }

        if (cur.t === 'str') {
          if (c === cur.quote) {
            peek().tokens.push(cur);
            newCurrent();
          } else cur.v += c;

          continue;
        }

        if (cur.t === 'num') {
          if (DIGIT.test(c) || ['e', '"', "'"].includes(c) || c === '-' && input[i - 1] === 'e') {
            cur.string += c;
            continue;
          } else if (c === ' ' && cur.string === '-') {
            continue;
          } else if (c === '.' && !cur.decimal) {
            cur.decimal = 1;
            cur.string += c;
          } else finaliseNum();
        }

        if (isNum(c)) {
          if (cur.v === '') {
            cur = {
              t: 'num',
              string: c
            };
          } else cur.v += c;
        } else switch (c) {
          case "'":
          case '"':
            if (cur.v === '') {
              cur = {
                t: 'str',
                quote: c,
                v: ''
              };
            } else err('Not sure how to handle: ' + c);

            break;

          case '(':
            cur.t = 'fn';
            cur.tokens = [];
            stack.push(cur);

            if (cur.v === 'once') {
              newCurrent();
              cur.v = '.';
              handleXpathExpr();
            }

            newCurrent();
            break;

          case ')':
            if (nextChar() === '[') {
              var tail = stack.pop();
              tail.v = tail.v + '(' + cur.v + c;
              tail.t = '?';
              cur = tail;
              break;
            }

            if (cur.v !== '') handleXpathExpr();
            backtrack();
            cur = stack.pop();
            if (cur.t !== 'fn') err();

            if (cur.v) {
              var expectedReturnType = rT;

              if (rT === XPathResult.BOOLEAN_TYPE) {
                if (NUMERIC_COMPARATOR.test(input) && !BOOLEAN_FN_COMPARATOR.test(input)) expectedReturnType = XPathResult.NUMBER_TYPE;
                if (BOOLEAN_COMPARATOR.test(input)) expectedReturnType = XPathResult.BOOLEAN_TYPE;

                if (COMPARATOR.test(input) && cur.t === 'fn' && /^(date|date-time)$/.test(cur.v)) {
                  expectedReturnType = XPathResult.STRING_TYPE;
                }
              }

              var res = callFn(cur.v, cur.tokens, expectedReturnType);
              if (cur.v === 'node' && res.t === 'arr' && res.v.length > 0) res.v = [res.v[0]];
              peek().tokens.push(res);
            } else {
              if (cur.tokens.length !== 1) err();
              peek().tokens.push(cur.tokens[0]);
            }

            newCurrent();
            break;

          case ',':
            if (cur.v !== '') handleXpathExpr();
            if (peek().t !== 'fn') err();
            break;

          case '*':
            if (c === '*' && (cur.v !== '' || peek().tokens.length === 0)) {
              cur.v += c;
              if (cur.v === './*') handleXpathExpr();
            } else if (cur.v === '' && ([')', ''].includes(nextChar()) || input.substring(i + 1).trim() === ')')) {
              cur.v = c;
              handleXpathExpr();
            } else {
              pushOp(c);
            }

            break;

          case '-':
            var prev = prevToken();

            if (cur.v !== '' && nextChar() !== ' ' && input.charAt(i - 1) !== ' ') {
              cur.v += c;
            } else if (peek().tokens.length === 0 && cur.v === '' || prev && prev.t === 'op' || prev && prev.t === 'num' && stack.length > 1 && stack[1].t === 'fn' || prev && prev.t !== 'num' && isNum(nextChar())) {
              cur = {
                t: 'num',
                string: '-'
              };
            } else {
              if (cur.v !== '') {
                if (!DIGIT.test(cur.v) && input[i - 1] !== ' ') throw INVALID_ARGS;
                peek().tokens.push(cur);
              }

              pushOp(c);
            }

            break;

          case '=':
            if (cur.v === '<' || cur.v === '&lt;' || cur.v === '>' || cur.v === '&gt;' || cur.v === '!') {
              cur.v += c;

              switch (cur.v) {
                case '<=':
                case '&lt;=':
                  pushOp('<=');
                  break;

                case '>=':
                case '&gt;=':
                  pushOp('>=');
                  break;

                case '!=':
                  pushOp('!=');
                  break;
              }
            } else {
              if (cur.v) handleXpathExpr();
              pushOp(c);
            }

            break;

          case ';':
            switch (cur.v) {
              case '&lt':
                cur.v = '';
                c = '<';
                break;

              case '&gt':
                cur.v = '';
                c = '>';
                break;

              default:
                cur.v += c;
                continue;
            }

          case '>':
          case '<':
            if (cur.v) handleXpathExpr();

            if (nextChar() === '=') {
              cur.v = c;
              break;
            }

          case '+':
            pushOp(c);
            break;

          case ' ':
            switch (cur.v) {
              case '':
                break;

              case 'mod':
                pushOp('%');
                break;

              case 'div':
                pushOp('/');
                break;

              case 'and':
                pushOp('&');
                break;

              case 'or':
                pushOp('|');
                break;

              default:
                {
                  var op = cur.v.toLowerCase();
                  if (/^(mod|div|and|or)$/.test(op)) throw INVALID_ARGS;
                  if (!FUNCTION_NAME.test(cur.v)) handleXpathExpr();
                }
            }

            break;

          case '[':
            cur.sq = (cur.sq || 0) + 1;

          case '.':
            if (cur.v === '' && nextChar() === ')') {
              cur.v = c;
              handleXpathExpr();
              break;
            }

            if (cur.v === '' && isNum(nextChar())) {
              cur = {
                t: 'num',
                string: c
              };
              break;
            }

          default:
            cur.v += c;
        }
      }

      if (cur.t === 'num') finaliseNum();
      if (cur.t === '?' && cur.v !== '') handleXpathExpr();
      if (cur.t !== '?' || cur.v !== '' || cur.tokens && cur.tokens.length) err('Current item not evaluated!');
      if (stack.length > 1) err('Stuff left on stack.');
      if (stack[0].t !== 'root') err('Weird stuff on stack.');
      if (stack[0].tokens.length === 0) err('No tokens.');
      if (stack[0].tokens.length >= 3) backtrack();
      if (stack[0].tokens.length > 1) err('Too many tokens.');
      return toExternalResult(stack[0].tokens[0], rT);
    };
  };

  module.exports = ExtendedXpathEvaluator;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var MAX_INT32 = 2147483647;
  var MINSTD = 16807;

  function shuffle(array, seed) {
    var rng;
    var result = [];

    if (typeof seed !== 'undefined') {
      if (!Number.isInteger(seed)) {
        throw new Error('Invalid seed argument. Integer required.');
      }

      var rnd = new Random(seed);
      rng = rnd.nextFloat.bind(rnd);
    } else {
      rng = Math.random;
    }

    for (var i = 0; i < array.length; ++i) {
      var j = Math.floor(rng() * (i + 1));

      if (j !== i) {
        result[i] = result[j];
      }

      result[j] = array[i];
    }

    return result;
  }

  function Random(seed) {
    this._seed = seed % MAX_INT32;

    if (this._seed <= 0) {
      this._seed += MAX_INT32 - 1;
    }
  }

  Random.prototype.next = function () {
    this._seed = this._seed * MINSTD % MAX_INT32;
    return this._seed;
  };

  Random.prototype.nextFloat = function () {
    return (this.next() - 1) / (MAX_INT32 - 1);
  };

  module.exports = shuffle;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var _require = __webpack_require__(2),
      toSnapshotResult = _require.toSnapshotResult;

  function namespace(input, cN) {
    var nsId = input.substring(11);
    var xnamespaces = [];
    var xitems = [];

    if (cN.attributes) {
      for (var ii = 0; ii < cN.attributes.length; ii++) {
        var xattr = cN.attributes[ii];
        var xitem = xattr.ownerElement.getAttributeNode(xattr.name);

        if (xitem.nodeName === 'xmlns:' + nsId) {
          xitems.push(xitem);
          xnamespaces.push({
            nodeName: '#namespace',
            localName: nsId,
            namespaceURI: xitem.nodeValue
          });
        }
      }
    }

    return toSnapshotResult(xnamespaces);
  }

  function namespaceNode(cN) {
    var namespaces = [];
    var namespaceKeys = {};
    var items = [];
    var node = cN;

    while (node) {
      if (node.attributes) {
        for (var j = 0; j < node.attributes.length; j++) {
          var attr = node.attributes[j];
          var item = attr.ownerElement.getAttributeNode(attr.name);

          if (item.nodeName.startsWith('xmlns') && !namespaceKeys[item.nodeName]) {
            var names = item.nodeName.split(':');
            namespaceKeys[item.nodeName] = item.nodeName;

            if (item.nodeValue.length) {
              items.push(item);
              namespaces.push({
                nodeName: '#namespace',
                localName: names.length > 1 ? names[1] : '',
                namespaceURI: item.nodeValue
              });
            }
          }
        }
      }

      node = cN.nodeType === 1 ? node.parentNode : null;
    }

    if (namespaces.length > 0 && !namespaceKeys.xmlns) {
      namespaces.push({
        nodeName: '#namespace',
        localName: 'xmlns',
        namespaceURI: 'http://www.w3.org/1999/xhtml'
      });
    }

    if (namespaces.length > 0 && !namespaceKeys.xml) {
      namespaces.push({
        nodeName: '#namespace',
        localName: 'xml',
        namespaceURI: 'http://www.w3.org/XML/1998/namespace'
      });
    }

    namespaces = namespaces.sort(function (n1, n2) {
      if (n1.localName < n2.localName) {
        return -1;
      }

      if (n1.localName > n2.localName) {
        return 1;
      }

      return 0;
    });
    return toSnapshotResult(namespaces, 7, items[0]);
  }

  function isNamespaceExpr(input) {
    return /^(namespace::node\(\)|namespace::\*)$/.test(input) || /^namespace::/.test(input);
  }

  function handleNamespaceExpr(input, cN) {
    if (/^(namespace::node\(\)|namespace::\*)$/.test(input)) {
      return namespaceNode(cN);
    }

    if (/^namespace::/.test(input)) {
      return namespace(input, cN);
    }
  }

  module.exports = {
    isNamespaceExpr: isNamespaceExpr,
    handleNamespaceExpr: handleNamespaceExpr
  };
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var _require = __webpack_require__(0),
      dateToDays = _require.dateToDays;

  function isNumber(value) {
    if (typeof value === 'string') {
      var nbr = value.replace(/["']/g, "");
      return nbr.trim().length && !isNaN(nbr.trim());
    }

    return typeof value === 'number';
  }

  function handleOperation(lhs, op, rhs, config) {
    if (op.v === '+' && isNumber(lhs.v) && isNumber(rhs.v)) {
      lhs.v = Number(lhs.v);
      rhs.v = Number(rhs.v);
    }

    if (lhs.t === 'arr' && lhs.v.length === 1 && rhs.t === 'num') {
      if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(lhs.v[0])) {
        lhs = {
          t: 'num',
          v: dateToDays(lhs.v[0], false)
        };
      }
    }

    if (rhs.t === 'arr' && rhs.v.length === 1 && lhs.t === 'num') {
      if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(rhs.v[0])) {
        rhs = {
          t: 'num',
          v: dateToDays(rhs.v[0], false)
        };
      }
    }

    if (lhs.t === 'arr' && lhs.v.length === 1 && rhs.t === 'str') {
      lhs = {
        t: 'str',
        v: lhs.v[0]
      };
    }

    if (rhs.t === 'arr' && rhs.v.length === 1 && lhs.t === 'str') {
      rhs = {
        t: 'str',
        v: rhs.v[0]
      };
    }

    if (rhs.t === 'arr' && rhs.v.length === 1 && lhs.t === 'arr' && lhs.v.length === 1) {
      lhs = {
        t: 'str',
        v: lhs.v[0]
      };
      rhs = {
        t: 'str',
        v: rhs.v[0]
      };
    }

    if (lhs.t === 'str' && /^\d\d\d\d-\d{1,2}-\d{1,2}/.test(lhs.v)) {
      lhs = {
        t: 'num',
        v: dateToDays(lhs.v, false)
      };
    }

    if (rhs.t === 'str' && /^\d\d\d\d-\d{1,2}-\d{1,2}/.test(rhs.v)) {
      rhs = {
        t: 'num',
        v: dateToDays(rhs.v, false)
      };
    }

    if (op.v === '-' && (isNaN(lhs.v) || isNaN(rhs.v))) {
      return NaN;
    }

    if (/^(=|!=)$/.test(op.v)) {
      if (lhs.t === 'str' && rhs.t === 'bool') {
        if (lhs.v.length > 0 && lhs.v === '1') {
          lhs = {
            t: 'bool',
            v: true
          };
        } else if (lhs.v === '') {
          lhs = {
            t: 'bool',
            v: false
          };
        } else {
          lhs = {
            t: 'bool',
            v: undefined
          };
        }
      }

      if (rhs.t === 'str' && lhs.t === 'bool') {
        if (rhs.v.length > 0 && rhs.v === '1') {
          rhs = {
            t: 'bool',
            v: true
          };
        } else if (rhs.v === '') {
          rhs = {
            t: 'bool',
            v: false
          };
        } else {
          rhs = {
            t: 'bool',
            v: undefined
          };
        }
      }

      if (lhs.t === 'num' && rhs.t === 'bool') {
        lhs = {
          t: 'bool',
          v: Boolean(lhs.v)
        };
      }

      if (rhs.t === 'num' && lhs.t === 'bool') {
        rhs = {
          t: 'bool',
          v: Boolean(rhs.v)
        };
      }
    }

    switch (op.v) {
      case '+':
        return lhs.v + rhs.v;

      case '-':
        return lhs.v - rhs.v;

      case '*':
        return lhs.v * rhs.v;

      case '/':
        return lhs.v / rhs.v;

      case '%':
        return lhs.v % rhs.v;

      case '=':
        if (/^(num|str)$/.test(lhs.t) && rhs.t === 'arr') {
          return rhs.v.includes(lhs.string || lhs.v);
        }

        if (/^(num|str)$/.test(rhs.t) && lhs.t === 'arr') {
          return lhs.v.includes(rhs.string || rhs.v);
        }

        if (lhs.t === 'bool' && rhs.t === 'arr') {
          return lhs.v === rhs.v.length > 0;
        }

        if (rhs.t === 'bool' && lhs.t === 'arr') {
          return rhs.v === lhs.v.length > 0;
        }

        return lhs.v == rhs.v;

      case '<':
        if (lhs.t === 'bool') {
          if (lhs.v === false && rhs.t === 'arr' && rhs.v.length > 0) return true;
          if (lhs.v === true && rhs.t === 'num') return 1 < rhs.v;
          if (lhs.v === false && rhs.t === 'num') return 0 < rhs.v;
          if (lhs.v === false && rhs.t === 'bool') return rhs.v === true;
          return false;
        }

        if (rhs.t === 'bool') {
          if (rhs.v === true && lhs.t === 'arr' && lhs.v.length === 0) return true;
          if (rhs.v === true && lhs.t === 'num' && lhs.v < 1) return true;
          return false;
        }

        if (lhs.t === 'arr' && lhs.v.length > 0) {
          for (var iii = 0; iii < lhs.v.length; iii++) {
            if (Number(lhs.v[iii]) < rhs.v) return true;
          }

          return false;
        }

        if (rhs.t === 'arr' && rhs.v.length > 0) {
          for (var k = 0; k < rhs.v.length; k++) {
            if (lhs.v < Number(rhs.v[k])) return true;
          }

          return false;
        }

        if (lhs.t === 'arr' && lhs.v.length === 0) lhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (rhs.t === 'arr' && rhs.v.length === 0) rhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (lhs.t === 'str' && rhs.t === 'str' && config.allowStringComparison) return lhs.v < rhs.v;
        if (!isNumber(lhs.v) || !isNumber(rhs.v)) return false;
        return lhs.v < rhs.v;

      case '>':
        if (lhs.t === 'bool') {
          if (lhs.v === true && rhs.t === 'arr' && rhs.v.length === 0) return true;
          if (lhs.v === true && rhs.t === 'num') return 1 > rhs.v;
          if (lhs.v === true && rhs.t === 'bool') return 1 > (rhs.v === true ? 1 : 0);
          return false;
        }

        if (rhs.t === 'bool') {
          if (rhs.v === false && lhs.t === 'arr' && lhs.v.length > 0) return true;
          if (rhs.v === false && lhs.t === 'num') return lhs.v > 0;
          if (rhs.v === true && lhs.t === 'num') return lhs.v > 1;
          if (lhs.t === 'num') return lhs.v > rhs.v === true ? 1 : 0;
          return false;
        }

        if (lhs.t === 'arr' && lhs.v.length > 0) {
          for (var j = 0; j < lhs.v.length; j++) {
            if (Number(lhs.v[j]) > rhs.v) return true;
          }

          return false;
        }

        if (rhs.t === 'arr' && rhs.v.length > 0) {
          for (var l = 0; l < rhs.v.length; l++) {
            if (lhs.v > Number(rhs.v[l])) return true;
          }

          return false;
        }

        if (lhs.t === 'arr' && lhs.v.length === 0) lhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (lhs.t === 'bool' && lhs.v === true) lhs = {
          t: 'num',
          string: '1',
          v: 1
        };
        if (lhs.t === 'bool' && lhs.v === false) lhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (rhs.t === 'arr' && rhs.v.length === 0) rhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (rhs.t === 'bool' && rhs.v === true) rhs = {
          t: 'num',
          string: '1',
          v: 1
        };
        if (rhs.t === 'bool' && rhs.v === false) rhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (lhs.t === 'str' && rhs.t === 'str' && config.allowStringComparison) return lhs.v > rhs.v;
        if (!isNumber(lhs.v) || !isNumber(rhs.v)) return false;
        return lhs.v > rhs.v;

      case '<=':
        if (rhs.t === 'arr' && rhs.v.length === 0 && lhs.string && lhs.string.length > 0) return false;
        if (lhs.t === 'arr' && lhs.v.length === 0 && rhs.string && rhs.string.length > 0) return false;
        if (rhs.t === 'bool' && rhs.v === false && lhs.t === 'arr' && lhs.v.length > 0) return false;
        if (lhs.t === 'bool') lhs = {
          t: 'num',
          v: lhs.v === true ? 1 : 0,
          string: lhs.v === true ? '1' : '0'
        };
        if (rhs.t === 'bool') rhs = {
          t: 'num',
          v: rhs.v === true ? 1 : 0,
          string: lhs.v === true ? '1' : '0'
        };

        if (lhs.t === 'arr' && lhs.v.length > 0) {
          for (var m = 0; m < lhs.v.length; m++) {
            if (Number(lhs.v[m]) <= rhs.v) return true;
          }

          return false;
        }

        if (rhs.t === 'arr' && rhs.v.length > 0) {
          for (var p = 0; p < rhs.v.length; p++) {
            if (lhs.v <= Number(rhs.v[p])) return true;
          }

          return false;
        }

        if (rhs.t === 'arr' && rhs.v.length === 0) rhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (lhs.t === 'arr' && lhs.v.length === 0) lhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (lhs.t === 'bool' && lhs.v === true) lhs = {
          t: 'num',
          string: '1',
          v: 1
        };
        if (lhs.t === 'bool' && lhs.v === false) lhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (rhs.t === 'bool' && rhs.v === true) rhs = {
          t: 'num',
          string: '1',
          v: 1
        };
        if (rhs.t === 'bool' && rhs.v === false) rhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (lhs.t === 'str' && rhs.t === 'str' && config.allowStringComparison) return lhs.v <= rhs.v;
        if (!isNumber(lhs.v) || !isNumber(rhs.v)) return false;
        return lhs.v <= rhs.v;

      case '>=':
        if (rhs.t === 'arr' && rhs.v.length === 0 && lhs.string && lhs.string.length > 0) return false;
        if (rhs.t === 'arr' && rhs.v.length > 0 && lhs.v === false) return false;

        if (lhs.t === 'arr' && lhs.v.length === 0) {
          if (rhs.t === 'str' && rhs.v === '') return false;
          if (rhs.t === 'str') return rhs.v.length >= 0;
          return rhs.v.length >= 0 || rhs.v === false;
        }

        if (lhs.t === 'bool') lhs = {
          t: 'num',
          v: lhs.v === true ? 1 : 0,
          string: lhs.v === true ? '1' : '0'
        };
        if (rhs.t === 'bool') rhs = {
          t: 'num',
          v: rhs.v === true ? 1 : 0,
          string: lhs.v === true ? '1' : '0'
        };

        if (lhs.t === 'arr' && lhs.v.length > 0) {
          for (var q = 0; q < lhs.v.length; q++) {
            if (Number(lhs.v[q]) >= rhs.v) return true;
          }

          return false;
        }

        if (rhs.t === 'arr' && rhs.v.length > 0) {
          for (var r = 0; r < rhs.v.length; r++) {
            if (lhs.v >= Number(rhs.v[r])) return true;
          }

          return false;
        }

        if (lhs.t === 'arr' && lhs.v.length === 0) lhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (lhs.t === 'bool' && lhs.v === true) lhs = {
          t: 'num',
          string: '1',
          v: 1
        };
        if (lhs.t === 'bool' && lhs.v === false) lhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (rhs.t === 'arr' && rhs.v.length === 0) rhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (rhs.t === 'bool' && rhs.v === true) rhs = {
          t: 'num',
          string: '1',
          v: 1
        };
        if (rhs.t === 'bool' && rhs.v === false) rhs = {
          t: 'num',
          string: '0',
          v: 0
        };
        if (lhs.t === 'str' && rhs.t === 'str' && config.allowStringComparison) return lhs.v >= rhs.v;
        if (!isNumber(lhs.v) || !isNumber(rhs.v)) return false;
        return lhs.v >= rhs.v;

      case '!=':
        if (lhs.t === 'bool' && rhs.t === 'arr') {
          return lhs.v === rhs.v.length < 1;
        }

        if (rhs.t === 'bool' && lhs.t === 'arr') {
          return rhs.v === lhs.v.length < 1;
        }

        return lhs.v != rhs.v;

      case '&':
        return Boolean(lhs.v && rhs.v);

      case '|':
        return Boolean(lhs.v || rhs.v);
    }
  }

  module.exports = {
    handleOperation: handleOperation
  };
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var _require = __webpack_require__(0),
      DATE_STRING = _require.DATE_STRING,
      dateToDays = _require.dateToDays;

  var TOO_MANY_ARGS = new Error('too many args');
  var TOO_FEW_ARGS = new Error('too few args');
  var INVALID_ARGS = new Error('invalid args');
  var NATIVE_FUNS = /^id\(|^\([a-zA-Z]|lang\(|local-name|namespace-uri|last\(|name\(|child::|parent::|descendant::|descendant-or-self::|ancestor::|ancestor-or-self::sibling|following::|following-sibling::|preceding-sibling::|preceding::|attribute::/;

  function isNativeFunction(input) {
    return NATIVE_FUNS.test(input);
  }

  function checkMinMaxArgs(args, min, max) {
    if (min != null && args.length < min) throw TOO_FEW_ARGS;
    if (max != null && args.length > max) throw TOO_MANY_ARGS;
  }

  function checkNativeFn(name, args) {
    if (name === 'last') {
      checkMinMaxArgs(args, null, 0);
    } else if (/^(boolean|lang|ceiling|name|floor)$/.test(name)) {
      checkMinMaxArgs(args, 1, 1);
    } else if (/^(number|string|normalize-space|string-length)$/.test(name)) {
      checkMinMaxArgs(args, null, 1);
    } else if (name === 'substring') {
      checkMinMaxArgs(args, 2, 3);
    } else if (/^(starts-with|contains|substring-before|substring-after)$/.test(name)) {
      checkMinMaxArgs(args, 2, 2);
    } else if (name === 'translate') {
      checkMinMaxArgs(args, 3, 3);
    }
  }

  function preprocessNativeArgs(name, args) {
    if (name === 'number' && args.length) {
      if (args[0].t === 'arr') {
        args = [{
          t: 'num',
          v: args[0].v[0]
        }];
      } else if (args[0].t === 'str' && DATE_STRING.test(args[0].v)) {
        args = [{
          t: 'num',
          v: dateToDays(args[0].v)
        }];
      } else if (args[0].t === 'num' && args[0].v.toString().indexOf('e-') > 0) {
        args = [{
          t: 'num',
          v: 0
        }];
      }
    }

    if (name === 'name' && args.length < 2) throw TOO_FEW_ARGS;

    if (name === 'namespace-uri') {
      if (args.length > 1) throw TOO_MANY_ARGS;
      if (args.length === 0) throw TOO_FEW_ARGS;
      if (args.length === 1 && !isNaN(args[0].v)) throw INVALID_ARGS;
    }

    if (name === 'local-name') {
      if (args.length > 1) throw TOO_MANY_ARGS;
      if (args.length === 1 && !isNaN(args[0].v)) throw INVALID_ARGS;
    }

    if (name === 'substring' && args.length > 2 && args[1].v === Number.NEGATIVE_INFINITY && args[2].v === Number.POSITIVE_INFINITY) {
      args[0].v = '';
    }

    if (name === 'substring' && args.length > 1 && args[1].v < 0) {
      args[1].v = 0;
    }

    if (name === 'substring' && args.length > 2 && args[2].v === Number.POSITIVE_INFINITY) {
      args[2].v = args[0].v.length + 1;
    }

    checkNativeFn(name, args);
    return args;
  }

  module.exports = {
    isNativeFunction: isNativeFunction,
    preprocessNativeArgs: preprocessNativeArgs
  };
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function isOperation(input, rT) {
    return rT === XPathResult.NUMBER_TYPE && input.indexOf('(') < 0 && !input.startsWith('/');
  }

  var ARGS_REGEX = /\(\s*([^)]*)\)$/;

  function inputArgs(input) {
    var m = input.match(ARGS_REGEX);
    return m ? m[1].split(',') : [];
  }

  function preprocessInput(input, rT) {
    if (isOperation(input, rT)) {
      input = input.replace('\n', '');

      if (input.indexOf('mod') > 0) {
        input = input.replace('mod', ' mod ');
      }

      if (input.indexOf('div') > 0) {
        input = input.replace('div', ' div ');
      }
    }

    if (input === 'string(namespace::node())') {
      input = input.replace('namespace::node()', 'namespace-uri(/*)');
    }

    return input;
  }

  module.exports = {
    inputArgs: inputArgs,
    preprocessInput: preprocessInput
  };
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  var _require = __webpack_require__(13),
      _area = _require.area,
      _distance = _require.distance,
      areaOrDistance = _require.areaOrDistance;

  var _require2 = __webpack_require__(14),
      _digest = _require2.digest;

  var _require3 = __webpack_require__(16),
      randomToken = _require3.randomToken;

  var openrosa_xpath_extensions = function openrosa_xpath_extensions(config) {
    var TOO_MANY_ARGS = new Error('too many args'),
        TOO_FEW_ARGS = new Error('too few args'),
        MILLIS_PER_DAY = 1000 * 60 * 60 * 24,
        RAW_NUMBER = /^(-?[0-9]+)(\.[0-9]+)?$/,
        DATE_STRING = /^\d\d\d\d-\d{1,2}-\d{1,2}(?:T\d\d:\d\d:\d\d\.?\d?\d?(?:Z|[+-]\d\d:\d\d)|.*)?$/,
        XPR = {
      nodes: function nodes(val) {
        return {
          t: 'nodes',
          v: val
        };
      },
      "boolean": function boolean(val) {
        return {
          t: 'bool',
          v: val
        };
      },
      number: function number(val) {
        return {
          t: 'num',
          v: val
        };
      },
      string: function string(val) {
        return {
          t: 'str',
          v: val
        };
      },
      date: function date(val) {
        if (!(val instanceof Date)) throw new Error('Cannot create date from ' + val + ' (' + _typeof(val) + ')');
        return {
          t: 'date',
          v: val
        };
      }
    },
        _zeroPad = function _zeroPad(n, len) {
      len = len || 2;
      n = n.toString();

      while (n.length < len) {
        n = '0' + n;
      }

      return n;
    },
        _int = function _int(r) {
      return Math.round(_float(r));
    },
        _float = function _float(r) {
      return r.t === 'num' ? r.v : parseFloat(_str(r));
    },
        _str = function _str(r) {
      return r.t === 'arr' ? r.v.length ? r.v[0].toString() : '' : r.v.toString();
    },
        _dateToString = function _dateToString(d) {
      return d.getFullYear() + '-' + _zeroPad(d.getMonth() + 1) + '-' + _zeroPad(d.getDate());
    },
        _round = function _round(num) {
      if (num < 0) {
        return -Math.round(-num);
      }

      return Math.round(num);
    },
        _uuid_part = function _uuid_part(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    },
        _date = function _date(it, keepTime) {
      var temp, t;

      if (it.v instanceof Date) {
        return new Date(it.v);
      }

      it = _str(it);

      if (RAW_NUMBER.test(it)) {
        temp = new Date(1970, 0, 1);
        temp.setDate(1 + parseInt(it, 10));
        return temp;
      } else if (DATE_STRING.test(it)) {
        if (keepTime && it.indexOf('T') > 0) return new Date(it);
        t = it.indexOf('T');
        if (t !== -1) it = it.substring(0, t);
        temp = it.split('-');
        temp = new Date(temp[0], temp[1] - 1, temp[2]);
        return temp;
      }

      var d = new Date(it);
      return d == 'Invalid Date' ? null : d;
    },
        _dateForReturnType = function _dateForReturnType(it, rt) {
      if (rt === XPathResult.BOOLEAN_TYPE) {
        if (!it) return XPR["boolean"](false);
        return XPR["boolean"](!isNaN(new Date(it).getTime()));
      }

      if (rt === XPathResult.NUMBER_TYPE) {
        if (!it) return XPR.number(0);
        return XPR.number(new Date(it).getTime() / (1000 * 60 * 60 * 24));
      }

      if (rt === XPathResult.STRING_TYPE) {
        if (!it) return XPR.string('Invalid Date');
        return XPR.string(new Date(it).toISOLocalString());
      }

      if (!it) return XPR.string('Invalid Date');
      return XPR.date(it);
    },
        _uuid = function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, _uuid_part);
    },
        date = function date(it, rt) {
      it = _date(it);
      return _dateForReturnType(it, rt);
    },
        format_date = function format_date(date, format) {
      date = _date(date, true);
      if (!format) return '';
      format = _str(format);
      if (!date) return 'Invalid Date';
      var c,
          i,
          sb = '',
          f = {
        year: 1900 + date.getYear(),
        month: 1 + date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millis: date.getMilliseconds(),
        secTicks: date.getTime(),
        dow: 1 + date.getDay()
      };
      var locale = window ? window.enketoFormLocale : undefined;

      for (i = 0; i < format.length; ++i) {
        c = format.charAt(i);

        if (c === '%') {
          if (++i >= format.length) {
            throw new Error("date format string ends with %");
          }

          c = format.charAt(i);

          if (c === '%') {
            sb += '%';
          } else if (c === 'Y') {
            sb += _zeroPad(f.year, 4);
          } else if (c === 'y') {
            sb += _zeroPad(f.year, 4).substring(2);
          } else if (c === 'm') {
            sb += _zeroPad(f.month, 2);
          } else if (c === 'n') {
            sb += f.month;
          } else if (c === 'b') {
            sb += date.toLocaleDateString(locale, {
              month: 'short'
            });
          } else if (c === 'd') {
            sb += _zeroPad(f.day, 2);
          } else if (c === 'e') {
            sb += f.day;
          } else if (c === 'H') {
            sb += _zeroPad(f.hour, 2);
          } else if (c === 'h') {
            sb += f.hour;
          } else if (c === 'M') {
            sb += _zeroPad(f.minute, 2);
          } else if (c === 'S') {
            sb += _zeroPad(f.second, 2);
          } else if (c === '3') {
            sb += _zeroPad(f.millis, 3);
          } else if (c === 'a') {
            sb += date.toLocaleDateString(locale, {
              weekday: 'short'
            });
          } else if (c === 'Z' || c === 'A' || c === 'B') {
            throw new Error('unsupported escape in date format string [%' + c + ']');
          } else {
            throw new Error('unrecognized escape in date format string [%' + c + ']');
          }
        } else {
          sb += c;
        }
      }

      return sb;
    },
        func,
        process,
        ret = {},
        now_and_today = function now_and_today(rt, resetTime) {
      return _dateForReturnType(ret._now(resetTime), rt);
    };

    func = {
      abs: function abs(r) {
        return XPR.number(Math.abs(r.v));
      },
      acos: function acos(r) {
        return XPR.number(Math.acos(r.v));
      },
      asin: function asin(r) {
        return XPR.number(Math.asin(r.v));
      },
      atan: function atan(r) {
        return XPR.number(Math.atan(r.v));
      },
      atan2: function atan2(r) {
        if (arguments.length > 1) {
          var y = arguments[0].v;
          var x = arguments[1].v;
          return XPR.number(Math.atan2(y, x));
        }

        return XPR.number(Math.atan2(r.v));
      },
      'boolean-from-string': function booleanFromString(string) {
        string = _str(string);
        return XPR["boolean"](string === '1' || string === 'true');
      },
      area: function area(r) {
        if (arguments.length === 0) throw TOO_FEW_ARGS;
        return areaOrDistance(XPR.number, _area, r);
      },
      checklist: function checklist(min, max) {
        var i,
            j,
            trues = 0;
        min = min.v;
        max = max.v;

        for (i = 2; i < arguments.length; i++) {
          var arg = arguments[i];

          if (arg.t === 'bool' && Boolean(arg.v)) {
            trues++;
          } else if (arg.t === 'arr') {
            for (j = 0; j < arg.v.length; j++) {
              if (Boolean(arg.v[j])) trues++;
            }
          }
        }

        return XPR["boolean"]((min < 0 || trues >= min) && (max < 0 || trues <= max));
      },
      coalesce: function coalesce(a, b) {
        return XPR.string(_str(a) || _str(b));
      },
      concat: function concat() {
        var out = [];

        for (var j = 0; j < arguments.length; j++) {
          if (arguments[j].t === 'arr') {
            out.push(arguments[j].v.join(''));
          } else {
            out.push(arguments[j].v);
          }
        }

        return XPR.string(out.join(''));
      },
      cos: function cos(r) {
        return XPR.number(Math.cos(r.v));
      },
      'count-non-empty': function countNonEmpty(r) {
        if (arguments.length === 0 || r.t !== 'arr') throw TOO_FEW_ARGS;
        var counter = 0;

        for (var j = 0; j < r.v.length; j++) {
          counter += r.v[j] === '' ? 0 : 1;
        }

        return XPR.number(counter);
      },
      'count-selected': function countSelected(s) {
        var parts = _str(s).split(' '),
            i = parts.length,
            count = 0;

        while (--i >= 0) {
          if (parts[i].length) ++count;
        }

        return XPR.number(count);
      },
      date: function date(it, rt) {
        it = _date(it);
        return _dateForReturnType(it, rt);
      },
      'decimal-date': function decimalDate(date) {
        if (arguments.length > 1) throw TOO_MANY_ARGS;
        var res = Date.parse(_str(date)) / MILLIS_PER_DAY;
        return XPR.number(Math.round(res * 1000) / 1000);
      },
      'decimal-time': function decimalTime(r) {
        if (arguments.length > 1) throw TOO_MANY_ARGS;
        if (r.t === 'num') return XPR.number(NaN);
        var time = r.v;
        var m = time.match(/^(\d\d):(\d\d):(\d\d)(\.\d\d?\d?)?(\+|-)(\d\d):(\d\d)$/);
        var PRECISION = 1000;
        var dec;

        if (m && m[1] < 24 && m[1] >= 0 && m[2] < 60 && m[2] >= 0 && m[3] < 60 && m[3] >= 0 && m[6] < 24 && m[6] >= 0 && m[7] < 60 && m[7] >= 0) {
            var pad2 = function pad2(x) {
              return x < 10 ? '0' + x : x;
            };

            var today = new Date();
            var d = new Date(today.getFullYear() + '-' + pad2(today.getMonth() + 1) + '-' + pad2(today.getDate()) + 'T' + time);

            if (d.toString() === 'Invalid Date') {
              dec = NaN;
            } else {
              dec = Math.round((d.getSeconds() / 3600 + d.getMinutes() / 60 + d.getHours()) * PRECISION / 24) / PRECISION;
            }
          } else {
          dec = NaN;
        }

        return XPR.number(dec);
      },
      digest: function digest(msg, algo, encoding) {
        return XPR.string(_digest(msg, algo, encoding));
      },
      distance: function distance(r) {
        if (arguments.length === 0) throw TOO_FEW_ARGS;
        return areaOrDistance(XPR.number, _distance, r);
      },
      exp: function exp(r) {
        return XPR.number(Math.exp(r.v));
      },
      exp10: function exp10(r) {
        return XPR.number(Math.pow(10, r.v));
      },
      'false': function _false(rt) {
        if (rt === XPathResult.NUMBER_TYPE) return XPR.number(0);
        if (arguments.length > 1) throw TOO_MANY_ARGS;
        return XPR["boolean"](false);
      },
      'format-date': function formatDate(date, format) {
        return XPR.string(format_date(date, format));
      },
      'if': function _if(con, a, b) {
        if (con.t === 'bool') return XPR.string(Boolean(con.v) ? a.v : b.v);

        if (con.t === 'arr') {
          var exists = con.v.length && con.v[0] !== null;
          return XPR.string(exists ? a.v : b.v);
        }

        return XPR.string(b.v);
      },
      'ends-with': function endsWith(a, b) {
        if (arguments.length > 2) throw TOO_MANY_ARGS;
        if (arguments.length < 2) throw TOO_FEW_ARGS;
        return XPR["boolean"](a.v.endsWith(b.v));
      },
      "int": function int(v) {
        if (v.t === 'str' && v.v.indexOf('e-') > 0) return XPR.number(NaN);
        v = _str(v);
        if (v.indexOf('e-') > 0) return XPR.number(0);
        return XPR.number(parseInt(v, 10));
      },
      join: function join() {
        var delim = arguments[0];
        if (arguments.length < 2) return XPR.string('');

        if (arguments.length > 2) {
          var out = [];

          for (var i = 1; i < arguments.length; i++) {
            out.push(arguments[i].v);
          }

          return XPR.string(out.join(_str(delim)));
        }

        return XPR.string(arguments[1].v.join(_str(delim)));
      },
      log: function log(r) {
        return XPR.number(Math.log(r.v));
      },
      log10: function log10(r) {
        return XPR.number(Math.log10(r.v));
      },
      max: function max() {
        if (arguments.length > 1) {
          var out = [];

          for (var j = 0; j < arguments.length; j++) {
            out.push(arguments[j].v);
          }

          return XPR.number(Math.max.apply(null, out));
        }

        var max, i;
        var r = arguments[0].v;
        if (!(i = r.length)) return XPR.number(NaN);
        max = parseFloat(r[0]);

        while (--i) {
          max = Math.max(max, parseFloat(r[i]));
        }

        return XPR.number(max);
      },
      min: function min() {
        if (arguments.length > 1) {
          var out = [];

          for (var j = 0; j < arguments.length; j++) {
            out.push(arguments[j].v);
          }

          return XPR.number(Math.min.apply(null, out));
        }

        var min, i;
        var r = arguments[0].v;
        if (!(i = r.length)) return XPR.number(NaN);
        min = parseFloat(r[0]);

        while (--i) {
          min = Math.min(min, parseFloat(r[i]));
        }

        return XPR.number(min);
      },
      not: function not(r) {
        if (arguments.length === 0) throw TOO_FEW_ARGS;
        if (arguments.length > 1) throw TOO_MANY_ARGS;
        return XPR["boolean"](!r.v);
      },
      now: function now(rt) {
        return now_and_today(rt);
      },
      today: function today(rt) {
        var r = now_and_today(rt, !config.returnCurrentTimeForToday);

        if (rt === XPathResult.STRING_TYPE && !config.includeTimeForTodayString) {
          r.v = r.v.split('T')[0];
        }

        return r;
      },
      once: function once(node, r) {
        if (node.v.length && node.v[0].length) {
          return XPR.string(node.v[0]);
        }

        if (r.v == Infinity) return XPR.string('');
        if (r.t === 'num' && r.v === 0) return XPR.string('');
        return XPR.string(r.v);
      },
      pi: function pi() {
        return XPR.number(Math.PI);
      },
      position: function position(r) {
        var position = 1;

        if (r) {
          var node = r.iterateNext();
          var nodeName = node.tagName;

          while (node.previousElementSibling && node.previousElementSibling.tagName === nodeName) {
            node = node.previousElementSibling;
            position++;
          }
        }

        return XPR.number(position);
      },
      pow: function pow(x, y) {
        return XPR.number(Math.pow(_float(x), _float(y)));
      },
      random: function random() {
        return XPR.number(Math.random());
      },
      randomize: function randomize(r) {
        if (arguments.length === 1) throw TOO_FEW_ARGS;
        if (arguments.length > 3) throw TOO_MANY_ARGS;
        var seed = arguments.length > 2 ? arguments[1] : arguments[2];
        var rt = arguments[arguments.length - 1];

        if (rt === XPathResult.BOOLEAN_TYPE) {
          return XPR["boolean"](r.v.length > 0 ? true : false);
        }

        if (rt === XPathResult.STRING_TYPE) {
          if (r.v.length < 1) return '';
          return XPR.string(r.v[0]);
        }

        if (Array.isArray(seed) && seed.length && seed[0].nodeType === 1) {
          return [r, parseInt(seed[0].textContent)];
        }

        return [r, seed && seed.v];
      },
      regex: function regex(haystack, pattern) {
        return XPR["boolean"](new RegExp(_str(pattern)).test(_str(haystack)));
      },
      round: function round(number, num_digits) {
        if (arguments.length === 0) throw TOO_FEW_ARGS;
        if (arguments.length > 2) throw TOO_MANY_ARGS;
        number = _float(number);

        if (!num_digits) {
          return XPR.number(_round(number));
        }

        num_digits = _int(num_digits);
        var pow = Math.pow(10, Math.abs(num_digits));

        if (num_digits > 0) {
          return XPR.number(_round(number * pow) / pow);
        } else {
          return XPR.number(pow * _round(number / pow));
        }
      },
      selected: function selected(haystack, needle) {
        return XPR["boolean"](_str(haystack).split(' ').indexOf(_str(needle).trim()) !== -1);
      },
      'selected-at': function selectedAt(list, index) {
        if (!index) throw new Error(JSON.stringify(list));
        return XPR.string(_str(list).split(' ')[_int(index)] || '');
      },
      sin: function sin(r) {
        return XPR.number(Math.sin(r.v));
      },
      sqrt: function sqrt(r) {
        return XPR.number(Math.sqrt(r.v));
      },
      substr: function substr(string, startIndex, endIndex) {
        return XPR.string(_str(string).slice(_int(startIndex), endIndex && _int(endIndex)));
      },
      sum: function sum(r) {
        if (arguments.length > 1) throw TOO_MANY_ARGS;
        var out = 0;

        for (var i = 0; i < r.v.length; i++) {
          if (!RAW_NUMBER.test(r.v[i])) XPR.number(NaN);
          out += parseInt(r.v[i], 10);
        }

        return XPR.number(out);
      },
      tan: function tan(r) {
        return XPR.number(Math.tan(r.v));
      },
      'true': function _true(rt) {
        if (rt === XPathResult.NUMBER_TYPE) return XPR.number(1);
        if (arguments.length > 1) throw TOO_MANY_ARGS;
        return XPR["boolean"](true);
      },
      uuid: function uuid(r) {
        if (r && r.v) return XPR.string(randomToken(r.v));
        return XPR.string(_uuid());
      },
      'weighted-checklist': function weightedChecklist(min, max) {
        var i,
            values = [],
            weights = [],
            weightedTrues = 0;
        min = min.v;
        max = max.v;

        for (i = 2; i < arguments.length; i = i + 2) {
          var v = arguments[i];
          var w = arguments[i + 1];

          if (v && w) {
            values.push(v.t === 'arr' ? v.v[0] : v.v);
            weights.push(w.t === 'arr' ? w.v[0] : w.v);
          }
        }

        for (i = 0; i < values.length; i++) {
          if (Boolean(values[i])) {
            weightedTrues += weights[i];
          }
        }

        return XPR["boolean"]((min < 0 || weightedTrues >= min) && (max < 0 || weightedTrues <= max));
      }
    };
    func['date-time'] = func.date;
    func['decimal-date-time'] = func['decimal-date'];
    func['format-date-time'] = func['format-date'];
    process = {
      toExternalResult: function toExternalResult(r) {
        if (r.t === 'date') return {
          resultType: XPathResult.STRING_TYPE,
          numberValue: r.v.getTime(),
          stringValue: _dateToString(r.v)
        };
      },
      typefor: function typefor(val) {
        if (val instanceof Date) return 'date';
      },
      handleInfix: function handleInfix(err, lhs, op, rhs) {
        if (lhs.t === 'date' || rhs.t === 'date') {
          if (op.v === '=' || op.v === '<' || op.v === '>' || op.v === '<=' || op.v === '>=' || op.v === '!=') {
            if (lhs.t === 'arr' || lhs.t === 'str') lhs = date(lhs);
            if (rhs.t === 'arr' || rhs.t === 'str') rhs = date(rhs);

            if (lhs.t !== 'date' || rhs.t !== 'date') {
              return op.v === '!=';
            } else {
              lhs = {
                t: 'num',
                v: lhs.v.getTime()
              };
              rhs = {
                t: 'num',
                v: rhs.v.getTime()
              };
            }
          } else if (op.v === '+' || op.v === '-') {
            if (lhs.t === 'date' && rhs.t === 'date') err();
            var d = lhs.t === 'date' ? lhs.v : rhs.v,
                n = lhs.t !== 'date' ? _int(lhs) : _int(rhs),
                res = new Date(d.getTime());
            if (op.v === '-') n = -n;
            res.setDate(d.getDate() + n);
            return res;
          }

          return {
            t: 'continue',
            lhs: lhs,
            op: op,
            rhs: rhs
          };
        }
      }
    };
    ret.func = func;
    ret.process = process;
    ret.XPR = XPR;

    ret._now = function (resetTime) {
      var t = new Date();

      if (resetTime) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate());
      }

      return t;
    };

    return ret;
  };

  module.exports = openrosa_xpath_extensions;
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var EARTH_EQUATORIAL_RADIUS_METERS = 6378100;
  var PRECISION = 100;

  function _toLatLngs(geopoints) {
    return geopoints.map(function (geopoint) {
      return geopoint.trim().split(' ');
    });
  }

  function _toRadians(angle) {
    return angle * Math.PI / 180;
  }

  function _latLngsValid(latLngs) {
    return latLngs.every(function (coords) {
      return coords[0] !== '' && coords[0] >= -90 && coords[0] <= 90 && coords[1] !== '' && coords[1] >= -180 && coords[1] <= 180 && (typeof coords[2] == 'undefined' || !isNaN(coords[2])) && (typeof coords[3] == 'undefined' || !isNaN(coords[3]) && coords[3] >= 0);
    });
  }

  function _distanceBetween(p1, p2) {
    var Δλ = _toRadians(p1.lng - p2.lng);

    var φ1 = _toRadians(p1.lat);

    var φ2 = _toRadians(p2.lat);

    return Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * EARTH_EQUATORIAL_RADIUS_METERS;
  }

  function areaOrDistance(xpr, fn, r) {
    var geopoints = [];
    if (r.t === 'str') geopoints = r.v.split(';');

    if (r.t === 'arr') {
      if (r.v.length === 1) geopoints = r.v[0].split(';');else geopoints = r.v;
    }

    return xpr(fn(geopoints));
  }

  function area(geopoints) {
    var latLngs = _toLatLngs(geopoints);

    if (!_latLngsValid(latLngs)) {
      return Number.NaN;
    }

    var pointsCount = latLngs.length;
    var area = 0.0;

    if (pointsCount > 2) {
      for (var i = 0; i < pointsCount; i++) {
        var p1 = {
          lat: latLngs[i][0],
          lng: latLngs[i][1]
        };
        var p2 = {
          lat: latLngs[(i + 1) % pointsCount][0],
          lng: latLngs[(i + 1) % pointsCount][1]
        };
        area += _toRadians(p2.lng - p1.lng) * (2 + Math.sin(_toRadians(p1.lat)) + Math.sin(_toRadians(p2.lat)));
      }

      area = area * EARTH_EQUATORIAL_RADIUS_METERS * EARTH_EQUATORIAL_RADIUS_METERS / 2.0;
    }

    return Math.abs(Math.round(area * PRECISION)) / PRECISION;
  }

  function distance(geopoints) {
    var latLngs = _toLatLngs(geopoints);

    if (!_latLngsValid(latLngs)) {
      return Number.NaN;
    }

    var pointsCount = latLngs.length;
    var distance = 0.0;

    if (pointsCount > 1) {
      for (var i = 1; i < pointsCount; i++) {
        var p1 = {
          lat: latLngs[i - 1][0],
          lng: latLngs[i - 1][1]
        };
        var p2 = {
          lat: latLngs[i][0],
          lng: latLngs[i][1]
        };
        distance += _distanceBetween(p1, p2);
      }
    }

    return Math.abs(Math.round(distance * PRECISION)) / PRECISION;
  }

  module.exports = {
    area: area,
    areaOrDistance: areaOrDistance,
    distance: distance
  };
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var forge = __webpack_require__(15);

  var digest = function digest(message, algo, encoding) {
    message = message.v;
    algo = algo && algo.v && algo.v.toLowerCase();
    encoding = encoding && encoding.v && encoding.v.toLowerCase() || 'base64';

    if (!algo || !/^(md5|sha-1|sha-256|sha-384|sha-512)$/.test(algo)) {
      throw new Error('Invalid algo.');
    }

    if (!/^(base64|hex)$/.test(encoding)) {
      throw new Error('Invalid encoding.');
    }

    var md = forge.md[algo.replace('-', '')].create();
    md.update(message);
    var hashBuffer = md.digest();

    if (!encoding || encoding === 'base64') {
      return forge.util.encode64(hashBuffer.bytes());
    }

    return md.digest().toHex();
  };

  module.exports = {
    digest: digest
  };
});

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function _random13chars() {
    return Math.random().toString(16).substring(2);
  }

  function randomToken(length) {
    var loops = Math.ceil(length / 13);
    return new Array(loops).fill(_random13chars).reduce(function (string, func) {
      return string + func();
    }, '').substring(0, length);
  }

  module.exports = {
    randomToken: randomToken
  };
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=orxe.js.map