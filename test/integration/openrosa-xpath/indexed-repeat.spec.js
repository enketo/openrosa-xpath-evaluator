describe('#indexed-repeat()', () => { it('should have tests', () => { TODO(); }); });




 // This function is now supported by translating it into regular XPath before passing to this evaluator.
it('indexed-repeat()', function() {
  TODO()
    // [
    //     // targeting div child of #testXPathEvaluate
    //     ["indexed-repeat(xhtml:div/xhtml:div, xhtml:div, 2)", g.doc.getElementById('body'), 'some text'],
    //     // targeting 3rd p-element in #testFunctionNodeset3
    //     ["indexed-repeat(xhtml:div/xhtml:p, xhtml:div, 3)", g.doc.getElementById('testFunctionNodeset3'), '3'],
    //     // targeting 3rd p-element in #testFunctionNodeset3, in a more complex manner (triple-nested repeats)
    //     ["indexed-repeat(xhtml:div/xhtml:div/xhtml:div/xhtml:p, xhtml:div, 4, xhtml:div/xhtml:div, 2, xhtml:div/xhtml:div/xhtml:div, 3)", g.doc.getElementById('body'), '3']
    // ].forEach(function(t) {
    //     var result = g.doc.evaluate(t[0], t[1], helpers.getXhtmlResolver(g.doc), g.win.XPathResult.STRING_TYPE, null);
    //     expect(result.stringValue).to.equal(t[2]);
    // });
});


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
