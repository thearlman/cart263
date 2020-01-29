//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//~~~~~~~~~~~~Dirty Joyce v1.0~~~~~~~~~~~~~~~~~~~~~~~~~
//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~By: Asa Perlman~~~~~~~~~~~~~
//~~~~~Inspiration/ starter code: Pippin Barr~~~~

//~~~~~~~~~~~~Media Credz:

//monitor image
//https://www.deviantart.com/halfingr/art/Vectorized-CRT-Monitor-Stock-PNG-292314284

// experpt from James Joyce letter:
//https://www.theparisreview.org/blog/2018/02/02/james-joyces-love-letters-dirty-little-fuckbird/

//beep sound:
//http://soundbible.com/1682-Robot-Blip.html

//point sound:
//CANT REMEMBER WHERE I GOT IT  :( BUT IT BELONGS TO MICROSOFT

//price is right losing sound:
//https://www.youtube.com/watch?v=_asNhzXq72w

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~In Brief:~~~~~~~~~~~
//It's 1994, you are entrusted with the James Joyce archives.
//Someone has come across these dirty letters he wrote to his beloved Norah
//For some reason it is important you redact bits of it, because... your
//pc is being live-streamed.
//For some other reason, if you manage to decode the hidden message in his letter,
//you get to stop working. enjoy



//~~~~~~~~~~put javaScript here~~~~~~~~~~~

//discipline oo
//            -
//             O
"use strict";

// variable to store set timeout
let redactTimer;
//number of secrets to find
let numSecrets;
// array of secrets found
let secretsFound;
//number of secrets found
let numSecretsFound;

//audioooooo
let blip = new Audio();
blip.src = "assets/sounds/blip.wav";

let point = new Audio();
point.src = "assets/sounds/point.wav";

let uLose = new Audio();
uLose.src = "assets/sounds/lose.mp3";

//seconds to hit play again
let countdown;
//for set interval
let countdownTimer;

//millis between redactions
const REDACT_INTERVAL = 1000;
//odds of spans being redacted
const ODDS = 0.1;


//when page has loaded....
$(document).ready(() => {
  //advertise fo jquery
  console.log("Using jquery V-3.4.1 https://code.jquery.com/jquery-3.4.1.min.js");
  //set listener for the button on welcome screen to run function below
  $("#startButton").on("click", gameTrigger)
  //set the number of secrets to the number of spans w that class
  numSecrets = $('.secret').length;

  //triggers the game when button is pressed
  function gameTrigger() {

    //lets reset some parameters
    //array of secrets
    secretsFound = [];
    //number of them found
    numSecretsFound = 0;
    //clear the countdown timer (not applicable if first itme round)
    clearInterval(countdownTimer);
    //yet another reset
    countdown = 10;
    //hide the game over screen
    $("#gameOver").css("visibility", "hidden");
    //hide the welcome screen
    $("#welcomeScreen").css("visibility", "hidden");
    //show the main game screen
    $("#textWrapper").css("visibility", "visible");
    //iterate through all DO's with the revealed class and make them
    //redacted again
    $('.revealed').each(function() {
      $(this).removeClass('revealed').addClass('redacted');
    });
    //same for the found secrets
    $('.secretFound').each(function() {
      $(this).removeClass('secretFound').addClass('secret');
    });
    //set event listner for the secret class
    $('.secret').on('mouseover', secretFound);
    //start the interval to trigger redactions
    //the annonymous function below runs the updateSpan function, for each
    //of the spans with a 'redacted' class, passing them along as an object
    redactTimer = setInterval(() => {
      $('.redacted').each(updateSpan);
    }, REDACT_INTERVAL);


    //yet another event listner: when spans are clicked, set them
    //back to redacted
    $('.redacted').on('click', function() {
      console.log("hello");
      $(this).removeClass('revealed').addClass('redacted');
    });

    //let the player know how many secrets they're searching for
    $('#score').text(`Secrets Remaining: ${numSecrets}`);
  };

  //triggered by the mousover listner above
  function secretFound(e) {
    //e.target could be replaced with "this" just fyi it's the span which
    //was mousovered
    $(e.target).removeClass('secret').addClass('secretFound');
    //this checks to see if the span mouseoverded is in the array of spans mousovered
    //so, foundAlready becomes true or false
    let foundAlready = secretsFound.includes(e.target)
    //if it wasn't in the array...
    if (foundAlready == false) {
      //play dopamine trigger
      point.play();
      //push the span into the array, so it wont trigger a point next time
      secretsFound.push(e.target);
      //increase point counter
      numSecretsFound++;
      //remove the points counted, from the starting amount
      let secretsRemaining = numSecrets - numSecretsFound;
      //refresh the counter for the player
      $('#score').text(`Secrets Remaining: ${secretsRemaining}`);
      //if the number of points, matches the number of spans, run the gamewon function
      if (numSecretsFound >= numSecrets) {
        gameWon();
      }
    }
  }

  //called at whatever interval is set by REDACT_INTERVAL
  //takes a span (which is passed as an index and an element)
  function updateSpan(index, element) {
    //generate random number between 1 & 0
    let randNum = Math.random();
    //if greater than .2 (or better than a 20% chance)
    if (randNum < ODDS) {
      //play anxiety blip
      blip.play();
      //change it's class to revealed, making the offensive text visible
      $(element).removeClass('redacted').addClass('revealed');
    }
    //if there are no more redacted objs left, call game over
    if ($(".redacted").length === 0) {
      gameOver();
    }
  }


  //triggered when user finds all the spans
  function gameWon() {
    //turn off the redactifier
    clearInterval(redactTimer);
    //hide the main game screen
    $("#textWrapper").css("visibility", "hidden");
    //since we hid everythig on the main game screen, bring back the spans
    //player was searching for
    $(".secretFound").css("visibility", "visible");
    //change score counter to a happy message
    $("#score").text("CONGRATULATIONS");
    //and make it visible
    $("#score").css("visibility", "visible");
  }

  // called when all redacted spans are revealed
  function gameOver() {
    //switch off the timer
    clearInterval(redactTimer);
    //play classic price is right losing sound
    uLose.play();
    //hide main game screen
    $("#textWrapper").css("visibility", "hidden");
    //show game over screen
    $("#gameOver").css("visibility", "visible");
    //set listner for play again button
    $("#playAgain").on("click", gameTrigger);
    //display message prompting for another chance, including varibale holding countdown timer
    $("#gameOverMessage").text(`Ok, you can have another chance if you click again in ${countdown} seconds`);
    //start timer counting down
    countdownTimer = setInterval(() => {
      //reduce countdown by 1
      countdown--;
      //if the countdown is less than 2, change "seconds" to "second" (for grammerzz sake)
      if (countdown < 2) {
        $("#gameOverMessage").text(`Ok, you can have another chance if you click again in ${countdown} second`);
        //if it's less than 1 second
        if (countdown < 1) {
          //switch off countdown
          clearInterval(countdownTimer);
          //replace text with farewell message
          $('#gameOver').text("goodbye...")
          //and set a timer to hide everything shortly after
          setTimeout(() => {
            $("#gameOver").css("visibility", "hidden");
          }, 1500);
        }
        //if there is still a decent bit of time left,
      } else {
        //continue the countdown message with new time inserted
        $("#gameOverMessage").text(`Ok, you can have another chance if you click again in ${countdown} seconds`);
      }
    }, 1000)
  }
})


//goodnight
