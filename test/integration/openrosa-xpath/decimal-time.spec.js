describe( 'decimal-time()', () => {
  TODO()
//   [
//     [ '"06:00:00.000-07:00"', 0.250 ],
//     [ '"06:00:00.000-01:00"', 0.000 ],
//     [ '"06:30:00.000-07:00"', 0.271 ],
//     [ '"06:00:59.000-07:00"', 0.251 ],
//     [ '"23:59:00.000-07:00"', 0.999 ],
//     [ '"23:59:00.000-13:00"', 0.249 ],
//     [ '"a"', NaN ],
//     [ '2', NaN ],
//     [ '"24:00:00.000-07:00"', NaN ],
//     [ '"06:00:00.000-24:00"', NaN ],
//     [ '"06:60:00.000-07:00"', NaN ],
//     [ '"06:00:60.000-07:00"', NaN ],
//     [ '"23:59:00.000-07:60"', NaN ],
//     [ 'now()', NaN ],
//   ].forEach( t => {
//     it( `decimates time ${t[0]} to ${t[1]}`, () => {
//         const result = g.doc.evaluate( `decimal-time(${t[0]})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 1 ] );
//     });
//   });
//
//   [
//     [ 'decimal-time("12:00:00.000-07:00") - decimal-time("06:00:00.000-07:00")', 0.250 ],
//   ].forEach( t => {
//     it( `facilitates time calculations and evaluates ${t[0]} to ${t[1]}`, () => {
//       assertNumber(t[0], t[1]);
//     });
//   });
//
//   it('with invalid args throws an error', () => {
//     assert.throw(() => xEval('decimal-time("06:00:00.000-07:00", 2)'), Error);
//   });
});
