
/*jshint unused:false*/
const assert = chai.assert;
const openRosaXPathExtensions = require('../src/openrosa-extensions');
const ExtendedXPathEvaluator = require('../src/extended-xpath');
const config = require('../src/config');
const engine = require('../src/engine');

let doc, xEval, evaluator, nsr, rt, node, docs = [];

const _document = (line) => {
  docs += line + '\n';
};

const nsResolver = (prefix) => {
  var ns = {
    'xhtml' : 'http://www.w3.org/1999/xhtml',
    'mathml': 'http://www.w3.org/1998/Math/MathML',
    'jr': 'http://openrosa.org/javarosa'
  };
  return ns[prefix] || null;
};

const initDoc = (xml, xnsr) => {
  doc = new DOMParser().parseFromString(xml, 'application/xml');
  node = null;
  nsr = xnsr;
  evaluator = new engine.XPathEvaluator();
  xEval = function(e, xnode, xrt, xnsr) {
    node = xnode || doc;
    rt = xrt;
    _document(e);
    return evaluator.evaluate(e, node, xnsr || nsr, rt, null);
  };
  doc.evaluator = evaluator;
  doc.xEval = xEval;
  return doc;
};

const simpleValueIs = (textValue) => {
  initDoc(`<simple><xpath><to>
             <node>${textValue}</node>
           </to></xpath><empty/></simple>`);
};

const initBasicXmlDoc = () => simpleValueIs('');

const assertTrue = (...args) => {
  const regex = args[args.length - 1];
  if(args.length > 1 && args[args.length - 2]) {
    simpleValueIs(args[args.length - 2]);
  }
  const node = args.length > 2 ? args[args.length - 3] : null;
  assert.isTrue(xEval(regex, node, XPathResult.BOOLEAN_TYPE).booleanValue);
};

const assertFalse = (...args) => {
  const regex = args[args.length - 1];
  if(args.length > 1 && args[args.length - 2]) {
    simpleValueIs(args[args.length - 2]);
  }
  const node = args.length > 2 ? args[args.length - 3] : null;
  assert.isFalse(xEval(regex, node, XPathResult.BOOLEAN_TYPE).booleanValue);
};

const assertBoolean = (...args) => {
  const value = args.pop();
  if(value) {
    assertTrue(...args);
  } else {
    assertFalse(...args);
  }
};

const assertString = (...args) => {
  const expected = args[args.length -1];
  const regex = args[args.length - 2];
  if(args.length > 2 && args[args.length - 3]) {
    simpleValueIs(args[args.length - 3]);
  }
  const node = args.length > 3 ? args[args.length - 4] : null;
  assert.equal(xEval(regex, node).stringValue, expected);
};

const assertStringValue = (...args) => {
  const expected = args[args.length -1];
  const regex = args[args.length - 2];
  if(args.length > 2 && args[args.length - 3]) {
    simpleValueIs(args[args.length - 3]);
  }
  const node = args.length > 3 ? args[args.length - 4] : null;
  assert.equal(xEval(regex, node, XPathResult.STRING_TYPE).stringValue, expected);
};

const assertStringLength = (...args) => {
  const expected = args[args.length -1];
  const regex = args[args.length - 2];
  if(args.length > 2 && args[args.length - 3]) {
    simpleValueIs(args[args.length - 3]);
  }
  const node = args.length > 3 ? args[args.length - 4] : null;
  assert.equal(xEval(regex, node, XPathResult.STRING_TYPE).stringValue.length, expected);
};

const assertMatch = (...args) => {
  const expected = args[args.length -1];
  const regex = args[args.length - 2];
  if(args.length > 2 && args[args.length - 3]) {
    simpleValueIs(args[args.length - 3]);
  }
  const node = args.length > 3 ? args[args.length - 4] : null;
  assert.match(xEval(regex, node, XPathResult.STRING_TYPE).stringValue, expected);
};

const assertNumber = (...args) => {
  const expected = args[args.length -1];
  const regex = args[args.length - 2];
  if(args.length > 2 && args[args.length - 3]) {
    simpleValueIs(args[args.length - 3]);
  }
  const node = args.length > 3 ? args[args.length - 4] : null;
  const actual = xEval(regex, node).numberValue;
  if(isNaN(expected)) {
    assert.isNaN(actual);
  } else {
    assert.equal(actual, expected);
  }
};
const assertNumberValue = (...args) => {
  const expected = args[args.length -1];
  const regex = args[args.length - 2];
  if(args.length > 2 && args[args.length - 3]) {
    simpleValueIs(args[args.length - 3]);
  }
  const node = args.length > 3 ? args[args.length - 4] : null;
  const actual = xEval(regex, node, XPathResult.NUMBER_TYPE).numberValue;
  if(isNaN(expected)) {
    assert.isNaN(actual);
  } else {
    assert.equal(actual, expected);
  }
};

beforeEach(() => {
  initBasicXmlDoc();
});

before(() => {
  docs = [];
  _document('## Supported XPath expressions:');
  _document('');
});

// Capture all tested functions/docs
// after(() => {
//   console.log(docs);
// });

const getNextChildElementNode = (parentNode) => {
  let childNode = parentNode.firstChild;
  while (childNode.nodeName == '#text') {
    childNode = childNode.nextSibling;
  }
  return childNode;
};

const setAttribute = (node, namespace, name, value) => {
  if (node.setAttributeNS) {
    // for XML documents
    node.setAttributeNS(namespace, name, value);
  } else {
    // normal HTML documents
    node.setAttribute(name, value);
  }
};

/**
 * @see http://ejohn.org/blog/comparing-document-position/
 */
const comparePosition = (a, b) => {
  var a2,
      b2,
      result,
      ancestor,
      i,
      item;

  // check for native implementation
  if (a.compareDocumentPosition) {
      return a.compareDocumentPosition(b);
  }

  if (a === b) {
      return 0;
  }

  a2 = getComparableNode(a);
  b2 = getComparableNode(b);

  // handle document case
  if (a2.nodeType === 9) {
      if (b2.nodeType === 9) {
          if (a2 !== b2) {
              return 1; // different documents
          } else {
              result = 0; // same nodes
          }
      } else {
          if (a2 !== b2.ownerDocument) {
              return 1; // different documents
          } else {
              result = 4 + 16; // a2 before b2, a2 contains b2
          }
      }
  } else {
      if (b2.nodeType === 9) {
          if (b2 !== a2.ownerDocument) {
              return 1; // different documents
          } else {
              result = 2 + 8; // b2 before a2, b2 contains a2
          }
      } else {
          if (a2.ownerDocument !== b2.ownerDocument) {
              return 1; // different documents
          } else {
              // do a contains comparison for element nodes
              if (!a2.contains || typeof a2.sourceIndex === 'undefined' || !b2.contains || typeof b2.sourceIndex === 'undefined') {
                  throw new Error('Cannot compare elements. Neither "compareDocumentPosition" nor "contains" available.');
              } else {
                  result =
                      (a2 != b2 && a2.contains(b2) && 16) +
                      (a2 != b2 && b2.contains(a2) && 8) +
                      (a2.sourceIndex >= 0 && b2.sourceIndex >= 0 ? (a2.sourceIndex < b2.sourceIndex && 4) + (a2.sourceIndex > b2.sourceIndex && 2) : 1) +
                      0;
              }
          }
      }
  }

  if (a === a2) {
      if (b === b2) {
          return result;
      } else {
          // if a contains b2 or a == b2
          if (result === 0 || (result & 16) === 16) {
              // return result
              return result;
          }
          // else if b2 contains a
          else if ((result & 8) === 8) {
              // find (ancestor-or-self::a) that is direct child of b2
              ancestor = a;
              while (ancestor.parentNode !== b2) {
                  ancestor = ancestor.parentNode;
              }

              // return "a pre b" or "b pre a" depending on which is occurs first in b2.childNodes
              for (i = 0; i < b2.childNodes.length; i++) {
                  item = b2.childNodes.item(i);
                  if (item === ancestor) {
                      return 4;
                  } else if (item === b) {
                      return 2;
                  }
              }

              throw new Error('Internal Error: should not get to here. 1');
          } else {
              // return result
              return result;
          }
      }
  } else {
      if (b === b2) {
          // if b contains a2 or b == a2
          if (result === 0 || (result & 8) === 8) {
              // return result
              return result;
          }
          // else if a2 contains b
          else if ((result & 16) === 16) {
              // find (ancestor-or-self::b) that is direct child of a2
              ancestor = b;
              while (ancestor.parentNode !== a2) {
                  ancestor = ancestor.parentNode;
              }

              // return "a pre b" or "b pre a" depending on which is occurs first in a2.childNodes
              for (i = 0; i < a2.childNodes.length; i++) {
                  item = a2.childNodes.item(i);
                  if (item === ancestor) {
                      return 2;
                  } else if (item === a) {
                      return 4;
                  }
              }

              throw new Error('Internal Error: should not get to here. 2');
          } else {
              // return result
              return result;
          }
      } else {
          // if a2 contains b2
          if ((result & 16) === 16) {
              // return "a pre b" or "b pre a" depending on a or (ancestor-or-self::b2) occurs first in a2.childNodes
              ancestor = b2;
              while (ancestor.parentNode !== a2) {
                  ancestor = ancestor.parentNode;
              }

              for (i = 0; i < a2.childNodes.length; i++) {
                  item = a2.childNodes.item(i);
                  if (item === ancestor) {
                      return 2;
                  } else if (item === a) {
                      return 4;
                  }
              }

              throw new Error('Internal Error: should not get to here. 3');
          }
          // else if b2 contains a2
          if ((result & 8) === 8) {
              // return "a pre b" or "b pre a" depending on b or (ancestor-or-self::a2) occurs first in b2.childNodes
              ancestor = a2;
              while (ancestor.parentNode !== b2) {
                  ancestor = ancestor.parentNode;
              }

              for (i = 0; i < b2.childNodes.length; i++) {
                  item = b2.childNodes.item(i);
                  if (item === ancestor) {
                      return 4;
                  } else if (item === b) {
                      return 2;
                  }
              }

              throw new Error('Internal Error: should not get to here. 3');
          }
          // else if a2 === b2
          else if (result === 0) {
              // return "a pre b" or "b pre a" depending on a or b occurs first in a2.childNodes
              for (i = 0; i < a2.childNodes.length; i++) {
                  item = a2.childNodes.item(i);
                  if (item === b) {
                      return 2;
                  } else if (item === a) {
                      return 4;
                  }
              } //

              throw new Error('Internal Error: should not get to here. 4');
          }
          // else
          else {
              // return result
              return result;
          }
      }
  }

  //throw new Error('Internal Error: should not get to here. 5');
};

const getAllNodes = (node) => {
  let nodes = [], i;
  nodes.push(node);
  for (i = 0; i < node.childNodes.length; i++) {
    nodes.push.apply(nodes, getAllNodes(node.childNodes.item(i)));
  }
  return nodes;
};

const filterAttributes = (attributes) => {
  var i, name, specifiedAttributes = [];

  for(i = 0; i < attributes.length; i++) {
    if(!attributes[i].specified) {
      // ignore non-specified attributes
      continue;
    }

    name = attributes[i].nodeName.split(':');
    if (name[0] === 'xmlns') {
      // ignore namespaces
      continue;
    }

    specifiedAttributes.push(attributes[i]);
  }
  return specifiedAttributes;
};

const assertNodesNamespace = (expr, node, expected) => {
  const result = xEval(expr, node, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  assert.equal(result.snapshotLength, expected.length);
  expected = sortedNamespaces(expected);
  for(let j = 0; j < result.snapshotLength; j++) {
    const item = result.snapshotItem(j);
    assert.equal(item.nodeName, '#namespace');
    assert.equal(item.localName, expected[j][0]);
    assert.equal(item.namespaceURI, expected[j][1]);
  }
};

const assertNodes = (expr, node, expected, nsr) => {
  var result = xEval(expr, node, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, nsr);
  assert.equal(result.snapshotLength, expected.length);
  for(let j = 0; j < result.snapshotLength; j++) {
    const item = result.snapshotItem(j);
    assert.equal(item, expected[j]);
  }
};

const sorted = (nodes) => {
  return nodes.sort((a, b) => {
    if (a.nodeName > b.nodeName) return 1;
    if (a.nodeName < b.nodeName) return -1;
    return 0;
  });
};

const sortedNamespaces = (namespaces) => {
  return namespaces.sort((ns1, ns2) => {
    if(ns1[0] > ns2[0]) {return 1;}
    if(ns1[0] < ns2[0]) {return -1;}
    return 0;
  });
};

const snapshotItems = (result) => {
  const all = [];
  for(let j = 0; j < result.snapshotLength; j++) {
    all.push(result.snapshotItem(j));
  }
  return all;
};

// Compares nodes and ignores node and attribute order
const assertUnorderedNodes = (expr, node, expected) => {
  const result = xEval(expr, node, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  assert.equal(result.snapshotLength, expected.length);
  const resultNodes = sorted(snapshotItems(result));
  const expectedNodes = sorted(expected);
  for(let j = 0; j < resultNodes.length; j++) {
    assert.equal(resultNodes[j].nodeName, expectedNodes[j].nodeName);
  }
};

const parseNamespacesFromAttributes = (attributes, namespaces) => {
  var i, name;

  for (i = attributes.length - 1; i >= 0; i--) {
    name = attributes.item(i).nodeName.split(':');

    if (name[0] === 'xmlns') {
      if (name.length == 1) {
        namespaces.unshift(['', attributes.item(i).nodeValue]);
      } else {
        namespaces.push([name[1], attributes.item(i).nodeValue]);
      }
    }
  }
};

const snapshotToArray = (result) => {
  var i, nodes = [];
  for (i = 0; i < result.snapshotLength; i++) {
    nodes.push(result.snapshotItem(i));
  }
  return nodes;
};

const assertThrow = (expr) => {
  assert.throw(() => xEval(expr), Error);
};

const assertNumberRounded = (expr, expected, factor, node) => {
  var val = xEval(expr, node, XPathResult.NUMBER_TYPE).numberValue;
  assert.equal(Math.round(val * factor)/factor, expected);
};

module.exports = {
  initDoc,
  nsResolver,
  comparePosition,
  simpleValueIs,
  filterAttributes,
  getNextChildElementNode,
  getAllNodes,
  snapshotToArray,
  setAttribute,
  parseNamespacesFromAttributes,
  sortedNamespaces,
  assert,
  assertThrow,
  assertNumberValue,
  assertNumberRounded,
  assertNumber,
  assertString,
  assertStringValue,
  assertStringLength,
  assertMatch,
  assertBoolean,
  assertFalse,
  assertTrue,
  assertNodes,
  assertNodesNamespace,
  assertUnorderedNodes
};
