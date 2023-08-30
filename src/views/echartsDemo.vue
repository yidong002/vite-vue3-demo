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
    xAxis: { type: 'category' },
    // xAxis: [
    //   { type: 'category', gridIndex: 0 },
    //   { type: 'category', gridIndex: 1 }
    // ],
    // grid: [{ bottom: '17.5%' }, { top: '0%' }],
    // yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
    yAxis: { type: 'value' },
    // dimension: [],
    // dataset: {
    //   source: [
    //     ['product', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
    //     ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 96.7],
    //     ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 39.2],
    //     ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 92.3],
    //     ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 34.5]
    //   ],
    // },
    // dataset: {
    //   source: [
    //     ['product', '2012', '2013'],
    //     ['Matcha Latte', 41.1],
    //     ['Milk Tea', 86.5],
    //     ['Cheese Cocoa', 24.1],
    //     ['Walnut Brownie', 55.2]
    //   ],
    // },
    // dataset: [
    //   {
    //     source: [
    //       ['product', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
    //       ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 96.7],
    //       ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 39.2],
    //       ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 92.3],
    //       ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 34.5]
    //     ],
    //   },
    // ],
    // series: [{ type: 'bar', seriesLayoutBy: 'row' }, { type: 'line' }, { type: 'scatter' }, { type: 'line' }, { type: 'line' }, { type: 'line' }]
    //   series: [{ type: 'bar', seriesLayoutBy: 'row'
    //  }, { type: 'line' }, { type: 'scatter' }, { type: 'line' }, { type: 'line' }, { type: 'line' }]
    dataset: [
      {
        source: [
          ['score', 'amount', 'product'],
          [89.3, 58212, 'Matcha Latte0'],
          [57.1, 78254, 'Milk Tea0'],
          [74.4, 41032, 'Cheese Cocoa0'],
          [50.1, 12755, 'Cheese Brownie0'],
          [89.7, 20145, 'Matcha Cocoa0'],
          [68.1, 79146, 'Tea0'],
          [19.6, 91852, 'Orange Juice0'],
          [10.6, 101852, 'Lemon Juice0'],
          [32.7, 20112, 'Walnut Brownie0']
        ],
      },
      {
        source: [
          ['score', 'amount', 'product'],
          [89.3, 58, 'Matcha Latte1'],
          [57.1, 78, 'Milk Tea1'],
          [74.4, 41, 'Cheese Cocoa1'],
          [50.1, 12, 'Cheese Brownie1'],
          [89.7, 26, 'Matcha Cocoa1'],
          [68.1, 79, 'Tea1'],
          [19.6, 91, 'Orange Juice1'],
          [10.6, 10, 'Lemon Juice1'],
          [32.7, 20, 'Walnut Brownie1']
        ],
      },
      {
        source: [
          ['product', 'score', 'name'],
          [89.3, 22222, 'Matcha Latte2'],
          [57.1, 33333, 'Milk Tea2'],
          [74.4, 44444, 'Cheese Cocoa2'],
          [50.1, 55555, 'Cheese Brownie2'],
          [89.7, 66666, 'Matcha Cocoa2'],
          [68.1, 77777, 'Tea2'],
          [19.6, 88888, 'Orange Juice2'],
          [10.6, 99999, 'Lemon Juice2'],
          [32.7, 56565, 'Walnut Brownie2']
        ]
      }
    ],
    series: [
      {
        datasetIndex: 1,
        type: 'bar',
        encode: {
          // 将 "amount" 列映射到 X 轴。
          x: 'product',
          // 将 "product" 列映射到 Y 轴。
          y: 'score'
        }
      },
      {
        datasetIndex: 2,
        type: 'line',
        encode: {
          // 将 "amount" 列映射到 X 轴。
          x: 'name',
          // 将 "product" 列映射到 Y 轴。
          y: 'product'
        }
      },
      {
        datasetIndex: 0,
        type: 'bar',
        encode: {
          // 将 "amount" 列映射到 X 轴。
          x: 'product',
          // 将 "product" 列映射到 Y 轴。
          y: 'score'
        }
      }
    ]
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

<style scoped>input {
  border: 2px solid #ccc;
}</style>