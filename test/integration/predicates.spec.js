const { assertNumberValue, assertStringValue, assertTrue, initDoc } = require('./helpers');

describe('predicates with function calls', ()=> {

  describe('with native functions', () => {
    [
      [ 1, 'count(/data/item[true()]) = 2',   assertTrue ],
      [ 1, 'count(/data/b[round(2.44) = 2])', assertNumberValue, 2 ],
      [ 1, '/data/item[true()]/number',       assertNumberValue, 4 ],
      [ 1, '/data/item[2]/number',            assertNumberValue, 6 ],
      [ 1, '/data/item[true()]/number + 1',   assertNumberValue, 5 ],
      [ 1, '/data/item[true()]/number + 1',   assertStringValue, '5' ],
      [ 1, '/data/item[string-length("a") = 1]/number + 2',      assertNumberValue, 6 ],
      [ 1, '/data/item[2]/number + 3',                           assertNumberValue, 9 ],
      [ 1, '/data/item[string-length(./number)=1]/number + 3',   assertNumberValue, 7 ],
      [ 1, '/data/item[string-length(./number) = 1]/number + 3', assertNumberValue, 7 ],
      [ 1, '/data/item[(./number div 3.14) > 1.9]/number',       assertNumberValue, 6 ],
    ].forEach(([ runThis, expr, assertion, ...extraArgs ]) => {
      runThis && it(`should evaluate ${expr} as expected`, () => {
        initDoc(`
          <data>
            <item>
              <number>4</number>
            </item>
            <item>
              <number>6</number>
            </item>
            <b/>
            <b/>
          </data>
        `);

        assertion(expr, ...extraArgs);
      });
    });
  });


  describe('with extended functions', () => {
    [
      [ 1, 'pi()',                                          assertNumberValue, 3.141592653589793 ],
      [ 1, '/data/item[1]/number',                          assertNumberValue, 4 ],
      [ 1, '/data/item[true()]/number',                     assertNumberValue, 4 ],
      [ 1, '/data/item[pi() > 3]/number',                   assertNumberValue, 4 ],
      [ 1, '/data/item[tan(./number) > 1]/number',          assertNumberValue, 4 ],
      [ 1, '/data/item[tan(./number) <= 1]/number',         assertNumberValue, 6 ],
      [ 1, '/data/item[(./number div pi()) >  1.9]/number', assertNumberValue, 6 ],
      [ 1, '/data/item[(./number div pi()) <= 1.9]/number', assertNumberValue, 4 ],
    ].forEach(([ runThis, expr, assertion, ...extraArgs ]) => {
      runThis && it(`should evaluate ${expr} as expected`, () => {
        initDoc(`
          <data>
            <item>
              <number>4</number>
            </item>
            <item>
              <number>6</number>
            </item>
          </data>
        `);

        assertion(expr, ...extraArgs);
      });
    });
  });

  // I put this one separate as it has a different 'too many args' error, and there may be multiple causes for failure
  it('with the #selected function', () => {
    initDoc(`
      <data>
        <a>a</a>
        <a>b</a>
        <a>c</a>
      </data>
    `);

    // assertTrue('selected("a b", "a")');
    assertNumberValue('count(/data/a[selected("a b", "a")])', 3);
  });

  it('should deal with a fiendishly complicated example', () => {
      initDoc(`
        <data>
          <item>
              <number>2</number>
              <name>
                  <first>1</first>
                  <last>bb</last>
              </name>
              <result>incorrect</result>
          </item>
          <item>
              <number>3</number>
              <name>
                  <first>1</first>
                  <last>b</last>
              </name>
              <result>correct</result>
          </item>
      </data>`);

      assertStringValue('/data/item/number[../name/first = string-length(../name/last)]/../result', 'correct');
  });
});
