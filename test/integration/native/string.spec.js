describe('native string functions', () => {

  it('string() conversion of strings, numbers, booleans', () => {
    assertString("string('-1.0')", "-1.0");
    assertString("string('1')", "1");
    assertString("string('  \nhello \n\r')", "  \nhello \n\r");
    assertString("string('')", "");
    assertString("string('As Df')", "As Df");

    // of numbers
    // assertString("string(number('-1.0a'))", "NaN");
    assertString("string(0)", "0");
    assertString("string(-0)", "0");
    // assertString("string(1 div 0)", "Infinity");
    // assertString("string(-1 div 0)", "-Infinity");
    assertString("string(-123)", "-123");
    assertString("string(123)", "123");
    assertString("string(123.)", "123");
    assertString("string(123.0)", "123");
    assertString("string(.123)", "0.123");
    assertString("string(-0.1000)", "-0.1");
    assertString("string(1.1)", "1.1");
    assertString("string(-1.1)", "-1.1");

    // of booleans
    assertString("string(true())", "true");
    assertString("string(false())", "false");
  });

  it('string() conversion of nodesets', () => {
    initDoc(`
      <div id="FunctionStringCase">
  			<div id="FunctionStringCaseStringNodesetElement">aaa</div>
  			<div id="FunctionStringCaseStringNodesetElementNested"><span>bbb</span>sss<span></span><div>ccc<span>ddd</span></div></div>
  			<div id="FunctionStringCaseStringNodesetComment"><!-- hello world --></div>
  			<div id="FunctionStringCaseStringNodesetText">here is some text</div>
  			<div id="FunctionStringCaseStringNodesetProcessingInstruction"><?xml-stylesheet type="text/xml" href="test.xsl"?></div>
  			<div id="FunctionStringCaseStringNodesetCData"><![CDATA[some cdata]]></div>
  			<div id="FunctionStringCaseStringNodesetAttribute" class="123" width="  1   00%  "></div>
  			<div id="FunctionStringCaseStringNodesetNamespace" xmlns:asdf="http://www.123.com/"></div>
  			<div id="FunctionStringCaseStringLength1"></div>
  			<div id="FunctionStringCaseStringLength2">asdf</div>
  			<div id="FunctionStringCaseStringNormalizeSpace1"></div>
  			<div id="FunctionStringCaseStringNormalizeSpace2">   </div>
  			<div id="FunctionStringCaseStringNormalizeSpace3">  a  b  </div>
  			<div id="FunctionStringCaseStringNormalizeSpace4">  a
  				 bc  c
  			</div>
  		</div>`);
    let result;
    let input;
    let i;
    let node;
    const nodeWithAttributes = doc.getElementById( 'FunctionStringCaseStringNodesetAttribute' );

    input = [
      [ "string(/htmlnot)", doc, "" ], // empty
      [ "string(self::node())", doc.getElementById( 'FunctionStringCaseStringNodesetElement' ), "aaa" ], // element
      [ "string()", doc.getElementById( 'FunctionStringCaseStringNodesetElement' ), "aaa" ], // element
      //TODO [ "string(node())", doc.getElementById( 'FunctionStringCaseStringNodesetElementNested' ), "bbb" ], // element nested
      [ "string(self::node())", doc.getElementById( 'FunctionStringCaseStringNodesetElementNested' ), "bbbssscccddd" ], // element nested
      [ "string()", doc.getElementById( 'FunctionStringCaseStringNodesetElementNested' ), "bbbssscccddd" ], // element nested
      [ "string()", doc.getElementById( 'FunctionStringCaseStringNodesetComment').firstChild, " hello world " ], // comment
      [ "string()", doc.getElementById( 'FunctionStringCaseStringNodesetText').firstChild, "here is some text" ], // text
      [ "string(attribute::node()[1])", nodeWithAttributes, filterAttributes( nodeWithAttributes.attributes )[ 0 ].nodeValue ], // attribute
      [ "string(attribute::node()[3])", nodeWithAttributes, filterAttributes( nodeWithAttributes.attributes )[ 2 ].nodeValue ] // attribute
    ];

    // Processing Instruction
    node = doc.getElementById( 'FunctionStringCaseStringNodesetProcessingInstruction').firstChild;
    if(node && node.nodeType == 7) {
      input.push( [ "string()", node, 'type="text/xml" href="test.xsl"' ] );
    }
    // CDATASection
    node = doc.getElementById( 'FunctionStringCaseStringNodesetCData').firstChild;
    if(node && node.nodeType == 4) {
      input.push( [ "string()", node, 'some cdata' ] );
    }

    for(i = 0; i < input.length; i++) {
      assertString(input[i][1], null, input[i][0], input[i][2]);
    }
  });

  xit('string conversion of nodeset with namepace', () => {
    const node = doc.getElementById('FunctionStringCaseStringNodesetNamespace');
    assertString(node, null, "string(namespace::node())", "http://www.w3.org/1999/xhtml");
  });

  it('string conversion fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("string(1, 2)", doc, getXhtmlResolver(doc), XPathResult.STRING_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('concat()', () => {
    assertString("concat(0, 0)", "00");
    assertString("concat('', '', 'b')", "b");
    assertString("concat('a', '', 'c')", "ac");
    assertString("concat('a', 'b', 'c', 'd', 'e')", "abcde");
  });

  //in javarosa this needs to return ''
  xit('concat() fails when not enough arguments provided', () => {
      let test = () => {
          doc.evaluate( "concat()", doc, helpers.getXhtmlResolver( doc ), win.XPathResult.STRING_TYPE, null );
      };
      expect(test).to.throw( win.Error );

      test = () => {
          doc.evaluate( "concat(1)", doc, helpers.getXhtmlResolver( doc ), win.XPathResult.STRING_TYPE, null );
      };
      expect(test).to.throw( win.Error );
  } );

  it('starts-with', () => {
    assertTrue("starts-with('', '')");
    assertTrue("starts-with('a', '')");
    assertTrue("starts-with('a', 'a')");
    assertFalse("starts-with('a', 'b')");
    assertTrue("starts-with('ba', 'b')");
    assertFalse("starts-with('', 'b')");
  });

  it('starts-with() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate( "starts-with(1, 2, 3)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('start-with() fails when not enough arguments are provided', () => {
    let test = () => {
      doc.evaluate("starts-with()", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);

    test = () => {
      doc.evaluate("starts-with(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('contains()', () => {
    assertTrue("contains('', '')");
    assertFalse("contains('', 'a')");
    assertTrue("contains('a', 'a')");
    assertTrue("contains('a', '')");
    assertTrue("contains('asdf', 'sd')");
    assertFalse("contains('asdf', 'af')");
  });

  it('contains() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("contains(1, 2, 3)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('contains() fails when too few arguments are provided', () => {
    let test = () => {
      doc.evaluate( "contains()", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);

    test = () => {
      doc.evaluate( "contains(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('substring-before()', () => {
    assertString("substring-before('', '')", '');
    assertString("substring-before('', 'a')", '');
    assertString("substring-before('a', '')", '');
    assertString("substring-before('a', 'a')", '');
    assertString("substring-before('ab', 'a')", '');
    assertString("substring-before('ab', 'b')", 'a');
    assertString("substring-before('abb', 'b')", 'a');
    assertString("substring-before('ab', 'c')", '');
  });

  it('substring-before() fails with too many arguments', () => {
    const test = () => {
      doc.evaluate("substring-before(1, 2, 3)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('substring-before() with too few arguments', () => {
    let test = () => {
      doc.evaluate("substring-before()", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
    test = () => {
      doc.evaluate("substring-before(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('substring-after()', () => {
    assertString("substring-after('', '')", '');
    assertString("substring-after('', 'a')", '');
    assertString("substring-after('a', '')", 'a');
    assertString("substring-after('a', 'a')", '');
    assertString("substring-after('ab', 'a')", 'b');
    assertString("substring-after('aab', 'a')", 'ab');
    assertString("substring-after('ab', 'b')", '');
    assertString("substring-after('ab', 'c')", '');
  });

  it('substring-after() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("substring-after(1, 2, 3)", doc, getXhtmlResolver(doc), win.XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('substring-after() fails when too few arguments are provided', () => {
    let test = () => {
      doc.evaluate( "substring-after()", doc, getXhtmlResolver( doc ), win.XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);

    test = () => {
      doc.evaluate( "substring-after(1)", doc, getXhtmlResolver(doc), win.XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('substring()', () => {
    assertString("substring('12345', 2, 3)", '234');
    assertString("substring('12345', 2)", '2345');
    // assertString("substring('12345', -1)", '12345');
    assertString("substring('12345', 1 div 0)", '');
    assertString("substring('12345', 0 div 0)", '');
    // assertString("substring('12345', -1 div 0)", '12345');
    assertString("substring('12345', 1.5, 2.6)", '234');
    assertString("substring('12345', 1.3, 2.3)", '12');
    assertString("substring('12345', 0, 3)", '12');
    assertString("substring('12345', 0, -1 div 0)", '');
    assertString("substring('12345', 0 div 0, 3)", '');
    assertString("substring('12345', 1, 0 div 0)", '');
    // assertString("substring('12345', -42, 1 div 0)", '12345');
    assertString("substring('12345', -1 div 0, 1 div 0)", '');
  });

  it('substring() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("substring(1, 2, 3, 4)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('substring() fails when too few arguments are provided', () => {
    let test = () => {
      doc.evaluate("substring()", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);

    test = () => {
      doc.evaluate("substring(1)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('string-length()', () => {
    [
      [ "string-length('')", 0, doc ],
      [ "string-length(' ')", 1, doc ],
      [ "string-length('\r\n')", 2, doc ],
      [ "string-length('a')", 1, doc ],
      // [ "string-length()", 0, doc.getElementById( 'FunctionStringCaseStringLength1' ) ],
      // [ "string-length()", 4, doc.getElementById( 'FunctionStringCaseStringLength2' ) ]
    ].forEach( t => {
      assertNumber(t[2], null, t[0], t[1]);
    });
  });

  it('string-length() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate( "string-length(1, 2)", doc, getXhtmlResolver(doc), XPathResult.NUMBER_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('normalize-space', () => {
    [
      [ "normalize-space('')", '', doc ],
      [ "normalize-space('    ')", '', doc ],
      [ "normalize-space('  a')", 'a', doc ],
      [ "normalize-space('  a  ')", 'a', doc ],
      [ "normalize-space('  a b  ')", 'a b', doc ],
      [ "normalize-space('  a  b  ')", 'a b', doc ],
      [ "normalize-space(' \r\n\t')", '', doc ],
      // [ "normalize-space(' \f\v ')", '\f\v', doc ],
      // [ "normalize-space('\na  \f \r\v  b\r\n  ')", 'a \f \v b', doc ],
      // [ "normalize-space()", '', doc.getElementById( 'FunctionStringCaseStringNormalizeSpace1' ) ],
      // [ "normalize-space()", '', doc.getElementById( 'FunctionStringCaseStringNormalizeSpace2' ) ],
      // [ "normalize-space()", 'a b', doc.getElementById( 'FunctionStringCaseStringNormalizeSpace3' ) ],
      // [ "normalize-space()", 'a bc c', doc.getElementById( 'FunctionStringCaseStringNormalizeSpace4' ) ]
    ].forEach( t => {
      assertString(t[2], null, t[0], t[1]);
    });
  });

  it('normalize-space() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate( "normalize-space(1,2)", doc, getXhtmlResolver(doc), XPathResult.STRING_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('translate()', () => {
    [
      [ "translate('', '', '')", '' ],
      [ "translate('a', '', '')", 'a' ],
      [ "translate('a', 'a', '')", '' ],
      [ "translate('a', 'b', '')", 'a' ],
      [ "translate('ab', 'a', 'A')", 'Ab' ],
      [ "translate('ab', 'a', 'AB')", 'Ab' ],
      [ "translate('aabb', 'ab', 'ba')", 'bbaa' ],
      [ "translate('aa', 'aa', 'bc')", 'bb' ]
    ].forEach( t => {
      assertString(t[0], t[1]);
    });
  });

  it('translate() fails when too many arguments are provided', () => {
    const test = () => {
      doc.evaluate("translate(1, 2, 3, 4)", doc, getXhtmlResolver(doc), XPathResult.STRING_TYPE, null);
    };
    assert.throw(test, Error);
  });

  it('translate() fails when too few arguments are provided', () => {
    let test = () => {
      doc.evaluate("translate()", doc, getXhtmlResolver(doc), XPathResult.STRING_TYPE, null);
    };
    assert.throw(test, Error);

    test = () => {
      doc.evaluate("translate(1)", doc, getXhtmlResolver(doc), XPathResult.STRING_TYPE, null);
    };
    assert.throw(test, Error);

    test = () => {
      doc.evaluate("translate(1,2)", doc, getXhtmlResolver(doc), XPathResult.STRING_TYPE, null);
    };
    assert.throw(test, Error);
  });
});
