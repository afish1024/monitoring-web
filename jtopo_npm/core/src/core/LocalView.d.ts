import DisplayObject from "./DisplayObject";
import Stage from "./Stage";
export declare class LocalView {
    stage: Stage;
    object: DisplayObject;
    hideList: Array<DisplayObject>;
    mouseEnabledBak?: boolean;
    constructor(stage: Stage);
    enter(object: DisplayObject): void;
    quit(): void;
    getObject(): DisplayObject;
    getMouseXY(): any;
}
