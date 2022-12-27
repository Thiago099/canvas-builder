var cel = document.getElementById("flowchart");


import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
import useBlock from "@/block/block";

var myCanvas = canvas(cel);
const {node,connect} = useBlock(myCanvas)

const a = node(
    {
        name:"Main",
        input:[],
        output:["media"],
        x:10,
        y:100,
    })

const b =node(
{
    name:"Double lettering",
    input:[],
    output:["media"],
    x:10,
    y:300,
})


const c = node(
    {
        name:"Copy",
        input:["media"],
        output:["media"],
        x:210,
        y:300,
    })



const e =  node(
        {
            name:"Edit",
            input:["media"],
            output:["media"],
            x:410,
            y:300,
        })


const f = node(
    {
        name:"Overlay",
        input:["background","_overlays"],
        output:["media"],
        x:810,
        y:150,
    })

const g = node(
        {
            name:"Scene",
            input:["media"],
            output:[],
    
            x:1010,
            y:180,
        })

connect(a,"media",f,"background")
connect(b,"media",c,"media")
connect(c,"media",e,"media")

connect(e,"media",f,"overlays")
connect(f,"media",g,"media")
// node1.select()

// node2.set({x:400})

// connect(node1,"media",node2,"a")
