describe('#number()', () => {
  describe('called on a boolean', () => {
    _.forEach({
        'number(true())': '1',
        'number(false())': '0',
        'number(1 = 1)': '1',
        'number(1 = 2)': '0',
    }, function(expectedResult, expr) {
      it(`${expr} should be ${expectedResult}`, () => {
        assert.equal(xEval(expr).numberValue, expectedResult);
      });
    });
  });
  describe('called on a number', () => {
    _.forEach({
        'number("0")': '0',
        'number("1")': '1',
        'number("-1")': '-1',
    }, function(expectedResult, expr) {
      it(`${expr} should be ${expectedResult}`, () => {
        assert.equal(xEval(expr).numberValue, expectedResult);
      });
    });
  });
  describe('called on a date string', () => {
    _.forEach({
        'number("1970-01-01")': '0',
        'number("1970-01-02")': '1',
        'number("1969-12-31")': '-1',
        'number("2008-09-05")': '14127',
        'number("1941-12-07")': '-10252',
    }, function(expectedResult, expr) {
      it(expr + ' should be ' + expectedResult + ' days since the epoch', () => {
        TODO();
        // assert.equal(xEval(expr).numberValue, expectedResult);
      });
    });
  });
});
