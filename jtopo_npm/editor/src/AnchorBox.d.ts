import { DisplayObject, Node, Endpoint, Intersect } from '@jtopo/core';
import AnchorPoint from './AnchorPoint';
import Editor from './Editor';
declare class AnchorBox extends Node {
    editor: Editor;
    ctrlIntersectPoint: AnchorPoint;
    target?: DisplayObject;
    intersect?: Intersect;
    activedPoint: AnchorPoint;
    constructor(editor: Editor, x?: number, y?: number, w?: number, h?: number);
    cancel(): void;
    mouseoutStageHandler(): void;
    mouseenterStageHandler(): void;
    clearTarget(): void;
    setTarget(obj: DisplayObject): void;
    setTargetWithName(obj: DisplayObject, activeNameOrPoint: string): void;
    clearActived(): void;
    activePointByName(name?: string): void;
    showIntersectAnchor(intersect?: Intersect): void;
    calcAnchorPointsPosition(): void;
    createAnchorPoint(name: string): AnchorPoint;
    getObjectsIntersect(nodeOrLinks: Array<DisplayObject>): any;
    getConnectableEndpointFromObjects(nodeOrLinks: Array<DisplayObject>): Endpoint | null;
    findConnectableEndpoint(excludes: Array<DisplayObject>): Endpoint | null;
}
export { AnchorBox as default };
