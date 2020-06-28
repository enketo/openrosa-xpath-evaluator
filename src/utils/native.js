const { asString } = require('./xpath-cast');

module.exports = { preprocessNativeArgs };

var TOO_MANY_ARGS = new Error('too many args');
var TOO_FEW_ARGS = new Error('too few args');
  
function checkMinMaxArgs(args, min, max) {
  if(min != null && args.length < min) throw TOO_FEW_ARGS;
  if(max != null && args.length > max) throw TOO_MANY_ARGS;
}

function checkNativeFn(name, args) {
  if(name === 'last') {
    checkMinMaxArgs(args, null, 0);
  } else if(/^(boolean|lang|ceiling|name|floor)$/.test(name)) {
    checkMinMaxArgs(args, 1, 1);
  } else if(name === 'substring') {
    checkMinMaxArgs(args, 2, 3);
  } else if(/^(starts-with|contains|substring-before|substring-after)$/.test(name)) {
    checkMinMaxArgs(args, 2, 2);
  } else if(name === 'translate') {
    checkMinMaxArgs(args, 3, 3);
  }
}

function preprocessNativeArgs(name, args) {
  switch(name) {
    case 'id': // https://www.w3.org/TR/1999/REC-xpath-19991116/#function-id
      if(args[0].t === 'arr') args = [ { t:'str', v:args[0].v.map(asString).join(' ') } ];
      break;
  }
  if(name === 'name' && args.length < 2) throw TOO_FEW_ARGS;

  if(name === 'substring' && args.length > 2 && args[1].v === Number.NEGATIVE_INFINITY && args[2].v === Number.POSITIVE_INFINITY) {
    args[0].v = '';
  }

  if(name === 'substring' && args.length > 1 && args[1].v < 0) {
    args[1].v = 0;
  }
  if(name === 'substring' && args.length > 2 && args[2].v === Number.POSITIVE_INFINITY) {
    args[2].v = args[0].v.length + 1;
  }
  checkNativeFn(name, args);
  return args;
}
