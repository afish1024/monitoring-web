import { DisplayObject } from './DisplayObject';
import Rectangle from './Rectangle';
import Stage from './Stage';
import { Axis } from './Axis';
import { Node } from './Node';
import { SerializedJson, StyleOpt, ToJsonOption } from './jtopo_type';
import { InputSystem } from '../core/InputSystem';
import { CanvasRendererBase } from './CanvasRendererBase';
import { Link } from './Link';
/**
 * 只用作展示的层，每个层对应一个Canvas. 只有加入到Layer中的对象(Node、Link及其子类的实例），才可能被绘制并显示出来.
```js

// 创建
let layer = new Layer('myLayer');
stage.addChild(layer);

// 常用方法

// 添加对象
layer.addChild(node);
layer.addChilds([node1, node2, link1, link2, node3]);

// 查找对象
let node = layer.querySelector('Node[name="node1"]');
let nodes = layer.querySelectorAll('.myClass');
let link = layer.querySelector('[text="myLink"]');

// 鼠标信息
let x = layer.mouseX;

// 设置背景
// 颜色
layer.css({
    background: 'gray'
});

// 图片
layer.css({
    background: 'url(./assets/img/blue_bg.png) no-repeat',
    backgroundSize: '100% 100%'
});

```
 */
export declare class Layer extends Node {
    className: string;
    isLayer: boolean;
    isNode: boolean;
    /**
     * 每一帧绘制前会调用
     * @since 2.4.0
    */
    onUpdate?: Function;
    stage: Stage;
    /**@protected */
    render: CanvasRendererBase;
    /**@protected */
    renderTimes: number;
    /**
     * 总会被序列化的属性列表
     */
    allwaysSerializers: Array<string>;
    /**
     * 序列化属性列表
    */
    serializers: Array<string>;
    /**@protected canvas矩形到Layer的投影 */
    viewportRect: Rectangle;
    /**
     * @protected
     * 绘制时是否裁减掉画布外的节点
     */
    cuttingHide: boolean;
    /**
     * 绘制在当前画布上对象列表
     */
    displayList: Array<Node | Link>;
    /**
     * @protected
     * 广度优先平展开的对象列表
     */
    flattenList: Array<Node | Link>;
    /** 是否响应鼠标缩放 */
    wheelZoom: boolean;
    /**
     * 坐标轴，默认隐藏
     */
    axis: Axis;
    /**
     * 鼠标在Layer中的坐标x
     */
    mouseX: number;
    /**
     * 鼠标在Layer中的坐标y
     */
    mouseY: number;
    /**
     * 缩放最大极限, 默认最大能放大10倍
```
    //例如：限制最大能缩放2倍
    layer.zoomMaxLimit = {x: 2, y:2};
```
     */
    zoomMaxLimit: {
        x: number;
        y: number;
    };
    /**
     * 缩放最小极限，默认最小能缩放到原来的十分之一
```
    //例如：限制最小能缩放到原来的一半
    layer.zoomMminLimit = {x: 0.5, y:0.5};
```
     */
    zoomMinLimit: {
        x: number;
        y: number;
    };
    /**@protected */
    _frames: number;
    get frames(): number;
    set frames(v: number);
    /**@protected */
    _requestReapint: boolean;
    /**@protected */
    _layerIndex: string;
    /**@protected */
    _dragDrawDelay: boolean;
    /**@protected */
    _bgInfo: any;
    /**
     * @param {String} name 名字
     */
    constructor(name?: string);
    /**@protected */
    setStage(stage: any): void;
    /** 请求刷新 */
    update(): boolean;
    /**
     * 显示坐标轴
     */
    showAxis(): void;
    /**
     * 隐藏坐标轴
     */
    hideAxis(): void;
    /**@protected */
    setRender(render: CanvasRendererBase): void;
    /**@protected */
    _isMatrixDirty(): boolean;
    /**@protected */
    updateMatrix(force?: boolean): void;
    /**@protected */
    getViewportRectInLayer(): Rectangle;
    /**@protected */
    _calc_originInParent(): number[];
    /**
     * 生成json, 含自定义样式
```js
    // 可以附带参数, 参数都是可选
    toFileJson({
       info: {author:"张三", date:"2024-02", "desc":"XXX车间装配图", ....},
       script: `function(stage, layer){....}`,
       imageToBase64: true //是否将图片以base64的形式内联到json
    });
```
     */
    toFileJson(opt?: ToJsonOption | boolean): string;
    /**
     * 清空当前画布并加载json内容

```js
    // 情形一: 不等待，直接打开（图片在后台加载）
    layer.openJson(jsonStr);
    console.log('已经打开，有些图片可能还没加载出来');
    //... 继续其他操作
```
     *
     * @param jsonOrString
     * @returns Promise
     */
    openJson(jsonOrString: string | SerializedJson): SerializedJson;
    /**
     * 功能与openJson一致，但需要等到所有资源加载成功, 立即返回Promise对象
```js

// 情形1: 等待图片加载完成
layer.loadJsonAndWait(jsonStr).then(()=>{
    console.log('已经打开，并且所有图片资源加载完成');
    //... 继续其他操作
});

// 情形2, 同上，使用await
await layer.loadJsonAndWait(jsonStr);
console.log('已经打开，并且所有图片资源加载完成');
//... 继续其他操作
```
     * @returns Promise
     */
    openJsonAndWait(jsonOrString: string | SerializedJson): Promise<unknown>;
    /**@protected */
    _whenJsonLoaded(): void;
    /**@protected */
    updateViewRect(): Rectangle;
    /**@protected */
    updateSize(w: any, h: any): void;
    /**@protected */
    pickUpByRect(boxRect: Rectangle): any[];
    pickUpChild(): DisplayObject | null;
    translateWith(x: number, y: number): this;
    /**@protected */
    _calcBackgroundPosition(): void;
    css(styleOpt: StyleOpt | string, value?: any): this;
    getAABB(): Rectangle;
    getExportAABB(): Rectangle;
    /**
     * 设置zIndex
     * @param  index
     * @protected
     */
    setZIndex(index: number): void;
    /**
     * 显示
     */
    show(): this;
    /**
     * 隐藏
     * @returns
     */
    hide(): this;
    /**
     * @override
     * @protected
     */
    _OBBPoints(): {
        x: number;
        y: number;
    }[];
    getPoints(): {
        x: number;
        y: number;
    }[];
    draw(ctx: any): void;
    zoom(x: number, y: number, cx?: number, cy?: number): this;
    cancelZoom(): void;
    forceUpdate(): void;
    /**
     * 该方法已过时，未来版本不再支持, 请使用css方法
     * @deprecated
     */
    setBackground(background: any, backgroundSize: any): void;
    /**
     * 已过时，请使用：querySelectorAll()替代
     * 根据属性来查找Layer中的对象
     * <p>例如：layer.find('text', 'node_3'); 会返回对象的text属性是 'node_3'的所有对象 </p>.
     * <p>例如：layer.find('isNode', true); 会返回所有Node对象 </p>.
     * <p>例如：layer.find('isLink', true); 会返回所有Link对象 </p>.
     * @deprecate
     * @param name 属性名称
     * @param value 属性值
     * @param recursive 是否递归查找下级子节点
     */
    find(name: string, value: any, recursive?: boolean): DisplayObject[];
    toStageRect(aabbInLayer: Rectangle): Rectangle;
    toLayerRect(rect: Rectangle): Rectangle;
    /**@protected */
    dragHandle(inputSystem: InputSystem): void;
    /**@protected */
    updateCanvasOffset(dx: number, dy: number): void;
    /**@protected */
    setDrawDelay(isDelay: boolean): void;
    /**@protected */
    dragEndHandler(): void;
    addChild(child: any): this;
    addChilds(childs: any): void;
    /**
     * 将指定对象的中心放到画布中央
     * @param obj 可为null
     */
    centerBy(obj?: DisplayObject | Array<DisplayObject>): void;
    getAllVisiable(): any[];
    /**
     * 开始循环渲染
     */
    loopRender(frames?: number): void;
    /**
     * 销毁
     */
    destory(): void;
}
export { Layer as default };
