require('./date-extensions');
var ExtendedXpathEvaluator = require('./extended-xpath');
var openrosaExtensions = require('./openrosa-extensions');
var settings = require('./settings');

module.exports = (function(){
  var module = {

    customXPathFunction: {
			// type: {
			// 	StringType: StringType,
			// 	NumberType: NumberType,
			// 	NodeSetType: NodeSetType,
			// 	BooleanType: BooleanType
			// },
			add: function(name, fnObj){
				functions[''][name] = fnObj;
			},
			remove: function(name) {
				delete functions[''][name];
			}
		},

    /**
		 * Get the current list of DOM Level 3 XPath window and document objects
		 * that are in use.
		 *
		 * @return {Object} List of DOM Level 3 XPath window and document objects
		 *         that are currently in use.
		 */
		getCurrentDomLevel3XPathBindings: function()
		{
			return {
				'window': {
					XPathException: window.XPathException,
					XPathExpression: window.XPathExpression,
					XPathNSResolver: window.XPathNSResolver,
					XPathResult: window.XPathResult,
					XPathNamespace: window.XPathNamespace
				},
				'document': {
					createExpression: document.createExpression,
					createNSResolver: document.createNSResolver,
					evaluate: document.evaluate
				}
			};
		},

		/**
		 * Get the list of DOM Level 3 XPath objects that are implemented by
		 * the XPathJS module.
		 *
		 * @return {Object} List of DOM Level 3 XPath objects implemented by
		 *         the XPathJS module.
		 */
		createDomLevel3XPathBindings: function(options)
		{
			var evaluator = new XPathEvaluator(options);

			return {
				'window': {
					// XPathException: XPathException,
					// XPathExpression: XPathExpression,
					// XPathNSResolver: XPathNSResolver,
					// XPathResult: XPathResult,
					// XPathNamespace: XPathNamespace
				},
				'document': {
          evaluate: function(e, contextPath, namespaceResolver, resultType, result) {
            var extensions = openrosaExtensions(settings);
            var wrappedXpathEvaluator = function(v, node, rt) {
              if(resultType < 7 || v.startsWith('//')) resultType = null;
              var wrappedResultType = rt || resultType || XPathResult.ANY_TYPE;
              return evaluator.evaluate(v, node || contextPath, namespaceResolver, wrappedResultType || XPathResult.ANY_TYPE, result);
            };
            var xevaluator = new ExtendedXpathEvaluator(wrappedXpathEvaluator, extensions);
            return xevaluator.evaluate.apply(xevaluator, arguments);
          }
				}
			};
		},

		/**
		 * Bind DOM Level 3 XPath interfaces to the DOM.
		 *
		 * @param {Object} doc the document or (Document.prototype!) to bind the evaluator etc. to
		 * @return List of original DOM Level 3 XPath objects that has been replaced
		 */
		bindDomLevel3XPath: function(doc, bindings)
		{
			var newBindings = (bindings || module.createDomLevel3XPathBindings()),
				currentBindings = module.getCurrentDomLevel3XPathBindings(),
				i
			;

			doc = doc || document;

			for(i in newBindings['document'])
			{
				doc[i] = newBindings['document'][i];
			}

			return currentBindings;
		}
  };
	return module;

})();
