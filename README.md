Openrosa XForms Evaluator
=========================

<a href="https://travis-ci.org/medic/openrosa-xpath-evaluator"><img src="https://travis-ci.org/medic/openrosa-xpath-evaluator.svg?branch=master"/></a>

Wrapper for browsers' XPath evaluator with added support for OpenRosa extensions.

For more info on extended XPath expressions/bindings supported by XForms/OpenRosa/OpenDataKit (ODK) see:

* [ODK XForm Specification](https://opendatakit.github.io/odk-xform-spec/)
* [OpenDataKit Binding documentation](https://opendatakit.org/help/form-design/binding/)
* [JavaRosa XPath functions](https://bitbucket.org/javarosa/javarosa/wiki/xform)


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

## Supported XPath expressions:

* `/model/instance[1]//*`
* `/model/instance[1]/*/meta/*`
* `./author`
* `author`
* `first.name`
* `/bookstore`
* `//author`
* `author/first-name`
* `bookstore//title`
* `bookstore/*/title`
* `bookstore//book/excerpt//emph`
* `.//title`
* `author/*`
* `book/*/last-name`
* `@style`
* `price/@exchange`
* `price/@exchange/total`
* `book[@style]`
* `book/@style`
* `./first-name`
* `first-name`
* `author[1]`
* `author[first-name][3]`
* `my:book`
* `x/y[1]`
* `x[1]/y[2]`
* `book[excerpt]`
* `book[excerpt]/title`
* `book[excerpt]/author[degree]`
* `book[author/degree]`
* `author[degree][award]`
* `ancestor::book[1]`
* `ancestor::book[author][1]`
* `ancestor::author[parent::book][1]`
* `*/*`
* `*[@specialty]`
* `@*`
* `@my:*`
* `my:*`
* `author[degree and award]`
* `author[(degree or award) and publication]`
* `author[degree and not(publication)]`
* `author[not(degree or award) and publication]`
* `author[. = "Matthew Bob"]`
* `author[last-name = "Bob" and ../price &gt; 50]`
* `author[not(last-name = "Bob")]`
* `author[first-name = "Bob"]`
* `author[last-name = "Bob" and first-name = "Joe"]`
* `author[* = "Bob"]`
* `author[last-name = "Bob"]`
* `author[last-name[1] = "Bob"]`
* `author[last-name [position()=1]= "Bob"]`
* `book[last()]`
* `book/author[last()]`
* `book[position() &lt;= 3]`
* `book[/bookstore/@specialty=@style]`
* `degree[position() &lt; 3]`
* `degree[@from != "Harvard"]`
* `p/text()[2]`
* `price[@intl = "Canada"]`
* `x/y[position() = 1]`
* `(book/author)[last()]`
* `(x/y)[1]`


## Unsupported XPath expressions:

(Add any examples of known-unsupported expressions here and to `test/extended-xpath.spec.js`.)

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
  allowStringComparison: false,
  includeTimeForTodayString: false,
  returnCurrentTimeForToday: false
};
```

#### allowStringComparison (default: false)
This flag allows comparing expressions like this: 'bcd' > 'abc'.

#### includeTimeForTodayString (default: false)
This flag allows the inclusion of time for today() expressions that expect XPathResult.STRING_TYPE.

#### returnCurrentTimeForToday (default: false)
This flag allows time to be considered for today() expressions that expect XPathResult.ANY_TYPE, XPathResult.NUMBER_TYPE, etc.
