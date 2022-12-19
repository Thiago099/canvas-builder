
import useMakeInteractive from './make-interactive'
import {useNode} from './node'
import {useConnect} from './connection'
export default function useBlock(canvas)
{
    const makeInteractive = useMakeInteractive(canvas)
    const connect = useConnect(canvas)
    const node = useNode(canvas,makeInteractive)
    return {
        node,
        connect
    }
}