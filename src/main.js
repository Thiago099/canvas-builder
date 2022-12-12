var cel = document.getElementById("flowchart");


import { canvas,surface } from "./canvas-builder/canvas-builder";



var myc = canvas(cel);

var myel = surface()
.parent(myc)
.position(25,25)
.size(100,50)
.style(function(ctx,w,h){
  ctx.fillStyle = "#0077cc";
  ctx.beginPath();
  ctx.roundRect(0,0,w,h,5);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Arial";
  // text box
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Node 1", w/2, h/2);
})
.makeDraggable();

myel.update();
/*
var x = 25;
var y = 25;



var dx;
var dy;

function drag(e)
{
  x = e.clientX - dx;
  y = e.clientY - dy;
  update()
}

document.addEventListener("mousedown", function(e) {
  dx = e.clientX - x;
  dy = e.clientY - y;
  document.addEventListener("mousemove", drag);
  function dragend(e) {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", dragend);
  }
  document.addEventListener("mouseup", dragend);
});

update()
function update()
{
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // // draw a rectangle to represent the first step in the flowchart
  // ctx.fillStyle = "#0077cc";
  // ctx.beginPath();
  // ctx.roundRect(x, y, 150, 100,5);
  // ctx.fill();
  // // add text to the rectangle
  // ctx.font = "18px sans-serif";
  // ctx.fillStyle = "white";
  // ctx.textAlign = "center";
  // ctx.textBaseline = "middle";
  // ctx.fillText("Step 1", x+100-25, y+75-25);
  
  // // draw an arrow to the next step
  // ctx.beginPath();
  // ctx.moveTo(175, 75);
  // ctx.lineTo(275, 75);
  // ctx.strokeStyle = "white";
  // ctx.lineWidth = 5;
  // ctx.stroke();
  
  // // draw a circle to represent the second step in the flowchart
  // ctx.beginPath();
  // ctx.arc(325, 75, 50, 0, 2 * Math.PI);
  // ctx.fillStyle = "#0077cc";
  // ctx.fill();
  
  // // add text to the circle
  // ctx.font = "18px sans-serif";
  // ctx.fillStyle = "white";
  // ctx.textAlign = "center";
  // ctx.textBaseline = "middle";
  // ctx.fillText("Step 2", 325, 75);
}

*/