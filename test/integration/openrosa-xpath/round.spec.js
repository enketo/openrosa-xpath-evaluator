describe('#round()', () => {
  describe('with a single argument', () => {
    it('with a single argument', () => {
      assertNumber('round(1)', 1);
      assertNumber('round(1.1)', 1);
      assertNumber('round(1.5)', 2);
      assertNumber('round(-1)', -1);
      assertNumber('round(-1.1)', -1);
      assertNumber('round(-1.5)', -2);
      assertNumber('round(-1.55)', -2);
      assertNumber('round(2.44)', 2);
      assertNumber('round(0.001)', 0);
      assertNumber('round(1.5)', 2);
      assertNumber('round(5)', 5);
      assertNumber('round(1.000)', 1);
      assertNumber('round(-1.05)', -1);
    });
  });

  describe('with two arguments', () => {
    it('with num_digits = 0', () => {
      assertNumber('round(1, 0)', 1);
      assertNumber('round(1.1, 0)', 1);
      assertNumber('round(1.5, 0)', 2);
      assertNumber('round(-1, 0)', -1);
      assertNumber('round(-1.1, 0)', -1);
      assertNumber('round(-1.5, 0)', -2);
    });

    describe('with num_digits > 0', () => {
      _.forEach([
        [ '0', 1, '0' ],
        [ '1', 1, '1' ],
        [ '1', 2, '1' ],
        [ '23.7825', 2, '23.78' ],
        [ '23.7825', 1, '23.8' ],
        [ '2.15', 1, '2.2' ],
        [ '2.149', 1, '2.1' ],
        [ '-1.475', 2, '-1.48' ],
      ], function(data) {
        // given
        var number = data[0];
        var numDigits = data[1];
        var expected = data[2];

        // and
        var expr = 'round("{1}", "{2}")'
            .replace('{1}', number)
            .replace('{2}', numDigits);

        it('should evaluate ' + expr + ' to ' + expected, () => {
          // when
          var res = xEval(expr);

          // then
          assert.equal(res.resultType, XPathResult.NUMBER_TYPE);
          assert.equal(res.stringValue, expected);
        });
      });
    });

    describe('with num_digits < 0', () => {
      _.forEach([
        [ '0', -1, 0 ],
        [ '1', -1, 0 ],
        [ '1', -2, 0 ],
        [ '23.7825', -2, 0 ],
        [ '23.7825', -1, 20 ],
        [ '2.15', -1, 0 ],
        [ '2.149', -1, 0 ],
        [ '-1.475', -2, 0 ],
        [ '21.5', -1, 20 ],
        [ '626.3', -3, 1000 ],
        [ '1.98', -1, 0 ],
        [ '-50.55', -2, -100 ],
      ], function(data) {
        // given
        var number = data[0];
        var numDigits = data[1];
        var expected = data[2];

        // and
        var expr = 'round("{1}", "{2}")'
            .replace('{1}', number)
            .replace('{2}', numDigits);

        it('should evaluate ' + expr + ' to ' + expected, () => {
          // when
          var res = xEval(expr);

          // then
          assert.equal(res.resultType, XPathResult.NUMBER_TYPE);
          assert.equal(res.stringValue, expected);
        });
      });
    });
  });

  it( 'round() fails when too few arguments are provided', () => {
      assert.throw(() => xEval("round()"), Error);
  });

  it('round()', () => {
    assertNumber("round(1.234)", 1);
    assertNumber("round(1.234, 2)", 1.23);
    assertNumber("round(1.234, 5)", 1.234);
    assertNumber("round(1.234, 0)", 1);
    // TODO()
    // assertNumber("round(33.33, -1)", 30);
    assertNumber("round(1 div 47999799999)", 0); //(2.08e-11)
    assertNumber("round('a')", NaN);
  });

  xit( 'round() with too many args throws exception', () => {
    TODO()
    assert.throw(() => "round(1, 2, 3)", Error);
  });
});
