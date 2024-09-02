<template>
	<div id="agreementoutflowPie"></div>
</template>
<script setup name="agreementoutflowPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import alerts from '@/api/alerts/alerts'
    const alarmCount = ref([])
    const deviceIP = ref([])
    let getData= () => {
		// return alerts.alertTop().then((data) => {
        //     alarmCount.value = data.alarmCount
        //     deviceIP.value = data.deviceIP
        //     chartTop();
		// })

        chartTop();
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById('agreementoutflowPie'))
		const   option = {
        color:['#0d9c87','#1ba5bc'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },

  series: [

    {
      name: 'Access From',
      type: 'pie',
      radius: ['60%', '54%'],
      labelLine: {
        length: 30
      },
      label: {
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            align: 'center'
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0
          },
          b: {
            color: '#4C5058',
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 33
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [3, 4],
            borderRadius: 4
          }
        }
      },
      data: [
        { value: 1048, name: 'Baidu' },
        { value: 10, name: 'Baidu2' },
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