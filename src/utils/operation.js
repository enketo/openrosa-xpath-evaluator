var { asBoolean, asNumber, asString } = require('./xpath-cast');

module.exports = {
  handleOperation:handleOperation,
};

function handleOperation(lhs, op, rhs) {
  // comparison operators as per: https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans
  switch(op) {
    case '+' : return asNumber(lhs) + asNumber(rhs);
    case '-' : return asNumber(lhs) - asNumber(rhs);
    case '*' : return asNumber(lhs) * asNumber(rhs);
    case '/' : return asNumber(lhs) / asNumber(rhs);
    case '%' : return asNumber(lhs) % asNumber(rhs);
    case '>' : return relationalCompare(lhs, rhs, (a, b) => a >  b);
    case '<' : return relationalCompare(lhs, rhs, (a, b) => a <  b);
    case '>=': return relationalCompare(lhs, rhs, (a, b) => a >= b);
    case '<=': return relationalCompare(lhs, rhs, (a, b) => a <= b);
    case '=' : return equalityCompare(lhs, rhs, (a, b) => a === b);
    case '!=': return equalityCompare(lhs, rhs, (a, b) => a !== b);
    case '&':  return asBoolean(lhs) && asBoolean(rhs);
    case '|':  return asBoolean(lhs) || asBoolean(rhs);
    case 'u': return [...lhs.v, ...rhs.v];
  }
}

function bothOf(lhs, rhs, t) {
  return lhs.t === t && rhs.t === t;
}

function oneOf(lhs, rhs, t) {
  return lhs.t === t || rhs.t === t;
}

function castFor(r) {
  switch(r.t) {
    case 'num': return asNumber;
    case 'str': return asString;
    default: throw new Error(`No cast for type: ${r.t}`);
  }
}


function relationalCompare(lhs, rhs, compareFn) {
  var i, j;
  if(bothOf(lhs, rhs, 'arr' )) {
    for(i=lhs.v.length-1; i>=0; --i) {
      for(j=rhs.v.length-1; j>=0; --j) {
        if(compareFn(asNumber(lhs.v[i]), asNumber(rhs.v[j]))) return true;
      }
    }
    return false;
  }
  if(lhs.t === 'arr') {
    rhs = asNumber(rhs);
    return lhs.v.map(asNumber).some(v => compareFn(v, rhs));
  }
  if(rhs.t === 'arr') {
    lhs = asNumber(lhs);
    return rhs.v.map(asNumber).some(v => compareFn(lhs, v));
  }
  return compareFn(asNumber(lhs), asNumber(rhs));
}

function equalityCompare(lhs, rhs, compareFn) {
  var i, j;
  if(bothOf(lhs, rhs, 'arr' )) {
    for(i=lhs.v.length-1; i>=0; --i) {
      for(j=rhs.v.length-1; j>=0; --j) {
        if(compareFn(lhs.v[i].textContent, rhs.v[j].textContent)) return true;
      }
    }
    return false;
  }
  if(oneOf(lhs, rhs, 'bool')) return compareFn(asBoolean(lhs), asBoolean(rhs));
  if(lhs.t === 'arr') {
    const cast = castFor(rhs);
    rhs = cast(rhs);
    return lhs.v.map(cast).some(v => compareFn(v, rhs));
  }
  if(rhs.t === 'arr') {
    const cast = castFor(lhs);
    lhs = cast(lhs);
    return rhs.v.map(cast).some(v => compareFn(v, lhs));
  }
  if(oneOf(lhs, rhs, 'num')) return compareFn(asNumber(lhs), asNumber(rhs));
  if(oneOf(lhs, rhs, 'str')) return compareFn(asString(lhs), asString(rhs));
  throw new Error('not handled yet for these types: ' + compareFn.toString());
}
