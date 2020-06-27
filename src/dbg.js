module.exports = dbg;

function dbg(...args) {
  console.log(args.map(arg => {
    if(arg === null || arg === undefined) return arg;
    if(typeof arg === 'function') return '(function)';
    if(typeof arg !== 'object') return arg.toString();
    else return JSON.stringify(arg);
  }));
}
