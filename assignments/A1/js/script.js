//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~PIXEL PAINTER PRO~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//For CART263 Winter 2020 Concordia U
//By: Asa Perlman
//Inspiration and starter code by: Pippin Barr
//Printer, Trashcan, and Sword icons by Microsoft(c):
//https://github.com/mRB0/many-windows-3.1-icons-in-png-format
//Rainbow Icon:
//https://www.hastac.org/blogs/fionab/2014/03/17/asa-2014-panel-queer-os
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// A very basic paint program, created in a unique, and (inefficient?) way.
// Choose between 6 colors, or rainbow mode. You can even print your
//creation, or save it as a pdf  0 0
//                                -
//                               \_/
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

"use strict";

//~~~~~~~~$()~~~~~~~~~
//
//returns an element on the pagee, according to the id it was fed
//this means that: [$("someId")] can be used in place of:
// [document.getElementById("someId")]
function $(id) {
  return document.getElementById(id);
}

//~~~~~~ Global Variables~~~~~~~~~~~~~

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
  yellow: ()=>{return 'rgba(255, 255, 0)'},
  eraser: ()=>{return 'rgb(255, 255, 255)'}
};

//the current color user is painting with
let currentColor = colors['black'];

//current rotation value for the pixels
const ROTATE_AMOUNT = 10;
const NUM_PIXELS = 2500;
let CANVAS_STARTING_COLOR = colors["rainbow"];
let rotation = 0;

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
  //PT1: the pixel array
  //mmakes a canvas out of a bunch of div "pixels".
  function makeCanvas() {
    let canvas = $("canvas");
    canvas.draggable = false;
    //classic for loop up to 1000
    for (let i = 0; i < NUM_PIXELS; i++) {
      //create a div and call it "pixel"
      let pixel = document.createElement("div");
      //give it a class
      pixel.setAttribute("class", "pixel");
      //append it to the body
      canvas.appendChild(pixel);
    }

    // iterate throught the welcome message stored in welcomeArray.js
    // and make the corresponding pixels black, displaying the welcom message
    for (let i = 0; i < $("canvas").childNodes.length; i++){
      for (let e = 0; e < welcomeMessage.length; e++){
        if (i === welcomeMessage[e]){
          setTimeout(()=>{
            $("canvas").childNodes[i].style.background = CANVAS_STARTING_COLOR();
          }, 500);
        }
      }
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
  document.addEventListener("keydown", keyHandler);
  //hande the key press events
  function keyHandler(keyEvent) {
    console.log("event!");
    if (keyEvent.key === "ArrowLeft") {
      rotation -= ROTATE_AMOUNT;
    } else if (keyEvent.key === "ArrowRight") {
      rotation += ROTATE_AMOUNT;
    }
    for (let i = 0; i < $("canvas").childNodes.length; i++) {
      $("canvas").childNodes[i].style.transform = `rotate(${rotation}deg)`;
    }
  }
}

//~~~~~~~~~~~printPic()~~~~~~~~~~~~~
//
//offers the user the opportunity to print their masterpiece
function printPic(){
  //package the canvas into a variable
  let content = $("canvasWrapper").innerHTML;
  //open a new window
  let printWindow = window.open('','','width=500, height=500');

  //write the canvas into the window, making sure to link the stylesheet
  //and add a button to print
  printWindow.document.write(`
    <title>My Pic</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    ${content}<button onclick='window.print()'>PRINT</button>`);
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
