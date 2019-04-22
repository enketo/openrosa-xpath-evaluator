describe('#pow()', () => {
  describe('should return power of text values', () => {
    it('3^0', () => {
      assertNumber('3', 'pow(/simple/xpath/to/node, 0)', 1);
    });
    it('1^3', () => {
      assertNumber('1', 'pow(/simple/xpath/to/node, 3)', 1);
    });
    it('4^2', () => {
      assertNumber('4', 'pow(/simple/xpath/to/node, 2)', 16);
    });
  });
});
