import { g } from '../docwin';

describe( 'Comparison operator', () => {
    it( 'correctly evaluates = and !=', () => {
        let result;
        let input;
        let i;
        let expr;
        let j;
        let k;
        const ops = [ '=', '!=' ];

        input = [
            [
                [ "1", "1" ],
                [ true, false ], g.doc
            ],
            [
                [ "1", "0" ],
                [ false, true ], g.doc
            ],
            [
                [ "1", "'1'" ],
                [ true, false ], g.doc
            ],
            [
                [ "1", "'0'" ],
                [ false, true ], g.doc
            ],
            [
                [ "1", "true()" ],
                [ true, false ], g.doc
            ],
            [
                [ "1", "false()" ],
                [ false, true ], g.doc
            ],
            [
                [ "0", "false()" ],
                [ true, false ], g.doc
            ],
            [
                [ "-10", "*" ],
                [ false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "4", "*" ],
                [ true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "4.3", "*" ],
                [ false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "0", "*" ],
                [ false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],

            [
                [ "true()", "true()" ],
                [ true, false ], g.doc
            ],
            [
                [ "false()", "false()" ],
                [ true, false ], g.doc
            ],
            [
                [ "true()", "false()" ],
                [ false, true ], g.doc
            ],
            [
                [ "true()", "'1'" ],
                [ true, false ], g.doc
            ],
            [
                [ "true()", "''" ],
                [ false, true ], g.doc
            ],
            [
                [ "false()", "'0'" ],
                [ false, true ], g.doc
            ],
            [
                [ "false()", "''" ],
                [ true, false ], g.doc
            ],
            [
                [ "true()", "*" ],
                [ true, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "false()", "*" ],
                [ false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "true()", "*" ],
                [ false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],
            [
                [ "false()", "*" ],
                [ true, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],

            [
                [ "'1a'", "'1a'" ],
                [ true, false ], g.doc
            ],
            [
                [ "'1'", "'0'" ],
                [ false, true ], g.doc
            ],
            [
                [ "''", "''" ],
                [ true, false ], g.doc
            ],
            [
                [ "''", "'0'" ],
                [ false, true ], g.doc
            ],
            [
                [ "'aaa'", "*" ],
                [ true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )
            ],
            [
                [ "'bb'", "*" ],
                [ false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )
            ],
            [
                [ "''", "*" ],
                [ false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )
            ],
            [
                [ "''", "*" ],
                [ false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],

            // TODO vimago
            // [
            //     [ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodesetEmpty')/*" ],
            //     [ false, false ], g.doc
            // ],
            // [
            //     [ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodeset4to8')/*" ],
            //     [ true, true ], g.doc
            // ],
            // [
            //     [ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodeset6to10')/*" ],
            //     [ false, true ], g.doc
            // ]
        ];

        for ( k = 0; k < ops.length; k++ ) // different operators
        {
            for ( j = 0; j < 2; j++ ) // switch parameter order
            {
                for ( i = 0; i < input.length; i++ ) // all cases
                {
                    expr = `${input[i][0][j % 2]} ${ops[k]} ${input[i][0][(j + 1) % 2]}`;
                    result = g.doc.evaluate( expr, input[ i ][ 2 ], null, g.win.XPathResult.BOOLEAN_TYPE, null );
                    expect( result.booleanValue ).to.equal( input[ i ][ 1 ][ k ] );
                }
            }
        }
    } );

    it( 'correctly evaluates <, <=, > and >=', () => {
        let result;
        let input;
        let i;
        let expr;
        let k;
        const ops = [ '<', '<=', '>', '>=' ];

        input = [
            [
                [ "1", "2" ],
                [ true, true, false, false ], g.doc
            ],
            [
                [ "1", "1" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "1", "0" ],
                [ false, false, true, true ], g.doc
            ],
            [
                [ "1", "'2'" ],
                [ true, true, false, false ], g.doc
            ],
            [
                [ "1", "'1'" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "1", "'0'" ],
                [ false, false, true, true ], g.doc
            ],
            [
                [ "2", "true()" ],
                [ false, false, true, true ], g.doc
            ],
            [
                [ "1", "true()" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "1", "false()" ],
                [ false, false, true, true ], g.doc
            ],
            [
                [ "0", "false()" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "0", "true()" ],
                [ true, true, false, false ], g.doc
            ],
            [
                [ "-10", "*" ],
                [ true, true, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "10", "*" ],
                [ false, false, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "5", "*" ],
                [ false, true, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "2", "*" ],
                [ true, true, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "0", "*" ],
                [ false, false, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],

            [
                [ "true()", "2" ],
                [ true, true, false, false ], g.doc
            ],
            [
                [ "true()", "1" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "false()", "1" ],
                [ true, true, false, false ], g.doc
            ],
            [
                [ "false()", "0" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "true()", "0" ],
                [ false, false, true, true ], g.doc
            ],
            [
                [ "true()", "true()" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "true()", "false()" ],
                [ false, false, true, true ], g.doc
            ],
            [
                [ "false()", "false()" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "false()", "true()" ],
                [ true, true, false, false ], g.doc
            ],
            [
                [ "true()", "'1'" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "true()", "''" ],
                [ false, false, false, false ], g.doc
            ],
            [
                [ "false()", "'0'" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "false()", "''" ],
                [ false, false, false, false ], g.doc
            ],
            [
                [ "true()", "*" ],
                [ false, true, false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "true()", "*" ],
                [ false, false, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],
            [
                [ "false()", "*" ],
                [ true, true, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "false()", "*" ],
                [ false, true, false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],

            [
                [ "'2'", "1" ],
                [ false, false, true, true ], g.doc
            ],
            [
                [ "'1'", "1" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "'0'", "1" ],
                [ true, true, false, false ], g.doc
            ],
            [
                [ "'1'", "true()" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "''", "true()" ],
                [ false, false, false, false ], g.doc
            ],
            [
                [ "'0'", "false()" ],
                [ false, true, false, true ], g.doc
            ],
            [
                [ "''", "false()" ],
                [ false, false, false, false ], g.doc
            ],
            [
                [ "'1a'", "'1a'" ],
                [ false, false, false, false ], g.doc
            ],
            [
                [ "'1'", "'0'" ],
                [ false, false, true, true ], g.doc
            ],
            [
                [ "''", "''" ],
                [ false, false, false, false ], g.doc
            ],
            [
                [ "''", "'0'" ],
                [ false, false, false, false ], g.doc
            ],
            [
                [ "'4'", "*" ],
                [ true, true, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "'aaa'", "*" ],
                [ false, false, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )
            ],
            [
                [ "''", "*" ],
                [ false, false, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],

            [
                [ "*", "-10" ],
                [ false, false, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "*", "10" ],
                [ true, true, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "*", "5" ],
                [ true, true, false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "*", "2" ],
                [ true, true, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "*", "0" ],
                [ false, false, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],
            [
                [ "*", "true()" ],
                [ false, true, false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "*", "true()" ],
                [ true, true, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],
            [
                [ "*", "false()" ],
                [ false, false, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "*", "false()" ],
                [ false, true, false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],
            [
                [ "*", "'4'" ],
                [ true, true, true, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
            ],
            [
                [ "*", "'aaa'" ],
                [ false, false, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )
            ],
            [
                [ "*", "''" ],
                [ false, false, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )
            ],
            // TODO vimago
            // [
            //     [ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodesetEmpty')/*" ],
            //     [ false, false, false, false ], g.doc
            // ],
            // [
            //     [ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodeset4to8')/*" ],
            //     [ true, true, true, true ], g.doc
            // ],
            // [
            //     [ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodeset6to10')/*" ],
            //     [ true, true, false, false ], g.doc
            // ]
        ];

        for ( k = 0; k < ops.length; k++ ) // different operators
        {
            for ( i = 0; i < input.length; i++ ) // all cases
            {
                expr = `${input[i][0][0]} ${ops[k]} ${input[i][0][1]}`;
                result = g.doc.evaluate( expr, input[ i ][ 2 ], null, g.win.XPathResult.BOOLEAN_TYPE, null );
                expect( result.booleanValue ).to.equal( input[ i ][ 1 ][ k ] );
            }
        }
    } );
} );
