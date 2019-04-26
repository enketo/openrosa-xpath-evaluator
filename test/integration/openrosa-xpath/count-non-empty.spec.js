describe( 'count-non-empty', () => {
  TODO()
  xit('count-non-empty', () => {
    initDoc(`
      <div id="FunctionCountNonEmpty">
  			<div>-5</div>
  			<div>-15</div>
  			<div></div>
  			<p>
  				<div></div>
  				<div><!--comment--></div>
  				<span>  </span>
  				<span>
  				</span>
  			</p>
  			<p></p>
  		</div>`);

    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:div)', 2);
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p)', 1);
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p/xhtml:div)', 0);
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]/xhtml:p/xhtml:span)', 2);
    assertNumber('count-non-empty(//xhtml:div[@id="FunctionCountNonEmpty"]//*)', 5);
    assertNumber('count-non-empty(//xhtml:div[@id="NoExist"]/xhtml:div)', 0);
  });

  xit( 'count-non-empty fails when too few, too many, or incorrect arguments are provided', () => {
    assert.throw(() => 'count-non-empty()', Error);
    assert.throw(() => 'count-non-empty(2)', Error);
    assert.throw(() => 'count-non-empty(0)', Error);
    assert.throw(() => 'count-non-empty("a")', Error);
  });
});
