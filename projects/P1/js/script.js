//Quick tutorial on handling multi key presses:
//https://www.gavsblog.com/blog/detect-single-and-multiple-keypress-events-javascript

//~~~~~~~~~~put javaScript here~~~~~~~~~~~
"use strict";
let keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Backspace", " ", "Shift"];
let shiftKeys = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "p", "{", "}", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Backspace ", " ", "Shift"];

let currentKeyboard = keyLayout;

let keySFX = new Audio();
keySFX.src = "assets/sounds/typing.wav";

$(document).ready(function() {
  //advertise for jquery
  console.log(`Using:
    JQuery-3.4.1: https://code.jquery.com/jquery-3.4.1.min.js,
    JQueryUi-1.12.1: https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
    Curious? drop me a line: asaperlman@gmail.com`);
    //make the keyboard
  for (let i = 0; i < 46; i++) {
    $("#keyboardWrapper").append(`<div id = "k${i}" class = "key"></div>`);
    $(`#k${i}`).text(keyLayout[i]);
  }
  generateSentence();
})


let MODIFIER_KEYS = 3;
let SENTENCE_LENGTH = 50;
let targetSentence;
let sentence = "";
let multiCheck = {};

//listens for a keydown event
$(document).on("keydown", () => {
  multiCheck[event.key] = true;
  currentKeyboard = shiftKeys;
  if (multiCheck["Shift"]){
    for (let i = 0; i < $("#keyboardWrapper").children().length; i++){
      $("#keyboardWrapper").children()[i].innerHTML = currentKeyboard[i];
    }
  }
  //iterate through all of the document objects with a ".key" class,
  $(".key").each((index, element) => {
    //if the key pressed (event.key) is equal to one of the element's contents
    if (event.key === element.innerHTML) {
      let soundSnippet = Math.random() * keySFX.duration;
      keySFX.currentTime = soundSnippet;
      keySFX.play()
      setTimeout(() => {
        keySFX.pause()
      }, 80);
      //change that element's background to red
      $(element).css("transform", "translateY(4px)");
      $(document).on("keyup", ()=>{
        $(element).css("transform", "translateY(0)");
      })
      //if the key is backspace, remove the last child of the userInput element
      if (event.key === "Backspace") {
        $("#userInput").children().last().remove();
        sentence = sentence.slice(0, sentence.length - 1);
        //if the key pressed is shift, dont do shi*t
      } else if (event.key === "Shift"){
        return;
      } else {
        // else append the key which is pressed into the userInput div
        $("#userInput").append(`<div class = "letter">${event.key}</div>`);
        sentence += element.innerHTML;
        //if player has reached the end of the sentence, show them where their errors are
        if (sentence.length >= targetSentence.length){
          for (let i = 0; i < $("#userInput").children().length; i++){
            if ($("#userInput").children()[i].innerHTML != targetSentence[i]){
              $("#userInput").children()[i].style.background  = "rgba(0, 0, 0, .4)";
              $("#userInput").children()[i].style.animation = "shake 4s";

              return
            }
          }
        }
        //if player actually types it correctly, mess it up for them
        if (sentence === targetSentence) {
          sentenceMesserUpper();
          console.log("MESS!");
        }
      }
    };
  });
});


$(document).on("keyup", ()=>{
  delete multiCheck[event.key];
  currentKeyboard = keyLayout;
  for (let i = 0; i < $("#keyboardWrapper").children().length; i++){
    $("#keyboardWrapper").children()[i].innerHTML = currentKeyboard[i];
  }
})


function sentenceMesserUpper() {
  let ranDiv = Math.floor(Math.random() * $("#userInput").children().length);
  let randNum = Math.floor(Math.random() * (keyLayout.length - MODIFIER_KEYS));
  let randLetr = keyLayout[randNum];
  console.log(randLetr, randNum);
  $("#userInput").children()[ranDiv].innerHTML = randLetr;
  setTimeout(()=>{
    $("#userInput").children()[ranDiv].style.background = "rgba(0, 0, 0, .4)";
    $("#userInput").children()[ranDiv].style.animation = "shake 4s";
  }, 500)
}

function generateSentence() {
  let sentStart = Math.floor(Math.random() * myth.length - SENTENCE_LENGTH);
  targetSentence = myth.slice(sentStart, sentStart + SENTENCE_LENGTH);
  if (targetSentence[0] === " " || targetSentence[targetSentence.length -1] === " "){
    console.log("REDO!");
    console.log("'"+targetSentence+"'");
    generateSentence();
  }
  $("#typeMe").text(`Please Type: "${targetSentence}" exactly as shown.`);
}
