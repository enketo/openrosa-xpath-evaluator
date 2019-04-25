describe('#min()', () => {

  it('simple value', () => {
    assertNumber('min(1, 2, 3)', 1);
    assertNumber('min(1, 2, 0)', 0);
    assertNumber('min(0, 2, 3)', 0);
    assertNumber('min(-1, 2, 3)', -1);
    assertNumber('min("")', NaN);
    assertNumber('min(//nonexisting)', NaN);
    assertNumber('min(//nonexisting)', NaN);
  })

  it('should return NaN if no numerical nodes are matched', () => {
    assertNumber('min(/simple)', NaN);
  });

  it('should return value of a single node if only one matches', () => {
    assertNumber('3', 'min(/simple/xpath/to/node)', 3);
  });

  it('should return NaN if any node evaluates to NaN', () => {
    initDoc(`
      <root>
        <item>3</item>
        <item>17</item>
        <item>-32</item>
        <item>cheese</item>
      </root>`);
    assert.isNaN(xEval('min(/root/item)').numberValue);
  });

  it('should return the min value in a node set', () => {
    initDoc(`
      <root>
        <item>3</item>
        <item>-17</item>
        <item>32</item>
      </root>`);
    assertNumber('min(/root/item)', -17);
  });

  it('should return the min value in a node set of negative numbers', () => {
    initDoc(`
        <root>
          <item>-3</item>
          <item>-17</item>
          <item>-32</item>
        </root>`);
    assertNumber('min(/root/item)', -32);
  });

  it('min(self::*) & min(*)', () => {
    initDoc(`
      <div id="FunctionNumberCase">
  			<div id="FunctionNumberCaseNumber">123</div>
  			<div id="FunctionNumberCaseNotNumber">  a a  </div>
  			<div id="FunctionNumberCaseNumberMultiple">
  				<div>-10</div>
  				<div>11</div>
  				<div>99</div>
  			</div>
  			<div id="FunctionNumberCaseNotNumberMultiple">
  				<div>-10</div>
  				<div>11</div>
  				<div>a</div>
  			</div>
  		</div>`);
    let node = doc.getElementById('FunctionNumberCaseNumber');
    assertNumber(node, null, "min(self::*)",  123);

    node = doc.getElementById('FunctionNumberCaseNumberMultiple');
    assertNumber(node, null, "min(*)",  -10);
  });

  it(() => {
    initDoc(`
      <div>
        <div id="FunctionMinCase">
    			<div>5</div>
    			<div>0</div>
    			<div>15</div>
    			<div>10</div>
  		  </div>

    		<div id="FunctionMaxCase">
    			<div>-5</div>
    			<div>0</div>
    			<div>-15</div>
    			<div>-10</div>
    		</div>

    		<div id="FunctionMaxMinCaseEmpty"></div>

    		<div id="FunctionMaxMinWithEmpty">
    			<div>-5</div>
    			<div>-15</div>
    			<div></div>
    		</div>
      </div>`);

      let node = doc.getElementById('FunctionMaxMinCaseEmpty');
      assertNumber(node, null, 'min(self::*)', NaN);

      node = doc.getElementById('FunctionMaxMinWithEmpty');
      assertNumber(node, null, 'min(*)', NaN);

      node = doc.getElementById('FunctionMinCase');
      assertNumber(node, null, 'min(*)', 0);

      node = doc.getElementById('FunctionM0nCase');
      assertNumber(node, null, 'min(*)', 0);

      node = doc.getElementById('FunctionNumberCaseNotNumberMultiple');
      assertNumber(node, null, 'min(node())', NaN);

      assertNumber("min(//*[@id='FunctionMinCase']/*[position()=1], //*[@id='FunctionMinCase']/*[position()=2], //*[@id='FunctionMinCase']/*[position()=3])')", 0);
  });
});
