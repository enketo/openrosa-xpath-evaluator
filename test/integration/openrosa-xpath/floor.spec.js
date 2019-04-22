describe('#floor()', () => {
  _.forEach({
    '3': 3,
    '12.5': 12,
    '-3.75': -4,
  }, function(expected, decimal) {
    var expr = 'floor(' + decimal + ')';
    it('should convert ' + expr + ' to ' + expected, () => {
      assertNumber(expr, expected);
    });
  });
});
