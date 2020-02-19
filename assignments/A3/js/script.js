//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~Slamina Special
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Sort of by: Asa Perlman
//But mostly by: Pippin Barr
//
//annyang API: https://www.talater.com/annyang/
//responsive voice API: https://responsivevoice.org/api/
//everypixel stock image search: https://www.everypixel.com/

//~~~~~~~~In Brief~~~~~~~~~~~~
//An educational animal exercise in backwards listening
//Listen carefully and try to identify the animal in question
//if you manage to get it right, you are rewarded with lovely
//stock images of the animal in question

//The global variables
//
//empty array to store the selection of possible animal names
let options = [];
//epty string to store the correct answer
let correctAnswer = "";
//the number of options given to the user
const NUM_OPTIONS = 5;
//the character position, of the content typed by autoType
let charPos = 0;
//stores how many answers the user has gotten correctly
let correctAnswerCount = 0;
//stores how many times the user has given up
let failures = 0;

//when the document loads, use the now very recycled autoType(patent pending) function
$(document).ready(() => {
  autoType(welcomeMessage);
});

//autoType()
//
//types out the welcome message at the beginning, into the #typeMe div
function autoType(content) {
  //defines the current character. charAt(), is used to access the character
  //at a given position: https://www.w3schools.com/jsref/jsref_charat.asp
  let currentChar = content.charAt(charPos);
  //if that character is a newline insert a line break and increase charPos count
  if (currentChar === "\n") {
    $('#description').append("<br>");
    charPos++;
    //otherwise, insert the current character, as is. Also inrease count
  } else {
    $('#description').append(currentChar);
    charPos++;
  }
  //when all of the characters have been printed out
  if (charPos >= content.length) {
    //request access to the users microphone, and start listening
    annyang.start();
    //reset charpos (for good measure)
    charPos = 0;
    //add a button to begin the game (and get around the user interaction audio BS**)
    //**it's not really bs it's good it exists
    $("#welcome").append(`<div id="welcomeButton">Click Me To Begin</div>`);
    //add the event listener for the button
    $("#welcomeButton").on("click", function(){
      //when clicked remove the welcome message content
      $("#welcome").remove();
      //and begin the first round
      newRound();
    });
    //break out of the loop
    return;
  }
  //start the whole process again
  setTimeout(autoType, Math.floor(Math.random() * 5), content);
}

//newRound()
//
//starts a new round of the game
function newRound() {
  //empties the array of options
  options = [];
  //remove any of the divs in the guesses element
  for (let i = $("#guesses").children().length - 1; i >= 0; i--) {
    $("#guesses").children()[i].remove();
  }
  //add a prompt for the user to prefix their guess
  $("#guesses").append(`<div>please say: "I think it is..."</div>`);
  //iterate run a loop as many times as their are options
  for (let i = 0; i < NUM_OPTIONS; i++) {
    //assign a random animal name to a variable
    let label = animals[Math.floor(Math.random() * animals.length)];
    //and push that name into the aoptions array
    options.push(label);
    //give this animal name as an option
    addOption(label);
  }
  //append another div containing some more instructions
  $("#guesses").append(`<div>Want to hear it again? Say "Play it again sam..." <br>
  Give up? say "I'm a quitter"</div>`);
  $("#guesses").append(`<div>You have gotten ${correctAnswerCount} right. <br>
    You have given up ${failures} times</div>`)
  //decide on a correct answer, by picking a random animal from the options array
  correctAnswer = options[Math.floor(Math.random() * options.length)];
  console.log(correctAnswer);
  //create the backwards version of the answer, by splitting the string into chars,
  //reversing them, and then joining them again
  let backwardsAnswer = correctAnswer.split('').reverse().join('');
  //say the backwards answer using the responsive voice API
  responsiveVoice.speak(backwardsAnswer);
  //define what the user can say to trigger an event
  commands = {
    //if the user is a quitter, trigger a new round and add one to the failures count
    "i'm a quitter": function() {
      failures++;
      newRound();
    },
    //if the user is hard of hearing, repeat the backwards answer
    "play it again sam": function() {
      responsiveVoice.speak(backwardsAnswer);
    },
    //if the user dares to venture a guess, try their guess out
    "i think it is *guess": guessCheck
  }
  //pass this object to the api: WhoTF knows how this works....
  annyang.addCommands(commands);
}

//addOption()
//
//appeds a new div into the guesses element, containing the animal name it was passed
function addOption(label) {
  let $newDiv = $('<div></div>');
  $newDiv.addClass('guess');
  $newDiv.text(`"`+label+`"`);
  $newDiv.appendTo("#guesses");
}

//if what the user said doesn't match any of the commands, print if out
//in the console for fun
annyang.addCallback('resultNoMatch', function(userSaid) {
  console.log("The user said: " + userSaid);
})

//guessCheck()
//
//compares the users gues against the correct answer
function guessCheck(guess) {
  //if the guess passed to the function matches with the globally stored correct answer
  if (guess === correctAnswer) {
    correctAnswerCount ++;
    //remove all of the options, and replace them with an Iframe containing an stock image
    //search for the animal in question
    $("#guesses").html(`<iframe id = "rewardPic" src="https://www.everypixel.com/search?q=${correctAnswer}&meaning=&stocks_type=free&media_type=0&page=1"></iframe>`);
    //when the Iframe has fully loaded we start a countdown to the new round...
    $("#rewardPic").on("load", () => {
      //declare a variable to keep track of the seconds...
      let newRoundTime = 10;
      //create a div to hold the countdown
      let $newRoundIn = $(`<div></div>`);
      //append it to the element
      $newRoundIn.appendTo("#guesses");
      //set an interval timer to fire once a second
      let roundTimer = setInterval(function() {
        //decrease the seconds counter
        newRoundTime--;
        //and display it in the aformentioned countdown div
        $newRoundIn.text(`New Round In: ${newRoundTime}`);
        //if all of the seconds have run out..
        if (newRoundTime < 0) {
          //call a new round
          newRound();
          //stop the timer by clearing the interval
          clearInterval(roundTimer);
        }
      }, 1000)
    })
    //if the guess does not match the correct answer...
  } else {
    //iterate through all of the elements with the "guess" class
    for(let i = 0; i < $(".guess").length; i++){
      //create a jQuery obj with the current element
      let $badAnswer = $(".guess")[i];
      //compare its text with the users guess
      if ($badAnswer.innerHTML === guess){
        //if it matches, shake the div containing the bad answer
        $($badAnswer).effect("shake");
      }
    }
  }
}

//stores the welcome message to be passed to autoType()
//the weird formatting, is because autoType() understands carriage returns
let welcomeMessage = `Welcome this thing.
          Please enable your microphone to continue.
          You will have a coice of 5 animals.
          One of the animals will be spoken backwards.
          You must speak the name of the animal you think has been spoken.
          If you cannot figure it out, say "I give up".
          If you get the animal correct, you will be rewarded with cute animal pics.`;
