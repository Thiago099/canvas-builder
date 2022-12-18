import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
export default function node(canvas,makeInteractive,{inbound,outbound},{x,y},text)
{
    const height = (Math.max(inbound.length,outbound.length) * 50)+30 ;
    const width = 180
    var result = surface()


    const padding_inbound = height/(inbound.length+1);
    result.data = {}
    result.data.points = []
    for(var i = 0;i<inbound.length;i++)
    {
        result.data.points.push(
            {
                x:10,
                y:i*padding_inbound+padding_inbound+15,
                inbound:true,
                text: inbound[i]
            })
    }
    
    const padding_outbound = height/(outbound.length+1); ;
    result.data.outbound_points = []
    for(var i = 0;i<outbound.length;i++)
    {
        result.data.points.push(
            {
                x:width-10,
                y:i*padding_outbound+padding_outbound+15,
                inbound:false,
                text: outbound[i]
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


        for(const point of result.data.points)
        {
            ctx.beginPath();
            ctx.fillStyle = "#00ff00";
            ctx.arc(point.x,point.y,10,0,2*Math.PI);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            if(point.inbound)
            {
                ctx.textAlign = "start";
                ctx.fillText(point.text, point.x+15,point.y);
            }
            else
            {
                ctx.textAlign = "end";
                ctx.fillText(point.text, point.x-15,point.y);
            }
        }
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(text, w/2, 25);


    })
    makeInteractive(result)

    result
    .parent(canvas)
    .position(x,y)
    .size(width,height)


    return result;
}