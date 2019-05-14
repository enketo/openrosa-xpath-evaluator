const PATH = '/simple/xpath/to/node';

describe('#int()', () => {
  it('should convert a string to an integer', () => {
    assertNumber('123', `int(${PATH})`, 123);
  });
  it('should convert a decimal to an integer', () => {
    assertNumber('123.456', `int(${PATH})`, 123);
    assertNumber('int(2.1)', 2);
    assertNumber('int(2.51)', 2);
    assertNumber('int(2)', 2);
    assertNumber('int("2.1")', 2);
    assertNumber('int("2.51")', 2);
    assertNumber('int(-1.4)', -1);
    assertNumber('int(-1.51)', -1);
    assertNumber('int("a")', NaN);
    assertNumber('int(7.922021953507237e-12)', 0);
    assertNumber('int(1 div 47999799999)', 0);
    // assertNumber('int("7.922021953507237e-12)', NaN);
  });

});
