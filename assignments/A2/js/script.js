

//monitor image
//https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5edbefd0-ccdf-4b32-bc21-fe7720ed807d/d4u1b58-de6f0418-b40b-4dd9-9192-2d3652a24d74.png/v1/fill/w_600,h_613,q_75,strp/crt_monitor_stock__png__by_halfingr-d4u1b58.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZWRiZWZkMC1jY2RmLTRiMzItYmMyMS1mZTc3MjBlZDgwN2QvZDR1MWI1OC1kZTZmMDQxOC1iNDBiLTRkZDktOTE5Mi0yZDM2NTJhMjRkNzQucG5nIiwid2lkdGgiOiI8PTYwMCIsImhlaWdodCI6Ijw9NjEzIn1dXX0.BDNNpL2TaaNmpp-oB2PG5_97DJ1Kpg4TZsftmsskMrI
//~~~~~~~~~~put javaScript here~~~~~~~~~~~

let interval;
"use strict";
$(document).ready(()=>{
  console.log("Using jquery V-3.4.1 https://code.jquery.com/jquery-3.4.1.min.js");
    interval = setInterval(update, 1000);
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
  //clearInterval(interval);
}



function spanClicked(e){
  console.log(e);
  $(e.target).removeClass('revealed').addClass('redacted');
}
