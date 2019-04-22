describe('#selected-at()', () => {
  [
    { from:'zero one two three', index:1, expected:'one' },
    { from:'zero one two three', index:4, expected:'' },
    { from:'zero one two three', index:-1, expected:'' },
    { from:'', index:0, expected:'' },
  ].forEach(({ from, index, expected }) => {
    it(`should select ${expected} from "${from}" at index ${index}`, () => {
      assertString(`selected-at('${from}', '${index}')`, expected);
    });
  });
});
