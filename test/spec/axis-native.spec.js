import helpers from '../helpers';
import { g } from '../docwin';

describe( 'axes', () => {

    let h;

    before( () => {
        h = {
            getNodeAttribute() {
                let attribute;
                const node = g.doc.getElementById( 'testStepAxisNodeAttribute' );
                let i;

                for ( i = 0; i < node.attributes.length; i++ ) {
                    if ( node.attributes[ i ].specified ) {
                        attribute = node.attributes[ i ];
                        break;
                    }
                }
                expect( typeof attribute ).to.equal( 'object' );
                //expect( attribute ).to.be.an( 'object' ); // why does this fail?

                return attribute;
            },

            getNodeComment() {
                return g.doc.getElementById( 'testStepAxisNodeComment' ).firstChild;
            },

            getNodeCData() {
                return g.doc.getElementById( 'testStepAxisNodeCData' ).firstChild;
            },

            getNodeProcessingInstruction() {
                return g.doc.getElementById( 'testStepAxisNodeProcessingInstruction' ).firstChild;
            },

            getNodeNamespace() {
                let result;

                result = g.doc.evaluate( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace' ), null, g.win.XPathResult.ANY_UNORDERED_NODE_TYPE, null );
                return result.singleNodeValue;
            },

            followingSiblingNodes( node ) {
                const nodes = [];

                while ( ( node = node.nextSibling ) ) {
                    nodes.push( node );
                }

                return nodes;
            },

            precedingSiblingNodes( node ) {
                const nodes = [];

                while ( ( node = node.previousSibling ) ) {
                    // Browsers do return this. Is this ok?
                    // if ( node.nodeType == 10 )
                    //     continue;
                    nodes.push( node );
                }

                nodes.reverse();

                return nodes;
            },

            followingNodes( node ) {
                const nodes = [];
                let i;
                let nodesAll;
                let result;
                let node2;

                nodesAll = helpers.getAllNodes( g.doc );

                for ( i = 0; i < nodesAll.length; i++ ) {
                    node2 = nodesAll[ i ]; //
                    if ( node2.nodeType == 10 ) // document type node
                        continue; //
                    result = helpers.comparePosition( node, node2 );
                    if ( 4 === result ) {
                        nodes.push( node2 );
                    }
                }

                return nodes;
            },

            precedingNodes( node ) {
                const nodes = [];
                let i;
                let nodesAll;
                let result;
                let node2;

                nodesAll = helpers.getAllNodes( g.doc );

                for ( i = 0; i < nodesAll.length; i++ ) {
                    node2 = nodesAll[ i ];
                    // Browsers do return this. Is this ok?
                    // if ( node2.nodeType == 10 ) // document type node
                    //     continue;

                    result = helpers.comparePosition( node, node2 );
                    if ( 2 == result ) {
                        nodes.push( node2 );
                    }
                }

                return nodes;
            }

        };

    } );

    describe( 'self axis', () => {

        it( 'works with document context', () => {
            helpers.checkNodeResult( "self::node()", g.doc, [ g.doc ] );
        } );

        it( 'works with documentElement context', () => {
            helpers.checkNodeResult( "self::node()", g.doc.documentElement, [ g.doc.documentElement ] );
        } );

        it( 'works with element context', () => {
            helpers.checkNodeResult( "self::node()", g.doc.getElementById( 'testStepAxisChild' ), [ g.doc.getElementById( 'testStepAxisChild' ) ] );
        } );

        it( 'works with element attribute context', () => {
            helpers.checkNodeResult( "self::node()", h.getNodeAttribute(), [ h.getNodeAttribute() ] );
        } );

        it( 'works with CData context', () => {
            helpers.checkNodeResult( "self::node()", h.getNodeCData(), [ h.getNodeCData() ] );
        } );

        it( 'works with comment context', () => {
            helpers.checkNodeResult( "self::node()", h.getNodeComment(), [ h.getNodeComment() ] );
        } );

        it( 'works with node processing instruction context', () => {
            helpers.checkNodeResult( "self::node()", h.getNodeProcessingInstruction(), [ h.getNodeProcessingInstruction() ] );
        } );

        it( 'works with node namespace context', () => {
            helpers.checkNodeResult( "self::node()", h.getNodeNamespace(), [ h.getNodeNamespace() ] );
        } );

        it( 'works with document fragment context', () => {
            const fragment = g.doc.createDocumentFragment();
            const test = () => {
                helpers.checkNodeResult( "self::node()", fragment, [ fragment ] );
            };
            expect( test ).to.throw( g.win.Error );
        } );

    } );

    describe( 'child axis', () => {

        it( 'works with document context', () => {
            let i;
            const expectedResult = [];

            for ( i = 0; i < g.doc.childNodes.length; i++ ) {
                // Browsers do return this type of nodes. Is this ok?
                // if ( g.doc.childNodes.item( i ).nodeType == 1 ||
                //     g.doc.childNodes.item( i ).nodeType == 8 ) {
                expectedResult.push( g.doc.childNodes.item( i ) );
                // }
            }

            helpers.checkNodeResult( "child::node()", g.doc, expectedResult );
        } );

        it( 'works with documentElement context', () => {
            helpers.checkNodeResult( "child::node()", g.doc.documentElement, g.doc.documentElement.childNodes );
        } );

        it( 'works with element context', () => {
            helpers.checkNodeResult( "child::node()", g.doc.getElementById( 'testStepAxisChild' ),
                g.doc.getElementById( 'testStepAxisChild' ).childNodes );
        } );

        it( 'works with attribute context', () => {
            helpers.checkNodeResult( "child::node()", h.getNodeAttribute(), [] );
        } );

        it( 'works with CData context', () => {
            helpers.checkNodeResult( "child::node()", h.getNodeCData(), [] );
        } );

        it( 'works with a comment context', () => {
            helpers.checkNodeResult( "child::node()", h.getNodeComment(), [] );
        } );

        it( 'works with a processing instruction context', () => {
            helpers.checkNodeResult( "child::node()", h.getNodeProcessingInstruction(), [] );
        } );

        it( 'works with a namespace context', function() {
            helpers.checkNodeResult( "child::node()", h.getNodeNamespace(), [] );
        } );

    } );

    describe( 'descendendant axis', () => {

        it( 'works with Element context', () => {
            const descendantNodes = node => {
                const nodes = [];
                let i;

                for ( i = 0; i < node.childNodes.length; i++ ) {
                    nodes.push( node.childNodes.item( i ) );
                    nodes.push( ...descendantNodes( node.childNodes.item( i ) ) );
                }

                return nodes;
            };

            helpers.checkNodeResult( "descendant::node()", g.doc.getElementById( 'testStepAxisDescendant' ),
                descendantNodes( g.doc.getElementById( 'testStepAxisDescendant' ) ) );
        } );

        it( 'works with attribute context', () => {
            helpers.checkNodeResult( "descendant::node()", h.getNodeAttribute(), [] );
        } );

        it( 'works with CData context', () => {
            helpers.checkNodeResult( "descendant::node()", h.getNodeCData(), [] );
        } );

        it( 'works with a comment context', () => {
            helpers.checkNodeResult( "descendant::node()", h.getNodeComment(), [] );
        } );

        it( 'works with a processing instruction context', () => {
            helpers.checkNodeResult( "descendant::node()", h.getNodeProcessingInstruction(), [] );
        } );

        it( 'works with namespace context', () => {
            helpers.checkNodeResult( "descendant::node()", h.getNodeNamespace(), [] );
        } );

    } );

    describe( 'descendant-or-self axis', () => {

        it( 'works with element context', () => {
            let nodes;

            const descendantNodes = node => {
                const nodes = [];
                let i;
                for ( i = 0; i < node.childNodes.length; i++ ) {
                    nodes.push( node.childNodes.item( i ) );
                    nodes.push( ...descendantNodes( node.childNodes.item( i ) ) );
                }
                return nodes;
            };

            nodes = descendantNodes( g.doc.getElementById( 'testStepAxisDescendant' ) );
            nodes.unshift( g.doc.getElementById( 'testStepAxisDescendant' ) );
            helpers.checkNodeResult( "descendant-or-self::node()", g.doc.getElementById( 'testStepAxisDescendant' ), nodes );
        } );

        it( 'works with attribute context', () => {
            helpers.checkNodeResult( "descendant-or-self::node()", h.getNodeAttribute(), [
                h.getNodeAttribute()
            ] );
        } );

        it( 'works with CDATA context', () => {
            helpers.checkNodeResult( "descendant-or-self::node()", h.getNodeCData(), [
                h.getNodeCData()
            ] );
        } );

        it( 'works with a comment context', () => {
            helpers.checkNodeResult( "descendant-or-self::node()", h.getNodeComment(), [
                h.getNodeComment()
            ] );
        } );

        it( 'works with element context', () => {
            helpers.checkNodeResult( "descendant-or-self::node()", h.getNodeProcessingInstruction(), [
                h.getNodeProcessingInstruction()
            ] );
        } );

        it( 'works with a namspace context', () => {
            helpers.checkNodeResult( "descendant-or-self::node()", h.getNodeNamespace(), [
                h.getNodeNamespace()
            ] );
        } );

    } );

    describe( 'parent axis', () => {

        it( 'works with a document context', () => {
            helpers.checkNodeResult( "parent::node()", g.doc, [] );
        } );

        it( 'works with a documentElement context', () => {
            helpers.checkNodeResult( "parent::node()", g.doc.documentElement, [ g.doc ] );
        } );

        it( 'works with an element context', () => {
            helpers.checkNodeResult( "parent::node()", g.doc.getElementById( 'testStepAxisNodeElement' ), [ g.doc.getElementById( 'StepAxisCase' ) ] );
        } );

        it( 'works with an attribute context', () => {
            helpers.checkNodeResult( "parent::node()", h.getNodeAttribute(), [ g.doc.getElementById( 'testStepAxisNodeAttribute' ) ] );
        } );

        it( 'works with a CData context', () => {
            helpers.checkNodeResult( "parent::node()", h.getNodeCData(), [ g.doc.getElementById( 'testStepAxisNodeCData' ) ] );
        } );

        it( 'works with a comment context', () => {
            helpers.checkNodeResult( "parent::node()", h.getNodeComment(), [ g.doc.getElementById( 'testStepAxisNodeComment' ) ] );
        } );

        it( 'works with a processing instruction', () => {
            helpers.checkNodeResult( "parent::node()", h.getNodeProcessingInstruction(), [ g.doc.getElementById( 'testStepAxisNodeProcessingInstruction' ) ] );
        } );

        it( 'works with a namespace', () => {
            helpers.checkNodeResult( "parent::node()", h.getNodeNamespace(), [ g.doc.getElementById( 'testStepAxisNodeNamespace' ) ] );
        } );

    } );

    describe( 'ancestor axis', () => {

        it( 'works for a cocument context', () => {
            helpers.checkNodeResult( "ancestor::node()", g.doc, [] );
        } );

        it( 'works for a documentElement context', () => {
            helpers.checkNodeResult( "ancestor::node()", g.doc.documentElement, [ g.doc ] );
        } );

        it( 'works for an element context', () => {
            helpers.checkNodeResult( "ancestor::node()", g.doc.getElementById( 'testStepAxisNodeElement' ), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' )
            ] );
        } );

        it( 'works for an attribute context', () => {
            helpers.checkNodeResult( "ancestor::node()", h.getNodeAttribute(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeAttribute' )
            ] );
        } );

        it( 'works for a CDATA context', () => {
            helpers.checkNodeResult( "ancestor::node()", h.getNodeCData(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeCData' )
            ] );
        } );

        it( 'works for a comment context', () => {
            helpers.checkNodeResult( "ancestor::node()", h.getNodeComment(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeComment' )
            ] );
        } );

        it( 'works for a processing instruction context', () => {
            helpers.checkNodeResult( "ancestor::node()", h.getNodeProcessingInstruction(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeProcessingInstruction' )
            ] );
        } );

        it( 'works for a namespace context ', () => {
            helpers.checkNodeResult( "ancestor::node()", h.getNodeNamespace(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeNamespace' )
            ] );
        } );

    } );

    describe( 'ancestor-or-self axis', () => {

        it( 'works for document context', () => {
            helpers.checkNodeResult( "ancestor-or-self::node()", g.doc, [ g.doc ] );
        } );

        it( 'works for documentElement context', () => {
            helpers.checkNodeResult( "ancestor-or-self::node()", g.doc.documentElement, [
                g.doc,
                g.doc.documentElement
            ] );
        } );

        it( 'works for an element context', () => {
            helpers.checkNodeResult( "ancestor-or-self::node()", g.doc.getElementById( 'testStepAxisNodeElement' ), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeElement' )
            ] );
        } );

        it( 'works for an attribute context', () => {
            helpers.checkNodeResult( "ancestor-or-self::node()", h.getNodeAttribute(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeAttribute' ),
                h.getNodeAttribute()
            ] );
        } );

        it( 'works for a CDATA context', () => {
            helpers.checkNodeResult( "ancestor-or-self::node()", h.getNodeCData(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeCData' ),
                h.getNodeCData()
            ] );
        } );

        it( 'works for a comment context', () => {
            helpers.checkNodeResult( "ancestor-or-self::node()", h.getNodeComment(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeComment' ),
                h.getNodeComment()
            ] );
        } );

        it( 'works for processingInstruction context', () => {
            helpers.checkNodeResult( "ancestor-or-self::node()", h.getNodeProcessingInstruction(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeProcessingInstruction' ),
                h.getNodeProcessingInstruction()
            ] );
        } );

        it( 'works for namespace context', () => {
            helpers.checkNodeResult( "ancestor-or-self::node()", h.getNodeNamespace(), [
                g.doc,
                g.doc.documentElement,
                g.doc.querySelector( 'body' ),
                g.doc.getElementById( 'StepAxisCase' ),
                g.doc.getElementById( 'testStepAxisNodeNamespace' ),
                h.getNodeNamespace()
            ] );
        } );

    } );

    describe( 'following-sibling axis', () => {

        it( 'works for a document context', () => {
            helpers.checkNodeResult( "following-sibling::node()", g.doc, [] );
        } );

        it( 'works for a documentElement context', () => {
            helpers.checkNodeResult( "following-sibling::node()", g.doc.documentElement, h.followingSiblingNodes( g.doc.documentElement ) );
        } );

        it( 'works for an element: context', () => {
            helpers.checkNodeResult( "following-sibling::node()", g.doc.getElementById( 'testStepAxisNodeElement' ), h.followingSiblingNodes( g.doc.getElementById( 'testStepAxisNodeElement' ) ) );
        } );

        it( 'works for an attribute context', () => {
            helpers.checkNodeResult( "following-sibling::node()", h.getNodeAttribute(), [] );
        } );

        it( 'works for a CDATA context', () => {
            helpers.checkNodeResult( "following-sibling::node()", h.getNodeCData(), h.followingSiblingNodes( h.getNodeCData() ) );
        } );

        it( 'works for a comment context', () => {
            helpers.checkNodeResult( "following-sibling::node()", h.getNodeComment(), h.followingSiblingNodes( h.getNodeComment() ) );
        } );

        it( 'works for a processing instruction', () => {
            helpers.checkNodeResult( "following-sibling::node()", h.getNodeProcessingInstruction(), h.followingSiblingNodes( h.getNodeProcessingInstruction() ) );
        } );

        it( 'works for a namespace context', () => {
            helpers.checkNodeResult( "following-sibling::node()", h.getNodeNamespace(), [] );
        } );

    } );


    describe( 'preceding-sibling axis', () => {

        it( 'works for a document context', () => {
            helpers.checkNodeResult( "preceding-sibling::node()", g.doc, [] );
        } );

        it( 'works for a documentElement context', () => {
            helpers.checkNodeResult( "preceding-sibling::node()", g.doc.documentElement, h.precedingSiblingNodes( g.doc.documentElement ) );
        } );

        it( 'works for a Element context', () => {
            helpers.checkNodeResult( "preceding-sibling::node()", g.doc.getElementById( 'testStepAxisNodeElement' ), h.precedingSiblingNodes( g.doc.getElementById( 'testStepAxisNodeElement' ) ) );
        } );

        it( 'works for a Attribute context', () => {
            helpers.checkNodeResult( "preceding-sibling::node()", h.getNodeAttribute(), [] );
        } );

        it( 'works for a CData context', () => {
            helpers.checkNodeResult( "preceding-sibling::node()", h.getNodeCData(), h.precedingSiblingNodes( h.getNodeCData() ) );
        } );

        it( 'works for a Comment context', () => {
            helpers.checkNodeResult( "preceding-sibling::node()", h.getNodeComment(), h.precedingSiblingNodes( h.getNodeComment() ) );
        } );

        it( 'works for a ProcessingInstruction context', () => {
            helpers.checkNodeResult( "preceding-sibling::node()", h.getNodeProcessingInstruction(), h.precedingSiblingNodes( h.getNodeProcessingInstruction() ) );
        } );

        it( 'works for a Namespace context', () => {
            helpers.checkNodeResult( "preceding-sibling::node()", h.getNodeNamespace(), [] );
        } );

    } );

    describe( 'following axis', () => {

        it( 'works for a document context', () => {
            helpers.checkNodeResult( "following::node()", g.doc, [] );
        } );

        it( 'works for a documentElement context', () => {
            helpers.checkNodeResult( "following::node()", g.doc.documentElement, h.followingNodes( g.doc.documentElement ) );
        } );

        it( 'works for an element context', () => {
            helpers.checkNodeResult( "following::node()", g.doc.getElementById( 'testStepAxisNodeElement' ), h.followingNodes( g.doc.getElementById( 'testStepAxisNodeElement' ) ) );
        } );

        it( 'works for an attribute context', () => {
            helpers.checkNodeResult( "following::node()", h.getNodeAttribute(), h.followingNodes( g.doc.getElementById( 'testStepAxisNodeAttribute' ) ) );
        } );

        it( 'works for a CDATA context', () => {
            helpers.checkNodeResult( "following::node()", h.getNodeCData(), h.followingNodes( h.getNodeCData() ) );
        } );

        it( 'works for a comment context', () => {
            helpers.checkNodeResult( "following::node()", h.getNodeComment(), h.followingNodes( h.getNodeComment() ) );
        } );

        it( 'works for a processing instruction context', () => {
            helpers.checkNodeResult( "following::node()", h.getNodeProcessingInstruction(), h.followingNodes( h.getNodeProcessingInstruction() ) );
        } );

        it( 'works for a namespace context', () => {
            helpers.checkNodeResult( "following::node()", h.getNodeNamespace(), h.followingNodes( g.doc.getElementById( 'testStepAxisNodeNamespace' ) ) );
        } );

    } );

    describe( 'preceding axis', () => {

        it( 'works for a document context', () => {
            helpers.checkNodeResult( "preceding::node()", g.doc, [] );
        } );

        it( 'works for a documentElement context', () => {
            helpers.checkNodeResult( "preceding::node()", g.doc.documentElement, h.precedingNodes( g.doc.documentElement ) );
        } );

        it( 'works for an element context', () => {
            helpers.checkNodeResult( "preceding::node()", g.doc.getElementById( 'testStepAxisNodeElement' ), h.precedingNodes( g.doc.getElementById( 'testStepAxisNodeElement' ) ) );
        } );

        it( 'works for an attribute context', () => {
            helpers.checkNodeResult( "preceding::node()", h.getNodeAttribute(), h.precedingNodes( g.doc.getElementById( 'testStepAxisNodeAttribute' ) ) );
        } );

        it( 'works for a CDATA context', () => {
            helpers.checkNodeResult( "preceding::node()", h.getNodeCData(), h.precedingNodes( h.getNodeCData() ) );
        } );

        it( 'works for a Comment context', () => {
            helpers.checkNodeResult( "preceding::node()", h.getNodeComment(), h.precedingNodes( h.getNodeComment() ) );
        } );

        it( 'works for a processing instruction context', () => {
            helpers.checkNodeResult( "preceding::node()", h.getNodeProcessingInstruction(), h.precedingNodes( h.getNodeProcessingInstruction() ) );
        } );

        it( 'works for a Namespace context', () => {
            helpers.checkNodeResult( "preceding::node()", h.getNodeNamespace(), h.precedingNodes( g.doc.getElementById( 'testStepAxisNodeNamespace' ) ) );
        } );

    } );

    describe( 'attribute axis', () => {

        it( 'works for a document context', () => {
            helpers.checkNodeResult( "attribute::node()", g.doc, [] );
        } );

        it( 'works for an attribute context', () => {
            helpers.checkNodeResult( "attribute::node()", h.getNodeAttribute(), [] );
        } );

        it( 'works for a CDATA context', () => {
            helpers.checkNodeResult( "attribute::node()", h.getNodeCData(), [] );
        } );

        it( 'works for a comment context', () => {
            helpers.checkNodeResult( "attribute::node()", h.getNodeComment(), [] );
        } );

        it( 'works for a processing instruction context', () => {
            helpers.checkNodeResult( "attribute::node()", h.getNodeProcessingInstruction(), [] );
        } );

        it( 'works for a namespace context', () => {
            helpers.checkNodeResult( "attribute::node()", h.getNodeNamespace(), [] );
        } );

        it( 'works for a 0 context', () => {
            helpers.checkNodeResult( "attribute::node()", g.doc.getElementById( 'testStepAxisNodeAttribute0' ), helpers.filterAttributes( g.doc.getElementById( 'testStepAxisNodeAttribute0' ).attributes ) );
        } );

        it( 'works for a 1 context', () => {
            helpers.checkNodeResult( "attribute::node()", g.doc.getElementById( 'testStepAxisNodeAttribute1' ), helpers.filterAttributes( g.doc.getElementById( 'testStepAxisNodeAttribute1' ).attributes ) );
        } );

        it( 'works for a 3: context', () => {
            helpers.checkNodeResult( "attribute::node()", g.doc.getElementById( 'testStepAxisNodeAttribute3' ), helpers.filterAttributes( g.doc.getElementById( 'testStepAxisNodeAttribute3' ).attributes ) );
        } );

        it( 'works for a StartXml context', () => {
            helpers.checkNodeResult( "attribute::node()", g.doc.getElementById( 'testStepAxisNodeAttributeStartXml' ), helpers.filterAttributes( g.doc.getElementById( 'testStepAxisNodeAttributeStartXml' ).attributes ) );
        } );

    } );

    describe( 'namespace axis', () => {

        it( 'works for a document context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", g.doc, [] );
        } );

        it( 'works for an attribute context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", h.getNodeAttribute(), [] );
        } );

        it( 'works for a CDATA context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", h.getNodeCData(), [] );
        } );

        it( 'works for a comment context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", h.getNodeComment(), [] );
        } );

        it( 'works for a processing instruction context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", h.getNodeProcessingInstruction(), [] );
        } );

        it( 'works for a namespace context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", h.getNodeNamespace(), [] );
        } );

        it( 'works for a document element context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", g.doc.documentElement, [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for a 0 context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace0' ), [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for a 1 context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace1' ), [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'a', 'asdf' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for a 1 default context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace1defaultContainer' ).firstChild, [
                [ '', 'asdf' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for a 1 default 2 context', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace1defaultContainer2' ).firstChild, [
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for a 3 context', () => {
            const namespaces = [],
                contextNode = g.doc.getElementById( 'testStepAxisNodeNamespace3' );

            namespaces.push( [ '', 'http://www.w3.org/1999/xhtml' ] );
            helpers.parseNamespacesFromAttributes( contextNode.attributes, namespaces );
            namespaces.push( [ 'ev', 'http://some-namespace.com/nss' ] );
            namespaces.push( [ 'xml', 'http://www.w3.org/XML/1998/namespace' ] );

            helpers.checkNodeResultNamespace( "namespace::node()", contextNode, namespaces );
        } );

        it( 'works for a 3 default context', () => {
            const namespaces = [],
                contextNode = g.doc.getElementById( 'testStepAxisNodeNamespace3defaultContainer' ).firstChild;

            helpers.parseNamespacesFromAttributes( contextNode.attributes, namespaces );
            namespaces.push( [ 'ev', 'http://some-namespace.com/nss' ] );
            namespaces.push( [ 'xml', 'http://www.w3.org/XML/1998/namespace' ] );

            helpers.checkNodeResultNamespace( "namespace::node()", contextNode, namespaces );
        } );

        it( 'works with an element context that overrides the namespace', () => {
            helpers.checkNodeResultNamespace( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespaceXmlOverride' ), [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'ev', 'http://some-other-namespace/' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works with "NoNamespaceNodeSharingAmongstElements" context', () => {
            let j, result, result2, item, item2, expectedResult;

            expectedResult = [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'a', 'asdf' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ];

            result = g.doc.evaluate( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace1' ), null, g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
            result2 = g.doc.evaluate( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace1b' ), null, g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); //
            expect( result.snapshotLength ).to.equal( expectedResult.length );
            expect( result2.snapshotLength ).to.equal( expectedResult.length );

            for ( j = 0; j < result.snapshotLength; j++ ) {
                item = result.snapshotItem( j );
                item2 = result2.snapshotItem( j );

                expect( item.nodeName ).to.equal( '#namespace' );
                expect( item2.nodeName ).to.equal( '#namespace' );

                expect( item.localName ).to.equal( expectedResult[ j ][ 0 ] );
                expect( item2.localName ).to.equal( expectedResult[ j ][ 0 ] );

                expect( item.namespaceURI ).to.equal( expectedResult[ j ][ 1 ] );
                expect( item2.namespaceURI ).to.equal( expectedResult[ j ][ 1 ] );

                // expect( item2 ).to.not.deep.equal( item );
            }
        } );

        it( 'works with "SameNamespaceNodeOnSameElement" context', () => {
            let j, result, result2, item, item2, expectedResult;

            expectedResult = [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'a', 'asdf' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ];

            result = g.doc.evaluate( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace1' ), null, g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
            result2 = g.doc.evaluate( "namespace::node()", g.doc.getElementById( 'testStepAxisNodeNamespace1' ), null, g.win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

            for ( j = 0; j < result.snapshotLength; j++ ) {
                item = result.snapshotItem( j );
                item2 = result2.snapshotItem( j );

                expect( item.nodeName ).to.equal( '#namespace' );
                expect( item.localName ).to.equal( expectedResult[ j ][ 0 ] );
                expect( item.namespaceURI ).to.equal( expectedResult[ j ][ 1 ] );
                expect( item2 ).to.deep.equal( item );
            }
        } );

    } );

    describe( 'attribute && namespace axes', () => {

        it( 'works for Attrib1Ns1', () => {
            const attributes = [];
            let i;
            let contextNode;

            contextNode = g.doc.getElementById( 'testStepAxisNodeAttrib1Ns1' );

            for ( i = 0; i < contextNode.attributes.length; i++ ) {
                if ( !contextNode.attributes[ i ].specified ) {
                    continue;
                }
                if ( contextNode.attributes.item( i ).nodeName.substring( 0, 5 ) !== 'xmlns' ) {
                    attributes.push( contextNode.attributes.item( i ) );
                }
            }

            // helpers.checkNodeResult( "attribute::node()", contextNode, attributes ); //

            helpers.checkNodeResultNamespace( "namespace::node()", contextNode, [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'a', 'asdf' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for Attrib1Ns1reversed', () => {
            const attributes = [];
            let i;
            let contextNode;

            contextNode = g.doc.getElementById( 'testStepAxisNodeAttrib1Ns1reversed' );

            for ( i = 0; i < contextNode.attributes.length; i++ ) {
                if ( !contextNode.attributes[ i ].specified ) {
                    continue;
                }
                if ( contextNode.attributes.item( i ).nodeName.substring( 0, 5 ) !== 'xmlns' ) {
                    attributes.push( contextNode.attributes.item( i ) );
                }
            }

            // helpers.checkNodeResult( "attribute::node()", contextNode, attributes );

            helpers.checkNodeResultNamespace( "namespace::node()", contextNode, [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'a', 'asdf' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for NodeAttrib2Ns1', () => {
            const attributes = [];
            let i;
            let contextNode;

            contextNode = g.doc.getElementById( 'testStepAxisNodeAttrib2Ns1' );

            for ( i = 0; i < contextNode.attributes.length; i++ ) {
                if ( !contextNode.attributes[ i ].specified ) {
                    continue;
                }
                if ( contextNode.attributes.item( i ).nodeName.substring( 0, 5 ) !== 'xmlns' ) {
                    attributes.push( contextNode.attributes.item( i ) );
                }
            }

            // helpers.checkNodeResult( "attribute::node()", contextNode, attributes ); //
            helpers.checkNodeResultNamespace( "namespace::node()", contextNode, [
                [ '', 'http://www.w3.org/1999/xhtml' ],
                [ 'c', 'asdf3' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for Attrib2Ns1reversed', () => {
            const attributes = [];
            let i;
            let contextNode;

            contextNode = g.doc.getElementById( 'testStepAxisNodeAttrib2Ns1reversedContainer' ).firstChild;

            for ( i = 0; i < contextNode.attributes.length; i++ ) {
                if ( !contextNode.attributes[ i ].specified ) {
                    continue;
                }
                if ( contextNode.attributes.item( i ).nodeName.substring( 0, 5 ) !== 'xmlns' ) {
                    attributes.push( contextNode.attributes.item( i ) );
                }
            }

            // helpers.checkNodeResult( "attribute::node()", contextNode, attributes );

            helpers.checkNodeResultNamespace( "namespace::node()", contextNode, [
                [ '', 'asdf' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );

        it( 'works for NodeAttrib2Ns2', () => {
            const attributes = [];
            let i;
            let contextNode;

            contextNode = g.doc.getElementById( 'testStepAxisNodeAttrib2Ns2Container' ).firstChild;

            for ( i = 0; i < contextNode.attributes.length; i++ ) {
                if ( !contextNode.attributes[ i ].specified ) {
                    continue;
                }
                if ( contextNode.attributes.item( i ).nodeName.substring( 0, 5 ) !== 'xmlns' ) {
                    attributes.push( contextNode.attributes.item( i ) );
                }
            }

            // helpers.checkNodeResult( "attribute::node()", contextNode, attributes );

            helpers.checkNodeResultNamespace( "namespace::node()", contextNode, [
                [ '', 'asdf2' ],
                [ 'a', 'asdf' ],
                [ 'ev', 'http://some-namespace.com/nss' ],
                [ 'xml', 'http://www.w3.org/XML/1998/namespace' ]
            ] );
        } );
    } );
} );
