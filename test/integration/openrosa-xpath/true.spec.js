describe('#true()', () => {
  it('should evaluate to true', () => {
    assertTrue('true()');
  });

  it('true() fails when too many arguments are provided', () => {
    assert.throw(() => xEval('true(1)'), Error);
  });
});
