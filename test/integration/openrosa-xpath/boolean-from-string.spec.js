  describe('#boolean-from-string()', () => {
    _.forEach({
      '1': true,
      'true':true,
      'True':false,
      '0':false,
      '':false,
      'false':false,
      'nonsense':false
    }, function(expectedBoolean, nodeValue) {
      it('should evaluate `' + nodeValue +
          '` as ' + expectedBoolean.toString().toUpperCase(), () => {
        assertString(nodeValue, 'boolean-from-string(/simple/xpath/to/node)',
            expectedBoolean.toString());
      });
    });
  });
