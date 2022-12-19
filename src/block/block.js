
import useMakeInteractive from './make-interactive'
import node from './node'
export default function useBlock(canvas)
{
    const makeInteractive = useMakeInteractive(canvas)
    
    return (data)=>{
        return node(canvas,makeInteractive,data)
    }
}