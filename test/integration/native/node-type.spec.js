import { g } from '../docwin';
import helpers from '../helpers';

describe( 'node-type', () => {


    it( '"node" is supported', () => {
        const node = g.doc.getElementById( 'StepNodeTestNodeTypeCase' );
        helpers.checkNodeResult( "child::node()", node, node.childNodes );
    } );

    it( '"text" is supported', () => {
        const node = g.doc.getElementById( 'StepNodeTestNodeTypeCase' );
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

        helpers.checkNodeResult( "child::text()", node, nodes );
    } );

    it( '"comment" is supported', () => {
        const node = g.doc.getElementById( 'StepNodeTestNodeTypeCase' );
        const nodes = [];
        let i;

        for ( i = 0; i < node.childNodes.length; i++ ) {
            switch ( node.childNodes[ i ].nodeType ) {
                case 8: // comment
                    nodes.push( node.childNodes[ i ] );
                    break;
            }
        }

        helpers.checkNodeResult( "child::comment()", node, nodes );
    } );

    it( '"processing-instruction any" is supported', () => {
        const node = g.doc.getElementById( 'StepNodeTestNodeTypeCase' );
        const nodes = [];
        let i;

        for ( i = 0; i < node.childNodes.length; i++ ) {
            switch ( node.childNodes[ i ].nodeType ) {
                case 7: // processing instruction
                    nodes.push( node.childNodes[ i ] );
                    break;
            }
        }

        helpers.checkNodeResult( "child::processing-instruction()", node, nodes );
    } );

    it( '"processing-instruction specific" is supported', () => {
        const node = g.doc.getElementById( 'StepNodeTestNodeTypeCase' );
        const nodes = [];
        let i;

        for ( i = 0; i < node.childNodes.length; i++ ) {
            switch ( node.childNodes[ i ].nodeType ) {
                case 7: // processing instruction
                    if ( node.childNodes[ i ].nodeName == 'custom-process-instruct' ) {
                        nodes.push( node.childNodes[ i ] );
                    }
                    break;
            }
        }

        helpers.checkNodeResult( "child::processing-instruction('custom-process-instruct')", node, nodes );
    } );

} );
