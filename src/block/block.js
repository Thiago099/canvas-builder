
import {useNode} from './node'
import {useConnect} from './connection'
export default function useBlock(canvas,selectNothing)
{
    const connect = useConnect(canvas)
    const node = useNode(canvas,connect,selectNothing)
    return {
        node,
        connect
    }
}