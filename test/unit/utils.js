const { assert } = require('chai');

module.exports = {
  assertVal,
  registerDomGlobals,
  teardownDomGlobals,
  wrapOp,
  wrapVal,
};

function assertVal({ v:actual }, expected) {
  if(isNaN(expected)) {
    assert.isNaN(actual);
  } else {
    assert.equal(actual, expected);
  }
}

function registerDomGlobals() {
  global.Node = function(textContent) {
    this.textContent = (textContent || '').toString();
    this.nodeType = Node.ELEMENT_NODE;
  };
  Node.ELEMENT_NODE = 1;

  global.XPathResult = {
    ANY_TYPE:                     0,
    NUMBER_TYPE:                  1,
    STRING_TYPE:                  2,
    BOOLEAN_TYPE:                 3,
    UNORDERED_NODE_ITERATOR_TYPE: 4,
    ORDERED_NODE_ITERATOR_TYPE:   5,
    UNORDERED_NODE_SNAPSHOT_TYPE: 6,
    ORDERED_NODE_SNAPSHOT_TYPE:   7,
    ANY_UNORDERED_NODE_TYPE:      8,
    FIRST_ORDERED_NODE_TYPE:      9,
  };
}

function teardownDomGlobals() {
  delete global.Node;
  delete global.XPathResult;
}

function wrapVal(v) {
  switch(typeof v) {
    case 'boolean': return { t:'bool', v };
    case 'number':  return { t:'num',  v };
    case 'string':  return { t:'str',  v };
    case 'object':
      if(Array.isArray(v)) {
        return { t:'arr', v:v.map(text => new Node(text)) };
      }
    default: throw new Error(`No handling for type: ${typeof v}`);
  }
}

function wrapOp(v) {
  return { t:'op', v };
}
