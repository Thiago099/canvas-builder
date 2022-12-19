var cel = document.getElementById("flowchart");


import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
import useBlock from "@/block/block";

var myCanvas = canvas(cel);
const {node,connect} = useBlock(myCanvas)

const node1 = node(
    {
        name:"Node 1",
        input:["color","alpha"],
        output:["test"],
        
        x:100,
        y:10,
        
    })
const node2 = node(
    {
        name:"Node 2",
        input:["a","b","c"],
        output:["d"],

        x:250,
        y:100,
    })

node2.set({x:400})

connect(node1,"test",node2,"a")


console.log(node1.data)

