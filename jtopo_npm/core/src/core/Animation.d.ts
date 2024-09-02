import { PointLike } from "./jtopo_type";
export type EasingNames = 'easeLinear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';
export type AnimationFrameData = number | Array<number | PointLike>;
export type AnimationOption = {
    name?: string;
    from: AnimationFrameData;
    to: AnimationFrameData;
    duration?: number;
    update: Function;
    onEnd?: Function;
    effect?: EasingNames;
    times?: number;
    delay?: number;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | 'normal';
};
/**
 * 一般通过AnimationSystem来创建实例
```js

// 通常调用animationSystem的anime来创建
let animation = new Animation(from, to, duration, updateFunction);

// 设置属性...
animation.effect = 'easeOutBounce';

// 播放
animation.play();

// play() 返回一个Promise对象
animation.play().then(function(){
    // 播放结束后的处理
});

// 暂停
animation.pause();

// 取消
animation.cancel();


```
 */
export declare class Animation {
    /** 名称 */
    name?: string;
    /**@protected */
    system: AnimationSystem;
    /** 初始数据集 */
    from: AnimationFrameData;
    /** 结束数据集 */
    to: AnimationFrameData;
    currentTime: number;
    /** 开始时间 */
    startTime: number;
    /** 持续时间 */
    duration: number;
    /**
     * 设置动画开始之前的延迟时间，默认为 0
     */
    delay: number;
    /**
     * 运动方向（animation-direction）
    --normal 是正常运动

    --reverse 反向运动

    --alternate 运动完后，动画返回

    --alternate-reverse 反向运动完后，动画返回
     */
    direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    /**
     * 动画填充模式（animation-fill-mode）
    --none 默认值，动画执行完毕后回到初始位置

    --forwards 动画执行完毕后停止在结束位置

    --backwards 动画执行时，在延迟状态时就会转变为开始状态，而仅仅延迟时，只有运行开始时，才会变为开始状态
     */
    private fillMode;
    /**
     * 能够返回并设置一个可枚举值来描述一个动画的回放状态。
     */
    playState: 'idle' | 'pending' | 'running' | 'paused' | 'finished';
    /** 每一帧执行的动作函数 */
    action: Function;
    isPause: boolean;
    finished: boolean;
    delayed: boolean;
    /**
     *重复次数（animation-iteration-count），默认1
        --可设置数值如： 5
        --也可设置为无限次: Infinity
     */
    times: number;
    /**
     * 已经播放了多少次
     */
    playedTimes: number;
    /**@protected */
    stepAction: Function;
    /** 结束时的回调函数 */
    onEnd?: Function;
    private resolve;
    private reject;
    private promise;
    effect: EasingNames;
    /**
     * start 、end 可以是数字，也可以是包含数字的数组
     * <pre>
     * 创建实例时start、end、time、action参数可以为空， 但是调用play()方法之前要确保都已经被赋过值。
     * </pre>
     * @param from
     * @param to
     * @param duration 动画事件
     * @param action 动画每一帧回调函数
     */
    constructor(from?: AnimationFrameData, to?: AnimationFrameData, duration?: number, action?: Function);
    /**
     * @param from
     * @param to
     * @param duration
     * @param action
     */
    set(from: AnimationFrameData, to: AnimationFrameData, duration: number, action?: Function): this;
    /**
     * 设置开始数据
     * @param from 结束数据
     * @returns self
     */
    setFrom(from: AnimationFrameData): this;
    /**
     * 设置结束数据
     * @param end 结束数据
     */
    setTo(end: AnimationFrameData): this;
    /**
     * 设置时间, 再次调用play时生效
     * @param duration
     */
    setDuration(duration: number): this;
    /**
     * 设置动画每一帧的回调函数
     * @param action
     */
    onUpdate(action: Function): this;
    /**
     * 取消
     * @returns
     */
    cancel(): this;
    /**
     * 暂停
     * @returns {Animation} self
     */
    pause(): this;
    /**
     * 继续，从暂停处继续, 改成？resume
     * @returns {Animation} self
     */
    continue(): this;
    /**
     * 如果没有执行动作就返回false
     * @param now
     * @protected
     * @returns
     */
    tick(now: number): boolean;
    /**
     * 开始
     * @return {Promise} 自身
     */
    play(): Promise<any>;
    private _getTickAction;
}
/**
 * 动画系统
 *
```js

// 使用动画系统
let animationSystem = stage.animationSystem;

// 创建一个动画实例：模拟掉落 (节点从当前高度往下掉落200个像素)
let animation = animationSystem.anime({
    // node的当前高度
    from: node.y,

    // node当前高度向下 200像素
    to: node.y + 200,

    // 动画动作
    update: (n) => {
        node.y = n;
    },

    // 动画效果-缓动（有弹性的感觉）
    effect: 'easeOutBounce',

    // 动画时间
    duration: 2000,
});

// 播放
animation.play();

```
 */
export declare class AnimationSystem {
    animations: Array<Animation>;
    constructor();
    /**@protected */
    add(a: Animation): void;
    /**@protected */
    remove(a: Animation): void;
    /** 取消所有动画 */
    cancelAll(): void;
    /**@protected */
    tick(now: number): boolean;
    /**
     * 生成一个动画实例
     * @param opt
     * @returns
     */
    anime(opt: AnimationOption): Animation;
}
