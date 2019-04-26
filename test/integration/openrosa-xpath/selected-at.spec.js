describe('#selected-at()', () => {
  [
    { from:'zero one two three', index:1, expected:'one' },
    { from:'zero one two three', index:4, expected:'' },
    { from:'zero one two three', index:-1, expected:'' },
    { from:'', index:0, expected:'' },
  ].forEach(({ from, index, expected }) => {
    it(`should select ${expected} from "${from}" at index ${index}`, () => {
      assertString(`selected-at('${from}', '${index}')`, expected);
    });
  });

  xit('selected-at()', () => {
    TODO();
    initDoc(`
      <div id="FunctionSelectedCase">
  			<div id="FunctionSelectedCaseEmpty"></div>
  			<div id="FunctionSelectedCaseSingle">ab</div>
  			<div id="FunctionSelectedCaseMultiple">ab cd ef gh</div>
  			<div id="FunctionSelectedCaseMultiple">ij</div>
  		</div>`);
    let node = doc.getElementById('FunctionSelectedCaseEmpty');
    assertString("selected-at(self::node(), 0)",  '');

    node = doc.getElementById('FunctionSelectedCaseSingle');
    assertString("selected-at(self::node(), 0)", 'ab');

    node = doc.getElementById( 'FunctionSelectedCaseSingle');
    assertString("selected-at(self::node(), 1)", '');

    node = doc.getElementById('FunctionSelectedCaseMultiple');
    assertString("selected-at(self::node(), 2)", 'ef');
    assertString("selected-at(self::node(), -1)", '');
    assertString("selected-at('apple baby crimson', 2)", 'crimson');
    assertString("selected-at('apple baby crimson', -1)", '');
    assertString("selected-at('', 1)", '');
  });
});
