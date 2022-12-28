import "@fortawesome/fontawesome-free/css/all.css";
var cel = document.getElementById("flowchart");
var controls = element(document.getElementsByClassName("controls")[0]);
import Collapsible from "@/components/collapsible";
function compositionControls()
{
    controls.element.innerHTML = "";
    const data = 
    <div>
        <Collapsible title="Title">
            Content
        </Collapsible>
    </div>
    data.parent(controls);

}


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
    },compositionControls)

const b =node(
{
    name:"Double lettering",
    input:[],
    output:["media"],
    x:10,
    y:300,
})
const c =node(
    {
        name:"Copy",
        input:["media"],
        output:["media"],
        x:210,
        y:300,
    })


const f = node(
    {
        name:"Overlay",
        input:["background","_overlays"],
        output:["media"],
        x:510,
        y:150,
    })

const g = node(
        {
            name:"Scene",
            input:["media"],
            output:[],
    
            x:710,
            y:180,
        })

connect(a,"media",f,"background")
connect(b,"media",c,"media")
connect(c,"media",f,"overlays")
connect(f,"media",g,"media")
a.select()

// node2.set({x:400})

// connect(node1,"media",node2,"a")
