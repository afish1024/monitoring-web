<template>
	
	<div id="departmentPie"></div>
       
</template>


<script setup name="departmentPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import alerts from '@/api/alerts/alerts'
    const chartData = ref({})
    let getData= () => {
		// return alerts.sevenDaysAlarmTrendAnalysis().then((data) => {
      
        //     chartData.value = data
     
        //     chartTrend();
		// })

        chartTrend();
	}

    let chartTrend = () => {
        let Echarts = echarts.init(document.getElementById('departmentPie'))
		const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    right: 'right'
  },
  color:['#3698d7','#5cd5e2','#fbda61','#fda784','#eb72ae'],
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['60%', '50%'],
      avoidLabelOverlap: false,
      label: {
            position: 'center',
            show: true,
            formatter:() => {
                let str = 50+'\n'+ `总数`
                return str
            },
            color: '#333',
            lineHeight: 14,
            fontSize: 14,
        },
        emphasis: {
            show:false,
            label: {
                show: false,
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '行政部' },
        { value: 735, name: '技术部' },
        { value: 580, name: '研发部' },
        { value: 484, name: '研发二部' },
        { value: 300, name: '项目管理部' }
      ]
    }
  ]
};
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}

    }
    
	onMounted(() => {
        getData();
	})


</script>
<style lang="less" scoped>
</style>