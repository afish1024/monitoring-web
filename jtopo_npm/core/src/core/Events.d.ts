export declare class EventBase {
}
export declare class NodeEvent {
    constructor();
}
export declare class LinkEvent {
    constructor();
}
export declare class LayerEvent {
}
export type StageEventType = "zoom";
export declare class StageEvent {
    type: StageEventType;
    constructor(type: StageEventType);
}
