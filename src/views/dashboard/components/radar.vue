<template>
  <div>
    <div id="main" style="width:500px;height:500px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      option: {
        title: {
          text: '人力资源基础绩效图'
        },
        legend: {
          data: ['小慕', '小牧']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 6500 },
            { name: '工资', max: 16000 },
            { name: '社保', max: 30000 },
            { name: '工作效率', max: 38000 },
            { name: '知识分享', max: 52000 },
            { name: '代码行数', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: '小牧'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '小慕'
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    this.option && myChart.setOption(this.option)
  }
}
</script>

<style></style>
