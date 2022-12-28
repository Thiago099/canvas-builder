
import useMakeInteractive from './make-interactive'
import { canvas, surface, filler_surface,dummy } from "@/canvas-builder/canvas-builder";
import connection from './connection'

export function useNode(canvas,connect)
{
    const makeInteractive = useMakeInteractive(canvas,connect)
    var nodes = []
    function deselect()
    {
        for(const node of nodes)
        {
            node.surface.selected = false
            node.surface.update()
        }
    }
    return function (old, onSelect)
    {
        var surf = surface()
        surf.data = {}
        surf.data.children = []
        const result = {
            set,
            select : () => {
                deselect();
                surf.selected = true;
                surf.update()
                if(onSelect)onSelect()
            },
            get data(){return surf.data},
            get surface(){return surf}
        }
        nodes.push(result)
        set()
        makeInteractive(result,onSelect)
        function set(updated)
        {
            old = Object.assign(old,updated)
            const {input,output,x,y,name} = old
            const height = (Math.max(input.length,output.length) * 50)+30 ;
            const width = 180

        
        
            const padding_input = height/(input.length+1);
            surf.data.name = name
            surf.points = []
            for(var i = 0;i<input.length;i++)
            {
                if(input[i][0] == "_")
                {
                    surf.points.push(
                        {
                            x:10,
                            y:i*padding_input+padding_input+15,
                            type:"multi-input",
                            name: input[i].slice(1),
                            hidden:true
                        })   
                }
                else
                {
                    surf.points.push(
                        {
                            x:10,
                            y:i*padding_input+padding_input+15,
                            type:"input",
                            name: input[i]
                        })
                }
            }
            
            const padding_output = height/(output.length+1); ;
            for(var i = 0;i<output.length;i++)
            {
                surf.points.push(
                    {
                        x:width-10,
                        y:i*padding_output+padding_output+15,
                        type:"output",
                        name: output[i]
                    })
            }
        
            surf
            .z_index(1)
            .style(({ctx,w,h}) =>
            {
                surf.size(w,height)
        
                ctx.fillStyle = "#0077cc";
                ctx.beginPath();
                ctx.roundRect(10,0,w-20,height,5);
                ctx.fill();
                //stroke color

                if(surf.selected)
                {

                    ctx.strokeStyle = "#f0f";
                    ctx.lineWidth = 4;
                    //inset stroke
                    ctx.beginPath();
                    ctx.roundRect(10+2,0+2,w-20-4,height-4,5);
                    ctx.stroke();
                }
        
        
                ctx.textBaseline = "middle";
                ctx.font = "15px Arial";
        
        
                for(const point of surf.points)
                {
                    ctx.beginPath();
                    ctx.fillStyle = "#00ff00";
                    if(point.type=="multi-input")
                    {
                        ctx.ellipse(point.x, point.y, 10, 15, 0, 0, 2 * Math.PI);
                    }
                    else
                    {
                        ctx.arc(point.x,point.y,10,0,2*Math.PI);
                    }
                    ctx.fill();
                    ctx.fillStyle = "#ffffff";
                    if(point.type=="input" || point.type=="multi-input")
                    {
                        ctx.textAlign = "start";
                        ctx.fillText(point.name, point.x+15,point.y);
                    }
                    else
                    {
                        ctx.textAlign = "end";
                        ctx.fillText(point.name, point.x-15,point.y);
                    }
                }
                ctx.font = "20px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "#ffffff";
                ctx.fillText(name, w/2, 25);

        
        
            })

        
            surf
            .parent(canvas)
            .position(x,y)
            .size(width,height)

            surf.update()
        }



        return result
    }
}

