describe( 'lang functions', () => {
  TODO()
  xit('lang()', () => {
    assertTrue("lang('en')");
    assertTrue("lang('EN')");
    assertTrue("lang('EN-us')");
    assertFalse("lang('EN-us-boont')")
  });

  xit('hierarchy check', () => {
    let node = doc.querySelector('body');
    assertBoolean(node, null, "lang('EN')", true);

    node = doc.getElementById('testLang2');
    assertBoolean(node, null, "lang('sr')", true);
    assertBoolean(node, null, "lang('sr-Cyrl-bg')", true);
    assertBoolean(node, null, "lang('fr')", false);

    node = doc.getElementById('testLang3');
    assertBoolean(node, null, "lang('sl')", true);

    // attribute node check
    // assertTrue("lang('sr-Cyrl-bg')", helpers.filterAttributes( g.doc.getElementById( 'testLang4' ).attributes )[ 0 ], true ]
  });

  it( 'lang() fails when too few arguments are provided', () => {
    assert.throw(() => xEval("lang()"), Error);
  });

  it( 'lang() fails when too many arguments are provided', () => {
    assert.throw(() => xEval("lang(1, 2)"), Error);
  });
});
