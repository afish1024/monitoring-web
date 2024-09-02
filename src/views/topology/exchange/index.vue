<template>
  <a-row style="margin: -10px">
    <a-col :span="24">
      <div style="margin-bottom: 30px; margin-top: 30px">
        <a-button>{{ props.par.networkName }}</a-button>

        <a-button type="primary" style="margin-left: 10px" @click="refresh"
          >刷新</a-button
        >
      </div>

      <!-- <div id="container">
          <ul>
            <li @click="getData(i)" v-for="(i,l) in dataValue">
              <div v-if="l%2 === 0" :class="i.portStatus" style="position: absolute;" :style="{width:'40px',height:'40px',top:'350px',left:(l*25+60) +'px'}"></div>

              <div v-else :class="i.portStatus" style="position: absolute;" :style="{width:'40px',height:'40px',top:'400px',left:((l-1)*25+60) +'px'}"></div>
            </li>

          </ul>
        </div> -->
    </a-col>
    <a-col :span="24" style="width: 100%; white-space: nowrap; overflow-x: auto">
      <div v-for="(i, l) in dataValue" :key="l" style="">
        <div style="font-weight: bold; margin-bottom: 10px">Slot{{ i.slot + 1 }}</div>

        <div v-for="(item, index) in i.slotData" :key="index">
          <div
            class="newswitch"
            v-if="item.subCodeData.length"
            :style="
              item.subCodeData.length > 0 && item.subCodeData.length / 2 >= 12
                ? !Number.isInteger(parseFloat(item.subCodeData.length / 2)) ? {
                    width: (item.subCodeData.length / 2 - 12) * 8.5 + 105 + '%',
                    border: '1px solid #eee',
                }:{
                    width: (item.subCodeData.length / 2 - 12) * 10 + 83 + '%',
                    border: '1px solid #eee',
                  }
                : {
                    width: (12 - item.subCodeData.length / 2) * 10 + '%',
                    border: '1px solid #eee',
                  }
            "
          >
            <div
              style="float: left; cursor: pointer"
              v-for="(item1, index1) in item.subCodeData"
              @click="getData(item1,index1,index,l)"
              :key="index1"
            >
            
              <div v-if="item1.portType != 'ten'">
                <a-tooltip placement="top">
                  <template #title>
                    <span>名称：{{ item1.portName }}</span>
                    <p>状态：{{ item1.portStatus }}</p>
                  </template>
        
      
                <div v-if="index1 % 2 === 0" :style="calculatePosition(i, index1)">
                  <div style="margin-left: 20px">
                   {{ item1.port }}
                  </div>
                  <!-- <div v-if="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l&& item1.portStatus != 'up'">
                    <icon-font type="icon-checked" style="font-size: 48px;"/>
                  </div>
                  <div v-else>  -->
                    <div v-if="item1.portStatus == 'down'">
                      <icon-font 
                      :type="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l ?
                       'icon-checked':'icon-diankou'" 
                      style="font-size: 48px" />
                    </div>
                    <div v-else-if="item1.portStatus == 'up'">
                      <icon-font type="icon-Up" style="font-size: 48px" />
                    </div>
                    <div v-else-if="item1.portStatus == 'sleep'">
                      <icon-font 
                      :type="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l ?
                       'icon-checked':'icon-diankou1'" 
                     
                      style="font-size: 48px" />
                    </div>
                    <div v-else-if="item1.portStatus == 'notPresent'">
                      <icon-font 
                      :type="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l ?
                       'icon-checked':'icon-zanbuzhichi'" 
                      style="font-size: 48px" />
                    </div>
                    <div v-else-if="item1.portStatus == 'unknown'">
                      <icon-font type="icon-checked" style="font-size: 48px" />
                    </div>
                    <div v-else>
                      <icon-font 
                      :type="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l ?
                       'icon-checked':'icon-diankou'" 
                       style="font-size: 48px" />
                    </div>
                  <!-- </div> -->
                  
                </div>
                <div
                  v-else
                  :style="calculatePosition2(i, index1)"
                >
                  <div style="margin-left: 20px">
                    {{ item1.port }}
                  </div>
                  <!-- <div v-if="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l&& item1.portStatus != 'up'">
                    <icon-font type="icon-checked" style="font-size: 48px;"/>
                  </div>
                  <div v-else>  -->
                    <div v-if="item1.portStatus == 'down'">
                    <icon-font 
                    :type="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l ?
                       'icon-checked':'icon-diankou'" 
          
                    style="font-size: 48px" />
                    </div>
                    <div v-else-if="item1.portStatus == 'up'">
                      <icon-font type="icon-Up" style="font-size: 48px" />
                    </div>
                    <div v-else-if="item1.portStatus == 'sleep'">
                      <icon-font 
                      :type="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l ?
                       'icon-checked':'icon-diankou1'" 
                   
                      style="font-size: 48px" />
                    </div>
                    <div v-else-if="item1.portStatus == 'notPresent'">
                      <icon-font 
                      :type="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l ?
                       'icon-checked':'icon-zanbuzhichi'" 
                    
                      style="font-size: 48px" />
                    </div>
                    <div v-else-if="item1.portStatus == 'unknown'">
                      <icon-font type="icon-checked" style="font-size: 48px" />
                    </div>
                    <div v-else>
                      <icon-font 
                      :type="checkedIndex3 == index1 &&checkedIndex2 == index && checkedIndex1 == l ?
                       'icon-checked':'icon-diankou'" 
                      style="font-size: 48px" />
                    </div>
                  <!-- </div> -->
                 
                </div>
                </a-tooltip>
              </div>
              <div v-else>
                <a-tooltip placement="top">
                  <template #title>
                    <span>名称：{{ item1.portName }}</span>
                    <p>状态：{{ item1.portStatus }}</p>
                  </template>
                    <div
                      v-if="index1 % 2 === 0"
                      :style="{
                        position: 'absolute',
                        marginTop: '30px',
                        left: index1 * 36 + 20 + 'px',
                      }"
                    >
                      <div style="margin-left: 20px">{{ item1.port }}</div>
                      <div v-if="item1.portStatus == 'down'">
                        <icon-font type="icon-guangkou" style="font-size: 48px" />
                      </div>
                      <div v-else-if="item1.portStatus == 'up'">
                        <icon-font type="icon-guangkou1-copy" style="font-size: 48px" />
                      </div>
                      <div v-else>
                        <icon-font type="icon-guangkou" style="font-size: 48px" />
                      </div>
                    </div>
                    <div
                      v-else
                      :style="{
                        position: 'absolute',
                        marginTop: '110px',
                        left: (index1 - 1) * 36 + 20 + 'px',
                      }"
                    >
                      <div style="margin-left: 20px">{{ item1.port }}</div>
                      <div v-if="item1.portStatus == 'down'">
                        <icon-font type="icon-guangkou" style="font-size: 48px" />
                      </div>
                      <div v-else-if="item1.portStatus == 'up'">
                        <icon-font type="icon-guangkou1-copy" style="font-size: 48px" />
                      </div>
                      <div v-else>
                        <icon-font type="icon-guangkou" style="font-size: 48px" />
                      </div>
                    </div>
                </a-tooltip>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="newswitchTen" v-if="dataTenValue.length > 0 " 
        :style="(dataTenValue.length)/2 >= 12 ? {width:((((dataTenValue.length)/2)-12)*10)+100+'%',border: '1px solid #eee'} :{width:((12-((dataTenValue.length)/2))*10)+'%',border: '1px solid #eee'}"
        
        >

        <div style="float: left;cursor: pointer;" v-for="(i,l) in dataTenValue" @click="getData(i)">
            <div v-if="l%2 === 0" :style="{position: 'absolute',top:'240px',left:(l*36+20) +'px'}">
              <div style="margin-left: 20px;">{{i.portNumber}}</div>
              <div v-if="i.portStatus =='down'">
                <icon-font type="icon-guangkou" style="font-size: 48px;"/> 
              </div>
              <div v-else-if="i.portStatus =='up'">
                <icon-font type="icon-guangkou1-copy" style="font-size: 48px;"/> 
              </div>
              <div v-else>
                <icon-font type="icon-guangkou" style="font-size: 48px;"/> 
              </div>
            </div>
            <div v-else :style="{position: 'absolute',top:'320px',left:((l-1)*36+20) +'px'}">
              <div style="margin-left: 20px;">{{i.portNumber}}</div>
              <div v-if="i.portStatus =='down'">
                <icon-font type="icon-guangkou" style="font-size: 48px;"/> 
              </div>
              <div v-else-if="i.portStatus =='up'">
                <icon-font type="icon-guangkou1-copy" style="font-size: 48px;"/> 
              </div>
              <div v-else>
                <icon-font type="icon-guangkou" style="font-size: 48px;"/> 
              </div>
            </div>
          </div>
      </div>  -->
    </a-col>
  </a-row>
  <a-row style="height: 120px">
    <a-col :span="2"></a-col>
    <a-col :span="22" style="justify-content: right; display: flex">
      <div style="display: flex">
        <div style="display: flex; align-items: center">
          <span><icon-font type="icon-zanbuzhichi" style="font-size: 24px" /></span>
          <span style="margin-left: 10px; margin-top: -5px">不支持</span>
        </div>
        <div style="display: flex;align-items: center;margin-left: 20px;">
          <span><icon-font type="icon-checked" style="font-size: 28px;"/></span>
          <span style="margin-left: 10px;margin-top: -5px;">已选择</span>
        </div>
        <div style="display: flex; align-items: center; margin-left: 20px">
          <span><icon-font type="icon-diankou" style="font-size: 28px" /></span>
          <span style="margin-left: 10px; margin-top: -5px">Down</span>
        </div>
        <div style="display: flex; align-items: center; margin-left: 20px">
          <span><icon-font type="icon-Up" style="font-size: 30px" /></span>
          <span style="margin-left: 10px; margin-top: -5px">Up</span>
        </div>
        <div style="display: flex; align-items: center; margin-left: 20px">
          <span><icon-font type="icon-diankou1" style="font-size: 30px" /></span>
          <span style="margin-left: 10px; margin-top: -5px">Shutdown</span>
        </div>

        <div style="display: flex; align-items: center; margin-left: 100px">
          <span><icon-font type="icon-diankou" style="font-size: 28px" /></span>
          <span style="margin-left: 10px; margin-top: -5px">电口</span>
        </div>
        <div style="display: flex; align-items: center; margin-left: 20px">
          <span><icon-font type="icon-guangkou" style="font-size: 30px" /></span>
          <span style="margin-left: 10px; margin-top: -5px">光口</span>
        </div>
      </div>
    </a-col>
  </a-row>
  <a-drawer
    :closable="false"
    :width="550"
    placement="right"
    :visible="visible"
    @close="onClose"
  >
    <div class="h15" v-if="infoTitle">
      <div class="picTitle">
        <img src="@/assets/images/wk.svg" alt="" />
        <p>
          <span>{{ infoTitle.portIp }}</span>
          <span>网络接口</span>
        </p>
        <div>
          <!-- <edit-outlined style="color:#00000073;font-size: 16px;cursor: pointer;" />
          <undo-outlined style="margin-left:20px;color:#00000073 ;font-size: 16px;cursor: pointer;" /> -->
        </div>
      </div>
      <div class="picInfo">
        <p>
          <span>资源名称</span>
          <span
            :title="infoTitle.portName"
            style="
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 180px;
            "
            >{{ infoTitle.portName }}</span
          >
        </p>
        <p>
          <span>资源编号</span>
          <span>{{ infoTitle.portNumber }}</span>
        </p>
        <!-- <p>
          <span>资源参数</span>
          <span>-</span>
        </p> -->
      </div>
      <!-- <div class="picInfo">
        <p>
          <span>模块号</span>
          <span>-</span>
        </p>
        <p>
          <span>管理状态</span>
          <span>
            <a-switch v-model:checked="infoTitle.managementStatus" size="small" />
          </span>
        </p>
        <p>
          <span>描述信息</span>
          <span>{{ infoTitle.extJson }}</span>
        </p>
      </div> -->
    </div>
    <a-divider />
    <div class="h20 newAlarm">
      <p>
        <span>最新重要告警</span>
        <!-- <span style="cursor: pointer">更多</span> -->
      </p>
      <!-- // "normal", "serious", "unknown", "abnormal" -->
      <a-timeline>
        <a-timeline-item
          :color="status[item.alarmLevel]"
          v-for="(item, index) in alarmTitle"
        >
          <template #dot>
            <thunderbolt-filled
              style="font-size: 16px"
              v-if="item.alarmLevel == 'serious'"
            />
            <question-circle-filled
              style="font-size: 16px"
              v-if="item.alarmLevel == 'unknown'"
            />
            <exclamation-circle-filled
              style="font-size: 16px"
              v-if="item.alarmLevel == 'abnormal'"
            />
            <check-circle-filled
              style="font-size: 16px"
              v-if="item.alarmLevel == 'normal'"
            />
          </template>
          <span style="color: #00000073" v-if="item.alarmLevel == 'serious'">{{
            item.occurrenceTime
          }}</span
          ><br />
          <span style="color: #ff4d4f" v-if="item.alarmLevel == 'serious'">{{
            item.alarmContent
          }}</span>

          <span style="color: #00000073" v-if="item.alarmLevel == 'unknown'">{{
            item.occurrenceTime
          }}</span
          ><br />
          <span style="color: #bb5ce8" v-if="item.alarmLevel == 'unknown'">{{
            item.alarmContent
          }}</span>

          <span style="color: #00000073" v-if="item.alarmLevel == 'abnormal'">{{
            item.occurrenceTime
          }}</span
          ><br />
          <span style="color: #f69d37" v-if="item.alarmLevel == 'abnormal'">{{
            item.alarmContent
          }}</span>

          <span style="color: #00000073" v-if="item.alarmLevel == 'normal'">{{
            item.occurrenceTime
          }}</span
          ><br />
          <span style="color: #2db7f5" v-if="item.alarmLevel == 'normal'">{{
            item.alarmContent
          }}</span>
        </a-timeline-item>
      </a-timeline>
    </div>
    <a-divider />
    <div class="h25 target">
      <p>
        <span>最新重要告警</span>
        <span style="cursor: pointer">
          <!-- <a-range-picker :bordered="false" v-model:value="value1" size="small" /> -->
          <a-select
            ref="select"
            v-model:value="lastTime"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option value="0">近30分钟</a-select-option>
            <a-select-option value="1">近1小时</a-select-option>
            <a-select-option value="2">近1天</a-select-option>
            <a-select-option value="3">近7天</a-select-option>
            <a-select-option value="4">近30天</a-select-option>
          </a-select>
        </span>
      </p>

      <p>
        <span>网口丢包率</span>
        <!-- <span><a-tag color="#87d068" style="margin-left:10px">当前40%</a-tag></span> -->
      </p>

      <div id="echartsTarget" style="width: 100%; height: 200px"></div>
    </div>
    <div class="h25 flow">
      <p>
        <span>输入输出流量</span>
      </p>

      <div id="echartsFlow" style="width: 100%; height: 200px"></div>

      <div id="echartsFlow1" style="width: 100%; height: 200px"></div>
    </div>
  </a-drawer>
</template>
<script setup name="exchangeList">
import * as echarts from "echarts";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import topologyApi from "@/api/topology/topologyApi";
import { mockData0, mockData1 } from "./data";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3441767_xbqghbjf9l.js",
});
defineComponent(() => {
  IconFont;
});
const checkedIndex1 = ref(-1)
const checkedIndex2 = ref(-1)
const checkedIndex3 = ref(-1)
const dataValue = ref([]);
const dataTenValue = ref([]);
const cardLoading = ref(true);
const checked1 = ref(true);
const devId = ref(null);
// 默认展开的节点
let defaultExpandedKeys = ref([]);
const bgImg = ref();
const flag = ref(true);
const treeFieldNames = { children: "children", title: "name", key: "id" };
const visible = ref(false);
const lastTime = ref("0");
const infoTitle = ref();
const alarmTitle = ref();
const par = ref();
const props = defineProps({
  par: {
    type: Object,
    default: {},
  },
});

const status = {
  up: "#2db7f5",
  down: "#ff4d4f",
};

const calculatePosition = (i, index) => {
  var topPosition = 30 + "px";
  var leftPosition = index * 36 + 20 + "px";
  return {
    position: "absolute",
    "margin-top": topPosition,
    left: leftPosition,
  };
};

const calculatePosition2 = (i, index) => {
  var topPosition =  110 + "px";
  var leftPosition = (index - 1) * 36 + 20+ "px";
  return {
          position: 'absolute',
          "margin-top": topPosition,
          left: leftPosition,
        };
};

watch(props, (value, old) => {
  getportList(props.par.id);
});

const refresh = () => {
  dataTenValue.value = [];
  dataValue.value = [];
  getportList(devId.value);
};
const getportList = (v) => {
  dataTenValue.value = [];
  dataValue.value = [];
  checkedIndex3.value = -1
  checkedIndex2.value = -1
  checkedIndex1.value = -1
  devId.value = v;
  topologyApi.getPortLevel({ deviceId: v }).then((res) => {
    console.log(res);
    dataValue.value = res;
    // dataValue.value = res
    // if(res.length > 0){
    //   res.map((item)=>{
    //     if(item.portType == 'ten'){

    //       dataTenValue.value.push(item)
    //     }else{
    //       dataValue.value.push(item)
    //     }
    //   })
    //   dataTenValue.value.sort(function(a, b){
    //       return a.portNumber - b.portNumber
    //   })
    //   dataValue.value.sort(function(a, b){
    //       return a.portNumber - b.portNumber
    //   })
    // }
  });
};

let myEcharts = echarts;

const treeData = ref([]);

const initChart1 = (v) => {
  let echartsTarget = myEcharts.init(document.getElementById("echartsTarget"));
  echartsTarget.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      data: v.runningTime,
    },
    title: {
      subtext: "单位:%",
      top: -10,
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false,
      },
    },
    grid: {
      top: "15%",
      left: "15%",
      right: "5%",
      bottom: 25,
    },
    series: [
      {
        data: v.runningValue,
        smooth: true,
        showSymbol: false, //去掉折线上的小圆点
        type: "line",
        //设置折线颜色和粗细
        lineStyle: {
          width: 2,
          color: "#B7A8E1",
        },
        //设置面积区域为渐变效果
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0.2,
              color: "#fff",
            },
            {
              offset: 0.6,
              color: "#B7A8E1",
            },
          ]),
        },
      },
    ],
  });

  window.onresize = function () {
    echartsTarget.resize();
  };
};

const initChart2 = (v) => {
  let echartsFlow = myEcharts.init(document.getElementById("echartsFlow"));
  let echartsFlow1 = myEcharts.init(document.getElementById("echartsFlow1"));

  echartsFlow.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      data: v.runningTime,
    },
    title: {
      subtext: "输出流量(单位:KB)",
      top: -10,
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false,
      },
    },
    grid: {
      top: "15%",
      left: "15%",
      right: "5%",
      bottom: 25,
    },
    series: [
      {
        data: v.runningValue,
        smooth: true,
        showSymbol: false, //去掉折线上的小圆点
        type: "line",
        //设置折线颜色和粗细
        lineStyle: {
          width: 2,
          color: "#B7A8E1",
        },
        //设置面积区域为渐变效果
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0.2,
              color: "#fff",
            },
            {
              offset: 0.6,
              color: "#B7A8E1",
            },
          ]),
        },
      },
    ],
  });

  window.onresize = function () {
    echartsFlow.resize();
  };
};

const initChart3 = (v) => {
  let echartsFlow1 = myEcharts.init(document.getElementById("echartsFlow1"));
  echartsFlow1.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      data: v.runningTime,
    },
    title: {
      subtext: "输出流量(单位:KB)",
      top: -10,
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false,
      },
    },
    grid: {
      top: "15%",
      left: "15%",
      right: "5%",
      bottom: 25,
    },
    series: [
      {
        data: v.runningValue,
        smooth: true,
        showSymbol: false, //去掉折线上的小圆点
        type: "line",
        //设置折线颜色和粗细
        lineStyle: {
          width: 2,
          color: "#B7A8E1",
        },
        //设置面积区域为渐变效果
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0.2,
              color: "#fff",
            },
            {
              offset: 0.6,
              color: "#B7A8E1",
            },
          ]),
        },
      },
    ],
  });
  window.onresize = function () {
    echartsFlow1.resize();
  };
};

const handleChange = (v) => {
  lastTime.value = v;
  initChartData(par.value);
};

onMounted(() => {
  loadTreeData();
  // dataValue.value = mockData0
  // bgImg.value = ["normal", "serious", "unknown", "abnormal"]
  getportList(props.par.id);
});
const getData = (v,index3,index2,index1) => {
  visible.value = true;
  checkedIndex3.value = index3
  checkedIndex2.value = index2
  checkedIndex1.value = index1
  console.log(v);
  topologyApi.getportdetail({ id: v.id }).then((res) => {
    console.log(res);
    infoTitle.value = res;
  });

  topologyApi.getportAlarm({ portId: v.id }).then((res) => {
    console.log(res);
    alarmTitle.value = res;
  });
  par.value = v;
  initChartData(par.value);

  // setTimeout(() => {
  //   initChart()
  // }, 100)
};

const initChartData = (v) => {
  topologyApi
    .portPacketLossInbound({
      portId: v.id,
      deviceId: v.deviceId,
      lastTime: lastTime.value,
      resourceType: "api",
    })
    .then((res) => {
      console.log(res);

      initChart1(res);
    });

  topologyApi
    .portBitsSent({
      portId: v.id,
      deviceId: v.deviceId,
      lastTime: lastTime.value,
      resourceType: "api",
    })
    .then((res) => {
      console.log(res);

      initChart2(res);
    });

  topologyApi
    .portBitsReceived({
      portId: v.id,
      deviceId: v.deviceId,
      lastTime: lastTime.value,
      resourceType: "api",
    })
    .then((res) => {
      initChart3(res);
    });
};

const onClose = () => {
  visible.value = false;
};

const loadTreeData = () => {
  topologyApi.viewTree().then((res) => {
    cardLoading.value = false;
    if (!res) {
      treeData.value = [];
      return;
    }
    treeData.value = res;
    // 默认展开2级
    treeData.value.forEach((item) => {
      // 因为0的顶级
      if (item.parentId === "0") {
        defaultExpandedKeys.value.push(item.id);
        // 取到下级ID
        if (item.children) {
          item.children.forEach((items) => {
            defaultExpandedKeys.value.push(items.id);
          });
        }
      }
    });
  });
};
</script>
<style lang="less" scoped>
.newswitch {
  height: 200px;
  //border: 1px solid #eee;
  // width: ~"calc(100wh - 80px)";
  // overflow-x:scroll;
  // overflow-y: hidden;
}
.newswitchTen {
  // height: 10px;
  //border: 1px solid #eee;
  height: 170px;
  margin-top: 30px;
}

.up {
  background: url("@/assets/images/status1.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.down {
  background: url("@/assets/images/status2.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.testing {
  background: url("@/assets/images/status3.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.sleep {
  background: url("@/assets/images/status4.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.notPresent {
  background: url("@/assets/images/status5.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.unknown {
  background: url("@/assets/images/status6.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
ul,
li {
  list-style: none;
}
.cardImp {
  margin-right: 10px;
}
#container > ul {
  width: 100%;
  height: 100%;
}
#container > ul > li {
  cursor: pointer;
}
#container {
  width: 800px;
  height: 533px;
  margin: 0 auto;
  background-image: url("@/assets/images/jhj.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.h15 {
  height: 150px;
  display: flex;
  flex-direction: column;
}
.h20 {
  height: 200px;
  overflow-y: auto;
}
.h25 {
  height: 280px;
}
.picTitle {
  display: flex;
  div {
    float: right;
  }
  p {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 10px;
    span:nth-child(1) {
      display: inline-block;
      font-size: 16px;
      font-weight: 600;
    }
    span:nth-child(2) {
      display: inline-block;
      font-size: 12px;
      color: #00000073;
      
    }
  }
  img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.picInfo {
  display: flex;
  div {
    float: right;
  }
  p {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 10px;
    span:nth-child(1) {
      display: inline-block;
      font-size: 14px;
      font-weight: 600;
      color: #00000073;
    }
    span:nth-child(2) {
      display: inline-block;
      font-size: 14px;
      font-weight: 600;
    }
  }
  img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}

.newAlarm {
  p {
    display: flex;
    span:nth-child(1) {
      flex: 1;
      font-weight: 600;
    }
    span:nth-child(2) {
      color: #00000073;
    }
  }
}

.target {
  p:nth-child(1) {
    display: flex;
    span:nth-child(1) {
      flex: 1;
      font-weight: 600;
    }
    span:nth-child(2) {
      color: #00000073;
    }
  }
  p:nth-child(2) {
    span:nth-child(1) {
      font-weight: 600;
    }
  }
}

.flow {
  margin-top: 20px;
  p:nth-child(1) {
    span:nth-child(1) {
      font-weight: 600;
    }
  }
}

.dividers {
  width: 100%;
  height: 20px;
  border-bottom: 1px solid var(--divider-color);
}
.ant-tree-switcher {
  position: relative;
  flex: none;
  align-self: stretch;
  width: 24px;
  margin: 0;
  line-height: 17px;
  text-align: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>
