/**
 * Internal representations of XPathResults
 */
module.exports = {
  boolean: function(v) { return { t:'bool', v:v }; },
  number:  function(v) { return { t:'num',  v:v }; },
  string:  function(v) { return { t:'str',  v:v }; },
  date:    function(v) { return { t:'date', v:v }; },
};
