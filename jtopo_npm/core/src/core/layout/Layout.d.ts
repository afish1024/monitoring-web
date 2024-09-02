import { AnimationSystem, EasingNames } from '../Animation';
import { PointLike } from '../jtopo_type';
import { Node } from '../Node';
export type LayoutAnimationOption = {
    name?: string;
    duration?: number;
    onEnd?: Function;
    effect?: EasingNames;
    times?: number;
    delay?: number;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | 'normal';
};
/**
 * 布局对象
 */
export declare class Layout {
    animationSystem: AnimationSystem;
    objects: Array<Node>;
    positions: Array<PointLike>;
    positionNormals: Array<PointLike>;
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    width: number;
    height: number;
    rotation: number;
    constructor(objects: Array<Node>, positions: Array<PointLike>);
    resizeTo(width: number, height: number): void;
    /**
     * 调整尺寸
     * @param width
     * @param height
     */
    resize(width: number, height: number): void;
    /**
     * 调整位置
     * @param x
     * @param y
     */
    translate(x: number, y: number): void;
    /**
     * 缩放
     * @param sx
     * @param sy
     */
    scale(sx: number, sy: number): void;
    /**
     * 旋转
     * @param rotation
     */
    rotate(rotation: number): void;
    /**
     * 执行布局
     * @param animationOption 动画参数
     * @returns
     */
    doLayout(animationOption: LayoutAnimationOption): this;
}
