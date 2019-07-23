import { g } from '../docwin';
import helpers from '../helpers';

describe( 'Custom "OpenRosa" functions', () => {

    //test only the use of position(node) with an argument
    it( 'position(node)', () => {
        [
            [ 'position(..)', g.doc.getElementById( 'FunctionNumberCaseNumberMultiple' ), 6 ],
            [ 'position(.)', g.doc.getElementById( 'FunctionNumberCaseNumberMultiple' ), 3 ],
            [ 'position(../..)', g.doc.getElementById( 'testFunctionNodeset3NodeP' ), 2 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.numberValue );
        } );
    } );

    it( 'selected()', () => {
        [
            [ "selected(self::node(), '')", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), true ],
            [ "selected(self::node(), 'ab')", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), false ],
            [ "selected(self::node(), 'bc')", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), false ],
            [ "selected(self::node(), 'ab')", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), true ],
            [ "selected(self::node(), 'kl')", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), false ],
            [ "selected(self::node(), 'ab')", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), true ],
            [ "selected(self::node(), 'cd')", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), true ],
            [ "selected(self::node(), 'ij')", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), false ],
            [ "selected('apple baby crimson', 'apple')", g.doc, true ],
            [ "selected('apple baby crimson', 'baby')", g.doc, true ],
            [ "selected('apple baby crimson', 'crimson')", g.doc, true ],
            [ "selected('apple baby crimson', '  baby  ')", g.doc, true ],
            [ "selected('apple baby crimson', 'babby')", g.doc, false ],
            [ "selected('apple baby crimson', 'bab')", g.doc, false ],
            [ "selected('apple', 'apple')", g.doc, true ],
            [ "selected('apple', 'ovoid')", g.doc, false ],
            [ "selected('', 'apple')", g.doc, false ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.booleanValue );
        } );
    } );

    it( 'selected-at()', () => {
        [
            [ "selected-at(self::node(), 0)", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), '' ],
            [ "selected-at(self::node(), 0)", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), 'ab' ],
            [ "selected-at(self::node(), 1)", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), '' ],
            [ "selected-at(self::node(), 2)", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), 'ef' ],
            [ "selected-at(self::node(), -1)", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), '' ],
            [ "selected-at('apple baby crimson', 2)", g.doc, 'crimson' ],
            [ "selected-at('apple baby crimson', -1)", g.doc, '' ],
            [ "selected-at('', 1)", g.doc, '' ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.stringValue );
        } );
    } );

    it( 'count-selected()', () => {
        [
            [ "count-selected(self::node())", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), 0 ],
            [ "count-selected(self::node())", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), 1 ],
            [ "count-selected(self::node())", g.doc.getElementById( 'FunctionSelectedCaseMultiple' ), 4 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.numberValue );
        } );
    } );

    it( 'checklist()', () => {
        [
            [ "checklist(-1, 2, 2>1)", g.doc, true ],
            [ "checklist(-1, 2, 1=1, 2=2, 3=3)", g.doc, false ],
            [ "checklist(1, 2, 1=1, 2=2, 3=3)", g.doc, false ],
            [ "checklist(1, 1, 1=1)", g.doc, true ],
            [ "checklist(2, 2, * )", g.doc.getElementById( 'FunctionChecklistCase' ), true ],
            [ "checklist(-1, 2, self::node())", g.doc.getElementById( 'FunctionChecklistCaseEmpty' ), true ],
            [ "checklist(1, 2, self::node())", g.doc.getElementById( 'FunctionChecklistCaseEmpty' ), false ],
            [ "checklist(1, 1, true(), false(), false())", g.doc, true ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.booleanValue );
        } );
    } );

    it( 'weighted-checklist()', () => {
        // Note: test for two node-set arguments done elsewhere
        [
            [ "weighted-checklist(-1, 2, 2>1, 2)", g.doc, true ],
            [ "weighted-checklist(-1, 2, 2>1, 3)", g.doc, false ],
            [ "weighted-checklist(-1, 2, 1=1, 1, 2=2, 1, 3=3, 1)", g.doc, false ],
            [ "weighted-checklist(1, 2, 1=1, 1, 2=2, 1, 3=3, 1)", g.doc, false ],
            [ "weighted-checklist(1, 1, 1=1, 1)", g.doc, true ],
            [ "weighted-checklist(1, 1, 1=1, 0)", g.doc, false ],
            [ "weighted-checklist(5, 5, self::* ,5)", g.doc.getElementById( 'FunctionChecklistCase0' ), true ],
            [ "weighted-checklist(-1, 2, self::node(), 0)", g.doc.getElementById( 'FunctionChecklistCaseEmpty' ), true ],
            [ "weighted-checklist(1, 2, self::node(), 1)", g.doc.getElementById( 'FunctionChecklistCaseEmpty' ), false ],
            [ "weighted-checklist(3, 3, 1=1, self::node())", g.doc.getElementById( 'FunctionWeightedChecklist' ), true ],
            [ "weighted-checklist(2, 2, true(), 2, false(), 5, false(), 6)", g.doc, true ],
            [ "weighted-checklist(2, -1, true(), 999, false(), 5, false(), 6)", g.doc, true ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.booleanValue );
        } );
    } );

    it( 'boolean-from-string()', () => {
        [
            [ "boolean-from-string(1)", g.doc, true ],
            [ "boolean-from-string(0)", g.doc, false ],
            [ "boolean-from-string('1')", g.doc, true ],
            [ "boolean-from-string('2')", g.doc, false ],
            [ "boolean-from-string('0')", g.doc, false ],
            [ "boolean-from-string('true')", g.doc, true ],
            [ "boolean-from-string('false')", g.doc, false ],
            [ "boolean-from-string('whatever')", g.doc, false ],
            [ "boolean-from-string(1.0)", g.doc, true ],
            [ "boolean-from-string(1.0001)", g.doc, false ],
            [ "boolean-from-string(true())", g.doc, true ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.booleanValue );
        } );
    } );

    it( 'if()', () => {
        [
            [ "if(true(), 5, 'abc')", g.doc, "5" ],
            [ "if(false(), 5, 'abc')", g.doc, "abc" ],
            [ "if(6 > 7, 5, 'abc')", g.doc, "abc" ],
            [ "if('', 5, 'abc')", g.doc, "abc" ],
            [ "if(self::node(), 'exists', 'does not exist')", g.doc.getElementById( 'FunctionChecklistCaseEmpty' ), 'exists' ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.stringValue );
        } );
    } );

    it( 'regex()', () => {
        [
            [ "regex('12345','[0-9]+')", g.doc, true ],
            [ "regex('abcde','[0-9]+')", g.doc, false ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.booleanValue );
        } );
    } );

    // THIS IS NOT A CUSTOM FUNCTION
    it( 'contextual and absolute', () => {
        [
            [ "(. >= 122)", g.doc.getElementById( 'FunctionNumberCaseNumber' ), true ],
            [ "(. < //xhtml:div[@id='FunctionNumberCaseNumber'])", g.doc.getElementById( 'FunctionChecklistCase0' ), true ],
            [ "(. > /xhtml:html/xhtml:body/xhtml:div[@id='FunctionNumberCase']/xhtml:div[@id='FunctionNumberCaseNumber'])", g.doc.getElementById( 'FunctionChecklistCase0' ), false ],
            [ "(//xhtml:div[@id='FunctionNumberCaseNumber'] >= 122)", g.doc.getElementById( 'XPathExpressionEvaluateCase' ), true ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.booleanValue );
        } );
    } );

    // TODO: It would be useful to run these tests after setting the timezone to one that has DST (which America/Phoenix hasn't)
    it( 'dates as string', () => {
        [
            [ '"2018-01-01"', '2018-01-01' ],
            [ 'date("2018-01-01")', '2018-01-01' ], //T00:00:00.000-07:00'], // America/Phoenix
            [ '"2018-01-01" + 1', 17533.29167 ], // converted to Number according to regular XPath rules
            [ 'date("2018-01-01" + 1)', '2018-01-02' ], //T00:00:00.000-07:00'],
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            const r = typeof t[ 1 ] === 'number' ? Math.round( result.stringValue * 100000 ) / 100000 : result.stringValue;
            expect( r ).to.equal( t[ 1 ] );
        } );

        [
            "today()",
            "date(today() + 10)",
            "date(10 + today())"
        ].forEach( t => {
            const result = g.doc.evaluate( t, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.match( /([0-9]{4}-[0-9]{2}-[0-9]{2})$/ );
        } );
    } );

    it( 'datetimes as string', () => {

        [
            "now()",
        ].forEach( t => {
            const result = g.doc.evaluate( t, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.match( /([0-9]{4}-[0-9]{2}-[0-9]{2})([T]|[\s])([0-9]){2}:([0-9]){2}([0-9:.]*)(\+|-)([0-9]{2}):([0-9]{2})$/ );
        } );
    } );

    it( 'converts dates to numbers', () => {
        [
            [ "number(date('1970-01-01'))", 0.29 ],
            [ "number(date('1970-01-02'))", 1.29 ],
            [ "number(date('1969-12-31'))", -0.71 ],
            [ "number(date('2008-09-05'))", 14127.29 ],
            [ "number(date('1941-12-07'))", -10251.71 ],
            [ "number('2008-09-05')", 14127.29 ],
            [ "number( 1 div 1000000000 )", 0 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            const roundedResult = Math.round( result.numberValue * 100 ) / 100;
            expect( roundedResult ).to.equal( t[ 1 ] );
        } );

        //for nodes (where the date datatype is guessed)
        [
            [ ".", g.doc.getElementById( "FunctionDateCase1" ), 15544.29 ],
            [ ".", g.doc.getElementById( "FunctionDateCase2" ), 15572 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            const roundedResult = Math.round( result.numberValue * 100 ) / 100;
            expect( roundedResult ).to.equal( t[ 2 ] );
        } );
    } );

    it( 'datetype comparisons', () => {
        [
            [ "date('2001-12-26') > date('2001-12-25')", true ],
            [ "date('1969-07-20') < date('1969-07-21')", true ],
            [ "date('2004-05-01') = date('2004-05-01')", true ],
            [ "true() != date('1999-09-09T00:00:00.000+00:00')", false ],
            [ "date(0) = date('1970-01-01T00:00:00.000+00:00')", true ],
            [ "date(1) = date('1970-01-02T00:00:00.000+00:00')", true ],
            [ "date(-1) = date('1969-12-31T00:00:00.000+00:00')", true ],
            [ "date(14127) = date('2008-09-05T00:00:00.000+00:00')", true ],
            [ "date(-10252) = date('1941-12-07T00:00:00.000+00:00')", true ],
            [ "date(date('1989-11-09')) = date('1989-11-09')", true ],
            [ "date('2012-01-01') < today()", true ],
            [ "date('2100-01-02') > today()", true ],
            [ "date('2012-01-01') < now()", true ],
            [ "date('2100-01-02') > now()", true ],
            [ "now() > today()", true ],
            //['today() = "2018-06-26"', true],
            [ '"2018-06-25" = "2018-06-25T00:00:00.000-07:00"', true ],
            [ '"2018-06-25" < "2018-06-25T00:00:00.000-07:00"', false ],
            [ '"2018-06-25" < "2018-06-25T00:00:00.001-07:00"', true ],
        ].forEach( t => {
            let expr = t[ 0 ];
            let result = g.doc.evaluate( expr, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( result.booleanValue ).to.equal( t[ 1 ] );
            // do the same tests for the alias date-time()
            expr = expr.replace( 'date(', 'date-time(' );
            result = g.doc.evaluate( expr, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 1 ] ).to.equal( result.booleanValue );
        } );
    } );

    it( 'datestring comparisons (date detection)', () => {
        [
            [ ". < date('2012-07-24')", g.doc.getElementById( "FunctionDateCase1" ), true ],
            //returns false if strings are compared but true if dates are compared
            [ "../node()[@id='FunctionDateCase2'] > ../node()[@id='FunctionDateCase3']", g.doc.getElementById( "FunctionDateCase1" ), true ]
        ].forEach( t => {
            let expr = t[ 0 ]; //
            let result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.booleanValue );
            // do the same tests for the alias date-time()
            expr = expr.replace( 'date(', 'date-time(' );
            result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( t[ 2 ] ).to.equal( result.booleanValue );
        } );
    } );

    it( 'date calculations', () => {
        [
            [ "today() > ('2012-01-01' + 10)", g.doc, true ],
            [ "10 + date('2012-07-24') = date('2012-08-03')", g.doc, true ],
            [ ". = date('2012-07-24') - 1", g.doc.getElementById( "FunctionDateCase1" ), true ],
            [ ". > date('2012-07-24') - 2", g.doc.getElementById( "FunctionDateCase1" ), true ],
            [ ". < date('2012-07-25') - 1", g.doc.getElementById( "FunctionDateCase1" ), true ],
            [ ". = 30 + /xhtml:html/xhtml:body/xhtml:div[@id='FunctionDate']/xhtml:div[@id='FunctionDateCase4']", g.doc.getElementById( "FunctionDateCase1" ), true ],
            [ "10 + '2012-07-24' = '2012-08-03'", g.doc, true ]
        ].forEach( t => {
            let expr = t[ 0 ];
            let result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( result.booleanValue ).to.equal( t[ 2 ] );
            // do the same tests for the alias date-time()
            expr = expr.replace( 'date(', 'date-time(' );
            result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( result.booleanValue ).to.equal( t[ 2 ] );
        } );

        [
            [ "10 + date('2012-07-24')", g.doc, 15555.29 ]
        ].forEach( t => {
            let expr = t[ 0 ];
            let result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            let roundedResult = Math.round( result.numberValue * 100 ) / 100;
            expect( roundedResult ).to.equal( t[ 2 ] );
            // do the same tests for the alias date-time()
            expr = expr.replace( 'date(', 'date-time(' );
            result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            roundedResult = Math.round( result.numberValue * 100 ) / 100;
            expect( roundedResult ).to.equal( t[ 2 ] );
        } );
    } );

    it( 'invalid dates', () => {
        [
            "date('1983-09-31')",
            "date('not a date')",
            "date('opv_3')",
            "date(true())"
            //"date(convertible())"
        ].forEach( t => {
            let expr = t[ 0 ];
            let result = g.doc.evaluate( expr, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( result.booleanValue ).to.equal( false );
            // do the same tests for the alias date-time()
            expr = expr.replace( 'date(', 'date-time(' );
            result = g.doc.evaluate( expr, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( result.booleanValue ).to.equal( false );
        } );
    } );

    // Karma config is setting timezone to America/Denver
    it( 'format-date()', () => {
        const date = new Date();
        [
            [ "format-date(.,  '%Y/%n | %y/%m | %b' )", g.doc.getElementById( "FunctionDateCase1" ), '2012/7 | 12/07 | Jul' ],
            [ "format-date(., '%Y/%n | %y/%m | %b')", g.doc.getElementById( "FunctionDateCase2" ), '2012/8 | 12/08 | Aug' ],
            [ "format-date(., '%M | %S | %3')", g.doc.getElementById( "FunctionDateCase2" ), '00 | 00 | 000' ],
            [ `format-date('${date.toString()}', '%e | %a' )`, g.doc,
                `${date.getDate()} | ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}`
            ],
            [ "format-date('not a date', '%M')", g.doc, 'Invalid Date' ],
            //["format-date('Mon, 02 Jul 2012 00:00:00 GMT', )", g.doc, '']
            // the test below probably only works in the GMT -6 timezone...
            // [ "format-date(., '%Y | %y | %m | %n | %b | %d | %e | %H | %h | %M | %S | %3 | %a')", g.doc.getElementById( "FunctionDateCase5" ),
            //     '2012 | 12 | 08 | 8 | Aug | 08 | 8 | 06 | 6 | 07 | 08 | 123 | Wed'
            // ],
        ].forEach( t => {
            let expr = t[ 0 ];
            let result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( t[ 2 ] );
            // do the same tests for the alias format-date-time()
            expr = expr.replace( 'format-date', 'format-date-time' );
            result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( t[ 2 ] );
        } );
    } );

    // Karma config is setting timezone to America/Denver
    it( 'format-date() - locale dependent', () => {
        [
            [ "format-date('2017-05-26T00:00:01-07:00', '%a %b')", g.doc, 'Fri May' ],
            [ "format-date('2017-05-26T23:59:59-07:00', '%a %b')", g.doc, 'Fri May' ],
            [ "format-date('2017-05-26T01:00:00-07:00', '%a %b')", g.doc, 'Fri May', 'en' ],
            [ "format-date('2017-05-26T01:00:00-07:00', '%a %b')", g.doc, 'ven. mai', 'fr' ],
            [ "format-date('2017-05-26T01:00:00-07:00', '%a %b')", g.doc, 'vr mei', 'nl' ],
        ].forEach( t => {
            g.win.enketoFormLocale = t[ 3 ];
            let expr = t[ 0 ];
            let result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( t[ 2 ] );
            // do the same tests for the alias format-date-time()
            expr = expr.replace( 'format-date', 'format-date-time' );
            result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( t[ 2 ] );
        } );
    } );

    it( 'uuid()', () => {
        const result = g.doc.evaluate( 'uuid()', g.doc, null, g.win.XPathResult.STRING_TYPE );
        expect( result.stringValue ).to.have.length( 36 );
    } );

    it( 'int()', () => {
        let result;
        [
            [ "int(2.1)", 2 ],
            [ "int(2.51)", 2 ],
            [ "int(2)", 2 ],
            [ "int('2.1')", 2 ],
            [ "int('2.51')", 2 ],
            [ "int(1 div 47999799999)", 0 ], //(2.08e-11)
            [ "int(-1.4)", -1 ],
            [ "int(-1.51)", -1 ]
        ].forEach( t => {
            result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );

        result = g.doc.evaluate( 'int("a")', g.doc, null, g.win.XPathResult.NUMBER_TYPE );
        expect( result.numberValue ).to.deep.equal( NaN );

        // XPath 1.0 does not deal with scientific notation
        result = g.doc.evaluate( 'int("7.922021953507237e-12")', g.doc, null, g.win.XPathResult.NUMBER_TYPE );
        expect( result.numberValue ).to.deep.equal( NaN );
    } );

    it( 'substr()', () => {
        [
            [ "substr('hello',0)", "hello" ],
            [ "substr('hello',0,5)", "hello" ],
            [ "substr('hello',1)", "ello" ],
            [ "substr('hello',1,5)", "ello" ],
            [ "substr('hello',1,4)", "ell" ],
            [ "substr('hello',-2)", "lo" ],
            [ "substr('hello',0,-1)", "hell" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( t[ 1 ] );
        } );
    } );

    it( 'random()', () => {
        const result = g.doc.evaluate( 'random()', g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.match( /0\.[0-9]{14,}/ );
    } );

    it( 'min()', () => {
        [
            [ "min(self::*)", g.doc.getElementById( 'FunctionNumberCaseNumber' ), 123 ],
            [ "min(self::*)", g.doc.getElementById( 'FunctionMaxMinCaseEmpty' ), NaN ],
            [ "min(*)", g.doc.getElementById( 'FunctionNumberCaseNumberMultiple' ), -10 ],
            [ "min(*)", g.doc.getElementById( 'FunctionMinCase' ), 0 ],
            [ "min(//*[@id='FunctionMinCase']/*[position()=1], //*[@id='FunctionMinCase']/*[position()=2], //*[@id='FunctionMinCase']/*[position()=3])", g.doc, 0 ],
            [ "min(*)", g.doc.getElementById( 'FunctionMaxMinWithEmpty' ), NaN ],
            [ "min(1, 2, 3)", g.doc, 1 ],
            [ "min(1, 2, 0)", g.doc, 0 ],
            [ "min(0, 2, 3)", g.doc, 0 ],
            [ "min(-1, 2, 3)", g.doc, -1 ],
            [ "min('')", g.doc, NaN ],
            [ "min(node())", g.doc.getElementById( 'FunctionNumberCaseNotNumberMultiple' ), NaN ],
            [ "min(//nonexisting)", g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.be.a( 'number' );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'max()', () => {
        [
            [ "max(self::*)", g.doc.getElementById( 'FunctionNumberCaseNumber' ), 123 ],
            [ "max(self::*)", g.doc.getElementById( 'FunctionMaxMinCaseEmpty' ), NaN ],
            [ "max(*)", g.doc.getElementById( 'FunctionNumberCaseNumberMultiple' ), 99 ],
            [ "max(*)", g.doc.getElementById( 'FunctionMaxCase' ), 0 ],
            [ "max(//*[@id='FunctionMaxCase']/*[position()=1], //*[@id='FunctionMaxCase']/*[position()=2], //*[@id='FunctionMaxCase']/*[position()=3])", g.doc, 0 ],
            [ "max(*)", g.doc.getElementById( 'FunctionMaxMinWithEmpty' ), NaN ],
            [ "max(1, 2, 3)", g.doc, 3 ],
            [ "max(-1, -3, 0)", g.doc, 0 ],
            [ "max(-1, 0, -3)", g.doc, 0 ],
            [ "max(-4, -1, -3)", g.doc, -1 ],
            [ "max('')", g.doc, NaN ],
            [ "max(node())", g.doc.getElementById( 'FunctionNumberCaseNotNumberMultiple' ), NaN ],
            [ "max(//nonexisting)", g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.be.a( 'number' );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'round()', () => {
        let result;
        [
            [ "round(1.234)", 1 ],
            [ "round(1.234, 2)", 1.23 ],
            [ "round(1.234, 5)", 1.234 ],
            [ "round(1.234, 0)", 1 ],
            [ "round(33.33, -1)", 30 ],
            [ "round(1 div 47999799999)", 0 ], //(2.08e-11)
        ].forEach( t => {
            result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );

        result = g.doc.evaluate( "round('a')", g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
        expect( result.numberValue ).to.deep.equal( NaN );
    } );

    it( 'round() with too many args throws exception', () => {
        const test = () => {
            g.doc.evaluate( "round(1, 2, 3)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'join()', () => {
        [
            [ "join(', ', *)", g.doc.getElementById( 'testFunctionNodeset2' ), "1, 2, 3, 4" ],
            [ "join(' ', 'This', 'is', 'a', 'sentence.')", g.doc, "This is a sentence." ],
            [ "join(' ## ')", g.doc, "" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( t[ 2 ] );
        } );
    } );

    // Javarosa accepts an optional node-set argument for concat which deviates from native XPath. It also accepts no arguments.
    it( 'concat()', () => {
        [
            [ "concat(*, 'a')", g.doc.getElementById( 'testFunctionNodeset2' ), '1234a' ],
            [ "concat(*)", g.doc.getElementById( 'testFunctionNodeset2' ), '1234' ],
            [ "concat('a')", g.doc, 'a' ],
            [ "concat('a','b', '')", g.doc, 'ab' ],
            [ "concat()", g.doc.getElementById( 'testFunctionNodeset2' ), '' ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( t[ 2 ] );
        } );
    } );

    it( 'coalesce()', () => {
        [
            [ "coalesce('', 'ab')", g.doc, 'ab' ],
            [ "coalesce(self::*, 'ab')", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), 'ab' ],
            [ "coalesce(self::*, 'cd')", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), 'ab' ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            //Y.Assert.areSame(input[i][2], result.stringValue);
            expect( result.stringValue ).to.equal( t[ 2 ] );
        } );
    } );

    it( 'pow()', () => {
        [
            [ 'pow(2, 2)', g.doc, 4 ],
            [ 'pow(2, 0)', g.doc, 1 ],
            [ 'pow(0,4)', g.doc, 0 ],
            [ 'pow(2.5, 2)', g.doc, 6.25 ],
            [ 'pow(0.5, 2)', g.doc, 0.25 ],
            [ 'pow(-1, 2)', g.doc, 1 ],
            [ 'pow(-1, 3)', g.doc, -1 ],
            [ 'pow(4, 0.5)', g.doc, 2 ],
            [ 'pow(16, 0.25)', g.doc, 2 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );


    it( 'sin()', () => {
        [
            [ 'sin(2)', g.doc, 0.9092974268256817 ],
            [ 'sin(//xhtml:div[@id="testFunctionNodeset2"]/xhtml:p[2])', g.doc, 0.9092974268256817 ],
            [ 'sin("a")', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'cos()', () => {
        [
            [ 'cos(2)', g.doc, -0.4161468365471424 ],
            //['cos("a")', g.doc, NaN],
            [ 'cos("NaN")', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'tan()', () => {
        [
            [ 'tan(2)', g.doc, -2.185039863261519 ],
            [ 'tan("a")', g.doc, NaN ],
            [ 'tan("NaN")', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'acos()', () => {
        [
            [ 'acos(0.5)', g.doc, 1.047197551196598 ],
            [ 'acos(-1)', g.doc, 3.141592653589793 ],
            [ 'acos(2)', g.doc, NaN ],
            [ 'acos("a")', g.doc, NaN ],
            [ 'acos("NaN")', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            // rounding error on Travis
            expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'asin()', () => {
        [
            [ 'asin(0.5)', g.doc, 0.523598775598299 ],
            [ 'asin(-1)', g.doc, -1.570796326794896 ],
            [ 'asin(2)', g.doc, NaN ],
            [ 'asin("a")', g.doc, NaN ],
            [ 'asin("NaN")', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            // rounding error on Travis
            expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'atan()', () => {
        [
            [ 'atan(0.5)', g.doc, 0.463647609000806 ],
            [ 'atan(-1)', g.doc, -0.785398163397448 ],
            [ 'atan("a")', g.doc, NaN ],
            [ 'atan("NaN")', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            // rounding error on Travis
            expect( Math.round( result.numberValue * ( 10 ** 15 ) ) / ( 10 ** 15 ) ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'atan2()', () => {
        [
            [ 'atan2(2,3)', g.doc, 0.5880026035475675 ],
            [ 'atan2(2, "NaN")', g.doc, NaN ],
            [ 'atan2(2, "a")', g.doc, NaN ],
            [ 'atan2("NaN", 2)', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'log()', () => {
        [
            [ 'log(2)', g.doc, 0.6931471805599453 ],
            [ 'log("NaN")', g.doc, NaN ],
            [ 'log("a")', g.doc, NaN ],
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'log10()', () => {
        [
            [ 'log10(2)', g.doc, 0.3010299956639812 ],
            [ 'log10("NaN")', g.doc, NaN ],
            [ 'log10("a")', g.doc, NaN ],
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'pi()', () => {
        [
            [ 'pi()', g.doc, 3.141592653589793 ],
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'exp()', () => {
        [
            [ 'exp(2)', g.doc, 7.38905609893065 ],
            [ 'exp("NaN")', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'exp10()', () => {
        [
            [ 'exp10(2)', g.doc, 100 ],
            [ 'exp10(-2)', g.doc, 0.01 ],
            [ 'exp10("NaN")', g.doc, NaN ],
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'sqrt()', () => {
        [
            [ 'sqrt(4)', g.doc, 2 ],
            [ 'sqrt(-2)', g.doc, NaN ],
            [ 'sqrt("NaN")', g.doc, NaN ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 2 ] );
        } );
    } );

    it( 'once()', () => {
        let result;

        // attempt to change value of empty node
        result = g.doc.evaluate( "once('aa')", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), null, g.win.XPathResult.STRING_TYPE, null );
        expect( result.stringValue ).to.equal( "aa" );

        // attempt to change value of node with existing value
        result = g.doc.evaluate( "once('aa')", g.doc.getElementById( 'FunctionSelectedCaseSingle' ), null, g.win.XPathResult.STRING_TYPE, null );
        expect( result.stringValue ).to.equal( "ab" );

        // controversial: attempt to change value to NaN of empty node
        result = g.doc.evaluate( "once(. * 10)", g.doc.getElementById( 'FunctionSelectedCaseEmpty' ), null, g.win.XPathResult.STRING_TYPE, null );
        expect( result.stringValue ).to.equal( "" );

        // controversial: attempt to change value to Infinity of empty node
        // result = g.doc.evaluate("once( 1 div 0)", g.doc.getElementById('FunctionSelectedCaseEmpty'), null, g.win.XPathResult.STRING_TYPE, null);
        // expect(result.stringValue).to.equal("");
    } );

    describe( 'distance() and area() functions', () => {
        const SHAPE1 = '7.9377 -11.5845 0 0;7.9324 -11.5902 0 0;7.927 -11.5857 0 0;7.925 -11.578 0 0;7.9267 -11.5722 0 0;7.9325 -11.5708 0 0;7.9372 -11.5737 0 0;7.9393 -11.579 0 0;7.9377 -11.5845 0 0';
        const TRACE1 = '38.253094215699576 21.756382658677467;38.25021274773806 21.756382658677467;38.25007793942195 21.763892843919166;38.25290886154963 21.763935759263404;38.25146813817506 21.758421137528785';
        const TRACE2 = '38.25304740874071 21.75644703234866;38.25308110946615 21.763377860443143;38.25078942453431 21.763399318115262;38.25090738066984 21.756640151397733;38.25197740258244 21.75892539347842';
        const TRACE3 = '38.252845204059824 21.763313487426785;38.25303055837213 21.755867675201443;38.25072202094234 21.755803302185086;38.25062091543717 21.76294870700076;38.25183417221606 21.75692982997134';
        const LINE = '7.9377 -11.5845 0 0;7.9324 -11.5902 0 0';
        const SAME = '7.9377 -11.5845 0 0;7.9377 -11.5845 0 0';

        [
            [ SHAPE1, 2333220.77, 5724.36 ],
            [ TRACE1, 151451.76, 1800.69 ],
            [ TRACE2, 122754.94, 1684.62 ],
            [ TRACE3, 93911.49, 2076.24 ],
            [ LINE, 0.0, 861.99 ],
            [ SAME, 0.0, 0.0 ],
            [ '0 0;0 1', 0.0, 111318.85 ],
            [ '0 0;0 90', 0.0, 10018696.05 ],
            [ '90 0;90 1', 0.0, 0.0 ],
            [ '5000 5000; 5000 5000', NaN, NaN ],
            [ 'a', NaN, NaN ],
            [ '', NaN, NaN ],
        ].forEach( ( t, i ) => {
            const param = t[ 0 ];
            it( `area() works (${i+1})`, () => {
                const result = g.doc.evaluate( `area("${param}")`, g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
                expect( result.numberValue ).to.deep.equal( t[ 1 ] );
            } );
            it( `distance() works (${i+1})`, () => {
                const result = g.doc.evaluate( `distance("${param}")`, g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
                expect( result.numberValue ).to.deep.equal( t[ 2 ] );
            } );
        } );

        [
            [ 'FunctionArea1', './*', 2333220.77, 5724.36 ],
            [ 'FunctionArea4', '.', 2333220.77, 5724.36 ],
            [ 'FunctionArea2', './*', 122754.94, 1684.62 ],
            [ 'FunctionArea3', './*', 93911.49, 2076.24 ],
        ].forEach( ( t, i ) => {
            const id = t[ 0 ];
            const param = t[ 1 ];
            it( `area() works (${i+1})`, () => {
                const result = g.doc.evaluate( `area(${param})`, g.doc.getElementById( id ), null, g.win.XPathResult.NUMBER_TYPE, null );
                expect( result.numberValue ).to.deep.equal( t[ 2 ] );
            } );
            it( `distance() works (${i+1})`, () => {
                const result = g.doc.evaluate( `distance(${param})`, g.doc.getElementById( id ), null, g.win.XPathResult.NUMBER_TYPE, null );
                expect( result.numberValue ).to.deep.equal( t[ 3 ] );
            } );
        } );

        it( 'throws error when no parameters are provided', () => {
            [ 'area()', 'distance()' ].forEach( t => {
                const test = () => {
                    g.doc.evaluate( `area(${t})`, g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
                };
                expect( test ).to.throw( g.win.Error );
            } );
        } );
    } );

    it( 'ends-with', () => {
        [
            [ "ends-with('', '')", true ],
            [ "ends-with('a', '')", true ],
            [ "ends-with('a', 'a')", true ],
            [ "ends-with('a', 'b')", false ],
            [ "ends-with('ba', 'a')", true ],
            [ "ends-with('', 'b')", false ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
            expect( result.booleanValue ).to.equal( t[ 1 ] );
        } );
    } );

    it( 'ends-with() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "ends-with(1, 2, 3)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'ends-with() fails when not enough arguments are provided', () => {
        let test = () => {
            g.doc.evaluate( "ends-with()", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );

        test = () => {
            g.doc.evaluate( "ends-with(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'abs', () => {
        [
            [ 'abs(10.5)', 10.5 ],
            [ 'abs(-10.5)', 10.5 ],
            [ 'abs("-10.5")', 10.5 ],
            [ 'abs("a")', NaN ],
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, null, g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 1 ] );
        } );
    } );

    it( 'count-non-empty', () => {
        [
            [ 'count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:div)', 2 ],
            [ 'count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p)', 1 ],
            [ 'count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p/xhtml:div)', 0 ],
            [ 'count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p/xhtml:span)', 2 ],
            [ 'count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]//*)', 5 ],
            [ 'count-non-empty(//xhtml:div[@id="NoExist"]/xhtml:div)', 0 ],

        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.deep.equal( t[ 1 ] );
        } );
    } );

    it( 'count-non-empty fails when too few, too many, or incorrect arguments are provided', () => {
        [
            'count-non-empty()',
            'count-non-empty(2)',
            'count-non-empty(0)',
            'count-non-empty("a")',
        ].forEach( t => {
            const test = () => {
                g.doc.evaluate( t, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            };
            expect( test ).to.throw( g.win.Error );
        } );

    } );

    describe( 'randomize() shuffles nodesets', () => {
        const SELECTOR = '//xhtml:div[@id="FunctionRandomize"]/xhtml:div';

        it( 'without a seed', () => {
            const result = g.doc.evaluate( `randomize(${SELECTOR})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
            const nodes = [];
            let text = '';
            for ( let j = 0; j < result.snapshotLength; j++ ) {
                const node = result.snapshotItem( j );
                nodes.push( node );
                text += node.textContent;
            }
            expect( nodes.length ).to.equal( 6 );
            expect( text.length ).to.equal( 6 );
            expect( text ).not.to.equal( 'ABCDEF' );
        } );

        [
            [ 42, 'AFCBDE' ],
            [ '42', 'AFCBDE' ],
            [ -42, 'EDAFBC' ],
            [ 1, 'BFEACD' ],
            [ 11111111, 'ACDBFE' ],
            [ 'int(1)', 'BFEACD' ],
            [ 'floor(1.1)', 'BFEACD' ],
            [ '//xhtml:div[@id="testFunctionNodeset2"]/xhtml:p', 'BFEACD' ]
        ].forEach( t => {
            it( `with a seed: ${t[0]}`, () => {
                const result = g.doc.evaluate( `randomize(${SELECTOR},${t[0]})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
                let text = '';
                for ( let j = 0; j < result.snapshotLength; j++ ) {
                    text += result.snapshotItem( j ).textContent;
                }
                expect( text ).to.equal( t[ 1 ] );
            } );
        } );

        [
            'randomize()',
            `randomize(${SELECTOR}, 'a')`,
            `randomize(${SELECTOR}, 1, 2)`,
        ].forEach( t => {
            it( `with invalid args (${t}), throws an error`, () => {
                const test = () => {
                    g.doc.evaluate( t, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
                };
                expect( test ).to.throw( g.win.Error );
            } );
        } );

    } );

    describe( 'decimal-date()', () => {
        [
            [ '"1970-01-01T00:00:00.000Z"', 0.000 ],
            [ '"1970-01-02T00:00:00.000Z"', 1.000 ],
            [ '"2018-04-24T15:30:00.000+06:00"', 17645.396 ],
        ].forEach( t => {
            it( `decimates dates ${t[0]} to ${t[1]}`, () => {
                const result = g.doc.evaluate( `decimal-date-time(${t[0]})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
                expect( result.numberValue ).to.deep.equal( t[ 1 ] );
            } );
        } );

        [
            '',
            '"1970-01-01T00:00:00.000Z", 2',
        ].forEach( t => {
            it( `with invalid args (${t}), throws an error`, () => {
                const test = () => {
                    g.doc.evaluate( `decimal-date-time(${t})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
                };
                expect( test ).to.throw( g.win.Error );
            } );
        } );
    } );

    describe( 'decimal-time()', () => {
        [
            [ '"06:00:00.000-07:00"', 0.250 ],
            [ '"06:00:00.000-01:00"', 0.000 ],
            [ '"06:30:00.000-07:00"', 0.271 ],
            [ '"06:00:59.000-07:00"', 0.251 ],
            [ '"23:59:00.000-07:00"', 0.999 ],
            [ '"23:59:00.000-13:00"', 0.249 ],
            [ '"a"', NaN ],
            [ '2', NaN ],
            [ '"24:00:00.000-07:00"', NaN ],
            [ '"06:00:00.000-24:00"', NaN ],
            [ '"06:60:00.000-07:00"', NaN ],
            [ '"06:00:60.000-07:00"', NaN ],
            [ '"23:59:00.000-07:60"', NaN ],
            [ 'now()', NaN ],
        ].forEach( t => {
            it( `decimates time ${t[0]} to ${t[1]}`, () => {
                const result = g.doc.evaluate( `decimal-time(${t[0]})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
                expect( result.numberValue ).to.deep.equal( t[ 1 ] );
            } );
        } );

        [
            [ 'decimal-time("12:00:00.000-07:00") - decimal-time("06:00:00.000-07:00")', 0.250 ],
        ].forEach( t => {
            it( `facilitates time calculations and evaluates ${t[0]} to ${t[1]}`, () => {
                const result = g.doc.evaluate( t[ 0 ], g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
                expect( result.numberValue ).to.deep.equal( t[ 1 ] );
            } );
        } );

        [
            '',
            '"06:00:00.000-07:00", 2',
        ].forEach( t => {
            it( `with invalid args (${t}), throws an error`, () => {
                const test = () => {
                    g.doc.evaluate( `decimal-time(${t})`, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
                };
                expect( test ).to.throw( g.win.Error );
            } );
        } );
    } );

    /*
     This function is now supported by translating it into regular XPath before passing to this evaluator.
    it('indexed-repeat()', function() {
        [
            // targeting div child of #testXPathEvaluate
            ["indexed-repeat(xhtml:div/xhtml:div, xhtml:div, 2)", g.doc.getElementById('body'), 'some text'],
            // targeting 3rd p-element in #testFunctionNodeset3
            ["indexed-repeat(xhtml:div/xhtml:p, xhtml:div, 3)", g.doc.getElementById('testFunctionNodeset3'), '3'],
            // targeting 3rd p-element in #testFunctionNodeset3, in a more complex manner (triple-nested repeats)
            ["indexed-repeat(xhtml:div/xhtml:div/xhtml:div/xhtml:p, xhtml:div, 4, xhtml:div/xhtml:div, 2, xhtml:div/xhtml:div/xhtml:div, 3)", g.doc.getElementById('body'), '3']
        ].forEach(function(t) {
            var result = g.doc.evaluate(t[0], t[1], helpers.getXhtmlResolver(g.doc), g.win.XPathResult.STRING_TYPE, null);
            expect(result.stringValue).to.equal(t[2]);
        });
    });
    */

    /*
    This function is now supported by translating it into regular XPath before passing to this evaluator.
    it('indexed-repeat() with invalid args', function() {
        [
            // targeting div child of #testXPathEvaluate
            ["indexed-repeat(xhtml:div/xhtml:div, xhtml:div, 2, xhtml:div)", g.doc.getElementById('body'), 'some text'],
        ].forEach(function(t) {
            result = g.doc.evaluate(t[0], t[1], helpers.getXhtmlResolver(g.doc), g.win.XPathResult.STRING_TYPE, null);
            Y.Assert.areSame(51, g.win.XPathException.INVALID_EXPRESSION_ERR);
        });
    });
    */

    /*
    it('sum() according to erratic javarosa implementation', function() {
        [
            ["sum_jr(self::*)", g.doc.getElementById('FunctionNumberCaseNumber'), 123],
            ["sum_jr(*)", g.doc.getElementById('FunctionNumberCaseNumberMultiple'), 100],
            ["sum_jr(*)", g.doc.getElementById('FunctionSumCaseJavarosa'), 5]
        ].forEach(function(t) {
            var result = g.doc.evaluate(t[0], t[1], null, g.win.XPathResult.NUMBER_TYPE, null);
            expect(result.numberValue).to.equal(t[2]);
        })

        [
            ["sum_jr(node())", g.doc.getElementById('FunctionNumberCaseNotNumberMultiple')]
        ].forEach(function(t) {
            var result = g.doc.evaluate(t[0], t[1], null, g.win.XPathResult.NUMBER_TYPE, null);
            expect(result.numberValue).to.be.a('number');
        });
    });
    */

    describe( 'custom XPath functions', () => {

        afterEach( () => {
            g.win.XPathJS.customXPathFunction.remove( 'comment-status' );
        } );

        xit( 'can be added', () => {
            const obj = {
                status: 'good'
            };
            const node = g.doc.getElementById( 'FunctionCustom' );
            node.textContent = JSON.stringify( obj );

            const test1 = () => g.doc.evaluate( 'comment-status(.)', node, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );

            // Check the function doesn't exist before.
            // expect( test1 ).to.throw( /does not exist/ );
            expect( test1 ).to.throw( /Failed to execute/ );

            // Add custom function
            g.win.XPathJS.customXPathFunction.add( 'comment-status', {
                fn( a ) {
                    const curValue = a.toString();
                    let status = '';

                    try {
                        status = JSON.parse( curValue ).status;
                    } catch ( e ) {
                        console.error( 'Could not parse JSON from', curValue );
                    }

                    return new g.win.XPathJS.customXPathFunction.type.StringType( status );
                },
                args: [ {
                    t: 'string'
                } ],
                ret: 'string'
            } );

            // Check functioning:
            const result = test1();
            expect( result.stringValue ).to.equal( obj.status );

            // Check parameter errors:
            const test2 = () => {
                g.doc.evaluate( 'comment-status(., 2)', node, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            };
            expect( test2 ).to.throw( g.win.Error );

        } );

    } );

} );
