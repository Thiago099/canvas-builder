var cel = document.getElementById("flowchart");


import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
import useBlock from "@/canvas-builder/block/block";

var myc = canvas(cel);
const node = useBlock(myc)

const node1 = node({inbound:["color","alpha"],outbound:["test"]},{x:10,y:10}, "Node 1")
const node2 = node({inbound:["a","b","c"],outbound:["d"]},{x:250,y:10},"Node 2")

myc.update();
