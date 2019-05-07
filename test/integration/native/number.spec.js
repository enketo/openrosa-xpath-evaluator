describe('native number functions', () => {
  it('number() conversion of convertible numbers, strings, booleans', () => {
    // of numbers
    assertNumber('number(-1.0)', -1);
    assertNumber('number(1)', 1);
    assertNumber('number(0.199999)', 0.199999);
    assertNumber('number(-0.199999)', -0.199999);
    //TODO: assertNumber('number(- 0.199999)', -0.199999],
    assertNumber('number(0.0)', 0);
    assertNumber('number(.0)', 0);
    assertNumber('number(0.)', 0);

    // of booleans
    assertNumber('number(true())', 1);
    assertNumber('number(false())', 0);

    // of strings
    assertNumber("number('-1.0')", -1);
    assertNumber("number('1')", 1);
    assertNumber("number('0.199999')", 0.199999);
    assertNumber("number('-0.9991')", -0.9991);
    assertNumber("number('0.0')", 0);
    assertNumber("number('.0')", 0);
    assertNumber("number('.112')", 0.112);
    assertNumber("number('0.')", 0);
    assertNumber("number('  1.1')", 1.1);
    assertNumber("number('1.1   ')", 1.1);
    assertNumber("number('1.1   \n ')", 1.1);
    assertNumber("number('  1.1 \n\r\n  ')", 1.1);
  });

  it('number() conversions returns NaN if not convertible', () => {
    assertNumber("number('asdf')", NaN);
    assertNumber("number('1asdf')", NaN);
    assertNumber("number('1.1sd')", NaN);
    assertNumber("number('.1sd')", NaN);
    assertNumber("number(' . ')", NaN);
  });

  it('number() conversion of nodesets', () => {
    initDoc(`
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
    [
      [ "number(self::node())", doc.getElementById('FunctionNumberCaseNumber'), 123 ],
      // [ "number(*)", doc.getElementById('FunctionNumberCaseNumberMultiple'), -10 ],
      ["number()", doc.getElementById('FunctionNumberCaseNumber'), 123]
    ].forEach( t => {
      assertNumber(t[1], null, t[0], t[2]);
    } );

    [
      ["number()", doc.getElementById( 'FunctionNumberCaseNotNumber' ) ]
    ].forEach( t => {
      assertNumber(t[1], null, t[0], NaN);
    });
  });

  xit('number() conversion fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("number(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(() => test, Error);
  });

  xit('sum()', () => {
    [
      [ "sum(self::*)", doc.getElementById('FunctionNumberCaseNumber'), 123],
      [ "sum(*)", doc.getElementById('FunctionNumberCaseNumberMultiple'), 100]
    ].forEach( t => {
      assertNumber(t[1], null, t[0], t[2]);
    });

    [
      [ "sum(node())", doc.getElementById('FunctionNumberCaseNotNumberMultiple') ],
      [ "sum(*)", doc.getElementById('FunctionSumCaseJavarosa') ]
    ].forEach(t => {
      assertNumber(t[1], null, t[0], NaN);
      // const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
      // expect( result.numberValue ).to.be.a( 'number' );
      // expect( result.numberValue ).to.deep.equal( NaN );
    });
  });

  it('sum() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("sum(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('sum() fails when too few arguments are provided', () => {
    const test = () => {
      doc.evaluate("sum()", doc, getXhtmlResolver(doc),XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it( 'floor()', () => {
    assertNumber("floor(-1.55)", -2);
    assertNumber("floor(2.44)", 2);
    assertNumber("floor(0.001)", 0);
    assertNumber("floor(1.5)", 1);
    assertNumber("floor(5)", 5);
    assertNumber("floor(1.00)", 1);
    assertNumber("floor(-1.05)", -2);
  });

  it( 'floor() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("floor(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it( 'floor fails when too few arguments are provided', () => {
    const test = () => {
      doc.evaluate("floor()", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it( 'ceiling()', () => {
    assertNumber("ceiling(-1.55)", -1);
    assertNumber("ceiling(2.44)", 3);
    assertNumber("ceiling(0.001)", 1);
    assertNumber("ceiling(1.5)", 2);
    assertNumber("ceiling(5)", 5);
    assertNumber("ceiling(1.00)", 1);
    assertNumber("ceiling(-1.05)", -1);
  });

  it( 'ceiling() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("ceiling(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('ceiling() fails when not enough arguments are provided', () => {
    const test = () => {
      doc.evaluate("ceiling()", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it( 'round()', () => {
    assertNumber("round(-1.55)", -2);
    assertNumber("round(2.44)", 2);
    assertNumber("round(0.001)", 0);
    assertNumber("round(1.5)", 2);
    assertNumber("round(5)", 5);
    assertNumber("round(1.00)", 1);
    assertNumber("round(-1.05)", -1);
  });

  // behaviour changed in OpenRosa
  xit( 'round() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("round(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('round() fails when too few arguments are provided', () => {
    const test = () => {
      doc.evaluate("round()", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });
});
