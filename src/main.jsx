import "@fortawesome/fontawesome-free/css/all.css";
var cel = document.getElementById("flowchart");
var controls = element(document.getElementsByClassName("controls")[0]);
import Collapsible from "@/components/collapsible";
function selectNothing()
{
    controls.element.innerHTML = "";
}
function cleanNode(name)
{
    controls.element.innerHTML = "";
    const data = 
    <div>
        <Collapsible title="Basic">
            <div class="row">
                <div class="input-container">
                    <label>Name</label>
                    <input class="input" type="text" value={name} />
                </div>
            </div>
        </Collapsible>
    </div>
    data.parent(controls);
}
function compositionControls(name)
{
    controls.element.innerHTML = "";
    const data = 
    <div>
        <Collapsible title="Basic">
            <div class="row">
                <div class="input-container">
                    <label>Name</label>
                    <input class="input" type="text" value={name} />
                </div>
            </div>
        </Collapsible>
        <Collapsible title="Texts">
            <div class="row">
                <div class="input-container">
                    <label>Text 1</label>
                    <input class="input" type="text" value="$text1" />
                </div>
                <div class="input-container">
                    <label>Text 2</label>
                    <input class="input" type="text" value="$text2" />
                </div>
            </div>
        </Collapsible>
        <Collapsible title="Media">
            <div class="row">
                <div class="input-container">
                    <label>Default background audio</label>
                    <input class="input" type="text" value="audio.mp3" />
                </div>
                <div class="input-container">
                    <label>User media</label>
                    <input class="input" type="text" value="$media1" />
                </div>
            </div>
        </Collapsible>
    </div>
    data.parent(controls);
}

function copyControls(name)
{
    controls.element.innerHTML = "";
    const data = 
    <div>
        <Collapsible title="Basic">
            <div class="row">
                <div class="input-container">
                    <label>Name</label>
                    <input class="input" type="text" value={name} />
                </div>
            </div>
        </Collapsible>
        <Collapsible title="Properties">
            <div class="row">
                <div class="input-container">
                    <label>Accessor</label>
                    <input class="input" type="text" value="$double_lettering" />
                </div>
            </div>
        </Collapsible>
    </div>
    data.parent(controls);
}


import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
import useBlock from "@/block/block";

var myCanvas = canvas(cel);
const {node,connect} = useBlock(myCanvas,selectNothing)

const a = node(
    {
        name:"Main",
        input:[],
        output:["media"],
        x:10,
        y:100,
    },()=>compositionControls("Main"))

const b =node(
{
    name:"Double lettering",
    input:[],
    output:["media"],
    x:10,
    y:300,
},()=>compositionControls("Double lettering"))
const c =node(
    {
        name:"Copy",
        input:["media"],
        output:["media"],
        x:210,
        y:300,
    },()=>copyControls("Copy"))


const f = node(
    {
        name:"Overlay",
        input:["background","_overlays"],
        output:["media"],
        x:510,
        y:150,
    },()=>cleanNode("Overlay"))

const g = node(
        {
            name:"Scene",
            input:["media"],
            output:[],
    
            x:710,
            y:180,
        },()=>cleanNode("Scene"))

connect(a,"media",f,"background")
connect(b,"media",c,"media")
connect(c,"media",f,"overlays")
connect(f,"media",g,"media")
a.select()

// node2.set({x:400})

// connect(node1,"media",node2,"a")
