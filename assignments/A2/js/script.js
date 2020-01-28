//~~~~~~~~~~put javaScript here~~~~~~~~~~~
let interval;
"use strict";
$(document).ready(()=>{
  console.log("Using jquery V-3.4.1 https://code.jquery.com/jquery-3.4.1.min.js");
    interval = setInterval(update, 500);
    $('span').on('click', spanClicked);
})

function update(){
  $('span').each(updateSpan);
}

function updateSpan(index, element){
  let randNum = Math.random();
  if(randNum < 0.1){
    $(element).removeClass('redacted').addClass('revealed');
  }
  clearInterval(interval);
}



function spanClicked(e){
  console.log(e);
  $(e.target).removeClass('revealed').addClass('redacted');
}
