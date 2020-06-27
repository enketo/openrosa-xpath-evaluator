const {initDoc, assert, simpleValueIs} = require('./helpers');

describe('date comparison', () => {
  const doc = initDoc('');
  function relativeDateAsString(offset, noQuotes) {
    var d = new Date(),
        ret = noQuotes ? '' : '"';
    d.setDate(d.getDate() + offset);
    ret +=
        d.getFullYear() + '-' +
        zeroPad(d.getMonth()+1, 2) + '-' +
        zeroPad(d.getDate(), 2);

    return ret + (noQuotes ? '' : '"');
  }

  var zeroPad = function(n) { return n >= 10 ? n : '0' + n; },
      yesterdayString = relativeDateAsString(-1),
      todayString = relativeDateAsString(0),
      tomorrowString = relativeDateAsString(1);

  describe('yesterday', () => {
    it('should be less than today()', () => {
      assert.ok(doc.xEval(yesterdayString + ' < today()').booleanValue);
    });

    it('should be less than or equal to today()', () => {
      assert.ok(doc.xEval(yesterdayString + ' <= today()').booleanValue);
    });

    it('should not be greater than today()', () => {
      assert.notOk(doc.xEval(yesterdayString + ' > today()').booleanValue);
    });

    it('should not be greater than or equal to today()', () => {
      assert.notOk(doc.xEval(yesterdayString + ' >= today()').booleanValue);
    });
  });

  describe('today', () => {
    // We don't include time in today strings by default (config.js).
    it('should be less than today()', () => {
      assert.notOk(doc.xEval(todayString + ' < today()').booleanValue);
    });

    it('should be less than or equal to today()', () => {
      assert.ok(doc.xEval(todayString + ' <= today()').booleanValue);
    });

    it('should not be greater than today()', () => {
      assert.notOk(doc.xEval(todayString + ' > today()').booleanValue);
    });

    // We don't include time in today strings by default (config.js).
    it('should be greater than or equal to today()', () => {
      assert.ok(doc.xEval(todayString + ' >= today()').booleanValue);
    });
  });

  describe('today()', () => {
    it('should not be less than yesterday', () => {
      assert.notOk(doc.xEval('today() < ' + yesterdayString).booleanValue);
    });

    it('should not be less than or equal to yesterday', () => {
      assert.notOk(doc.xEval('today() <= ' + yesterdayString).booleanValue);
    });

    it('should be greater than yesterday', () => {
      assert.ok(doc.xEval('today() > ' + yesterdayString).booleanValue);
    });

    it('should be greater than or equal to yesterday', () => {
      assert.ok(doc.xEval('today() >= ' + yesterdayString).booleanValue);
    });

    it('should not be less than today', () => {
      assert.notOk(doc.xEval('today() < ' + todayString).booleanValue);
    });

    // We don't include time in today strings by default (config.js).
    it('because it is a precise moment, should not be less than or equal to today', () => {
      assert.ok(doc.xEval('today() <= ' + todayString).booleanValue);
    });

    // We don't include time in today strings by default (config.js).
    it('because it is a precise moment, should be greater than today', () => {
      assert.notOk(doc.xEval('today() > ' + todayString).booleanValue);
    });

    it('because it is a precise moment, should be greater than or equal to today', () => {
      assert.ok(doc.xEval('today() >= ' + todayString).booleanValue);
    });


    it('should be less than tomorrow', () => {
      assert.ok(doc.xEval('today() < ' + tomorrowString).booleanValue);
    });

    it('should be less than or equal to tomorrow', () => {
      assert.ok(doc.xEval('today() <= ' + tomorrowString).booleanValue);
    });

    it('should not be greater than tomorrow', () => {
      assert.notOk(doc.xEval('today() > ' + tomorrowString).booleanValue);
    });

    it('should not be greater than or equal to tomorrow', () => {
      assert.notOk(doc.xEval('today() >= ' + tomorrowString).booleanValue);
    });
  });

  describe('tomorrow', () => {
    it('should not be less than today()', () => {
      assert.notOk(doc.xEval(tomorrowString + ' < today()').booleanValue);
    });

    it('should not be less than or equal to today()', () => {
      assert.notOk(doc.xEval(tomorrowString + ' <= today()').booleanValue);
    });

    it('should be greater than today()', () => {
      assert.ok(doc.xEval(tomorrowString + ' > today()').booleanValue);
    });

    it('should be greater than or equal to today()', () => {
      assert.ok(doc.xEval(tomorrowString + ' >= today()').booleanValue);
    });
  });

  describe('comparisons with a field', () => {
    describe('set to today', () => {
      beforeEach(() => {
        simpleValueIs(relativeDateAsString(0, true));
      });

      it('should be less than tomorrow', () => {
        assert.ok(doc.xEval('/simple/xpath/to/node < today() + 1').booleanValue);
      });

      it('should not be greater than tomorrow', () => {
        assert.notOk(doc.xEval('/simple/xpath/to/node > today() + 1').booleanValue);
      });

      it('should be greater than yesterday', () => {
        assert.ok(doc.xEval('/simple/xpath/to/node > today() - 1').booleanValue);
      });

      it('should not be less than yesterday', () => {
        assert.notOk(doc.xEval('/simple/xpath/to/node < today() - 1').booleanValue);
      });

      describe('with brackets', () => {
        it('should be less than tomorrow', () => {
          assert.ok(doc.xEval('/simple/xpath/to/node < (today() + 1)').booleanValue);
        });

        it('should not be greater than tomorrow', () => {
          assert.notOk(doc.xEval('/simple/xpath/to/node > (today() + 1)').booleanValue);
        });

        it('should be greater than yesterday', () => {
          assert.ok(doc.xEval('/simple/xpath/to/node > (today() - 1)').booleanValue);
        });

        it('should not be less than yesterday', () => {
          assert.notOk(doc.xEval('/simple/xpath/to/node < (today() - 1)').booleanValue);
        });
      });
    });
  });

});
