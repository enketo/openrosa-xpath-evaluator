// it( 'sin()', () => {
//     [
//         [ 'sin(2)', g.doc, 0.9092974268256817 ],
//         [ 'sin(//xhtml:div[@id="testFunctionNodeset2"]/xhtml:p[2])', g.doc, 0.9092974268256817 ],
//         [ 'sin("a")', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'cos()', () => {
//     [
//         [ 'cos(2)', g.doc, -0.4161468365471424 ],
//         //['cos("a")', g.doc, NaN],
//         [ 'cos("NaN")', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'tan()', () => {
//     [
//         [ 'tan(2)', g.doc, -2.185039863261519 ],
//         [ 'tan("a")', g.doc, NaN ],
//         [ 'tan("NaN")', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'acos()', () => {
//     [
//         [ 'acos(0.5)', g.doc, 1.047197551196598 ],
//         [ 'acos(-1)', g.doc, 3.141592653589793 ],
//         [ 'acos(2)', g.doc, NaN ],
//         [ 'acos("a")', g.doc, NaN ],
//         [ 'acos("NaN")', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         // rounding error on Travis
//         expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'asin()', () => {
//     [
//         [ 'asin(0.5)', g.doc, 0.523598775598299 ],
//         [ 'asin(-1)', g.doc, -1.570796326794896 ],
//         [ 'asin(2)', g.doc, NaN ],
//         [ 'asin("a")', g.doc, NaN ],
//         [ 'asin("NaN")', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         // rounding error on Travis
//         expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'atan()', () => {
//     [
//         [ 'atan(0.5)', g.doc, 0.463647609000806 ],
//         [ 'atan(-1)', g.doc, -0.785398163397448 ],
//         [ 'atan("a")', g.doc, NaN ],
//         [ 'atan("NaN")', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         // rounding error on Travis
//         expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'atan2()', () => {
//     [
//         [ 'atan2(2,3)', g.doc, 0.5880026035475675 ],
//         [ 'atan2(2, "NaN")', g.doc, NaN ],
//         [ 'atan2(2, "a")', g.doc, NaN ],
//         [ 'atan2("NaN", 2)', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'log()', () => {
//     [
//         [ 'log(2)', g.doc, 0.6931471805599453 ],
//         [ 'log("NaN")', g.doc, NaN ],
//         [ 'log("a")', g.doc, NaN ],
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'log10()', () => {
//     [
//         [ 'log10(2)', g.doc, 0.3010299956639812 ],
//         [ 'log10("NaN")', g.doc, NaN ],
//         [ 'log10("a")', g.doc, NaN ],
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'pi()', () => {
//     [
//         [ 'pi()', g.doc, 3.141592653589793 ],
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'exp()', () => {
//     [
//         [ 'exp(2)', g.doc, 7.38905609893065 ],
//         [ 'exp("NaN")', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'exp10()', () => {
//     [
//         [ 'exp10(2)', g.doc, 100 ],
//         [ 'exp10(-2)', g.doc, 0.01 ],
//         [ 'exp10("NaN")', g.doc, NaN ],
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
//
// it( 'sqrt()', () => {
//     [
//         [ 'sqrt(4)', g.doc, 2 ],
//         [ 'sqrt(-2)', g.doc, NaN ],
//         [ 'sqrt("NaN")', g.doc, NaN ]
//     ].forEach( t => {
//         const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
//         expect( result.numberValue ).to.deep.equal( t[ 2 ] );
//     } );
// } );
