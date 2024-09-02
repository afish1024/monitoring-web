/**
 * cavnas 设置字体只能通过一个 font 属性，
 *
 * 该类可以对font属性里的属性做细化操作，可以单独设置字体、字号、粗体、斜体
 *
```js
// 例如:
let fontStr = node.style.font;//'normal normal 10px sans-arial';
let fontInfo = new FontInfo(node.style.font);

fontInfo.setFamily('arial');
fontInfo.setSize('15px');
fontInfo.setBold('bold');
fontInfo.setItalic('normal');

target.css({
    font: fontInfo.toStyleFont() //->"bold normal 15px arial"
});

// 粗体、斜体切换
fontInfo.toogleBold();
fontInfo.toogleItalic();
```
 *
 */
export declare class FontInfo {
    boldWeight: string;
    italicWeight: string;
    size: string;
    family: string;
    constructor(fontStr: string);
    private parseFontDesc;
    getFontWeight(): string;
    /**
     * 设置字体权重
     * setFontWeight('bold')、setFontWeight('italic')
     * setFontWeight('bold normal')、setFontWeight('normal italic')、setFontWeight('bold italic')
     * @param weight 字体权重
     */
    setWeight(weight: string): void;
    setFamily(family: string): void;
    setSize(size: string): void;
    setBold(bold: string): void;
    setItalic(italic: string): void;
    toogleBold(): void;
    toogleItalic(): void;
    /**
     * 转换为符合canvas的样式字符串
     *
    * @returns
    */
    toStyleFont(): string;
}
