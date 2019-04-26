describe('#substr()', () => {
  it('should give the rest of a string if supplied with only startIndex', () => {
    assertString('0123456789', 'substr(/simple/xpath/to/node, 5)', '56789');
  });
  it('should give substring from start to finish if supplied with 2 indexes', () => {
    assertString('0123456789', 'substr(/simple/xpath/to/node, 2, 4)', '23');
  });
  it('substr()', () => {
    assertString("substr('hello',0)", "hello");
    assertString("substr('hello',0,5)", "hello");
    assertString("substr('hello',1)", "ello");
    assertString("substr('hello',1,5)", "ello");
    assertString("substr('hello',1,4)", "ell");
    TODO()
    // assertString("substr('hello',-2)", "lo");
    // assertString("substr('hello',0,-1)", "hell");
  });
});
