var cel = document.getElementById("flowchart");


import { canvas,surface, filler_surface } from "./canvas-builder/canvas-builder";


function makeDraggable(surface)
{
  var dx;
  var dy;
  function drag(e)
  {
    surface.x = e.offsetX - dx;
    surface.y = e.offsetY - dy;
    surface.position(surface.x,surface.y);
    surface.update()
  }
  document.addEventListener("mousedown", function(e) {
    if(e.offsetX < surface.x || e.offsetX > surface.x + surface.w || e.offsetY < surface.y || e.offsetY > surface.y + surface.h) return
    dx = e.offsetX - surface.x;
    dy = e.offsetY - surface.y;
    document.addEventListener("mousemove", drag);
    function dragend(e) {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", dragend);
    }
    document.addEventListener("mouseup", dragend);
  });
}
var myc = canvas(cel);


function node(text)
{
  var result = 
  surface()
  .style(function(ctx,w,h)
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
  makeDraggable(result)
  return result;
}


var connection = filler_surface(myc)
.style(function(ctx,w,h)
{
  ctx.beginPath();
  ctx.moveTo(node1.x+node1.w/2,node1.y+node1.h/2);
  ctx.lineTo(node2.x+node2.w/2,node2.y+node2.h/2);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.stroke();
})

const node1 = node("Node 1")
.parent(myc)
.position(25,25)
.size(100,50)

const node2 = node("Node 2")
.parent(myc)
.position(125+30,25)
.size(100,50)



myc.update();
