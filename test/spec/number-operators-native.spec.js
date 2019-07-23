import { g } from '../docwin';

describe( 'number operators', () => {


    it( '+ works', () => {
        [
            [ "1+1", 2 ],
            [ "0+1", 1 ],
            [ "0+0", 0 ],
            [ "0+-0", 0 ],
            [ "-1 + 1", 0 ],
            [ "-1 +-1", -2 ],
            [ "1.05+2.05", 3.0999999999999996 ],
            [ ".5   \n +.5+.3", 1.3 ],
            [ "5+4+1+-1+-4", 5 ],
            [ "'1'+'1'", 2 ],
            [ ".55+ 0.56", 1.11 ],
            [ "1.0+1.0", 2 ],
            [ "true()+true()", 2 ],
            [ "false()+1", 1 ],
            [ "(1 div 0) + 1", Number.POSITIVE_INFINITY ],
            [ "(-1 div 0) + 1", Number.NEGATIVE_INFINITY ],
            [ "1 + (-1 div 0)", Number.NEGATIVE_INFINITY ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );

        [
            [ "number('a') + 0" ],
            [ "0 + number('a')" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.be.a( 'number' );
            expect( result.numberValue ).to.deep.equal( NaN );
        } );
    } );

    it( '- without spacing works', () => {
        const result = g.doc.evaluate( "1-1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );
    } );

    it( '- with spacing works', () => {
        const result = g.doc.evaluate( "1 - 1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );
    } );

    it( '- with combo with/without spacing 1 works', () => {
        const result = g.doc.evaluate( "1 -1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );
    } );

    it( '- with combo with/without spacing 2 works', () => {
        const result = g.doc.evaluate( "1- 1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );

    } );

    it( '- with string without spacing BEFORE - fails', () => {
        const test = () => {
            g.doc.evaluate( "asdf- asdf", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw();
    } );

    it( '- with string without spacing AFTER - fails ', () => {
        const result = g.doc.evaluate( "asdf -asdf", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.be.a( 'number' );
        expect( result.numberValue ).to.deep.equal( NaN );
    } );

    it( '- with strings', () => {
        const result = g.doc.evaluate( "asdf - asdf", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.be.a( 'number' );
        expect( result.numberValue ).to.deep.equal( NaN );
    } );

    it( '- works as expected', () => {
        [
            [ "1-1", 0 ],
            [ "0 -1", -1 ],
            [ "0-0", 0 ],
            [ "0- -0", 0 ],
            [ "-1-1", -2 ],
            [ "-1 --1", 0 ],
            [ "1.05-2.05", -0.9999999999999998 ],
            [ ".5-.5-.3", -0.3 ],
            [ "5- 4-1--1--4", 5 ],
            [ "'1'-'1'", 0 ],
            [ ".55  - 0.56", -0.010000000000000009 ],
            [ "1.0-1.0", 0 ],
            //TODO vimago [ "true()  \n\r\t -true()", 0 ],
            //TODO vimago [ "false()-1", -1 ],
            [ "(1 div 0) - 1", Number.POSITIVE_INFINITY ],
            [ "(-1 div 0) - 1", Number.NEGATIVE_INFINITY ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );

        [
            [ "number('a') - 0" ],
            [ "0 - number('a')" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.be.a( 'number' );
            expect( result.numberValue ).to.deep.equal( NaN );
        } );
    } );

    it( 'mod without spacing works', () => {
        const result = g.doc.evaluate( "1mod1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );
    } );

    it( 'mod without spacing AFTER mod works', () => {
        const result = g.doc.evaluate( "1 mod1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );
    } );

    it( 'mod without spacing BEFORE mod works', () => {
        const result = g.doc.evaluate( "1mod 1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );
    } );

    it( 'mod with numbers-as-string works', () => {
        const result = g.doc.evaluate( "'1'mod'1'", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );
    } );

    it( 'mod without spacing after mod and a string fails', () => {
        const test = () => {
            g.doc.evaluate( "'1' mod/html'", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw();
    } );

    it( 'mod without spacing before mod and a string works', () => {
        const result = g.doc.evaluate( "'1'mod '1'", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 0 );
    } );

    it( 'mod works as expected', () => {
        [
            [ "5 mod 2", 1 ],
            [ "5 mod -2 ", 1 ],
            [ "-5 mod 2", -1 ],
            [ " -5 mod -2 ", -1 ],
            [ "5 mod 1.5", 0.5 ],
            [ "6.4 mod 2.1", 0.10000000000000009 ],
            [ "5.3 mod 1.1", 0.8999999999999995 ],
            [ "-0.4 mod .2", 0 ],
            [ "1 mod -1", 0 ],
            [ "0 mod 1", 0 ],
            [ "10 mod (1 div 0)", 10 ],
            [ "-10 mod (-1 div 0)", -10 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );

        [
            [ "0 mod 0" ],
            [ "1 mod 0" ],
            [ "(1 div 0) mod 1" ],
            [ "(-1 div 0) mod 1" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.be.a( 'number' );
            expect( result.numberValue ).to.deep.equal( NaN );
        } );
    } );

    it( 'div without spacing', () => {
        const result = g.doc.evaluate( "1div1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 1 );
    } );

    it( 'div without spacing AFTER div', () => {
        const result = g.doc.evaluate( "1 div1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 1 );
    } );

    it( 'div without spacing BEFORE div', () => {
        const result = g.doc.evaluate( "1div 1", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 1 );
    } );

    it( 'div without spacing and numbers-as-string', () => {
        const result = g.doc.evaluate( "'1'div'1'", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 1 );
    } );

    it( 'div without spacing AFTER div and number-as-string', () => {
        const result = g.doc.evaluate( "'1' div'1'", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 1 );
    } );

    it( 'div without spacing BEFORE div and number-as-string', () => {
        const result = g.doc.evaluate( "'1'div '1'", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.equal( 1 );
    } );

    it( 'div works as expected', () => {
        [
            [ "1div 1", 1 ],
            [ "0 div 1", 0 ],
            [ "-1 div 1", -1 ],
            [ "-1 div 1", -1 ],
            [ "1.05 div 2.05", 0.5121951219512195 ],
            [ ".5 div .5 div .3", 3.3333333333333335 ],
            [ "5 div 4 div 1 div -1 div -4", 0.3125 ],
            [ "'1' div '1'", 1 ],
            [ ".55 div 0.56", 0.9821428571428571 ],
            [ "1.0 div 1.0", 1 ],
            [ "true() div true()", 1 ],
            [ "false() div 1", 0 ],
            [ "1 div 0", Number.POSITIVE_INFINITY ],
            [ "-1 div 0", Number.NEGATIVE_INFINITY ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );

        [
            [ "0 div 0" ],
            [ "0 div -0" ],
            [ "number('a') div 0" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.be.a( 'number' );
            expect( result.numberValue ).to.deep.equal( NaN );
        } );
    } );

    it( '* works as expected', () => {
        [
            [ "1*1", 1 ],
            [ "9 * 2", 18 ],
            [ "9 * -1", -9 ],
            [ "-10 *-11", 110 ],
            [ "-1 * 1", -1 ],
            [ "0*0", 0 ],
            [ "0*1", 0 ],
            [ "-1*0", 0 ],
            [ "-15.*1.5", -22.5 ],
            [ "1.5 * 3", 4.5 ],
            [ "(1 div 0) * 1", Number.POSITIVE_INFINITY ],
            [ "(-1 div 0) * -1", Number.POSITIVE_INFINITY ],
            [ "(1 div 0) * -1", Number.NEGATIVE_INFINITY ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );

        [
            [ "number('a') * 0" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.be.a( 'number' );
            expect( result.numberValue ).to.deep.equal( NaN );
        } );
    } );

    it( '*,+,-,mod,div precendence rules are applied correctly', () => {
        [
            [ "1+2*3", 7 ],
            [ "2*3+1", 7 ],
            [ "1-10 mod 3 div 3", 0.6666666666666667 ],
            [ "4-3*4+5-1", -4 ],
            //TODO vimago [ "(4-3)*4+5-1", 8 ],
            [ "8 div 2 + 4", 8 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );
    } );
} );
