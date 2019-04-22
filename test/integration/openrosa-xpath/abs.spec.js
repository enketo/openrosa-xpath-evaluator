describe( '#abs()', () => {
  it( 'abs', () => {
    assertNumber('abs(10.5)', 10.5);
    assertNumber('abs(-10.5)', 10.5);
    assertNumber('abs("-10.5")', 10.5);
    assert.isNaN(xEval('abs("a")').numberValue);
  });
});
