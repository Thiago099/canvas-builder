import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
export default function node(canvas,makeInteractive,{inbound,outbound},{x,y},text)
{
    const height = (Math.max(inbound,outbound) * 50)+30 ;
    const width = 150
    var result = surface()


    const padding_inbound = height/(inbound+1);
    result.data = {}
    result.data.points = []
    for(var i = 0;i<inbound;i++)
    {
        result.data.points.push({x:10,y:i*padding_inbound+padding_inbound+15})
    }
    
    const padding_outbound = height/(outbound+1); ;
    result.data.outbound_points = []
    for(var i = 0;i<outbound;i++)
    {
        result.data.points.push({x:width-10,y:i*padding_outbound+padding_outbound+15})
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

        for(const point of result.data.points)
        {
            ctx.beginPath();
            ctx.fillStyle = "#00ff00";
            ctx.arc(point.x,point.y,10,0,2*Math.PI);
            ctx.fill();
        }

        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        // text box
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, w/2, 25);


    })
    makeInteractive(result)

    result
    .parent(canvas)
    .position(x,y)
    .size(width,height)


    return result;
}