module.exports = { dbg, dbgString };

function dbg(...args) {
  console.log(args.map(dbgString));
}

function nodePath(node) {
  return node === null ? '' : nodePath(node.parentNode) + '/' + node.nodeName;
}

function dbgString(arg) {
  if(arg === null || arg === undefined) return arg;
  if(arg instanceof Node) return nodePath(arg);
  if(typeof arg === 'function') return '(function)';
  if(typeof arg !== 'object') return arg.toString();
  if(Array.isArray(arg)) return arg.map(dbgString).toString();
  if(arg.t === 'arr') {
    const { t, v } = arg;
    return JSON.stringify({ t, v:v.map(nodePath) });
  }
  else return JSON.stringify(arg);
}
