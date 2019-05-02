describe('Union operator', () => {

  xit('combines elements', () => {
    helpers.checkNodeResult("id('eee40') | id('eee20') | id('eee25') | id('eee10') | id('eee30') | id('eee50')", doc, [
      doc.getElementById('eee10'),
      doc.getElementById('eee20'),
      doc.getElementById('eee25'),
      doc.getElementById('eee30'),
      doc.getElementById('eee40'),
      doc.getElementById('eee50')
    ]);
  });

  xit('combines elements and attributes', () => {
    helpers.checkNodeResult("id('eee40')/attribute::*[1] | id('eee30')", doc, [
      doc.getElementById('eee30'),
      helpers.filterAttributes( doc.getElementById( 'eee40' ).attributes )[ 0 ]
    ]);
  });

  xit( 'combines elements and attributes if they refer to the same element', () => {
    helpers.checkNodeResult( "id('eee40')/attribute::*[1] | id('eee40')", doc, [
        doc.getElementById( 'eee40' ),
        helpers.filterAttributes( doc.getElementById( 'eee40' ).attributes )[ 0 ]
    ]);
  });

  it( 'combines elements and attributs if they refer to different trees', () => {
    helpers.checkNodeResult( "id('eee40')/attribute::*[1] | id('eee20')", doc, [
        doc.getElementById( 'eee20' ),
        helpers.filterAttributes( doc.getElementById( 'eee40' ).attributes )[ 0 ]
    ]);
  });

  it( 'combines elements and attributes if the attribute is on a parent element in the same tree', () => {
    helpers.checkNodeResult( "id('eee40') | id('eee30')/attribute::*[1]", doc, [
        helpers.filterAttributes( doc.getElementById( 'eee30' ).attributes )[ 0 ],
        doc.getElementById( 'eee40' )
    ]);
  });

  xit( 'combines elements and attributes if both are (on) elements under the same parent', () => {
    helpers.checkNodeResult( "id('eee40') | id('eee35')/attribute::*[1]", doc, [
        helpers.filterAttributes( doc.getElementById( 'eee35' ).attributes )[ 0 ],
        doc.getElementById( 'eee40' )
    ]);
  });

  xit( 'combines attributes that live on different elements', () => {
    helpers.checkNodeResult( "id('eee35')/attribute::*[1] | id('eee40')/attribute::*[1]", doc, [
      helpers.filterAttributes( doc.getElementById( 'eee35' ).attributes )[ 0 ],
      helpers.filterAttributes( doc.getElementById( 'eee40' ).attributes )[ 0 ]
    ]);
  });

  xit( 'combines attributes that live on descendent elements', () => {
    helpers.checkNodeResult( "id('eee30')/attribute::*[1] | id('eee40')/attribute::*[1]", doc, [
      helpers.filterAttributes( doc.getElementById( 'eee30' ).attributes )[ 0 ],
      helpers.filterAttributes( doc.getElementById( 'eee40' ).attributes )[ 0 ]
    ]);
  });

  xit( 'combines attributes that live on descendent element (reversed)', () => {
    helpers.checkNodeResult( "id('eee40')/attribute::*[1] | id('eee30')/attribute::*[1]", doc, [
      helpers.filterAttributes( doc.getElementById( 'eee30' ).attributes )[ 0 ],
      helpers.filterAttributes( doc.getElementById( 'eee40' ).attributes )[ 0 ]
    ]);
  });

  xit( 'combines different attributes on the same element', () => {
    helpers.checkNodeResult( "id('eee40')/attribute::*[2] | id('eee40')/attribute::*[1]", doc, [
      helpers.filterAttributes( doc.getElementById( 'eee40' ).attributes )[ 0 ],
      helpers.filterAttributes( doc.getElementById( 'eee40' ).attributes )[ 1 ]
    ]);
  });

  xit( 'combines a namespace and attribute on the same element', () => {
    const result = doc.evaluate( "id('nss25')/namespace::*", doc, null, win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

    helpers.checkNodeResult( "id('nss25')/namespace::* | id('nss25')/attribute::*", doc,
      helpers.snapshotToArray( result ).concat(
        helpers.filterAttributes( doc.getElementById( 'nss25' ).attributes )
      )
    );
  });

  xit( 'combines two namespaces on the same element', () => {
    const result = doc.evaluate( "id('nss40')/namespace::*", doc, null, win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); //

    helpers.checkNodeResult( "id('nss40')/namespace::* | id('nss40')/namespace::*", doc,
        helpers.snapshotToArray( result )
    );
  });

  xit( 'combines a namespace and attribute', () => {
    const result = doc.evaluate( "id('nss40')/namespace::*", doc, null, win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); //

    helpers.checkNodeResult("id('nss40')/namespace::* | id('nss25')/attribute::* | id('nss25')", doc, [
      doc.getElementById( 'nss25' )
    ].concat(
      helpers.filterAttributes( doc.getElementById( 'nss25' ).attributes )
    ).concat(
      helpers.snapshotToArray( result )
    ));
  });

});
