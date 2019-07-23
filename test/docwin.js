export const g = {
    get doc() { return document.querySelector( 'iframe' ).contentWindow.document; },
    get win() { return document.querySelector( 'iframe' ).contentWindow; }
};
