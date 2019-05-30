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

const getXhtmlResolver = (doc) => {
  return {
    lookupNamespaceURI: (prefix) => {
      var namespaces = {
        'xhtml': 'http://www.w3.org/1999/xhtml',
        'ns2': 'http://asdf/'
      };

      if (namespaces[prefix]) {
        return namespaces[prefix];
      }

      //var resolver = helpers.documentCreateNSResolver(doc.documentElement);
      var resolver = doc.createNSResolver(doc.documentElement);
      return resolver.lookupNamespaceURI(prefix);
    }
  };
};

// const getComparableNode = (node) => {
//   switch (node.nodeType) {
//     case 2: // attribute
//     case 13: // namespace
//         // TODO: IE support
//         //return node.ownerElement;
//         throw new Error('Internal Error: getComparableNode - Node type not implemented: ' + node.nodeType);
//     case 3: // text
//     case 4: // CDATASection
//     case 7: // processing instruction
//     case 8: // comment
//         return node.parentNode;
//     case 1: // element
//     case 9: // document
//         // leave as is
//         return node;
//     default:
//         throw new Error('Internal Error: getComparableNode - Node type not supported: ' + node.nodeType);
//   }
// };
//
// /**
//  * @see http://ejohn.org/blog/comparing-document-position/
//  */
// const comparePosition = (a, b) => {
//   var a2,
//       b2,
//       result,
//       ancestor,
//       i,
//       item;
//
//   // check for native implementation
//   if (a.compareDocumentPosition) {
//       return a.compareDocumentPosition(b);
//   }
//
//   if (a === b) {
//       return 0;
//   }
//
//   a2 = helpers.getComparableNode(a);
//   b2 = helpers.getComparableNode(b);
//
//   // handle document case
//   if (a2.nodeType === 9) {
//       if (b2.nodeType === 9) {
//           if (a2 !== b2) {
//               return 1; // different documents
//           } else {
//               result = 0; // same nodes
//           }
//       } else {
//           if (a2 !== b2.ownerDocument) {
//               return 1; // different documents
//           } else {
//               result = 4 + 16; // a2 before b2, a2 contains b2
//           }
//       }
//   } else {
//       if (b2.nodeType === 9) {
//           if (b2 !== a2.ownerDocument) {
//               return 1; // different documents
//           } else {
//               result = 2 + 8; // b2 before a2, b2 contains a2
//           }
//       } else {
//           if (a2.ownerDocument !== b2.ownerDocument) {
//               return 1; // different documents
//           } else {
//               // do a contains comparison for element nodes
//               if (!a2.contains || typeof a2.sourceIndex === 'undefined' || !b2.contains || typeof b2.sourceIndex === 'undefined') {
//                   throw new Error('Cannot compare elements. Neither "compareDocumentPosition" nor "contains" available.');
//               } else {
//                   result =
//                       (a2 != b2 && a2.contains(b2) && 16) +
//                       (a2 != b2 && b2.contains(a2) && 8) +
//                       (a2.sourceIndex >= 0 && b2.sourceIndex >= 0 ? (a2.sourceIndex < b2.sourceIndex && 4) + (a2.sourceIndex > b2.sourceIndex && 2) : 1) +
//                       0;
//               }
//           }
//       }
//   }
//
//   if (a === a2) {
//       if (b === b2) {
//           return result;
//       } else {
//           // if a contains b2 or a == b2
//           if (result === 0 || (result & 16) === 16) {
//               // return result
//               return result;
//           }
//           // else if b2 contains a
//           else if ((result & 8) === 8) {
//               // find (ancestor-or-self::a) that is direct child of b2
//               ancestor = a;
//               while (ancestor.parentNode !== b2) {
//                   ancestor = ancestor.parentNode;
//               }
//
//               // return "a pre b" or "b pre a" depending on which is occurs first in b2.childNodes
//               for (i = 0; i < b2.childNodes.length; i++) {
//                   item = b2.childNodes.item(i);
//                   if (item === ancestor) {
//                       return 4;
//                   } else if (item === b) {
//                       return 2;
//                   }
//               }
//
//               throw new Error('Internal Error: should not get to here. 1');
//           } else {
//               // return result
//               return result;
//           }
//       }
//   } else {
//       if (b === b2) {
//           // if b contains a2 or b == a2
//           if (result === 0 || (result & 8) === 8) {
//               // return result
//               return result;
//           }
//           // else if a2 contains b
//           else if ((result & 16) === 16) {
//               // find (ancestor-or-self::b) that is direct child of a2
//               ancestor = b;
//               while (ancestor.parentNode !== a2) {
//                   ancestor = ancestor.parentNode;
//               }
//
//               // return "a pre b" or "b pre a" depending on which is occurs first in a2.childNodes
//               for (i = 0; i < a2.childNodes.length; i++) {
//                   item = a2.childNodes.item(i);
//                   if (item === ancestor) {
//                       return 2;
//                   } else if (item === a) {
//                       return 4;
//                   }
//               }
//
//               throw new Error('Internal Error: should not get to here. 2');
//           } else {
//               // return result
//               return result;
//           }
//       } else {
//           // if a2 contains b2
//           if ((result & 16) === 16) {
//               // return "a pre b" or "b pre a" depending on a or (ancestor-or-self::b2) occurs first in a2.childNodes
//               ancestor = b2;
//               while (ancestor.parentNode !== a2) {
//                   ancestor = ancestor.parentNode;
//               }
//
//               for (i = 0; i < a2.childNodes.length; i++) {
//                   item = a2.childNodes.item(i);
//                   if (item === ancestor) {
//                       return 2;
//                   } else if (item === a) {
//                       return 4;
//                   }
//               }
//
//               throw new Error('Internal Error: should not get to here. 3');
//           }
//           // else if b2 contains a2
//           if ((result & 8) === 8) {
//               // return "a pre b" or "b pre a" depending on b or (ancestor-or-self::a2) occurs first in b2.childNodes
//               ancestor = a2;
//               while (ancestor.parentNode !== b2) {
//                   ancestor = ancestor.parentNode;
//               }
//
//               for (i = 0; i < b2.childNodes.length; i++) {
//                   item = b2.childNodes.item(i);
//                   if (item === ancestor) {
//                       return 4;
//                   } else if (item === b) {
//                       return 2;
//                   }
//               }
//
//               throw new Error('Internal Error: should not get to here. 3');
//           }
//           // else if a2 === b2
//           else if (result === 0) {
//               // return "a pre b" or "b pre a" depending on a or b occurs first in a2.childNodes
//               for (i = 0; i < a2.childNodes.length; i++) {
//                   item = a2.childNodes.item(i);
//                   if (item === b) {
//                       return 2;
//                   } else if (item === a) {
//                       return 4;
//                   }
//               } //
//
//               throw new Error('Internal Error: should not get to here. 4');
//           }
//           // else
//           else {
//               // return result
//               return result;
//           }
//       }
//   }
//
//   //throw new Error('Internal Error: should not get to here. 5');
// };
//
// const getAllNodes = (node) => {
//   let nodes = [], i;
//   nodes.push(node);
//   for (i = 0; i < node.childNodes.length; i++) {
//     nodes.push.apply(nodes, helpers.getAllNodes(node.childNodes.item(i)));
//   }
//   return nodes;
// };
//
// /*
// helpers.documentCreateExpression = function(expression, resolver) {
//     return doc.createExpression.call(doc, expression, resolver);
// },*/
// /*
// helpers.documentCreateNSResolver = function(node) {
//     return doc.createNSResolver.call(doc, node);
// };
// */

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

// const filterSpecifiedAttributes = (attributes) => {
//   var specifiedAttributes = [], i;
//
//   for(i = 0; i < attributes.length; i++) {
//     if(!attributes[i].specified) {
//       // ignore non-specified attributes
//       continue;
//     }
//
//     specifiedAttributes.push(attributes[i]);
//   }
//   return specifiedAttributes;
// },
//

const assertNodesNamespace = (expr, node, expected) => {
  node = node.ownerDocument || node;
  const result = xEval(expr, node, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  assert.equal(result.snapshotLength, expected.length);
  for(let j = 0; j < result.snapshotLength; j++) {
    const item = result.snapshotItem(j);
    expect(item.nodeName).to.equal('#namespace');
    expect(item.localName).to.equal(expected[j][0]);
    expect(item.namespaceURI).to.equal(expected[j][1]);
  }
};

const assertNodes = (expr, node, expected) => {
  var result = xEval(expr, node, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  assert.equal(result.snapshotLength, expected.length);
  for(j = 0; j < result.snapshotLength; j++) {
    item = result.snapshotItem(j);
    assert.equal(item, expected[j]);
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
