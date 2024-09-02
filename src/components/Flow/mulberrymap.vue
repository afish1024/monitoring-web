<template>
    <div id="mulberrymapPie1" ></div>
</template>
<script setup name="mulberrymapPie">
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
        let Echarts = echarts.init(document.getElementById('mulberrymapPie1'))
		
        let yData = [0.5, 8, 5, 1, 4, 6];
        const option = {
  series: {
    type: 'sankey',
    layout: 'none',
    emphasis: {
      focus: 'adjacency'
    },
    data: [
      {
        name: 'a'
      },
      {
        name: 'b'
      },
      {
        name: 'a1'
      },
      {
        name: 'a2'
      },
      {
        name: 'b1'
      },
      {
        name: 'c'
      },
       {
        name: 'd'
      }
    ],
    links: [
      {
        source: 'a',
        target: 'a1',
        value: 5
      },
      {
        source: 'a',
        target: 'a2',
        value: 3
      },
      {
        source: 'b',
        target: 'b1',
        value: 8
      },
      {
        source: 'a',
        target: 'b1',
        value: 3
      },
      {
        source: 'b1',
        target: 'a1',
        value: 1
      },
      {
        source: 'b1',
        target: 'c',
        value: 2
      },
       {
        source: 'd',
        target: 'a2',
        value: 3
      },
    ]
  }
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