const {
  assertBoolean,
  assertNumberValue,
  assertStringValue,
  assertTrue,
  initDoc,
} = require('./helpers');

describe('predicates with function calls', ()=> {

  describe('little predicates', () => {
    [
      [ 1, '//*[@id="3"] and /data/*[@id="1"]', false, ],
      [ 1, '/data/*[@id="3"] and /data/*[@id="1"]', false, ],
      [ 1, '/data/c[@id="3"] and /data/a[@id="1"]', false, ],
      [ 1, '/data/*[@id="1"] and //*[@id="3"]', false, ],
      [ 1, '/data/*[@id="3"] or /data/*[@id="2"]', true, ],
      [ 1, '/data/*[@id="1"] and //*[@id="2"]', true, ],
      [ 1, '/data/*[@id="3"] or /data/*[@id="4"]', false, ],
    ].forEach(([ runThis, expr, expected ]) => {
      (runThis ? it : it.skip)(`should evaluate ${expr} as ${expected}`, () => {
        initDoc(`
          <data>
            <a id="1">aa</a>
            <b id="2">bb</b>
          </data>
        `);

        assertBoolean(expr, expected);
      });
    });
  });

  describe('fiendishly complicated examples #2', () => {
    const namespaceResolver = (() => {
      const namespaces = {
        OpenClinica: 'http://openclinica.com/odm',
        enk: 'http://enketo.org/xforms',
      };
      return { lookupNamespaceURI:prefix => namespaces[prefix] || null };
    })();

    [
      [ 1, `/*[1]/item/a/number`, 'siete' ],
      [ 1, `/data/item/a/number`, 'siete' ],
      [ 1, `/data/item/a/number/@OpenClinica:this`, 'seven' ],
      [ 1, `/data/item/a/number[@OpenClinica:this="three"]`, 'tres' ],
      [ 1, `normalize-space(/data/item/a[../number[@OpenClinica:this="three"]])`, 'cc dd ee' ],
      [ 1, `/data/item/a[../number[@OpenClinica:this="three"]]/name[@enk:that='something']/last[@id='d']/@Value`, 'ddd' ],
      [ 1, `concat( selected( /data/item/a[../number[@OpenClinica:this='three']]/name[@enk:that="something"]/last/@Value, 'ccc' ), 'ing', '-', sin( pi() div 2))`, 'trueing-1' ],
    ].forEach(([ runThis, expr, expected ]) => {
      (runThis ? it : it.skip)(`should evaluate ${expr} as ${expected}`, () => {
        initDoc(`
          <data xmlns:OpenClinica="http://openclinica.com/odm" xmlns:enk="http://enketo.org/xforms">
            <item>
              <a>
                <number OpenClinica:this="seven">siete</number>
                <name>
                  <last>aa</last>
                </name>
              </a>
            </item>
            <item>
              <a>
                <number OpenClinica:this="three">tres</number>
                <number OpenClinica:this="four"/>
                <name enk:that="something else">
                  <last>bb</last>
                </name>
              </a>
            </item>
            <item>
              <number OpenClinica:this="three"/>
              <a>
                <name enk:that="something">
                  <last id="c" Value="ccc">cc</last>
                  <last id="d" Value="ddd">dd</last>
                  <last id="e" Value="eee">ee</last>
                </name>
              </a>
            </item>
            <meta>
              <instanceID>a</instanceID>
            </meta>
          </data>
        `, namespaceResolver);

        assertStringValue(expr, expected);
      });
    });
  });

  describe('nested predicates', () => {
    [
      [ 1, '/data/item/number/@this',  'seven' ],
      [ 1, '/data/item/number[@this]', 'siete' ],
      [ 1, '/data/item/number[@this="four"]', 'cuatro' ],
      [ 1, '/data/item/name[../number[@this="four"]]/last',                  'bb' ],
      [ 1, '/data/item/name[../number[./@this="four"]]/last',                'bb' ],
      [ 1, '/data/item/name[../number[string-length(./@this) = 1]]/last',    'cc' ],
      [ 1, '/data/item/name[../number[string-length(./@this) < pi()]]/last', 'cc' ],
    ].forEach(([ runThis, expr, expected ]) => {
      (runThis ? it : it.skip)(`should evaluate ${expr} as ${expected}`, () => {
        initDoc(`
          <data>
            <item>
              <number>entruchón</number>
              <name>decoy</name>
            </item>
            <item>
              <number this="seven">siete</number>
              <name>
                <last>aa</last>
              </name>
            </item>
            <item>
              <number this="three">tres</number>
              <number this="four">cuatro</number>
              <name>
                <last>bb</last>
              </name>
            </item>
            <item>
              <number this="o">la letra o</number>
              <name>
                <last>cc</last>
              </name>
            </item>
          </data>
        `);

        assertStringValue(expr, expected);
      });
    });
  });

  describe('with native functions', () => {
    [
      [ 1, 'count(/data/item[true()]) = 2',   assertTrue ],
      [ 1, 'count(/data/b[round(2.44) = 2])', assertNumberValue, 2 ],
      [ 1, '/data/item[true()]/number',       assertNumberValue, 4 ],
      [ 1, '/data/item[2]/number',            assertNumberValue, 6 ],
      [ 1, '/data/item[true()]/number + 1',   assertNumberValue, 5 ],
      [ 1, '/data/item[true()]/number + 1',   assertStringValue, '5' ],
      [ 1, '/data/item[string-length("a") = 1]/number + 2',      assertNumberValue, 6 ],
      [ 1, '/data/item[string-length("]") = 1]/number + 2',      assertNumberValue, 6 ],
      [ 1, `/data/item[string-length(']') = 1]/number + 2`,      assertNumberValue, 6 ],
      [ 1, '/data/item[2]/number + 3',                           assertNumberValue, 9 ],
      [ 1, '/data/item[string-length(./number)=1]/number + 3',   assertNumberValue, 7 ],
      [ 1, '/data/item[string-length(./number) = 1]/number + 3', assertNumberValue, 7 ],
      [ 1, '/data/item[(./number div 3.14) > 1.9]/number',       assertNumberValue, 6 ],
    ].forEach(([ runThis, expr, assertion, ...extraArgs ]) => {
      (runThis ? it : it.skip)(`should evaluate ${expr} as expected`, () => {
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
      (runThis ? it : it.skip)(`should evaluate ${expr} as expected`, () => {
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
