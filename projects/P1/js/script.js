//~~~~~~~~~~put javaScript here~~~~~~~~~~~
  let keyLayout = ["1","2","3","4","5","6","7","8","9","0","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];

$(document).ready(function(){
  console.log(`Using:
    JQuery-3.4.1: https://code.jquery.com/jquery-3.4.1.min.js,
    JQueryUi-1.12.1: https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
    Curious? drop me a line: asaperlman@gmail.com`);
    for (let i = 0; i < 36; i++){
      $("#keyboardWrapper").append(`<div id = "k${i}" class = "key"></div>`);
      $(`#k${i}`).text(keyLayout[i]);
    }

})
