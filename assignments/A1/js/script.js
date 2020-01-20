"use strict";
//wait for the window object to load before doing anything
window.onload = () => {

  //~~~~~~~~$()~~~~~~~~~
  //
  //returns an element on the pagee, according to the id it was fed
  //this means that: $("someId") can be used in place of the whole string
  function $(id) {
    return document.getElementById(id);
  }

  //key-values for all the colors available.
  let colors = {
    rainbow : `rgb(${colorPicker()}, ${colorPicker()}, ${colorPicker()})`,
    red : `rgb(255,0,0)`,
    green : `rgb(0,255,0)`,
    blue : 'rgb(0,0,255)'
  };
  let currentColor = 'green';

  //~~~~~colorPicker()~~~~~~~
  //
  //picks a random number between 0 and 255 and returns it.
  function colorPicker() {
    return Math.floor(Math.random() * 255);
  }

  //~~~~~makeCanvas()~~~~~~~
  //
  //mmakes a canvas out of a bunch of div "pixels".
  function makeCanvas() {
    let canvas = $("canvas");
    canvas.draggable = false;
    console.log("hello" + canvas.offsetWidth);
    //classic for loop up to 1000
    for (let i = 0; i < 10000; i++) {
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
          setColor(pixel, colors[currentColor]);
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

  //~~~~~~setColor()~~~~~~
  //
  //sets the color of the pixel it was passed
  function setColor(pixel, color) {
    pixel.style.background = color;
  }

  //sets the fade time of the pixel it was passed
  function setFade(pixel) {
    setTimeout(() => {
      pixel.style.background = "rgb(255,255,255)"
    }, 500);
  }

  // lets make a canvas!
  makeCanvas();

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
