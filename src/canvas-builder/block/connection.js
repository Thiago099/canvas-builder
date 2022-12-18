import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
export default function connection(canvas,source,target)
    {
    var connection = filler_surface(canvas)

    connection
    .z_index(0)
    .style(function({ctx,w,h},{source,target})
    {

        const [p1,p2] = [
        {x:source.x-10+source.w, y:source.y+source.h/2},
        {x:target.x+10, y:target.y+target.h/2},
        ]

        const [n1,n2,n3,n4] = [
        {
            x:p1.x,
            y:p1.y
        },
        {
            x:p2.x,
            y:p1.y 
        },
        {
            x:p1.x,
            y:p2.y 
        },
        {
            x:p2.x,
            y:p2.y
        },
        ]



        ctx.beginPath();
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.bezierCurveTo(n2.x, n2.y, n3.x, n3.y, n4.x, n4.y);
        ctx.stroke();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke();

    })
    .hook("source",source)
    .hook("target",target)

    return connection;
    }