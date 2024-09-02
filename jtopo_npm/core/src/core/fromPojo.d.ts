import { SerializedDisplayObject, SerializedJson } from './jtopo_type';
import { DisplayObject } from './DisplayObject';
export declare function pojoToObjects(pojo: SerializedJson, objMap?: Map<number, DisplayObject>): any[];
export declare function serializersToDisplayObject(pojo: SerializedDisplayObject, obj: any): any;
export declare function newInstance(className: any, init?: any): any;
