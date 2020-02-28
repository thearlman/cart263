$(document).ready(function() {
  console.log("jquery activated");
  annyang.addCallback('resultNoMatch', function(userSaid) {
    responsiveVoice.speak("I didn't understand, please repeat")
  })
  $("#question").one("click", function() {
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?doctors,health" alt="clickbait" />
    <p>" It's like a pressure washer for your soul"</p>`)
    responsiveVoice.speak(welcomeMessage, 'UK English Female', {
      onend: generateHumanShell
    });
  });
  $("#question").one("tap", function() {
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?doctors,health" alt="clickbait" />
    <p>" It's like a pressure washer for your soul"</p>`)
    responsiveVoice.speak(welcomeMessage, 'UK English Female', {
      onend: generateHumanShell
    });
  });



});

let humanShell;
let filledHuman;
let questionPos = 0;
let currentQuestion = ""
let welcomeMessage = `Doctors will hate that you have found this trick.
I'm going to ask you some questions which will generate only the very best content for you.
Be warned that the government does not want you to know about this trick and you should only tell your closest of kin`;
let currentQuery;
let currentResponse;
let questionIndex = 0;
let currentState = "generalQuestions";

function generateHumanShell() {
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
      responsiveVoice.speak(stockReponse("positive") + ", let's continue");
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
      if (questionPos >= generalQuestions.length - 1) {
        questionPos = 0;
        currentState = "interests";
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

function calculateClass() {
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
  baseScore -= (children * 10);
  if (humanShell.area === "rural") {
    baseScore += (baseScore / 10);
  } else if (humanShell.area === "urban") {
    baseScore -= (baseScore / 10);
  }
  if (baseScore < 25) {
    filledHuman = new Lower(humanShell.age, humanShell.income, humanShell.area, humanShell.children);
    responsiveVoice.speak(`your score is ${baseScore} you are lower class. That's alright, we can still find some content for you`);
    setTimeout(function() {

    })
  } else if (baseScore >= 25 && baseScore < 95) {
    filledHuman = new Middle(humanShell.age, humanShell.income, humanShell.area, humanShell.children);
    responsiveVoice.speak(`your score is ${baseScore} you are middle class`);
  } else if (baseScore >= 95) {
    filledHuman = new Upper(humanShell.age, humanShell.income, humanShell.area, humanShell.children);
    responsiveVoice.speak(`your score is ${baseScore}. You are upper class, ${stockReponse('negative')}`);
  }
}
