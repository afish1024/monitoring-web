<template>
	<div :id="props.nameid"></div>
</template>
<script setup name="BarAlarm">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
        dataX:{
            type:Array,
            default:()=>['掉线','严重','主要','次要','未知']
        },
        dataY:{
            type:Array,
            default:()=>[120, 200, 150, 80, 70, 110, 130
                // {
                //     data: [120, 200, 150, 80, 70, 110, 130],
                //     type: 'bar',
                //     barWidth:'10%',
                //     itemStyle: {
                //         color:'#1daafa',
                //         borderRadius:[8,8,0,0]
                //     },
                //     // label: {
                //     //     show: true,
                //     //     formatter: (params) => params.value
                //     // },
                //     // name: '次要'
                // }
            ]
        },
        nameid:{
            type:String,
            default:()=>'BarAlarm'
        },
        colorString:{
            type:String,
            default:()=>'#1daafa'
        }
    })
    const zoomData=[  // 有滚动条 平移
      {
          type: 'slider',
          realtime: true,
          start: 0,
          end: 50,  // 初始展示40%
          height: 4,
          fillerColor: "#eee", // 滚动条颜色
          borderColor: "#eee", 
          handleSize:0, // 两边手柄尺寸
          showDetail: false, // 拖拽时是否展示滚动条两侧的文字
          top:'96%',
          
          // zoomLock:true, // 是否只平移不缩放
          // moveOnMouseMove:true, //鼠标移动能触发数据窗口平移
          // zoomOnMouseWheel :true, //鼠标移动能触发数据窗口缩放
      },
      { 
        type: "inside",  // 支持内部鼠标滚动平移
        start: 0,
        end: 40,
        zoomOnMouseWheel: false,  // 关闭滚轮缩放
        moveOnMouseWheel: true, // 开启滚轮平移
        moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移 
      }
  ]
    var series = [
    {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        stack: 'a',
        barWidth:'20%',
        itemStyle: {
            color:'#fac748'
        },
        // label: {
        //     show: true,
        //     formatter: (params) => params.value
        // },
        name: '次要'
    },
    {
        data: [10, 46, 64, 0, 0, 0, 0],
        type: 'bar',
        stack: 'a',
        barWidth:'20%',
        itemStyle: {
            color:'#fd9560'
        },
        // label: {
        //     show: true,
        //     formatter: (params) => params.value
        // },
        name: '主要'
    },
    {
        data: [30, 0, 0, 20, 10, 0, 0],
        type: 'bar',
        stack: 'a',
        barWidth:'20%',
        itemStyle: {
            color:'#ea3445'
        },
        // label: {
        //     show: true,
        //     formatter: (params) => params.value
        // },
        name: '严重'
    },
    {
        data: [30, 0, 0, 20, 10, 0, 0],
        type: 'bar',
        stack: 'a',
        barWidth:'20%',
        itemStyle: {
            color:'#9ea5b5'
        },
        name: '掉线'
    },
    {
        data: [30, 0, 0, 20, 10, 0, 0],
        type: 'bar',
        stack: 'a',
        barWidth:'20%',
        itemStyle: {
            color:'#8d79ec'
        },
        // label: {
        //     show: true,
        //     formatter: (params) => params.value
        // },
        name: '未知'
    }, 
    ];
    const stackInfo = {};
    for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
        const stackName = series[j].stack;
        if (!stackName) {
        continue;
        }
        if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
            stackStart: [],
            stackEnd: []
        };
        }
        const info = stackInfo[stackName];
        const data = series[j].data[i];
        if (data && data !== '-') {
        if (info.stackStart[i] == null) {
            info.stackStart[i] = j;
        }
        info.stackEnd[i] = j;
        }
    }
    }
    for (let i = 0; i < series.length; ++i) {
    const data = series[i].data;
    const info = stackInfo[series[i].stack];
    for (let j = 0; j < series[i].data.length; ++j) {
        // const isStart = info.stackStart[j] === i;
        const isEnd = info.stackEnd[j] === i;
        const topBorder = isEnd ? 20 : 0;
        const bottomBorder = 0;
        data[j] = {
        value: data[j],
        itemStyle: {
            normal: {
                    borderColor:'#fff',
                    borderWidth: 2,
                    
                }
            //borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
        }
        };
    }
    }
	onMounted(() => {
		let Echarts = echarts.init(document.getElementById(props.nameid))
		const option = {
            // dataZoom: zoomData,
            tooltip: {
                trigger: 'axis'
                
            },
            legend: {
                // data: ['掉线','严重','主要','次要','未知']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: props.dataX,
                axisLabel: {
                    rotate: 35,//35度角倾斜显示
                },
                },
                yAxis: {
                    type: 'value'
                },
            series: {
                    data:  props.dataY,
                    type: 'bar',
                    barWidth:'10%',
                    itemStyle: {
                        color:'#1daafa',
                        borderRadius:[8,8,0,0]
                    },
                    // label: {
                    //     show: true,
                    //     formatter: (params) => params.value
                    // },
                    // name: '次要'
                }
        };
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>

<style scoped></style>
