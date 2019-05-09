describe('xpath exceptions', () => {

  it('Exception constants have expected values', () => {
    assert.equal(XPathException.INVALID_EXPRESSION_ERR, 51);
    assert.equal(XPathException.TYPE_ERR, 52);
  });

  it('Constructor is constructing nicely with a message', () => {
    const message = 'here is the message';
    const ex = new XPathException(XPathException.INVALID_EXPRESSION_ERR, message);

    // check code
    assert.equal(ex.code, XPathException.INVALID_EXPRESSION_ERR);
    assert.equal(ex.code, 51);

    // check message
    assert.equal(ex.message, message);

    // check toString
    assert.instanceOf(ex.toString, Function);
    assert.equal(ex.toString(), `XPathException: "${ex.message}", code: "${ex.code}", name: "INVALID_EXPRESSION_ERR"`);
  });

  it('Constructor is constructing nicely without a message', () => {
    const ex = new XPathException(XPathException.INVALID_EXPRESSION_ERR);
    assert.equal(ex.message, "");
  });

  it('Constructor throws exception when wrong arguments provided', () => {
    const test = () => {
      new XPathException(99, 'message goes here');
    };
    assert.throws(test, Error, /Unsupported XPathException code: 99/);
  });

});
