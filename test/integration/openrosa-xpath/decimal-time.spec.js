describe('decimal-time()', () => {
  it('decimates times', () => {
    assertNumberValue('decimal-time("06:00:00.000-07:00")', 0.250);
    assertNumberValue('decimal-time("06:00:00.000-01:00")', 0.000);
    assertNumberValue('decimal-time("06:00:59.000-07:00")', 0.251);
    assertNumberValue('decimal-time("23:59:00.000-07:00")', 0.999);
    assertNumberValue('decimal-time("23:59:00.000-13:00")', 0.249);
    assertNumberValue('decimal-time("a")', NaN);
    assertNumberValue('decimal-time("24:00:00.000-07:00")', NaN);
    assertNumberValue('decimal-time("06:00:00.000-24:00")', NaN);
    assertNumberValue('decimal-time("06:60:00.000-07:00")', NaN);
    assertNumberValue('decimal-time("06:00:60.000-07:00")', NaN);
    assertNumberValue('decimal-time("23:59:00.000-07:60")', NaN);
    assertNumberValue('decimal-time("now()")', NaN);
  });

  it(`facilitates time calculations and evaluates`, () => {
    assertNumberValue('decimal-time("12:00:00.000-07:00") - decimal-time("06:00:00.000-07:00")', 0.250);
  });

  it('with invalid args throws an error', () => {
    assert.throw(() => xEval('decimal-time("06:00:00.000-07:00", 2)'), Error);
  });
});
