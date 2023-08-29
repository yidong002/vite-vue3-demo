<template>
  <el-dialog :title="props.title" v-model="visiableModal" width="50%" :close-on-click-modal="false"
    :close-on-press-escape="false" :show-close="true" @close="emit('update:visiable', false)">
    <div class="material-lib--wrap">

      <div class="wrap--left">
        <ul>
          <li v-for="item in list" :key="item.value" @click="handleGroup(item)">
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="wrap--right">
        <ul>
          <li v-for="child in children" :key="child.value">
            <img :src="child.url" alt="" @click="() => selected = child.url" />
            <span>{{ child.label }}</span>
          </li>
        </ul>
      </div>
    </div>

    <template #footer v-if="children.length">
      <el-button @click="comfirm">确定</el-button>
    </template>

  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from "vue";
type Item = {
  label: string,
  value: string,
  type: number,
  url: string
}
const emit = defineEmits(["checkImage", 'update:visiable']);
const props = defineProps({
  visiable: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "素材库",
  },
});
// 创建一个数组，label为显示的名称，value为对应的值，type为类型，1为文件夹，2为文件
// 内容：最近使用、公共图片库、我的图片、未分组、6月份图片
const state = reactive({
  list: [
    {
      label: "最近使用",
      value: "recently",
      type: 1,
    },
    {
      label: "公共图片库",
      value: "public",
      type: 1,
    },
    {
      label: "我的图片",
      value: "my",
      type: 1,
    },
    {
      label: "未分组",
      value: "unGroup",
      type: 1,
    },
    {
      label: "6月份图片",
      value: "June",
      type: 1,
    },
  ],
  children: <Item[]>[],
});
// 选中分组时触发
const handleGroup = (item: any) => {
  /**
   * 选中分组时模拟请求分组下的图片
  */

  new Promise((resolve, reject) => {
    setTimeout(() => {
      let arr = <Item[]>[];
      for (let i = 0; i < 10; i++) {
        arr.push({
          label: "图片" + i,
          value: "img" + i,
          type: 2,
          url: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
        });
      }
      resolve(arr)
    }, 1000)
  }).then((res: any): void => {
    state.children = <Item[]>[...res]
  })

};
const visiableModal = ref(props.visiable);
watch(() => props.visiable, (val) => {
  visiableModal.value = val
})
// 选中的图片
const selected = ref(<String>'');
const comfirm = (): void => {
  emit('update:visiable', false)
  emit("checkImage", selected.value);
}
const { list, children } = toRefs(state);
</script>

<style scoped>
.material-lib--wrap {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;

}

.wrap--left {
  width: 200px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
}

.wrap--right {
  flex: 1;
}

.wrap--right ul li {
  width: 80px;
  height: 80px;
  margin: 10px;
}

.wrap--right ul {
  display: flex;
  flex-wrap: wrap;
}
</style>