//tutorial on using youtube data API:
//https://dev.to/aveb/making-your-first-get-request-to-youtube-search-api-4c2f


//wait for document to finish loading
$(document).ready(function() {
  console.log("UPDATEDDDD");
  console.log("jquery activated");
  //set a callback to ask the user to repeat what they said if it doesn't match one of annyang's input commands
  annyang.addCallback('resultNoMatch', function(userSaid) {
    responsiveVoice.speak("I didn't understand, please repeat")
  })
  //set a one-time listener to start the game after clicking the image
  $("#question").one("click", function() {
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?doctors,health" alt="clickbait" />
    <p>"It's like a pressure washer for your soul"</p><br />-US Doctor`)
    //read out the welcome message, and fire a function when complete
    responsiveVoice.speak(welcomeMessage, voiceType, {
      onend: generateHumanShell
    });
  });
});
//~~~some variablezzz
//the type of voice we will be using
let voiceType = 'UK English Female';
//the empty human, or rather at this stage, the idea of an empty human
//same as above, but of the filled variety
let user;
// what position we are in for the line of questioning
let questionPos = 0;
// variable to hold the current question
let currentQuestion = ""
// sketchy welcome message
// let welcomeMessage = `Doctors will hate that you have found this trick.
// I'm going to ask you some questions which will generate only the very best content for you.
// Be warned that the government does not want you to know about this trick and you should only tell your closest of kin`;
let welcomeMessage = `Doctors`;
// the current query
let currentQuery;
//and is corresponing response
let currentResponse;
//the current State of the game (this made more sense when I thought I would have mroe stages)
let currentState = "generalQuestions";
// some stock positive responses for the bot to keep things a little more humaine
let stockResponsesPositive = ["jolly good", "brilliant", "ace", "right then", "alright", "thanks mate", "nice one"];
// and some begative ones as well
let stockResponsesNegative = ["bollocks", "shit", "wanker", "rubbish", "your taking the piss", ];
let annoyingAdThing = ["don't wait to let your life begin", "listen to your gut", "50% off all bullshit"];
//this will hold the search terms to be used at the end
let searchTerms = "";



// stockResponse
//
// returns one of the stock responses from the appropriate array
function stockResponse(sentiment) {
  if (sentiment === "positive") {
    return stockResponsesPositive[Math.floor(Math.random() * stockResponsesPositive.length)];
  } else {
    return stockResponsesNegative[Math.floor(Math.random() * stockResponsesNegative.length)];
  }
}


//generate the shell of a human
//
// we all start out as a shell
function generateHumanShell() {
  //create an instance of human
  user = new HumanShell();
  // activate annyang, prompting user to allow access to microphone
  annyang.start({
    autoRestart: true,
    continuous: true
  });
  //below is useful when annyang is being difficult,: dumps lots of data into the console
  // annyang.debug(true);
  // start the query
  queryUser(generalQuestions, generalResponses);
}

// queryUser
//
// asks the user questions, and loads acceptable responses
// takes two parameters (the arrays holding the questions and responses)
// picks the appropirate content based on the questionPos variable
function queryUser(questionIndex, responseIndex) {
  //display the question on the screen (this includes an image )
  $("#question").html(questionIndex[questionPos]["written"]);
  //establish what is the first question
  currentQuestion = questionIndex[questionPos]["spoken"];
  // say it
  responsiveVoice.speak(currentQuestion);
  //establish which command we annyang should be listening for
  currentQuery = responseIndex[questionPos]["query"];
  // as well as the appropriate response
  currentResponse = responseIndex[questionPos]["response"];
  //push them to annyangs dict of commands
  let commands = {};
  commands[currentQuery] = currentResponse;
  annyang.addCommands(commands);
}


// handleQuestion
//
// adds yes or no responses to the annyang commands
function handleQuestion(object, parameter, value, questionSet, verify) {
  // ask the user if they said what annyang heard
  responsiveVoice.speak(verify);
  // replace available commands with yes or no
  let verifyCommands = {
    // if user says yes:
    "yes": function() {
      // increase question index
      questionPos++;
      // push the user's input to the appropriate parameter of the human object
      object[parameter] = value;
      // let the user know their response has been recorded, and when finished, run the moveOn function
      responsiveVoice.speak(`${stockResponse("positive")} ${user.name}, let's continue`, voiceType, {
        onend: moveOn
      });
    },
    // if user andswers no:
    "no": function() {
      // let them know we got it, (with some negative reinforcment)
      responsiveVoice.speak(`${stockResponse("negative")} ${user.name}, let's try again`);
      //repeat the question
      responsiveVoice.speak(questionSet[questionPos]["spoken"]);
    }
  }
  // push the yes or no commands to the annyang
  annyang.addCommands(verifyCommands);
}

// moveOn
//
// adds values to the human object, according to the parameters it is passed,
// deals with the state changes in the game
function moveOn() {
  // clear all the commands from annyang
  annyang.removeCommands();
  // load the current state of the game
  switch (currentState) {
    // if it is in the general questions state
    case "generalQuestions":
      //first check to see if we have asked all the available questions
      if (questionPos > generalQuestions.length - 1) {
        // if so, reset the question index
        questionPos = 0;
        //  parse the score of the user
        parseScore();
        // if we havent reached the end, one second later, ask the next question in the
        // general interestArray
      } else {
        setTimeout(queryUser, 1000, generalQuestions, generalResponses);
      }
      // break out of the switch case
      break;
      // if the game is in the interest portion of the questions...
    case "interests":
      // first check to see if we have asked about all of the things the object (human)
      //is interested in
      if (questionPos > Object.keys(user["interests"]).length - 1) {
        // if so, reset the question index
        questionPos = 0;
        // let the user know we have reached the end, and we will be finding them some content
        // when done speaking, run the parseInterests function
        responsiveVoice.speak(`${stockResponse("positive")}, let me pull up your idealized content`, voiceType, {
          onend: parseInterests
        });
        // if we havent reached the end, one second later, ask the next question in the
        // general interestArray
      } else {
        setTimeout(queryUser, 1000, interestQuestions, interestResponses);
      }
      // break out of the switch case
      break;
  }
}


// parseScore
//
// parses the users base score (credit?)
function parseScore() {
  // set the "base score" of the human to their income: to do this we first remove the "$" and the ","
  // from the string annyang has given us
  let baseScore = user.income.replace(/\$|,/g, '');
  // then parse it into an integer
  baseScore = parseInt(baseScore, 10);
  // annoyingly, annyang interprets these numbers in written form for some reason so...
  // load it into a switch case, and run through it applying the appropirate number to a children variable
  let children;
  switch (user.children) {
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
    case "six":
      children = 5;
      break;
    case "seven":
      children = 5;
      break;
    default:
      children = 0;
  }
  // reduce the base score by the number of children to a factor of 10
  baseScore -= (children * 10);
  // if the user lives in a rural area, give them a little bonus
  if (user.area === "rural") {
    baseScore += (baseScore / 5);
    // however if they live in a n urran area, take a bunch away
  } else if (user.area === "urban") {
    baseScore -= (baseScore / 10);
  }
  calculateClass(baseScore)
}

// claculateClass
//
// possibly the most offensive of the functions: does a halfarsed job of calculating the
// user's class based on a tiny amount of information
function calculateClass(baseScore) {
  // if the user's score is less than 25000...
  if (baseScore < 25000) {
    // create a new "user" out of the lower class, passing it the base paramenters of the human shell
    user = new Lower(user.name, user.age, user.income, user.area, user.children, user.aspiration);
    // change the state to prompt an interests base of questions
    currentState = "interests";
    // show a (likely) offensive image, and let them know they are not abad person. When done, fire the moveOn function
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?sad,poor" alt="clickbait" /> <p>I make more than $5000 a week from home.</p>`);
    responsiveVoice.speak(`${stockResponse('positive')}, your score is ${baseScore} you are lower class. That's alright, we can still find some content for you`, voiceType, {
      onend: moveOn
    });
    // same as above different number, and a different class of human. Although (spoiler, alert) inside, all classes of humans
    // are the same.
  } else if (baseScore >= 25000 && baseScore < 95000) {
    user = new Middle(user.name, user.age, user.income, user.area, user.children, user.aspiration);
    currentState = "interests";
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?working,suburban" alt="clickbait" /> <p>Genuine raybans $25.</p>`);
    responsiveVoice.speak(`${stockResponse('positive')}, your score is ${baseScore} you are middle class. Keep it up.`, voiceType, {
      onend: moveOn
    });
  } else if (baseScore >= 95000) {
    user = new Upper(user.name, user.age, user.income, user.area, user.children, humanShell.aspiration);
    currentState = "interests";
    $("#question").html(`<img src="https://source.unsplash.com/400x400/?rich,yaught" alt="clickbait" /> <p>This investment changed my life. But I dont tell just everyone about it...</p>`)
    responsiveVoice.speak(`your score is ${baseScore} you upper class ${stockResponse('negative')}`, voiceType, {
      onend: moveOn
    });
    // in the case that this didn't work, let me know
  } else {
    console.log("something BROKE in calclulateClass()");
  }
}

//parseInterests
//
// grabs all of the interests the user has, and makes them readable for the
// youTube API
function parseInterests() {
  // iterate through the all of the interest keys contained in the object
  for (let i = 0; i < Object.keys(user["interests"]).length; i++) {
    let interest = Object.keys(user["interests"])[i];
    // add a space in between them, appending them all into a long string
    searchTerms += " " + user["interests"][interest];
  }
  // if the user is an instance of upper or middle class...
  if (user instanceof Upper || user instanceof Middle) {
    // add their childhood aspiration to the list of interests
    searchTerms += user.aspiration;
  }
  // now replace all of the spaces with an "or" opperator
  searchTerms = searchTerms.replace(/ /g, "|");
  // run the youtube api with this function
  getPerfectVideo(searchTerms);
}

// getPerfectVideo
//
//runs the search terms though the youTube data v3 api, and picks one of the results
function getPerfectVideo(searchTerms) {
  // initiate an ajax request
  $.ajax({
    // these are the parameters it expects (including my key :-S)
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      key: 'AIzaSyBQmt4CDtxN_5ttVOgVMCRG5gi5C1squos',
      q: searchTerms,
      part: 'snippet',
      maxResults: 10,
      type: 'video',
      videoEmbeddable: true,
    },
    // on a successfull callback...
    success: function(data) {
    // check to make sure there are results, and not an empty array
      if (data["items"].length > 0) {
        // pick a random number which is no greater than the number of results found
        let randInt = Math.floor(Math.random() * data["items"].length);
        // now pick a video id from the array with that number
        let randVidId = data["items"][randInt]["id"]["videoId"];
        // now execute the human's only function passing them their "algorithmically" chosen content
        user.consumeContent(randVidId);
        // if no results are found, I'll be damned
      } else {
        console.log("I'll be damned... no results found");
      }
    },
    error: function(response) {
      console.log("Request Failed");
    }
  });
}
