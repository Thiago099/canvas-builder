var cel = document.getElementById("flowchart");


import { canvas,surface, fillerSurface } from "./canvas-builder/canvas-builder";


function makeDraggable(surface)
{
  var x = surface.x;
  var y = surface.y;
  var w = surface.w;
  var h = surface.h;
  var dx;
  var dy;
  function drag(e)
  {
    x = e.offsetX - dx;
    y = e.offsetY - dy;
    surface.position(x,y);
    surface.update()
  }
  document.addEventListener("mousedown", function(e) {
    if(e.offsetX < x || e.offsetX > x + w || e.offsetY < y || e.offsetY > y + h) return
    dx = e.offsetX - x;
    dy = e.offsetY - y;
    document.addEventListener("mousemove", drag);
    function dragend(e) {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", dragend);
    }
    document.addEventListener("mouseup", dragend);
  });
}
var myc = canvas(cel);


function node(node, text)
{
  node.style(
  function(ctx,w,h)
  {
    ctx.fillStyle = "#0077cc";
    ctx.beginPath();
    ctx.roundRect(0,0,w,h,5);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    // text box
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, w/2, h/2);

    connection.update();
  })
  makeDraggable(node1)
}


var connection = fillerSurface(myc)
.style(function(ctx,w,h)
{
  ctx.beginPath();
  ctx.moveTo(node1.x+node1.w/2,node1.y+node1.h/2);
  ctx.lineTo(node2.x+node2.w/2,node2.y+node2.h/2);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.stroke();
})

var node1 = surface()
.parent(myc)
.position(25,25)
.size(100,50)

var node2 = surface()
.parent(myc)
.position(125+30,25)
.size(100,50)

node(node1,"Node 1")
node(node2,"Node 2")

makeDraggable(node2);

myc.update();
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