describe('#position()', () => {
  TODO();

  xit('position(node) with an argument', () => {
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

    let node = doc.getElementById('FunctionNumberCaseNumberMultiple');
    assertNumber(node, null, 'position(..)', 6);
    assertNumber(node, null, 'position(.)', 3);

    node = doc.getElementById('testFunctionNodeset3NodeP');
    assertNumber(node, null, 'position(../..)', 2);
  });
});
