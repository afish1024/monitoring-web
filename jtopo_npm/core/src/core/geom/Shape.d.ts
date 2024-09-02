import { PointLike, Vec2 } from '../jtopo_type';
import { DisplayObject } from '../DisplayObject';
/**
 * 多边形抽象，核心是维护一个点坐标列表，点坐标为单位化后的
 *
 * 单位化的含义: x和y始终在一个区间范围内 x:[-0.5, 0.5] y: [-0.5, 0.5]
 */
export declare class Shape {
    className: any;
    /**
     * 单位点列表 x:[-0.5, 0.5] y: [-0.5, 0.5]
     */
    points: Array<PointLike>;
    /**
    * 是否封闭图形（最后一个点是否连接到第一个点形成封闭图形），默认true
    */
    isClosed: boolean;
    /**
     * 是否更新了数据
     */
    dirty: boolean;
    /**
     * @param unitPoints 单位点列表 每个点坐标范围：(x:[-0.5, 0.5] y: [-0.5, 0.5])
     */
    constructor(unitPoints: Array<PointLike>);
    /**
     * 更新数据点
     * @param unitPoints 单位点列表 x:[-0.5, 0.5] y: [-0.5, 0.5]
     */
    updatePoints(unitPoints: Array<PointLike>): void;
    toJSON(): any;
    clone(): Shape;
    static fromJSON(json: any): any;
    static fromPoints(points: Array<PointLike>, keepAspectRatio?: boolean): Shape;
    /**
     * 将指定点坐标单位化
     * @param points
     * @param keepAspectRatio
     */
    static normalPoints(points: Array<PointLike>, keepAspectRatio?: boolean): {
        x: number;
        y: number;
    }[];
    draw(ctx: CanvasRenderingContext2D, points: Array<PointLike>, object: DisplayObject): void;
    /**
     * 旋转，会修改points属性
     * @param angle
     * @returns
     */
    rotate(angle: number): this;
    /**
     * 缩放，会修改points属性
     * @param sx
     * @param sy
     * @returns
     */
    scale(sx: number, sy: number): this;
    /**
     * 已过时，不推荐使用，未来将移除
     * @deprecated
     */
    static Scale(scaleX: any, scaleY: any): (p: any) => any;
    /**
     * 已过时，不推荐使用，未来将移除
     * @deprecated
     */
    static Rotate(angle: any): (p: any) => any;
    skew(sx: number, sy: number): this;
    static pointToSize(points: Array<PointLike>, width: number, height: number, keepAspectRatio?: boolean): {
        x: number;
        y: number;
    }[];
    /**
     * 生成多边形Shape对象
     * @param edgeCount 边的条数
     * @param initAngle 初始角度
     */
    static polygon(edgeCount?: number, initAngle?: number): Shape;
    /**
     * 菱形
     */
    static Damond: Shape;
    /**
     * 一个全局的三角型, 右朝向
     */
    static Triangle: Shape;
    /**
     * 生成一个平行四边形实例（上面一条边向右倾斜）
     * @param beginX X偏移百分比
     */
    static parallelogram(beginX?: number): Shape;
    static tip: Shape;
    /**
     * cos函数
     * @returns
     */
    static cos(opt: {
        begin: number;
        end: number;
        step: number;
        pointCount?: number;
    }): Shape;
    /**
     * 已过时，请使用 circlePoints 来替代
     * @deprecated
     * @param opt
     * @returns
     */
    static circle(opt: {
        begin: number;
        end: number;
        step: number;
        pointCount?: number;
    }): Shape;
    /**
     * 生成圆上一列的点
     * @param opt
     * @returns
     */
    static circlePoints(opt: {
        begin: number;
        end: number;
        step: number;
        pointCount?: number;
    }): any[];
    /**
     * 自定义函数来构
     * @param f
     * @returns
     */
    static fn(f: Function): Shape;
    /**
     * 生成网格坐标(外边框)
     * @param rows 行
     * @param cols 列
     * @returns 一维数组(单位坐标)
     */
    static outerGrid(rows: number, cols: number): Shape;
    /**
     * 生成内网格坐标
     * @param rows 行
     * @param cols 列
     */
    static innerGrid(rows: number, cols: number): Shape;
    /**
     * 一个全局的箭头形状实例对象
     */
    static Arrow: any;
    /**
    * 一个全局的矩形实例对象
    */
    static Rect: any;
    /**
     * 一个全局的圆形实例对象
     */
    static Circle: any;
    /**
     * 一个全局的椭圆实例对象
     */
    static Ellipse: any;
    /**
     * 一个全局的线条实例对象
     */
    static Line: any;
    /**
     * 一个全局的曲线实例对象
     */
    static Curve: any;
    /**
     * 一个全局的贝塞尔实例对象
     */
    static BezierCurve: any;
    /**
     * 一个全局的Arc实例对象
     */
    static Arc: any;
    /**
     * 已过时，不推荐使用，未来将移除
     *
     * 请使用 Shape.Arrow 来替代： Shape.ArrowShape
     * @deprecated
     */
    static ArrowShape: any;
    /**
     * 已过时，不推荐使用，未来将移除
     *
     * 请使用 Shape.Rect 来替代： Shape.RectShape
     * @deprecated
     */
    static RectShape: any;
    /**
     * 生成多边形对象
     *
     * 已过时，不推荐使用，未来将移除
     *
     * 请使用 Shape.polygon (p小写) 来替代：Shape.Polygon
     * @deprecated
     */
    static Polygon: any;
}
/**
 * 箭头形状
 */
export declare class ArrowShape extends Shape {
    className: any;
    isClosed: any;
    constructor(unitPoints?: {
        x: number;
        y: number;
    }[]);
    draw(ctx: CanvasRenderingContext2D, points: Array<PointLike>, object: DisplayObject): void;
}
/**
 * 矩形形状
 */
export declare class RectShape extends Shape {
    className: string;
    constructor(unitPoints?: {
        x: number;
        y: number;
    }[]);
    draw(ctx: CanvasRenderingContext2D, points: Array<PointLike>, object: DisplayObject): void;
}
/**
 * 圆形形状
 */
export declare class CircleShape extends Shape {
    className: string;
    constructor(unitPoints?: {
        x: number;
        y: number;
    }[]);
    draw(ctx: CanvasRenderingContext2D, points: Array<PointLike>, object: DisplayObject): void;
}
/**
 * 椭圆形状
 */
export declare class EllipseShape extends Shape {
    className: string;
    constructor(unitPoints?: {
        x: number;
        y: number;
    }[]);
    draw(ctx: CanvasRenderingContext2D, points: Array<PointLike>, object: DisplayObject): void;
}
/**
 * 线条形状
 */
export declare class LineShape extends Shape {
    className: string;
    isClosed: boolean;
    constructor(unitPoints?: any[]);
}
/**
 * 曲线形状
 */
export declare class CurveShape extends Shape {
    className: string;
    isClosed: boolean;
    constructor(unitPoints?: any[]);
    draw(ctx: CanvasRenderingContext2D, points: Array<PointLike>, object: DisplayObject): void;
}
/**
 * 曲线形状
 */
export declare class BezierCurveShape extends Shape {
    className: string;
    isClosed: boolean;
    constructor(unitPoints?: any[]);
    draw(ctx: CanvasRenderingContext2D, points: Array<PointLike>, object: DisplayObject): void;
}
/**
 * 圆形形状
 */
export declare class ArcShape extends Shape {
    className: string;
    isClosed: boolean;
    constructor(unitPoints?: any[]);
    draw(ctx: CanvasRenderingContext2D, points: Array<PointLike>, object: DisplayObject): void;
}
/**@ignore */
export declare const RectDefaultPositions: {};
/**
 * @ignore
 * 每个位置的单位向量，以0，0为圆心
 * TODO: 当center的时候是0，0，是零向量，并不是单位向量
 */
export declare function getRectPositionDirection(name: string): Vec2;
/**
 * @ignore
 * 获取相对于圆心的旋转角度
 */
export declare function getRectPositionRotate(name: string): number;
