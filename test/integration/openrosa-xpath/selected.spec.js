describe('#selected()', () => {
  it('should return true if requested item is in list', () => {
    // given
    simpleValueIs('one two three');

    // expect
    assert.ok(xEval('selected(/simple/xpath/to/node, "one")').booleanValue);
    assert.ok(xEval('selected(/simple/xpath/to/node, "two")').booleanValue);
    assert.ok(xEval('selected(/simple/xpath/to/node, "three")').booleanValue);
  });
  it('should return false if requested item not in list', () => {
    // given
    simpleValueIs('one two three');

    // expect
    assert.notOk(xEval('selected(/simple/xpath/to/node, "on")').booleanValue);
    assert.notOk(xEval('selected(/simple/xpath/to/node, "ne")').booleanValue);
    assert.notOk(xEval('selected(/simple/xpath/to/node, "four")').booleanValue);
  });
});
