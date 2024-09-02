<template>
  <a-card style="margin-bottom: 10px">

    <a-row :gutter="16">
      <a-col class="gutter-row" :span="10">
        <div class="gutter-box">
          <a-card size="small" title="基本信息" style="width: 100%" :hoverable="true">
            <!-- <template #extra><a href="#">more</a></template> -->
            <ul class="list" v-if="detailInfo">
              <li>
                <span>设备名称</span>

                <span>{{detailInfo.deviceName}}</span>
              </li>
              <li>
                <span>IP地址</span>
                <span>{{detailInfo.ipAddress}}</span>
              </li>
              <li>
                <span>MAC地址</span>
                <span>{{detailInfo.macAddress}}</span>
              </li>
              <li>
                <span>设备类型</span>
                <span v-if="detailInfo.deviceType == 'switch'">交换机</span>
                <span v-if="detailInfo.deviceType == 'server'">服务器</span>
                <span v-if="detailInfo.deviceType == 'router'">路由器</span>
              
              </li>
             
          

              <li>
                <span>备注</span>
                <span>{{detailInfo.remark}}</span>
              </li>
           
            </ul>
          </a-card>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="14">
        <div class="gutter-box">
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="10">
              <div class="gutter-box">
                <a-card size="small" title="设备健康度" style="width: 100%" :hoverable="true">
                  <div style="width:100%;height: 135px;" v-if="detailInfo && detailInfo.healthScore">
                    <a-progress strokeColor="#586BF9" type="dashboard" strokeWidth="8" :percent="detailInfo.healthScore?detailInfo.healthScore:20">
                      <template #format="percent">
                        <span style="font-size:14px">设备健康度</span><br>
                        <span style="font-size:14px">{{ detailInfo.healthScoreStr }}</span>
                      </template>
                    </a-progress>
                  </div>

                </a-card>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="14">
              <div class="gutter-box">
                <a-card size="small" title="资源逻辑类型统计" style="width: 100%" :hoverable="true">
                  <div id="echartsTarget" style="width:100%;height: 150px;"></div>
                </a-card>
              </div>
            </a-col>
          </a-row>

          <a-card size="small" title="任务信息" style="width: 100%;margin-top: 20px;height: 323px;" :hoverable="true">
            <div id="echartsTarget1" style="width:100%;height: 260px;"></div>
          </a-card>

        </div>
      </a-col>
    </a-row>

  </a-card>
</template>
<script setup name="topologyList">

import * as echarts from 'echarts';
import deviceApi from '@/api/topological/deviceApi'
const checked2 = ref(false)
const detailInfo = ref()
const resource = ref()
let myEcharts = echarts
const initChart1 = (data) => {
  let echartsTarget = myEcharts.init(document.getElementById("echartsTarget"))
  echartsTarget.setOption({
    tooltip: false,
    legend: {
      top: '5%',
      right: '5%',
      right: 'right',
      orient: 'vertical',
      icon: 'circle',
      selectedMode: false
    },
    grid: {
      top: '2%',
      left: '2%',
      right: '2%',
      bottom: 25,
    },
    series: [
      {
        name: '合计',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['30%', '60%'],
        label: {
          show: false,
          position: 'center'
        },
        startAngle: 0,
        data: data
      }
    ]
  });


  window.onresize = function () {
    echartsTarget.resize();
  };
}


const initChart2 = (data, num) => {
  let echartsTarget1 = myEcharts.init(document.getElementById("echartsTarget1"))

  echartsTarget1.setOption({
    tooltip: false,
    legend: {
      top: '5%',
      right: '5%',
      right: 'right',
      orient: 'vertical',
      icon: 'circle',
      selectedMode: false
    },
    grid: {
      top: '2%',
      left: '2%',
      right: '2%',
      bottom: 25,
    },
    series: [
      {
        name: '合计',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['30%', '60%'],
        label: {
          position: 'center',
          show: true,
          formatter: () => {
            let str = `总数${num}`
            return str
          },
          rich: {
            a: {
              color: '#333333',//a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
              fontSize: '18',
            },
            b: {
              fontSize: '18',
              color: '#333333',
            }
          }
        },
        startAngle: 0,
        data: data
      }
    ]
  });

  window.onresize = function () {
    echartsTarget1.resize();
  };
}



const props = defineProps({
  ids: {
    default: '',
    type: String,
  },
});

watch(props, (value, old) => {
  console.log(value)
  getDetail(value.ids)
})


const getDetail = (v) => {
  deviceApi.detail({ id: v }).then((res) => {
    console.log(res)
    if(res.healthScore < 0){
       res.healthScoreStr = '0%'
    }
    detailInfo.value = res
  })

  deviceApi.taskDetail({ id: v }).then((res) => {
    console.log(res)

    let arr = [
      { value: res.abnormal_ratio, name: `异常数量(${res.abnormal_ratio}个)` },
      { value: res.pause_ratio, name: `暂停数量(${res.pause_ratio}个)` },
      { value: res.normal_ratio, name: `正常数量(${res.normal_ratio}个)` },
    ]
    const total_count = Number(res.abnormal_ratio) + Number(res.pause_ratio) + Number(res.normal_ratio)
    console.log(total_count)
    initChart2(arr, total_count)
  })


  // 获取设备健康度
  deviceApi.resource({ id: v }).then((res) => {

    let arr = res.list
    initChart1(arr, res.total)
    resource.value = res
  })
}


onMounted(() => {
  getDetail(props.ids)
})


</script>
<style lang="less" scoped>
ul li {
	list-style: none;
}
.list {
	display: flex;
	flex-direction: column;
  height: 480px;
	li {
		display: flex;
		line-height: 40px;
		color: #00000073;
		span {
			flex: 1;
			display: inline-block;
		}
		span:nth-child(1) {
			text-align: right;
		}
		span:nth-child(2) {
			text-align: left;
			margin-left: 30px;
		}
	}
}
.ant-progress {
	display: block;
	text-align: center;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	color: var(--text-color);
	font-size: 14px;
	font-variant: tabular-nums;
	line-height: 1.5715;
	list-style: none;
	font-feature-settings: 'tnum';
	/* display: inline-block; */
	margin: 0 auto;
	align-items: center;
	margin-top: 15px;
}
</style>