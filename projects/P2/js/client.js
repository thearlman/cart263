//tutorial on using youtube data API:
//https://dev.to/aveb/making-your-first-get-request-to-youtube-search-api-4c2f



$(document).ready(function() {
  console.log("jquery activated");
  annyang.addCallback('resultNoMatch', function(userSaid) {
    responsiveVoice.speak("I didn't understand, please repeat")
  })
  $("#question").one("click", function() {
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?doctors,health" alt="clickbait" />
    <p>" It's like a pressure washer for your soul"</p><br />-Doctor`)
    responsiveVoice.speak(welcomeMessage, voiceType, {
      onend: generateHumanShell
    });
  });
});
let voiceType = 'UK English Female';
let humanShell;
let filledHuman;
let questionPos = 0;
let currentQuestion = ""
let welcomeMessage = `Doctors will hate that you have found this trick.
I'm going to ask you some questions which will generate only the very best content for you.
Be warned that the government does not want you to know about this trick and you should only tell your closest of kin`;
// let welcomeMessage = `Doctors`;
let currentQuery;
let currentResponse;
// let questionIndex = 0;
let currentState = "generalQuestions";
let stockResponsesPositive = ["brilliant", "ace", "right then", "alright", "thanks mate", "nice one"];
let stockResponsesNegative = ["bollocks", "shit", "wanker", "rubbish", "your taking the piss", ];
let searchTerms = "";

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
  let verifyCommands = {
    "yes": function() {
      questionPos++;
      object[parameter] = value;
      console.log(filledHuman);
      responsiveVoice.speak(stockReponse("positive") + ", let's continue", voiceType, {
        onend: moveOn
      });
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
      if (questionPos > generalQuestions.length - 1) {
        questionPos = 0;
        calculateClass();
      } else {
        setTimeout(queryUser, 1000, generalQuestions, generalResponses);
      }
      break;
    case "interests":
      if (questionPos > Object.keys(filledHuman["interests"]).length - 1) {
        questionPos = 0;
        responsiveVoice.speak(`${stockReponse("positive")}, let me pull up your idealized content`, voiceType, {
          onend: parseInterests
        });
      } else {
        setTimeout(queryUser, 1000, interestQuestions, interestResponses);
      }
      break;
  }
}

function calculateClass() {
  let baseScore = parseInt(humanShell.income.replace(/\$/g, ''), 10);
  // let children;
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
    currentState = "interests";
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?sad,poor" alt="clickbait" /> <p>I make more than $5000 a week from home.</p>`);
    responsiveVoice.speak(`${stockReponse('positive')}, your score is ${baseScore} you are lower class. That's alright, we can still find some content for you`, voiceType, {
      onend: moveOn
    });
  } else if (baseScore >= 25 && baseScore < 95) {
    filledHuman = new Middle(humanShell.age, humanShell.income, humanShell.area, humanShell.children);
    currentState = "interests";
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?working,suburban" alt="clickbait" /> <p>Genuine raybans $25.</p>`);
    responsiveVoice.speak(`${stockReponse('positive')}, your score is ${baseScore} you are middle class. Keep it up.`, voiceType, {
      onend: moveOn
    });
  } else if (baseScore >= 95) {
    filledHuman = new Upper(humanShell.age, humanShell.income, humanShell.area, humanShell.children);
    currentState = "interests";
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?rich,yaught" alt="clickbait" /> <p>This investment changed my life. But I dont tell just everyone about it...</p>`)
    responsiveVoice.speak(`your score is ${baseScore} you upper class ${stockReponse('negative')}`, voiceType, {
      onend: moveOn
    });
  }
}


function stockReponse(sentiment) {
  if (sentiment === "positive") {
    return stockResponsesPositive[Math.floor(Math.random() * stockResponsesPositive.length)];
  } else {
    return stockResponsesNegative[Math.floor(Math.random() * stockResponsesNegative.length)];
  }
}

function parseInterests() {
  for (let i = 0; i < Object.keys(filledHuman["interests"]).length; i++) {
    let interest = Object.keys(filledHuman["interests"])[i];
    console.log(interest);
    searchTerms += " " + filledHuman["interests"][interest];
  }
  searchTerms = searchTerms.replace(/ /g, "|");
  getPerfectVideo(searchTerms);
}


function getPerfectVideo(searchTerms) {
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      key: 'AIzaSyCngQirz4XR89tDgmxSZIJWOa3cKHMUwfw',
      q: searchTerms,
      part: 'snippet',
      maxResults: 10,
      type: 'video',
      videoEmbeddable: true,
    },
    success: function(data) {
      console.log(data)
      if (data["items"].length > 0) {
        let randInt = Math.floor(Math.random() * data["items"].length);
        let randVidId = data["items"][randInt]["id"]["videoId"]
        // deliverContent("http://www.youtube.com/embed/${randVidId}?autoplay=1");
        $("#question").html(`<iframe src="https://www.youtube.com/embed/${randVidId}?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>`)
      } else {
        console.log("no results found");
      }
    },
    error: function(response) {
      console.log("Request Failed");
    }
  });
}

// function deliverContent(vidUrl){
//   $("#question").html(`<img src="https://source.unsplash.com/400x400/?content,rich," alt="clickbait"
//   <p>How old are you?</p>`)
// }

// getPerfectVideo(searchTerms);
