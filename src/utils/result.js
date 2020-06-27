const dbg = require('../dbg');

module.exports = { toSnapshotResult };

function toSnapshotResult(nodes, resultType, singleItem) {
  dbg('toSnapshotResult()', { nodes, resultType });
  return (() => {
    let idx = 0;
    return {
      resultType,
      singleNodeValue: singleItem || nodes[0] || null,
      snapshotLength: nodes.length,
      snapshotItem: i => nodes[i] || null,
      iterateNext: () => nodes[idx++] || null,
    };
  })();
}
