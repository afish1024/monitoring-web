<template>
  <a-row :gutter="16" style="margin-top:15px;">
    <a-col class="gutter-row" :span="7">
      <a-card size="small" style="width: 100%;height:500px;overflow-y:auto;" :hoverable="true">
        <ul>

          <li v-for="item in treeData" class="treeList" @click="getChart(item)">
            <a-card size="small" style="width: 100%;margin-top:5px" :hoverable="true">
              {{ item.portName }}
            </a-card>
          </li>
        </ul>
        <!-- <a-tree v-model:expandedKeys="expandedKeys" :tree-data="treeData" style="width:100%;overflow-x:auto">

        </a-tree> -->
      </a-card>

    </a-col>
    <a-col class="gutter-row" :span="17">
      <a-form layout="inline" @finish="handleFinish" @finishFailed="handleFinishFailed">
        <a-form-item label="资源名称">
          <a-input v-model:value="form.name" placeholder="请输入关键字" />
        </a-form-item>
        <a-form-item label="时间">

          <a-range-picker v-model:value="form.time" />
        </a-form-item>
      </a-form>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-card size="small" style="width: 100%;margin-top: 10px;height:215px;overflow-y:auto;position: relative;" :hoverable="true">
            <div id="echartsTarget" style="width:100%;height: 180px;"></div>
            <!-- <a-tag color="processing" class="tg1">当前3%</a-tag> -->

          </a-card>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-card size="small" style="width: 100%;margin-top: 10px;height:215px;overflow-y:auto;position: relative;" :hoverable="true">
            <div id="echartsTarget1" style="width:100%;height: 180px;"></div>
            <!-- <a-tag color="processing" class="tg1">当前3%</a-tag> -->
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="16" style="margin-top:15px;">
        <a-col class="gutter-row" :span="12">
          <a-card size="small" style="width: 100%;margin-top: 10px;height:215px;overflow-y:auto;" :hoverable="true">
            <div id="echartsTarget2" style="width:100%;height: 180px;"></div>
            <!-- <a-tag color="processing" class="tg1">当前225.0kb/s</a-tag>
            <a-tag color="processing" class="tg2">当前238.0kb/s</a-tag> -->
          </a-card>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-card size="small" style="width: 100%;margin-top: 10px;height:215px;overflow-y:auto;" :hoverable="true">
            <div id="echartsTarget3" style="width:100%;height: 180px;"></div>
            <!-- <a-tag color="processing" class="tg1">当前330.56KB</a-tag> -->
          </a-card>
        </a-col>
      </a-row>

    </a-col>
  </a-row>

</template>
<script>
import * as echarts from 'echarts';
const count = 3;

import deviceApi from '@/api/topological/deviceApi'
let myEcharts = echarts;
export default defineComponent({
  components: {

  },
  props: ['ids'],
  setup (props) {
    const value = ref('');
    const expandedKeys = ref(['0-0', '0-0-0']);
    const treeData = ref([]);
    const form = ref({
      time: '',
      name: ''
    })
    onMounted(() => {
      setTimeout(() => {
        initChart()
      }, 100)

      getTree()
    });


    watch(props, (value, old) => {
      setTimeout(() => {
        initChart()
      }, 100)

      getTree()
    })


    const getTree = () => {
      deviceApi.portList({ deviceId: props.ids }).then((res) => {
        console.log(res)
        treeData.value = res
      })
    }


    const getChart = (v) => {
      console.log(v)
      initChart1(v)
      initChart2(v)
      initChart3(v)
      initChart4(v)
    }

    const initChart1 = (v) => {
      const par = {
        deviceId: v.deviceId,
        portId: v.id,
        resourceType: 'api',
      }
      deviceApi.portPacketLossInbound(par).then((res) => {
        // console.log(res)
        let echartsTarget = myEcharts.init(document.getElementById("echartsTarget"))

        echartsTarget.setOption({
          tooltip: false,
          title: {
            text: '网口入站丢包数',
            textStyle: {//设置主标题的文字风格
              fontSize: 12 //文字大小
            },
          },
          legend: {
            bottom: -5,
            position: 'bottom',
            orient: 'horizontal',
            icon: 'circle',
            selectedMode: false
          },
          grid: {
            top: '30px',
            left: '25px',
            right: '25px',
            bottom: '40px',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.runningTime
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              smooth: true,
              name: '网口丢包率',
              type: 'line',
              data: res.runningValue
            },

          ]
        });

        window.onresize = function () {
          echartsTarget.resize();
        };
      })
    }


    const initChart2 = (v) => {
      const par = {
        deviceId: v.deviceId,
        portId: v.id,
        resourceType: 'api',
      }
      deviceApi.portPacketLossOutbound(par).then((res) => {
        // console.log(res)
        let echartsTarget1 = myEcharts.init(document.getElementById("echartsTarget1"))

        echartsTarget1.setOption({
          tooltip: false,
          title: {
            text: '网口出战丢包数',
            textStyle: {//设置主标题的文字风格
              fontSize: 12 //文字大小
            },
          },
          legend: {
            bottom: -5,
            position: 'bottom',
            orient: 'horizontal',
            icon: 'circle',
            selectedMode: false
          },
          grid: {
            top: '30px',
            left: '25px',
            right: '25px',
            bottom: '40px',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.runningTime
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '网口丢包率',
              smooth: true,
              type: 'line',
              data: res.runningValue,
            },

          ]
        });


        window.onresize = function () {
          echartsTarget1.resize();
        };
      })
    }


    const initChart3 = (v) => {
      const par = {
        deviceId: v.deviceId,
        portId: v.id,
        resourceType: 'api',
      }
      deviceApi.portSpeedRate(par).then((res) => {
        // console.log(res)
        let echartsTarget2 = myEcharts.init(document.getElementById("echartsTarget2"))

        echartsTarget2.setOption({
          tooltip: false,
          title: {
            text: '网口输入带宽',
            textStyle: {//设置主标题的文字风格
              fontSize: 12 //文字大小
            },
          },
          legend: {
            bottom: -5,
            position: 'bottom',
            orient: 'horizontal',
            icon: 'circle',
            selectedMode: false
          },
          grid: {
            top: '30px',
            left: '25px',
            right: '25px',
            bottom: '40px',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.runningTime
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '网口输入带宽',
              smooth: true,
              type: 'line',
              data: res.runningValue,
            },

          ]
        });


        window.onresize = function () {
          echartsTarget2.resize();
        };
      })
    }


    const initChart4 = (v) => {
      const par = {
        deviceId: v.deviceId,
        portId: v.id,
        resourceType: 'api',
      }
      deviceApi.portSpeedRate(par).then((res) => {
        // console.log(res)
        let echartsTarget3 = myEcharts.init(document.getElementById("echartsTarget3"))

        echartsTarget3.setOption({
          tooltip: false,
          title: {
            text: '网口输入流量',
            textStyle: {//设置主标题的文字风格
              fontSize: 12 //文字大小
            },
          },
          legend: {
            bottom: -5,
            position: 'bottom',
            orient: 'horizontal',
            icon: 'circle',
            selectedMode: false
          },
          grid: {
            top: '30px',
            left: '25px',
            right: '25px',
            bottom: '40px',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.runningTime
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '网口输入流量',
              smooth: true,
              type: 'line',
              data: res.runningValue,
            },

          ]
        });


        window.onresize = function () {
          echartsTarget3.resize();
        };
      })
    }

    const initChart = () => {
      // let echartsTarget1 = myEcharts.init(document.getElementById("echartsTarget1"))
      // let echartsTarget2 = myEcharts.init(document.getElementById("echartsTarget2"))
      // let echartsTarget3 = myEcharts.init(document.getElementById("echartsTarget3"))



      // echartsTarget2.setOption({
      //   tooltip: false,
      //   title: {
      //     text: '网口带宽',
      //     textStyle: {//设置主标题的文字风格
      //       fontSize: 12 //文字大小
      //     },
      //   },
      //   legend: {
      //     bottom: -5,
      //     position: 'bottom',
      //     orient: 'horizontal',
      //     icon: 'circle',
      //     selectedMode: false
      //   },
      //   grid: {
      //     top: '30px',
      //     left: '25px',
      //     right: '25px',
      //     bottom: '40px',
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: ['10:02:39', '10:05:02', '10:07:15', '10:08:39', '10:09:22', '10:10:11', '10:11:05']
      //   },
      //   yAxis: {
      //     type: 'value',
      //   },
      //   series: [

      //     {
      //       name: '网口输入带宽',
      //       type: 'line',
      //       stack: 'Total',
      //       data: [50, 52, 70, 100, 140, 170, 240]
      //     },
      //     {
      //       name: '网口输出带宽',
      //       type: 'line',
      //       stack: 'Total',
      //       data: [100, 120, 70, 100, 140, 170, 240]
      //     },

      //   ]
      // });

      // echartsTarget3.setOption({
      //   tooltip: false,
      //   title: {
      //     text: '网口输入流量(GigabitEthemet1)',
      //     textStyle: {//设置主标题的文字风格
      //       fontSize: 12 //文字大小
      //     },
      //   },
      //   legend: {
      //     bottom: -5,
      //     position: 'bottom',
      //     orient: 'horizontal',
      //     icon: 'circle',
      //     selectedMode: false
      //   },
      //   grid: {
      //     top: '30px',
      //     left: '35px',
      //     right: '25px',
      //     bottom: '40px',
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: ['10:02:39', '10:05:02', '10:07:15', '10:08:39', '10:09:22', '10:10:11', '10:11:05']
      //   },
      //   yAxis: {
      //     type: 'value',
      //   },
      //   series: [
      //     {
      //       name: '网口输入流量',
      //       smooth: true,
      //       type: 'line',
      //       data: [300, 330, 350, 390, 430, 440, 470],
      //     },

      //   ]
      // });


      // window.onresize = function () {
      //   echartsTarget.resize();
      //   echartsTarget1.resize();
      //   echartsTarget2.resize();
      //   echartsTarget3.resize();
      // };
    }


    return {
      treeData,
      expandedKeys,
      form,
      getChart
    };
  },
});
</script>
<style lang="less" scoped>
.demo-loadmore-list {
	max-height: 350px;
	overflow-y: auto;
}
.sp1 {
	display: inline-block;
	color: #00000073;
	font-size: 12px;
}
.sp2 {
	display: inline-block;
	color: #000;
	font-size: 16px;
	font-weight: 600;
	margin-left: 10px;
}
.sp3 {
	display: inline-block;
	color: #00000073;
	font-size: 12px;
	margin-left: 10px;
}
.card_box_check {
	line-height: 80px;
	margin-right: 10px;
	display: flex;
	span:nth-child(1) {
		display: inline-block;
		line-height: 80px;
		margin-top: 18px;
	}
	span:nth-child(2) {
		display: inline-block;

		img {
			display: block;
			width: 30px;
			height: 30px;
			margin-top: 43px;
			margin-left: 5px;
		}
		// margin-top: 10px;
	}
}
.card_box {
	display: flex;
	margin-bottom: 15px;
}
.gutter-box {
	max-height: 400px;

	overflow-y: auto;
}
.card_box_content {
	display: flex;
	height: 80px;
}
.card_box_content_left {
	display: flex;
	flex-direction: column;
	width: 80%;
}
.card_box_content_center {
	text-align: center;
	line-height: 80px;
}
.card_box_content_right {
	text-align: center;
	line-height: 80px;
	text-align: center;
	margin-left: 20px;
}
.card_box_text {
	color: #faad14;
	font-size: 12px;
	margin-top: 10px;
}
.card_box_user {
	display: inline-block;
	color: #00000073;
	font-size: 13px;
	margin-top: 10px;
}

/* 滚动条轨道样式 */
::-webkit-scrollbar {
	width: 8px; /* 设置滚动条宽度 */
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
	background-color: #00000073; /* 设置滑块背景颜色 */
	border-radius: 4px; /* 设置滑块圆角 */
}

/* 滚动条轨道hover状态样式 */
::-webkit-scrollbar-track:hover {
	background-color: #f1f1f1; /* 设置轨道hover状态时的背景颜色 */
}

/* 滚动条滑块hover状态样式 */
::-webkit-scrollbar-thumb:hover {
	background-color: #00000073; /* 设置滑块hover状态时的背景颜色 */
}
.tg1 {
	position: absolute;
	top: 12px;
	right: 0px;
	font-size: 10px;
	line-height: 16px;
}
.tg2 {
	position: absolute;
	top: 12px;
	right: 100px;
	font-size: 10px;
	line-height: 16px;
}

.treeList {
	// white-space: nowrap;
	word-break: normal;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>