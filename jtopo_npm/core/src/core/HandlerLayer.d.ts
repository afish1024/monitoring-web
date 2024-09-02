import Layer from './Layer';
import { Node } from './Node';
import Stage from './Stage';
/**
 *@ignore
 * 处于最顶层，响应鼠标操作，对应一个Canvas
 */
export declare class HandlerLayer extends Layer {
    className: string;
    _frames: number;
    _zIndex: number;
    areaBox: Node;
    constructor(stage: Stage);
    mouseoutHandler(event: any): void;
    _calc_originInParent(): number[];
    update(): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}
export { HandlerLayer as default };
