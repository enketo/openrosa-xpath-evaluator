require('./date-extensions');
var {asGeopoints, area, distance} = require('./geo');
var {digest} = require('./digest');
var {randomToken} = require('./random-token');
var xpr = require('./xpr');
var {isValidDate} = require('./utils/date');
var shuffle = require('./utils/shuffle');
var {asBoolean, asNumber, asString} = require('./utils/xpath-cast');

var openrosa_xpath_extensions = function(config) {
  var
      TOO_MANY_ARGS = new Error('too many args'),
      TOO_FEW_ARGS = new Error('too few args'),
      MILLIS_PER_DAY = 1000 * 60 * 60 * 24,
      RAW_NUMBER = /^(-?[0-9]+)(\.[0-9]+)?$/,
      DATE_STRING = /^\d\d\d\d-\d{1,2}-\d{1,2}(?:T\d\d:\d\d:\d\d\.?\d?\d?(?:Z|[+-]\d\d:\d\d)|.*)?$/,
      XPR = xpr,
      _zeroPad = function(n, len) {
        len = len || 2;
        n = n.toString();
        while(n.length < len) n = '0' + n;
        return n;
      },
      _int = function(r) { return Math.round(_float(r)); },
      _float = function(r) { return r.t === 'num'? r.v: parseFloat(_str(r)); },
      _str = function(r) {
        return r.t === 'arr' ?
               r.v.length ? r.v[0].toString() : '' :
            r.v.toString();
      },
      _dateToString = function(d) {
            return d.getFullYear() + '-' + _zeroPad(d.getMonth()+1) + '-' +
                _zeroPad(d.getDate());
      },
      _round = function(num) {
        if(num < 0) {
          return -Math.round(-num);
        }
        return Math.round(num);
      },
      _uuid_part = function(c) {
        var r = Math.random()*16|0,
            v = c == 'x' ? r : r&0x3|0x8;
        return v.toString(16);
      },
      _date = function(it, keepTime) {
        var temp, t;
        if(it.v instanceof Date) {
          return new Date(it.v);
        }
        it = asString(it);
        if(RAW_NUMBER.test(it)) {
          // Create a date at 00:00:00 1st Jan 1970 _in the current timezone_
          temp = new Date(1970, 0, 1);
          temp.setDate(1 + parseInt(it, 10));
          return temp;
        } else if(DATE_STRING.test(it)) {
          if(keepTime && it.indexOf('T')>0) return new Date(it);
          t = it.indexOf('T');
          if(t !== -1) it = it.substring(0, t);
          temp = it.split('-');
          if(isValidDate(temp[0], temp[1], temp[2])) {
            if(config.includeLocalTimeForDatesWithoutTime) {
              var time = `${_zeroPad(temp[0])}-${_zeroPad(temp[1])}-${_zeroPad(temp[2])}`+
                'T00:00:00.000' + (new Date(it)).getTimezoneOffsetAsTime();
              return new Date(time);
            }
            return new Date(temp[0], temp[1]-1, temp[2]);
          }
        }
        var d = new Date(it);
        return d == 'Invalid Date' ? null : d;
      },
      _dateForReturnType = function(it, rt) {
        if(rt === XPathResult.BOOLEAN_TYPE) {
          if(!it) return XPR.boolean(false);
          return XPR.boolean(!isNaN(new Date(it).getTime()));
        }
        if(rt === XPathResult.NUMBER_TYPE) {
          if(!it) return XPR.number(0);
          return XPR.number((new Date(it).getTime()) / (1000 * 60 * 60 * 24));
        }
        if(rt === XPathResult.STRING_TYPE) {
          if(!it) {
            return XPR.string(config.returnEmptyStringForInvalidDate ? '' : 'Invalid Date');
          }
          return XPR.string(new Date(it).toISOLocalString());
        }
        if(!it) return XPR.string('Invalid Date');
        return XPR.date(it);
      },
      uuid = function() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                  .replace(/[xy]/g, _uuid_part);
      },
      date = function(it, rt) {
        it = _date(it);
        return _dateForReturnType(it, rt);
      },
      format_date = function(date, format) {
        date = _date(date, true);
        if(!format) return '';
        format = asString(format);
        if(!date) return 'Invalid Date';
        var c, i, sb = '', f = {
          year: 1900 + date.getYear(),
          month: 1 + date.getMonth(),
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          millis: date.getMilliseconds(),
          secTicks: date.getTime(),
          dow: 1 + date.getDay(),
        };
        var locale = window ? window.enketoFormLocale : undefined;

        for(i=0; i<format.length; ++i) {
          c = format.charAt(i);

          if (c === '%') {
            if(++i >= format.length) {
              throw new Error("date format string ends with %");
            }
            c = format.charAt(i);

            if (c === '%') { // literal '%'
              sb += '%';
            } else if (c === 'Y') {  //4-digit year
              sb += _zeroPad(f.year, 4);
            } else if (c === 'y') {  //2-digit year
              sb += _zeroPad(f.year, 4).substring(2);
            } else if (c === 'm') {  //0-padded month
              sb += _zeroPad(f.month, 2);
            } else if (c === 'n') {  //numeric month
              sb += f.month;
            } else if (c === 'b') {  //short text month
              sb += date.toLocaleDateString( locale, { month: 'short' } );
            } else if (c === 'd') {  //0-padded day of month
              sb += _zeroPad(f.day, 2);
            } else if (c === 'e') {  //day of month
              sb += f.day;
            } else if (c === 'H') {  //0-padded hour (24-hr time)
              sb += _zeroPad(f.hour, 2);
            } else if (c === 'h') {  //hour (24-hr time)
              sb += f.hour;
            } else if (c === 'M') {  //0-padded minute
              sb += _zeroPad(f.minute, 2);
            } else if (c === 'S') {  //0-padded second
              sb += _zeroPad(f.second, 2);
            } else if (c === '3') {  //0-padded millisecond ticks (000-999)
              // sb += _zeroPad(f.secTicks, 3);
              sb += _zeroPad(f.millis, 3);
            } else if (c === 'a') {  //Three letter short text day
              sb += date.toLocaleDateString( locale, { weekday: 'short' } );
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
      func, process, ret = {},
      now_and_today = function(rt, resetTime) {
        return _dateForReturnType(ret._now(resetTime), rt);
      };

  func = {
    abs: function(r) { return XPR.number(Math.abs(asNumber(r))); },
    acos: function(r) { return XPR.number(Math.acos(asNumber(r))); },
    asin: function(r) { return XPR.number(Math.asin(asNumber(r))); },
    atan: function(r) { return XPR.number(Math.atan(asNumber(r))); },
    atan2: function(r) {
      if(arguments.length > 1) {
        var y = asNumber(arguments[0]);
        var x = asNumber(arguments[1]);
        return XPR.number(Math.atan2(y, x));
      }
      return XPR.number(Math.atan2(r.v));
    },
    boolean: function(r) {
      if(arguments.length === 0) throw new Error('too few args');
      if(arguments.length > 1) throw new Error('too few args');
      return XPR.boolean(asBoolean(r));
    },
    'boolean-from-string': function(r) {
      if(r.t === 'num' && r.v > 0 && !r.decimal) {
        return XPR.boolean(true);
      }
      r = _str(r);
      return XPR.boolean(r === '1' || r === 'true');
    },
    area: function(r) {
      if(arguments.length === 0) throw TOO_FEW_ARGS;
      return XPR.number(area(asGeopoints(r)));
    },
    checklist: function(min, max) {
      var trues;
      min = asNumber(min);
      max = asNumber(max);
      trues = mapFn(asBoolean, ...[...arguments].slice(2)).reduce((acc, v) => v ? acc + 1 : acc, 0);
      return XPR.boolean((min < 0 || trues >= min) && (max < 0 || trues <= max));
    },
    coalesce: function(a, b) { return XPR.string(asString(a) || asString(b)); },
    concat: function() {
      return XPR.string(mapFn(asString, ...arguments).join(''));
    },
    cos: function(r) { return XPR.number(Math.cos(asNumber(r))); },
    count: function(selecter) {
      // count() is part of XPath 1.0, but Chrome and Firefox disagree on how it should work.
      if(arguments.length === 0) throw new Error('too few args');
      if(arguments.length > 1) throw new Error('too few args');
      if(selecter.t !== 'arr') throw new Error("Unpexpected arg type: '" + selecter.t + "'");
      return XPR.number(selecter.v.length);
    },
    'count-non-empty': function(r) {
      if(!arguments.length === 0) throw new Error('too few args');
      if(arguments.length > 1) throw new Error('too many args');
      if(r.t !== 'arr') throw new Error('wrong arg type:' + JSON.stringify(r));
      return XPR.number(mapFn(asString, r).reduce((acc, v) => v ? acc + 1 : acc, 0));
    },
    'count-selected': function(s) {
      var parts = asString(s).split(' '),
          i = parts.length,
          count = 0;
      while(--i >= 0) if(parts[i].length) ++count;
      return XPR.number(count);
    },
    date: function(it, rt) {
      it = _date(it);
      return _dateForReturnType(it, rt);
    },
    'decimal-date': function(date) {
      if(arguments.length > 1) throw TOO_MANY_ARGS;
      var res = Date.parse(_str(date)) / MILLIS_PER_DAY;
      return XPR.number(res);
    },
    'decimal-time': function(r) {
      if(arguments.length > 1) throw TOO_MANY_ARGS;
      if(r.t === 'num') return XPR.number(NaN);
      var time = r.v;
      // There is no Time type, and so far we don't need it so we do all validation
      // and conversion here, manually.
      var  m = time.match(/^(\d\d):(\d\d):(\d\d)(\.\d\d?\d?)?(\+|-)(\d\d):(\d\d)$/);
      var dec;
      if (m &&
        m[1] < 24 && m[1] >= 0 &&
        m[2] < 60 && m[2] >= 0 &&
        m[3] < 60 && m[3] >= 0 &&
        m[6] < 24 && m[6] >= 0 && // this could be tighter
        m[7] < 60 && m[7] >= 0 // this is probably either 0 or 30
      ) {
        var pad2 = function(x) { return (x < 10) ? '0' + x : x; };
        var today = new Date(); // use today to cater to daylight savings time.
        var d = new Date(today.getFullYear() + '-' + pad2(today.getMonth() + 1) + '-' + pad2(today.getDate()) + 'T' + time);
        if(d.toString() === 'Invalid Date'){
          dec = NaN;
        } else {
          dec = (d.getSeconds()/3600 + d.getMinutes()/60 + d.getHours()) / 24;
        }
      } else {
        dec = NaN;
      }
      return XPR.number(dec);
    },
    digest: function(msg, algo, encoding) {
      return XPR.string(digest(msg, algo, encoding));
    },
    distance: function(r) {
      if(arguments.length === 0) throw TOO_FEW_ARGS;
      return XPR.number(distance(asGeopoints(r)));
    },
    exp: function(r) { return XPR.number(Math.exp(r.v)); },
    exp10: function(r) { return XPR.number(Math.pow(10, r.v)); },
    'false': function() {
      if(arguments.length) throw TOO_MANY_ARGS;
      return XPR.boolean(false);
    },
    'format-date': function(date, format) {
      return XPR.string(format_date(date, format)); },
    if: function(con, a, b) {
      return XPR.string(asBoolean(con) ? asString(a) : asString(b));
    },
    'ends-with': function(a, b) {
      if(arguments.length > 2) throw TOO_MANY_ARGS;
      if(arguments.length < 2) throw TOO_FEW_ARGS;
      return XPR.boolean(a.v.endsWith(b.v));
    },
    int: function(v) {
      return XPR.number(asInteger(v));
    },
    join: function(delim) {
      const args = Array.prototype.slice.call(arguments, 1);
      return XPR.string(mapFn(asString, ...args).join(asString(delim)));
    },
    log: function(r) { return XPR.number(Math.log(r.v)); },
    log10: function(r) { return XPR.number(Math.log10(r.v)); },
    max: function(...args) {
      const nums = mapFn(asNumber, ...args);
      if(!nums.length || nums.some(v => isNaN(v))) return XPR.number(NaN);
      return XPR.number(Math.max(...nums));
    },
    min: function(...args) {
      const nums = mapFn(asNumber, ...args);
      if(!nums.length || nums.some(v => isNaN(v))) return XPR.number(NaN);
      return XPR.number(Math.min(...nums));
    },
    'normalize-space': function(r) {
      // TODO this seems to do a lot more than the spec at https://www.w3.org/TR/1999/REC-xpath-19991116/#function-normalize-space
      // I think we should just be able to return: XPR.string(asString(r || this).replace(/[\t\r\n ]+/g, ' ').trim());
      if(arguments.length > 1) throw new Error('too many args');

      let res = asString(r || this);

      res = res.replace(/\f/g, '\\f');
      res = res.replace(/\r\v/g, '\v');
      res = res.replace(/\v/g, '\\v');
      res = res.replace(/\s+/g, ' ');
      res = res.replace(/^\s+|\s+$/g, '');
      res = res.replace(/\\v/g, '\v');
      res = res.replace(/\\f/g, '\f');

      return XPR.string(res);
    },
    /*
     * As per https://github.com/alxndrsn/openrosa-xpath-evaluator/issues/15,
     * the pass-through to the wrapped implementation always requests
     * XPathResult.STRING_TYPE.  This seems to cause an issue with the response
     * from `not()` calls, which should ideally be handled by the built-in
     * XPath implementation.  The following method is supplied as a workaround,
     * and ideally would be unnecessary.
     */
    not: function(r) {
      if(arguments.length === 0) throw TOO_FEW_ARGS;
      if(arguments.length > 1) throw TOO_MANY_ARGS;
      return XPR.boolean(!r.v);
    },
    now: function(rt) {
      return now_and_today(rt);
    },
    number: function(r) {
      if(arguments.length > 1) throw new Error(`number() passed wrong arg count (expected 0 or 1, but got ${arguments.length})`);
      return XPR.number(asNumber(arguments.length ? r : this));
    },
    today: function(rt) {
      var r = now_and_today(rt, !config.returnCurrentTimeForToday);
      if(rt === XPathResult.STRING_TYPE && !config.includeTimeForTodayString) {
        r.v = r.v.split('T')[0];
      }
      return r;
    },
    /**
     * The once function returns the value of the parameter if its own value
     * is not empty, NaN, [Infinity or -Infinity]. The naming is therefore misleading!
     * Also note that the parameter expr is always evaluated.
     * This function simply decides whether to return the new result or the old value.
     */
    once: function(r) {
      const current = asString(this);
      return XPR.string(current || asString(r));
    },
    pi: function() { return XPR.number(Math.PI); },
    position: function(r) {
      if(arguments.length > 1) throw new Error('too many args');
      if(r && r.t !== 'arr') throw new Error('wrong arg type for position() - expected nodeset, but got: ' + r.t);
      if(r && !r.v.length) throw new Error('cannot call position() on an empty nodeset');

      var position = 1;
      var node = r ? r.v[0] : this;
      var nodeName = node.tagName;
      while (node.previousElementSibling && node.previousElementSibling.tagName === nodeName) {
        node = node.previousElementSibling;
        position++;
      }

      return XPR.number(position);
    },
    pow: function(x, y) { return XPR.number(Math.pow(asNumber(x), asNumber(y))); },
    random: function() { return XPR.number(parseFloat(Math.random().toFixed(15))); },
    randomize: function(r, seed) {
      if(!arguments.length) throw TOO_FEW_ARGS;//only rT passed
      if(arguments.length > 2) throw TOO_MANY_ARGS;

      seed = seed && asNumber(seed);

      return { t:'arr', v:shuffle(r.v, seed) };
    },
    regex: function(haystack, pattern) {
        return XPR.boolean(new RegExp(asString(pattern)).test(asString(haystack))); },
    round: function(number, num_digits) {
      if(arguments.length === 0) throw TOO_FEW_ARGS;
      if(arguments.length > 2) throw TOO_MANY_ARGS;
      number = _float(number);
      if(!num_digits) {
        return XPR.number(_round(number));
      }
      num_digits = _int(num_digits);
      var pow = Math.pow(10, Math.abs(num_digits));
      if(num_digits > 0) {
        return XPR.number(_round(number * pow) / pow);
      } else {
        return XPR.number(pow * _round(number / pow));
      }
    },
    selected: function(haystack, needle) {
      return XPR.boolean(asString(haystack).split(' ').indexOf(asString(needle).trim()) !== -1);
    },
    'selected-at': function(list, index) {
      if(!index) throw new Error('No index provided for selected-at() [index=' + index + '; list=' + JSON.stringify(list));
      return XPR.string(asString(list).split(' ')[asInteger(index)] || '');
    },
    sin: function(r) { return XPR.number(Math.sin(asNumber(r))); },
    sqrt: function(r) { return XPR.number(Math.sqrt(r.v)); },
    string: function(r) {
      if(arguments.length > 1) throw new Error(`string() passed wrong arg count (expected 0 or 1, but got ${arguments.length})`);
      return XPR.string(asString(r || this));
    }, // TODO this is not an extension - should be a "native" function
    substr: function(s, startIndex, endIndex) {
      return XPR.string(asString(s).slice(asNumber(startIndex), endIndex && asNumber(endIndex)));
    },
    sum: function(r) {
      if(!r || r.t !== 'arr') throw new Error('sum() must be called on a nodeset');
      var sum = 0, i = r.v.length;
      while(i--) sum += asNumber(r.v[i]);
      return XPR.number(sum);
    },
    tan: function(r) { return XPR.number(Math.tan(asNumber(r))); },
    'true': function() {
      if(arguments.length) throw TOO_MANY_ARGS;
      return XPR.boolean(true);
    },
    uuid: function(r) {
      if(r && r.v) return XPR.string(randomToken(r.v));
      return XPR.string(uuid());
    },
    'weighted-checklist': function(min, max) {
      min = asNumber(arguments[0]);
      max = asNumber(arguments[1]);
      var i, values = [], weights = [], weightedTrues = 0;
      for(i=2 ; i<arguments.length ; i+=2) {
        var v = arguments[i];
        var w = arguments[i+1];
        if (v && w) {
          // value or weight might be a nodeset
          values = values.concat(mapFn(asBoolean, v));
          weights = weights.concat(mapFn(asNumber, w));
        }
      }
      for(i=0; i < values.length; i++) {
        if(values[i]) {
          weightedTrues += weights[i] || 0;
        }
      }
      return XPR.boolean((min < 0 || weightedTrues >= min) && (max < 0 || weightedTrues <= max));
    }
  };

  // function aliases
  func['date-time'] = func.date;
  func['decimal-date-time'] = func['decimal-date'];
  func['format-date-time'] = func['format-date'];

  process = {
      toExternalResult: function(r) {
        if(r.t === 'date') return {
          resultType:XPathResult.STRING_TYPE,
          // TODO a bit naughty, but we return both a string and number value
          // for dates.  We should actually know from where the xpath evaluator
          // was initially called whether we expect a STRING_TYPE or NUMBER_TYPE
          // result, but we should get away with it because:
          //   1. this setup makes testing easy
          //   2. dates should never leak outside openrosa functionality anyway
          numberValue:r.v.getTime(),
          stringValue:_dateToString(r.v),
        };
      },
      typefor: function(val) {
        if(val instanceof Date) return 'date';
      },
      handleInfix: function(err, lhs, op, rhs) {
        if(lhs.t === 'date' || rhs.t === 'date') {
          // For comparisons, we must make sure that both values are numbers
          // Dates would be fine, except for equality!
          if( op.v === '=' ||
              op.v === '<' ||
              op.v === '>' ||
              op.v === '<=' ||
              op.v === '>=' ||
              op.v === '!=') {
            if(lhs.t === 'arr' || lhs.t === 'str') lhs = date(lhs);
            if(rhs.t === 'arr' || rhs.t === 'str') rhs = date(rhs);
            if(lhs.t !== 'date' || rhs.t !== 'date') {
              return op.v === '!=';
            } else {
              lhs = { t:'num', v:lhs.v.getTime() };
              rhs = { t:'num', v:rhs.v.getTime() };
            }
          } else if(op.v === '+' || op.v === '-') {
            // for math operators, we need to do it ourselves
            if(lhs.t === 'date' && rhs.t === 'date') err('No handling for simple arithmetic with two dates.');
            var d = lhs.t === 'date'? lhs.v: rhs.v,
                n = lhs.t !== 'date'? _int(lhs): _int(rhs),
                res = new Date(d.getTime());
            if(op.v === '-') n = -n;
            res.setDate(d.getDate() + n);
            return res;
          }
          return { t:'continue', lhs:lhs, op:op, rhs:rhs };
        }
      },
  };

  ret.func = func;
  ret.process = process;
  ret.XPR = XPR;
  ret._now = function(resetTime) {
    var t = new Date();
    if(resetTime) {
      return new Date(t.getFullYear(), t.getMonth(), t.getDate());
    }
    return t;
  };
  ret.customXPathFunction = {
    type: {
      StringType: XPR.string,
      NumberType: XPR.number,
      BooleanType: XPR.boolean,
      DateType: XPR.date
    },
    add: function(name, fnObj) {
      func[name] = fnObj;
    },
    remove: function(name) {
      delete func[name];
    },
    all: function() {
      return func;
    }
  };


  return ret;
};

module.exports = openrosa_xpath_extensions;

function mapFn(fn) {
  var res = [], i, j;
  for(i=1; i<arguments.length; ++i) {
    if(arguments[i].t === 'arr') {
      for(j=0; j<arguments[i].v.length; ++j) {
        res.push(fn(arguments[i].v[j]));
      }
    } else res.push(fn(arguments[i]));
  }
  return res;
}

function asInteger(r) {
  var num = asNumber(r);
  return num > 0 ? Math.floor(num) : Math.ceil(num);
}
