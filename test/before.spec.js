/*jshint unused:false*/
const SIMPLE_DATE_MATCH = /^\d{4}-\d\d-\d\d$/;
const FULL_DATE_MATCH = /(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d\d \d{4} \d\d:\d\d:\d\d GMT([+-]\d\d\d\d \(.+\))?/;
const assert = chai.assert;
const openRosaXpathExtensions = openrosa_xpath_extensions;

const TODO = () => { if(false) assert.notOk('TODO'); };

let doc, xEval, evaluator;

const initDoc = (xml) => {
  doc = new DOMParser().parseFromString(xml, 'application/xml');
  node = null;
  evaluator = new ExtendedXpathEvaluator(
    v => {
      const result = doc.evaluate.call(doc, v, node || doc, null, XPathResult.ANY_TYPE, null);
      // console.log(`${v} => ${result.resultType}`);
      return result;
    },
    openRosaXpathExtensions(translate, doc));
  xEval = function(e, xnode) {
    node = xnode;
    return evaluator.evaluate(e);
  };
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
  if(args.length > 1) {//TODO ignore null values or refactor signature
    simpleValueIs(args[args.length - 2]);
  }
  const node = args.length > 2 ? args[args.length - 3] : null;
  assert.isTrue(xEval(regex, node).booleanValue);
};

const assertFalse = (...args) => {
  const regex = args[args.length - 1];
  if(args.length > 1) {//TODO ignore null values or refactor signature
    simpleValueIs(args[args.length - 2]);
  }
  const node = args.length > 2 ? args[args.length - 3] : null;
  assert.isFalse(xEval(regex, node).booleanValue);
};

const assertBoolean = (regex, value) => {
  if(value) {
    assertTrue(regex);
  } else {
    assertFalse(regex);
  }
};

const assertString = (...args) => {
  const expected = args[args.length -1];
  const regex = args[args.length - 2];
  if(args.length > 2) {
    simpleValueIs(args[args.length - 3]);
  }
  const node = args.length > 3 ? args[args.length - 4] : null;
  assert.equal(xEval(regex, node).stringValue, expected);
};

const assertNumber = (...args) => {
  const expected = args[args.length -1];
  const regex = args[args.length - 2];
  if(args.length > 2 && args[1]) {
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

beforeEach(function() {
  initBasicXmlDoc();
});

// const nsResolver = (prefix) => {
//   var ns = {
//     'xhtml' : 'http://www.w3.org/1999/xhtml',
//     'mathml': 'http://www.w3.org/1998/Math/MathML'
//   };
//   return ns[prefix] || null;
// };
