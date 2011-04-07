var HelperTest = require('nodeunit').testCase,
    fs = require("fs"),
    vm = require("vm");

vm.runInThisContext(fs.readFileSync("dist/tag_generator.js"));

module.exports = HelperTest({
  setUp: function (callback) {
    callback();
  },
  tearDown: function (callback) {
    callback();
  },

  "should extract keys from hash": function (test) {
    var h = {a: "a", b: "b", c: "c"};
    test.deepEqual(["a", "b", "c"], TG.Helper.keys(h));
    test.done();
  },

  "Diacritics get replaced to their normal versions": function(test) {
    test.equals("aeiou",  TG.Helper.replaceDiacritics("áéíóú"));
    test.equals("aeiou",  TG.Helper.replaceDiacritics("àèìòù"));
    test.equals("ano",    TG.Helper.replaceDiacritics("ãñõ"));
    test.equals("aeiou",  TG.Helper.replaceDiacritics("âêîôû"));
    test.done();
  },

  "Array helper contains": function(test){
    test.equals(true, TG.Helper.contains(["a", "b", "c"], "b"));
    test.done();
  },

  "Remove bad words": function(test){
    test.equals("test", TG.Helper.removeBadWords("Dit is een test"));
    test.done();
  }
});
