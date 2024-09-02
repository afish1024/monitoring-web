import EventTarget from "./EventTarget";
/**
 * 资源相关（加载）
 */
declare class ResourceSystem extends EventTarget {
    w: any;
    lastResource: any;
    hasLoaded: any;
    imageCache: Map<string, Object>;
    callbackCache: Map<string, Array<any>>;
    allLoadedResolve: any;
    constructor();
    /**
     * 等待当前加载队列里的所有资源加载完成
     * @returns
     */
    whenAllLoaded(): Promise<HTMLImageElement | HTMLCanvasElement>;
    /**
     * 当所有图片加载完成
     * @param imgUrls
     * @param showLog
     * @returns
     */
    whenAllImagesLoaded(imgUrls: string[], showLog?: boolean): Promise<unknown[]>;
    /**
     * 缓存可以极大提升图片加载速度
     *
     * 特殊情况下才有可能调用该方法来清空缓存
     */
    clearCache(): void;
    cancelCallback(fn: any): void;
    onload(imageOrUrl: string, imageOrCanvas: any): void;
    private addToCallbackList;
    loadImage(imageOrUrl: string, callback: Function | any, errorCallback?: Function | any): void;
}
export declare const ResourceLoader: ResourceSystem;
export { ResourceLoader as default };
