describe( '#count-selected()', () => {

  it( 'count-selected()', () => {
    initDoc(`
      <div id="FunctionSelectedCase">
  			<div id="FunctionSelectedCaseEmpty"></div>
  			<div id="FunctionSelectedCaseSingle">ab</div>
  			<div id="FunctionSelectedCaseMultiple">ab cd ef gh</div>
  			<div id="FunctionSelectedCaseMultiple">ij</div>
  		</div>
      `);

    let node = doc.getElementById('FunctionSelectedCaseEmpty');
    assertNumber(node, null, 'count-selected(self::node())', 0);

    node = doc.getElementById('FunctionSelectedCaseSingle');
    assertNumber(node, null, 'count-selected(self::node())', 1);

    node = doc.getElementById('FunctionSelectedCaseMultiple');
    assertNumber(node, null, 'count-selected(self::node())', 4);
  });
});
