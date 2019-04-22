describe('openrosa-xpath', () => {
  it('should process simple xpaths', () => {
    assertString('val', '/simple/xpath/to/node', 'val');
  });
});
