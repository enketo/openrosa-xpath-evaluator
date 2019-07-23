import { g } from '../docwin';

describe( 'creating expressions', () => {

    it( 'parses', () => {
        const resolver = g.doc.createNSResolver( g.doc.documentElement );
        const expression = g.doc.createExpression( '1', resolver );

        expect( expression ).to.be.an.instanceOf( g.win.XPathExpression );
    } );

    it( 'throws invalid expression exceptions', () => {
        const resolver = g.doc.createNSResolver( g.doc.documentElement );
        const test = () => {
            g.doc.createExpression( 'aa&&aa', resolver );
        };

        expect( test ).to.throw();
    } );

    it( 'throws exception when parsing without a resolver', () => {
        const test = () => {
            g.doc.createExpression( 'xml:node' );
        };

        expect( test ).to.throw();
    } );

    it( 'parses with a namespace', () => {
        const test = () => {
            const resolver = g.doc.createNSResolver( g.doc.documentElement );
            g.doc.createExpression( 'node1 | xml:node2 | ev:node2', resolver );
        };

        expect( test ).not.to.throw();
    } );

    it( 'throws an exception if namespace is incorrect', () => {
        const resolver = g.doc.createNSResolver( g.doc.documentElement );
        const test = () => {
            g.doc.createExpression( 'as:node1 | ev:node2', resolver );
        };

        expect( test ).to.throw( g.win.DOMException.NAMESPACE_ERR ); //,/DOM Exception 14/);
    } );
} );
