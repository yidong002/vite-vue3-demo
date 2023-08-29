<template>
  <div>
    第一列类型： <input type="text" @change="onChange($event, 0)">
    第一列类型： <input type="text" @change="onChange($event, 1)">
    第一列类型： <input type="text" @change="onChange($event, 2)">
    第一列类型： <input type="text" @change="onChange($event, 3)">
    第一列类型： <input type="text" @change="onChange($event, 4)">
    第一列类型： <input type="text" @change="onChange($event, 5)">
    <div ref="echartsRef" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, reactive } from 'vue';

const echartsRef = ref(null);
const state = reactive({
  option: {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    // xAxis: {type: 'category'},
    xAxis: [
      { type: 'category', gridIndex: 0 },
      { type: 'category', gridIndex: 1 }
    ],
    grid: [{ bottom: '55%' }, { top: '55%' }],
    yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
    dataset: {
      source: [
        ['product', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 96.7],
        ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 39.2],
        ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 92.3],
        ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 34.5]
      ]
    },
    series: [{ type: 'bar', seriesLayoutBy: 'row' }, { type: 'line', xAxisIndex: 1, yAxisIndex: 1 }, { type: 'scatter' }, { type: 'line' }, { type: 'line' }, { type: 'line' }]
  }
})

const initEcharts = () => {
  const myChart = echarts.init(echartsRef.value);
  myChart.setOption(state.option);
};

const onChange = (e: any, index: number) => {
  state.option.series[index].type = e.target.value;
  initEcharts()
};

onMounted(() => {
  initEcharts();
})

</script>

<style scoped>
input {
  border: 2px solid #ccc;
}
</style>