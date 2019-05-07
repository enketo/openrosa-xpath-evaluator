describe('namespace resolver', () => {

  beforeEach(() => {
    initDoc(`
      <div id="testXPathNSResolver">
  			<div id="testXPathNSResolverNode" xmlns:xforms="http://www.w3.org/2002/xforms">
  				<div xmlns="http://www.w3.org/TR/REC-html40">
  					<div></div>
  				</div>
  				<xforms:model>
  				  <xforms:instance>
  				    <ecommerce xmlns="">
  				      <method></method>
  				      <number></number>
  				      <expiry></expiry>
  				    </ecommerce>
  				  </xforms:instance>
  				  <xforms:submission action="http://example.com/submit" method="post" id="submit" includenamespaceprefixes=""/>
  				</xforms:model>
  			</div>
  		</div>`);
  });

  xit('looks up the namespaceURIElement', () => {
    const node = doc.getElementById("testXPathNSResolverNode");
    let resolver = doc.createNSResolver(node);

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
    resolver = doc.createNSResolver( getNextChildElementNode( node ) );
    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/TR/REC-html40' );
    //Y.Assert.areSame('http://www.w3.org/TR/REC-html40', resolver.lookupNamespaceURI(''));
  });

  xit('looks up the namespaceURIDocument', () => {
    const resolver = doc.createNSResolver( doc );
    expect( resolver ).to.be.an.instanceof( g.win.XPathNSResolver );
    expect( resolver.lookupNamespaceURI ).to.be.a( 'function' );
    expect( resolver.lookupNamespaceURI( 'ev' ) ).to.equal( 'http://some-namespace.com/nss' );
  });

  xit('looks up the namespaceURIDocumentElement', () => {
    const node = doc.documentElement;
    const resolver = doc.createNSResolver( node );

    expect( resolver ).to.be.an.instanceOf( g.win.XPathNSResolver );
    expect( resolver.lookupNamespaceURI ).to.be.a( 'function' );

    assert.equal(resolver.lookupNamespaceURI('ev'), 'http://some-namespace.com/nss');
    assert.equal(resolver.lookupNamespaceURI(''), 'http://www.w3.org/1999/xhtml');

    // Make sure default xhtml namespace is correct
    node.removeAttribute( 'xmlns' );
    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( null );

    // Change default root namespace
    setAttribute(node, 'http://www.w3.org/2000/xmlns/', 'xmlns', 'some-namespace' );
    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'some-namespace' );

    // Revert back to default xhtml namespace
    setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/1999/xhtml' );
    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/1999/xhtml' );
  });

  xit('looks up the namespaceURIAttribute', () => {
    let attribute, i, resolver, node = doc.documentElement;

    // Check parent nodes for namespace prefix declarations
    for (i = 0; i < node.attributes.length; i++ ) {
      if ( node.attributes[ i ].specified ) {
        attribute = node.attributes[ i ];
        break;
      }
    }

    assert.equal(typeof attribute, 'object');

    resolver = doc.createNSResolver( attribute );
    assert.equal(resolver.lookupNamespaceURI('ev'), 'http://some-namespace.com/nss');

    // Check parent nodes for default namespace declaration
    attribute = null;
    node = doc.getElementById( "testXPathNSResolverNode" );

    for(i = 0; i < node.attributes.length; i++) {
      if(node.attributes[ i ].specified) {
        attribute = node.attributes[i];
        break;
      }
    }

    expect( typeof attribute ).to.equal( 'object' );

    resolver = doc.createNSResolver( attribute );
    expect( resolver.lookupNamespaceURI( 'xforms' ) ).to.equal( 'http://www.w3.org/2002/xforms' );
  });

  xit('looks up namespaceURIs that have changed', () => {
    const node = getNextChildElementNode( doc.getElementById( "testXPathNSResolverNode" ) );
    const resolver = doc.createNSResolver( node );

    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/TR/REC-html40' );

    // Remove default namespace
    node.removeAttribute( 'xmlns' );
    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/1999/xhtml' );

    // Change default namespace to some other namespace
    setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', 'some-namespace' );
    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'some-namespace' );

    // No default namespace
    setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', '' );
    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( '' );

    // Back to original
    setAttribute( node, 'http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/TR/REC-html40' );
    expect( resolver.lookupNamespaceURI( '' ) ).to.equal( 'http://www.w3.org/TR/REC-html40' );
  });

  xit('looks up a hierarchical namespaceURI', () => {
    const node = doc.getElementById( "testXPathNSResolverNode" );
    let resolver = doc.createNSResolver( node );

    // check prefix in parents
    assert.equal(resolver.lookupNamespaceURI('ev'), 'http://some-namespace.com/nss');

    // check default prefix in parents
    assert.equal(resolver.lookupNamespaceURI(''), 'http://www.w3.org/1999/xhtml');

    resolver = doc.createNSResolver(
      getNextChildElementNode(getNextChildElementNode(node))
    );
    assert.equal(resolver.lookupNamespaceURI(''), 'http://www.w3.org/TR/REC-html40');
  });
});
