var cel = document.getElementById("flowchart");


import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
import useBlock from "@/canvas-builder/block/block";

var myCanvas = canvas(cel);
const node = useBlock(myCanvas)

const node1 = node({input:["color","alpha"],output:["test"],x:100,y:10,name:"Node 1"})
const node2 = node({input:["a","b","c"],output:["d"],x:250,y:100,name:"Node 2"})

node2.set({x:400})


console.log(node1.data)

myCanvas.update();
