describe('#decimal-date()', () => {
  _.forEach({
    'decimal-date("1970-01-01")' : 0,
    'decimal-date("1970-01-02")' : 1,
    'decimal-date("1969-12-31")' : -1,
  }, function(expectedDaysSinceEpoch, expr) {
    it('should convert ' + expr + ' into ' + expectedDaysSinceEpoch, () => {
      assertNumber(expr, expectedDaysSinceEpoch);
    });
  });
});
