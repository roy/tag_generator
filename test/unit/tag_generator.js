var TagGeneratorTest = require('nodeunit').testCase,
    fs = require("fs"),
    vm = require("vm");

vm.runInThisContext(fs.readFileSync("dist/tag_generator.js"));

module.exports = TagGeneratorTest({
    setUp: function (callback) {
      this.tag_generator = new TG.TagGenerator({
        attributes: {
          title: 3,
          lead: 2,
          content: 1
        }
      });
      callback();
    },
    tearDown: function (callback) {
      // clean up
      callback();
    },
  
    "should generate with rating multiplier": function (test) {
      this.tag_generator.set("title", "Dit is een test");
      this.tag_generator.set("lead", "Dit is de lead tekst");
      this.tag_generator.set("content", "Dit is content tekst");

      var tags = this.tag_generator.generateTags();
      test.equals("Dit is een test", this.tag_generator.get("title"));
      test.deepEqual(["title", "lead", "content"], this.tag_generator.attributes);
      test.equals(3, tags[1][1]); //tekst rating
      test.done();
    },

    "first tag should not be an empty tag": function (test) {
      this.tag_generator.set("title", "");
      this.tag_generator.set("lead", "");
      this.tag_generator.set("content", "Dit is tekst tekst");

      var tags = this.tag_generator.generateTags();
      test.deepEqual(["title", "lead", "content"], this.tag_generator.attributes);
      test.notEqual('', tags[0][0]); //tekst rating
      test.done();
    }
  });

