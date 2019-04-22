describe('#format-date()', () => {
  _.forEach({
    'format-date("2001-12-31", "%b %e, %Y")': 'Dec 31, 2001',
  }, function(expected, expr) {
    it(expr + ' should evaluate to ' + expected, () => {
      assertString(expr, expected);
    });
  });
});
