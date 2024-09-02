import { SerializedDisplayObject, SerializedJson } from './jtopo_type';
import { DisplayObject } from './DisplayObject';
export declare function jsonToObjects(json: SerializedJson, existObjectMap?: Map<number, DisplayObject>): any[];
export declare function serializersToDisplayObject(json: SerializedDisplayObject, obj: DisplayObject): DisplayObject;
export declare function newInstance(className: any, init?: any): any;
