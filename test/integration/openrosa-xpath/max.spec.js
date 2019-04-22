describe('#max()', () => {
  it('should return NaN if no numerical nodes are matched', () => {
    // given
    simpleValueIs('');

    // expect
    assert.isNaN(xEval('max(/simple)').numberValue);
  });

  it('should return value of a single node if only one matches', () => {
    assertNumber('3', 'max(/simple/xpath/to/node)', 3);
  });

  it('should return NaN if any node evaluates to NaN', () => {
    // given
    initDoc(`
        <root>
          <item>3</item>
          <item>17</item>
          <item>-32</item>
          <item>cheese</item>
        </root>`);

    // expect
    assert.isNaN(xEval('max(/root/item)').numberValue);
  });

  it('should return the max value in a node set', () => {
    // given
    initDoc(`
        <root>
          <item>3</item>
          <item>17</item>
          <item>-32</item>
        </root>`);

    // expect
    assertNumber('max(/root/item)', 17);
  });

  it('should return the max value in a node set of negative numbers', () => {
    // given
    initDoc(`
        <root>
          <item>-3</item>
          <item>-17</item>
          <item>-32</item>
        </root>`);

    // expect
    assertNumber('max(/root/item)', -3);
  });
});
