const {assertBoolean, assertString, assertNumberValue, initDoc} = require('./helpers');

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
      }, (expected, expr) => {
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
      }, (expectedBoolean, expr) => {
        it('should evaluate "' + expr + '" as ' + expectedBoolean.toString().toUpperCase(), () => {
          assertBoolean(expr, expectedBoolean);
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
        // We don't compare strings by default.
        // We can configure this in config.js
        '"aardvark" < "aligator"' : false,
        '"aardvark" <= "aligator"' : false,
        '"aligator" < "aardvark"' : false,
        '"aligator" <= "aardvark"' : false,
        '"possum" > "aligator"' : false,
        '"possum" >= "aligator"' : false,
        '"aligator" > "possum"' : false,
        '"aligator" >= "possum"' : false,
      }, (expectedBoolean, expr) => {
        it('should evaluate "' + expr + '" as ' + expectedBoolean.toString().toUpperCase(), () => {
          assertBoolean(expr, expectedBoolean);
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
      }, (expectedBoolean, expr) => {
        it('should evaluate "' + expr + '" as ' + expectedBoolean.toString().toUpperCase(), () => {
          assertBoolean(expr, expectedBoolean);
        });
      });
    });
  });
  describe('number operations', () => {
    it( '*,+,-,mod,div precendence rules are applied correctly', () => {
      [
          [ "1+2*3", 7 ],
          [ "2*3+1", 7 ],
          [ "1-10 mod 3 div 3", 0.6666666666666667 ],
          [ "4-3*4+5-1", -4 ],
          [ "(4-3)*4+5-1", 8 ],
          [ "8 div 2 + 4", 8 ]
      ].forEach(([expr, expected]) => {
          assertNumberValue(expr, expected);
      });

      assertNumberValue('1-1', 0);
      assertNumberValue('1 - 1', 0);
    });

    it('calculation with node operand returned as string', () => {
      initDoc(`
      <data>
        <number>4</number>
      </data>`);

      // It doesn't matter whether a string or number is requested, an infix operator should ensure that both 
      // left and right operands are converted to numbers during evaluation.
      // If multiple nodes are returned, the value of the first node will be used.
      assertString('/data/number + 1', '5'); // returns '41'

    });

    it('calculation with multiple nodes operand returned as string', () => {
      initDoc(`
      <data>
        <number>4</number>
        <number>10</number>
      </data>`);

      // It doesn't matter whether a string or number is requested, an infix operator should ensure that both 
      // left and right operands are converted to numbers during evaluation.
      // If multiple nodes are returned, the value of the first node will be used.
      assertString('/data/number + 1', '5'); // returns '4,101'

    });
  });
});
