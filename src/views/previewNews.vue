<template>
  <div>
    <el-button @click="emit('goback')">返回</el-button>
    <span v-if="mainStore.htmlString" v-html="mainStore.htmlString"></span>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../pinia/main'
const mainStore = useStore()
const emit = defineEmits(['goback'])
</script>

<style scoped>

</style>