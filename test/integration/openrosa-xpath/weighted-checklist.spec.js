describe('#weighted-checklist()', () => {
  TODO();
  xit('weighted-checklist()', () => {
    // Note: test for two node-set arguments done elsewhere
    [
      [ "weighted-checklist(-1, 2, 2>1, 2)", doc, true ],
      [ "weighted-checklist(-1, 2, 2>1, 3)", doc, false ],
      [ "weighted-checklist(-1, 2, 1=1, 1, 2=2, 1, 3=3, 1)", doc, false ],
      [ "weighted-checklist(1, 2, 1=1, 1, 2=2, 1, 3=3, 1)", doc, false ],
      [ "weighted-checklist(1, 1, 1=1, 1)", doc, true ],
      [ "weighted-checklist(1, 1, 1=1, 0)", doc, false ],
      [ "weighted-checklist(5, 5, self::* ,5)", doc.getElementById( 'FunctionChecklistCase0' ), true ],
      [ "weighted-checklist(-1, 2, self::node(), 0)", doc.getElementById( 'FunctionChecklistCaseEmpty' ), true ],
      [ "weighted-checklist(1, 2, self::node(), 1)", doc.getElementById( 'FunctionChecklistCaseEmpty' ), false ],
      [ "weighted-checklist(3, 3, 1=1, self::node())", doc.getElementById( 'FunctionWeightedChecklist' ), true ],
      [ "weighted-checklist(2, 2, true(), 2, false(), 5, false(), 6)", doc, true ],
      [ "weighted-checklist(2, -1, true(), 999, false(), 5, false(), 6)", doc, true ]
    ].forEach( t => {
      assertBoolean(t[1], null, t[0], t[2]);
    });
  });
});
