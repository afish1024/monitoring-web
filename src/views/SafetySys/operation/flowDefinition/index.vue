<template>

  <a-card style="min-height: 600px; max-height: 1000px;">
    <div>
      <a-form :model="formState" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

        <a-form-item name="password">
          <a-input v-model:value="formState.username">

          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button type="primary" style="margin-left:20px">
            <template #icon>
              <plus-outlined />
            </template>
            添加
          </a-button>
        </a-form-item>

      </a-form>
    </div>
    <div style="margin-top:20px">
      <div class="iconleft"></div>
      <div style="margin-left:15px;font-weight: 600;line-height: 20px;">流程定义上线统计</div>
    </div>

    <a-table :pagination="false" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" style="margin-top:10px" bordered :columns="columns" :data-source="data" :scroll="{ x: 500, y: 1000 }">
      <template #bodyCell="{ column ,record }">
        <template v-if="column.key === 'operation'">
          <a-tag color="green">查看</a-tag>
          <a-tag color="cyan">编辑</a-tag>
        </template>

        <template v-if="column.key === 'address2'">
          <a-tag color="green">查看</a-tag>
        </template>

        <template v-if="column.key === 'type'">
          <a-tag color="green">{{record.type}}</a-tag>
        </template>

        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>

      </template>
    </a-table>
    <a-pagination style="margin-top:40px" v-model:current="current1" show-quick-jumper :total="500" @change="onChange" />
  </a-card>

</template>
<script setup name="network">
const formState = ref({
  username: '',
  type: 'jack',
});
const current1 = ref(1);
const columns = [{
  title: '流程名称',
  width: 200,
  dataIndex: 'name',
  key: 'name',
}, {
  title: '上线状态',
  width: 200,
  dataIndex: 'type',
  key: 'type',
}, {
  title: '触发类型',
  dataIndex: 'address1',
  key: '1',
}, {
  title: '流程类型',
  key: 'address2',
  dataIndex: 'address2',
}, {
  title: '设备类型',
  dataIndex: 'address3',
  key: '3',
}, {
  title: '创建时间     ',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '更新时间',
  dataIndex: 'num',
  key: 'num',
}, {
  title: '创建人  ',
  dataIndex: 'age',
  width: 200,
  key: 'age',
}, {
  title: '操作',
  width: 130,
  key: 'operation',
}];
const data = [{
  key: '1',
  name: '产品优势',
  age: '张三',
  num: '2023-04-04',
  type: '已上线',
  address: '2023-04-04',
  address1: '查阅设备优势',
  address2: 'H3C S5121122',
  address3: 'system',
}, {
  key: '2',
  name: '产品优势',
  type: '已上线',
  age: '李四',
  num: '2023-04-04',
  address: '2023-04-04',
  address1: '查阅设备优势',
  address2: 'H3C S5121122',
  address3: 'system',
}];
</script>
<style lang="less" scoped>
.iconleft {
	width: 4px;
	height: 20px;
	background-color: #0069d2;
	float: left;
}
</style>