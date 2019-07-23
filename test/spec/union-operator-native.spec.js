import { g } from '../docwin';
import helpers from '../helpers';

describe( 'Union operator', () => {

    it( 'combines elements', () => {
        helpers.checkNodeResult( "id('eee40') | id('eee20') | id('eee25') | id('eee10') | id('eee30') | id('eee50')", g.doc, [
            g.doc.getElementById( 'eee10' ),
            g.doc.getElementById( 'eee20' ),
            g.doc.getElementById( 'eee25' ),
            g.doc.getElementById( 'eee30' ),
            g.doc.getElementById( 'eee40' ),
            g.doc.getElementById( 'eee50' )
        ] );
    } );

    it( 'combines elements and attributes', () => {
        helpers.checkNodeResult( "id('eee40')/attribute::*[1] | id('eee30')", g.doc, [
            g.doc.getElementById( 'eee30' ),
            helpers.filterAttributes( g.doc.getElementById( 'eee40' ).attributes )[ 0 ]
        ] );
    } );

    it( 'combines elements and attributes if they refer to the same element', () => {
        helpers.checkNodeResult( "id('eee40')/attribute::*[1] | id('eee40')", g.doc, [
            g.doc.getElementById( 'eee40' ),
            helpers.filterAttributes( g.doc.getElementById( 'eee40' ).attributes )[ 0 ]
        ] );
    } );

    it( 'combines elements and attributs if they refer to different trees', () => {
        helpers.checkNodeResult( "id('eee40')/attribute::*[1] | id('eee20')", g.doc, [
            g.doc.getElementById( 'eee20' ),
            helpers.filterAttributes( g.doc.getElementById( 'eee40' ).attributes )[ 0 ]
        ] );
    } );

    it( 'combines elements and attributes if the attribute is on a parent element in the same tree', () => {
        helpers.checkNodeResult( "id('eee40') | id('eee30')/attribute::*[1]", g.doc, [
            helpers.filterAttributes( g.doc.getElementById( 'eee30' ).attributes )[ 0 ],
            g.doc.getElementById( 'eee40' )
        ] );
    } );

    it( 'combines elements and attributes if both are (on) elements under the same parent', () => {
        helpers.checkNodeResult( "id('eee40') | id('eee35')/attribute::*[1]", g.doc, [
            helpers.filterAttributes( g.doc.getElementById( 'eee35' ).attributes )[ 0 ],
            g.doc.getElementById( 'eee40' )
        ] );
    } );

    it( 'combines attributes that live on different elements', () => {
        helpers.checkNodeResult( "id('eee35')/attribute::*[1] | id('eee40')/attribute::*[1]", g.doc, [
            helpers.filterAttributes( g.doc.getElementById( 'eee35' ).attributes )[ 0 ],
            helpers.filterAttributes( g.doc.getElementById( 'eee40' ).attributes )[ 0 ]
        ] );
    } );

    it( 'combines attributes that live on descendent elements', () => {
        helpers.checkNodeResult( "id('eee30')/attribute::*[1] | id('eee40')/attribute::*[1]", g.doc, [
            helpers.filterAttributes( g.doc.getElementById( 'eee30' ).attributes )[ 0 ],
            helpers.filterAttributes( g.doc.getElementById( 'eee40' ).attributes )[ 0 ]
        ] );
    } );

    it( 'combines attributes that live on descendent element (reversed)', () => {
        helpers.checkNodeResult( "id('eee40')/attribute::*[1] | id('eee30')/attribute::*[1]", g.doc, [
            helpers.filterAttributes( g.doc.getElementById( 'eee30' ).attributes )[ 0 ],
            helpers.filterAttributes( g.doc.getElementById( 'eee40' ).attributes )[ 0 ]
        ] );
    } );

    it( 'combines different attributes on the same element', () => {
        //Chrome/firefox return different attribute order
        helpers.checkUnorderedNodeResult( "id('eee40')/attribute::*[2] | id('eee40')/attribute::*[1]", g.doc, [
            helpers.filterAttributes( g.doc.getElementById( 'eee40' ).attributes )[ 0 ],
            helpers.filterAttributes( g.doc.getElementById( 'eee40' ).attributes )[ 1 ]
        ] );
    } );

    it( 'combines a namespace and attribute on the same element', () => {
        const result = g.doc.evaluate( "id('nss25')/namespace::*", g.doc, null, g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

        helpers.checkNodeResult( "id('nss25')/namespace::* | id('nss25')/attribute::*", g.doc,
            helpers.snapshotToArray( result ).concat(
                helpers.filterAttributes( g.doc.getElementById( 'nss25' ).attributes )
            )
        );
    } );

    it( 'combines two namespaces on the same element', () => {
        const result = g.doc.evaluate( "id('nss40')/namespace::*", g.doc, null, g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); //

        helpers.checkNodeResult( "id('nss40')/namespace::* | id('nss40')/namespace::*", g.doc,
            helpers.snapshotToArray( result )
        );
    } );

    it( 'combines a namespace and attribute', () => {
        const result = g.doc.evaluate( "id('nss40')/namespace::*", g.doc, null, g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); //

        // Need to check unordered. id('nss25')/attribute::* -- browsers return atts in different order
        helpers.checkUnorderedNodeResult( "id('nss40')/namespace::* | id('nss25')/attribute::* | id('nss25')", g.doc, [
            g.doc.getElementById( 'nss25' )
        ].concat(
            helpers.filterAttributes( g.doc.getElementById( 'nss25' ).attributes )
        ).concat(
            helpers.snapshotToArray( result )
        ) );
    } );

} );
