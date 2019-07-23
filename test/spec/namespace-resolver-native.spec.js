import { g } from '../docwin';
import helpers from '../helpers';

describe( 'namespace resolver', () => {

    xit( 'looks up the namespaceURIElement', () => {
        const node = g.doc.getElementById( "testXPathNSResolverNode" );
        let resolver = g.doc.createNSResolver( node );

        // check type
        expect( resolver ).to.be.an.instanceOf( g.win.XPathNSResolver );
        expect( resolver.lookupNamespaceURI ).to.be.a( 'function' );

        // check preconfigured namespaces
        expect( resolver.lookupNamespaceURI( 'xml' ) ).to.equal( 'http://www.w3.org/XML/1998/namespace' );
        expect( resolver.lookupNamespaceURI( 'xmlns' ) ).to.equal( 'http://www.w3.org/2000/xmlns/' );

        // check namespaces on current element
        expect( resolver.lookupNamespaceURI( 'xforms' ) ).to.equal( 'http://www.w3.org/2002/xforms' );
        expect( resolver.lookupNamespaceURI( 'nsnotexists' ) ).to.equal( null );

        // check default namespace
        resolver = g.doc.createNSResolver( helpers.getNextChildElementNode( node ) );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/TR/REC-html40' );
        //Y.Assert.areSame('http://www.w3.org/TR/REC-html40', resolver.lookupNamespaceURI(''));
    } );

    xit( 'looks up the namespaceURIDocument', () => {
        const resolver = g.doc.createNSResolver( g.doc );

        expect( resolver ).to.be.an.instanceof( g.win.XPathNSResolver );

        expect( resolver.lookupNamespaceURI ).to.be.a( 'function' );

        expect( resolver.lookupNamespaceURI( 'ev' ) ).to.equal( 'http://some-namespace.com/nss' );
    } );

    xit( 'looks up the namespaceURIDocumentElement', () => {
        const node = g.doc.documentElement;
        const resolver = g.doc.createNSResolver( node );

        expect( resolver ).to.be.an.instanceOf( g.win.XPathNSResolver );
        expect( resolver.lookupNamespaceURI ).to.be.a( 'function' );

        expect( resolver.lookupNamespaceURI( 'ev' ) ).to.equal( 'http://some-namespace.com/nss' );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/1999/xhtml' );

        // Make sure default xhtml namespace is correct
        node.removeAttribute( 'xmlns' );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( null );

        // Change default root namespace
        helpers.setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', 'some-namespace' );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'some-namespace' );

        // Revert back to default xhtml namespace
        helpers.setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/1999/xhtml' );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/1999/xhtml' );
    } );

    it( 'looks up the namespaceURIAttribute', () => {
        let attribute, i, resolver, node = g.doc.documentElement;

        // Check parent nodes for namespace prefix declarations
        for ( i = 0; i < node.attributes.length; i++ ) {
            if ( node.attributes[ i ].specified ) {
                attribute = node.attributes[ i ];
                break;
            }
        }

        expect( typeof attribute ).to.equal( 'object' );

        resolver = g.doc.createNSResolver( attribute );
        expect( resolver.lookupNamespaceURI( 'ev' ) ).to.equal( 'http://some-namespace.com/nss' );

        // Check parent nodes for default namespace declaration
        attribute = null;
        node = g.doc.getElementById( "testXPathNSResolverNode" );

        for ( i = 0; i < node.attributes.length; i++ ) {
            if ( node.attributes[ i ].specified ) {
                attribute = node.attributes[ i ];
                break;
            }
        }

        expect( typeof attribute ).to.equal( 'object' );

        resolver = g.doc.createNSResolver( attribute );
        expect( resolver.lookupNamespaceURI( 'xforms' ) ).to.equal( 'http://www.w3.org/2002/xforms' );
    } );

    xit( 'looks up namespaceURIs that have changed', () => {
        const node = helpers.getNextChildElementNode( g.doc.getElementById( "testXPathNSResolverNode" ) );
        const resolver = g.doc.createNSResolver( node );

        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/TR/REC-html40' );

        // Remove default namespace
        node.removeAttribute( 'xmlns' );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/1999/xhtml' );

        // Change default namespace to some other namespace
        helpers.setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', 'some-namespace' );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'some-namespace' );

        // No default namespace
        helpers.setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', '' );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( '' );

        // Back to original
        helpers.setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/TR/REC-html40' );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/TR/REC-html40' );
    } );

    it( 'looks up a hierarchical namespaceURI', () => {
        const node = g.doc.getElementById( "testXPathNSResolverNode" );
        let resolver = g.doc.createNSResolver( node );

        // check prefix in parents
        expect( resolver.lookupNamespaceURI( 'ev' ) ).to.equal( 'http://some-namespace.com/nss' );

        // check default prefix in parents
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/1999/xhtml' );

        resolver = g.doc.createNSResolver(
            helpers.getNextChildElementNode( helpers.getNextChildElementNode( node ) )
        );
        expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/TR/REC-html40' );
    } );
} );
