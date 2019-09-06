// import { g } from '../docwin';
// import helpers from '../helpers';
//
// describe('Custom "OpenRosa" functions', () => {
//
//
//
//
//
//
//
//
//
//     // THIS IS NOT A CUSTOM FUNCTION
//     it('contextual and absolute', () => {
//         [
//             [ "(. >= 122)", g.doc.getElementById('FunctionNumberCaseNumber' ), true ],
//             [ "(. < //xhtml:div[@id='FunctionNumberCaseNumber'])", g.doc.getElementById('FunctionChecklistCase0' ), true ],
//             [ "(. > /xhtml:html/xhtml:body/xhtml:div[@id='FunctionNumberCase']/xhtml:div[@id='FunctionNumberCaseNumber'])", g.doc.getElementById('FunctionChecklistCase0' ), false ],
//             [ "(//xhtml:div[@id='FunctionNumberCaseNumber'] >= 122)", g.doc.getElementById('XPathExpressionEvaluateCase' ), true ]
//         ].forEach(t => {
//             const result = g.doc.evaluate(t[ 0 ], t[ 1 ], helpers.getXhtmlResolver(g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
//             expect(t[ 2 ] ).to.equal(result.booleanValue );
//         } );
//     } );
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//     describe('custom XPath functions', () => {
//
//         afterEach(() => {
//             g.win.XPathJS.customXPathFunction.remove('comment-status' );
//         } );
//
//         it('can be added', () => {
//             const obj = {
//                 status: 'good'
//             };
//             const node = g.doc.getElementById('FunctionCustom' );
//             node.textContent = JSON.stringify(obj );
//
//             const test1 = () => g.doc.evaluate('comment-status(.)', node, helpers.getXhtmlResolver(g.doc ), g.win.XPathResult.STRING_TYPE, null );
//
//             // Check the function doesn't exist before.
//             expect(test1 ).to.throw(/does not exist/ );
//
//             // Add custom function
//             g.win.XPathJS.customXPathFunction.add('comment-status', {
//                 fn(a ) {
//                     const curValue = a.toString();
//                     let status = '';
//
//                     try {
//                         status = JSON.parse(curValue ).status;
//                     } catch (e ) {
//                         console.error('Could not parse JSON from', curValue );
//                     }
//
//                     return new g.win.XPathJS.customXPathFunction.type.StringType(status );
//                 },
//                 args: [ {
//                     t: 'string'
//                 } ],
//                 ret: 'string'
//             } );
//
//             // Check functioning:
//             const result = test1();
//             expect(result.stringValue ).to.equal(obj.status );
//
//             // Check parameter errors:
//             const test2 = () => {
//                 g.doc.evaluate('comment-status(., 2)', node, helpers.getXhtmlResolver(g.doc ), g.win.XPathResult.STRING_TYPE, null );
//             };
//             expect(test2 ).to.throw(g.win.Error );
//
//         } );
//
//     } );
//
// } );
