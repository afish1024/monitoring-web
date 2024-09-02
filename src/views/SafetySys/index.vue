<template>

  <a-row :gutter="16">
    <a-col :span="16">
      <a-card size="small" style="width: 100%;overflow-y:auto;height: 200px;" :hoverable="true">
        <div>
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">快捷入口</div>
        </div>

        <p style="margin-left:15px;margin-top: 15px;color: #00000073;font-size: 12px;">常用功能</p>

        <ul style="margin-left:15px;" class="ul1">
          <li @click="jump('/SafetySys/strategy/index')">添加基础策略</li>
          <!-- <li @click="jump('/SafetySys/strategy/index')">添加组合策略</li> -->
          <li @click="jump('/SafetySys/rightKeyPolicy/index')">添加右键策略</li>
          <li @click="jump('/SafetySys/timerPolicy/index')">添加定时策略</li>
          <!-- <li @click="jump('/SafetySys/strategy/index')">添加流程定义 </li> -->
        </ul>

        <p style="margin-left:15px;margin-top: 15px;color: #00000073;font-size: 12px;">常执行的策略</p>

        <ul style="margin-left:15px;" class="ul1">
          <li @click="jump('/SafetySys/strategy/index')">基础策略</li>
          <li>定时下载统计报表文件</li>
        </ul>
      </a-card>

      <a-card size="small" style="width: 100%;overflow-y:auto;margin-top: 10px;" :hoverable="true">
        <div>
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">最近执行状态</div>
        </div>

        <a-table :pagination="false" :columns="columns" :data-source="data" bordered :scroll="{ y: 500 }" style="margin-top:10px">

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'taskName'">
              <span @click="jumpInfo" style="color:#1890FF">
                {{ record.taskName }}
              </span>
            </template>

            <template v-if="column.key === 'executionStatus'">
              <span v-if="record.executionStatus == 'pending'" style="color:#1890FF">
                <a-tag color="processing">待执行</a-tag>
              </span>
              <span v-if="record.executionStatus == 'executing'" style="color:#1890FF">
                <a-tag color="default">执行中</a-tag>
              </span>
              <span v-if="record.executionStatus == 'successful'" style="color:#1890FF">
                <a-tag color="success">执行成功</a-tag>
              </span>
              <span v-if="record.executionStatus == 'failed'" style="color:#1890FF">
                <a-tag color="error">执行失败</a-tag>
              </span>

              <span v-if="record.executionStatus == 'interrupted'" style="color:#1890FF">
                <a-tag color="warning">执行中断</a-tag>
              </span>
            </template>

          </template>
        </a-table>
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card size="small" style="width: 100%;overflow-y:auto;height: 350px;" :hoverable="true">
        <div>
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">数据概览</div>
        </div>

        <a-row :gutter="16" style="margin-top:25px;">
          <a-col class="gutter-row" :span="12">
            <a-card size="small" style="width: 100%;overflow-y:auto;" :hoverable="true">
              <span style="margin-left:20px;color: #00000073;">基础策略</span><br>
              <span style="margin-left:20px;font-weight: 600;font-size: 16px;">{{dataOverview.baseCount}}</span>
            </a-card>

          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-card size="small" style="width: 100%;overflow-y:auto;" :hoverable="true">
              <span style="margin-left:20px;color: #00000073;">组合策略</span><br>
              <span style="margin-left:20px;font-weight: 600;font-size: 16px;">{{dataOverview.combinationCount}}</span>

            </a-card>
          </a-col>
        </a-row>

        <a-row :gutter="16" style="margin-top:15px;">
          <a-col class="gutter-row" :span="12">
            <a-card size="small" style="width: 100%;overflow-y:auto;" :hoverable="true">
              <span style="margin-left:20px;color: #00000073;">右键策略</span><br>
              <span style="margin-left:20px;font-weight: 600;font-size: 16px;">{{dataOverview.rightclickCount}}</span>
            </a-card>

          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-card size="small" style="width: 100%;overflow-y:auto;" :hoverable="true">
              <span style="margin-left:20px;color: #00000073;">定时策略</span><br>
              <span style="margin-left:20px;font-weight: 600;font-size: 16px;">{{dataOverview.regularCount}}</span>
            </a-card>
          </a-col>
        </a-row>

        <!-- <a-row :gutter="16" style="margin-top:15px;">
          <a-col class="gutter-row" :span="12">
            <a-card size="small" style="width: 100%;overflow-y:auto;" :hoverable="true">
              <span style="margin-left:20px;color: #00000073;">流程定义</span><br>
              <span style="margin-left:20px;font-weight: 600;font-size: 16px;">8</span>
            </a-card>

          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-card size="small" style="width: 100%;overflow-y:auto;" :hoverable="true">
              <span style="margin-left:20px;color: #00000073;">流程实例</span><br>
              <span style="margin-left:20px;font-weight: 600;font-size: 16px;">13</span>
            </a-card>
          </a-col>
        </a-row> -->

      </a-card>

      <a-card size="small" style="width: 100%;overflow-y:auto;margin-top: 10px;height: 350px;" :hoverable="true">
        <div>
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">执行状态统计</div>
        </div>

        <div style="width:200px;height:150px;margin: 0 auto;text-align: center;margin-top: 20px;">
          <a-progress type="circle" :percent="75" style="margin:0 auto">
            <template #format="percent">
              <span style="color: #000;font-weight: 600;font-size: 20p;">2882</span><br>
              <span style="color: #00000073;font-size: 14px;">总数</span>
            </template>
          </a-progress>
        </div>

        <ul class="ul2">
          <li>
            <span>任务总数</span>
            <span>{{executionStatusStatistics.total}}</span>
          </li>

          <li v-for="(item,index) in executionStatusStatistics.list">
            <span>{{item.name}}</span>
            <span>{{item.value}}</span>
          </li>
          <!-- <li>
            <span>执行成功</span>
            <span>2877</span>
          </li>
          <li>
            <span>执行失败</span>
            <span>2</span>
          </li>
          <li>
            <span>执行中断</span>
            <span>0</span>
          </li> -->
        </ul>
      </a-card>
    </a-col>
  </a-row>
  <a-modal v-model:visible="visible" :footer="null" :closable="false" @ok="handleOk" style="width:1400px">
    <div>
      <span style="color:#000;font-size: 18px;font-weight: 600;">执行结果</span>
      <span style="color:#00000073;margin-left: 5px;">(共执行1个设备:成功<span style="color:#67C23A">1</span> 失败<span style="color:#F56C6C">0</span> 中断 <span style="color:#E6A23C">0</span>)</span>
      <span style="margin-left:10px;cursor: pointer;"><sync-outlined /></span>
    </div>

    <a-row :gutter="16" style="margin-top:15px;">
      <a-col class="gutter-row" :span="14">
        <a-card title="产品优势" size="small" style="width: 100%;height:500px;overflow-y:auto;" :hoverable="true">
          <template #extra> <span><clock-circle-outlined /></span><span style="margin-left:5px">2023/04/19 19:47:30</span></template>
          <a-table :pagination="false" :columns="columns1" :data-source="data" bordered :scroll="{ y: 500 }" style="margin-top:10px">

            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <span @click="jumpInfo" style="color:#1890FF">
                  {{ record.name }}
                </span>
              </template>
              <template v-else-if="column.key === 'address'">
                <span><check-circle-two-tone /></span>
                <span style="margin-left:10px;display: inline-block;color: #0BA691;">{{  record.address }}</span>
              </template>

            </template>
          </a-table>
        </a-card>

      </a-col>
      <a-col class="gutter-row" :span="10">
        <a-card title="结果详情" size="small" style="width: 100%;height:500px;overflow-y:auto;" :hoverable="true">
          <p style="width:90%;margin: 0 auto;font-size: 14px;margin-top: 20px;color:#00000073"> <span class="tips">1</span> 获取设备优势(运行成功)(2023/04/19 19:47:30 2023/04/19 19:47:30)</p>
          <a-card size="small" style="width: 90%;margin: 0 auto;margin-top: 20px;" :hoverable="true">
            <p>S5120V2的特点如下:</p>
            <p>1、低功耗。300nA(TYP) 工化审无，能满足交换机低功耗的需求</p>
            <p>2、多种监控电压的选择。周值电压可设置为4.38、4.00、3.08、2.93V、2.6</p>
            <p>3、满足3V，3.3V和5V的电源监控</p>
            <p>4、主动低电平复位，支持最低150mms延时复位信号，并支持推挖输出</p>
            <p>5、宽工作温度范围。-40~125C的工作温度范周支持工业圾的应用场展</p>
          </a-card>
        </a-card>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script setup name="network">
import SafetySysApi from '@/api/SafetySys/SafetySysApi'
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3441767_you5defpxu.js',
});

import { useRouter } from "vue-router";

const route = useRouter()
const dataOverview = ref({})
const executionStatusStatistics = ref({})
const columns = [
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
  }, {
    title: '任务类型',
    dataIndex: 'strategyTypeName',
    key: 'strategyTypeName',
  }, {
    title: '执行状态',
    dataIndex: 'executionStatus',
    key: 'executionStatus',
  }, {
    title: '开始时间',
    key: 'startTime',
    dataIndex: 'startTime',
  }, {
    title: '结束时间',
    key: 'endTime',
    dataIndex: 'endTime',
  }, {
    title: '运行时长(秒)',
    key: 'runTime',
    dataIndex: 'runTime',
  }, {
    title: '执行人',
    key: 'executorName',
    dataIndex: 'executorName',
  }];
const columns1 = [
  {
    title: '设备名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '设备ip',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '设备类型',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '执行状态',
    key: 'address',
    dataIndex: 'address',
  }, {
    title: '操作',
    key: 'time',
    dataIndex: 'time',
  }];
const data = ref([]);

onMounted(() => {
  initData()
});

const initData = () => {
  SafetySysApi.recentExecutionUpdatesPage({}).then((res) => {
    console.log(res)
    data.value = res.records
  }).catch((err) => {
    console.log(err);
  })


  SafetySysApi.dataOverview({}).then((res) => {
    console.log(res)
    dataOverview.value = res
  }).catch((err) => {
    console.log(err);
  })

  SafetySysApi.executionStatusStatistics({}).then((res) => {
    console.log(res)
    executionStatusStatistics.value = res
  }).catch((err) => {
    console.log(err);
  })
}


const jump = (v) => {
  route.push(v)
}




const visible = ref(false);

const jumpInfo = () => {
  visible.value = true
}

defineComponent(() => {
  IconFont
})

</script>
<style lang="less" scoped>
.network {
	width: 22%;
	font-size: 20px;
	padding-top: 15px;
	background-color: rgb(45 94 10);
	border-radius: 100%;
	overflow: hidden;
	height: 100%;
	position: relative;
	top: 10px;
}
.device {
	width: 22%;
	font-size: 20px;
	padding-top: 15px;
	background-color: #5140b4;
	border-radius: 100%;
	overflow: hidden;
	height: 100%;
	position: relative;
	top: 10px;
}
.connect {
	width: 22%;
	font-size: 20px;
	padding-top: 15px;
	background-color: #1890ff;
	border-radius: 100%;
	overflow: hidden;
	height: 100%;
	position: relative;
	top: 10px;
}
.alarm {
	width: 22%;
	font-size: 20px;
	padding-top: 15px;
	background-color: #ff7d18;
	border-radius: 100%;
	overflow: hidden;
	height: 100%;
	position: relative;
	top: 10px;
}
.task {
	width: 22%;
	font-size: 20px;
	padding-top: 15px;
	background-color: #185eff;
	border-radius: 100%;
	overflow: hidden;
	height: 100%;
	position: relative;
	top: 10px;
}
.icon {
	display: flex;
	justify-content: center;
	position: relative;
	color: #fff;
	bottom: 7px;
}
.iconleft {
	width: 4px;
	height: 20px;
	background-color: #0069d2;
	float: left;
}
:deep(.ant-card-body) {
	padding: 10px;
}
.health {
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16px;
	.yuan {
		float: left;
		width: 33%;
		.score {
			width: 100%;
			text-align: center;
		}
		.title {
			font-size: 12px;
			text-align: center;
		}
	}
}
ul li {
	list-style: none;
}
.ul1 > li {
	list-style: none;
	margin-left: 20px;
	background: #f4f4f4;
	padding: 3px 15px;
	border-radius: 5px;
	color: #000000d9;
}
.ul1 > li:hover {
	background: #40a9ff;
	color: #fff;
}
.ul1 {
	display: flex;
}
.ul2 {
	display: flex;
	flex-wrap: wrap;
	li {
		width: 30%;
		text-align: center;
		display: flex;
		flex-direction: column;
		margin-top: 10px;
		span:nth-child(1) {
			color: #000000d9;
		}
		span:nth-child(2) {
			color: #000000d9;
			font-weight: 600;
			font-size: 16px;
		}
	}
}
.tips {
	display: inline-block;
	width: 18px;
	height: 18px;
	text-align: center;
	line-height: 18px;
	border-radius: 50%;
	background: #5e6ce3;
	color: #fff;
}
</style>