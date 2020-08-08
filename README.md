Openrosa XForms Evaluator
=========================

<a href="https://travis-ci.org/medic/openrosa-xpath-evaluator"><img src="https://travis-ci.org/medic/openrosa-xpath-evaluator.svg?branch=master"/></a>

Wrapper for browsers' XPath evaluator with added support for OpenRosa extensions.

For more info on extended XPath expressions/bindings supported by XForms/OpenRosa/OpenDataKit (ODK) see:

* [ODK XForm Specification](https://getodk.github.io/xforms-spec/)


## Getting Started

  1. Include with `npm install openrosa-xpath-evaluator --save` or `yarn add openrosa-xpath-evaluator`

  3. You can now use XPath expressions to query the DOM:

    ```js
    var result = document.evaluate(
        '//ul/li/text()', // XPath expression
        document, // context node
        null, // namespace resolver
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
    );

    // loop through results
    for (var i = 0; i < result.snapshotLength; i++) {
        var node = result.snapshotItem(i);
        alert(node.nodeValue);
    }
    ```

# External Libraries

This library has no explicit dependencies.

To use the [ODK `digest()` function](https://getodk.github.io/xforms-spec/#fn:digest),
you'll need to add [`node-forge`](https://www.npmjs.com/package/node-forge) to
your project.

# Development

## Useful resources

* https://www.w3.org/TR/1999/REC-xpath-19991116/
* https://getodk.github.io/xforms-spec/
* https://developer.mozilla.org/en-US/docs/Web/API/XPathEvaluator
* https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate
* https://developer.mozilla.org/en-US/docs/Web/XPath/Introduction_to_using_XPath_in_JavaScript
* https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
* https://developer.mozilla.org/en-US/docs/Web/API/Node

# Known limitations

* namespace:: axis is not supported (but it might work in your browser if you're lucky)
* xpath variables (`$var`) are not supported

# TODO

* arrange source code, e.g. `src/core` and `src/openrosa`
