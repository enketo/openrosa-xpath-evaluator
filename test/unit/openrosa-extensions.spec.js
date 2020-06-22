const { assert } = require('chai');
const { assertVal, registerDomGlobals, teardownDomGlobals, wrapOp, wrapVal } = require('./utils');

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
        [ [ 1, 2, 3 ], 1 ],
        [ [ 1, 2, NaN ], NaN ],
        [ [], NaN ],
      ].forEach(([ arg, expected ]) => {
        it(`should convert ${JSON.stringify(arg)} to ${expected}`, () => {
          // when
          const actual = min(wrapVal(arg));

          // then
          assertVal(actual, expected);
        });
      });
    });

    describe('max()', () => {
      [
        [ [ 1, 2, 3 ], 3 ],
        [ [ 1, 2, 3, NaN ], NaN ],
        [ [], NaN ],
      ].forEach(([ arg, expected ]) => {
        it(`should convert ${JSON.stringify(arg)} to ${expected}`, () => {
          // when
          const actual = max(wrapVal(arg));

          // then
          assertVal(actual, expected);
        });
      });
    });
  });
});
