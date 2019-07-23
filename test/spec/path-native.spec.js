import { g } from '../docwin';
import helpers from '../helpers';

describe( 'location path', () => {
    let h;

    before( () => {

        h = {
            oneNamespaceNode( node ) {
                let result, item;

                result = g.doc.evaluate( "namespace::node()", node, null, g.win.XPathResult.ANY_UNORDERED_NODE_TYPE, null );
                item = result.singleNodeValue;
                expect( item ).to.not.equal( null );
                expect( item.nodeType ).to.equal( 13 );

                return item;
            }
        };
    } );

    it( 'root', () => {
        let i;
        let node;

        const input = [
            [ g.doc, [ g.doc ] ], // Document
            [ g.doc.documentElement, [ g.doc ] ], // Element
            [ g.doc.getElementById( 'LocationPathCase' ), [ g.doc ] ], // Element
            [ g.doc.getElementById( 'LocationPathCaseText' ).firstChild, [ g.doc ] ], // Text
            [ g.doc.getElementById( 'LocationPathCaseComment' ).firstChild, [ g.doc ] ], // Comment
            // TODO vimago
            // [ helpers.filterAttributes( g.doc.getElementById( 'LocationPathCaseAttribute' ).attributes )[ 0 ],
            //     [ g.doc ]
            // ] // Attribute
        ];

        // ProcessingInstruction
        node = g.doc.getElementById( 'LocationPathCaseProcessingInstruction' ).firstChild;
        if ( node && node.nodeType == 7 ) {
            input.push( [ node, [ g.doc ] ] );
        }

        // CDATASection
        node = g.doc.getElementById( 'LocationPathCaseCData' ).firstChild;
        if ( node && node.nodeType == 4 ) {
            input.push( [ node, [ g.doc ] ] );
        }

        for ( i = 0; i < input.length; i++ ) {
            helpers.checkNodeResult( "/", input[ i ][ 0 ], input[ i ][ 1 ] );
        }
    } );

    xit( 'root namespace', () => {
        const input = [ h.oneNamespaceNode( g.doc.getElementById( 'LocationPathCaseNamespace' ) ), [ g.doc ] ]; // XPathNamespace
        helpers.checkNodeResult( "/", input[ 0 ], input[ 1 ] );
    } );

    it( 'root node', () => {
        helpers.checkNodeResult( "/html", g.doc, [], helpers.getXhtmlResolver( g.doc ) );
        helpers.checkNodeResult( "/xhtml:html", g.doc, [ g.doc.documentElement ], helpers.getXhtmlResolver( g.doc ) );
        helpers.checkNodeResult( "/xhtml:html", g.doc.getElementById( 'LocationPathCase' ), [ g.doc.documentElement ], helpers.getXhtmlResolver( g.doc ) );
        helpers.checkNodeResult( "/htmlnot", g.doc.getElementById( 'LocationPathCase' ), [], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'root node node', () => {
        helpers.checkNodeResult( "/xhtml:html/xhtml:body", g.doc.getElementById( 'LocationPathCase' ), [ g.doc.querySelector( 'body' ) ], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'node (node)', () => {
        helpers.checkNodeResult( "html", g.doc, [], helpers.getXhtmlResolver( g.doc ) );
        helpers.checkNodeResult( "xhtml:html", g.doc, [ g.doc.documentElement ], helpers.getXhtmlResolver( g.doc ) );
        helpers.checkNodeResult( "xhtml:html/xhtml:body", g.doc, [ g.doc.querySelector( 'body' ) ], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'node attribute', () => {
        const node = g.doc.getElementById( 'LocationPathCaseAttributeParent' );

        helpers.checkNodeResult( "child::*/attribute::*", node, [
            helpers.filterAttributes( node.childNodes[ 0 ].attributes )[ 0 ],
            helpers.filterAttributes( node.childNodes[ 1 ].attributes )[ 0 ],
            helpers.filterAttributes( node.childNodes[ 1 ].attributes )[ 1 ],
            helpers.filterAttributes( node.childNodes[ 2 ].attributes )[ 0 ],
            helpers.filterAttributes( node.childNodes[ 3 ].attributes )[ 0 ]
        ], helpers.getXhtmlResolver( g.doc ) );
    } );

    xit( 'node namespace', () => {
        const node = g.doc.getElementById( 'LocationPathCaseNamespaceParent' ); //

        helpers.checkNodeResultNamespace( "child::* /namespace::*", node, [
            [ '', 'http://asdss/' ],
            [ 'ev', 'http://some-namespace.com/nss' ],
            [ 'xml', 'http://www.w3.org/XML/1998/namespace' ],
            [ '', 'http://www.w3.org/1999/xhtml' ],
            [ 'ab', 'hello/world2' ],
            [ 'a2', 'hello/world' ],
            [ 'aa', 'http://saa/' ],
            [ 'ev', 'http://some-namespace.com/nss' ],
            [ 'xml', 'http://www.w3.org/XML/1998/namespace' ],
            [ '', 'http://www.w3.org/1999/xhtml' ],
            [ 'ev', 'http://some-namespace.com/nss' ],
            [ 'xml', 'http://www.w3.org/XML/1998/namespace' ],
            [ '', 'http://www.w3.org/1999/xhtml' ],
            [ 'aa', 'http://saa/' ],
            [ 'ev', 'http://some-namespace.com/nss' ],
            [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
        ], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'duplicates handled correctly', () => {
        helpers.checkNodeResult( "ancestor-or-self::* /ancestor-or-self::*", g.doc.getElementById( 'LocationPathCaseDuplicates' ), [
            g.doc.documentElement,
            g.doc.querySelector( 'body' ),
            g.doc.getElementById( 'LocationPathCase' ),
            g.doc.getElementById( 'LocationPathCaseDuplicates' )
        ], helpers.getXhtmlResolver( g.doc ) );
    } );
} );
