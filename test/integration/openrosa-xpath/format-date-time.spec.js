describe('#format-date-time()', () => {
  _.forEach({
    'format-date-time("2001-12-31", "%b %e, %Y")': 'Dec 31, 2001',
  }, function(expected, expr) {
    it(expr + ' should evaluate to ' + expected, () => {
      assertString(expr, expected);
    });
  });
});
