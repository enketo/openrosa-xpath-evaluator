import { g } from '../docwin';
import helpers from '../helpers';

describe( 'native nodeset functions', () => {

    it( 'last()', () => {
        [
            [ "last()", 1 ],
            //TODO vimago [ "xhtml:p[last()]", 4 ],
            //TODO vimago [ "xhtml:p[last()-last()+1]", 1 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc.getElementById( 'testFunctionNodeset2' ), helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );
    } );

    it( 'last() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "last(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'position()', () => {
        [
            //TODO vimago [ "position()", 1 ],
            [ "*[position()=last()]", 4 ],
            [ "*[position()=2]", 2 ],
            [ "xhtml:p[position()=2]", 2 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc.getElementById( 'testFunctionNodeset2' ), helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );

        } );

        [
            [ "*[position()=-1]", "" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc.getElementById( 'testFunctionNodeset2' ), helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( t[ 1 ] );
        } );
    } );

    it( 'position() fails when too many args are provided', () => {
        const test = () => {
            g.doc.evaluate( "position(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'count()', () => {
        [
            [ "count(xhtml:p)", 4 ],
            [ "count(p)", 0 ],
            [ "count(//nonexisting)", 0 ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], g.doc.getElementById( 'testFunctionNodeset2' ), helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
            expect( result.numberValue ).to.equal( t[ 1 ] );
        } );

        /*
        [
            ["count(.)", g.doc.getElementsByName('##########'),1]
        ].forEach(function(t){
            var result = g.doc.evaluate(t[0], t[1], helpers.getXhtmlResolver(doc), g.win.XPathResult.NUMBER_TYPE, null);
            expect(result.numberValue).to.equal(t[2]);
        });
        */
    } );

    it( 'count() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "count(1, 2)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'count() fails when too few arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "count()", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'count() fails when incorrect argument type is provided', () => {
        const test = () => {
            g.doc.evaluate( "count(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'local-name()', () => {
        let result;
        let input;
        let i;
        let node;
        const nodeWithAttributes = g.doc.getElementById( 'testFunctionNodesetAttribute' );
        const nodeAttributes = helpers.filterAttributes( nodeWithAttributes.attributes );
        let nodeAttributesIndex;

        for ( i = 0; i < nodeAttributes.length; i++ ) {
            if ( nodeAttributes[ i ].nodeName == 'ev:class' ) {
                nodeAttributesIndex = i;
                break;
            }
        }

        input = [
            [ "local-name(/htmlnot)", g.doc, "" ], // empty
            [ "local-name()", g.doc, "" ], // document
            [ "local-name()", g.doc.documentElement, "html" ], // element
            [ "local-name(self::node())", g.doc.getElementById( 'testFunctionNodesetElement' ), "div" ], // element
            [ "local-name()", g.doc.getElementById( 'testFunctionNodesetElement' ), "div" ], // element
            [ "local-name()", g.doc.getElementById( 'testFunctionNodesetElementPrefix' ).firstChild, "div2" ], // element
            [ "local-name(node())", g.doc.getElementById( 'testFunctionNodesetElementNested' ), "span" ], // element nested
            [ "local-name(self::node())", g.doc.getElementById( 'testFunctionNodesetElementNested' ), "div" ], // element nested
            [ "local-name()", g.doc.getElementById( 'testFunctionNodesetComment' ).firstChild, "" ], // comment
            [ "local-name()", g.doc.getElementById( 'testFunctionNodesetText' ).firstChild, "" ], // text
            [ "local-name(attribute::node())", nodeWithAttributes, nodeAttributes[ 0 ].nodeName ], // attribute
            [ `local-name(attribute::node()[${nodeAttributesIndex + 1}])`, nodeWithAttributes, 'class' ] // attribute
        ];

        // Processing Instruction
        node = g.doc.getElementById( 'testFunctionNodesetProcessingInstruction' ).firstChild;
        if ( node && node.nodeType == 7 ) {
            input.push( [ "local-name()", node, 'xml-stylesheet' ] );
        }

        // CDATASection
        node = g.doc.getElementById( 'testFunctionNodesetCData' ).firstChild;
        if ( node && node.nodeType == 4 ) {
            input.push( [ "local-name()", node, '' ] );
        }

        for ( i = 0; i < input.length; i++ ) {
            result = g.doc.evaluate( input[ i ][ 0 ], input[ i ][ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue.toLowerCase() ).to.equal( input[ i ][ 2 ] );
        }
    } );

    it( 'local-name() with namespace', () => {
        [
            [ "local-name(namespace::node())", g.doc.getElementById( 'testFunctionNodesetNamespace' ), "" ],
            //TODO vimago [ "local-name(namespace::node()[2])", g.doc.getElementById( 'testFunctionNodesetNamespace' ), "asdf" ]
        ].forEach( t => {
            const result = g.doc.evaluate( t[ 0 ], t[ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue.toLowerCase() ).to.equal( t[ 2 ] );
        } );
    } );

    it( 'local-name() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "local-name(1, 2)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'local-name() fails when the wrong type argument is provided', () => {
        const test = () => {
            g.doc.evaluate( "local-name(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'namespace-uri()', () => {
        let result;
        let input;
        let i;
        let node;
        const nodeWithAttributes = g.doc.getElementById( 'testFunctionNodesetAttribute' );
        const nodeAttributes = helpers.filterAttributes( nodeWithAttributes.attributes );
        let nodeAttributesIndex;

        for ( i = 0; i < nodeAttributes.length; i++ ) {
            if ( nodeAttributes[ i ].nodeName == 'ev:class' ) {
                nodeAttributesIndex = i;
                break;
            }
        }

        input = [
            [ "namespace-uri(/htmlnot)", g.doc, "" ], // empty
            [ "namespace-uri()", g.doc, "" ], // document
            [ "namespace-uri()", g.doc.documentElement, "http://www.w3.org/1999/xhtml" ], // element
            [ "namespace-uri(self::node())", g.doc.getElementById( 'testFunctionNodesetElement' ), "http://www.w3.org/1999/xhtml" ], // element
            [ "namespace-uri()", g.doc.getElementById( 'testFunctionNodesetElement' ), "http://www.w3.org/1999/xhtml" ], // element
            [ "namespace-uri(node())", g.doc.getElementById( 'testFunctionNodesetElementNested' ), "http://www.w3.org/1999/xhtml" ], // element nested
            [ "namespace-uri(self::node())", g.doc.getElementById( 'testFunctionNodesetElementNested' ), "http://www.w3.org/1999/xhtml" ], // element nested
            [ "namespace-uri()", g.doc.getElementById( 'testFunctionNodesetElementPrefix' ).firstChild, "http://some-namespace.com/nss" ], // element
            [ "namespace-uri()", g.doc.getElementById( 'testFunctionNodesetComment' ).firstChild, "" ], // comment
            [ "namespace-uri()", g.doc.getElementById( 'testFunctionNodesetText' ).firstChild, "" ], // text
            [ "namespace-uri(attribute::node())", nodeWithAttributes, '' ], // attribute
            [ `namespace-uri(attribute::node()[${nodeAttributesIndex + 1}])`, nodeWithAttributes, 'http://some-namespace.com/nss' ], // attribute
            [ "namespace-uri(namespace::node())", g.doc.getElementById( 'testFunctionNodesetNamespace' ), "" ], // namespace
            //TODO vimago [ "namespace-uri(namespace::node()[2])", g.doc.getElementById( 'testFunctionNodesetNamespace' ), "" ] // namespace
        ];

        // Processing Instruction
        node = g.doc.getElementById( 'testFunctionNodesetProcessingInstruction' ).firstChild;
        if ( node && node.nodeType == 7 ) {
            input.push( [ "namespace-uri()", node, '' ] );
        }

        // CDATASection
        node = g.doc.getElementById( 'testFunctionNodesetCData' ).firstChild;
        if ( node && node.nodeType == 4 ) {
            input.push( [ "namespace-uri()", node, '' ] );
        }

        for ( i = 0; i < input.length; i++ ) {
            result = g.doc.evaluate( input[ i ][ 0 ], input[ i ][ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( input[ i ][ 2 ] );
        }
    } );

    it( 'namespace-uri() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "namespace-uri(1, 2)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'namespace-uri() fails when wrong type of argument is provided', () => {
        const test = () => {
            g.doc.evaluate( "namespace-uri(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'name()', () => {
        let result;
        let input;
        let i;
        let node;
        const nodeWithAttributes = g.doc.getElementById( 'testFunctionNodesetAttribute' );
        const nodeAttributes = helpers.filterAttributes( nodeWithAttributes.attributes );
        let nodeAttributesIndex;

        for ( i = 0; i < nodeAttributes.length; i++ ) {
            if ( nodeAttributes[ i ].nodeName == 'ev:class' ) {
                nodeAttributesIndex = i;
                break;
            }
        }

        input = [
            [ "name(/htmlnot)", g.doc, "" ], // empty
            [ "name()", g.doc, "" ], // document
            [ "name()", g.doc.documentElement, "html" ], // element
            [ "name(self::node())", g.doc.getElementById( 'testFunctionNodesetElement' ), "div" ], // element
            [ "name()", g.doc.getElementById( 'testFunctionNodesetElement' ), "div" ], // element
            [ "name(node())", g.doc.getElementById( 'testFunctionNodesetElementNested' ), "span" ], // element nested
            //TODO vimago [ "name(self::node())", g.doc.getElementById( 'testFunctionNodesetElementNested' ), "div" ], // element nested
            [ "name()", g.doc.getElementById( 'testFunctionNodesetElementPrefix' ).firstChild, "ev:div2" ], // element
            [ "name()", g.doc.getElementById( 'testFunctionNodesetComment' ).firstChild, "" ], // comment
            [ "name()", g.doc.getElementById( 'testFunctionNodesetText' ).firstChild, "" ], // text
            [ "name(attribute::node())", nodeWithAttributes, nodeAttributes[ 0 ].nodeName ], // attribute
            [ `name(attribute::node()[${nodeAttributesIndex + 1}])`, nodeWithAttributes, 'ev:class' ], // attribute
            [ "name(namespace::node())", g.doc.getElementById( 'testFunctionNodesetNamespace' ), "" ], // namespace
            //TODO vimago [ "name(namespace::node()[2])", g.doc.getElementById( 'testFunctionNodesetNamespace' ), "asdf" ] // namespace
        ];

        // Processing Instruction
        node = g.doc.getElementById( 'testFunctionNodesetProcessingInstruction' ).firstChild;
        if ( node && node.nodeType == 7 ) {
            input.push( [ "name()", node, 'xml-stylesheet' ] );
        }

        // CDATASection
        node = g.doc.getElementById( 'testFunctionNodesetCData' ).firstChild;
        if ( node && node.nodeType == 4 ) {
            input.push( [ "name()", node, '' ] );
        }

        for ( i = 0; i < input.length; i++ ) {
            result = g.doc.evaluate( input[ i ][ 0 ], input[ i ][ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
            expect( result.stringValue ).to.equal( input[ i ][ 2 ] );
        }
    } );

    it( 'name() fails when too many arguments are provided', () => {
        const test = () => {
            g.doc.evaluate( "name(1, 2)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );

    it( 'name() fails when the wrong argument type is provided', () => {
        const test = () => {
            g.doc.evaluate( "name(1)", g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.NUMBER_TYPE, null );
        };
        expect( test ).to.throw( g.win.Error );
    } );
} );
