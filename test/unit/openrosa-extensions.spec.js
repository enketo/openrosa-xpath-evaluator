const { assert } = require('chai');
const { assertVal, registerDomGlobals, teardownDomGlobals, wrapVal } = require('./utils');

const extensions = require('../../src/openrosa-extensions')({});

describe('openrosa-extensions', () => {
  before(registerDomGlobals);
  after(teardownDomGlobals);

  it('should have expected functions', () => {
    assert.containsAllKeys(extensions.func, [
      'max', 'randomize',
    ]);
  });

  describe('func', () => {
    const { min, max } = extensions.func;

    describe('min()', () => {
      [
        [   1, [ 1, 2, 3 ] ],
        [ NaN, [ 1, 2, NaN ] ],
        [ NaN, [] ],
        [   1, [], 1, 4 ],
        [   1, [], [ 1, 4 ] ],
      ].forEach(([ expected, ...args ]) => {
        it(`should convert ${JSON.stringify(args)} to ${expected}`, () => {
          // when
          const actual = min(...args.map(wrapVal));

          // then
          assertVal(actual, expected);
        });
      });
    });

    describe('max()', () => {
      [
        [   3, [ 1, 2, 3 ] ],
        [ NaN, [ 1, 2, 3, NaN ] ],
        [ NaN, [], NaN ],
        [   4, [], 1, 4 ],
        [   4, [], [ 1, 4 ] ],
      ].forEach(([ expected, ...args ]) => {
        it(`should convert ${JSON.stringify(args)} to ${expected}`, () => {
          // when
          const actual = max(...args.map(wrapVal));

          // then
          assertVal(actual, expected);
        });
      });
    });
  });
});
