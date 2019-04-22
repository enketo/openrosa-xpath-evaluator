describe('#date-time()', () => {
  describe('valid date string', () => {
    it('should be left alone', () => {
      assertString("date-time('1970-01-01')", '1970-01-01');
    });
  });

  describe('valid date-time string', () => {
    it('should be converted to date string', () => {
      assertString("date-time('1970-01-01T21:50:49Z')", '1970-01-01');
    });
  });

  describe('positive number', () => {
    _.forEach({
      'date-time(0)': '1970-01-01',
      'date-time(1)': '1970-01-02',
    }, function(expected, expr) {
      it(expr + ' should be converted to ' + expected, () => {
        assertString(expr, expected);
      });
    });
  });

  describe('invalid date-time', () => {
    it('should not parse, but instead should return a String', () => {
      assertString("date-time('nonsense')", 'Invalid Date');
    });
  });
});
