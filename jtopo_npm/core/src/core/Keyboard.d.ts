import EventTarget from './EventTarget';
import Stage from './Stage';
/**
 * 键盘抽象
 *
 * 示例：
```js
    // 绑定快捷键
    keyboard.bindKey('Shift+a', ()=> {
        console.log('shift+a');
    });

    // 解绑
    keyboard.unbind('Shift+a');
```
 */
export declare class Keyboard extends EventTarget {
    stage: Stage;
    /**
     * 调试开关，如果设置为true，会在控制台输出按键信息
     */
    debug: boolean;
    regMap: Map<string, Function>;
    keyMap: Map<string, boolean>;
    preKeydownEvent: any;
    /**
     * 是否禁用
     */
    _disabled: boolean;
    constructor(stage: Stage);
    /** 禁用jtopo的快捷键 */
    disable(): void;
    /** 启用jtopo默认的快捷键 */
    enable(): void;
    isControlDown(): boolean;
    isShiftDown(): boolean;
    isAltDown(): boolean;
    isMetaDown(): boolean;
    /**
     *
     * 绑定按键
     * @param {String} keyInfo 例如"Control+a" 、"Meta+a"、 ”G" 、”Shift+1“
     * @param {Function} callback 触发处理函数
     */
    bindKey(keyInfo: string, fn: Function): void;
    /**
     * 判断按键是否已经注册
     * @param keyInfo
     * @returns
     */
    isKeyRegistered(keyInfo: string): boolean;
    /**
     * 获取按键绑定的函数
     * @param keyInfo
     * @returns
     */
    getKeyBinding(keyInfo: string): Function;
    /**
     * 解绑按键 , 请使用小写的 unbind 代替 unBind
     * @deprecated
     * */
    unBind(keyInfo: string): void;
    /**
     * 解绑按键
     * @param {String} keyInfo 例如"Control+a" 、"Meta+a"、 ”G" 、”Shift+1“
     * */
    unbind(keyInfo: string): void;
    /**
     * 指定的单个键是否按下
     * @param {String} keyInfo
     * @returns {Boolean}
     */
    isKeydown(keyInfo: string): boolean;
    sendKey(keyStr: string, event: any): void;
    isMouseOnInputDomElement(): boolean;
    fireKey(keyArray: any, event: any, isMouseOn: any): void;
    keydownHandler(event: KeyboardEvent): void;
    keyupHandler(event: KeyboardEvent): void;
    init(): void;
}
export { Keyboard as default };
