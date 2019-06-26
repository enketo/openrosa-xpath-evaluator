describe('XPath expression evaluation', () => {
  let doc;
  beforeEach(() => {
    doc = initDoc(`
      <!DOCTYPE html>
      <html xml:lang="en-us" xmlns="http://www.w3.org/1999/xhtml" xmlns:ev="http://some-namespace.com/nss">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>xpath-test</title>
        </head>
        <body class="yui3-skin-sam" id="body">
          <div id="XPathExpressionEvaluateCase">
      			<div id="testContextNodeParameter" style="display:block;">
      				<div id="testContextNodeParameterText">some text</div>
      				<div id="testContextNodeParameterCData"><![CDATA[aa<strong>some text</strong>]]></div>
      				<div id="testContextNodeParameterComment"><!-- here is comment --></div>
      				<div id="testContextNodeParameterProcessingInstruction"><?xml-stylesheet type="text/xml" href="test.xsl"?></div>
      				<div id="testContextNodeParameterNamespace" xmlns:asdf="http://some-namespace/"></div>
      			</div>
  		    </div>
        </body>
      </html>`);
  });

  it('works with different types of context parameters', () => {
    let result;
    [
      [ ".", doc, 9], // Document
      [ ".", doc.documentElement, 1], // Element
      [ ".", doc.getElementById('testContextNodeParameter'), 1], // Element
      [ ".", filterAttributes(doc.getElementById('testContextNodeParameter' ).attributes )[0], 2], // Attribute
      [ ".", doc.getElementById('testContextNodeParameterText' ).firstChild, 3], // Text
      [".", doc.getElementById('testContextNodeParameterCData').firstChild, 4], // CDATASection
      [".", doc.getElementById('testContextNodeParameterProcessingInstruction').firstChild, 7], // ProcessingInstruction
      [".", doc.getElementById('testContextNodeParameterComment').firstChild, 8] // Comment
    ].forEach(t => {
      assert.equal(t[1].nodeType, t[2]);
      result = doc.evaluate(t[0], t[1], null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
      assert.equal(result.singleNodeValue, t[1]);
    });
  });

  it('works with different context parameter namespaces', () => {
    // get a namespace node
    const node = doc.getElementById('testContextNodeParameterNamespace');
    let result = xEval("namespace::node()", node, XPathResult.ANY_UNORDERED_NODE_TYPE);
    const item = result.singleNodeValue;
    assert.isNotNull(item);
    //TODO chrome/firefox do not support namespace:node()
    // assert.equal(item.nodeType, 13);

    // use namespacenode as a context node
    result = doc.evaluate(".", item, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    assert.equal(result.singleNodeValue, item);
  });

  it('fails if the context is document fragment', () => {
    const test = () => {
      doc.evaluate(".", doc.createDocumentFragment(), null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    };
    assert.throw(test, Error);
  });
});
