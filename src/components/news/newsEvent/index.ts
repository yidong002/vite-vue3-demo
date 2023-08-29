import ImageMenu from "./ImageMenu";
import VideoMenu from "./VideoMenu";
import { IDomEditor, IToolbarConfig, Boot, IModuleConf } from "@wangeditor/editor";

const MenusList = [
  {
    key: 'ImageMenu',
    class: ImageMenu,
    index: 22 // 菜单要在工具栏显示的位置
  },
  {
    key: 'VideoMenu',
    class: VideoMenu,
    index: 23 // 菜单要在工具栏显示的位置
  },
]
const registerMenu = function (editor: IDomEditor, toolbarConfig: Partial<IToolbarConfig>) {
  const allRegisterMenu = editor.getAllMenuKeys(); // 获取所有已注册的菜单
  let keys = [];
  for (let item of MenusList) {
    if (allRegisterMenu.indexOf(item.key) < 0) { // 如果未注册，则注册
      const menuObj = {
        key: item.key,
        factory() {
          return new item.class()
        }
      }
      Boot.registerMenu(menuObj);
    }
    keys.push(item.key)
  }
  toolbarConfig.insertKeys = {
    index: MenusList[0].index,
    keys: keys
  }
}

export default registerMenu