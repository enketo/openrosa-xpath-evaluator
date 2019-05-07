describe('Union operator', () => {

  xit('combines elements', () => {
    checkNodeResult("id('eee40') | id('eee20') | id('eee25') | id('eee10') | id('eee30') | id('eee50')", doc, [
      doc.getElementById('eee10'),
      doc.getElementById('eee20'),
      doc.getElementById('eee25'),
      doc.getElementById('eee30'),
      doc.getElementById('eee40'),
      doc.getElementById('eee50')
    ]);
  });

  xit('combines elements and attributes', () => {
    checkNodeResult("id('eee40')/attribute::*[1] | id('eee30')", doc, [
      doc.getElementById('eee30'),
      filterAttributes(doc.getElementById('eee40').attributes)[0]
    ]);
  });

  xit('combines elements and attributes if they refer to the same element', () => {
    checkNodeResult("id('eee40')/attribute::*[1] | id('eee40')", doc, [
      doc.getElementById('eee40'),
      filterAttributes(doc.getElementById('eee40').attributes)[0]
    ]);
  });

  xit('combines elements and attributs if they refer to different trees', () => {
    checkNodeResult("id('eee40')/attribute::*[1] | id('eee20')", doc, [
      doc.getElementById('eee20'),
      filterAttributes(doc.getElementById('eee40').attributes)[0]
    ]);
  });

  xit('combines elements and attributes if the attribute is on a parent element in the same tree', () => {
    checkNodeResult("id('eee40') | id('eee30')/attribute::*[1]", doc, [
      filterAttributes(doc.getElementById('eee30').attributes)[0],
      doc.getElementById('eee40')
    ]);
  });

  xit('combines elements and attributes if both are (on) elements under the same parent', () => {
    checkNodeResult( "id('eee40') | id('eee35')/attribute::*[1]", doc, [
      filterAttributes(doc.getElementById('eee35').attributes )[0],
      doc.getElementById('eee40')
    ]);
  });

  xit('combines attributes that live on different elements', () => {
    checkNodeResult("id('eee35')/attribute::*[1] | id('eee40')/attribute::*[1]", doc, [
      filterAttributes(doc.getElementById('eee35').attributes)[0],
      filterAttributes(doc.getElementById('eee40').attributes)[0]
    ]);
  });

  xit('combines attributes that live on descendent elements', () => {
    checkNodeResult( "id('eee30')/attribute::*[1] | id('eee40')/attribute::*[1]", doc, [
      filterAttributes(doc.getElementById('eee30').attributes)[0],
      filterAttributes(doc.getElementById('eee40').attributes)[0]
    ]);
  });

  xit('combines attributes that live on descendent element (reversed)', () => {
    checkNodeResult("id('eee40')/attribute::*[1] | id('eee30')/attribute::*[1]", doc, [
      filterAttributes(doc.getElementById('eee30').attributes)[0],
      filterAttributes(doc.getElementById('eee40').attributes)[0]
    ]);
  });

  xit('combines different attributes on the same element', () => {
    checkNodeResult("id('eee40')/attribute::*[2] | id('eee40')/attribute::*[1]", doc, [
      filterAttributes(doc.getElementById('eee40').attributes)[0],
      filterAttributes(doc.getElementById('eee40').attributes)[1]
    ]);
  });

  xit('combines a namespace and attribute on the same element', () => {
    const result = doc.evaluate( "id('nss25')/namespace::*", doc, null, win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

    checkNodeResult("id('nss25')/namespace::* | id('nss25')/attribute::*", doc,
      snapshotToArray(result).concat(
        filterAttributes(doc.getElementById('nss25').attributes)
      )
    );
  });

  xit('combines two namespaces on the same element', () => {
    const result = doc.evaluate("id('nss40')/namespace::*", doc, null, win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); //

    checkNodeResult("id('nss40')/namespace::* | id('nss40')/namespace::*", doc,
      snapshotToArray(result)
    );
  });

  xit('combines a namespace and attribute', () => {
    const result = doc.evaluate("id('nss40')/namespace::*", doc, null, win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); //

    checkNodeResult("id('nss40')/namespace::* | id('nss25')/attribute::* | id('nss25')", doc, [
      doc.getElementById('nss25')
    ].concat(
      filterAttributes(doc.getElementById('nss25').attributes )
    ).concat(
      snapshotToArray(result)
    ));
  });
});
