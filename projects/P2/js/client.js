$(document).ready(function() {
  console.log("jquery activated");
  annyang.addCallback('resultNoMatch', function(userSaid) {
    responsiveVoice.speak("I didn't understand, please repeat")
  })
  $("#question").on("click", function() {
    responsiveVoice.speak(currentQuestion);
  })
  $("#question").one("click", function(){
    setTimeout(generateEmptyHuman, 4000)
  });
})

let emptyHuman;
let claasifiedHuman;
let humanDefaults = [];
let questionPos = 0;
let currentQuestion = "I'm going to ask you some questions.";
// let commands = {};
let currentQuery;
let currentResponse;
// let verifyCommands ={};
let questionIndex = 0;
let currentState = "generalQuestions";

function generateEmptyHuman() {
  emptyHuman = new Human();
  annyang.start({
    autoRestart: true,
    continuous: true
  });
  // annyang.debug(true);
  queryUser(generalQuestions, generalResponses);
}

//function to establish of which class the human will be
function queryUser(questionIndex, responseIndex) {
  // a few seconds later, ask a question
  setTimeout(function() {
    //inserrt the question in written for on the screen
    $("#question").html(questionIndex[questionPos]["written"])
    //establish what is the first question
    currentQuestion = questionIndex[questionPos]["spoken"]
    responsiveVoice.speak(currentQuestion);
    //establish which command we shoudl be listening for, and the appropriate response
    currentQuery = responseIndex[questionPos]["query"];
    currentResponse = responseIndex[questionPos]["response"];
    //push them to annyangs dict of commands
    let commands = {};
    commands[currentQuery] = currentResponse;
    annyang.addCommands(commands)
  }, 1000);
}

function handleQuestion(object, parameter, value, questionSet, verify) {
  responsiveVoice.speak(verify);
  console.log(object);
  let verifyCommands = {
    "yes": function(objectDotParam) {
      object[parameter] = value;
      moveOn();
    },
    "no": function() {
      responsiveVoice.speak("Alright, let's try again");
      responsiveVoice.speak(questionSet[questionPos]["spoken"])
    }
  }
  annyang.addCommands(verifyCommands);
}

//adds values to the human object, according to the parameters it is passed
function moveOn() {
  annyang.removeCommands();
  switch (currentState) {
    case "generalQuestions":
      if (questionPos >= generalQuestions.length) {
        questionPos = 0;
        currentState = "interests";
        queryUser(interestQuestions, interestResponses)
      } else {
        responsiveVoice.speak("Alright, let's move on");
        setTimeout(queryUser, 3000, generalQuestions, generalResponses);
        questionPos++;
      }
    break;
    case "interests":
      console.log("DONE WITH ROUND");
      break;
  }
}
