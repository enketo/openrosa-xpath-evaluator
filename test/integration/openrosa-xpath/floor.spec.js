describe('#floor()', () => {
  it('should convert', () => {
    assertNumber("floor('3')", 3);
    assertNumber('floor(12.5)', 12);
    assertNumber('floor(-3.75)', -4);
    assertNumber('floor(-1.55)', -2);
    assertNumber('floor(2.44)', 2);
    assertNumber('floor(0.001)', 0);
    assertNumber('floor(1.5)', 1);
    assertNumber('floor(5)', 5);
    assertNumber('floor(1.00)', 1);
    assertNumber('floor(-1.005)', -2);
  });

  it( 'floor() fails when too many arguments are provided', () => {
    assert.throw(() => xEval('floor(1, 2)'), Error);
  });

  it( 'floor fails when too few arguments are provided', () => {
    assert.throw(() => xEval('floor()'), Error);
  });
});
