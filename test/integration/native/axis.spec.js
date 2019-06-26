describe('axes', () => {
  let doc, h;

  beforeEach(() => {
    nsr = nsResolver;
    doc = initDoc(`
      <!DOCTYPE html>
      <html xml:lang="en-us" xmlns="http://www.w3.org/1999/xhtml" xmlns:ev="http://some-namespace.com/nss">
        <head>
      		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      		<title>xpath-test</title>
      	</head>
      	<body class="yui3-skin-sam" id="body">
          <div id="StepAxisCase">

      			<div id="testStepAxisNodeElement"></div>
      			<div id="testStepAxisNodeAttribute" style="sss:asdf;" width="100%"></div>
      			<div id="testStepAxisNodeCData"><![CDATA[aa<strong>some text</strong>]]><div></div>asdf</div>
      			<div id="testStepAxisNodeComment"><!-- here is comment --><div></div>asdf</div>
      			<div id="testStepAxisNodeProcessingInstruction"><?xml-stylesheet type="text/xml" href="test.xsl"?><div></div>asdf</div>
      			<div id="testStepAxisNodeNamespace" xmlns:asdf="http://some-namespace/" width="100%"></div>

      			<div id="testStepAxisChild">
      				some text
      				<![CDATA[aa<strong>some text</strong>]]>
      				<div></div>
      				<div></div>
      				<div></div>
      				<div></div>
      				<div></div>
      			</div>

      			<div id="testStepAxisDescendant">
      				<div>
      					<div></div>
      					<div></div>
      					<div></div>
      					<div>
      						<div></div>
      						<div></div>
      						<!-- here is comment -->
      					</div>
      				</div>
      				<div></div>
      			</div>

      			<div id="testStepAxisAttribute">
      				<div id="testStepAxisNodeAttribute0"></div>
      				<div id="testStepAxisNodeAttribute1" class="test 123"></div>
      				<div id="testStepAxisNodeAttribute3" style="aaa" class="test 123" width="100%"></div>
      				<div id="testStepAxisNodeAttributeStartXml" xmlnswidth="100%" xml="sss"></div>

      				<div id="testStepAxisNodeNamespace0"></div>
      				<div id="testStepAxisNodeNamespace1" xmlns:a="asdf"></div>
      				<div id="testStepAxisNodeNamespace1b" xmlns:a="asdf"></div>
      				<div id="testStepAxisNodeNamespace1defaultContainer"><div xmlns="asdf"></div></div>
      				<div id="testStepAxisNodeNamespace1defaultContainer2"><div xmlns=""></div></div>
      				<div id="testStepAxisNodeNamespace3" xmlns:a="asdf" xmlns:b="asdf2" xmlns:c="asdf3"></div>
      				<div id="testStepAxisNodeNamespace3defaultContainer"><div xmlns:a="asdf" xmlns="asdf2" xmlns:c="asdf3"></div></div>
      				<div id="testStepAxisNodeNamespaceXmlOverride" xmlns:ev="http://some-other-namespace/"></div>

      				<div id="testStepAxisNodeAttrib1Ns1" class="test 123" xmlns:a="asdf"></div>
      				<div id="testStepAxisNodeAttrib1Ns1reversed" xmlns:a="asdf" class="test 123"></div>
      				<div id="testStepAxisNodeAttrib2Ns1" style="aaa" class="test 123" xmlns:c="asdf3"></div>
      				<div id="testStepAxisNodeAttrib2Ns1reversedContainer"><div style="aaa" xmlns="asdf" class="test 123"></div></div>
      				<div id="testStepAxisNodeAttrib2Ns2Container"><div xmlns:a="asdf" xmlns="asdf2" style="aaa" class="test 123"></div></div>
      			</div>
      		</div>
        </body>
      </html>`);

      h = {
        getNodeAttribute() {
          let attribute;
          const node = doc.getElementById('testStepAxisNodeAttribute');
          let i;

          for (i = 0; i < node.attributes.length; i++) {
            if (node.attributes[i].specified) {
              attribute = node.attributes[i];
              break;
            }
          }
          assert.equal(typeof attribute, 'object');
          //expect(attribute).to.be.an('object'); // why does this fail?
          return attribute;
        },

        getNodeComment() {
          return doc.getElementById('testStepAxisNodeComment').firstChild;
        },

        getNodeCData() {
          return doc.getElementById('testStepAxisNodeCData').firstChild;
        },

        getNodeProcessingInstruction() {
          return doc.getElementById('testStepAxisNodeProcessingInstruction').firstChild;
        },

        getNodeNamespace() {
          const result = doc.evaluate("namespace::node()", doc.getElementById('testStepAxisNodeNamespace'), null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
          return result.singleNodeValue;
        },

        followingSiblingNodes(node) {
          const nodes = [];

          while ((node = node.nextSibling)) {
              nodes.push(node);
          }

          return nodes;
        },

        precedingSiblingNodes(node) {
          const nodes = [];

          while ((node = node.previousSibling)) {
              if (node.nodeType == 10)
                  continue;
              nodes.push(node);
          }

          nodes.reverse();

          return nodes;
        },

        followingNodes(node) {
          const nodes = [];
          let i;
          let nodesAll;
          let result;
          let node2;

          nodesAll = getAllNodes(doc);

          for (i = 0; i < nodesAll.length; i++) {
              node2 = nodesAll[i]; //
              if (node2.nodeType == 10) // document type node
                  continue; //
              result = comparePosition(node, node2);
              if (4 === result) {
                  nodes.push(node2);
              }
          }

          return nodes;
        },

        precedingNodes(node) {
          const nodes = [];
          let i;
          let nodesAll;
          let result;
          let node2;

          nodesAll = getAllNodes(doc);

          for (i = 0; i < nodesAll.length; i++) {
            node2 = nodesAll[i];

            if (node2.nodeType == 10) // document type node
              continue;

            result = comparePosition(node, node2);
            if (2 == result) {
              nodes.push(node2);
            }
          }

          return nodes;
        }
      };
  });

  describe('self axis', () => {
    it('works with document context', () => {
      assertNodes("self::node()", doc, [doc]);
    });

    it('works with documentElement context', () => {
      assertNodes("self::node()", doc.documentElement, [doc.documentElement]);
    });

    it('works with element context', () => {
      assertNodes("self::node()", doc.getElementById('testStepAxisChild'), [doc.getElementById('testStepAxisChild')]);
    });

    it('works with element attribute context', () => {
      assertNodes("self::node()", h.getNodeAttribute(), [h.getNodeAttribute()]);
    });

    it('works with CData context', () => {
      assertNodes("self::node()", h.getNodeCData(), [h.getNodeCData()]);
    });

    it('works with comment context', () => {
      assertNodes("self::node()", h.getNodeComment(), [h.getNodeComment()]);
    });

    it('works with node processing instruction context', () => {
      assertNodes("self::node()", h.getNodeProcessingInstruction(), [h.getNodeProcessingInstruction()]);
    });

    // also skipped in enketo-xpathjs ???
    xit('works with node namespace context', () => {
      assertNodes("self::node()", h.getNodeNamespace(), [h.getNodeNamespace()]);
    });

    it('works with document fragment context', () => {
      const fragment = doc.createDocumentFragment();
      const test = () => {
        assertNodes("self::node()", fragment, [fragment]);
      };
      assert.throw(test, Error);
    });
  });

  describe('child axis', () => {
    // TODO fiddle with the xml
    xit('works with document context', () => {
      let i;
      const expectedResult = [];

      for (i = 0; i < doc.childNodes.length; i++) {
        if (doc.childNodes.item(i).nodeType == 1 ||
          doc.childNodes.item(i).nodeType == 8) {
          expectedResult.push(doc.childNodes.item(i));
        }
      }

      assertNodes("child::node()", doc, expectedResult);
    });

    it('works with documentElement context', () => {
      assertNodes("child::node()", doc.documentElement, doc.documentElement.childNodes);
    });

    it('works with element context', () => {
      assertNodes("child::node()", doc.getElementById('testStepAxisChild'),
          doc.getElementById('testStepAxisChild').childNodes);
    });

    it('works with attribute context', () => {
      assertNodes("child::node()", h.getNodeAttribute(), []);
    });

    it('works with CData context', () => {
      assertNodes("child::node()", h.getNodeCData(), []);
    });

    it('works with a comment context', () => {
      assertNodes("child::node()", h.getNodeComment(), []);
    });

    it('works with a processing instruction context', () => {
      assertNodes("child::node()", h.getNodeProcessingInstruction(), []);
    });

    xit('works with a namespace context', function() {
      assertNodes("child::node()", this.getNodeNamespace(), []);
    });
  });

  describe('descendendant axis', () => {
    it('works with Element context', () => {
      const descendantNodes = node => {
          const nodes = [];
          let i;

          for (i = 0; i < node.childNodes.length; i++) {
              nodes.push(node.childNodes.item(i));
              nodes.push(...descendantNodes(node.childNodes.item(i)));
          }

          return nodes;
      };

      assertNodes("descendant::node()", doc.getElementById('testStepAxisDescendant'),
          descendantNodes(doc.getElementById('testStepAxisDescendant')));
    });

    it('works with attribute context', () => {
      assertNodes("descendant::node()", h.getNodeAttribute(), []);
    });

    it('works with CData context', () => {
      assertNodes("descendant::node()", h.getNodeCData(), []);
    });

    it('works with a comment context', () => {
      assertNodes("descendant::node()", h.getNodeComment(), []);
    });

    it('works with a processing instruction context', () => {
      assertNodes("descendant::node()", h.getNodeProcessingInstruction(), []);
    });

    xit('works with namespace context', () => {
      assertNodes("descendant::node()", h.getNodeNamespace(), []);
    });
  });

  describe('descendant-or-self axis', () => {
    it('works with element context', () => {
      let nodes;

      const descendantNodes = node => {
          const nodes = [];
          let i;
          for (i = 0; i < node.childNodes.length; i++) {
              nodes.push(node.childNodes.item(i));
              nodes.push(...descendantNodes(node.childNodes.item(i)));
          }
          return nodes;
      };

      nodes = descendantNodes(doc.getElementById('testStepAxisDescendant'));
      nodes.unshift(doc.getElementById('testStepAxisDescendant'));
      assertNodes("descendant-or-self::node()", doc.getElementById('testStepAxisDescendant'), nodes);
    });

    it('works with attribute context', () => {
      assertNodes("descendant-or-self::node()", h.getNodeAttribute(), [
          h.getNodeAttribute()
     ]);
    });

    it('works with CDATA context', () => {
      assertNodes("descendant-or-self::node()", h.getNodeCData(), [
          h.getNodeCData()
     ]);
    });

    it('works with a comment context', () => {
      assertNodes("descendant-or-self::node()", h.getNodeComment(), [
          h.getNodeComment()
     ]);
    });

    it('works with element context', () => {
      assertNodes("descendant-or-self::node()", h.getNodeProcessingInstruction(), [
          h.getNodeProcessingInstruction()
     ]);
    });

    xit('works with a namspace context', () => {
      assertNodes("descendant-or-self::node()", h.getNodeNamespace(), [
          h.getNodeNamespace()
     ]);
    });
  });

  describe('parent axis', () => {
    it('works with a document context', () => {
      assertNodes("parent::node()", doc, []);
    });

    it('works with a documentElement context', () => {
      assertNodes("parent::node()", doc.documentElement, [doc]);
    });

    it('works with an element context', () => {
      assertNodes("parent::node()", doc.getElementById('testStepAxisNodeElement'), [doc.getElementById('StepAxisCase')]);
    });

    it('works with an attribute context', () => {
      assertNodes("parent::node()", h.getNodeAttribute(), [doc.getElementById('testStepAxisNodeAttribute')]);
    });

    it('works with a CData context', () => {
      assertNodes("parent::node()", h.getNodeCData(), [doc.getElementById('testStepAxisNodeCData')]);
    });

    it('works with a comment context', () => {
      assertNodes("parent::node()", h.getNodeComment(), [doc.getElementById('testStepAxisNodeComment')]);
    });

    it('works with a processing instruction', () => {
      assertNodes("parent::node()", h.getNodeProcessingInstruction(), [doc.getElementById('testStepAxisNodeProcessingInstruction')]);
    });

    xit('works with a namespace', () => {
      assertNodes("parent::node()", h.getNodeNamespace(), [doc.getElementById('testStepAxisNodeNamespace')]);
    });
  });

  describe('ancestor axis', () => {
    it('works for a cocument context', () => {
      assertNodes("ancestor::node()", doc, []);
    });

    it('works for a documentElement context', () => {
      assertNodes("ancestor::node()", doc.documentElement, [doc]);
    });

    it('works for an element context', () => {
      assertNodes("ancestor::node()", doc.getElementById('testStepAxisNodeElement'), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase')
     ]);
    });

    it('works for an attribute context', () => {
      assertNodes("ancestor::node()", h.getNodeAttribute(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeAttribute')
     ]);
    });

    it('works for a CDATA context', () => {
      assertNodes("ancestor::node()", h.getNodeCData(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeCData')
     ]);
    });

    it('works for a comment context', () => {
      assertNodes("ancestor::node()", h.getNodeComment(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeComment')
     ]);
    });

    it('works for a processing instruction context', () => {
      assertNodes("ancestor::node()", h.getNodeProcessingInstruction(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeProcessingInstruction')
     ]);
    });

    xit('works for a namespace context ', () => {
      assertNodes("ancestor::node()", h.getNodeNamespace(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeNamespace')
     ]);
    });
  });

  describe('ancestor-or-self axis', () => {
    it('works for document context', () => {
      assertNodes("ancestor-or-self::node()", doc, [doc]);
    });

    it('works for documentElement context', () => {
      assertNodes("ancestor-or-self::node()", doc.documentElement, [
          doc,
          doc.documentElement
     ]);
    });

    it('works for an element context', () => {
      assertNodes("ancestor-or-self::node()", doc.getElementById('testStepAxisNodeElement'), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeElement')
     ]);
    });

    it('works for an attribute context', () => {
      assertNodes("ancestor-or-self::node()", h.getNodeAttribute(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeAttribute'),
          h.getNodeAttribute()
     ]);
    });

    it('works for a CDATA context', () => {
      assertNodes("ancestor-or-self::node()", h.getNodeCData(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeCData'),
          h.getNodeCData()
     ]);
    });

    it('works for a comment context', () => {
      assertNodes("ancestor-or-self::node()", h.getNodeComment(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeComment'),
          h.getNodeComment()
     ]);
    });

    it('works for processingInstruction context', () => {
      assertNodes("ancestor-or-self::node()", h.getNodeProcessingInstruction(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeProcessingInstruction'),
          h.getNodeProcessingInstruction()
     ]);
    });

    xit('works for namespace context', () => {
      assertNodes("ancestor-or-self::node()", h.getNodeNamespace(), [
          doc,
          doc.documentElement,
          doc.querySelector('body'),
          doc.getElementById('StepAxisCase'),
          doc.getElementById('testStepAxisNodeNamespace'),
          h.getNodeNamespace()
     ]);
    });
  });

  describe('following-sibling axis', () => {
    it('works for a document context', () => {
      assertNodes("following-sibling::node()", doc, []);
    });

    it('works for a documentElement context', () => {
      assertNodes("following-sibling::node()", doc.documentElement, h.followingSiblingNodes(doc.documentElement));
    });

    it('works for an element: context', () => {
      assertNodes("following-sibling::node()", doc.getElementById('testStepAxisNodeElement'), h.followingSiblingNodes(doc.getElementById('testStepAxisNodeElement')));
    });

    it('works for an attribute context', () => {
      assertNodes("following-sibling::node()", h.getNodeAttribute(), []);
    });

    it('works for a CDATA context', () => {
      assertNodes("following-sibling::node()", h.getNodeCData(), h.followingSiblingNodes(h.getNodeCData()));
    });

    it('works for a comment context', () => {
      assertNodes("following-sibling::node()", h.getNodeComment(), h.followingSiblingNodes(h.getNodeComment()));
    });

    it('works for a processing instruction', () => {
      assertNodes("following-sibling::node()", h.getNodeProcessingInstruction(), h.followingSiblingNodes(h.getNodeProcessingInstruction()));
    });

    xit('works for a namespace context', () => {
      assertNodes("following-sibling::node()", h.getNodeNamespace(), []);
    });
  });

  describe('preceding-sibling axis', () => {
    it('works for a document context', () => {
      assertNodes("preceding-sibling::node()", doc, []);
    });

    //TODO
    xit('works for a documentElement context', () => {
      assertNodes("preceding-sibling::node()", doc.documentElement, h.precedingSiblingNodes(doc.documentElement));
    });

    it('works for a Element context', () => {
      assertNodes("preceding-sibling::node()", doc.getElementById('testStepAxisNodeElement'), h.precedingSiblingNodes(doc.getElementById('testStepAxisNodeElement')));
    });

    it('works for a Attribute context', () => {
      assertNodes("preceding-sibling::node()", h.getNodeAttribute(), []);
    });

    it('works for a CData context', () => {
      assertNodes("preceding-sibling::node()", h.getNodeCData(), h.precedingSiblingNodes(h.getNodeCData()));
    });

    it('works for a Comment context', () => {
      assertNodes("preceding-sibling::node()", h.getNodeComment(), h.precedingSiblingNodes(h.getNodeComment()));
    });

    it('works for a ProcessingInstruction context', () => {
      assertNodes("preceding-sibling::node()", h.getNodeProcessingInstruction(), h.precedingSiblingNodes(h.getNodeProcessingInstruction()));
    });

    xit('works for a Namespace context', () => {
      assertNodes("preceding-sibling::node()", h.getNodeNamespace(), []);
    });
  });

  describe('following axis', () => {
    it('works for a document context', () => {
      assertNodes("following::node()", doc, []);
    });

    it('works for a documentElement context', () => {
      assertNodes("following::node()", doc.documentElement, h.followingNodes(doc.documentElement));
    });

    it('works for an element context', () => {
      assertNodes("following::node()", doc.getElementById('testStepAxisNodeElement'), h.followingNodes(doc.getElementById('testStepAxisNodeElement')));
    });

    it('works for an attribute context', () => {
      assertNodes("following::node()", h.getNodeAttribute(), h.followingNodes(doc.getElementById('testStepAxisNodeAttribute')));
    });

    it('works for a CDATA context', () => {
      assertNodes("following::node()", h.getNodeCData(), h.followingNodes(h.getNodeCData()));
    });

    it('works for a comment context', () => {
      assertNodes("following::node()", h.getNodeComment(), h.followingNodes(h.getNodeComment()));
    });

    it('works for a processing instruction context', () => {
      assertNodes("following::node()", h.getNodeProcessingInstruction(), h.followingNodes(h.getNodeProcessingInstruction()));
    });

    xit('works for a namespace context', () => {
      assertNodes("following::node()", h.getNodeNamespace(), h.followingNodes(doc.getElementById('testStepAxisNodeNamespace')));
    });
  });

  describe('preceding axis', () => {
    it('works for a document context', () => {
      assertNodes("preceding::node()", doc, []);
    });
    // TODO
    // it('works for a documentElement context', () => {
    //   assertNodes("preceding::node()", doc.documentElement, h.precedingNodes(doc.documentElement));
    // });
    //
    // it('works for an element context', () => {
    //   assertNodes("preceding::node()", doc.getElementById('testStepAxisNodeElement'), h.precedingNodes(doc.getElementById('testStepAxisNodeElement')));
    // });
    //
    // it('works for an attribute context', () => {
    //   assertNodes("preceding::node()", h.getNodeAttribute(), h.precedingNodes(doc.getElementById('testStepAxisNodeAttribute')));
    // });
    //
    // it('works for a CDATA context', () => {
    //   assertNodes("preceding::node()", h.getNodeCData(), h.precedingNodes(h.getNodeCData()));
    // });
    //
    // it('works for a Comment context', () => {
    //   assertNodes("preceding::node()", h.getNodeComment(), h.precedingNodes(h.getNodeComment()));
    // });
    //
    // it('works for a processing instruction context', () => {
    //   assertNodes("preceding::node()", h.getNodeProcessingInstruction(), h.precedingNodes(h.getNodeProcessingInstruction()));
    // });
    //
    // xit('works for a Namespace context', () => {
    //     assertNodes("preceding::node()", h.getNodeNamespace(), h.precedingNodes(doc.getElementById('testStepAxisNodeNamespace')));
    // });
  });

  describe('attribute axis', () => {
    it('works for a document context', () => {
      assertNodes("attribute::node()", doc, []);
    });

    it('works for an attribute context', () => {
      assertNodes("attribute::node()", h.getNodeAttribute(), []);
    });

    it('works for a CDATA context', () => {
      assertNodes("attribute::node()", h.getNodeCData(), []);
    });

    it('works for a comment context', () => {
      assertNodes("attribute::node()", h.getNodeComment(), []);
    });

    it('works for a processing instruction context', () => {
      assertNodes("attribute::node()", h.getNodeProcessingInstruction(), []);
    });

    xit('works for a namespace context', () => {
      assertNodes("attribute::node()", h.getNodeNamespace(), []);
    });

    it('works for a 0 context', () => {
      assertNodes("attribute::node()", doc.getElementById('testStepAxisNodeAttribute0'), filterAttributes(doc.getElementById('testStepAxisNodeAttribute0').attributes));
    });

    it('works for a 1 context', () => {
      assertNodes("attribute::node()", doc.getElementById('testStepAxisNodeAttribute1'), filterAttributes(doc.getElementById('testStepAxisNodeAttribute1').attributes));
    });

    it('works for a 3: context', () => {
      assertNodes("attribute::node()", doc.getElementById('testStepAxisNodeAttribute3'), filterAttributes(doc.getElementById('testStepAxisNodeAttribute3').attributes));
    });

    it('works for a StartXml context', () => {
      assertNodes("attribute::node()", doc.getElementById('testStepAxisNodeAttributeStartXml'), filterAttributes(doc.getElementById('testStepAxisNodeAttributeStartXml').attributes));
    });
  });

  describe('namespace axis', () => {
    xit('works for a document context', () => {
      assertNodesNamespace("namespace::node()", doc, []);
    });

    xit('works for an attribute context', () => {
      assertNodesNamespace("namespace::node()", h.getNodeAttribute(), []);
    });

    // TODO
    xit('works for a CDATA context', () => {
      assertNodesNamespace("namespace::node()", h.getNodeCData(), []);
    });

    xit('works for a comment context', () => {
      assertNodesNamespace("namespace::node()", h.getNodeComment(), []);
    });

    xit('works for a processing instruction context', () => {
      assertNodesNamespace("namespace::node()", h.getNodeProcessingInstruction(), []);
    });

    xit('works for a namespace context', () => {
      assertNodesNamespace("namespace::node()", h.getNodeNamespace(), []);
    });

    xit('works for a document element context', () => {
      assertNodesNamespace("namespace::node()", doc.documentElement, [
          ['', 'http://www.w3.org/1999/xhtml'],
          ['ev', 'http://some-namespace.com/nss'],
          ['xml', 'http://www.w3.org/XML/1998/namespace']
     ]);
    });

    xit('works for a 0 context', () => {
      assertNodesNamespace("namespace::node()", doc.getElementById('testStepAxisNodeNamespace0'), [
          ['', 'http://www.w3.org/1999/xhtml'],
          ['ev', 'http://some-namespace.com/nss'],
          ['xml', 'http://www.w3.org/XML/1998/namespace']
     ]);
    });

    xit('works for a 1 context', () => {
      assertNodesNamespace("namespace::node()", doc.getElementById('testStepAxisNodeNamespace1'), [
          ['', 'http://www.w3.org/1999/xhtml'],
          ['a', 'asdf'],
          ['ev', 'http://some-namespace.com/nss'],
          ['xml', 'http://www.w3.org/XML/1998/namespace']
     ]);
    });

    // TODO
    xit('works for a 1 default context', () => {
      assertNodesNamespace("namespace::node()", doc.getElementById('testStepAxisNodeNamespace1defaultContainer').firstChild, [
          ['', 'asdf'],
          ['ev', 'http://some-namespace.com/nss'],
          ['xml', 'http://www.w3.org/XML/1998/namespace']]);
    });

    xit('works for a 1 default 2 context', () => {
      assertNodesNamespace("namespace::node()", doc.getElementById('testStepAxisNodeNamespace1defaultContainer2').firstChild, [
          ['ev', 'http://some-namespace.com/nss'],
          ['xml', 'http://www.w3.org/XML/1998/namespace']]);
    });

    // TODO
    xit('works for a 3 context', () => {
      const namespaces = [],
          contextNode = doc.getElementById('testStepAxisNodeNamespace3');

      namespaces.push(['', 'http://www.w3.org/1999/xhtml']);
      parseNamespacesFromAttributes(contextNode.attributes, namespaces);
      namespaces.push(['ev', 'http://some-namespace.com/nss']);
      namespaces.push(['xml', 'http://www.w3.org/XML/1998/namespace']);

      assertNodesNamespace("namespace::node()", contextNode, namespaces);
    });

    // TODO
    xit('works for a 3 default context', () => {
      const namespaces = [],
          contextNode = doc.getElementById('testStepAxisNodeNamespace3defaultContainer').firstChild;

      parseNamespacesFromAttributes(contextNode.attributes, namespaces);
      namespaces.push(['ev', 'http://some-namespace.com/nss']);
      namespaces.push(['xml', 'http://www.w3.org/XML/1998/namespace']);

      assertNodesNamespace("namespace::node()", contextNode, namespaces);
    });

    xit('works with an element context that overrides the namespace', () => {
      assertNodesNamespace("namespace::node()", doc.getElementById('testStepAxisNodeNamespaceXmlOverride'), [
          ['', 'http://www.w3.org/1999/xhtml'],
          ['ev', 'http://some-other-namespace/'],
          ['xml', 'http://www.w3.org/XML/1998/namespace']
     ]);
    });

    xit('works with "NoNamespaceNodeSharingAmongstElements" context', () => {
      let j, result, result2, item, item2, expectedResult;

      expectedResult = [
          ['', 'http://www.w3.org/1999/xhtml'],
          ['a', 'asdf'],
          ['ev', 'http://some-namespace.com/nss'],
          ['xml', 'http://www.w3.org/XML/1998/namespace']];

      result = doc.evaluate("namespace::node()", doc.getElementById('testStepAxisNodeNamespace1'), null, win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      result2 = doc.evaluate("namespace::node()", doc.getElementById('testStepAxisNodeNamespace1b'), null, win.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); //
      expect(result.snapshotLength).to.equal(expectedResult.length);
      expect(result2.snapshotLength).to.equal(expectedResult.length);

      for (j = 0; j < result.snapshotLength; j++) {
        item = result.snapshotItem(j);
        item2 = result2.snapshotItem(j);

        expect(item.nodeName).to.equal('#namespace');
        expect(item2.nodeName).to.equal('#namespace');

        expect(item.localName).to.equal(expectedResult[j][0]);
        expect(item2.localName).to.equal(expectedResult[j][0]);

        expect(item.namespaceURI).to.equal(expectedResult[j][1]);
        expect(item2.namespaceURI).to.equal(expectedResult[j][1]);

        expect(item2).to.not.deep.equal(item);
      }
    });

    xit('works with "SameNamespaceNodeOnSameElement" context', () => {
      let j, result, result2, item, item2, expectedResult;

      expectedResult = [
        ['', 'http://www.w3.org/1999/xhtml'],
        ['a', 'asdf'],
        ['ev', 'http://some-namespace.com/nss'],
        ['xml', 'http://www.w3.org/XML/1998/namespace']];

      const node = doc.getElementById('testStepAxisNodeNamespace1');
      result = xEval(node, null, "namespace::node()", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
      result2 = xEval(node, null, "namespace::node()", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);

      for (j = 0; j < result.snapshotLength; j++) {
        item = result.snapshotItem(j);
        item2 = result2.snapshotItem(j);

        expect(item.nodeName).to.equal('#namespace');
        expect(item.localName).to.equal(expectedResult[j][0]);
        expect(item.namespaceURI).to.equal(expectedResult[j][1]);
        expect(item2).to.deep.equal(item);
      }
    });
  });

  describe('attribute && namespace axes', () => {
    xit('works for Attrib1Ns1', () => {
      const attributes = [];
      let i;
      let contextNode;

      contextNode = doc.getElementById('testStepAxisNodeAttrib1Ns1');

      for (i = 0; i < contextNode.attributes.length; i++) {
        if (!contextNode.attributes[i].specified) {
          continue;
        }
        if (contextNode.attributes.item(i).nodeName.substring(0, 5) !== 'xmlns') {
          attributes.push(contextNode.attributes.item(i));
        }
      }

      assertNodes("attribute::node()", contextNode, attributes); //

      assertNodesNamespace("namespace::node()", contextNode, [
        ['', 'http://www.w3.org/1999/xhtml'],
        ['a', 'asdf'],
        ['ev', 'http://some-namespace.com/nss'],
        ['xml', 'http://www.w3.org/XML/1998/namespace']]);
    });

    xit('works for Attrib1Ns1reversed', () => {
      const attributes = [];
      let i;
      let contextNode;

      contextNode = doc.getElementById('testStepAxisNodeAttrib1Ns1reversed');

      for (i = 0; i < contextNode.attributes.length; i++) {
        if (!contextNode.attributes[i].specified) {
            continue;
        }
        if (contextNode.attributes.item(i).nodeName.substring(0, 5) !== 'xmlns') {
            attributes.push(contextNode.attributes.item(i));
        }
      }

      assertNodes("attribute::node()", contextNode, attributes);

      assertNodesNamespace("namespace::node()", contextNode, [
        ['', 'http://www.w3.org/1999/xhtml'],
        ['a', 'asdf'],
        ['ev', 'http://some-namespace.com/nss'],
        ['xml', 'http://www.w3.org/XML/1998/namespace']]);
    });

    xit('works for NodeAttrib2Ns1', () => {
      const attributes = [];
      let i;
      let contextNode;

      contextNode = doc.getElementById('testStepAxisNodeAttrib2Ns1');

      for (i = 0; i < contextNode.attributes.length; i++) {
        if (!contextNode.attributes[i].specified) {
            continue;
        }
        if (contextNode.attributes.item(i).nodeName.substring(0, 5) !== 'xmlns') {
            attributes.push(contextNode.attributes.item(i));
        }
      }

      assertNodes("attribute::node()", contextNode, attributes); //
      assertNodesNamespace("namespace::node()", contextNode, [
        ['', 'http://www.w3.org/1999/xhtml'],
        ['c', 'asdf3'],
        ['ev', 'http://some-namespace.com/nss'],
        ['xml', 'http://www.w3.org/XML/1998/namespace']]);
    });

    xit('works for Attrib2Ns1reversed', () => {
      const attributes = [];
      let i;
      let contextNode;

      contextNode = doc.getElementById('testStepAxisNodeAttrib2Ns1reversedContainer').firstChild;

      for (i = 0; i < contextNode.attributes.length; i++) {
        if (!contextNode.attributes[i].specified) {
            continue;
        }
        if (contextNode.attributes.item(i).nodeName.substring(0, 5) !== 'xmlns') {
            attributes.push(contextNode.attributes.item(i));
        }
      }

      assertNodes("attribute::node()", contextNode, attributes);

      assertNodesNamespace("namespace::node()", contextNode, [
          ['', 'asdf'],
          ['ev', 'http://some-namespace.com/nss'],
          ['xml', 'http://www.w3.org/XML/1998/namespace']]);
    });

    xit('works for NodeAttrib2Ns2', () => {
      const attributes = [];
      let i;
      let contextNode;

      contextNode = doc.getElementById('testStepAxisNodeAttrib2Ns2Container').firstChild;

      for (i = 0; i < contextNode.attributes.length; i++) {
        if (!contextNode.attributes[i].specified) {
            continue;
        }
        if (contextNode.attributes.item(i).nodeName.substring(0, 5) !== 'xmlns') {
            attributes.push(contextNode.attributes.item(i));
        }
      }

      assertNodes("attribute::node()", contextNode, attributes);

      assertNodesNamespace("namespace::node()", contextNode, [
        ['', 'asdf2'],
        ['a', 'asdf'],
        ['ev', 'http://some-namespace.com/nss'],
        ['xml', 'http://www.w3.org/XML/1998/namespace']]);
    });
  });
});
