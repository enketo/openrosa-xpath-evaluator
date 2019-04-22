describe('#int()', () => {
  it('should convert a string to an integer', () => {
    assertNumber('123', 'int(/simple/xpath/to/node)', 123);
  });
  it('should convert a decimal to an integer', () => {
    assertNumber('123.456', 'int(/simple/xpath/to/node)', 123);
  });
  // TODO it's not clear from the spec what else this should do
});
