TG.TagGenerator = function(options){
  this.options = options || {};
  this.options.attributes = this.options.attributes || {};

  this.helper = TG.Helper;

  this.attributes = this.helper.keys(this.options.attributes);
};

TG.TagGenerator.prototype = {
  set: function(attribute, value){
    this[attribute] = value;
  },

  get: function(attribute){
    return this[attribute];
  },

  generateTags: function(){
    var tags = {}; // {"woord": {rating: 3, words: []}, "kaas": {:rating: 1, words: []}};

    for(var i=0, len = this.attributes.length; i < len; i++){
      var attribute = this.attributes[i],
          multiplier = this.options.attributes[attribute],
          words = this.helper.removeBadWords(this.get(attribute)).split(" ");


      for(var j=0, jlen = words.length; j < jlen; j++){
        var word = words[j],
            stem = TG.Stemmer.stem(word);

        if(tags[stem] === undefined){
          tags[stem] = {rating: multiplier, words: [word]};
        } else {
          tags[stem].rating += multiplier;
          if(!this.helper.contains(tags[stem].words, word)){ tags[stem].words.push(word); }
        }
      }
    }

    tags = this.sortTags(tags);
    console.log(tags);
    return tags;
  },

  sortTags: function(hash){
    var arr = [];
    for( var key in hash ){
      if(hash.hasOwnProperty(key)){
        arr.push([key, hash[key].rating, hash[key].words]);
      }
    }

    arr.sort(function(a,b){
      return b[1] - a[1];
    });

    return arr;
  }
};
