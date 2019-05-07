describe( 'nodeset id() function', () => {
  beforeEach(() => {
    initDoc(`
      <div id="FunctionNodesetIdCase">
  			<div id="FunctionNodesetIdCaseSimple"></div>
  			<div id="FunctionNodesetIdCaseNoDefaultNamespaceContainer">
          <div id="FunctionNodesetIdCaseNoDefaultNamespace" xmlns=""></div>
        </div>
  			<div id="FunctionNodesetIdCaseXhtmlDefaultNamespaceContainer"><div id="FunctionNodesetIdCaseXhtmlDefaultNamespace" xmlns="http://www.w3.org/1999/xhtml"></div></div>
  			<div id="FunctionNodesetIdCaseXhtmlNamespaceContainer"><div xhtml:id="FunctionNodesetIdCaseXhtmlNamespace" xmlns:xhtml="http://www.w3.org/1999/xhtml"></div></div>
  			<div id="FunctionNodesetIdCaseXhtmlNamespaceParentContainer" xmlns:xhtml="http://www.w3.org/1999/xhtml"><div xhtml:id="FunctionNodesetIdCaseXhtmlNamespaceParent"></div></div>
  			<div id="FunctionNodesetIdXmlNamespaceContainer"><div xml:id="FunctionNodesetIdXmlNamespace" xmlns=""></div>
      </div>`);
  })

  it( 'works for a simple case', () => {
    const node = doc.getElementById('FunctionNodesetIdCaseSimple');
    assert.equal(typeof node, 'object');
    checkNodeResult("id('FunctionNodesetIdCaseSimple')", doc, [node]);
  });

  it( 'works if ID is provided in duplicate', () => {
    const node = doc.getElementById('FunctionNodesetIdCaseSimple');
    assert.equal(typeof node, 'object');
    checkNodeResult( "id('FunctionNodesetIdCaseSimple FunctionNodesetIdCaseSimple')", doc, [node]);
  });

  it('returns empty result for non-existing ID', () => {
    checkNodeResult( "id('FunctionNodesetIdCaseSimpleDoesNotExist')", doc, []);
  });

  xit('returns empty result if the default namespace for the node is empty', () => {
    const NODE_NAME='FunctionNodesetIdCaseNoDefaultNamespace';
    const node = doc.getElementById(`${NODE_NAME}Container`).firstChild;
    assert.equal(typeof node, 'object');
    checkNodeResult(`id('${NODE_NAME}')`, doc, []);
  });

  it( 'works if the default namespace for the node is the XHTML namespace', () => {
    const NODE_NAME = 'FunctionNodesetIdCaseXhtmlDefaultNamespace';
    const node = doc.getElementById(`${NODE_NAME}Container`).firstChild;
    assert.equal(typeof node, 'object');
    checkNodeResult(`id('${NODE_NAME}')`, doc, [node]);
  });

  xit('works if the namespace of the id attribute is the XHTML namespace', () => {
    const NODE_NAME = 'FunctionNodesetIdCaseXhtmlNamespace';
    const node = doc.getElementById(`${NODE_NAME}Container`).firstChild;
    assert.equal(typeof node, 'object');
    checkNodeResult(`id('${NODE_NAME}')`, doc, [node]);
  });

  xit('works if the namespace of the id attribute is defined in the parent container', () => {
    const NODE_NAME = 'FunctionNodesetIdCaseXhtmlDefaultNamespaceParent';
    const node = doc.getElementById(`${NODE_NAME}Container`).firstChild;
    assert.equal(typeof node, 'object');
    checkNodeResult(`id('${NODE_NAME}')`, doc, [node]);
  });

  xit('works if the id attribute has the xml namespace alias', () => {
    const NODE_NAME = 'FunctionNodesetIdXmlNamespace';
    const node = doc.getElementById(`${NODE_NAME}Container`).firstChild;
    assert.equal(typeof node, 'object');
    checkNodeResult(`id('${NODE_NAME}')`, doc, [node]);
  });

  xit('works if multiple space-separated IDs are provided as the parameter', () => {
    checkNodeResult("id('FunctionNodesetIdCaseMultiple1 FunctionNodesetIdCaseMultiple2 FunctionNodesetIdCaseMultiple3')", doc, [
      doc.getElementById('FunctionNodesetIdCaseMultiple1'),
      doc.getElementById('FunctionNodesetIdCaseMultiple2'),
      doc.getElementById('FunctionNodesetIdCaseMultiple3')
    ]);
  });

  xit('works if multiple space/newline/table-separated IDs are provided as the parameter', () => {
    checkNodeResult("id('  FunctionNodesetIdCaseMultiple1 sss FunctionNodesetIdCaseMultiple2\r\n\tFunctionNodesetIdCaseMultiple3\t')", doc, [
      doc.getElementById('FunctionNodesetIdCaseMultiple1'),
      doc.getElementById('FunctionNodesetIdCaseMultiple2'),
      doc.getElementById('FunctionNodesetIdCaseMultiple3')
    ]);
  });

  xit( 'works if a nodeset is provided as the argument (by using the content of the nodeset)', () => {
    checkNodeResult("id(.)", doc.getElementById( 'FunctionNodesetIdCaseNodeset' ), []);

    // this test is tricky, the argument is the CONTENT of the FunctionNodesetIdCaseNodeset element!
    checkNodeResult("id(child::*)", doc.getElementById('FunctionNodesetIdCaseNodeset'), [
      doc.getElementById('FunctionNodesetIdCaseMultiple1'),
      doc.getElementById('FunctionNodesetIdCaseMultiple2'),
      doc.getElementById('FunctionNodesetIdCaseMultiple3'),
      doc.getElementById('FunctionNodesetIdCaseMultiple4')
    ]);
  });
});
