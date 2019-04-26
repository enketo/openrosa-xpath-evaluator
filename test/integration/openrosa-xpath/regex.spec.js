describe('#regex()', () => {
  it('should return `true` if value matches supplied regex', () => {
    // given
    simpleValueIs('123');

    // expect
    assert.ok(xEval('regex(/simple/xpath/to/node, "[0-9]{3}")').booleanValue);
  });
  // This test assumes that regex matching is for the whole value, so start
  // and end marks do not need to be included.  This seems logical, but is
  // not explicitly stated in the spec.
  it('should return `false` if value matches supplied regex', () => {
    // given
    simpleValueIs('1234');

    // expect
    assert.ok(xEval('regex(/simple/xpath/to/node, "[0-9]{3}")').booleanValue);
  });

  it('regex()', () => {
    TODO();
  //     [
  //         [ "regex('12345','[0-9]+')", g.doc, true ],
  //         [ "regex('abcde','[0-9]+')", g.doc, false ]
  //     ].forEach( t => {
  //         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.BOOLEAN_TYPE, null );
  //         expect( t[ 2 ] ).to.equal( result.booleanValue );
  //     } );
  });
});
