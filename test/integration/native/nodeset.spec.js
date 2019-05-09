describe('native nodeset functions', () => {

  it('last()', () => {
    initDoc(`
      <div id="testFunctionNodeset">
  			<div id="testFunctionNodeset2">
  				<p>1</p>
  				<p>2</p>
  				<p>3</p>
  				<p>4</p>
  			</div>`);

    [
      ["last()", 1],
      // ["xhtml:p[last()]", 4],
      // [ "xhtml:p[last()-last()+1]", 1 ]
    ].forEach(t => {
      const node = doc.getElementById('testFunctionNodeset2');
      const ns = getXhtmlResolver(doc);
      const res = doc.evaluate(t[0], node, ns, XPathResult.NUMBER_TYPE, null);
      assert.equal(res.numberValue, t[1]);
    });
  });

  it('last() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("last(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  xit('position()', () => {
    [
      ["position()", 1],
      // [ "*[position()=last()]", 4 ],
      // [ "*[position()=2]", 2 ],
      // [ "xhtml:p[position()=2]", 2 ]
    ].forEach( t => {
      const result = doc.evaluate(t[0], doc.getElementById('testFunctionNodeset2'), getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
      assert.equal(result.numberValue, t[1]);
    });

    // [
    //   [ "*[position()=-1]", "" ]
    // ].forEach( t => {
    //   const result = doc.evaluate(t[0], doc.getElementById('testFunctionNodeset2'), getXhtmlResolver(doc), XPathResult.STRING_TYPE, null);
    //   assert.equal(result.stringValue, t[1]);
    // });
  });

  it('position() fails when too many args are provided', () => {
    const test = () => {
      doc.evaluate("position(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  xit('count()', () => {
    [
      [ "count(xhtml:p)", 4 ],
      [ "count(p)", 0 ],
      [ "count(//nonexisting)", 0 ]
    ].forEach( t => {
      const result = doc.evaluate(t[0], doc.getElementById('testFunctionNodeset2'), getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
      assert.equal(result.numberValue, t[1]);
    });

    /*
    [
        ["count(.)", doc.getElementsByName('##########'),1]
    ].forEach(function(t){
        var result = doc.evaluate(t[0], t[1], helpers.getXhtmlResolver(doc), g.win.XPathResult.NUMBER_TYPE, null);
        expect(result.numberValue).to.equal(t[2]);
    });
    */
  });

  it( 'count() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("count(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('count() fails when too few arguments are provided', () => {
    const test = () => {
      doc.evaluate("count()", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throws(test, Error);
  });

  it( 'count() fails when incorrect argument type is provided', () => {
    const test = () => {
      doc.evaluate("count(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  xit('local-name()', () => {
    let result;
    let input;
    let i;
    let node;
    const nodeWithAttributes = doc.getElementById( 'testFunctionNodesetAttribute' );
    const nodeAttributes = filterAttributes(nodeWithAttributes.attributes );
    let nodeAttributesIndex;

    for ( i = 0; i < nodeAttributes.length; i++ ) {
      if ( nodeAttributes[ i ].nodeName == 'ev:class' ) {
        nodeAttributesIndex = i;
        break;
      }
    }

    input = [
      [ "local-name(/htmlnot)", doc, "" ], // empty
      [ "local-name()", doc, "" ], // document
      [ "local-name()", doc.documentElement, "html" ], // element
      [ "local-name(self::node())", doc.getElementById( 'testFunctionNodesetElement' ), "div" ], // element
      [ "local-name()", doc.getElementById( 'testFunctionNodesetElement' ), "div" ], // element
      [ "local-name()", doc.getElementById( 'testFunctionNodesetElementPrefix' ).firstChild, "div2" ], // element
      [ "local-name(node())", doc.getElementById( 'testFunctionNodesetElementNested' ), "span" ], // element nested
      [ "local-name(self::node())", doc.getElementById( 'testFunctionNodesetElementNested' ), "div" ], // element nested
      [ "local-name()", doc.getElementById( 'testFunctionNodesetComment' ).firstChild, "" ], // comment
      [ "local-name()", doc.getElementById( 'testFunctionNodesetText' ).firstChild, "" ], // text
      [ "local-name(attribute::node())", nodeWithAttributes, nodeAttributes[ 0 ].nodeName ], // attribute
      [ `local-name(attribute::node()[${nodeAttributesIndex + 1}])`, nodeWithAttributes, 'class' ] // attribute
    ];

    // Processing Instruction
    node = doc.getElementById('testFunctionNodesetProcessingInstruction').firstChild;
    if (node && node.nodeType == 7) {
      input.push( [ "local-name()", node, 'xml-stylesheet' ] );
    }

    // CDATASection
    node = doc.getElementById('testFunctionNodesetCData').firstChild;
    if ( node && node.nodeType == 4 ) {
      input.push(["local-name()", node, '' ]);
    }

    for (i = 0; i < input.length; i++) {
      result = doc.evaluate( input[ i ][ 0 ], input[ i ][ 1 ], null, g.win.XPathResult.STRING_TYPE, null );
      expect( result.stringValue.toLowerCase() ).to.equal( input[ i ][ 2 ] );
    }
  });

  xit('local-name() with namespace', () => {
    [
      ["local-name(namespace::node())", doc.getElementById('testFunctionNodesetNamespace'), ""],
      ["local-name(namespace::node()[2])", doc.getElementById('testFunctionNodesetNamespace'), "asdf"]
    ].forEach( t => {
      assertString(t[1], null, t[0], t[2]);
    });
  });

  it('local-name() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate( "local-name(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  xit('local-name() fails when the wrong type argument is provided', () => {
    const test = () => {
      doc.evaluate("local-name(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  xit( 'namespace-uri()', () => {
    let result;
    let input;
    let i;
    let node;
    const nodeWithAttributes = doc.getElementById( 'testFunctionNodesetAttribute' );
    const nodeAttributes = helpers.filterAttributes( nodeWithAttributes.attributes );
    let nodeAttributesIndex;

    for (i = 0; i < nodeAttributes.length; i++) {
      if (nodeAttributes[ i ].nodeName == 'ev:class') {
        nodeAttributesIndex = i;
        break;
      }
    }

    input = [
      ["namespace-uri(/htmlnot)", doc, ""], // empty
      ["namespace-uri()", doc, ""], // document
      ["namespace-uri()", doc.documentElement, "http://www.w3.org/1999/xhtml"], // element
      ["namespace-uri(self::node())", doc.getElementById( 'testFunctionNodesetElement'), "http://www.w3.org/1999/xhtml" ], // element
      ["namespace-uri()", doc.getElementById( 'testFunctionNodesetElement'), "http://www.w3.org/1999/xhtml" ], // element
      ["namespace-uri(node())", doc.getElementById( 'testFunctionNodesetElementNested'), "http://www.w3.org/1999/xhtml" ], // element nested
      ["namespace-uri(self::node())", doc.getElementById( 'testFunctionNodesetElementNested'), "http://www.w3.org/1999/xhtml" ], // element nested
      ["namespace-uri()", doc.getElementById( 'testFunctionNodesetElementPrefix').firstChild, "http://some-namespace.com/nss" ], // element
      ["namespace-uri()", doc.getElementById( 'testFunctionNodesetComment').firstChild, "" ], // comment
      ["namespace-uri()", doc.getElementById( 'testFunctionNodesetText').firstChild, "" ], // text
      ["namespace-uri(attribute::node())", nodeWithAttributes, ''], // attribute
      [`namespace-uri(attribute::node()[${nodeAttributesIndex + 1}])`, nodeWithAttributes, 'http://some-namespace.com/nss' ], // attribute
      ["namespace-uri(namespace::node())", doc.getElementById('testFunctionNodesetNamespace' ), "" ], // namespace
      ["namespace-uri(namespace::node()[2])", doc.getElementById('testFunctionNodesetNamespace' ), "" ] // namespace
    ];

    // Processing Instruction
    node = doc.getElementById('testFunctionNodesetProcessingInstruction').firstChild;
    if(node && node.nodeType == 7) {
      input.push(["namespace-uri()", node, '']);
    }

    // CDATASection
    node = doc.getElementById('testFunctionNodesetCData').firstChild;
    if(node && node.nodeType == 4) {
      input.push(["namespace-uri()", node, '']);
    }

    for(i = 0; i < input.length; i++) {
      result = doc.evaluate(input[i][0], input[i][1], null, XPathResult.STRING_TYPE, null);
      expect(result.stringValue).to.equal(input[i][2]);
    }
  });

  it('namespace-uri() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("namespace-uri(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  xit('namespace-uri() fails when wrong type of argument is provided', () => {
    const test = () => {
      doc.evaluate("namespace-uri(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  xit('name()', () => {
    let result;
    let input;
    let i;
    let node;
    const nodeWithAttributes = doc.getElementById( 'testFunctionNodesetAttribute' );
    const nodeAttributes = helpers.filterAttributes( nodeWithAttributes.attributes );
    let nodeAttributesIndex;

    for (i = 0; i < nodeAttributes.length; i++) {
      if (nodeAttributes[i].nodeName == 'ev:class') {
        nodeAttributesIndex = i;
        break;
      }
    }

    input = [
      [ "name(/htmlnot)", doc, "" ], // empty
      [ "name()", doc, "" ], // document
      [ "name()", doc.documentElement, "html" ], // element
      [ "name(self::node())", doc.getElementById( 'testFunctionNodesetElement' ), "div" ], // element
      [ "name()", doc.getElementById( 'testFunctionNodesetElement' ), "div" ], // element
      [ "name(node())", doc.getElementById( 'testFunctionNodesetElementNested' ), "span" ], // element nested
      [ "name(self::node())", doc.getElementById( 'testFunctionNodesetElementNested' ), "div" ], // element nested
      [ "name()", doc.getElementById( 'testFunctionNodesetElementPrefix' ).firstChild, "ev:div2" ], // element
      [ "name()", doc.getElementById( 'testFunctionNodesetComment' ).firstChild, "" ], // comment
      [ "name()", doc.getElementById( 'testFunctionNodesetText' ).firstChild, "" ], // text
      [ "name(attribute::node())", nodeWithAttributes, nodeAttributes[ 0 ].nodeName ], // attribute
      [ `name(attribute::node()[${nodeAttributesIndex + 1}])`, nodeWithAttributes, 'ev:class' ], // attribute
      [ "name(namespace::node())", doc.getElementById( 'testFunctionNodesetNamespace' ), "" ], // namespace
      [ "name(namespace::node()[2])", doc.getElementById( 'testFunctionNodesetNamespace' ), "asdf" ] // namespace
    ];

    // Processing Instruction
    node = doc.getElementById( 'testFunctionNodesetProcessingInstruction' ).firstChild;
    if (node && node.nodeType == 7 ) {
      input.push( [ "name()", node, 'xml-stylesheet' ] );
    }

    // CDATASection
    node = doc.getElementById( 'testFunctionNodesetCData' ).firstChild;
    if (node && node.nodeType == 4 ) {
      input.push( [ "name()", node, '' ] );
    }

    for (i = 0; i < input.length; i++ ) {
      result = doc.evaluate(input[i][0], input[i][1], null, XPathResult.STRING_TYPE, null);
      expect(result.stringValue).to.equal(input[i][2]);
    }
  });

  it('name() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("name(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  xit('name() fails when the wrong argument type is provided', () => {
    const test = () => {
      doc.evaluate("name(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });
});
