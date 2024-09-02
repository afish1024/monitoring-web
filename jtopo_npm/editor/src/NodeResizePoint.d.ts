import { Stage, SelectedGroup, Node, InputSystem } from '@jtopo/core';
import NodeCtrlBox from './NodeCtrlBox';
import Editor from './Editor';
declare class NodeResizePoint extends Node {
    nodeCtrlBox: NodeCtrlBox;
    isNodeResizePoint: boolean;
    editor: Editor;
    stage: Stage;
    selectedGroup: SelectedGroup;
    dragBegin: boolean;
    constructor(nodeCtrlBox: NodeCtrlBox, name: string);
    mouseenterHandler(): void;
    mousemoveHandler(): void;
    mouseoutHandler(e: any): void;
    mousedownHandler(event: any): void;
    mouseupHandler(event: any): void;
    dragHandler(inputSystem: InputSystem): void;
    adjustFixedDirection(element: any, resizeWith: any, boxName: any): void;
}
export { NodeResizePoint as default };
