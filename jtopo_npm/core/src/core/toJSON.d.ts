import { DisplayObject } from './DisplayObject';
import { Style } from './Style';
import { SerializedJson, SerializedDisplayObject } from './jtopo_type';
export declare function displayObjectsToJSON(displayObjectArr: Array<DisplayObject>, imgToBase64?: boolean): SerializedJson;
export declare function uniqueStyles(json: SerializedJson): void;
export declare function serializersToPojo(object: DisplayObject | Style, serializers: Array<string>, allwaysSerializers?: Array<string>): SerializedDisplayObject;
