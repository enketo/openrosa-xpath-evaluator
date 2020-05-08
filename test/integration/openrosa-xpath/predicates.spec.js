const { assertNumberValue, assertTrue, initDoc } = require('../../helpers');

describe('predicates with function calls', ()=> {

    it('with native functions', () => {
        initDoc(`
        <data>
          <item>
            <number>4</number>
          </item>
        </data>`);

        assertTrue('count(/data/item[true()]) = 1');
        assertNumberValue('/data/item[true()]/number', 4);
        assertNumberValue('count(/data/item/number[round(2.44) = 2])', 1);
        assertNumberValue('/data/item[true()]/number + 1', 5);
        assertNumberValue('/data/item[string-length("a") = 1]/number + 2', 6);
        assertNumberValue('/data/item[string-length(./number)=1]/number + 3', 7);
    });

    it('with extended functions', () => {
        initDoc(`
        <data>
          <item>
            <number>4</number>
          </item>
        </data>`);

        assertNumberValue('/data/item[pi() > 3]/number', 4);
        assertNumberValue('/data/item[tan(./number) > 1]/number', 4);
    });
    
    // I put this one separate as it has a different 'too many args' error, and there may be have multiple causes for failure
    it('with the #selected function', () => {
        const doc = initDoc(`
          <data>
            <a>a</a>
            <a>b</a>
            <a>c</a>
          </data>`);
    
        assertNumberValue('count(/data/a[selected("a b", "a")])', 3);
      });
});
