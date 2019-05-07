describe('XPath expression evaluation', () => {
  beforeEach(() => {
    initDoc(`
      <div id="XPathExpressionEvaluateCase">
  			<div id="testContextNodeParameter" style="display:block;">
  				<div id="testContextNodeParameterText">some text</div>
  				<div id="testContextNodeParameterCData"><![CDATA[aa<strong>some text</strong>]]></div>
  				<div id="testContextNodeParameterComment"><!-- here is comment --></div>
  				<div id="testContextNodeParameterProcessingInstruction"><?xml-stylesheet type="text/xml" href="test.xsl"?></div>
  				<div id="testContextNodeParameterNamespace" xmlns:asdf="http://some-namespace/"></div>
  			</div>
  		</div>`);
  });

  it('works with different types of context parameters', () => {
    let result;
    [
        [ ".", doc, 9], // Document
        [ ".", doc.documentElement, 1], // Element
        [ ".", doc.getElementById('testContextNodeParameter'), 1], // Element
        [ ".", filterAttributes(doc.getElementById('testContextNodeParameter' ).attributes )[0], 2], // Attribute
        [ ".", doc.getElementById('testContextNodeParameterText' ).firstChild, 3], // Text

        // TODO: See for more details http://reference.sitepoint.com/javascript/CDATASection
        // [".", doc.getElementById('testContextNodeParameterCData').firstChild, 4] // CDATASection

        // TODO: See for more details http://reference.sitepoint.com/javascript/ProcessingInstruction
        //[".", doc.getElementById('testContextNodeParameterProcessingInstruction').firstChild, 7], // ProcessingInstruction

        [".", doc.getElementById('testContextNodeParameterComment').firstChild, 8] // Comment
    ].forEach( t => {
      assert.equal(t[1].nodeType, t[2]);
      result = doc.evaluate(t[0], t[1], null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
      assert.equal(result.singleNodeValue, t[1]);
    });
  });

  xit('works with different context parameter namespaces', () => {
    let result, item;

    // get a namespace node
    result = doc.evaluate("namespace::node()", doc.getElementById('testContextNodeParameterNamespace'), null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    item = result.singleNodeValue;
    assert.equal(item, !null);
    assert.equal(item.nodeType, 13);

    // use namespacenode as a context node
    result = doc.evaluate(".", item, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    assert.equal(result.singleNodeValue, item);
  });

  it('fails if the context is document fragment', () => {
    const test = () => {
      doc.evaluate( ".", doc.createDocumentFragment(), null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    };
    assert.throw(test, Error);
  });
});
