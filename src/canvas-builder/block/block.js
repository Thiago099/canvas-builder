
import useMakeInteractive from './make-interactive'
import node from './node'
export default function useBlock(canvas)
{
    const makeInteractive = useMakeInteractive(canvas)
    
    return ({inbound,outbound},{x,y},text)=>{
        return node(canvas,makeInteractive,{inbound,outbound},{x,y},text)
    }
}