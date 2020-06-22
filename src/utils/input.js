var ARGS_REGEX = /\(\s*([^)]*)\)$/;

function inputArgs(input) {
  var m = input.match(ARGS_REGEX);
  return m ? m[1].split(',') : [];
}

// FIXME remove special handling
function preprocessInput(input) {
  if(input === 'string(namespace::node())') {
    input = input.replace('namespace::node()', 'namespace-uri(/*)');
  }
  return input;
}

module.exports = {
  inputArgs,
  preprocessInput
};
