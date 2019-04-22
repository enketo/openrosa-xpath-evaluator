describe('#uuid()', () => {
  it('should provide an RFC 4122 version 4 compliant UUID string', () => {
    // when
    var provided = xEval('uuid()');

    // then
    assert.match(provided.stringValue,
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});
