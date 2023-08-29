<script setup lang="ts">
import echartsDemo from './views/echartsDemo.vue';
// import News from './components/news/news.vue'
// import PreviewNews from './views/previewNews.vue'
// import { ref, watch } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
// import { useStore } from './pinia/main'
// const mainStore = useStore()
// const redApple = ():void => {
  // 直接写入修改state 里面的属性值
  // mainStore.mainTitle = '红苹果'
  // 通过$patch修改
  // mainStore.$patch({
  //   mainTitle: '红苹果'
  // })
  // 直接替换state
  // mainStore.$state = {mainTitle: '红苹果'}
// }

// const resetBtn = () => {
//   mainStore.$reset()
// }
// const htmlString = ref('')
// 监听htmlString的变化
// watch(() => htmlString.value, (newVal, oldVal) => {
//   mainStore.htmlString = newVal
// })
// const showPreview = ref(false)
// const submit = () => {
//   // 将htmlString 保存到pinia中
//   mainStore.$patch({
//     htmlString: htmlString.value
//   })
//   showPreview.value = true
// }
</script>

<template>
  <!-- <div class="main-app" v-if="!showPreview">
    <News v-model="htmlString"></News>
    <el-button @click="submit">保存</el-button>
  </div>
  <PreviewNews @goback="showPreview = !showPreview" v-else></PreviewNews> -->
  <echartsDemo></echartsDemo>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
