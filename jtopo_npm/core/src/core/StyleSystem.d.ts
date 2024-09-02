import DisplayObject from "./DisplayObject";
import { SerializedJson, StyleOpt } from "./jtopo_type";
import Layer from "./Layer";
import Style from "./Style";
/**
 * 样式系统
```js
    // 设置’主题‘，系统目前自带了两个, 例如：
    stage.styleStyle.setTheme('DefaultDark');
    
    stage.styleStyle.setTheme('DefaultLight');

    // 定义一个样式
    stage.styleSystem.defClass('.active', {
        color: 'red',
        font: '10px sans-serif'
    });

    //
    node.addClass('.active');
    link.addClass('.active');

    node.removeClass('.active');
```
 */
export declare class StyleSystem {
    styleClass: any;
    stage: any;
    /**
     * 主题名称
     */
    themeName: string;
    /**
     * 系统默认的选中外观颜色（节点选中时的矩形框的颜色、连线被选中时的阴影颜色）
     */
    selectedStyle: string;
    constructor(stage: any);
    customStyleToJSON(indexFn: Function): any;
    fromJson(json: SerializedJson): void;
    /**
     * 定义一个样式
     *
     * @param name
     * @param styleOpt
     */
    defClass(name: string, styleOpt: Style | StyleOpt): void;
    getClass(name: string): any;
    /**
     * 设置主题
     * @param themeName 名称
     */
    setTheme(themeName: string): void;
    _computeLayer(layer: Layer): void;
    /**
     * 获取指定对象计算后的样式
     * @param obj
     * @returns
     */
    getComputedStyle(obj: DisplayObject): Style;
    computeStyle(obj: DisplayObject): Style;
    /**
    * 基于某个主题，定义新的主题
    * @param themeBaseName
    * @param newThemeName 新主题的名称
    */
    defTheme(themeBaseName: string, newThemeName: string): any;
}
