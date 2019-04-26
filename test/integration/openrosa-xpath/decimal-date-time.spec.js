describe('#decimal-date-time()', () => {
  _.forEach({
    'decimal-date-time("1970-01-01T00:00:00Z")' : 0,
    'decimal-date-time("1970-01-02T00:00:00Z")' : 1,
    'decimal-date-time("1969-12-31T00:00:00Z")' : -1,
    // TODO()
    // 'decimal-date-time("2018-04-24T15:30:00.000+06:00")': 17645.396,
  }, function(expectedDaysSinceEpoch, expr) {
    it('should convert ' + expr + ' into ' + expectedDaysSinceEpoch, () => {
      assertNumber(expr, expectedDaysSinceEpoch);
    });
  });

  it(`with invalid args, throws an error`, () => {
    TODO()
    // assert.throw(() => xEval('decimal-date-time("1970-01-01T00:00:00.000Z", 2)'), Error);
  });
});
