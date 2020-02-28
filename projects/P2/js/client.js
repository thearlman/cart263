$(document).ready(function() {
  console.log("jquery activated");
  annyang.addCallback('resultNoMatch', function(userSaid) {
    responsiveVoice.speak("I didn't understand, please repeat")
  })
  $("#question").on("click", function() {
    responsiveVoice.speak(currentQuestion);
  })
  $("#question").one("click", function(){
    setTimeout(generatehumanShell, 4000)
  });
})

let humanShell;
let classedHuman;
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

function generatehumanShell() {
  humanShell = new Human();
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
      responsiveVoice.speak(stockReponse("positive")+ ", let's continue");
      moveOn();
    },
    "no": function() {
      responsiveVoice.speak(stockReponse("negative") + ", let's try again");
      responsiveVoice.speak(questionSet[questionPos]["spoken"]);
    }
  }
  annyang.addCommands(verifyCommands);
}

//adds values to the human object, according to the parameters it is passed
function moveOn() {
  annyang.removeCommands();
  switch (currentState) {
    case "generalQuestions":
      if (questionPos >= generalQuestions.length-1) {
        questionPos = 0;
        currentState = "interestllos";
        calculateClass();
      } else {
        setTimeout(queryUser, 1000, generalQuestions, generalResponses);
        questionPos++;
      }
    break;
    case "interests":
      console.log("DONE WITH ROUND");
      break;
  }
}

function calculateClass(){
  let baseScore = parseInt(humanShell.income.replace(/\$/g, ''), 10);
  let children;
  switch (humanShell.children) {
    case "no":
      children = 0;
      break;
    case "zero":
      children = 0;
      break;
    case "one":
      children = 1;
      break;
    case "two":
      children = 2;
      break;
    case "three":
      children = 3;
      break;
    case "four":
      children = 4;
      break;
    case "five":
      children = 5;
      break;
    default:
      children = 0;
  }
  baseScore -= (children*10);
  if(humanShell.area === "rural"){
    baseScore += (baseScore/10);
  } else if (humanShell.area === "urban"){
    baseScore -= (baseScore/10);
  }
  if (baseScore < 25){
    classedHuman = new Lower(humanShell.age, humanShell.income, humanShell.area, humanShell.children);
    responsiveVoice.speak(`your score is ${baseScore} you are lower class`);
  } else if (baseScore >= 25 && baseScore < 95){
    classedHuman = new Middle(humanShell.age, humanShell.income, humanShell.area, humanShell.children);
    responsiveVoice.speak(`your score is ${baseScore} you are middle class`);
  } else if (baseScore >= 95){
    classedHuman = new Upper(humanShell.age, humanShell.income, humanShell.area, humanShell.children);
    responsiveVoice.speak(`your score is ${baseScore} you are upper class ${stockReponse('negative')}`);
  }
}
