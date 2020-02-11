//~~~~~~~~~~put javaScript here~~~~~~~~~~~

$(document).ready(newRound);

let options = [];
let correctAnswer = "";
const NUM_OPTIONS = 5;

function setup(){
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

function newRound(){
  correctAnswer = "";
  options = [];
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let label = animals[Math.floor(Math.random()*animals.length)];
    options.push(label);
    addButton(label);
  }
  correctAnswer = options[Math.floor(Math.random() * options.length)];
  console.log(correctAnswer);
  let backwardsAnswer = correctAnswer.split('').reverse().join('');
  responsiveVoice.speak(backwardsAnswer);
  $("#main").append(`
    <div id="playAgain" class = "guess" >LISTEN CAREFULLY</div>
    `)
    let $playAgain = $("#playAgain");

    $playAgain.on("click", ()=>{
      responsiveVoice.speak(backwardsAnswer);
    }
  )
}


function addButton(label){
  let $newDiv = $('<div></div>');
  $newDiv.addClass('guess');
  $newDiv.text(label);
  $newDiv.button();
  $newDiv.appendTo("#main");
  $newDiv.on("click", checkGuess);
}
