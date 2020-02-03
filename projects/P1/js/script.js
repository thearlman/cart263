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

//~~~~~~~~~~put javaScript here~~~~~~~~~~~
"use strict";

let keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Backspace", " ", "Shift"];
let shiftKeys = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Backspace ", " ", "Shift"];

let welcomeMessage = `Welcome Back #27080232.
Today you will be transcribing passages from "The Myth of Sysiphus."
Ensure that you transcribe each character correctly.
When a sentence has been transcribed, you may move on.
You must complete at least 5 sentences before taking a break.`


let currentKeyboard = keyLayout;

let keySFX = new Audio();
keySFX.src = "assets/sounds/typing.mp3";
let ambiance = new Audio();
ambiance.src = "assets/sounds/ambience.mp3";
ambiance.loop = true;
let error = new Audio();
error.src = "assets/sounds/error.mp3";
let clear = new Audio();
clear.src = "assets/sounds/clear.mp3";

let charPos = 0;
let NON_PRINT_KEYS = 3;
let SENTENCE_LENGTH = 50;
let targetSentence;
let sentence = "";
let multiCheck = {};
let attemptsRemaining = 3;

//when document has loaded
$(document).ready(function() {
  //advertise for jquery
  console.log(`Using:
    JQuery-3.4.1: https://code.jquery.com/jquery-3.4.1.min.js,
    JQueryUi-1.12.1: https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
    Curious? drop me a line: asaperlman@gmail.com`);
  //make the keyboard
  for (let i = 0; i < keyLayout.length; i++) {
    $("#keyboardWrapper").append(`<div id = "k${i}" class = "key"></div>`);
    $(`#k${i}`).text(keyLayout[i]);
  }
  autoType(welcomeMessage);
})

//types out the welcome message at the beginning
function autoType(content) {
  let currentChar = content.charAt(charPos);
  if (currentChar === "\n") {
    $('#typeMe').append("<br>");
    charPos++;
  } else {
    $('#typeMe').append(currentChar);
    charPos++;
  }
  //when all of the characters have been printed out
  if (charPos >= content.length) {
    //prompt player to press a key
    $("#typeMe").append(`<p id='enterMessage'> Press Any Key To Continue</p>`);
    //make the message flash
    $("#enterMessage").css({"animation" : "flash .5s infinite", "animation-direction" : "alternate"});
    //add a one-time event listner for keydown
    $(document).one("keydown", ()=>{
      // keySound();
      //reset charpos (for good measure)
      charPos = 0;
      //start the game
      gameStart();
      ambiance.play();
    })
    //break out of the loop
    return;
  }
  //start the whole process again
  setTimeout(autoType, Math.floor(Math.random() * 10), content);
}

function gameStart(){
  //generate first sentence
  generateSentence();
  //initiate character counter
  charactersLeft(null);
  //initiate score counter (spoiler this 'aint changing')
  $("#score").text(`Passages Succesfully Completed: 0`);
  //initiate attempts counter
  $("#attempts").text(`Attempts remaining for current Passage: ${attemptsRemaining}`);
  //set listner for keydown, to the handleInput function
  $(document).on("keydown", ()=>{
    handleInput(event.key);
  });
}


function handleInput(eventKey) {
  //check for modifer key (shift)
  modifierCheck(eventKey);
  //iterate through all of the document objects with a ".key" class,
  for (let i = 0; i < keyLayout.length; i++) {
    //if the key pressed (event.key) is equal to one of the allowed keys to press
    if (eventKey === currentKeyboard[i]) {
      //play the keyboard sound.
      // keySound();
      //animate the keyboard's buttons
      animateKeyboard(eventKey);
      //if the key is backspace, remove the last child of the userInput element
      if (eventKey === "Backspace") {
        $("#userInput").children().last().remove();
        //also remove that characted from the sentence variable
        sentence = sentence.slice(0, sentence.length - 1);
        //update the characters counter
        charactersLeft(null);
        //if the key pressed is shift, dont do shi*t
      } else if (eventKey === "Shift") {
        return;
        //else if player has not reached the character limit
      } else if (sentence.length < SENTENCE_LENGTH) {
        // append the corresponding character into the userInput div
        $("#userInput").append(`<div class = "letter">${currentKeyboard[i]}</div>`);
        //also add the character to the sentence string
        sentence += currentKeyboard[i];
        charactersLeft(null);
        if (sentence.length === SENTENCE_LENGTH) {
          checkResults();
        }
      }
    }
  }
}


function checkResults() {
  error.pause();
  error.currentTime = 0;
  error.play();
  //if player actually types it correctly, mess it up for them
  if (sentence === targetSentence) {
    sentenceMesserUpper();
    //tak eaway an attempt
    attemptsRemaining --;
  } else {
    //else show them where their errors are
    let incorrectChars = 0;
    for (let i = 0; i < $("#userInput").children().length; i++) {
      if ($("#userInput").children()[i].innerHTML != targetSentence[i]) {
        $("#userInput").children()[i].style.background = "rgba(0, 0, 0, .4)";
        $("#userInput").children()[i].style.animation = "shake 4s";
        incorrectChars++;
        //update characters left, passing number of incorect chars
        attemptsRemaining --;
        charactersLeft(incorrectChars);
        break;
      }
    }
  }
  if (attemptsRemaining <= 0){
    clear.play();
    setTimeout(resetGame, 600);
  }
  $("#attempts").text(`Attempts remaining for current Sentence: ${attemptsRemaining}`);
  $("#attempts").effect("shake");
}

function resetGame(){
  generateSentence();
  charactersLeft(null);
  attemptsRemaining = 3;
  let eraseTime = 10;
  for (let i = ($("#userInput").children().length - 1); i >= 0; i--) {
    eraseTime += 10;
    setTimeout(()=>{
      $("#userInput").children()[i].remove();
    },eraseTime);
  }
  sentence = "";
  charactersLeft(null);
  $("#attempts").text(`Attempts remaining for current Sentence: ${attemptsRemaining}`);
}


function modifierCheck(eventKey) {
  //stores whatever key was pressed into the multicheck key-value as true
  multiCheck[eventKey] = true;
  //if there is an key of "shift" with a value of true...
  if (multiCheck["Shift"]) {
    //change the current keyboard to the shift keys
    currentKeyboard = shiftKeys;
    //run through all of the divs that make up the keyboard, and change their contents accordingly
    for (let i = 0; i < $("#keyboardWrapper").children().length; i++) {
      $("#keyboardWrapper").children()[i].innerHTML = currentKeyboard[i];
    }
  }
  //sets listner for key coming back up
  $(document).on("keyup", () => {
    //remove the key-value
    delete multiCheck[eventKey];
    //change keyboard variable back to default
    currentKeyboard = keyLayout;
    //run through the keys and change their contents
    for (let i = 0; i < $("#keyboardWrapper").children().length; i++) {
      $("#keyboardWrapper").children()[i].innerHTML = currentKeyboard[i];
    };
  });
}



function animateKeyboard(eventKey) {
  $(".key").each((index, element) => {
    if (eventKey === element.innerHTML) {
      //translate the elements position down (to appear as though it has been pressed)
      $(element).css("transform", "translateY(2px)");
      //set a listener to put it back
      $(document).on("keyup", () => {
        $(element).css("transform", "translateY(0)");
      })
    }
  })
}


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


function sentenceMesserUpper() {
  let ranDiv = Math.floor(Math.random() * $("#userInput").children().length);
  let randNum = Math.floor(Math.random() * (keyLayout.length - NON_PRINT_KEYS));
  let randLetr = keyLayout[randNum];
  $("#userInput").children()[ranDiv].innerHTML = randLetr;
  setTimeout(() => {
    $("#userInput").children()[ranDiv].style.background = "rgba(0, 0, 0, .4)";
    $("#userInput").children()[ranDiv].style.animation = "shake 4s";
    charactersLeft(1);
  }, 500)
}

function generateSentence() {
  let sentStart = Math.floor(Math.random() * myth.length - SENTENCE_LENGTH);
  targetSentence = myth.slice(sentStart, sentStart + SENTENCE_LENGTH);
  if (targetSentence[0] === " " || targetSentence[targetSentence.length - 1] === " ") {
    generateSentence();
  }
  $("#typeMe").text(`Please Type: "${targetSentence}" Exactly as shown.`);
}

function charactersLeft(incorrectChars) {
  let charsLeft = SENTENCE_LENGTH - sentence.length + incorrectChars;
  if (charsLeft === 1){
    $("#lettersToType").text(`You have ${charsLeft} character left to type.`);
  } else {
    $("#lettersToType").text(`You have ${charsLeft} characters left to type.`);
  }
}
