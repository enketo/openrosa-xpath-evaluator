describe('#coalesce()', () => {
  it('should return first value if provided via xpath', () => {
    assertString('first', 'coalesce(/simple/xpath/to/node, "whatever")', 'first');
  });
  it('should return first value if provided via string', () => {
    assertString('coalesce("FIRST", "whatever")', 'FIRST');
  });
  it('should return second value from xpath if first value is empty string', () => {
    assertString('second', 'coalesce("", /simple/xpath/to/node)', 'second');
  });
  it('should return second value from string if first value is empty string', () => {
    assertString('coalesce("", "SECOND")', 'SECOND');
  });
  it('should return second value from xpath if first value is empty xpath', () => {
    assertString('second', 'coalesce(/simple/empty, /simple/xpath/to/node)', 'second');
  });
  it('should return second value from string if first value is empty xpath', () => {
    assertString('', 'coalesce(/simple/xpath/to/node, "SECOND")', 'SECOND');
  });
});
