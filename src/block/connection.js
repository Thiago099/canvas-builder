import { canvas, surface, filler_surface,dummy } from "@/canvas-builder/canvas-builder";
export default function connection(canvas,source,target)
    {
    var connection = filler_surface(canvas)

    connection
    .z_index(0)
    .style(function({ctx,w,h},{source,target})
    {

        const [p1,p2] = [
        {x:source.x-10, y:source.y},
        {x:target.x+10, y:target.y},
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
export function useConnect(canvas)
{
    return function(source, source_item,target,target_item)
    {
        const source_point = source.surface.points.find(point => point.name == source_item)
        const target_point = target.surface.points.find(point => point.name == target_item)
    
        var source_dummy, target_dummy
        if(source_point.type == target_point.type) return
    
        if(source_point.type == "output")
        {
            source_dummy = dummy().position(()=>target.surface.x+target_point.x,()=>target.surface.y+target_point.y).hook("target",target.surface)
            target_dummy = dummy().position(()=>source.surface.x+source_point.x,()=>source.surface.y+source_point.y).hook("source",source.surface)
            source.surface.data.children.push({
                output:target_point.name,
                input:source_point.name,
                target:target.data
            })
            connection(canvas,source_dummy,target_dummy)
        }
        else
        {
            source_dummy = dummy().position(()=>source.surface.x+source_point.x,()=>source.surface.y+source_point.y).hook("target",source.surface)
            target_dummy = dummy().position(()=>target.surface.x+target_point.x,()=>target.surface.y+target_point.y).hook("source",target.surface)
            result.data.children.push({
                output:source_point.name,
                input:target_point.name,
                target:target.data
            })
            connection(canvas,source_dummy,target_dummy)
        }
        source_dummy.update()
    }
}