describe('math functions', () => {
  TODO()

  xit('sin()', () => {
    assertNumber('sin(2)', 0.9092974268256817);
    assertNumber('sin(//xhtml:div[@id="testFunctionNodeset2"]/xhtml:p[2])', 0.9092974268256817);
    assertNumber('sin("a")', NaN);
  });

  xit('cos()', () => {
    assertNumber('cos(2)', -0.4161468365471424);
    assertNumber('cos("NaN")', NaN);
  });

  xit('tan()', () => {
    assertNumber('tan(2)', -2.185039863261519);
    assertNumber('tan("a")', NaN);
    assertNumber('tan("NaN")', NaN);
  });

  xit( 'acos()', () => {
    assertNumber('acos(0.5)', 1.047197551196598);
    assertNumber('acos(-1)', 3.141592653589793);
    assertNumber('acos(2)', NaN);
    assertNumber('acos("a")', NaN);
    assertNumber('acos("NaN")', NaN);
    // expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
  });

  xit('asin()', () => {
    assertNumber('asin(0.5)', 0.523598775598299);
    assertNumber('asin(-1)', -1.570796326794896);
    assertNumber('asin(2)', NaN);
    assertNumber('asin("a")', NaN);
    assertNumber('asin("NaN")', NaN);
    // expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
  });

  xit( 'atan()', () => {
    assertNumber('atan(0.5)', 0.463647609000806);
    assertNumber('atan(-1)', -0.785398163397448);
    assertNumber('atan("a")', NaN);
    assertNumber('atan("NaN")', NaN);
    // expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
  });

  xit( 'atan2()', () => {
    assertNumber('atan2(2,3)', 0.5880026035475675);
    assertNumber('atan2(2, "NaN")', NaN);
    assertNumber('atan2(2, "a")', NaN);
    assertNumber('atan2("NaN", 2)', NaN);
  });

  xit( 'log()', () => {
    assertNumber('log(2)', 0.6931471805599453);
    assertNumber('log("NaN")', NaN);
    assertNumber('log("a")', NaN);
  });

  xit('log10()', () => {
    assertNumber('log10(2)', 0.3010299956639812);
    assertNumber('log10("NaN")', NaN);
    assertNumber('log10("a")', NaN);
  });

  xit('pi()', () => {
    assertNumber('pi()', 3.141592653589793);
  });

  xit( 'exp()', () => {
    assertNumber('exp(2)', 7.38905609893065);
    assertNumber('exp("NaN")', NaN);
  });

  xit('exp10()', () => {
    assertNumber('exp10(2)', 100);
    assertNumber('exp10(-2)', 0.01);
    assertNumber('exp10("NaN")', NaN);
  });

  xit( 'sqrt()', () => {
    assertNumber('sqrt(4)', 2);
    assertNumber('sqrt(-2)', NaN);
    assertNumber('sqrt("NaN")', NaN);
  });
});
