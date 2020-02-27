$(document).ready(function() {
  console.log("jquery activated");
  annyang.addCallback('resultNoMatch', function(userSaid) {
    responsiveVoice.speak("I didn't understand, please repeat")
  })
  $("#question").on("click", function() {
    responsiveVoice.speak(currentQuestion);
  })
  $("#question").one("click", generateEmptyHuman);
})

let emptyHuman;
let claasifiedHuman;
let humanDefaults = [];
let questionPos = 0;
let currentQuestion = "I'm going to ask you some questions."
let commands = {};
let currentQuery;

function generateEmptyHuman() {
  emptyHuman = new Human();
  annyang.start({
    autoRestart: true,
    continuous: true
  });
  queryGeneral();
}

function queryGeneral() {
  $("#question").html(generalQuestions[questionPos]["written"])
  currentQuestion = generalQuestions[questionPos]["spoken"]
  setTimeout(function() {
    responsiveVoice.speak(currentQuestion);
    let currentQuery = generalResponses[questionPos]["query"];
    let currentResponse = generalResponses[questionPos]["response"];
    commands[currentQuery] = currentResponse;
    annyang.addCommands(commands)
  }, 2000);
}
