describe('#coalesce()', () => {
  it('should return first value if provided via xpath', () => {
    assertString('first', 'coalesce(/simple/xpath/to/node, "whatever")', 'first');
  });
  it('should return first value if provided via string', () => {
    assertString('coalesce("FIRST", "whatever")', 'FIRST');
  });
  it('should return second value from xpath if first value is empty string', () => {
    assertString('second', 'coalesce("", /simple/xpath/to/node)', 'second');
  });
  it('should return second value from string if first value is empty string', () => {
    assertString('coalesce("", "SECOND")', 'SECOND');
    assertString("coalesce('', 'ab')", 'ab');
  });
  it('should return second value from xpath if first value is empty xpath', () => {
    assertString('second', 'coalesce(/simple/empty, /simple/xpath/to/node)', 'second');
  });
  it('should return second value from string if first value is empty xpath', () => {
    assertString('', 'coalesce(/simple/xpath/to/node, "SECOND")', 'SECOND');
  });

  it( 'coalesce(self::*)', () => {
    initDoc(`
      <div id="FunctionSelectedCase">
        <div id="FunctionSelectedCaseEmpty"></div>
        <div id="FunctionSelectedCaseSingle">ab</div>
        <div id="FunctionSelectedCaseMultiple">ab cd ef gh</div>
        <div id="FunctionSelectedCaseMultiple">ij</div>
      </div>
      `);
    let node = doc.getElementById('FunctionSelectedCaseEmpty');
    assertString(node, null, "coalesce(self::*, 'ab')", 'ab');

    // TODO
    // node = doc.getElementById('FunctionSelectedCaseSingle');
    // assertString(node, null, "coalesce(self::*, 'cd')", 'ab');
  });
});
