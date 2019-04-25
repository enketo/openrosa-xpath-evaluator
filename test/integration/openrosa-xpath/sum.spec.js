describe('#sum()', () => {
  it('sum(self::*)', () => {
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
        <div id="FunctionSumCaseJavarosa">
          <div>-10</div>
          <div>15</div>
          <div></div>
        </div>
  		</div>`);

    let node = doc.getElementById('FunctionNumberCaseNumberMultiple');
    assertNumber(node, null, 'sum(*)', 100);

    node = doc.getElementById('FunctionNumberCaseNumber');
    assertNumber(node, null, 'sum(self::*)', 123);

    node = doc.getElementById('FunctionNumberCaseNotNumberMultiple');
    assertNumber(node, null, 'sum(node())', NaN);
  });

  it('sum(*)', () => {
    initDoc(`
      <root id="root">
        <item>-10</item>
        <item>11</item>
        <item>99</item>
      </root>`);
    const node = doc.getElementById('root');
    assertNumber(node, null, "sum(*)", 100);
    assertNumber("sum(/root/item)", 100);
  });

  it('sum() fails when too many arguments are provided', () => {
    assert.throw(() => xEval("sum(1, 2)"), Error);
  });

  it('sum() fails when too few arguments are provided', () => {
    assert.throw(() => xEval("sum()"), Error);
  });

});
