<template>

  <a-card size="small" style="width: 100%;overflow-y:auto;;min-height: 600px;max-height: 800px;" :hoverable="true">
    <div>
      <a-form :model="formState" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

        <a-form-item label="关键字" name="searchKey">
          <a-input v-model:value="formState.searchKey">

          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" @click="search">查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="$emit('someEvent',addTable)">
            <template #icon>
              <plus-square-two-tone />
            </template>
            添加
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" @click="search(true)">重置</a-button>
        </a-form-item>

      </a-form>
    </div>

    <div style="margin-top:20px">
      <div class="iconleft"></div>
      <div style="margin-left:15px;font-weight: 600;line-height: 20px;">右键策略列表</div>
      <div style="text-align: right;">
                <a-button @click="deleteBatchMenu()">
                    <template #icon><delete-outlined /></template>
                </a-button>
            </div>
    </div>

    <a-table 
    :pagination="false" 
    :loading="loading" 
    :row-selection="rowSelection" 
    style="margin-top:10px" 
    :row-key="(record) => record.id"
    bordered 
    :columns="columns" 
    :data-source="data" 
    :scroll="{ x: 500, y: 1000 }">
      <template #bodyCell="{ column ,record}">
        <template v-if="column.key === 'operation'">
          <a-tag color="green" @click="lookInfo(record)">查看</a-tag>
          <a-tag color="cyan" @click="editInfo(record)">编辑</a-tag>
          <a-popconfirm title="确认删除吗" ok-text="确认" cancel-text="取消" @confirm="del(record)" @cancel="cancel">
            <a-tag color="red">删除</a-tag>
          </a-popconfirm>
        </template>

        <template v-if="column.key === 'enableStatus'">
          {{ record.enableStatus?'开':'关' }}
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
    <a-pagination 
    :show-total="total => `共${total}条`" 
    style="margin-top:20px" 
    v-model:current="formState.current" 
    v-model:pageSize="formState.size" 
    show-size-changer
    :total="total" 
    @showSizeChange="onShowSizeChange"
    @change="onChange" />
  </a-card>

</template>

<script setup name="network">
import { message, Empty } from 'ant-design-vue'
import addTable from './addTable.vue'
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
  title: '策略KEY',
  width: 100,
  dataIndex: 'strategyKey',
  key: 'strategyKey',
}, {
  title: '策略说明',
  width: 100,
  dataIndex: 'strategyDescription',
  key: 'strategyDescription',
}, {
  title: '启用状态',
  width: 100,
  dataIndex: 'enableStatus',
  key: 'enableStatus',
}, {
  title: '创建时间',
  width: 100,
  dataIndex: 'createTime',
  key: 'createTime',
}, {
  title: '创建人',
  width: 100,
  dataIndex: 'createUser',
  key: 'createUser',
}, {
  title: '操作',
  width: 130,
  key: 'operation',
}];
const data = ref([])


onMounted(() => {
  initData()
});
const selectedRowKeys = ref([])
const rowSelection = {
		onChange: (rowKeys) => {
			selectedRowKeys.value = rowKeys
		}
	}
const onChange = (v) => {
  loading.value = true
  // formState.value.size = 10
  formState.value.current = v
  initData()
}
const onShowSizeChange = (current, pageSize) => {
    // console.log(current);
    formState.value.current = current
    formState.value.size = pageSize;
    initData()
  };
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

  SafetySysApi.securityrightclick(formState.value).then((res) => {
    console.log(res.total)
    loading.value = false
    data.value = res.records
    total.value = res.total

  }).catch((err) => {
    console.log(err);
  })
}

const emit = defineEmits(['some-event'])
const lookInfo = (v) => {
  emit('some-event', addTable, false, v.id, true)
}

const editInfo = (v) => {

  emit('some-event', addTable, false, v.id, false)
}

const del = (v) => {
  SafetySysApi.securityrightclickDel([
    {
      "id": v.id
    }
  ]).then((res) => {
    search()
  }).catch((err) => {
    console.log(err);
  })
}
// 批量删除
const deleteBatchMenu = () => {
    if (selectedRowKeys.value.length < 1) {
        message.warning('请选择一条或多条数据')
        return false
    }
    const params = selectedRowKeys.value.map((m) => {
        return {
            id: m
        }
    })
    SafetySysApi.securityrightclickDel(params).then(()=>{
      search()
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