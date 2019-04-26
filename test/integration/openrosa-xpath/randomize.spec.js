describe('randomize() shuffles nodesets', () => {
  TODO();
//     const SELECTOR = '//xhtml:div[@id="FunctionRandomize"]/xhtml:div';
//
//     it( 'without a seed', () => {
//         const result = g.doc.evaluate( `randomize(${SELECTOR})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//         const nodes = [];
//         let text = '';
//         for ( let j = 0; j < result.snapshotLength; j++ ) {
//             const node = result.snapshotItem( j );
//             nodes.push( node );
//             text += node.textContent;
//         }
//         expect( nodes.length ).to.equal( 6 );
//         expect( text.length ).to.equal( 6 );
//         expect( text ).not.to.equal( 'ABCDEF' );
//     } );
//
//     [
//         [ 42, 'AFCBDE' ],
//         [ '42', 'AFCBDE' ],
//         [ -42, 'EDAFBC' ],
//         [ 1, 'BFEACD' ],
//         [ 11111111, 'ACDBFE' ],
//         [ 'int(1)', 'BFEACD' ],
//         [ 'floor(1.1)', 'BFEACD' ],
//         [ '//xhtml:div[@id="testFunctionNodeset2"]/xhtml:p', 'BFEACD' ]
//     ].forEach( t => {
//         it( `with a seed: ${t[0]}`, () => {
//             const result = g.doc.evaluate( `randomize(${SELECTOR},${t[0]})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//             let text = '';
//             for ( let j = 0; j < result.snapshotLength; j++ ) {
//                 text += result.snapshotItem( j ).textContent;
//             }
//             expect( text ).to.equal( t[ 1 ] );
//         } );
//     } );
//
//     [
//         'randomize()',
//         `randomize(${SELECTOR}, 'a')`,
//         `randomize(${SELECTOR}, 1, 2)`,
//     ].forEach( t => {
//         it( `with invalid args (${t}), throws an error`, () => {
//             const test = () => {
//                 g.doc.evaluate( t, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//             };
//             expect( test ).to.throw( g.win.Error );
//         } );
//     } );
//
});
