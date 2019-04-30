describe( 'native boolean functions', () => {
  it('boolean() conversion of booleans', () => {
    assertTrue("boolean('a')");
    assertFalse("boolean('')");
    assertTrue("boolean(true())");
    assertFalse("boolean(false())");
  });

  it('boolean() conversion of numbers', () => {
    assertTrue("boolean(1)");
    assertTrue("boolean(-1)");
    // assertTrue("boolean(1 div 0)");
    assertTrue("boolean(0.1)");
    assertTrue("boolean('0.0001')");
    assertFalse("boolean(0)");
    assertFalse("boolean(0.0)");
    assertFalse("boolean(number(''))");
  });

  xit('boolean() conversion of nodeset', () => {
    assertTrue("boolean(/xhtml:html)");
    assertFalse("boolean(/asdf)");
    assertFalse("boolean(//xhtml:article)");
  });

  xit('boolean(self::node())', () => {
    const doc = initDoc(`
      <root>
        <div id="FunctionBooleanEmptyNode">
          <div></div>
        </div>
      </root>`);
    const node = doc.getElementById('FunctionBooleanEmptyNode');
    assertTrue("boolean(self::node())");
  });

  it('boolean() fails when too few arguments are provided', () => {
    assert.throw(() => xEval("boolean()"), Error);
  });

  it('boolean() fails when too many arguments are provided', () => {
    assert.throw(() => xEval("boolean(1, 2)"), Error);
  });
});
