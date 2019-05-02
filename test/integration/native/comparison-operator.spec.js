describe('Comparison operator', () => {
  const assertOps1 = (val1, val2, expected) => {
    ['=', '!='].map((op, idx) => {
      assertBoolean(`${val1} ${op} ${val2}`, expected[idx])
    });
  };

  it( 'correctly evaluates = and !=', () => {
    assertOps1(1, 1, [true, false]);
    assertOps1(1, 0, [false, true]);
    assertOps1(1, '1', [true, false]);
    assertOps1(1, '0', [false, true]);
    assertOps1(1, 'true()', [true, false]);
    assertOps1(1, 'false()', [false, true]);
    assertOps1(0, 'false()', [true, false]);
    assertOps1('true()', 'true()', [true, false]);
    assertOps1('false()', 'false()', [true, false]);
    assertOps1('true()', 1, [true, false]);
    assertOps1('true()', '""', [false, true]);
    // assertOps1('false()', 0, [false, true]);
    assertOps1('false()', '""', [true, false]);
    assertOps1('"1a"', '"1a"', [true, false]);
    assertOps1('"1"', '"0"', [false, true]);
    assertOps1('""', '""', [true, false]);
    assertOps1('""', '"0"', [false, true]);
  });


  const assertOps2 = (val1, val2, expected) => {
    [ '<', '<=', '>', '>=' ].map((op, idx) => {
      assertBoolean(`${val1} ${op} ${val2}`, expected[idx]);
    });
  };

  it( 'correctly evaluates <, <=, > and >=', () => {
    assertOps2("1", "2", [true, true, false, false]);
    assertOps2("1", "1", [false, true, false, true ]);
    assertOps2("1", "0", [false, false, true, true ]);
    assertOps2("1", "'2'", [true, true, false, false ]);
    assertOps2("1", "'1'", [false, true, false, true ]);
    assertOps2("1", "'0'", [false, false, true, true ]);
    assertOps2("2", "true()", [false, false, true, true]);
    assertOps2("1", "true()", [false, true, false, true]);
    assertOps2("1", "false()", [false, false, true, true]);
    assertOps2("0", "false()", [false, true, false, true]);
    assertOps2("0", "true()", [true, true, false, false]);
    assertOps2("true()", "2", [ true, true, false, false]);
    assertOps2("true()", "1", [ false, true, false, true]);
    assertOps2("false()", "1", [ true, true, false, false]);
    assertOps2("false()", "0", [ false, true, false, true]);
    assertOps2("true()", "0", [ false, false, true, true]);
    assertOps2("true()", "true()", [ false, true, false, true]);
    assertOps2("true()", "false()", [ false, false, true, true]);
    assertOps2("false()", "false()", [ false, true, false, true]);
    assertOps2("false()", "true()", [ true, true, false, false]);
    assertOps2("true()", "'1'", [ false, true, false, true]);
    // assertOps2("true()", "''", [ false, false, false, false]);
    assertOps2("false()", "'0'", [ false, true, false, true]);
    // assertOps2("false()", "''", [ false, false, false, false]);
    assertOps2("'2'", "1", [ false, false, true, true]);
    assertOps2("'1'", "1", [ false, true, false, true]);
    assertOps2("'0'", "1", [ true, true, false, false]);
    assertOps2("'1'", "true()", [ false, true, false, true]);
    // assertOps2("''", "true()", [ false, false, false, false]);
    assertOps2("'0'", "false()", [ false, true, false, true]);
    // assertOps2("''", "false()", [ false, false, false, false]);
    // assertOps2("'1a'", "'1a'", [ false, false, false, false]);
    assertOps2("'1'", "'0'", [ false, false, true, true]);
    // assertOps2("''", "''", [ false, false, false, false]);
    // assertOps2("''", "'0'", [ false, false, false, false]);
  });
});


// g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )
// g.doc.getElementById( 'ComparisonOperatorCaseNodesetEmpty' )

// [[ "-10", "*" ], [ true, true, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetNegative5to5' )],
// [[ "10", "*" ], [ false, false, true, true ], 5to5],
// [[ "5", "*" ], [ false, true, true, true ], 5to5],
// [[ "2", "*" ], [ true, true, true, true ], 5to5],
// [[ "0", "*" ], [ false, false, false, false ], empty],
// [[ "true()", "*" ], [ false, true, false, true ], 5to5],
// [[ "true()", "*" ], [ false, false, true, true ], empty],
// [[ "false()", "*" ], [ true, true, false, false ], 5to5],
// [[ "false()", "*" ], [ false, true, false, true ], empty],
// [[ "'4'", "*" ], [ true, true, true, true ], 5to5],
// [[ "'aaa'", "*" ], [ false, false, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )],
// [[ "''", "*" ], [ false, false, false, false ], empty],
// [[ "*", "-10" ], [ false, false, true, true ], 5to5],
// [[ "*", "10" ], [ true, true, false, false ], 5to5],
// [[ "*", "5" ], [ true, true, false, true ], 5to5],
// [[ "*", "2" ], [ true, true, true, true ], 5to5],
// [[ "*", "0" ], [ false, false, false, false ], empty],
// [[ "*", "true()" ], [ false, true, false, true ], 5to5],
// [[ "*", "true()" ], [ true, true, false, false ], empty],
// [[ "*", "false()" ], [ false, false, true, true ], 5to5],
// [[ "*", "false()" ], [ false, true, false, true ], empty],
// [[ "*", "'4'" ], [ true, true, true, true ], 5to5],
// [[ "*", "'aaa'" ], [ false, false, false, false ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )],
// [[ "*", "''" ], [ false, false, false, false ], empty],
// [[ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodesetEmpty')/*" ], [ false, false, false, false ], g.doc],
// [[ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodeset4to8')/*" ], [ true, true, true, true ], g.doc],
// [[ "id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodeset6to10')/*" ], [ true, true, false, false ], g.doc]

// [["-10", "*"], [false, true], 5to5
// [["4", "*"], [true, true], 5to5
// [["4.3", "*"], [false, true], 5to5
// [["0", "*"], [false, false], empty
// [["true()", "*"], [true, false], 5to5
// [["false()", "*"], [false, true], 5to5
// [["true()", "*"], [false, true], empty
// [["false()", "*"], [true, false], empty
// [["'aaa'", "*"], [true, true], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )
// [["'bb'", "*" ], [ false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )
// [["''", "*" ], [false, true ], g.doc.getElementById( 'ComparisonOperatorCaseNodesetStrings' )
// [["''", "*" ], [ false, false ], empty
// [["id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodesetEmpty')/*" ], [false, false ], g.doc],
// [["id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodeset4to8')/*" ], [ true, true ], g.doc],
// [["id('ComparisonOperatorCaseNodesetNegative5to5')/*", "id('ComparisonOperatorCaseNodeset6to10')/*" ], [ false, true ], g.doc]
