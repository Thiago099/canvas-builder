import closestPoint from "closest-point-on-bezier";
import { canvas, surface, filler_surface,dummy } from "@/canvas-builder/canvas-builder";
export default function connection(canvas,source,target,destroy = ()=>{})
{
    var connection = filler_surface(canvas)

    document.addEventListener("auxclick", click)

    function click(e)
    {
        if(e.button != 1) return
        const {offsetX,offsetY} = e
        const {relative_position, absolute_point} = closestPoint(
            connection.curve,
            {x:offsetX,y:offsetY}
        )
        if(Math.sqrt(Math.pow(offsetX - absolute_point.x, 2) + Math.pow(offsetY - absolute_point.y, 2)) < 5)
        {
            self_destroy()
        }
    }
    function self_destroy()
    {
        connection.destroy()
        document.removeEventListener("auxclick", click)
        destroy()
    }

    connection
    .z_index(0)
    .style(function({ctx,w,h},{source,target})
    {

        const [p1,p2] = [
        {x:source.x-10, y:source.y},
        {x:target.x+10, y:target.y},
        ]

        connection.curve = [
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

        const [n1,n2,n3,n4] = connection.curve
        
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

    return {connection,destroy:self_destroy};
}
export function useConnect(canvas)
{
    return function(source, source_item,target,target_item)
    {
        const source_point = source.surface.points.find(point => point.name == source_item)
        const target_point = target.surface.points.find(point => point.name == target_item)
    
        var source_dummy, target_dummy
        if(source_point.type == target_point.type) return
        if(source == target) return
        if(source_point.type == "output")
        {
            if(target_point.type == "output") return
            if(source.surface.data.children.find(child => child.input == target_point.name && child.output == source_point.name)) {return}
            source_dummy = dummy()
                .position(target_point.x,target_point.y)
                .parent(target.surface)
                
            target_dummy = dummy()
                .position(source_point.x,source_point.y)
                .parent(source.surface)

            source.surface.data.children.push({
                input:target_point.name,
                output:source_point.name,
                target:target.data
            })
            function destroy()
            {
                source.surface.data.children = source.surface.data.children.filter(child => child.input != target_point.name && child.output != source_point.name)
            }
            connection(canvas,source_dummy,target_dummy,destroy)
        }
        else
        {
            if(target_point.type == "input") return
            if(target.surface.data.children.find(child => child.input == source_point.name && child.output == target_point.name)) {return}
            source_dummy = dummy()
                .position(source_point.x,source_point.y)
                .parent(source.surface)

            target_dummy = dummy()
                .position(target_point.x,target_point.y)
                .parent(target.surface)

            target.surface.data.children.push({
                input:source_point.name,
                output:target_point.name,
                target:target.data
            })
            function destroy()
            {
                target.surface.data.children = target.surface.data.children.filter(child => child.input != source_point.name && child.output != target_point.name)
            }
            connection(canvas,source_dummy,target_dummy, destroy)
        }
        source_dummy.update()
    }
}









