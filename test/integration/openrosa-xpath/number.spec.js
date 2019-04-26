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
        TODO();
        // assert.equal(xEval(expr).numberValue, expectedResult);
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
      TODO()
    //   [
    //     [ "number(self::node())", g.doc.getElementById( 'FunctionNumberCaseNumber' ), 123 ],
    //     [ "number(*)", g.doc.getElementById( 'FunctionNumberCaseNumberMultiple' ), -10 ],
    //     [ "number()", g.doc.getElementById( 'FunctionNumberCaseNumber' ), 123 ]
    //   ].forEach( t => {
    //     TODO();
    // //     const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
    // //     expect( result.numberValue ).to.equal( t[ 2 ] );
    //   } );
    //
    //   [
    //     [ "number()", g.doc.getElementById( 'FunctionNumberCaseNotNumber' ) ]
    //   ].forEach( t => {
    //     TODO();
    //     // const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
    //     // expect( result.numberValue ).to.be.a( 'number' );
    //     // expect( result.numberValue ).to.deep.equal( NaN );
    //   });
    });

    it( 'number() conversion fails when too many arguments are provided', () => {
      assert.throw(() => xEval("number(1, 2)"), Error);
    });
  });
});
