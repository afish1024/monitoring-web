// import { Boot } from '@wangeditor/editor'
import bus from "./bus"
// 定义菜单 class
class MyButtonMenu {
    title = "HTML";
    iconSvg = ``;
    tag = "button";
    //showModal = true;
    //modalWidth = window.innerWidth * 0.6;
    $content = null;
    // eslint-disable-next-line no-unused-vars
    getValue(editor) {
        // 用不到 getValue
        return "";
    }
    isActive() {
        return false;
    }
    isDisabled() {
        return false;
    }
    // eslint-disable-next-line no-unused-vars
    async exec(editor, value) {
        bus.emit('html',18)
    }
    // eslint-disable-next-line no-unused-vars
    getModalPositionNode(editor) {
        return null;
    }
    // eslint-disable-next-line no-unused-vars
    getModalContentElem(editor) {

        const $content = document.createElement("div");
        this.$content = $content
        return $content
    }
}


// 定义菜单配置
export const menu4Conf = {
  key: 'menu4', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new MyButtonMenu()
  },
}
Boot.registerMenu(menu4Conf)

