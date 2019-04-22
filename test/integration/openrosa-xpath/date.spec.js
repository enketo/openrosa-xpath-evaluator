describe('#date()', () => {
  describe('valid date string', () => {
    it('should be left alone', () => {
      assertString("date('1970-01-01')", '1970-01-01');
    });
  });

  describe('date string with single-digit day or month values', () => {
    it('should insert zeroes', () => {
      assertString("date('1970-1-2')", '1970-01-02');
    });
  });

  describe('number', () => {
    _.forEach({
      'date(0)': '1970-01-01',
      'date(1)': '1970-01-02',
      'date(1.5)': '1970-01-02',
      'date(-1)': '1969-12-31',
    }, function(expected, expr) {
      it(expr + ' should be converted to ' + expected, () => {
        assertString(expr, expected);
      });
    });
  });

  describe('invalid date', () => {
    it('should not parse, but instead should return a String', () => {
      assertString("date('nonsense')", 'Invalid Date');
    });
  });

  describe('comparisons', () => {
    _.forEach({
        'date("2001-12-26") > date("2001-12-25")': true,
        'date("2001-12-26") < date("2001-12-25")': false,
        'date("1969-07-20") < date("1969-07-21")': true,
        'date("1969-07-20") > date("1969-07-21")': false,
        'date("2004-05-01") = date("2004-05-01")': true,
        'date("2004-05-01") != date("2004-05-01")': false,
        '"string" != date("1999-09-09")': true,
        '"string" = date("1999-09-09")': false,
        'date(0) = date("1970-01-01")': true,
        'date(0) != date("1970-01-01")': false,
        'date(1) = date("1970-01-02")': true,
        'date(1) != date("1970-01-02")': false,
        'date(-1) = date("1969-12-31")': true,
        'date(-1) != date("1969-12-31")': false,
        'date(14127) = date("2008-09-05")': true,
        'date(14127) != date("2008-09-05")': false,
        'date(-10252) = date("1941-12-07")': true,
        'date(-10252) != date("1941-12-07")': false,
        'date("2012-01-01") < today()': true,
        'date("2012-01-01") > today()': false,
        'date("2100-01-02") > today()': true,
        'date("2100-01-02") < today()': false,
    }, function(expected, expr) {
      it('should evaluate \'' + expr + '\' to: ' + expected, () => {
        assert.equal(xEval(expr).booleanValue, expected);
      });
    });
  });
  describe('math', () => {
    _.forEach({
        'date("2001-12-26") + 5': '2001-12-31',
        'date("2001-12-26") - 5': '2001-12-21',
        '5 + date("2001-12-26")': '2001-12-31',
        '-5 + date("2001-12-26")': '2001-12-21',
        '3 + date("2001-12-26") + 5': '2002-01-03',
        '3 + date("2001-12-26") - 5': '2001-12-24',
    }, function(expected, expr) {
      it('should evaluate \'' + expr + '\' to: ' + expected, () => {
        assertString(expr, expected);
      });
    });
  });
});
