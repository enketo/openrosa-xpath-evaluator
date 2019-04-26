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

  it( 'selected-at()', () => {
    TODO();
  //     [
  //         [ "selected-at(self::node(), 0)", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), '' ],
  //         [ "selected-at(self::node(), 0)", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), 'ab' ],
  //         [ "selected-at(self::node(), 1)", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), '' ],
  //         [ "selected-at(self::node(), 2)", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), 'ef' ],
  //         [ "selected-at(self::node(), -1)", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), '' ],
  //         [ "selected-at('apple baby crimson', 2)", g.doc, 'crimson' ],
  //         [ "selected-at('apple baby crimson', -1)", g.doc, '' ],
  //         [ "selected-at('', 1)", g.doc, '' ]
  //     ].forEach( t => {
  //         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
  //         expect( t[ 2 ] ).to.equal( result.stringValue );
  //     } );
  });
});
