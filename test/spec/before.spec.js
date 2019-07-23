before( done => {
    console.log( 'running root before' );
    // run asynchronous operation before any tests
    const iframe = document.createElement( 'iframe' );
    iframe.setAttribute( 'src', '/base/test/doc.xml' );
    iframe.setAttribute( 'id', 'testframe' );
    iframe.onload = () => {
        const script = document.createElement( 'script' );
        // TODO: should load parser and engine separately to facilitate development
        script.setAttribute( 'src', '/base/dist/openrosa-xpath-bundle.js' );

        script.onload = () => {
            iframe.contentWindow.XPathJS.bindDomLevel3XPath();
            done();
        };

        iframe.contentWindow.document.querySelector( 'body' ).appendChild( script );
    };
    document.body.appendChild( iframe );
} );


/*
import XPathJS from '../src/XPathJS';

const load = fetch( '/base/test/doc.xml')
    .then( response => response.text())
    .then( txt => new DOMParser().parseFromString( txt,'application/xhtml+xml' ));

const docwin = () => {
    return load.then( doc => {
        //console.log('doc', doc);
        XPathJS.bindDomLevel3XPath(doc);
        console.log('r', r);
        return  {
            doc: doc,
            win: window
        };
    });
};
*/
