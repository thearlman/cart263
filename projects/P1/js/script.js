//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~ Fidgephus Pro ~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//By: Asa Perlman
//Inspiration from: CART263 (Pippin Barr) Conco U Winter 2020
//
//~~~~~~~~~~~~~~~~~Credz where Credz'z Due~~~~~~~~~~~~~~~~~~~
//Quick tutorial on handling multi-key presses:
//https://www.gavsblog.com/blog/detect-single-and-multiple-keypress-events-javascript
//Typing sound effect:
//http://soundbible.com/464-Typing-On-Keyboard.html
//Ambient sound:
//http://soundbible.com/1305-Cargo-Plane-Cabin-Ambiance.html
//error sound:
//http://soundbible.com/suggest.php?q=error&x=0&y=0
//clear sound:
//http://soundbible.com/5-Answering-Machine-Beep.html

//~~~~~~~~~~~~~~~~~~~~~In Brief~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//As Idle hands are the devils workshop; Fidgephus offers infinite
//hours of fingerobics.
//
//It is the year 2042. As artificial intelligence has rendered
//CAPTCHA, obsolete, the human race has found itself desperately in need
//of something to fill the moments once spent training image recognition
//models. Inspired in equal measures by CAPTCHA, Fidget Spinners, and the
//tactile days of yore, the Fidgephus Pro was invented.



//~~~~~~~~~~put javaScript here~~~~~~~~~~~
//be strict about the ;'s
"use strict";
//array for the lower case keyboard
let keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Backspace", " ", "Shift"];
//array for the keyboard when shifted
let shiftKeys = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Backspace ", " ", "Shift"];
//variable to store current keyboard being used
let currentKeyboard = keyLayout;

//the welcome message, complete with auto generating user id
let welcomeMessage = `Welcome Back #${Math.floor(Math.random()*1000000) + 2000000}.
Today you will be transcribing passages from "The Myth of Sysiphus."
When a passage has been transcribed correctly, you may move on.
You must complete at least 5 sentences before taking a break.`

//the audioooos
let keySFX = new Audio();
keySFX.src = "assets/sounds/typing.mp3";
let ambiance = new Audio();
ambiance.src = "assets/sounds/ambience.mp3";
ambiance.loop = true;
let error = new Audio();
error.src = "assets/sounds/error.mp3";
let clear = new Audio();
clear.src = "assets/sounds/clear.mp3";

//holds the current character position for autoType()
let charPos = 0;
//used to truncate key layout array in sentenceMesserUpper()
const NON_PRINT_KEYS = 3;
//sets how many characters the user will be prompted to copy
const SENTENCE_LENGTH = 50;
//defines the users score. Declared as a const cause that's funny
const USER_SCORE = 0;
//holds the string chosen from the myth
let targetSentence;
//holds the characters the user as typed
let userTyped = "";
//temoprarily holds a key-value, to check for multi-key events
let modifierKey = {};
//number of times user can retry before content is replaced
let attemptsRemaining = 3;

//when document has loaded
$(document).ready(() => {
  //advertise for jquery/ jQuery UI
  console.log(`Using:
    JQuery-3.4.1: https://code.jquery.com/jquery-3.4.1.min.js,
    JQueryUi-1.12.1: https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
    Curious? drop me a line: asaperlman@gmail.com`);
  //generate the keyboard:
  for (let i = 0; i < keyLayout.length; i++) {
    //append a div to the keyboard wrapper, for every entry in the
    //key layout array, assigning it an id that coresponds with its index
    $("#keyboardWrapper").append(`<div id = "k${i}" class = "key"></div>`);
    //insert the text from this array index into the newly made div
    $(`#k${i}`).text(keyLayout[i]);
  }
  //trigger the auto printing
  autoType(welcomeMessage);
})


//autoType()
//
//types out the welcome message at the beginning, into the #typeMe div
function autoType(content) {
  //defines the current character. charAt(), is used to access the character
  //at a given position: https://www.w3schools.com/jsref/jsref_charat.asp
  let currentChar = content.charAt(charPos);
  //if that character is a newline insert a line break and increase charPos count
  if (currentChar === "\n") {
    $('#typeMe').append("<br>");
    charPos++;
    //otherwise, insert the current character, as is. Also inrease count
  } else {
    $('#typeMe').append(currentChar);
    charPos++;
  }
  //when all of the characters have been printed out
  if (charPos >= content.length) {
    //prompt player to press a key
    $("#typeMe").append(`<p id='enterMessage'> Press Any Key To Continue</p>`);
    //and make the message flash
    $("#enterMessage").css({
      "animation": "flash .5s infinite",
      "animation-direction": "alternate"
    });
    //add a one-time listner for keydown which will start the game
    $(document).one("keydown", gameStart);
    //reset charpos (for good measure)
    charPos = 0;
    //break out of the loop
    return;
  }
  //start the whole process again
  setTimeout(autoType, Math.floor(Math.random() * 10), content);
}


//gameStart()
//
//sets a bunch of initial paramenters
function gameStart() {
  //begin dystopic ambient sound
  ambiance.play();
  //generate first sentence
  generateSentence();
  //initiate character counter
  charactersLeft(null);
  //initiate score counter
  $("#score").text(`Passages Succesfully Completed: ${USER_SCORE}`);
  //initiate attempts counter
  $("#attempts").text(`Attempts remaining for current Passage: ${attemptsRemaining}`);
  //set listner for keydown, to the handleInput function
  $(document).on("keydown", () => {
    handleInput(event.key);
  });
}

//handleInput()
//
//does probably more than it should:
//is passed the eventKey parameter from the event listner above
function handleInput(eventKey) {
  //check for modifer key (shift)
  modifierCheck(eventKey);
  //iterate through the keylayout
  for (let i = 0; i < currentKeyboard.length; i++) {
    //if the key pressed (event.key) is equal to one of the allowed keys to press
    if (eventKey === currentKeyboard[i]) {
      console.log("TRUE");
      //play the keyboard sound.
      keySound();
      //animate the keyboard's buttons
      animateKeyboard(eventKey);
      //if the key is backspace, remove the last child of the userInput element
      if (eventKey === "Backspace") {
        $("#userInput").children().last().remove();
        //also remove that char from the sentence variable
        userTyped = userTyped.slice(0, userTyped.length - 1);
        //update the characters counter
        charactersLeft(null);
        //if the key pressed is shift, dont do shi*t
      } else if (eventKey === "Shift") {
        return;
        //else if player has not reached the character limit
      } else if (userTyped.length < SENTENCE_LENGTH) {
        // append the corresponding character into the userInput div
        $("#userInput").append(`<div class = "letter">${currentKeyboard[i]}</div>`);
        //also add the character to the sentence string
        userTyped += currentKeyboard[i];
        charactersLeft(null);
        if (userTyped.length === SENTENCE_LENGTH) {
          checkResults();
        }
      }
    }
  }
}

//checkResults()
//
//checks the user's input when string limit is reched
function checkResults() {
  //deal with sound
  error.pause();
  error.currentTime = 0;
  error.play();
  //if player actually types it correctly, mess it up for them
  if (userTyped === targetSentence) {
    sentenceMesserUpper();
    //tak eaway an attempt
    attemptsRemaining--;
  } else {
    //else show them where their errors are
    let incorrectChars = 0;
    for (let i = 0; i < $("#userInput").children().length; i++) {
      let child = $("#userInput").children()[i];
      if ($(child).html() != targetSentence[i]) {
        $(child).css("background", "rgba(0, 0, 0, .4)");
        $(child).effect("shake", {
          duration: 300,
          distance: 5
        });
        // $("#userInput").children()[i].style.animation = "shake 4s";
        incorrectChars++;
        //update characters left, passing number of incorect chars
        attemptsRemaining--;
        charactersLeft(incorrectChars);
        break;
      }
    }
  }
  //if user has reached end of attempts
  if (attemptsRemaining <= 0) {
    //play an obnoxious sound
    clear.play();
    //reset the game shortly after
    setTimeout(resetGame, 1500);
  }
  //update the attempst 'n' shake
  $("#attempts").text(`Attempts remaining for current Sentence: ${attemptsRemaining}`);
  $("#attempts").effect("shake");
}

//modifierCheck()
//
//check for modifier keys
function modifierCheck(eventKey) {
  //stores whatever key was pressed into the modifierKey key-value as true
  modifierKey[eventKey] = true;
  //if there is a key of "shift" with a value of true...
  if (modifierKey["Shift"]) {
    //change the current keyboard to the shift keys
    currentKeyboard = shiftKeys;
    //run through all of the divs that make up the keyboard, and change their contents accordingly
    for (let i = 0; i < $("#keyboardWrapper").children().length; i++) {
      $("#keyboardWrapper").children()[i].innerHTML = currentKeyboard[i];
    }
  }
  //EASTER EGG: if the user presses enter, execute whatever they have typed as code
  else if (modifierKey["Enter"]) {
    //execute whatever the user has typed as code using eval() [https://www.w3schools.com/jsref/jsref_eval.asp]
    //do this asynchronously, so if the code is garbage, it doesnt prevent the function from
    //completing
    setTimeout(eval, 50, userTyped);
    //log it out for troubleshooting
    console.log(`You executed:
      ${userTyped}`);
  }
  //set listner for key coming back up
  $(document).one("keyup", () => {
    //remove the key-value
    console.log("unshiftying");
    delete modifierKey[eventKey];
    //change keyboard variable back to default
    currentKeyboard = keyLayout;
    //run through the keys and change their contents
    for (let i = 0; i < $("#keyboardWrapper").children().length; i++) {
      $("#keyboardWrapper").children()[i].innerHTML = currentKeyboard[i];
    };
  });
}


//animateKeyboard()
//
//does what it says
function animateKeyboard(eventKey) {
  //iterate through all of the keys in the index
  $(".key").each((index, element) => {
    //if the content of the key matches the key pressed
    if (eventKey === element.innerHTML) {
      //translate the elements (key's) position down (to appear as though it has been pressed)
      $(element).css("transform", "translateY(2px)");
      //set a listener to put it back
      $(document).on("keyup", () => {
        $(element).css("transform", "translateY(0)");
      });
    };
  });
}

//keySound
//
//picks snippets from the keyboard soundtrack and plays them
function keySound() {
  //pick a random part of the keyboard sound file and store it in a variable
  let soundSnippet = Math.random() * keySFX.duration;
  //set the current time of the sound file to that random point and play it
  keySFX.currentTime = soundSnippet;
  keySFX.play()
  //80 milliseconds later, pause it
  setTimeout(() => {
    keySFX.pause()
  }, 80);
}

//sentenceMesserUpper()
//
//messes up what the user has typed.. heh...heh...heh...
function sentenceMesserUpper() {
  //pick a random div from inside the input container
  let ranDiv = Math.floor(Math.random() * $("#userInput").children().length);
  //pick a random number within the limit of key layout
  let randNum = Math.floor(Math.random() * (keyLayout.length - NON_PRINT_KEYS));
  //choose the letter from the array with the corresponding index
  let randLetr = keyLayout[randNum];
  //select the div and replace its contnent with our random letter
  $("#userInput").children()[ranDiv].innerHTML = randLetr;
  //highlight and shake it in a mocking fasion
  setTimeout(() => {
    $("#userInput").children()[ranDiv].style.background = "rgba(0, 0, 0, .4)";
    $("#userInput").children()[ranDiv].style.animation = "shake 4s";
    //ammend the remaining characters to reflect the misspelled letter
    charactersLeft(1);
  }, 500);
}

//generateSentence()
//
//selects a passage for the user to copy
function generateSentence() {
  //pick a number between 1 and 10... wait no.. pick a number between 0 and
  //the length of the myth string, minus the length of passage
  let sentStart = Math.floor(Math.random() * myth.length - SENTENCE_LENGTH);
  //define a variable containing a sliced bit of the string between our starting number, and the
  //length of the string
  targetSentence = myth.slice(sentStart, sentStart + SENTENCE_LENGTH);
  //if either the first, or last character of the string is a space...
  if (targetSentence[0] === " " || targetSentence[targetSentence.length - 1] === " ") {
    //redo the whole process
    generateSentence();
    return;
    //otherwise stick the sentence into the "typeMe" div
  } else {
    $("#typeMe").text(`Please Copy:
    "${targetSentence}"
    Exactly as shown.`);
  }
}


//charactersLeft()
//
//calculates how many more characters the user has left to type
function charactersLeft(incorrectChars) {
  //subtract the number of chars the user has typed from the length of the passages
  //adding the number of incorrect characters (if any)
  let charsLeft = SENTENCE_LENGTH - userTyped.length + incorrectChars;
  //for grammerzz sake: if there is only one, remove the "s" from characters
  if (charsLeft === 1) {
    $("#lettersToType").text(`You have ${charsLeft} character left to copy.`);
  } else {
    $("#lettersToType").text(`You have ${charsLeft} characters left to copy.`);
  }
}

//resetGame()
//
//resets the important stuff when user runs out of tries
function resetGame() {
  //generate a new sentence
  generateSentence();
  //reset the chars counter
  charactersLeft(null);
  //reset attempts
  attemptsRemaining = 3;
  //little hacky variable for timing.. you'll see...
  let eraseTime = 10;
  //iterate through the number of divs (letters) in the user input
  for (let i = ($("#userInput").children().length - 1); i >= 0; i--) {
    //add ten to the erase timer
    eraseTime += 10;
    //set a timer to remove that div using that nifty eraseTime var
    setTimeout(() => {
      $("#userInput").children()[i].remove();
    }, eraseTime);
  }
  //reset the variable storing wht the user has typed
  userTyped = "";
  //do this again for some reason (something's broken...)
  charactersLeft(null);
  //this should really be a function (since we've seen it like 100 times now)
  $("#attempts").text(`Attempts remaining for current Sentence: ${attemptsRemaining}`);
}

//cheat()
//
//just in case someone tries to type that in the input...
function cheat() {
  alert("YOU CHEATER!")
}
