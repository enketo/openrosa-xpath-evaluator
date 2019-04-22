describe('ends-with', () => {
  it('ends-with', () => {
    assertTrue("ends-with('', '')");
    assertTrue("ends-with('a', '')");
    assertTrue("ends-with('a', 'a')");
    assertFalse("ends-with('a', 'b')");
    assertTrue("ends-with('ba', 'a')");
    assertFalse("ends-with('', 'b')");
  });

  it( 'ends-with() fails when too many arguments are provided', () => {
    assert.throw(() => xEval("ends-with(1, 2, 3)"), Error);
  });

  it( 'ends-with() fails when not enough arguments are provided', () => {
    assert.throw(() => xEval("ends-with()"), Error);
    assert.throw(() => xEval("ends-with(1)"), Error);
  });
});
