var cel = document.getElementById("flowchart");


import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
import useBlock from "@/block/block";

var myCanvas = canvas(cel);
const {node,connect} = useBlock(myCanvas)

const node1 = node(
    {
        name:"Composition 1",
        input:[],
        output:["media"],
        x:100,
        y:100,
    })

node(
{
    name:"Composition 2",
    input:[],
    output:["media"],
    x:100,
    y:200,
})

node(
    {
        name:"Variable 1",
        input:[],
        output:["data"],
        x:100,
        y:350,
    })
const node2 = node(
    {
        name:"Overlay",
        input:["data","_overlays"],
        output:["data"],

        x:250,
        y:180,
    })

    node(
        {
            name:"Scene",
            input:["data"],
            output:[],
    
            x:600,
            y:180,
        })

    node(
        {
            name:"Output",
            input:["data"],
            output:[],
            x:900,
            y:350,
        })


node1.select()

node2.set({x:400})

// connect(node1,"media",node2,"a")
