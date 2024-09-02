import { Stage, SelectedGroup, CircleNode } from '@jtopo/core';
import Editor from './Editor';
import NodeCtrlBox from './NodeCtrlBox';
declare class NodeRotatePoint extends CircleNode {
    isNodeRotatePoint: boolean;
    nodeCtrlBox: NodeCtrlBox;
    editor: Editor;
    stage: Stage;
    selectedGroup: SelectedGroup;
    elementInitAngle: number;
    mouseInitAngle: number;
    constructor(nodeCtrlBox: NodeCtrlBox, name: string);
    mousemoveHandler(): void;
    mousedownHandler(inputSystem: any): void;
    mouseupHandler(inputSytem: any): void;
    dragHandler(inputSystem: any): void;
}
export { NodeRotatePoint as default };
