var StemmerTest = require('nodeunit').testCase,
    fs = require("fs"),
    vm = require("vm");

vm.runInThisContext(fs.readFileSync("dist/tag_generator.js"));

module.exports = StemmerTest({
  setUp: function (callback) {
    callback();
  },
  tearDown: function (callback) {
    callback();
  },

  "Words get stemmed": function (test) {
    test.equals("licham", TG.Stemmer.stem("lichamelijk"));
    test.equals("licham", TG.Stemmer.stem("lichamelijk"));
    test.equals("lidveren", TG.Stemmer.stem("lidvereniging"));
    test.done();
  }
});
