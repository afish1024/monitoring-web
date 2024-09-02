import { StyleOpt } from './jtopo_type';
/**
 * 样式对象
 */
export declare class Style {
    className: any;
    dirty: boolean;
    /**
     * 滤镜效果， 例如：
     *
     * 高斯模糊：'blur(5px)'
     *
     * 灰度： 'grayscale(100%)' 用于将图像转换为灰度的滤镜
     *
     * 褐色: 'sepia(100%)' 用于将图像转换为深褐色的滤镜。
     *
     * 锐化： 'contrast(150%) brightness(120%)' 这种滤镜效果可以增强图像的锐度和清晰度，使其看起来更加清晰、鲜明。
     *
     * 颜色矫正: 'saturate(200%) hue-rotate(180deg)' 这种滤镜效果可以调整图像的色彩和色调，使其看起来更加自然、真实。
     *
     * 反色：'invert(100%)' 这种滤镜效果可以将图像中的颜色反转，从而创建出截然不同的视觉效果。
     *
     * 透明度：'opacity(50%)' 这种滤镜效果可以改变图像的透明度，使其看起来更加半透明或不透明。
     *
     * 饱和度：'saturate(200%)' 这种滤镜效果可以改变图像的饱和度，使其看起来更加鲜艳或柔和。
     *
     * 对比度：'contrast(200%)' 这种滤镜效果可以增加或减少图像的对比度，从而改变其亮度和明暗程度。
     *
     * 色调： 'hue-rotate(90deg)' 用于对图像应用滤镜以设置图像的色调旋转.
     */
    filter?: string;
    /**
     * 于设置图片是否平滑，也就是是否抗锯齿
     *
     * true 表示图片平滑（默认值），false 表示图片不平滑
     */
    imageSmoothingEnabled?: boolean;
    /**
     * 边框宽度
     */
    borderWidth?: number;
    /**
     * 整体透明度
     */
    globalAlpha?: number;
    /**
     * 绘制模式
     */
    globalCompositeOperation?: GlobalCompositeOperation;
    /**
     * 填充样式
     */
    fillStyle?: string | CanvasGradient | CanvasPattern;
    /**
    * 线条样式, 对于Node而言就是边框线条
    */
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    /**
     * 阴影
     */
    shadowBlur?: number;
    /**
     * 阴影颜色
     */
    shadowColor?: string;
    /**
     * 阴影X方向的长度
     */
    shadowOffsetX?: number;
    /**
     * 阴影y方向的长度
     */
    shadowOffsetY?: number;
    /**
     * 文本水平偏移量
     */
    textOffsetX?: number;
    /**
     * 文本垂直偏移量
     */
    textOffsetY?: number;
    /**
     * lineCap
     */
    lineCap?: CanvasLineCap;
    /**
     * lineJoin
     */
    lineJoin?: CanvasLineJoin;
    /**
     * 线宽度
     */
    lineWidth?: number;
    miterLimit?: number;
    /**
     * 文字
     */
    font?: string;
    /**
     * 字体左右对齐方式
     */
    textAlign?: CanvasTextAlign;
    /**
     * 字体基线
     */
    textBaseline?: CanvasTextBaseline;
    /**
     * 虚线，例如[3,2]
     */
    lineDash?: Iterable<number>;
    /**
     * 虚线偏移量
     */
    lineDashOffset?: number;
    /**
     * 文字位置
     */
    textPosition?: string;
    /**
     * 文字颜色
     */
    color?: string;
    padding?: number;
    private paddingLeft;
    private paddingRight;
    private paddingTop;
    private paddingBottom;
    private _border;
    /**
     * 边框样式
     */
    borderStyle: null | 'solid' | 'dashed' | 'dotted';
    /**
     * 边框颜色, 如: "gray", "rgb(1,0,0)", "#FF0000"
     */
    borderColor?: string;
    /**
     * 边框圆角, 如: 5
     *
     * 也支持支持数组: [0, 10, 20, 30]，四个角（比较老的浏览器可能不支持）
     */
    borderRadius?: number | [number, number, number, number];
    backgroundSize?: string;
    backgroundWidth?: number;
    backgroundHeight?: number;
    private _background;
    private _backgroundPosition;
    private _backgroundImage;
    private backgroundWidthRate?;
    private backgroundHeightRate;
    private backgroundPositionX;
    private backgroundPositionY;
    private backgroundPositionXName;
    private backgroundPositionYName;
    private backgroundPositionXRate;
    private backgroundPositionYRate;
    backgroundRepeat: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
    backgroundColor: any;
    _backgroundImageObject: any;
    /**
     * 文字行高
     */
    lineHeight?: string | number;
    /**
     * 边框, 如: solid 1px gray
     */
    border?: string;
    /**
     * 背景图片, 如："abc.jpg", "url('aaaaaa.aa.png')"
     */
    backgroundImage?: string;
    /**
     * 设置背景，如： "white url('./assets/img/grid.png') repeat",
     */
    background?: string;
    backgroundPosition?: string;
    _textDirty: boolean;
    constructor(init?: Style | Object);
    isDirty(): boolean;
    getStyleValues(): {};
    clear(): void;
    toJSON(): import("./jtopo_type").SerializedDisplayObject;
    update(newState: StyleOpt): void;
    clearDirtyMark(): void;
    getBackgroundRect(fillMaxWidth: any, fillMaxHeight: any, node: any): {
        x: number;
        y: number;
        width: any;
        height: any;
    };
    applyTo(ctx: any): void;
    calcGap(): number;
    static fromJSON(json: any): Style;
    static _styleHandle(style: any): void;
    /**
    * 测量字符串在某个样式下的尺寸（以下因素均可能影响结果：文本是否多行、字体、字号、行高）
    * @param lineCount text的行数
    */
    static measureText(text: string | Array<string>, style: Style, lineCount: number): {
        width: any;
        height: number;
        lineHeight: any;
    };
    set fontSize(size: string);
    get fontSize(): string;
    set fontFamily(family: string);
    get fontFamily(): string;
    set fontWeight(weight: string);
    get fontWeight(): string;
}
declare abstract class StyleGradient {
    colors: any[];
    /**
     * 总会被序列化的属性列表
     */
    allwaysSerializers: Array<string>;
    serializers: Array<string>;
    dirty: boolean;
    gradient?: CanvasGradient;
    constructor();
    update(): void;
    toJSON(): {};
    abstract getStyle(): CanvasPattern | CanvasGradient | null;
}
/**
 * 线性渐变
```js
let rg = new LinearGradient(0,0, 20, 20);
rg.addColorStop(0, 'white');
rg.addColorStop(0.5, 'red');
rg.addColorStop(1, 'blue');

// 也可以一次性设置：
rg.setColors([[0, 'white'], [0.5, 'red'], [1, 'blue']]);
```
 */
export declare class LinearGradient extends StyleGradient {
    className: any;
    startX: number;
    startY: number;
    stopX: number;
    stopY: number;
    serializers: Array<string>;
    constructor(startX: number, startY: number, stopX: number, stopY: number);
    static fromJSON(json: any): LinearGradient;
    addColorStop(offset: any, color: any): void;
    setColors(colors: any): void;
    getStyle(): CanvasGradient;
}
/**
 * 放射渐变
```js
let rg = new RadialGradient(0,0, 20, 0, 0, 30);
rg.addColorStop(0, 'white');
rg.addColorStop(0.5, 'red');
rg.addColorStop(1, 'blue');

//也可以一次性设置：
rg.setColors([[0, 'white'], [0.5, 'red'], [1, 'blue']]);
```
 */
export declare class RadialGradient extends StyleGradient {
    className: any;
    xStart: number;
    yStart: number;
    radiusStart: number;
    xStop: number;
    yStop: number;
    radiusEnd: number;
    serializers: Array<string>;
    constructor(xStart: number, yStart: number, radiusStart: number, xStop: number, yStop: number, radiusEnd: number);
    static fromJSON(pojo: any): RadialGradient;
    addColorStop(offset: any, color: any): void;
    setColors(colors: any): void;
    getStyle(): CanvasGradient;
}
export declare class StylePattern extends StyleGradient {
    className: any;
    /** 重复: 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y' */
    repetition: string;
    /**@protected */
    imageObject?: HTMLImageElement;
    private imagePath?;
    private pattern?;
    serializers: Array<string>;
    constructor(imagePath: string, repetitionStyle?: any);
    static fromJSON(json: any): any;
    getStyle(): CanvasPattern;
    get image(): string;
    set image(src: string);
}
export { Style as default };
