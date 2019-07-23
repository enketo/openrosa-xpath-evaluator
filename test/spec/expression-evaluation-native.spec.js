import { g } from '../docwin';
import helpers from '../helpers';

describe( 'XPath expression evaluation', () => {

    it( 'works with different types of context parameters', () => {
        let result;

        [
            [ ".", g.doc, 9 ], // Document
            [ ".", g.doc.documentElement, 1 ], // Element
            [ ".", g.doc.getElementById( 'testContextNodeParameter' ), 1 ], // Element
            [ ".", helpers.filterAttributes( g.doc.getElementById( 'testContextNodeParameter' ).attributes )[ 0 ], 2 ], // Attribute
            [ ".", g.doc.getElementById( 'testContextNodeParameterText' ).firstChild, 3 ], // Text

            // TODO: See for more details http://reference.sitepoint.com/javascript/CDATASection
            // [".", g.doc.getElementById('testContextNodeParameterCData').firstChild, 4] // CDATASection

            // TODO: See for more details http://reference.sitepoint.com/javascript/ProcessingInstruction
            //[".", g.doc.getElementById('testContextNodeParameterProcessingInstruction').firstChild, 7], // ProcessingInstruction

            [ ".", g.doc.getElementById( 'testContextNodeParameterComment' ).firstChild, 8 ] // Comment
        ].forEach( t => {
            expect( t[ 1 ].nodeType ).to.equal( t[ 2 ] );
            result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.ANY_UNORDERED_NODE_TYPE, null );
            expect( result.singleNodeValue ).to.equal( t[ 1 ] );
        } );
    } );

    it( 'works with different context parameter namespaces', () => {
        let result, item;

        // get a namespace node
        result = g.doc.evaluate( "namespace::node()", g.doc.getElementById( 'testContextNodeParameterNamespace' ), null, g.win.XPathResult.ANY_UNORDERED_NODE_TYPE, null );
        item = result.singleNodeValue;
        expect( item ).to.not.equal( null );
        // Browsers do not support namespace::node or this node type
        // expect( item.nodeType ).to.equal( 13 );

        // use namespacenode as a context node
        result = g.doc.evaluate( ".", item, null, g.win.XPathResult.ANY_UNORDERED_NODE_TYPE, null );
        expect( result.singleNodeValue ).to.equal( item );
    } );


    it( 'fails if the context is document fragment', () => {
        const test = () => {
            g.doc.evaluate( ".", g.doc.createDocumentFragment(), null, g.win.XPathResult.ANY_UNORDERED_NODE_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

} );
