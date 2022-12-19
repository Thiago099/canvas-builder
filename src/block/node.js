import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
export default function node(canvas,makeInteractive,old)
{
    var result = surface()
    set()
    makeInteractive(result)
    function set(updated)
    {
        const {input,output,x,y,name} = Object.assign(old,updated)
        const height = (Math.max(input.length,output.length) * 50)+30 ;
        const width = 180

    
    
        const padding_input = height/(input.length+1);
        result.data = {name:name}
        result.points = []
        result.data.children = []
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
                    input:"output",
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

    return {
        set,
        get data(){return result.data}
    }
}