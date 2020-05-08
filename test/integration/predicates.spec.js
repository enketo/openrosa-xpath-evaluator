const { assertNumberValue, assertStringValue, assertTrue, initDoc } = require('../helpers');

describe('predicates with function calls', ()=> {

    it('with native functions', () => {
        initDoc(`
        <data>
          <item>
            <number>4</number>
          </item>
          <b/>
          <b/>
        </data>`);

        assertTrue('count(/data/item[true()]) = 1');
        assertNumberValue('count(/data/b[round(2.44) = 2])', 2);
        assertNumberValue('/data/item[true()]/number', 4);
        assertNumberValue('/data/item[true()]/number + 1', 5); // returns undefined, but probably not related to predicate
        assertStringValue('/data/item[true()]/number + 1', '5'); // returns '41', but probably not related to predicate
        assertNumberValue('/data/item[string-length("a") = 1]/number + 2', 6); // returns undefined, but probably not related to predicate
        assertNumberValue('/data/item[string-length(./number)=1]/number + 3', 7); // returns undefined, but probably not related to predicate
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
    
    // I put this one separate as it has a different 'too many args' error, and there may be multiple causes for failure
    it('with the #selected function', () => {
        const doc = initDoc(`
          <data>
            <a>a</a>
            <a>b</a>
            <a>c</a>
          </data>`);
    
        // assertTrue('selected("a b", "a")');
        assertNumberValue('count(/data/a[selected("a b", "a")])', 3);
      });
});
