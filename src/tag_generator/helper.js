TG.Helper = {
  bad_words: {
    nl: "de en van ik jij hij zij we wij zei te dat die in een hij het niet zijn is was op aan met als voor had er maar om hem dan zou of wat mijn men dit zo door over ze zich bij ook tot je mij uit der daar haar naar heb hoe heeft hebben deze u want nog zal me zij nu ge geen omdat iets worden toch al waren veel meer doen toen moet ben zonder kan hun dus alles onder ja eens hier wie werd altijd doch wordt wezen kunnen ons zelf tegen na reeds wil kon niets uw iemand geweest andere is nbsp"
  },
  diacritics: [
    [/[\300-\306]/g, 'A'],
    [/[\340-\346]/g, 'a'],
    [/[\310-\313]/g, 'E'],
    [/[\350-\353]/g, 'e'],
    [/[\314-\317]/g, 'I'],
    [/[\354-\357]/g, 'i'],
    [/[\322-\330]/g, 'O'],
    [/[\362-\370]/g, 'o'],
    [/[\331-\334]/g, 'U'],
    [/[\371-\374]/g, 'u'],
    [/[\321]/g, 'N'],
    [/[\361]/g, 'n'],
    [/[\307]/g, 'C'],
    [/[\347]/g, 'c']
  ],
  keys: function(hash){
    var keys = [];
    for(var name in hash){
      if( hash.hasOwnProperty(name) ){
        keys.push(name);
      }
    }

    return keys;
  },

  replaceDiacritics: function(value){
    for (var i = 0; i < this.diacritics.length; i++) {
        value = value.replace(this.diacritics[i][0], this.diacritics[i][1]);
    }
    
    return value;  
  },
  
  contains: function(a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  },

  parseBadWords: function(){
    this.bad_words.nl = new RegExp("\\b" + this.bad_words.nl.split(" ").join("\\b|\\b") + "\\b", "gim");
  },
  removeBadWords: function(value, lan){
    lan = lan || "nl";
    value = value.replace(this.bad_words[lan], ""); //remove bad words;
    value = value.replace(/\s{2,}/g, " "); //remove extra spaces;
    return value.replace(/(^\s|\s$)/g, ""); //trim;
  },

  removeNonWordCharacters: function(value){
    return value.replace(/[^\sA-Za-z0-9]/g, "");
  }
};

TG.Helper.parseBadWords();
