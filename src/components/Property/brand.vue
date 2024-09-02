<template>
	
	<div id="brandPie"></div>
       
</template>


<script setup name="brandPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
  import assetApi from '@/api/biz/assetApi'
  const chartData = ref({})
    let getData= () => {
		return assetApi.brand().then((data) => {
        console.log(data)
        chartData.value = data.list
  
        chartTrend();
		})
	}

    let chartTrend = () => {
        let Echarts = echarts.init(document.getElementById('brandPie'))
		const option = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} '
      },
      legend: {
            orient: 'vertical',
            right: 'right',
            type: 'scroll',
            orient: 'vertical',
      },
      color:['#3698d7','#5cd5e2','#fbda61','#fda784','#eb72ae','#ecc8f3','#94a1f4','#7d8ae5','#95baf9','#44a1d3','#3598d7'],
  series: [
    {
      name: '',
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
      grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
      data:chartData.value
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