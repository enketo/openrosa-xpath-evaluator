describe('#concat', () => {
  it('should concatenate two xpath values', () => {
    const regex = 'concat(/simple/xpath/to/node, /simple/xpath/to/node)';
    assertString('jaja', regex, 'jajajaja');
  });
  it('should concatenate two string values', () => {
    assertString('concat("port", "manteau")', 'portmanteau');
  });
  it('should concatenate a string and an xpath value', () => {
    assertString('port', 'concat(/simple/xpath/to/node, "manteau")', 'portmanteau');
  });
  it('should concatenate an xpath and a string value', () => {
    assertString('port', 'concat(/simple/xpath/to/node, "manteau")', 'portmanteau');
  });
});
