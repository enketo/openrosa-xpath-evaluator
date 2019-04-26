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

  it('selected()', () => {
    TODO();
  //     [
  //         [ "selected(self::node(), '')", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), true ],
  //         [ "selected(self::node(), 'ab')", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), false ],
  //         [ "selected(self::node(), 'bc')", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), false ],
  //         [ "selected(self::node(), 'ab')", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), true ],
  //         [ "selected(self::node(), 'kl')", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), false ],
  //         [ "selected(self::node(), 'ab')", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), true ],
  //         [ "selected(self::node(), 'cd')", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), true ],
  //         [ "selected(self::node(), 'ij')", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), false ],
  //         [ "selected('apple baby crimson', 'apple')", g.doc, true ],
  //         [ "selected('apple baby crimson', 'baby')", g.doc, true ],
  //         [ "selected('apple baby crimson', 'crimson')", g.doc, true ],
  //         [ "selected('apple baby crimson', '  baby  ')", g.doc, true ],
  //         [ "selected('apple baby crimson', 'babby')", g.doc, false ],
  //         [ "selected('apple baby crimson', 'bab')", g.doc, false ],
  //         [ "selected('apple', 'apple')", g.doc, true ],
  //         [ "selected('apple', 'ovoid')", g.doc, false ],
  //         [ "selected('', 'apple')", g.doc, false ]
  //     ].forEach( t => {
  //         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.BOOLEAN_TYPE, null );
  //         expect( t[ 2 ] ).to.equal( result.booleanValue );
  //     } );
  } );
});
