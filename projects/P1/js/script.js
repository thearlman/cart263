//~~~~~~~~~~put javaScript here~~~~~~~~~~~
"use strict";
let keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "Backspace", " "];

let keySFX = new Audio();
keySFX.src = "assets/sounds/typing.wav";

$(document).ready(function() {
  console.log(`Using:
    JQuery-3.4.1: https://code.jquery.com/jquery-3.4.1.min.js,
    JQueryUi-1.12.1: https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
    Curious? drop me a line: asaperlman@gmail.com`);


  for (let i = 0; i < 38; i++) {
    $("#keyboardWrapper").append(`<div id = "k${i}" class = "key"></div>`);
    $(`#k${i}`).text(keyLayout[i]);
  }
})


// setInterval(() => {
//   if ($("#screen").children().length > 0) {
//     let divNum = Math.floor(Math.random() * $("#screen").children().length);
//     $("#screen").children()[divNum].innerHTML = keyLayout[Math.floor(Math.random() * keyLayout.length)];
//   }
// }, 1000);
let targetSentence;
let sentence = "";

//listens for a keydown event
$(document).on("keydown", () => {
  //iterate through all of the document objects with a ".key" class,
  $(".key").each((index, element) => {
    //if the key pressed (event.key) is equal to one of the element's contents
    if (event.key === element.innerHTML) {
      let soundSnippet = Math.random()*keySFX.duration;
      keySFX.currentTime = soundSnippet;
      keySFX.play()
      setTimeout(()=>{
        keySFX.pause()
      },80);
      //if the key is backspace, remove the last child of the screen element
      if (event.key === "Backspace") {
        $("#screen").children().last().remove();
        sentence = sentence.slice(0, sentence.length-1);
        // console.log(sentence);
        // else append the key which is pressed into the screen div
      } else {
        $("#screen").append(`<div class = "letter">${event.key}</div>`);
        sentence += event.key
        // console.log(sentence);
        if (sentence === targetSentence){
            sentenceMesser();
            console.log("MESS!");
        }
      }
      //change that element's background to red
      $(element).css("background", "red");
      // set an event listener to change that key's background to white on key up.
      $(document).on("keyup", () => {
        setTimeout(() => {
          $(element).css("background", "white");
        }, 80, element)
      });
    };
  });
});

function sentenceMesser(){
  let ranDiv = Math.floor(Math.random()* $("#screen").children().length);
  let randNum = Math.floor(Math.random()*keyLayout.length - 2);
  let randLetr = keyLayout[randNum];
  console.log(randLetr, randNum);
  $("#screen").children()[ranDiv].innerHTML = randLetr;
}

function generateSentence(){
  let sentStart = Math.floor(Math.random()*myth.length - 10);
  targetSentence = myth.slice(sentStart, sentStart + 50);
  $("#typeMe").text(`Please Type: ${targetSentence}`);
}
