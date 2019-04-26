describe('#checklist()', () => {
  TODO();
  xit('checklist()', () => {
    assertBoolean("checklist(-1, 2, 2>1)", true);
    assertBoolean("checklist(-1, 2, 1=1, 2=2, 3=3)", false);
    assertBoolean("checklist(1, 2, 1=1, 2=2, 3=3)", false);
    assertBoolean("checklist(1, 1, 1=1)", true);
    assertBoolean("checklist(1, 1, true(), false(), false())", true);
  });

  xit('checklist(node)', () => {
    initDoc(`
      <div id="FunctionChecklistCase">
        <div id="FunctionChecklistCaseNo">no</div>
        <div id="FunctionChecklistCaseEmpty"></div>
        <div id="FunctionChecklistCase0">0</div>
      </div>`);
    let node = doc.getElementById('FunctionChecklistCase');
    assertBoolean(node, null, "checklist(2, 2, * )", true);

    node = doc.getElementById('FunctionChecklistCaseEmpty');
    assertBoolean(node, null, "checklist(-1, 2, self::node())", true);

    node = doc.getElementById('FunctionChecklistCaseEmpty');
    assertBoolean(node, null, "checklist(1, 2, self::node())", false);
  });
});
