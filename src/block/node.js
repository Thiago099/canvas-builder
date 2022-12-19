import { canvas, surface, filler_surface,dummy } from "@/canvas-builder/canvas-builder";
import connection from './connection'
export default function node(canvas,makeInteractive,old)
{
    var result = surface()
    result.data = {}
    result.data.children = []
    set()
    makeInteractive(result)
    function set(updated)
    {
        old = Object.assign(old,updated)
        const {input,output,x,y,name} = old
        const height = (Math.max(input.length,output.length) * 50)+30 ;
        const width = 180

    
    
        const padding_input = height/(input.length+1);
        result.data.name = name
        result.points = []
        for(var i = 0;i<input.length;i++)
        {
            result.points.push(
                {
                    x:10,
                    y:i*padding_input+padding_input+15,
                    type:"input",
                    name: input[i]
                })
        }
        
        const padding_output = height/(output.length+1); ;
        for(var i = 0;i<output.length;i++)
        {
            result.points.push(
                {
                    x:width-10,
                    y:i*padding_output+padding_output+15,
                    type:"output",
                    name: output[i]
                })
        }
    
        result
        .z_index(1)
        .style(({ctx,w,h}) =>
        {
            result.size(w,height)
    
            ctx.fillStyle = "#0077cc";
            ctx.beginPath();
            ctx.roundRect(10,0,w-20,height,5);
            ctx.fill();
    
    
            ctx.textBaseline = "middle";
            ctx.font = "15px Arial";
    
    
            for(const point of result.points)
            {
                ctx.beginPath();
                ctx.fillStyle = "#00ff00";
                ctx.arc(point.x,point.y,10,0,2*Math.PI);
                ctx.fill();
                ctx.fillStyle = "#ffffff";
                if(point.type=="input")
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

    
        result
        .parent(canvas)
        .position(x,y)
        .size(width,height)

        result.update()
    }

    function connect(source_item,target,target_item)
    {
        const source_point = result.points.find(point => point.name == source_item)
        const target_point = target.surface.points.find(point => point.name == target_item)

        if(source_point.type == target_point.type) return

        if(source_point.type == "output")
        {
            const source_dummy = dummy().position(()=>target.surface.x+target_point.x,()=>target.surface.y+target_point.y).size(0,0).hook("target",target.surface)
            const target_dummy = dummy().position(()=>result.x+source_point.x,()=>result.y+source_point.y).size(0,0).hook("source",result)
            result.data.children.push({
                output:target_point.name,
                input:source_point.name,
                target:target.data
            })
            connection(canvas,source_dummy,target_dummy)
        }
        else
        {
            const source_dummy = dummy().position(()=>result.x+source_point.x,()=>result.y+source_point.y).size(0,0).hook("target",result)
            const target_dummy = dummy().position(()=>target.surface.x+target_point.x,()=>target.surface.y+target_point.y).size(0,0).hook("source",target.surface)
            result.data.children.push({
                output:source_point.name,
                input:target_point.name,
                target:target.data
            })
            connection(canvas,source_dummy,target_dummy)
        }
    }

    return {
        set,
        connect,
        get data(){return result.data},
        get surface(){return result}
    }
}