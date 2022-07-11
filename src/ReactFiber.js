import { FunctionComponent, HostComponent } from "./ReactWorkTags";
import { isFn, isStr, Placement } from "./utils";

export function createFiber(vnode, returnFiber) {

    const fiber = {
        type: vnode.type,
        key: vnode.key, 
        props: vnode.props, 
        stateNode: null,
        child: null,
        sibling: null,
        return: returnFiber,
        flags: Placement,
        index: null,
    };

    const { type } = vnode;

    if(isStr(type)) {
        fiber.tag = HostComponent;
    } else if (isFn(type)) {
        // todo: can be functional componet or class component
        fiber.tag = FunctionComponent;
    }

    return fiber;
}