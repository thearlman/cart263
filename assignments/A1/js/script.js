"use strict";
window.onload = ()=>{
  let colPick = ()=>{return Math.floor(Math.random()*255);}
  for (let i = 0; i < 1000; i++){
    let pixel = document.createElement("div");
    pixel.setAttribute("class", "pixel");
    document.body.appendChild(pixel);
    pixel.onmouseover = ()=>{
      pixel.style.background = `rgb(${colPick()},${colPick()},${colPick()})`;
      setTimeout(()=>{
        pixel.style.background = "black";
      }, 500);
    }
  }
}
