import { g } from '../docwin';
import helpers from '../helpers';

describe( 'node name for', () => {
    let h;

    before( () => {


        h = {
            filterElementNodes( nodes ) {
                const elementNodes = [];
                let i;

                for ( i = 0; i < nodes.length; i++ ) {
                    if ( nodes[ i ].nodeType == 1 ) {
                        elementNodes.push( nodes[ i ] );
                    }
                }

                return elementNodes;
            }
        };
    } );

    it( 'any attribute', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestAttribute' );
        helpers.checkNodeResult( "attribute::*", node, helpers.filterAttributes( node.attributes ) );
    } );

    it( 'any namespace', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestNamespace' ),
            namespaces = [];

        namespaces.push( [ '', 'http://www.w3.org/1999/xhtml' ] );
        helpers.parseNamespacesFromAttributes( node.attributes, namespaces );
        namespaces.push( [ 'ev', 'http://some-namespace.com/nss' ] );
        namespaces.push( [ 'xml', 'http://www.w3.org/XML/1998/namespace' ] );

        helpers.checkNodeResultNamespace( "namespace::*", node, namespaces );
    } );

    it( 'any child', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestChild' );
        helpers.checkNodeResult( "child::*", node, h.filterElementNodes( node.childNodes ) );
    } );

    it( 'any ancestor-or-self', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestAttribute' ),
            attributes = helpers.filterAttributes( node.attributes );

        helpers.checkNodeResult( "ancestor-or-self::*", attributes[ 0 ], [
            g.doc.documentElement,
            g.doc.querySelector( 'body' ),
            g.doc.getElementById( 'StepNodeTestCaseNameTest' ),
            g.doc.getElementById( 'StepNodeTestCaseNameTestAttribute' )
        ] );
    } );

    it( 'any attribute with specific namespace', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestAttribute' );
        const attributes = helpers.filterAttributes( node.attributes );
        let i;
        let name;

        for ( i = attributes.length - 1; i >= 0; i-- ) {
            name = attributes[ i ].nodeName.split( ':' );

            if ( name[ 0 ] != 'ev' ) {
                attributes.splice( i, 1 );
            }
        }

        expect( attributes ).to.have.length( 2 );

        helpers.checkNodeResult( "attribute::ev:*", node, attributes, helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'any namespace with a specific namespace (?)', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestNamespace' );
        helpers.checkNodeResultNamespace( "namespace::ns2:*", node, [], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'any child with specific namespace', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestChild' );
        let nodesFinal = [];

        nodesFinal = [
            node.childNodes[ 0 ],
            node.childNodes[ 1 ],
            node.childNodes[ 2 ]
        ];

        helpers.checkNodeResult( "child::ns2:*", node, nodesFinal, helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'attribute with a specific name and namespace', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestAttribute' );
        const attributes = helpers.filterAttributes( node.attributes );
        let i;
        let name;

        for ( i = attributes.length - 1; i >= 0; i-- ) {
            name = attributes[ i ].nodeName.split( ':' );
            if ( name[ 0 ] != 'ev' || name[ 1 ] != 'attrib2' ) {
                attributes.splice( i, 1 );
            }
        }

        expect( attributes ).to.have.length( 1 );

        helpers.checkNodeResult( "attribute::ev:attrib2", node, attributes, helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'specific namespace with a specific namespace', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestNamespace' );
        helpers.checkNodeResultNamespace( "namespace::ns2:ns2", node, [], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'specific child name with a specific namespace', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestChild' );
        let nodesFinal = [];

        nodesFinal = [
            node.childNodes[ 0 ],
            node.childNodes[ 1 ]
        ];

        helpers.checkNodeResult( "child::ns2:div", node, nodesFinal, helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'attribute with a specific name', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestAttribute' );
        const attributes = helpers.filterAttributes( node.attributes );
        let i;
        let name;

        for ( i = attributes.length - 1; i >= 0; i-- ) {
            name = attributes[ i ].nodeName.split( ':' );

            if ( name[ 0 ] != 'attrib3' ) {
                attributes.splice( i, 1 );
            }
        }

        expect( attributes ).to.have.length( 1 );

        helpers.checkNodeResult( "attribute::attrib3", node, attributes, helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'namespace with specific name', () => {
        const node = g.doc.getElementById( 'StepNodeTestCaseNameTestNamespace' );

        helpers.checkNodeResultNamespace( "namespace::ns2", node, [
            [
                'ns2',
                'http://asdf/'
            ]
        ], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'child with specific (namespaced) name', () => {
        helpers.checkNodeResult( "child::html", g.doc, [], helpers.getXhtmlResolver( g.doc ) );
        helpers.checkNodeResult( "child::xhtml:html", g.doc, [ g.doc.documentElement ], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'ancestor with specific name and namespace', () => {
        helpers.checkNodeResult( "ancestor::xhtml:div", g.doc.getElementById( 'StepNodeTestCaseNameTest3' ), [
            g.doc.getElementById( 'StepNodeTestCaseNameTest' ),
            g.doc.getElementById( 'StepNodeTestCaseNameTest1' ),
            g.doc.getElementById( 'StepNodeTestCaseNameTest2' )
        ], helpers.getXhtmlResolver( g.doc ) );
    } );

    it( 'ancestor with specific name without a default namespace', () => {
        helpers.checkNodeResult( "ancestor::div", g.doc.getElementById( 'StepNodeTestCaseNameTestNoNamespace' ).firstChild.firstChild.firstChild, [
            g.doc.getElementById( 'StepNodeTestCaseNameTestNoNamespace' ).firstChild,
            g.doc.getElementById( 'StepNodeTestCaseNameTestNoNamespace' ).firstChild.firstChild
        ], helpers.getXhtmlResolver( g.doc ) );
    } );

} );
