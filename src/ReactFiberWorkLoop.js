import { updateClassComponent, updateFunctionComponent, updateHostComponent, updateHostTextComponent } from "./ReactFiberReconciler";
import { ClassComponent, Fragment, FunctionComponent, HostComponent, HostText } from "./ReactWorkTags";
import { Placement } from "./utils";

let wip = null;
let wipRoot = null;

// initial render and update call this func
export function scheduleUpdateOnFiber(fiber) {
    wip = fiber;
    wipRoot = fiber;
}

function performUnitOfWork() {
    const { tag } = wip;
    
    // todo: update current component
    switch (tag) {
        case HostComponent:
            updateHostComponent(wip);
            break;
        case FunctionComponent:
            updateFunctionComponent(wip);
            break;
        case ClassComponent:
            updateClassComponent(wip);
            break; 
        case Fragment:
            updateFragmentComponent(wip);
            break;
        case HostText:
            updateHostTextComponent(wip);
            break;
        default:
            break;
    }

    // todo: update next, depth-first traverse
    if (wip.child) {
        wip = wip.child;
        return; 
    }

    let next = wip;

    while (next) {
    if (next.sibling) {
        wip = next.sibling;
        return;
    }
    next = next.return;
}

    wip = null;

}

function workLoop(IdleDeadline) {

    while(wip && IdleDeadline.timeRemaining() > 0) {
        performUnitOfWork();
    }

    if(!wip && wipRoot) {
        commitRoot();
    }
}

requestIdleCallback(workLoop); 

function commitRoot() {
    commitWorker(wipRoot);
    wipRoot = null;
}

function commitWorker(wip) {
    if(!wip) {
        return
    }
    // commit self
    // ???
    const parentNode = wip.return.stateNode;
    const { flags, stateNode } = wip;
    if(flags & Placement && stateNode) {
        parentNode.appendChild(stateNode);
    }
    // commit child  
    commitWorker(wip.child);
    // commit sibling
    commitWorker(wip.sibling);
}