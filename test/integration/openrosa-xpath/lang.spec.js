describe( 'lang functions', () => {
  it('lang()', () => {
    TODO()
    // [
      // [ "lang('en')", true ],
      // [ "lang('EN')", true ],
  //     [ "lang('EN-us')", g.doc.documentElement, true ],
  //     [ "lang('EN-us-boont')", g.doc.documentElement, false ], //
  //     // hierarchy check
  //     [ "lang('EN')", g.doc.querySelector( 'body' ), true ],
  //     [ "lang('sr')", g.doc.getElementById( 'testLang2' ), true ],
  //     [ "lang('sr-Cyrl-bg')", g.doc.getElementById( 'testLang2' ), true ],
  //     [ "lang('fr')", g.doc.getElementById( 'testLang2' ), false ], //
  //     // node check
  //     [ "lang('sl')", g.doc.getElementById( 'testLang3' ), true ], //
  //     // attribute node check
  //     [ "lang('sr-Cyrl-bg')", helpers.filterAttributes( g.doc.getElementById( 'testLang4' ).attributes )[ 0 ], true ]
    // ].forEach( t => {
    //   assertBoolean(t[0], t[1]);
    // } );
    // assertTrue("lang('en')");
    // assertTrue("lang('EN')");
    // assertTrue("lang('EN-us')");
  });

  it( 'lang() fails when too few arguments are provided', () => {
    assert.throw(() => xEval("lang()"), Error);
  });

  it( 'lang() fails when too many arguments are provided', () => {
    assert.throw(() => xEval("lang(1, 2)"), Error);
  });
});
