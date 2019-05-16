describe('#number()', () => {
  describe('called on a boolean', () => {
    _.forEach({
      'number(true())': '1',
      'number(false())': '0',
      'number(1 = 1)': '1',
      'number(1 = 2)': '0',
    }, function(expectedResult, expr) {
      it(`${expr} should be ${expectedResult}`, () => {
        assertNumber(expr, expectedResult);
      });
    });
  });

  describe('called on a number', () => {
    _.forEach({
      'number("0")': '0',
      'number("1")': '1',
      'number("-1")': '-1',
      'number(-1.0)': -1,
      'number(1)': 1,
      'number(0.199999)': 0.199999,
      'number(-0.199999)': -0.199999,
      // TODO
      // 'number(- 0.199999)': -0.199999,
      'number(0.0)': 0,
      'number(.0)': 0,
      'number(0.)': 0
    }, function(expectedResult, expr) {
      it(`${expr} should be ${expectedResult}`, () => {
        assertNumber(expr, expectedResult);
      });
    });
  });
  describe('called on a string', () => {
    _.forEach({
      "number('-1.0')": -1,
      "number('1')": 1,
      "number('0.199999')": 0.199999,
      "number('-0.9991')": -0.9991,
      "number('0.0')": 0,
      "number('.0')": 0,
      "number('.112')": 0.112,
      "number('0.')": 0,
      "number('  1.1')": 1.1,
      "number('1.1   ')": 1.1 ,
      "number('1.1   \n ')": 1.1,
      "number('  1.1 \n\r\n  ')": 1.1
    }, function(expectedResult, expr) {
      it(`${expr} should be ${expectedResult}`, () => {
        assertNumber(expr, expectedResult);
      });
    });
  });

  describe('called on a date string', () => {
    _.forEach({
      'number("1970-01-01")': '0',
      'number("1970-01-02")': '1',
      'number("1969-12-31")': '-1',
      'number("2008-09-05")': '14127',
      'number("1941-12-07")': '-10252',
    }, function(expectedResult, expr) {
      it(expr + ' should be ' + expectedResult + ' days since the epoch', () => {
        assertNumber(expr, expectedResult);
      });
    });
  });

  describe('number() conversions returns NaN if not convertible', () => {
    it('number() conversions returns NaN if not convertible', () => {
      [
        [ "number('asdf')", NaN ],
        [ "number('1asdf')", NaN ],
        [ "number('1.1sd')", NaN ],
        [ "number('.1sd')", NaN ],
        [ "number(' . ')", NaN ]
      ].forEach( t => {
        const result = xEval(t[0]);
        assert.typeOf(result.numberValue, 'number');
        assert.isNaN(result.numberValue);
      });
    });

    it('number() conversion of nodesets', () => {
      const doc = initDoc(`
        <div id="FunctionNumberCase">
    			<div id="FunctionNumberCaseNumber">123</div>
    			<div id="FunctionNumberCaseNotNumber">  a a  </div>
    			<div id="FunctionNumberCaseNumberMultiple">
    				<div>-10</div>
    				<div>11</div>
    				<div>99</div>
    			</div>
    			<div id="FunctionNumberCaseNotNumberMultiple">
    				<div>-10</div>
    				<div>11</div>
    				<div>a</div>
    			</div>
    		</div>`);

      let node = doc.getElementById('FunctionNumberCaseNumber');
      assertNumber(node, null, "number(self::node())", 123);
      assertNumber(node, null, "number()", 123);

      node = doc.getElementById('FunctionNumberCaseNumberMultiple');
      assertNumber(node, null, "number(*)", -10);

      node = doc.getElementById('FunctionNumberCaseNotNumber');
      assertNumber(node, null, "number()", NaN);
    });

    it('number() conversion fails when too many arguments are provided', () => {
      assert.throw(() => xEval("number(1, 2)"), Error);
    });
  });
});
