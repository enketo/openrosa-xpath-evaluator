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
  };
}

function teardownDomGlobals() {
  delete global.Node;
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
