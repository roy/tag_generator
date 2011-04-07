TG.Stemmer = {
  stem: function(word){
    var testStemmer = new TG.Snowball("dutch");
    testStemmer.setCurrent(word);
    testStemmer.stem();
    return testStemmer.getCurrent();
  }
};
