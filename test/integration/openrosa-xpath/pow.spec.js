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
    it('no input pow', () => {
      assertNumber('pow(2, 2)', 4);
      assertNumber('pow(2, 0)', 1);
      assertNumber('pow(0, 4)', 0);
      assertNumber('pow(2.5, 2)', 6.25);
      assertNumber('pow(0.5, 2)', 0.25);
      assertNumber('pow(-1, 2)', 1);
      assertNumber('pow(-1, 3)', -1);
      assertNumber('pow(4, 0.5)', 2);
      assertNumber('pow(16, 0.25)', 2);
    });
  });
});
