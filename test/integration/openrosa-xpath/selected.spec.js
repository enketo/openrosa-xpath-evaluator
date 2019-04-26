describe('#selected()', () => {
  it('should return true if requested item is in list', () => {
    // given
    simpleValueIs('one two three');

    // expect
    assert.ok(xEval('selected(/simple/xpath/to/node, "one")').booleanValue);
    assert.ok(xEval('selected(/simple/xpath/to/node, "two")').booleanValue);
    assert.ok(xEval('selected(/simple/xpath/to/node, "three")').booleanValue);
  });
  it('should return false if requested item not in list', () => {
    // given
    simpleValueIs('one two three');

    // expect
    assert.notOk(xEval('selected(/simple/xpath/to/node, "on")').booleanValue);
    assert.notOk(xEval('selected(/simple/xpath/to/node, "ne")').booleanValue);
    assert.notOk(xEval('selected(/simple/xpath/to/node, "four")').booleanValue);
  });

  xit('selected()', () => {
    TODO();
    [
      [ "selected(self::node(), '')", doc.getElementById( 'FunctionSelectedCaseEmpty' ), true ],
      [ "selected(self::node(), 'ab')", doc.getElementById( 'FunctionSelectedCaseEmpty' ), false ],
      [ "selected(self::node(), 'bc')", doc.getElementById( 'FunctionSelectedCaseSingle' ), false ],
      [ "selected(self::node(), 'ab')", doc.getElementById( 'FunctionSelectedCaseSingle' ), true ],
      [ "selected(self::node(), 'kl')", doc.getElementById( 'FunctionSelectedCaseMultiple' ), false ],
      [ "selected(self::node(), 'ab')", doc.getElementById( 'FunctionSelectedCaseMultiple' ), true ],
      [ "selected(self::node(), 'cd')", doc.getElementById( 'FunctionSelectedCaseMultiple' ), true ],
      [ "selected(self::node(), 'ij')", doc.getElementById( 'FunctionSelectedCaseMultiple' ), false ],
      [ "selected('apple baby crimson', 'apple')", doc, true ],
      [ "selected('apple baby crimson', 'baby')", doc, true ],
      [ "selected('apple baby crimson', 'crimson')", doc, true ],
      [ "selected('apple baby crimson', '  baby  ')", doc, true ],
      [ "selected('apple baby crimson', 'babby')", doc, false ],
      [ "selected('apple baby crimson', 'bab')", doc, false ],
      [ "selected('apple', 'apple')", doc, true ],
      [ "selected('apple', 'ovoid')", doc, false ],
      [ "selected('', 'apple')", doc, false ]
    ].forEach( t => {
      assertBoolean(t[1], null, t[0], t[2]);
    });
  });
});
