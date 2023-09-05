<template>
  <div>
    <div ref="echartsRef" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, reactive } from 'vue';
import useMock from './useMock';

const { mockAxios } = useMock();

const echartsRef = ref(null);
const state = reactive({
  option: {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: <any []> []
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: <any> {
    type: 'category',
    boundaryGap: false,
    data:<any []> []
  },
  yAxis: {
    type: 'value'
  },
  dataset: <any> {source: <any []> []},
  series:<any []> []
}
})

const initEcharts = () => {
  mockAxios().then(res => {
    const { data } = res;
    // state.option.xAxis.data =<any []> [...new Set(data.map((item: any) => item.year))];
    // state.option.legend.data =<any []> [...new Set(data.map((item: any) => item.type))];
    // state.option.series = data.map((item: any) => ({
    //   name: item.type,
    //   type: 'line',
    //   stack: '总量',
    //   data: data.filter((i: any) => i.year === item.year).map((i: any) => i.sale)
    // }));
    state.option.xAxis = {type: 'category',};
    state.option.legend.data =<any []> [...new Set(data.map((item: any) => item.type))];
    state.option.dataset.source[0] = ['product',...new Set(data.map((item: any) => item.type))];
    let yearArr = [...new Set(data.map((item: any) => item.year))];
    let sourceArr = <any []>[];
    sourceArr = yearArr.map((i:any) => {
      return [i, ...data.filter((ii:any) => ii.year === i).map((ii:any) => ii.sale)]
    })
    state.option.dataset.source = [
      ...state.option.dataset.source,
      ...sourceArr
    ]
    data.forEach((item:any) => {
      if(state.option.series.every((i:any) => i.name !== item.type)) {
        state.option.series.push({
          name: item.type,
          type: 'line',
          stack: '总量',
        })
      }
    })
    const myChart = echarts.init(echartsRef.value);
    myChart.setOption(state.option);
  })
 
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