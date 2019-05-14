// TODO do we need to support this?
// * MOVED TO ENKETO-CORE WHERE IT TRANSFORMED INTO REGULAR XPATH

describe('#indexed-repeat()', () => {
  TODO();

  // This function is now supported by translating it into regular XPath before passing to this evaluator.
  xit('indexed-repeat targeting div child of #testXPathEvaluate', () => {
    assertString("indexed-repeat(xhtml:div/xhtml:div, xhtml:div, 2)", 'some text');
  });

  xit('indexed-repeat targeting 3rd p-element in #testFunctionNodeset3', () => {
    initDoc(`
      <div id="testFunctionNodeset3">
				<div>
					<p>1</p>
				</div>
				<div>
					<p id="testFunctionNodeset3NodeP">2</p>
				</div>
				<div>
					<p>3</p>
				</div>
				<div>
					<p>4</p>
				</div>
			</div>`);
    let node = doc.getElementById('testFunctionNodeset3');
    assertString("indexed-repeat(xhtml:div/xhtml:p, xhtml:div, 3)", '3');

    // targeting 3rd p-element in #testFunctionNodeset3, in a more complex manner (triple-nested repeats)
    node = doc.getElementById('body');
    assertString("indexed-repeat(xhtml:div/xhtml:div/xhtml:div/xhtml:p, xhtml:div, 4, xhtml:div/xhtml:div, 2, xhtml:div/xhtml:div/xhtml:div, 3)", '3');
  });
});
