describe('node-type', () => {
  beforeEach(() => {
    initDoc(`
      <div id="StepNodeTestNodeTypeCase">
  			some text
  			<div></div>
  			<div>
  				<div></div>
  			</div>
  			<!-- comment --><!-- comment -->
  			asdf
  			asdfsdf sdf
  			<div></div>
  			<?xml-stylesheet type="text/xml" href="test.xsl"?>
  			<div></div>
  			sdfsdf
  			<![CDATA[aa<strong>some text</strong>]]>
  			<!-- comment -->
  			<div></div>
  			<?custom-process-instruct type="text/xml" href="test.xsl"?>
  			<div></div>
  		</div>`);
  });

  it('"node" is supported', () => {
    const node = doc.getElementById( 'StepNodeTestNodeTypeCase' );
    checkNodeResult( "child::node()", node, node.childNodes );
  });

  it('"text" is supported', () => {
    const node = doc.getElementById( 'StepNodeTestNodeTypeCase' );
    const nodes = [];
    let i;

    for ( i = 0; i < node.childNodes.length; i++ ) {
      switch ( node.childNodes[ i ].nodeType ) {
        case 3: // text
        case 4: // cdata
            nodes.push( node.childNodes[ i ] );
            break;
      }
    }
    checkNodeResult( "child::text()", node, nodes );
  });

  it('"comment" is supported', () => {
    const node = doc.getElementById( 'StepNodeTestNodeTypeCase' );
    const nodes = [];
    let i;

    for(i = 0; i < node.childNodes.length; i++) {
      switch(node.childNodes[ i ].nodeType) {
        case 8: // comment
            nodes.push( node.childNodes[ i ] );
            break;
      }
    }
    checkNodeResult( "child::comment()", node, nodes);
  });

  it('"processing-instruction any" is supported', () => {
    const node = doc.getElementById( 'StepNodeTestNodeTypeCase' );
    const nodes = [];
    let i;

    for ( i = 0; i < node.childNodes.length; i++ ) {
      switch ( node.childNodes[ i ].nodeType ) {
        case 7: // processing instruction
          nodes.push( node.childNodes[ i ] );
          break;
      }
    }

    checkNodeResult("child::processing-instruction()", node, nodes);
  });

  it('"processing-instruction specific" is supported', () => {
    const node = doc.getElementById( 'StepNodeTestNodeTypeCase' );
    const nodes = [];
    let i;

    for (i = 0; i < node.childNodes.length; i++) {
      switch ( node.childNodes[ i ].nodeType ) {
        case 7: // processing instruction
          if ( node.childNodes[ i ].nodeName == 'custom-process-instruct' ) {
              nodes.push( node.childNodes[ i ] );
          }
          break;
      }
    }
    checkNodeResult( "child::processing-instruction('custom-process-instruct')", node, nodes );
  });
});
