<template>
	<div id="distribution"></div>
</template>
<script setup name="distribution">
  import { onMounted } from 'vue'
	import * as echarts from 'echarts'
  const props = defineProps({
        dataX:{
            type:Array,
            default:()=>[]
        },
        dataY:{
            type:Array,
            default:()=>[]
        }
    })
	let option = {
    tooltip: {
    trigger: 'item'
  },
   color: ['#40a7b6'],
  radar: {
    // indicator: [
    //   { name: '其它', max: 6500 },
    //   { name: 'CPU', max: 16000 },
    //   { name: 'Disk', max: 30000 },
    //   { name: 'Memory', max: 38000 },
    //   { name: 'Development', max: 52000 },
    //   { name: 'Marketing', max: 25000 }
    // ],
    indicator:props.dataX,
      splitLine: {
          show: false,
          lineStyle: {
              width: 1,
              color: "#21515e", // 设置网格的颜色
          },
      },

  },

  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
       
        {
          value: props.dataY,
          name: '近7日资源告警总量',
          areaStyle: {
            color: '#225561'
          }
        }
      ]
    }
  ]
};

	onMounted(() => {
		let Echarts = echarts.init(document.getElementById('distribution'))
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
       
	})
</script>