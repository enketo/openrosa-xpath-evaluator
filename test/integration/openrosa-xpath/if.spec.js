  describe('#if()', () => {
    it('should return first option if true', () => {
      assertString('if(true(), "a", "b")', 'a');
      assertString('if(true(), 5, "abc")', 5);
    });

    it('should return second option if false', () => {
      assertString('if(false(), "a", "b")', 'b');
      assertString('if(false(), 5, "abc")', 'abc');
      assertString('if(6 > 7, 5, "abc")', 'abc');
      assertString('if("", 5, "abc")', "abc" );
    });

    it('should evaluate node', () => {
      TODO();
      // "if(self::node(), 'exists', 'does not exist')", g.doc.getElementById( 'FunctionChecklistCaseEmpty' ), 'exists'
    });
});
