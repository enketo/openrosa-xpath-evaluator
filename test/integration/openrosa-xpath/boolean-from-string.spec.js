describe('#boolean-from-string()', () => {
  it('boolean-from-string()', () => {
    [
      [ "boolean-from-string('')", false],
      [ "boolean-from-string(1)", true],
      [ "boolean-from-string(0)", false],
      [ "boolean-from-string('1')", true],
      [ "boolean-from-string('2')", false],
      [ "boolean-from-string('0')", false],
      [ "boolean-from-string('true')", true],
      [ "boolean-from-string('True')", false],
      [ "boolean-from-string('false')", false],
      [ "boolean-from-string('whatever')", false],
      [ "boolean-from-string('nonsense')", false],
      [ "boolean-from-string(1.0)", true ],
      [ "boolean-from-string(1.0001)", false],
      [ "boolean-from-string(true())", true]
    ].forEach( t => {
      assertBoolean(t[0], t[1]);
    });
  });
});
