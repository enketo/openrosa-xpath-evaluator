  describe('#if()', () => {
    it('should return first option if true', () => {
      assertString('if(true(), "a", "b")', 'a');
    });
    it('should return second option if false', () => {
      assertString('if(false(), "a", "b")', 'b');
    });
  });
