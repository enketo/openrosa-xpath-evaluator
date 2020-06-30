module.exports = {
  asBoolean:asBoolean,
  asNumber:asNumber,
  asString:asString,
};

// cast to number, as per https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Boolean-Functions
function asBoolean(r) {
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
  if(isDomNode(r)) return nodeToString(r);
  switch(r.t) {
    case 'str': return r.v;
    case 'arr': return r.v.length ? r.v[0].textContent || '' : '';
    case 'num':
    case 'bool':
    default:    return r.v.toString();
  }
}

// Per https://www.w3.org/TR/1999/REC-xpath-19991116/#dt-string-value:
// [DONE] 1. > The string-value of the root node is the concatenation of the string-values of all text node descendants of the root node in document order.
// [DONE] 2. > The string-value of an element node is the concatenation of the string-values of all text node descendants of the element node in document order.
// [DONE] 3. > An attribute node has a string-value. The string-value is the normalized value as specified by the XML Recommendation [XML]. An attribute whose normalized value is a zero-length string is not treated specially: it results in an attribute node whose string-value is a zero-length string.
// [TODO] 4. > The string-value of a namespace node is the namespace URI that is being bound to the namespace prefix; if it is relative, it must be resolved just like a namespace URI in an expanded-name.
// [DONE] 5. > The string-value of a processing instruction node is the part of the processing instruction following the target and any whitespace.
// [DONE] 6. > The string-value of comment is the content of the comment not including the opening <!-- or the closing -->.
// [DONE] 7. > The string-value of a text node is the character data.
function nodeToString(node) {
  switch(node.nodeType) {
    case Node.DOCUMENT_NODE: return node.documentElement.textContent;
    case Node.TEXT_NODE:
    case Node.CDATA_SECTION_NODE:
    case Node.PROCESSING_INSTRUCTION_NODE:
    case Node.COMMENT_NODE:
    case Node.ELEMENT_NODE:
      return node.textContent; // potentially not to spec for Element, but much simpler than recursing
    case Node.ATTRIBUTE_NODE: return node.value;
    default: throw new Error(`TODO No handling for node type: ${node.nodeType}`);
  }
}

/**
 * Check if an object is a DOM Node, or one of its subtypes (e.g. Element).
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */
function isDomNode(thing) {
  return thing instanceof Node;
}
