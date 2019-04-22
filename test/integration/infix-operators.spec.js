describe('infix operators', () => {
  describe('math operators', () => {
    describe('with numbers', () => {
      _.forEach({
        '1 + 1' : 2,
        '1 - 1' : 0,
        '1 * 1' : 1,
        '1 div 1' : 1,
        '1 mod 1' : 0,
        '2 + 1' : 3,
        '2 - 1' : 1,
        '2 * 1' : 2,
        '2 div 1' : 2,
        '2 mod 1' : 0,
        '1 + 2' : 3,
        '1 - 2' : -1,
        '1 * 2' : 2,
        '1 div 2' : 0.5,
        '1 mod 2' : 1,
      }, function(expected, expr) {
        it('should evaluate "' + expr + '" as ' + expected, () => {
          assertString(expr, expected);
        });
      });
    });
  });
  describe('boolean operators', () => {
    describe('with numbers', () => {
      _.forEach({
        '1 = 1' : true,
        '1 != 1' : false,
        '1 = 2' : false,
        '1 != 2' : true,
        '1 < 2' : true,
        '1 > 2' : false,
        '2 < 1' : false,
        '2 > 1' : true,
        '1 <= 2' : true,
        '1 >= 2' : false,
        '2 <= 1' : false,
        '2 >= 1' : true,
        '1 <= 1' : true,
        '1 >= 1' : true,
        '1 &lt; 2' : true,
        '1 &gt; 2' : false,
        '2 &lt; 1' : false,
        '2 &gt; 1' : true,
        '1 &lt;= 2' : true,
        '1 &gt;= 2' : false,
        '2 &lt;= 1' : false,
        '2 &gt;= 1' : true,
        '1 &lt;= 1' : true,
        '1 &gt;= 1' : true,

        /* weird spacing */
        '1=1' : true,
        '1= 1' : true,
        '1 =1' : true,
        '2=1' : false,
        '2= 1' : false,
        '2 =1' : false,
        '1!=1' : false,
        '1!= 1' : false,
        '1 !=1' : false,
        '2!=1' : true,
        '2!= 1' : true,
        '2 !=1' : true,
        '1<1' : false,
        '1< 1' : false,
        '1 <1' : false,
        '2<1' : false,
        '2< 1' : false,
        '2 <1' : false,
        '1>1' : false,
        '1> 1' : false,
        '1 >1' : false,
        '2>1' : true,
        '2> 1' : true,
        '2 >1' : true,
        '1<=1' : true,
        '1<= 1' : true,
        '1 <=1' : true,
        '2<=1' : false,
        '2<= 1' : false,
        '2 <=1' : false,
        '1>=1' : true,
        '1>= 1' : true,
        '1 >=1' : true,
        '2>=1' : true,
        '2>= 1' : true,
        '2 >=1' : true,
        '1&lt;1' : false,
        '1&lt; 1' : false,
        '1 &lt;1' : false,
        '2&lt;1' : false,
        '2&lt; 1' : false,
        '2 &lt;1' : false,
        '1&gt;1' : false,
        '1&gt; 1' : false,
        '1 &gt;1' : false,
        '2&gt;1' : true,
        '2&gt; 1' : true,
        '2 &gt;1' : true,
        '1&lt;=1' : true,
        '1&lt;= 1' : true,
        '1 &lt;=1' : true,
        '2&lt;=1' : false,
        '2&lt;= 1' : false,
        '2 &lt;=1' : false,
        '1&gt;=1' : true,
        '1&gt;= 1' : true,
        '1 &gt;=1' : true,
        '2&gt;=1' : true,
        '2&gt;= 1' : true,
        '2 &gt;=1' : true,
      }, function(expectedBoolean, expr) {
        it('should evaluate "' + expr + '" as ' + expectedBoolean.toString().toUpperCase(), () => {
          assert.equal(xEval(expr).booleanValue, expectedBoolean);
        });
      });
    });
    describe('with strings', () => {
      _.forEach({
        '"1" = "1"' : true,
        '"1" = "2"' : false,
        '"1" != "1"' : false,
        '"1" != "2"' : true,
        '"1" < "2"' : true,
        '"1" > "2"' : false,
        '"2" < "1"' : false,
        '"2" > "1"' : true,
        '"1" <= "2"' : true,
        '"1" >= "2"' : false,
        '"2" <= "1"' : false,
        '"2" >= "1"' : true,
        '"1" <= "1"' : true,
        '"1" >= "1"' : true,
        '"1" &lt; "2"' : true,
        '"1" &gt; "2"' : false,
        '"2" &lt; "1"' : false,
        '"2" &gt; "1"' : true,
        '"1" &lt;= "2"' : true,
        '"1" &gt;= "2"' : false,
        '"2" &lt;= "1"' : false,
        '"2" &gt;= "1"' : true,
        '"1" &lt;= "1"' : true,
        '"1" &gt;= "1"' : true,
        '"aardvark" < "aligator"' : true,
        '"aardvark" <= "aligator"' : true,
        '"aligator" < "aardvark"' : false,
        '"aligator" <= "aardvark"' : false,
        '"possum" > "aligator"' : true,
        '"possum" >= "aligator"' : true,
        '"aligator" > "possum"' : false,
        '"aligator" >= "possum"' : false,
      }, function(expectedBoolean, expr) {
        it('should evaluate "' + expr + '" as ' + expectedBoolean.toString().toUpperCase(), () => {
          assert.equal(xEval(expr).booleanValue, expectedBoolean);
        });
      });
    });
    describe('with booleans', () => {
      _.forEach({
        'true() and true()': true,
        'false() and true()': false,
        'true() and false()': false,
        'false() and false()': false,
        'true() or true()': true,
        'false() or true()': true,
        'true() or false()': true,
        'false() or false()': false,
      }, function(expectedBoolean, expr) {
        it('should evaluate "' + expr + '" as ' + expectedBoolean.toString().toUpperCase(), () => {
          assert.equal(xEval(expr).booleanValue, expectedBoolean);
        });
      });
    });
  });
});
