const { assert } = require('chai');
const { registerDomGlobals, teardownDomGlobals, wrapOp, wrapVal } = require('./utils');

const { asGeopoints } = require('../../src/geo');

describe('geo', () => {
  before(registerDomGlobals);
  after(teardownDomGlobals);

  describe('asGeopoints()', () => {
    [
      [ '1;2;3', [ '1', '2', '3' ] ],
      [ ['1;2;3'], [ '1', '2', '3' ] ],
      [ ['1', '2', '3'], [ '1', '2', '3' ] ],
    ].forEach(([ input, expected ]) => {
      it(`should convert ${JSON.stringify(input)} to ${JSON.stringify(expected)}`, () => {
        // given
        const r = wrapVal(input);

        // then
        assert.deepEqual(asGeopoints(r), expected);
      });
    });
  });
});
