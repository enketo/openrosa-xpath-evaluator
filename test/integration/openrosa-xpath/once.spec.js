describe('once()', () => {
  TODO()
  xit('attempt to change value of empty node', () => {
    initDoc(`
      <div id="FunctionSelectedCase">
  			<div id="FunctionSelectedCaseEmpty"></div>
  			<div id="FunctionSelectedCaseSingle">ab</div>
  			<div id="FunctionSelectedCaseMultiple">ab cd ef gh</div>
  			<div id="FunctionSelectedCaseMultiple">ij</div>
  		</div>`);

    const node = doc.getElementById('FunctionSelectedCaseEmpty');
    assertString(node, null, "once('aa')", "aa");

    // attempt to change value of node with existing value'
    node = doc.getElementById('FunctionSelectedCaseSingle');
    assertString(node, null, "once('aa')", "ab");

    // controversial: attempt to change value to NaN of empty node
    node = doc.getElementById('FunctionSelectedCaseEmpty');
    assertString(node, null, "once(. * 10)", "");

    // controversial: attempt to change value to Infinity of empty node
    assertString(node, null, "once(1 div 0)", "");
  });
});
