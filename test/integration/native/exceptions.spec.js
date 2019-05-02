describe('xpath exceptions', () => {

  xit('Exception constants have expected values', () => {
    expect(doc.XPathException.INVALID_EXPRESSION_ERR).to.equal(51);
    expect(doc.XPathException.TYPE_ERR).to.equal(52);
  });

  xit('Constructor is constructing nicely with a message', () => {
    const message = 'here is the message';
    const ex = new doc.XPathException(doc.XPathException.INVALID_EXPRESSION_ERR, message);

    // check code
    expect(ex.code).to.equal(doc.XPathException.INVALID_EXPRESSION_ERR);
    expect(ex.code).to.equal(51);

    // check message
    expect(ex.message).to.equal(message);

    // check toString
    expect(ex.toString).to.be.an.instanceOf(doc.Function);
    expect(ex.toString()).to.equal(`XPathException: "${ex.message}", code: "${ex.code}", name: "INVALID_EXPRESSION_ERR"`);
  });

  xit('Constructor is constructing nicely without a message', () => {
    const ex = new doc.XPathException(doc.XPathException.INVALID_EXPRESSION_ERR);
    expect(ex.message).to.equal("");
  });

  xit('Constructor throws exception when wrong arguments provided', () => {
    const test = () => {
      new doc.XPathException(99, 'message goes here');
    };
    expect(test).to.throw(doc.Error, /Unsupported XPathException code: 99/);
  });

});
