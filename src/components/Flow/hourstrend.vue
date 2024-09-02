<template>
	<div id="hoursPie"></div>
</template>
<script setup name="hourstrend">

  import { onMounted } from 'vue'
	import * as echarts from 'echarts'
  import flowApi from '@/api/biz/flowApi'
  const inflow = ref([])
  const outflow = ref([])
  const xAxisData = ref([])
  let getData= () => {
        xAxisData.value = [];
        return flowApi.flowTrend().then((data) => {
          
            inflow.value = data.inflow
            outflow.value = data.outflow
            xAxisData.value = data.runningTime
            chartTop();
        })
    
  }
  onMounted(() => {
      getData();
  })

  let chartTop = () => {
    const option = {
          textStyle: {
                color: '#48a1a8'
          },
          legend: {
              data: ['流入流量', '流出流量'],
              textStyle: {
                  color: '#FFF'  
              },
              right: '5%',
              top: '8%', // 图例垂直居上
          },
          grid: {
              show:false,
              top:'80px',
              left: '3%',
              right: '0%',
              containLabel: true
          },
          color:['#48a1a8','#003ef1'], 
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData.value,
              axisLabel: {
                  fontSize: 16,
                  color:'#FFF'
              },
          },
          yAxis: {
              name:'单位/KB',
              type: 'value',
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed',
                      color:'#211b45',
                  }
              }
          },
          series: [
              {
              name: '流入流量',
              data: inflow.value,
              type: 'line',
              smooth: true,
              showSymbol: false,
              lineStyle: {   // 设置线条样式
                  width: 3   // 设置线条宽度为2像素
              },
              center:['50%','80%'],
              areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#1f5f6a'
                    },
                    {
                      offset: 1,
                      color: '#100b2b'
                    }
                  ])
                },
              },
              {
                  name: '流出流量',
              data: outflow.value,
              type: 'line',
              smooth: true,
              showSymbol: false,
              lineStyle: {   // 设置线条样式
                  width: 3   // 设置线条宽度为2像素
              },
              center:['50%','80%'],
              areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#1f5f6a'
                    },
                    {
                      offset: 1,
                      color: '#100b2b'
                    }
                  ])
                },
              }
          ]
      };

          let Echarts = echarts.init(document.getElementById('hoursPie'))
    
          // 绘制图表
          Echarts.setOption(option)
          // 自适应大小
          window.onresize = () => {
            Echarts.resize()
          }


  }   
</script>
<style lang="less" scoped>
</style>