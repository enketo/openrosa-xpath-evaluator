Openrosa XForms Evaluator
=========================

<a href="https://travis-ci.org/medic/openrosa-xpath-evaluator"><img src="https://travis-ci.org/medic/openrosa-xpath-evaluator.svg?branch=master"/></a>

Wrapper for browsers' XPath evaluator with added support for OpenRosa extensions.

For more info on extended XPath expressions/bindings supported by XForms/OpenRosa/OpenDataKit (ODK) see:

* [ODK XForm Specification](https://getodk.github.io/xforms-spec/)


## Getting Started

  1. Include with `npm install openrosa-xpath-evaluator --save` or manually download and add [dist/orxe.min.js](https://raw.github.com/medic/openrosa-xpath-evaluator/master/dist/orxe.min.js) file.

  2. Include orxe.min.js in the \<head> of your HTML document.
     NOTE: Make sure HTML document is in strict mode i.e. it has a !DOCTYPE declaration at the top!

  2. Initialize orxe:

    ```js
    // bind XPath methods to document and window objects
    // NOTE: This will overwrite native XPath implementation if it exists
    orxe.bindDomLevel3XPath();
    ```

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
This library does not depend on any external libraries.
But the odk digest function can be supported by installing the node-forge library.

## Support for custom functions:
To support custom functions, this library can be extended with the following.

```
orxe.customXPathFunction.add('comment-status', function(a) {
  if(arguments.length !== 1) throw new Error('Invalid args');
  const curValue = a.v[0]; // {t: 'arr', v: [{'status': 'good'}]}
  const status = JSON.parse(curValue).status;
  return new orxe.customXPathFunction.type.StringType(status);
});
```

The arguments passed to the custom function (string, number, xpath) will determine the
arguments passed by the library to the function implementation.
The argument format will be any of these:
```
{t: 'arr', v:[]}
{t: 'num', v:123}
{t: 'str', v:'123'}
```

The return types currently supported are these:
```
orxe.customXPathFunction.type.StringType
orxe.customXPathFunction.type.NumberType
orxe.customXPathFunction.type.BooleanType
orxe.customXPathFunction.type.DateType
```

## Configuration support
The library can be configured with:
```
orxe.config = {
  includeTimeForTodayString: false,
  returnCurrentTimeForToday: false
};
```

#### includeTimeForTodayString (default: false)
This flag allows the inclusion of time for today() expressions that expect XPathResult.STRING_TYPE.

#### returnCurrentTimeForToday (default: false)
This flag allows time to be considered for today() expressions that expect XPathResult.ANY_TYPE, XPathResult.NUMBER_TYPE, etc.

# Development

## Useful resources

* https://www.w3.org/TR/1999/REC-xpath-19991116/
* https://getodk.github.io/xforms-spec/
* https://developer.mozilla.org/en-US/docs/Web/API/XPathEvaluator
* https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate
* https://developer.mozilla.org/en-US/docs/Web/XPath/Introduction_to_using_XPath_in_JavaScript
* https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
* https://developer.mozilla.org/en-US/docs/Web/API/Node

# Known limitations / TODO!

* `and`/`or` operators are not currently lazy
* namespace:: axis is not supported (but it might work in your browser if you're lucky)
