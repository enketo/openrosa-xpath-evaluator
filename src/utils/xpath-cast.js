module.exports = {
  asBoolean:asBoolean,
  asNumber:asNumber,
  asString:asString,
};

// cast to number, as per https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Boolean-Functions
function asBoolean(r) {
  dbg('asBoolean()', { r, type:(typeof r) });
  if(isDomNode(r)) return !!asString(r).trim();
  switch(r.t) {
    case 'arr': return !!r.v.length;
    default:    return !!r.v;
  }
}

// cast to number, as per https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Number-Functions
function asNumber(r) {
  if(r.t === 'num') return r.v;
  if(r.t === 'bool') return r.v ? 1 : 0;

  var str = asString(r).trim();
  if(str === '') return NaN;
  return +str;
}

// cast to string, as per https://www.w3.org/TR/1999/REC-xpath-19991116/#section-String-Functions
function asString(r) {
  dbg('asString()', { r, type:(typeof r), textContent:r.textContent });
  if(isDomNode(r)) return r.textContent || ''; // TODO currently unclear if `null` or `''` should be returned if textContent is null
  switch(r.t) {
    case 'str': return r.v;
    case 'arr': return r.v.length ? r.v[0].textContent || '' : '';
    case 'num':
    case 'bool':
    default:    return r.v.toString();
  }
}

function dbg(...args) {
  console.log(...args.map(JSON.stringify));
}

/**
 * Check if an object is a DOM Node, or one of its subtypes (e.g. Element).
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */
function isDomNode(thing) {
  dbg('isDomNode()', { thing, isNode:thing instanceof Node });
  return thing instanceof Node;
}
