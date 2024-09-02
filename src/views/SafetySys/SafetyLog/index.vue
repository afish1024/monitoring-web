<template>

  <a-card style="min-height: 600px; max-height: 1000px;">
    <div>
      <a-form :model="formState" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

        <a-form-item label="策略名称">
          <a-input v-model:value="formState.strategyName">

          </a-input>
        </a-form-item>
        <a-form-item label="选择时间">
          <a-range-picker v-model:value="value1" value-format="YYYY-MM-DD" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" @click="search">查询</a-button>
          <a-button style="margin-left:10px" html-type="submit" @click="search(true)">重置</a-button>
        </a-form-item>

      </a-form>
    </div>
    <div style="margin-top:20px">
      <div class="iconleft"></div>
      <div style="margin-left:15px;font-weight: 600;line-height: 20px;">下发任务列表</div>
    </div>

    <a-table :loading="loading" :pagination="false" style="margin-top:10px" bordered :columns="columns" :data-source="data" :scroll="{ x: 500, y: 1000 }">
      <template #bodyCell="{ column ,record }">
        <template v-if="column.key === 'operation'">
          <a-tag color="green" @click="lookInfo(record)">查看</a-tag>
        </template>

        <template v-if="column.key === 'strategyType'">
          <span v-if="record.strategyType == 'base'">基础策略</span>
          <span v-if="record.strategyType == 'combination'">组合策略</span>
          <span v-if="record.strategyType == 'rightclick'">右键策略</span>
          <span v-if="record.strategyType == 'regular'">定时策略</span>
        </template>

        <template v-if="column.key === 'executionStatus'">
          <span v-if="record.executionStatus == 'pending'">待执行</span>
          <span v-if="record.executionStatus == 'executing'">执行中</span>
          <span v-if="record.executionStatus == 'successful'">执行成功</span>
          <span v-if="record.executionStatus == 'failed'">执行失败</span>
          <span v-if="record.executionStatus == 'interrupted'">执行中断</span>
        </template>

      </template>
    </a-table>
    <a-pagination style="margin-top:20px" v-model:current="formState.current" v-model:pageSize="formState.size" show-quick-jumper :total="total" @change="onChange" />
  </a-card>
  <a-modal :footer="null" v-model:visible="visible" :label-col="labelCol" title="详情">
    <a-form :wrapper-col="wrapperCol">
      <a-form-item label="策略名称">
        <a-input v-model:value="formData.strategyName" />
      </a-form-item>
      <a-form-item label="策略类型">
        <a-input v-model:value="formData.strategyType" />
      </a-form-item>

      <a-form-item label="执行状态">
        <a-input v-model:value="formData.executionStatus" />
      </a-form-item>

      <a-form-item label="操 作 人">
        <a-input v-model:value="formData.executorName" />
      </a-form-item>
      <a-form-item label="执行时间">
        <a-input v-model:value="formData.executionTime" />
      </a-form-item>

    </a-form>
  </a-modal>

</template>
<script setup name="network">

import { toRaw } from "@vue/reactivity";
import SafetySysApi from '@/api/SafetySys/SafetySysApi'
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
const loading = ref(true)
const total = ref(0)
const labelCol = {
  style: {
    width: '150px',
  },
}
const formState = ref({
  size: 10,
  strategyName: '',
  current: 1,
  startDate: null,
  endDate: null
})
const value1 = ref([])
const columns = [{
  title: '策略名称',
  width: 120,
  dataIndex: 'strategyName',
  key: 'strategyName',
}, {
  title: '策略类型',
  width: 120,
  dataIndex: 'strategyType',
  key: 'strategyType',
},
{
  title: '执行状态',
  width: 120,
  dataIndex: 'executionStatus',
  key: 'executionStatus',
}, {
  title: '操作人',
  width: 120,
  dataIndex: 'executorName',
  key: 'executorName',
}, {
  title: '执行时间',
  width: 120,
  dataIndex: 'executionTime',
  key: 'executionTime',
}, {
  title: '操作',
  width: 130,
  key: 'operation',
}];

const strategyTypes = ref({
  base: '基础策略',
  combination: '组合策略',
  rightclick: '右键策略',
  regular: '定时策略',
})

const executionStatuss = ref({
  pending: '待执行',
  executing: '执行中',
  successful: '执行成功',
  failed: '执行失败',
  interrupted: '执行中断'
})
const data = ref([])
const formData = ref({
  strategyName: "",
  strategyType: "",
  executionStatus: "",
  operator: "",
  executionTime: "",
  executorName:"",
})
onMounted(() => {
  initData()
});

const onChange = (v) => {
  loading.value = true
  formState.value.size = 10
  formState.value.current = v
  initData()
}

const search = (flag = false) => {
  if (value1.value && value1.value[0]) {
    formState.value.startDate = value1.value[0]
    formState.value.endDate = value1.value[1]
  } else {
    formState.value.startDate = null
    formState.value.endDate = null
  }

  if (flag == true) {
    formState.value.startDate = null
    formState.value.endDate = null
    formState.value.strategyName = ''
    formState.value.size = 10
    formState.value.current = 1
  }
  loading.value = true
  formState.value.size = 10
  formState.value.current = 1
  initData()
}
const initData = () => {

  SafetySysApi.securitytask(formState.value).then((res) => {
    console.log(res.total)
    loading.value = false
    data.value = res.records
    total.value = res.total

  }).catch((err) => {
    console.log(err);
  })
}

const visible = ref(false);
const lookInfo = (v) => {
  let list = toRaw(v)
  formData.value.strategyName = list.strategyName
  formData.value.strategyType = strategyTypes.value[list.strategyType]
  formData.value.executionStatus = executionStatuss.value[list.executionStatus]
  formData.value.operator = list.operator
  formData.value.executionTime = list.executionTime
  formData.value.executorName = list.executorName
  visible.value = true;
};
</script>
<style lang="less" scoped>
.iconleft {
	width: 4px;
	height: 20px;
	background-color: #0069d2;
	float: left;
}
</style>