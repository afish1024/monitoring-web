<template>
   
    <div class="content" v-if="isData" style="height: 400px;">
        <a-row :gutter="40" justify="space-between" class="contdiv">
            <a-col :span="24" class="title" v-if="hostsinfo">
               {{ hostsinfo }} : Oracle数据库
            </a-col>
        </a-row>
        <a-row :gutter="40" justify="space-between" class="contdiv">
            <a-col :span="24" class="leftcontent" >
                <div ref="oracleChartref" id="oracleChartrefId" style="height:280px;width:98%" ></div> 
            </a-col>
        </a-row>
    </div> 

</template>
<script setup name="oracleChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		oracleData:Array,
        hostsinfo:String,
	})
	
    let isData = ref(true)
    const toRefStrHtml = toRef(props, "oracleData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
    let getData= (datalist) => {
        if(datalist.length == 0){
            isData.value = false
            return false
        }
        var series = []
        var xAxis = []
        var legend = []
        for(var i in datalist) {
            var data = []
            var resdata = datalist[i].reverse()
            for(let r = 0; r < resdata.length; r++) {
                data.push(resdata[r].value)    
                if(i == 'size'){
                    xAxis.push(resdata[r].date)
                }
            }
            var name = '大小(MB)'
            if(i == 'status'){
                name = '连通性'
            }
            const serieData = {
                name: name, 
                type: 'line',
                showSymbol: false,
                data:data,
                yAxisIndex: 0,
            }
            if(i == 'status'){
                serieData.yAxisIndex = 1
            }
            legend.push(name)
            series.push(serieData)
        }
        var option = {
            title: {
                show: false,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                orient: 'horizontal', // 'horizontal'
                data:legend,
                textStyle: {  // 图列内容样式
                    color: '#333',  // 字体颜色
                },
                bottom:0,
                right:0,
                width:500,
                x:'center',
                y:'bottom',
                bottom:'0px'
            },
            grid: {
                top:'3%',
                left: '3%',
                right: '4%',
                bottom: '20%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxis
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    position: 'left',
                   
                },
                {
                    type: 'value',
                    name: '',
                    position: 'right',
                    min:0,
                    max:1,
                }
            ],
            series:series
        }
      
        let Echarts =  echarts.init(document.getElementById('oracleChartrefId'))
     
        // 绘制图表
        Echarts.setOption(option)
        // 自适应大小
        window.onresize = () => {
            Echarts.resize()
        }
    }
</script>

<style ></style>
