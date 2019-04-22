describe('basic xpath', function() {
  describe('comparing node values', function() {
    describe('to integer values', function() {
      it('should support equality operator', function() {
        assertTrue(1, '/simple/xpath/to/node = 1');
      });
      it('should support inequality operator', function() {
        assertFalse(1, '/simple/xpath/to/node != 1');
      });
      it('should support comparators', function() {
        assertFalse(1, '/simple/xpath/to/node < 1');
        assertFalse(1, '/simple/xpath/to/node > 1');
        assertTrue(1, '/simple/xpath/to/node <= 1');
        assertTrue(1, '/simple/xpath/to/node >= 1');
      });
    });
    describe('to string values', function() {
      it('should support equality operator', function() {
        assertTrue(1, '/simple/xpath/to/node = "1"');
      });
      it('should support inequality operator', function() {
        assertFalse(1, '/simple/xpath/to/node != "1"');
      });
    });
  });
});
