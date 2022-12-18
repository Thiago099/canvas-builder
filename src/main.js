var cel = document.getElementById("flowchart");


import { canvas,surface, filler_surface } from "./canvas-builder/canvas-builder";

var can_drag = true;
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
    if(!can_drag) return
    can_drag = false;
    dx = e.offsetX - surface.x;
    dy = e.offsetY - surface.y;
    document.addEventListener("mousemove", drag);
    function dragend(e) {
      can_drag = true;
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", dragend);
    }
    document.addEventListener("mouseup", dragend);
  });
}
var myc = canvas(cel);


function node(canvas,{x,y},text)
{
  var result = 
  surface()
  .z_index(1)
  .style(function({ctx,w,h})
  {

    // circle node
    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.arc(w-10,h/2,10,0,2*Math.PI);
    ctx.fill();

    // circle node
    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.arc(10,h/2,10,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle = "#0077cc";
    ctx.beginPath();
    ctx.roundRect(10,0,w-20,h,5);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    // text box
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, w/2, h/2);


  })
  makeDraggable(result)

  result
  .parent(canvas)
  .position(x,y)
  .size(120,50)
  return result;
}
function connection(canvas,source,target)
{
  var connection = filler_surface(canvas)

  connection
  .z_index(0)
  .style(function({ctx,w,h},{source,target})
  {

    const [p1,p2] = [
      {x:source.x-10+source.w, y:source.y+source.h/2},
      {x:target.x+10, y:target.y+target.h/2},
    ]

    const [n1,n2,n3,n4] = [
      {
        x:p1.x,
        y:p1.y
      },
      {
        x:p2.x,
        y:p1.y 
      },
      {
        x:p1.x,
        y:p2.y 
      },
      {
        x:p2.x,
        y:p2.y
      },
    ]

    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(n1.x, n1.y);
    ctx.bezierCurveTo(n2.x, n2.y, n3.x, n3.y, n4.x, n4.y);
    ctx.stroke();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.stroke();

  })
  .hook("source",source)
  .hook("target",target)
}

const node1 = node(myc,{x:10,y:10}, "Node 1")
const node2 = node(myc,{x:150,y:10},"Node 2")

const connection1 = connection(myc,node1,node2)





myc.update();
