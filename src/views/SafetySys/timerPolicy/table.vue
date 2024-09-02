<template>

  <a-card size="small" style="width: 100%;overflow-y:auto;;min-height: 600px;max-height: 800px;" :hoverable="true">
    <div>
      <a-form :model="formState" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

        <a-form-item label="其他条件">
          <a-input v-model:value="formState.searchKey">

          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" @click="search">查询</a-button>
          <a-button type="primary" style="margin-left:10px" @click="$emit('someEvent',addTable)">
            <template #icon>
              <plus-square-two-tone />
            </template>
            添加
          </a-button>
          <a-button style="margin-left:10px" html-type="submit" @click="search(true)">重置</a-button>
        </a-form-item>

      </a-form>
    </div>

    <div style="margin-top:20px">
      <div class="iconleft"></div>
      <div style="margin-left:15px;font-weight: 600;line-height: 20px;">右键策略列表</div>
    </div>

    <a-table :pagination="false" :loading="loading" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" style="margin-top:10px" bordered :columns="columns" :data-source="data" :scroll="{ x: 500, y: 1000 }">
      <template #bodyCell="{ column ,record}">
        <template v-if="column.key === 'operation'">
          <a-tag color="green">查看</a-tag>
          <a-tag color="cyan">编辑</a-tag>
        </template>

        <!-- <template v-if="column.key === 'age'">
          <div>
            <span style="color:#00000073;margin-left: 5px;">共2次 成功<span style="color:#67C23A">1</span> 失败<span style="color:#F56C6C">0</span> 中断 <span style="color:#E6A23C">0</span></span>
          </div>
        </template> -->

        <template v-if="column.key === 'menuType'">
          <span v-if="record.menuType == 'static_information'">静态信息</span>
          <span v-if="record.menuType == 'execution_menu'">执行菜单</span>
        </template>
      </template>
    </a-table>
    <a-pagination style="margin-top:20px" v-model:current="formState.current" v-model:pageSize="formState.size" show-quick-jumper :total="total" @change="onChange" />
  </a-card>

</template>

<script setup name="network">

import SafetySysApi from '@/api/SafetySys/SafetySysApi'
const loading = ref(true)
const total = ref(0)
const formState = ref({
  searchKey: '',
  size: 10,
  current: 1
});
const columns = [{
  title: '策略名称',
  width: 100,
  dataIndex: 'strategyName',
  key: 'strategyName',
}, {
  title: '组合策略',
  width: 100,
  dataIndex: 'combinationStrategy',
  key: 'combinationStrategy',
},
{
  title: '设备类型',
  width: 100,
  dataIndex: 'deviceType',
  key: 'deviceType',
}, {
  title: '执行周期',
  width: 100,
  dataIndex: 'executionCycle',
  key: 'executionCycle',
}, {
  title: '设备数量',
  width: 100,
  dataIndex: 'deviceCount',
  key: 'deviceCount',
}, {
  title: '策略描述  ',
  dataIndex: 'extJson',
  width: 100,
  key: 'extJson',
}, {
  title: '最新执行状态  ',
  dataIndex: 'lastExecutionStatus',
  width: 130,
  key: 'lastExecutionStatus',
}, {
  title: '操作',
  width: 130,
  key: 'operation',
}];
const data = ref([])


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
  if (flag == true) {
    formState.value.searchKey = ''
  }
  loading.value = true
  formState.value.size = 10
  formState.value.current = 1
  initData()
}
const initData = () => {

  SafetySysApi.securityregular(formState.value).then((res) => {
    loading.value = false
    data.value = res.records
    total.value = res.total

  }).catch((err) => {
    console.log(err);
  })
}

</script>
<style lang="less" scoped>
.iconleft {
	width: 4px;
	height: 20px;
	background-color: #0069d2;
	float: left;
}
</style>