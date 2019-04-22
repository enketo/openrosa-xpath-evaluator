  describe('#false()', () => {
    it('should evaluate to false', () => {
      assertFalse('false()');
    });

    it('false() fails when too many arguments are provided', () => {
      assert.throw(() => xEval("false('a')"), Error);
    });
  });
