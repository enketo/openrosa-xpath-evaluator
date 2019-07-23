// TODO: move these to nodeset-native.spec.js? Why are these separate?

import { g } from '../docwin';
import helpers from '../helpers';

describe( 'nodeset id() function', () => {

    it( 'works for a simple case', () => {
        const node = g.doc.getElementById( 'FunctionNodesetIdCaseSimple' );
        expect( typeof node ).to.equal( 'object' );

        helpers.checkNodeResult( "id('FunctionNodesetIdCaseSimple')", g.doc, [
            node
        ] );
    } );

    it( 'works if ID is provided in duplicate', () => {
        const node = g.doc.getElementById( 'FunctionNodesetIdCaseSimple' );
        expect( typeof node ).to.equal( 'object' );

        helpers.checkNodeResult( "id('FunctionNodesetIdCaseSimple FunctionNodesetIdCaseSimple')", g.doc, [
            node
        ] );
    } );

    it( 'returns empty result for non-existing ID', () => {
        helpers.checkNodeResult( "id('FunctionNodesetIdCaseSimpleDoesNotExist')", g.doc, [] );
    } );

    // Latest browsers do return the node regardless of empty namespace,
    // Is this important for us to check atts/namespaces on every id function in  order to enforce this?
    xit( 'returns empty result if the default namespace for the node is empty', () => {
        const node = g.doc.getElementById( 'FunctionNodesetIdCaseNoDefaultNamespaceContainer' ).firstChild;
        expect( typeof node ).to.equal( 'object' );

        helpers.checkNodeResult( "id('FunctionNodesetIdCaseNoDefaultNamespace')", g.doc, [] );
    } );

    xit( 'works if the default namespace for the node is the XHTML namespace', () => {
        const node = g.doc.getElementById( 'FunctionNodesetIdCaseXhtmlDefaultNamespaceContainer' ).firstChild;
        expect( typeof node ).to.equal( 'object' );

        helpers.checkNodeResult( "id('FunctionNodesetIdCaseXhtmlDefaultNamespace')", g.doc, [
            node
        ] );
    } );

    xit( 'works if the namespace of the id attribute is the XHTML namespace', () => {
        const node = g.doc.getElementById( 'FunctionNodesetIdCaseXhtmlNamespaceContainer' ).firstChild;
        expect( typeof node ).to.equal( 'object' );

        helpers.checkNodeResult( "id('FunctionNodesetIdCaseXhtmlNamespace')", g.doc, [
            node
        ] );
    } );

    xit( 'works if the namespace of the id attribute is defined in the parent container', () => {
        const node = g.doc.getElementById( 'FunctionNodesetIdCaseXhtmlNamespaceParentContainer' ).firstChild;
        expect( typeof node ).to.equal( 'object' );

        helpers.checkNodeResult( "id('FunctionNodesetIdCaseXhtmlNamespaceParent')", g.doc, [
            node
        ] );
    } );

    xit( 'works if the id attribute has the xml namespace alias', () => {
        const node = g.doc.getElementById( 'FunctionNodesetIdXmlNamespaceContainer' ).firstChild;
        expect( typeof node ).to.equal( 'object' );

        helpers.checkNodeResult( "id('FunctionNodesetIdXmlNamespace')", g.doc, [
            node
        ] );
    } );

    it( 'works if multiple space-separated IDs are provided as the parameter', () => {
        helpers.checkNodeResult( "id('FunctionNodesetIdCaseMultiple1 FunctionNodesetIdCaseMultiple2 FunctionNodesetIdCaseMultiple3')", g.doc, [
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple1' ),
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple2' ),
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple3' )
        ] );
    } );

    it( 'works if multiple space/newline/table-separated IDs are provided as the parameter', () => {
        helpers.checkNodeResult( "id('  FunctionNodesetIdCaseMultiple1 sss FunctionNodesetIdCaseMultiple2\r\n\tFunctionNodesetIdCaseMultiple3\t')", g.doc, [
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple1' ),
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple2' ),
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple3' )
        ] );
    } );

    it( 'works if a nodeset is provided as the argument (by using the content of the nodeset)', () => {
        helpers.checkNodeResult( "id(.)", g.doc.getElementById( 'FunctionNodesetIdCaseNodeset' ), [] );

        // this test is tricky, the argument is the CONTENT of the FunctionNodesetIdCaseNodeset element!
        helpers.checkNodeResult( "id(child::*)", g.doc.getElementById( 'FunctionNodesetIdCaseNodeset' ), [
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple1' ),
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple2' ),
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple3' ),
            g.doc.getElementById( 'FunctionNodesetIdCaseMultiple4' )
        ] );
    } );
} );
