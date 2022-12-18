var cel = document.getElementById("flowchart");


import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
import useBlock from "@/canvas-builder/block/block";

var myc = canvas(cel);
const node = useBlock(myc)

const node1 = node({inbound:3,outbound:3},{x:10,y:10}, "Node 1")
const node2 = node({inbound:3,outbound:1},{x:200,y:10},"Node 2")

myc.update();
