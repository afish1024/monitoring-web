import { DisplayObject } from './DisplayObject';
import Transform from './Transform';
import { Node } from './Node';
import { Link } from './Link';
export declare abstract class CoordinateSystem {
    /**
     * 计算出原点在父对象内的坐标
     * @param obj
     * @param parent
     */
    abstract calcOriginInParent(obj: DisplayObject, parent: any): Array<number>;
    getOriginRotation(obj: DisplayObject): number;
    getTransform(obj: DisplayObject): Transform;
    getTransformByDeep(obj: DisplayObject, deep: number): Transform;
    transform(transform: Transform | CanvasRenderingContext2D, obj: DisplayObject): void;
}
/**
 * 类似数学教学常用几何坐标系：默以父节点的中心点当做原点
 *
 * 和常用几何表示不同的是 +y 向下
 */
export declare class GeometricCoordinateSystem extends CoordinateSystem {
    calcOriginInParent(obj: DisplayObject, parent?: Node): number[];
}
/**
 * 线段坐标系
 */
export declare class LinkCoordinateSystem extends CoordinateSystem {
    calcOriginInParent(obj: Node | Link, parent?: Link): number[];
    transform(transform: Transform | CanvasRenderingContext2D, obj: any): void;
    getOriginRotation(obj: Node): number;
}
export declare function getCS(obj: DisplayObject): GeometricCoordinateSystem | LinkCoordinateSystem;
