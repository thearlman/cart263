"use strict";

//~~~~~~~~$()~~~~~~~~~
//
//returns an element on the pagee, according to the id it was fed
//this means that: $("someId") can be used in place of the whole string
function $(id) {
  return document.getElementById(id);
}

//current rotation
let rotation = 0;

//key-values for all the colors available.
let colors = {
  rainbow: ()=>{
    return `rgb(${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)})`;
    },
  red: ()=>{return `rgb(255, 0, 0)`},
  green: ()=>{return `rgb(0, 255, 0)`},
  blue: ()=>{return 'rgb(0, 0, 255)'},
  black: ()=>{return 'rgb(0, 0, 0)'},
  brown: ()=>{return 'rgb(150, 75, 0)'},
  pink: ()=>{return 'rgba(255, 0, 144)'},
  eraser: ()=>{return 'rgb(255, 255, 255)'}
};

//the current color user is painting with
let currentColor = colors['black'];

//~~~~~colorPicker()~~~~~~~
//
//picks a random number between 0 and 255 and returns it.
function randomColorPicker() {
  return `rgb(${Math.floor(Math.random() * 255)},
  ${Math.floor(Math.random() * 255)},
  ${Math.floor(Math.random() * 255)})`;
}

//wait for the window object to load before creating canvas
window.onload = () => {

  //~~~~~makeCanvas()~~~~~~~
  //
  //mmakes a canvas out of a bunch of div "pixels".
  function makeCanvas() {
    let canvas = $("canvas");
    canvas.draggable = false;
    //classic for loop up to 1000
    for (let i = 0; i < 2500; i++) {
      //create a div and call it "pixel"
      let pixel = document.createElement("div");
      //give it a class
      pixel.setAttribute("class", "pixel");
      //append it to the body
      canvas.appendChild(pixel);
    }

    //when user is holding mouse inside of the canvas iterate through all
    //of the pixels and set a handler to change their color
    canvas.onmousedown = () => {
      for (let i = 0; i < canvas.childNodes.length; i++) {
        let pixel = canvas.childNodes[i];
        pixel.onmouseover = () => {
        pixel.style.background = currentColor();
        }
      }
    }

    //when user releases the mouse, remove the event handler
    canvas.onmouseup = () => {
      for (let i = 0; i < canvas.childNodes.length; i++) {
        let pixel = canvas.childNodes[i];
        pixel.onmouseover = null;
      }
    }
  }

  // lets make a canvas!
  makeCanvas();
  //create an eventlistener to check for key press events
  document.addEventListener("keyup", keyHandler);
  //hande the key press events
  function keyHandler(keyEvent) {
    if (keyEvent.key === "ArrowLeft") {
      rotation -= 10;

    } else if (keyEvent.key === "ArrowRight") {
      rotation += 10;

    }
    for (let i = 0; i < $("canvas").childNodes.length; i++) {
      $("canvas").childNodes[i].style.transform = `rotate(${rotation}deg)`;
    }
  }
}
function printPic(){
  let content = $("canvasWrapper").innerHTML;
  let printWindow = window.open('','my pic {:-)','width=500, height=500');
  printWindow.document.write(`
    <link rel="stylesheet" type="text/css" href="css/style.css">`
    +content+`<button onclick='window.print()'>PRINT</button>`);
  }

//~~~~~~~~~~~~reset()~~~~~~~~~~~~//
//
// reset the canvas to white
function reset() {
  for (let i = 0; i < $("canvas").childNodes.length; i++) {
    $("canvas").childNodes[i].style.background = colors["eraser"]();
  }
}




//~~~~~~~~~~~~~~~~~~~#****BONUS*****#~~~~~~~~~~~~~~~~~//
// This is a more compact version of the starter code.
// Unfortunately, it is a bit hard to read
//
//~~~~~~~~~~~doEverythingAtOnce()~~~~~~~~~~~~~
//does everything in one go in a nested confusing way
//
// window.onload = ()=>{
//   let colPick = ()=>{return Math.floor(Math.random()*255);}
//   for (let i = 0; i < 1000; i++){
//     let pixel = document.createElement("div");
//     pixel.setAttribute("class", "pixel");
//     document.body.appendChild(pixel);
//     pixel.onmouseover = ()=>{
//       pixel.style.background = `rgb(${colPick()},${colPick()},${colPick()})`;
//       setTimeout(()=>{
//         pixel.style.background = "black";
//       }, 500);
//     }
//   }
// }
