<template>
	<div id="pie"></div>
</template>
<script setup name="pieChart">
    import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //     // orient : 'vertical',
        //     // x : 'left',
        //     data:['logicadGroupc 1','交换机'],
        //     textStyle: {
        //         color:'#fff'
        //     }
            
        // },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        series : [
            {
                name:'',
                type:'pie',
                selectedMode: 'single',
                radius : [0, 65],
 
                // for funnel
                // x: '62.5%',
                // width: '40%',
                funnelAlign: 'right',
                avoidLabelOverlap:true,
                // max: 1548,
                itemStyle : {
                    normal : {
                        label : {
                            position : 'inner',
                            color:'#fff',
                        },
                        labelLine : {
                            show : false
                        }
                    }
                },
                data:[
                    {value:335, name:'告警',itemStyle: { color: '#ff7711' }},
                    {value:679, name:'预警',itemStyle: { color: '#ff7711' }},
                    // {value:1548, name:'搜索引擎'}
                ]
            },
            {
                name:'当天告警统计',
                type:'pie',
                radius : [80, 100],
 
                // for funnel
                // x: '60%',
                // width: '45%',
                funnelAlign: 'left',
                // max: 1048,
                itemStyle : {
                    normal : {
                        label : {
                            color:'#fff',
                        },
                    }
                },
                //设置指示线样也可以单独放到data的花括号里面设置
                // labelLine:{//指示线样式设置
                //     normal: {
                //         length: 40,//设置指示线的长度
                //         lineStyle: {
                //             color: "#000"  // 设置标示线的颜色
                //         }
                //     }
			    // },
                data:[
                   {value:335, name:'logicadGroupc 1',itemStyle: { color: '#00ddee' }},
                    // {value:310, name:'邮件营销'},
                    // {value:234, name:'联盟广告'},
                    // {value:135, name:'视频广告'},
                    // {value:1048, name:'百度'},
                    // {value:251, name:'谷歌'},
                    // {value:147, name:'必应'},
                    {value:102, name:'交换机',itemStyle: { color: '#00ee55' }}
                ]
            }
        ]
    };
    onMounted(() => {
		let Echarts = echarts.init(document.getElementById('pie'))

		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>