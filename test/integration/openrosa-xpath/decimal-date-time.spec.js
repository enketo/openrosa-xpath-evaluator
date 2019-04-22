describe('#decimal-date-time()', () => {
  _.forEach({
    'decimal-date-time("1970-01-01T00:00:00Z")' : 0,
    'decimal-date-time("1970-01-02T00:00:00Z")' : 1,
    'decimal-date-time("1969-12-31T00:00:00Z")' : -1,
  }, function(expectedDaysSinceEpoch, expr) {
    it('should convert ' + expr + ' into ' + expectedDaysSinceEpoch, () => {
      assertNumber(expr, expectedDaysSinceEpoch);
    });
  });
});
