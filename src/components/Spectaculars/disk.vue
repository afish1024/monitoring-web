<template>
	<div id="BasicBar"></div>
</template>
<script setup name="BasicBar">
	import { onMounted,ref  } from 'vue'
	import * as echarts from 'echarts'
    let tempData = ref({}) 
    let itemnames = ref({}) 
    const props = defineProps({
		diskData:Array,
	})
    const toRefStrHtml = toRef(props, "diskData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
    
	const duplicate1 = function(arr){
        tempData.value = {}
        itemnames.value = []
        for(let i = 0;i<arr.length;i++){
            itemnames.value.push(arr[i].itemname)
        }
        for(let i = 0;i<arr.length;i++){
           
            if(tempData.value[arr[i].itemname]){
                return true
            }else{
                tempData.value[arr[i].itemname] = +1
            }
            
        }
        return false
    } 
    let getDataCount= (arr, item) => {
        var count = 0;
        arr.forEach((elem)=>{
            if(item === elem){
                count++;
            }
        });
        return count;
    }


	let getData= (data) => {
        
        duplicate1(data)
    
        let bar_data = []
        let title = []
        let series = []
        for( let key in tempData.value){
            var resdata = 0
            for(let i = 0;i<data.length;i++){
                if(data[i].itemname == key){
                    resdata += data[i].value
                }
            }
            var datacount = getDataCount(itemnames.value,key)
           
            if(datacount != 1){
                resdata = resdata / datacount
            }
            key = key.replace(':','盘')
            title.push(key)
            bar_data.push(resdata.toFixed(2))
            series.push({
                name:key
            })
        }
		let Echarts = echarts.init(document.getElementById('BasicBar'))
	
        let option2 = {
            legend: {
                orient: 'horizontal', // 'horizontal'
                data:title,
                textStyle: {  // 图列内容样式
                    color: '#fff',  // 字体颜色
                },
                bottom:0,
                right:0,
                width:500,
                x:'center',
                y:'bottom',
                bottom:'0px'
            },
            grid: {
                left: 30,
                right: 30,
                top: '30%',
                bottom:'20%',
                containLabel: true
            },
            tooltip : {
                formatter: '{a}:{c}%'//a 是series中每条数据name值，c 是data数值
            },
            xAxis : [ //横坐标
            {
                type : 'category',
                data:[''],
                containLabel: true,
            }
            ],
            yAxis : [ //纵坐标
                {
                    show:true,
                    type : 'value',
                    max:100,
                    min:0,
                    axisLabel: {
                        show:true,
                        //Y轴数值可添加百分号
                        formatter: '{value}%',
                        textStyle: {
                            color:'#FFFFFF'  //这里用参数代替了
                        }
                    },
                    splitLine:{//去除网格线
                        show:false
                    },
                    axisTick:{
                        show:true,
                        color:'#FFFFFF',
                    },
                    
                    
                }
            ],
            color:['#33dc55','#ff1199','#8855cc','#00bbff','#f63636'],//柱状图的颜色
            series : series,
        }

        for(let i = 0; i< option2.series.length; i++){
            let style = { //定义柱状图的样式
                normal: {
                    label: {
                        show: false,
                        //柱子上方显示数值
                        position: 'top',
                        //数值可加上'%'
                        formatter: '{c} %' //格式化数据
                    },
                    barBorderRadius: [10,10, 0, 0],
                }
            }
            //每条数据指定类型为'bar'
            option2.series[i].type = 'bar'
            option2.series[i].barGap = 3
            option2.series[i].barCategoryGap= '100%',
            option2.series[i].barWidth = 18
            // series中每条数据都加的样式
            option2.series[i].itemStyle = style
            //series 中 data赋值
            option2.series[i].data = [bar_data[i]]

            option2.series[i].showBackground = true,
            option2.series[i].backgroundStyle =  {
                color: '#dddddd',
                borderRadius: [50, 50, 0, 0],
                opacity:'0.2'
            }
        }

        if (option2 && typeof option2 === "object") {
		// 绘制图表
		    Echarts.setOption(option2)
        }
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	}
</script>

<style scoped></style>
