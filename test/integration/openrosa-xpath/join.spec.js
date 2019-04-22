describe('#join()', () => {
  it('should join a list of strings with supplied separator', () => {
    // given
    initDoc(`
        <root>
          <item>one</item>
          <item>two</item>
          <item>three</item>
        </root>`);

    assertString(`join(' :: ', //item)`, 'one :: two :: three');
  });
});
