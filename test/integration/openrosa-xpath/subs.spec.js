describe('#substr()', () => {
  it('should give the rest of a string if supplied with only startIndex', () => {
    assertString('0123456789', 'substr(/simple/xpath/to/node, 5)', '56789');
  });
  it('should give substring from start to finish if supplied with 2 indexes', () => {
    assertString('0123456789', 'substr(/simple/xpath/to/node, 2, 4)', '23');
  });
  it('substr()', () => {
    TODO();
  //     [
  //         [ "substr('hello',0)", "hello" ],
  //         [ "substr('hello',0,5)", "hello" ],
  //         [ "substr('hello',1)", "ello" ],
  //         [ "substr('hello',1,5)", "ello" ],
  //         [ "substr('hello',1,4)", "ell" ],
  //         [ "substr('hello',-2)", "lo" ],
  //         [ "substr('hello',0,-1)", "hell" ]
  //     ].forEach( t => {
  //         const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.STRING_TYPE, null );
  //         expect( result.stringValue ).to.equal( t[ 1 ] );
  //     } );
  });
});
