  describe('#now()', () => {
    it('should return a timestamp for this instant', () => {
      var before = Date.now(),
          val = xEval('now()').numberValue,
          after = Date.now();

      assert.ok(before <= val && after >= val);
    });
  });
