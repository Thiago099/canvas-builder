import { canvas, surface, filler_surface } from "@/canvas-builder/canvas-builder";
import connection from './connection'
export default function useMakeInteractive(canvas)
{
    var can_drag = true;
    var dragElement = null;

    function distanceBetweenPoints(point1, point2) {
    let x1 = point1.x;
    let y1 = point1.y;
    let x2 = point2.x;
    let y2 = point2.y;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function connectStart(mySurface,mouse)
    {
        if(mySurface.data)
        {
        for(const point of mySurface.data.points)
        {
            if(distanceBetweenPoints({x:mouse.x-mySurface.x,y:mouse.y-mySurface.y},point) < 10)
            {
            const source = surface().position(mouse.x,mouse.y)
            const target = surface().position(()=>mySurface.x+point.x,()=>mySurface.y+point.y).hook("target",mySurface)
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

            if(dragElement) dragElement.destroy()
            dragElement = target;
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp)

            return true
            }
        }
        }
        return false
    }

    function connectEnd(mySurface,mouse)
    {
        if(mySurface.data)
        {
            for(const point of mySurface.data.points)
            {
                if(distanceBetweenPoints({x:mouse.x-mySurface.x,y:mouse.y-mySurface.y},point) < 10)
                {
                const target = surface().position(()=>mySurface.x+point.x,()=>mySurface.y+point.y).size(0,0).hook("target",mySurface)
                const con = connection(canvas,dragElement,target)


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
            connectEnd(mySurface,mouse)
        });
        document.addEventListener("mousedown", (e) => {
            const mouse = {x:e.offsetX,y:e.offsetY}
            if(mouse.x < mySurface.x || mouse.x > mySurface.x + mySurface.w || mouse.y < mySurface.y || mouse.y > mySurface.y + mySurface.h) return
            if(!can_drag) return
            if(connectStart(mySurface,mouse)) return

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