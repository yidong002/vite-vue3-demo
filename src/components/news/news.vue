<!-- 新建咨询 -->
<template>
  <div class="edit-wrap">
    <toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode">
    </toolbar>
    <editor style="height: 400px;overflow-y: hidden" v-model="editorValue" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated"></editor>
  </div>
  <MaterialLib v-model:visiable="visiable" @checkImage="(url) => insertImage(url)"/>
</template>

<script lang="ts" >
import { defineComponent, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { Toolbar, Editor } from "@wangeditor/editor-for-vue";
import MaterialLib from '../MaterialLib/index.vue'
// 引入 wangeditor5 样式
import '@wangeditor/editor/dist/css/style.css'
import { IToolbarConfig } from "@wangeditor/editor";
import registerMenu from "./newsEvent/index";
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'News',
  props: {
    modelValue: {
      default: ''
    },
    maxWidth: {
      default: '80%'
    },
  },
  emits: ['update:modelValue', 'ImageMenuClick', 'VideoMenuClick'],
  components: { Toolbar, Editor, MaterialLib },
  setup(props:any, { emit }) {
    // 定义变量
    const mode = ref('default');
    const editorRef = shallowRef();
    const editorValue = ref();
    const visiable = ref(false);
    const toolbarConfig: Partial<IToolbarConfig> = { // 工具栏配置
      excludeKeys: [
        "group-image", // 图片上传：本地上传+网络图片
        "group-video", // 视频上传：本地上传+网络视频
        "fullScreen"
      ]
    }

    const editorConfig = { // 编辑器配置
      placeholder: '请输入内容...'
    }
    // 生命周期钩子函数
    onMounted(() => {
      editorValue.value = ''  // 这里可以设置编辑器内容。但是无法设置富文本信息。需要用setHtml
    })

    onBeforeUnmount(() => { // 当离开后，销毁编辑器实例
      const editor = editorRef.value;
      if (editor == null) {
        return;
      }
      editor.destroy();
    })

    // 触发事件
    // 当编辑器创建的时候
    const handleCreated = (editor: any) => {
      editorRef.value = editor;// 记录编辑器实例
      registerMenu(editorRef.value, toolbarConfig); // 注册自定义菜单。这个是5.4那边声明的
      initMediaMenuEvent(); // 注册自定义菜单点击事件
    }
    // 事件监听
    const initMediaMenuEvent = () => {
      const editor = editorRef.value;
      editor.on('ImageMenuClick', () => {
        visiable.value = true
        // emit('ImageMenuClick')
      });
      editor.on('VideoMenuClick', () => {
        // 你点击了视频菜单
        if(visiable.value) {
          ElMessage({
            type: 'info',
            message: '请先关闭图片库'
          })
        } else {
          visiable.value = true
          
        }
        emit('VideoMenuClick')
      });
    }
    // 图片插入富文本中
    const insertImage = (url: string) => {
      editorRef.value.insertNode({
        type: 'image',
        src: url,
        children: [{ // 该字段必须要
          text: ''
        }]
      })
    }
    // 视频插入富文本中
    const insertVideo = (url: string) => {
      editorRef.value.insertNode({
        type: 'video',
        src: url,
        poster: "", // 如果有则填入
        children: [{
          text: ''
        }]
      })
    }
    // 变量监听
    // 监听父组件传递的值
    watch(() => props.modelValue, (newVal) => {
      editorValue.value = newVal
    })
    // 监听编辑器内容
    watch(() => editorValue.value, (newVal) => {
      emit('update:modelValue', newVal)
    })

    return {
      mode,
      editorRef,
      editorValue,
      visiable,
      toolbarConfig,
      editorConfig,
      handleCreated,
      insertImage,
      insertVideo,
      maxWidth: props.maxWidth
    }
  }
})
</script>

<style scoped>
.edit-wrap {
  width: v-bind(maxWidth);
  border: 1px solid #ccc
}
</style>