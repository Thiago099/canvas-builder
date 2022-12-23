import { canvas, surface, filler_surface,dummy } from "@/canvas-builder/canvas-builder";
import connection, { useConnect } from './connection'
var dragged = true;

export default function useMakeInteractive(canvas)
{
    var dragging = false;
    var can_drag = true;
    var dragElement = null;
    const connect = useConnect(canvas)

    function connectStart(mySurface,e,mouse)
    {
        if(mySurface.surface.data)
        {
        for(const point of mySurface.surface.points)
        {
            if(mySurface.surface.hover_circle(e,point,10))
            {
                const source = dummy()
                    .position(mouse.x,mouse.y)

                const target = dummy()
                    .position(point.x,point.y)
                    .parent(mySurface.surface)
                    
                const {destroy} = connection(canvas,source,target)
                const mouseMove = e =>{
                    const pm = {x:e.offsetX,y:e.offsetY}
                    source.position(pm.x,pm.y)
                    source.update()
                }
                const mouseUp = e =>{
                    source.destroy()
                    destroy()
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
        if(mySurface.surface.data)
        {
            for(const point of mySurface.surface.points)
            {
                if(mySurface.surface.hover_circle(e,point,10))
                {

                    const target = dummy()
                        .position(point.x,point.y)
                        .parent(mySurface.surface)

                    connect(mySurface,point.name,dragElement.other,dragElement.name)
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
            dragged = true;
            mySurface.surface.x = e.offsetX - dx;
            mySurface.surface.y = e.offsetY - dy;
            mySurface.surface.position(mySurface.surface.x,mySurface.surface.y);
            mySurface.surface.update()
        }
        document.addEventListener("mouseup", (e) =>{
            const mouse = {x:e.offsetX,y:e.offsetY}

            if(!dragging)
            {
                if(dragged) return
                mySurface.surface.selected = false
                mySurface.surface.update()
                if(!mySurface.surface.hover(e))
                {
                    mySurface.surface.selected = true
                    mySurface.surface.update()
                }
            }

            connectEnd(mySurface,e,mouse)

            setTimeout(() => {
            dragging = false;
            },0);
            
            

        });
        document.addEventListener("mousedown", (e) => {
            dragged = false;
            const mouse = {x:e.offsetX,y:e.offsetY}
            if (e.button !== 0) return;
            if(connectStart(mySurface,e,mouse)) {
                dragging = true;
                return
            }

            if(mySurface.surface.hover(e)) return
            if(!can_drag) return

            can_drag = false;
            dx = mouse.x - mySurface.surface.x;
            dy = mouse.y - mySurface.surface.y;
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", dragend);
            function dragend(e) {
                can_drag = true;
                document.removeEventListener("mousemove", drag);
                document.removeEventListener("mouseup", dragend);
            }
        });
    }
    return makeInteractive
}