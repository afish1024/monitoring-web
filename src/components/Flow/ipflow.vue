<template>
    <div :id="props.nameid" ></div>
</template>
<script setup >
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		datalist:{
			type: Array,
			default: () =>[
				
			]
		},
    names:{
			type: Array,
			default: () =>[
			]
		},
		innerRadius:{
			type:String,
			default: () =>0.64
		},
		colorList:{
			type: Array,
			default: () =>['#5140b4', '#2d5e0a', '#ff7d18']
		},
		contentcolor:{
			type: Array,
			default: () =>''
		},
		pieStyle:{
			type: Array,
			default: () =>'#fff'
		},
		legend:{
			type: Array,
			default: () =>{
				
			}
		},
		nameid:{
			type:String ,
			default: () =>'BingZhuangTu07'
		}
	})
  
  
    let getData= () => {
        chartTop();
	  }
    const maxValue = Math.max(...props.datalist);
    const totalValues = [];
    for(let i = 0; i < props.datalist.length; i++) {
      totalValues[i] = maxValue+100
    }
    let chartTop = () => {

        let xlist = [];
        let xlist2 = [];
        let _this = this;
 
      var data = {
        name: props.names,
        value: props.datalist,
        totalValue: totalValues,
        color: [
          ['#f1805e', '#f5d68f'],
          ['#f1805e', '#f5d68f'],
          ['#f1805e', '#f5d68f'],
          ['#f1805e', '#f5d68f'],
          ['#f1805e', '#f5d68f'],
        ],
        colorList: []
      };
      let i = 0;
      let numList = [];
      for (let a = 0; a < data.name.length; a++) {
        if (i == 7) {
          i = 0;
        }
        data.colorList.push(data.color[i]);
        i++;
      }


        let Echarts = echarts.init(document.getElementById(props.nameid))
        
        const option = {
         grid: {
            left: 30,
            right: 60,
            top: 0,
            bottom: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {
              //去除网格线
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              //坐标轴线条相关设置(颜色等)
              show: false
            }
          },
          yAxis: {
            name: '',
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              //不显示刻度线
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#51D7FF',
                fontSize: 12,
                padding: [0, 5, 0, 0]
              }
            },
            data: data.name
          },
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function(params) {
                    
                    let colorList = data.colorList;
                    var colorItem = colorList[params.dataIndex];
                    return new  echarts.graphic.LinearGradient(
                      1,
                      0,
                      0,
                      0,
                      [
                        {
                          offset: 0,
                          color: colorItem[0]
                        },

                        {
                          offset: 1,
                          color: colorItem[1]
                        }
                      ],

                      false
                    );
                  }
                }
              },
              barWidth: 15, //---柱形宽度
              barCategoryGap: 94, //---柱形间距
              data: data.value,
              z: 1,
              zlevel: 2
            },
            {
              type: 'bar',
              barWidth: 15,
              barGap: '-100%',
              data: data.totalValue.map(function(item, index) {
                return {
                  value: item,
                  realValue: data.value[index],
                  color: data.colorList[index][0]
                };
              }),
              //每行数值
              label: {
                show: true,
                position: 'right',
                formatter: function(params) {
              
                  return params.data.realValue;
                },
                color: '#D9EAF5',
                fontSize: 12,
                padding: [0, 0, 0, 7]
              },
              itemStyle: {
                color: '#2c2a38' //默认格子颜色
              },
              z: 0,
              zlevel: 1
            },
            {
              // 分隔
              type: 'pictorialBar',
              itemStyle: {
                normal: {
                  color: '#020C1B'
                }
              },
              symbol: 'rect',
              symbolRepeat: 'fixed',
              symbolMargin: 2,
              symbolClip: true,
              symbolSize: [5, 18],
              data: data.totalValue,
              width: 2,
              z: 10,
              zlevel: 3
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