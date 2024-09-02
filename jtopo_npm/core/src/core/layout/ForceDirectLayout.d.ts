import { Node } from '../Node';
/**
 * 斥力布局
 */
export declare class ForceDirectLayout {
    frame_width: any;
    frame_height: any;
    origin: any;
    originWeight: number;
    speed: number;
    gravity: number;
    maxForceDistance: number;
    originEdges: any[];
    selectedNode: any;
    /**
     * @param originNode 原点
    * @param frame_width
    * @param frame_height
     */
    constructor(originNode: Node, frame_width: number, frame_height: number);
    initNodes(originNode: any): void;
    initialize(): void;
    originForce(nodeI: any, distance: any): void;
    attractiveForce(nodeI: any, nodeJ: any, distance: any): void;
    repulsiveForce(nodeI: any, nodeJ: any, distance: any): void;
    doLayout(): void;
    /**
     * 应用一次,
     */
    applyForce(): void;
    bounds(node: any): void;
    setOriginEdgeWeight(node: any, weight: any): void;
    addNode(node: any, mass: any): void;
    getLink(node1Id: any, node2Id: any): any;
    addLink(node1: any, node2: any, weight: any): void;
}
export { ForceDirectLayout as default };
