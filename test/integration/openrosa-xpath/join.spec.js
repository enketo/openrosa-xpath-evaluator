describe('#join()', () => {
  it('should join a list of strings with supplied separator', () => {
    initDoc(`
      <root>
        <item>one</item>
        <item>two</item>
        <item>three</item>
      </root>`);
    assertString(`join(' :: ', //item)`, 'one :: two :: three');
  });

  it('should join list of strings', () => {
    assertString(`join(' ', 'This', 'is', 'a', 'sentence.')`, "This is a sentence.");
    assertString("join(' ## ')", "");
  })

  it('should join nodes', () => {
      initDoc(`
        <root id='xroot'>
          <item>1</item>
          <item>2</item>
          <item>3</item>
          <item>4</item>
        </root>`);
    assertString("join(', ', //item)", "1, 2, 3, 4")
    assertString("join(', ', /root/*)", "1, 2, 3, 4")

    const node = doc.getElementById('xroot');
    assertString(node, null, "join(', ', *)", "1, 2, 3, 4")
  })
});
