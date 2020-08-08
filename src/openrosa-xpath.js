require('./date-extensions'); // TODO remove?

var ExtendedXPathEvaluator = require('./extended-xpath');
var openrosaExtensions = require('./openrosa-extensions');

module.exports = function() {
  return new ExtendedXPathEvaluator(new XPathEvaluator(), openrosaExtensions());
};
