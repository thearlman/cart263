//~~~~~~~~~~put javaScript here~~~~~~~~~~~

$(document).ready(()=>{
  $("#welcomeButton").on("click", gameTrigger);
});

let options = [];
let correctAnswer = "";
const NUM_OPTIONS = 5;

let commands = {
  "i give up" : function(){
    newRound();
  }
}


function gameTrigger() {
  $("#welcome").remove();
  newRound();
}

function checkGuess(){
  if ($(this).text() === correctAnswer){
    for (let i = $("#main").children().length - 1; i >= 0; i--) {
      $("#main").children()[i].remove();
    }
    newRound();
  } else {
    $(this).effect("shake");
  }
}


annyang.addCallback('resultNoMatch', function(userSaid){
  console.log("The user said: "+userSaid);
})


function newRound(){
  correctAnswer = "";
  options = [];
  for (let i = $("#guesses").children().length - 1; i >= 0; i--) {
    $("#guesses").children()[i].remove();
  }
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let label = animals[Math.floor(Math.random()*animals.length)];
    options.push(label);
    addButton(label);
  }
  correctAnswer = options[Math.floor(Math.random() * options.length)];
  console.log(correctAnswer);
  let backwardsAnswer = correctAnswer.split('').reverse().join('');
  responsiveVoice.speak(backwardsAnswer);

  commands = {
    "i give up" : function(){
      newRound();
    },
    "Play it again sam..." : function(){
      responsivevoice.speak(backwardsAnswer);
    },

      '(correctAnswer)' : function(){
        $("#guesses").html(`<iframe id = "rewardPic" src="https://www.everypixel.com/search?q=${correctAnswer}&meaning=&stocks_type=free&media_type=0&page=1"></iframe>`);
        setTimeout(newRound, 5000);
      console.log("correct");
    }
  }
  annyang.addCommands(commands);
  annyang.start({continuous:true});
}


function addButton(label){
  let $newDiv = $('<div></div>');
  $newDiv.addClass('guess');
  $newDiv.text(label);
  $newDiv.button();
  $newDiv.appendTo("#guesses");
  $newDiv.on("click", checkGuess);
}
