describe('location path', () => {
  let h;

  beforeEach(() => {
    initDoc(`
      <!DOCTYPE html>
      <html xml:lang="en-us" xmlns="http://www.w3.org/1999/xhtml" xmlns:ev="http://some-namespace.com/nss">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>xpath-test</title>
        </head>
        <body class="yui3-skin-sam" id="body">
          <div id="LocationPathCase">
            <div id="LocationPathCaseText">some text</div>
            <div id="LocationPathCaseComment"><!-- some comment --></div>
            <div id="LocationPathCaseCData"><![CDATA[some cdata]]></div>
            <div id="LocationPathCaseProcessingInstruction"><?xml-stylesheet type="text/xml" href="test.xsl"?></div>
            <div id="LocationPathCaseAttribute" class="123" width="100%"></div>
            <div id="LocationPathCaseNamespace" xmlns:asdf="http://www.123.com/"></div>

            <div id="LocationPathCaseDuplicates"></div>

            <div id="LocationPathCaseAttributeParent"><div attr="aa"></div><div attr="aa3a" attr2="sss"></div><div attr2="adda"></div><div attr4="aa"></div></div>

            <div id="LocationPathCaseNamespaceParent"><div xmlns="http://asdss/"></div><div xmlns:aa="http://saa/" xmlns:a2="hello/world" xmlns:ab="hello/world2"></div><div></div><div xmlns:aa="http://saa/"></div></div>
          </div>
        </body>
      </html>`);
    h = {
      oneNamespaceNode(node) {
        let result, item;

        result = doc.evaluate("namespace::node()", node, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
        item = result.singleNodeValue;
        assert.isNotNull(item);
        assert.equal(item.nodeType, 13);

        return item;
      }
    };
  });

  it('root', () => {
    let i;
    let node;

    const input = [
      [doc, [doc]], // Document
      [doc.documentElement, [doc]], // Element
      [doc.getElementById('LocationPathCase'), [doc]], // Element
      [doc.getElementById('LocationPathCaseText').firstChild, [doc]], // Text
      [doc.getElementById('LocationPathCaseComment').firstChild, [doc]], // Comment
      //TODO [filterAttributes(doc.getElementById('LocationPathCaseAttribute').attributes)[0], [doc]] // Attribute
   ];

    // ProcessingInstruction
    node = doc.getElementById('LocationPathCaseProcessingInstruction').firstChild;
    if (node && node.nodeType == 7) {
      input.push([node, [doc]]);
    }

    // CDATASection
    node = doc.getElementById('LocationPathCaseCData').firstChild;
    if (node && node.nodeType == 4) {
      input.push([node, [doc]]);
    }

    for (i = 0; i < input.length; i++) {
      checkNodeResult("/", input[i][0], input[i][1]);
    }
  });

  xit('root namespace', () => {
    const input = [h.oneNamespaceNode(doc.getElementById('LocationPathCaseNamespace')), [doc]]; // XPathNamespace
    checkNodeResult("/", input[0], input[1]);
  });

  it('root node', () => {
    checkNodeResult("/html", doc, [], getXhtmlResolver(doc));
    checkNodeResult("/xhtml:html", doc, [doc.documentElement], getXhtmlResolver(doc));
    checkNodeResult("/xhtml:html", doc.getElementById('LocationPathCase'), [doc.documentElement], getXhtmlResolver(doc));
    checkNodeResult("/htmlnot", doc.getElementById('LocationPathCase'), [], getXhtmlResolver(doc));
  });

  it('root node node', () => {
    checkNodeResult("/xhtml:html/xhtml:body", doc.getElementById('LocationPathCase'), [doc.querySelector('body')], getXhtmlResolver(doc));
  });

  it('node (node)', () => {
    checkNodeResult("html", doc, [], getXhtmlResolver(doc));
    checkNodeResult("xhtml:html", doc, [doc.documentElement], getXhtmlResolver(doc));
    checkNodeResult("xhtml:html/xhtml:body", doc, [doc.querySelector('body')], getXhtmlResolver(doc));
  });

  xit('node attribute', () => {
    const node = doc.getElementById('LocationPathCaseAttributeParent');

    checkNodeResult("child::*/attribute::*", node, [
      filterAttributes(node.childNodes[0].attributes)[0],
      filterAttributes(node.childNodes[1].attributes)[0],
      filterAttributes(node.childNodes[1].attributes)[1],
      filterAttributes(node.childNodes[2].attributes)[0],
      filterAttributes(node.childNodes[3].attributes)[0]
   ], getXhtmlResolver(doc));
  });

  // Also skipped by enketo-xpathjs
  // xit('node namespace', () => {
  //   const node = doc.getElementById('LocationPathCaseNamespaceParent'); //
  //
  //   checkNodeResultNamespace("child::* /namespace::*", node, [
  //       ['', 'http://asdss/'],
  //       ['ev', 'http://some-namespace.com/nss'],
  //       ['xml', 'http://www.w3.org/XML/1998/namespace'],
  //       ['', 'http://www.w3.org/1999/xhtml'],
  //       ['ab', 'hello/world2'],
  //       ['a2', 'hello/world'],
  //       ['aa', 'http://saa/'],
  //       ['ev', 'http://some-namespace.com/nss'],
  //       ['xml', 'http://www.w3.org/XML/1998/namespace'],
  //       ['', 'http://www.w3.org/1999/xhtml'],
  //       ['ev', 'http://some-namespace.com/nss'],
  //       ['xml', 'http://www.w3.org/XML/1998/namespace'],
  //       ['', 'http://www.w3.org/1999/xhtml'],
  //       ['aa', 'http://saa/'],
  //       ['ev', 'http://some-namespace.com/nss'],
  //       ['xml', 'http://www.w3.org/XML/1998/namespace']
  //  ], getXhtmlResolver(doc));
  // });
  //
  it('duplicates handled correctly', () => {
    checkNodeResult("ancestor-or-self::* /ancestor-or-self::*", doc.getElementById('LocationPathCaseDuplicates'), [
      doc.documentElement,
      doc.querySelector('body'),
      doc.getElementById('LocationPathCase'),
      doc.getElementById('LocationPathCaseDuplicates')
   ], getXhtmlResolver(doc));
  });
});
