<template>
  <a-card style="margin-bottom: 10px">
    <a-form layout="inline" :model="formState">
      <a-form-item label="告警级别">
        <a-select ref="select" v-model:value="formState.alarmLevel" style="width: 120px" @change="changeLevel">
          <a-select-option value="disconnect ">掉线</a-select-option>
          <a-select-option value="serious">严重</a-select-option>
          <a-select-option value="primary ">主要</a-select-option>
          <a-select-option value="secondary ">次要</a-select-option>
          <a-select-option value="unknown">未知</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="告警类型">
        <a-select ref="select" v-model:value="formState.alarmType" style="width: 120px" @change="changeType">
          <a-select-option value="memory_space_utilization_rate">内存空间利用率</a-select-option>
          <a-select-option value="network_input_output_traffic">网络输入输出流量</a-select-option>
          <a-select-option value="memory_size">内存大小</a-select-option>
          <a-select-option value="disk_space_utilization_rate">磁盘空间利用率</a-select-option>
          <a-select-option value="network_port_interface_status">网口接口状态</a-select-option>
          <a-select-option value="network_port_packet_loss_rate">网口丢包率</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="确认状态">
        <a-radio-group v-model:value="formState.alarmStatus" @change="changeRadio">
          <a-radio value="confirmed">已确认</a-radio>
          <a-radio value="unconfirmed">未确认</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="reset">重置</a-button>
      </a-form-item>
    </a-form>

    <a-row :gutter="16" style="margin-top:15px;">
      <a-col class="gutter-row" :span="16">
        <div class="gutter-box">
          <div class="card_box" v-for="(item,index) in alarmList">
            <div class="card_box_check">
              <span>
                <!-- <a-checkbox v-model:checked="checked"></a-checkbox> -->
              </span>
              <span><img src="@/assets/images/jg.svg" alt=""></span>
            </div>
            <a-card size="small" style="width: 100%" :hoverable="true">
              <div class="card_box_content">
                <div class="card_box_content_left">
                  <div>
                    <span class="sp1">{{item.alarmName}}</span>
                    <span class="sp2">{{item.deviceName}}</span>
                    <span class="sp3">{{ item.latestMonitoringTime }}</span>
                  </div>
                  <div class="card_box_text">
                    {{ item.alarmDescription }}
                  </div>
                  <div class="card_box_user">
                    <span>{{item.createUser}}</span>
                    <span>{{item.createTime}}</span>
                  </div>
                </div>
                <div class="card_box_content_center"><stop-filled /></div>
                <div class="card_box_content_right"><a-tag color="#87d068">确认告警</a-tag></div>
              </div>
            </a-card>
          </div>

        </div>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-card size="small" title="告警信息" style="width: 100%" :hoverable="true">
            <div id="echartsTarget" style="width:100%;height: 150px;"></div>
          </a-card>

          <a-card size="small" title="告警类型统计" style="width: 100%;margin-top: 10px;" :hoverable="true">
            <div id="echartsTarget1" style="width:100%;height: 150px;"></div>
          </a-card>
        </div>
      </a-col>
    </a-row>

    <!-- <a-radio v-model:checked="checked">全部选中</a-radio>
    <a-button type="primary">批量确认</a-button>
    <a-button style="margin-left:10px">批量删除</a-button> -->
  </a-card>
</template>
<script>
import * as echarts from 'echarts';
import { defineProps } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive } from 'vue';
import deviceApi from '@/api/topological/deviceApi'
const count = 3;

let myEcharts = echarts;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  props: ['ids'],
  setup (props) {

    const initLoading = ref(true);
    const loading = ref(false);
    const data = ref([]);
    const list = ref([]);
    const dictObj = ref({});
    const alarmList = ref([]);
    const checked = ref(true)
    onMounted(() => {
      getDetail(props.ids)
      getList(props.ids)
    });




    const formState = ref({
      current: 1,
      size: 10,
      alarmLevel: '',
      alarmType: '',
      alarmStatus: ''
    });
    const handleFinish = values => {
      console.log(values, formState);
    };
    const handleFinishFailed = errors => {
      console.log(errors);
    }



    const changeRadio = (v) => {
      formState.value.current = 1
      formState.value.size = 10
      formState.value.alarmStatus = v.target.value
      getList(props.ids)
    }

    const changeLevel = (v) => {
      console.log(v)
      formState.value.current = 1
      formState.value.size = 10
      formState.value.alarmLevel = v
      getList(props.ids)
    }

    const changeType = (v) => {
      formState.value.current = 1
      formState.value.size = 10
      formState.value.alarmType = v
      getList(props.ids)
    }


    const reset = () => {
      formState.value = {
        current: 1,
        size: 10,
        alarmLevel: '',
        alarmType: '',
        alarmStatus: ''
      }
      getList(props.ids)
    }

    const initChart1 = (data) => {
      let echartsTarget = myEcharts.init(document.getElementById("echartsTarget"))
      echartsTarget.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          top: 'top',
          orient: 'horizontal',
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
            center: ['50%', '60%'],
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




    const initChart2 = (arr, data) => {
      let echartsTarget1 = myEcharts.init(document.getElementById("echartsTarget1"))


      echartsTarget1.setOption({
        tooltip: false,
        legend: {
          top: '5%',
          top: 'top',
          orient: 'horizontal',
          icon: 'circle',
          selectedMode: false
        },
        grid: {
          top: '2%',
          left: '2%',
          right: '2%',
          bottom: 25,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: arr
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            data: data,
            type: 'bar'
          }
          // {
          //   name: '次要',
          //   type: 'bar',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [320, 332, 301, 334, 390, 330, 320]
          // },
          // {
          //   name: '主要',
          //   type: 'bar',
          //   stack: 'Ad',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [120, 132, 101, 134, 90, 230, 210]
          // },
          // {
          //   name: '严重',
          //   type: 'bar',
          //   stack: 'Ad',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [220, 182, 191, 234, 290, 330, 310]
          // },

        ]
      });

      window.onresize = function () {
        echartsTarget1.resize();
      };
    }

    const getList = (v) => {
      deviceApi.alarm({ id: v, ...formState.value }).then((res) => {
        alarmList.value = res.records
      })
    }


    const getDetail = (v) => {


      deviceApi.alarmLevel({ deviceId: v }).then((res) => {

        let arr = [
          { value: res.alarmCount[0], name: `主要` },
          { value: res.alarmCount[1], name: `未知` },
          { value: res.alarmCount[2], name: `次要` },
        ]

        initChart1(arr)

      })


      deviceApi.alarmType({ deviceId: v }).then((res) => {
        console.log(res)


        // for(let )
        deviceApi.dict().then((res1) => {
          deviceApi.dict().then((res1) => {
            for (let i = 0; i < res1.length; i++) {
              dictObj.value[res1[i].dictValue] = res1[i].dictLabel
            }


            let arr = []

            for (let i = 0; i < res.alarmCount.length; i++) {
              arr.push(dictObj.value[res.alarmType[i]])
            }

            initChart2(arr, res.alarmCount)
          })

        })
      })
    }




    return {
      formState,
      handleFinish,
      changeRadio,
      changeLevel,
      changeType,
      reset,
      handleFinishFailed,
      loading,
      initLoading,
      data,
      list,
      checked,
      alarmList
      // onLoadMore,
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
</style>