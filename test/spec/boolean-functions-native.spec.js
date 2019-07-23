import { g } from '../docwin';
import helpers from '../helpers';

describe( 'native boolean functions', () => {

    it( 'true()', () => {
        const result = g.doc.evaluate( "true()", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );
    } );

    it( 'true() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "true(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'false()', () => {
        const result = g.doc.evaluate( "false()", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );
    } );

    it( 'true() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "false('a')", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'boolean()', () => {
        let result;

        result = g.doc.evaluate( "boolean('a')", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean('')", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );
    } );

    it( 'boolean() conversion of booleans', () => {
        let result;

        result = g.doc.evaluate( "boolean(true())", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean(false())", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );
    } );

    it( 'boolean() conversion of numbers', () => {
        let result;

        result = g.doc.evaluate( "boolean(1)", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean(-1)", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean(1 div 0)", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean(0.1)", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean('0.0001')", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean(0)", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );

        result = g.doc.evaluate( "boolean(0.0)", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );

        result = g.doc.evaluate( "boolean(number(''))", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );
    } );

    it( 'boolean() conversion of nodeset', () => {
        let result;

        result = g.doc.evaluate( "boolean(/xhtml:html)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean(/asdf)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );

        result = g.doc.evaluate( "boolean(self::node())", g.doc.getElementById( 'FunctionBooleanEmptyNode' ), helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "boolean(//xhtml:article)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );
    } );

    it( 'boolean() fails when too few arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "boolean()", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'boolean() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "boolean(1, 2)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'not()', () => {
        let result;

        result = g.doc.evaluate( "not(true())", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );

        result = g.doc.evaluate( "not(false())", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( true );

        result = g.doc.evaluate( "not(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        expect( result.booleanValue ).to.equal( false );
    } );

    it( 'not() fails when too few arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "not()", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'not() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "not(1, 2)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'lang()', () => {
        [
            [ "lang('en')", g.doc.documentElement, true ],
            [ "lang('EN')", g.doc.documentElement, true ],
            [ "lang('EN-us')", g.doc.documentElement, true ],
            [ "lang('EN-us-boont')", g.doc.documentElement, false ], //
            // hierarchy check
            [ "lang('EN')", g.doc.querySelector( 'body' ), true ],
            [ "lang('sr')", g.doc.getElementById( 'testLang2' ), true ],
            [ "lang('sr-Cyrl-bg')", g.doc.getElementById( 'testLang2' ), true ],
            [ "lang('fr')", g.doc.getElementById( 'testLang2' ), false ], //
            // node check
            [ "lang('sl')", g.doc.getElementById( 'testLang3' ), true ], //
            // attribute node check
            [ "lang('sr-Cyrl-bg')", helpers.filterAttributes( g.doc.getElementById( 'testLang4' ).attributes )[ 0 ], true ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( result.booleanValue ).to.equal( t[ 2 ] );
        } );
    } );

    it( 'lang() fails when too few arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "lang()", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'lang() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "lang(1, 2)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );
} );
