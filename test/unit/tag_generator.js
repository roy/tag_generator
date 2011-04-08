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
  },
  
  "Return empty array by no keywords": function(test){
    this.tag_generator.set("title", "Dit");
    this.tag_generator.set("lead", "Dit");
    this.tag_generator.set("content", "Dit");

    test.deepEqual([], this.tag_generator.generateTags());
    test.done();
  },

  "Their shouldn't be any empty tags": function(test){
    this.tag_generator.set("title", "");
    this.tag_generator.set("lead", "");
    this.tag_generator.set("content", "Al bij opkomst van de spelers konden we de wenkbrouwen fronsen. Sergio Romero mocht van scheidsrechter Vink met het gele keepers-shirt spelen. Deze keer hoefde Maarten Gozeling niet naar de lokale sportwinkel te sprinten, maar het is opmerkelijk dat AZ zelf deze keuze maakte. Vink had er overigens wel zin in: al na vierentachtig seconden ontving AZ de eerste gele prent. Holman was het haasje. Het was 'Ladies-day' in De Kuip, reden voor Vink om als een oud wijf te fluiten. Sigþórsson moest al snel vervangen worden door Beschop. De IJslandse spits kreeg een nare tik van de Vrij en werd in de rust naar de kleedkamer gedragen met een opgezwollen enkel. Benschop deed wat alle invallers onder verbeek doen: scoren. Eerst werd een eenvoudige kans nog gemist, maar even later - vlak voor rust - schoot hij de 0-1 achter de oude van Dijk. De assist kwam van Martens, na een geweldige actie in de omschakeling. Het waren niet de enige kansen in de eerste helft, want ook Rasmus Elm had het net kunnen vinden. De Zweed gleed echter uit in vrije schotpositie, zoals wel meer AZ-spelers voor rust moeite hadden met het veld. De tweede helft kunnen we afdoen in één alinea. Op de blessure van Martens na waren er weinig opvallende momenten. Ja, Moisander zette Castaignos vrij voor Romero, maar zoiets gebeurt iedere wedstrijd wel een keer. Romero loste deze situatie overigens prima op. In vorige seizoenen zou hij Castaignos getorpedeerd hebben, maar nu bleef hij goed naar de bal kijken en liet zich niet afbluffen. Verder viel er weinig te beleven. AZ had ook tegen tien Rotterdammers moeite om te controleren en Feyenoord deed een meelijkwekkende poging tot een slotoffensief. Het leek allemaal nergens op en ook Vink liep wat in de weg, trok eens een kaart, floot nu eens wel, dan weer niet. AZ hield de nul en nam een grote horde op weg naar de eindstreep. Al over zes dagen komt NAC op bezoek en dan staat er behalve de drie punten ook een hoop prestige op het spel. Hopelijk stroomt de ziekenboeg niet nog verder vol.");

    var tags = this.tag_generator.generateTags().slice(0,5);
    
    test.done();
  }
});
