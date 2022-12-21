import { canvas, surface, filler_surface,dummy } from "@/canvas-builder/canvas-builder";
import connection from './connection'
export default function useMakeInteractive(canvas)
{
    var can_drag = true;
    var dragElement = null;



    function connectStart(mySurface,e,mouse)
    {
        if(mySurface.data)
        {
        for(const point of mySurface.points)
        {
            if(mySurface.hover_circle(e,point,10))
            {
                const source = dummy()
                    .position(mouse.x,mouse.y)

                const target = dummy()
                    .position(point.x,point.y)
                    .parent(mySurface)
                    
                const con = connection(canvas,source,target)
                const mouseMove = e =>{
                    const pm = {x:e.offsetX,y:e.offsetY}
                    source.position(pm.x,pm.y)
                    source.update()
                }
                const mouseUp = e =>{
                    source.destroy()
                    con.destroy()
                    document.removeEventListener("mousemove", mouseMove);
                    document.removeEventListener("mouseup", mouseUp);
                }

                dragElement = {
                    target,
                    other:mySurface,
                    name:point.name,
                    type:point.type
                };
                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp)

                return true
            }
        }
        }
        return false
    }

    function connectEnd(mySurface,e,mouse)
    {
        if(mySurface.data)
        {
            for(const point of mySurface.points)
            {
                if(mySurface.hover_circle(e,point,10))
                {

                    if(dragElement.other == mySurface) {return}

                    const target = dummy()
                        .position(point.x,point.y)
                        .parent(mySurface)


                    if(dragElement.type == "input")
                    {
                        if(point.type == "input") return
                        if(mySurface.data.children.find(child => child.input == dragElement.name && child.output == point.name)) {return}
                        mySurface.data.children.push({
                            output:point.name,
                            input:dragElement.name,
                            target:dragElement.other.data
                        })
                    }
                    else
                    {
                        if(point.type == "output") return
                        if(dragElement.other.data.children.find(child => child.input == point.name && child.output == dragElement.name)) {return}
                        dragElement.other.data.children.push({
                            input:point.name,
                            output:dragElement.name,
                            target:mySurface.data
                        })

                    }
                    console.log(mySurface.data.children)

                    const con = connection(canvas,dragElement.target,target)


                    return
                }
            }
        }
    }

    function makeInteractive(mySurface)
    {
        var dx;
        var dy;
        function drag(e)
        {
            mySurface.x = e.offsetX - dx;
            mySurface.y = e.offsetY - dy;
            mySurface.position(mySurface.x,mySurface.y);
            mySurface.update()
        }
        document.addEventListener("mouseup", (e) =>{
            const mouse = {x:e.offsetX,y:e.offsetY}
            connectEnd(mySurface,e,mouse)
        });
        document.addEventListener("mousedown", (e) => {
            const mouse = {x:e.offsetX,y:e.offsetY}
            if(mySurface.hover(e)) return
            if(!can_drag) return
            if(connectStart(mySurface,e,mouse)) return

            can_drag = false;
            dx = mouse.x - mySurface.x;
            dy = mouse.y - mySurface.y;
            document.addEventListener("mousemove", drag);
            function dragend(e) {
            can_drag = true;
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", dragend);
            }
            document.addEventListener("mouseup", dragend);
        });
    }
    return makeInteractive
}