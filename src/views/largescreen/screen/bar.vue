<template>
	<div :id="props.chartId"></div>
</template>
<script setup name="barChart">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
    chartId:{
        type:String,
        required:true
    },
    smsnumber:{
        type:Object,
    },
    maintenancenum:{
      type:Object,
    }
})
console.log(props.smsnumber)
if(props.chartId == 'DX'){
  var option = {
    legend: {
      textStyle: {
          color: '#8d9aad'
      }
    },
    tooltip: {},
    dataset: {
      source: [
      //   ['product', '报警值', '预警值'],
      //   ['08-1', 43, 85],
      //   ['08-2', 83, 73],
      //   ['08-3', 86, 65],
      //   ['08-4', 72, 53]
      ]
    },
    xAxis: { 
      type: 'category',
      axisLine: {
          lineStyle: {
              color: "#163a72",
          }
      },
      axisLabel: {
          color: "#8d9aad",
      },
      axisTick: {
          show: false,
      },
      data: props.smsnumber.X
  },
    yAxis: {
      type: 'value',
      splitLine: {
          show: true,
          lineStyle:{
              color: "#1b283e",
              type:'dashed' //设置网格线类型 dotted：虚线 solid:实线
          },
      },
      axisLabel: {
          formatter: '{value}   '
      },
      axisLine: {
          lineStyle: {
              color: "#8d9aad",
          }
      },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        { 
          type: 'bar',
          name:'报警值',
          barWidth:'20%',
          // emphasis: {
          //     focus: 'series'
          // },
          itemStyle : {
                normal : {
                    label : {
                      show: true,
                        position : 'top',
                        color:'#61aff1',
                    },
                    
                }
            },
          data: props.smsnumber.number
        },
        { 
          type: 'bar',
          name:'预警值',
          barWidth:'20%',
          // emphasis: {
          //     focus: 'series'
          // },
          itemStyle : {
                normal : {
                    label : {
                      show: true,
                        position : 'top',
                        color:'#6ae892',
                    },
                    
                }
            },
          data: props.smsnumber.earlynumber
        }
      ]
  };
}else{
  var option = {
    legend: {
      textStyle: {
          color: '#8d9aad'
      }
    },
    tooltip: {},
    dataset: {
      source: [
      //   ['product', '报警值', '预警值'],
      //   ['08-1', 43, 85],
      //   ['08-2', 83, 73],
      //   ['08-3', 86, 65],
      //   ['08-4', 72, 53]
      ]
    },
    xAxis: { 
      type: 'category',
      axisLine: {
          lineStyle: {
              color: "#163a72",
          }
      },
      axisLabel: {
          color: "#8d9aad",
      },
      axisTick: {
          show: false,
      },
      data: props.maintenancenum.X
  },
    yAxis: {
      type: 'value',
      splitLine: {
          show: true,
          lineStyle:{
              color: "#1b283e",
              type:'dashed' //设置网格线类型 dotted：虚线 solid:实线
          },
      },
      axisLabel: {
          formatter: '{value}   ',
          // fontSize:9,
      },
      axisLine: {
          lineStyle: {
              color: "#8d9aad",
          }
      },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        { 
          type: 'bar',
          name:'报警值',
          barWidth:'20%',
          // emphasis: {
          //     focus: 'series'
          // },
          itemStyle : {
                normal : {
                    label : {
                      show: true,
                        position : 'top',
                        color:'#61aff1',
                    },
                    
                }
            },
          data: props.maintenancenum.maintenanceReportNumber
        }, 
        { 
          type: 'bar',
          name:'预警值',
          barWidth:'20%',
          // emphasis: {
          //     focus: 'series'
          // },
          itemStyle : {
                normal : {
                    label : {
                      show: true,
                        position : 'top',
                        color:'#6ae892',
                    },
                    
                }
            },
          data: props.maintenancenum.maintenanceEarlynumber
        }
      ]
  };
}

onMounted(() => {
    let Echarts = echarts.init(document.getElementById(props.chartId))

    // 绘制图表
    Echarts.setOption(option)
    // 自适应大小
    window.onresize = () => {
        Echarts.resize()
    }
})
</script>