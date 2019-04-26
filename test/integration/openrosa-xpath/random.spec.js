describe('#random()', () => {
  it('should return a number', () => {
    var vals = [];
    _.times(10, () => {
      // when
      var val = xEval('random()').numberValue;

      // then
      assert.typeOf(val, 'number');

      vals.push(val);
    });

    // check the numbers are a bit random
    assert.equal(_.uniq(vals).length, vals.length);
  });

  it('random()', () => {
    TODO();
  //     const result = g.doc.evaluate( 'random()', g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
  //     expect( result.numberValue ).to.match( /0\.[0-9]{15}/ );
  } );

});
