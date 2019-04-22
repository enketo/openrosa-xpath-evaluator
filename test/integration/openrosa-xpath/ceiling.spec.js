describe('ceiling', () => {
  it( 'ceiling()', () => {
    assertNumber("ceiling(-1.55)", -1);
    assertNumber("ceiling(2.44)", 3);
    assertNumber("ceiling(0.001)", 1);
    assertNumber("ceiling(1.5)", 2);
    assertNumber("ceiling(5)", 5);
    assertNumber("ceiling(1.00)", 1);
    assertNumber("ceiling(-1.05)", -1);
  });

  it( 'ceiling() fails when too many arguments are provided', () => {
    assert.throw(() => xEval("ceiling(1, 2)"), Error);
  });

  it( 'ceiling() fails when not enough arguments are provided', () => {
    assert.throw(() => xEval("ceiling()"), Error);
  });
});
