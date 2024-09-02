<template>

  <a-card size="small" style="width: 100%;overflow-y:auto;;min-height: 600px;max-height: 800px;" :hoverable="true">
    <div>
      <a-form :model="formState" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="协议类型" name="username">
          <a-select ref="select" v-model:value="formState.type" style="width:200px">
            <a-select-option value="jack">类型1</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="其他条件" name="searchKey">
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
      </a-form>
    </div>

    <div style="margin-top:20px">
      <div class="iconleft"></div>
      <div style="margin-left:15px;font-weight: 600;line-height: 20px;">基础策略列表</div>
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
    bordered 
    :columns="columns" 
    :row-key="(record) => record.id"
    :data-source="data" 
    :scroll="{ x: 1000 }">
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
      </template>
    </a-table>
    <a-pagination :show-total="total => `共${total}条`" 
      style="margin-top:20px" 
      v-model:current="formState.current" 
      v-model:pageSize="formState.size" 
      show-size-changer
      :total="total" 
      @change="onChange" 
      @showSizeChange="onShowSizeChange"
      />
  </a-card>

</template>

<script setup name="network">
import SafetySysApi from '@/api/SafetySys/SafetySysApi'
import { message, Empty } from 'ant-design-vue'
import addTable from './addTable.vue'
const checked1 = ref(true)
const loading = ref(true)
const formState = ref({
  searchKey: '',
  size: 10,
  current: 1,
  strategySort: ''
});
const total = ref(0)
const columns = [{
  title: '基础策略名称',
  width: 120,
  dataIndex: 'strategyName',
  key: 'strategyName',
  fixed: true,
}, {
  title: '策略命令',
  width: 120,
  dataIndex: 'strategicCommand',
  key: 'strategicCommand',
}, {
  title: '策略行为',
  dataIndex: 'strategicBehavior',
  width: 120,
  key: 'strategicBehavior',
}, {
  title: '策略分类',
  dataIndex: 'strategySort',
  width: 120,
  key: 'strategySort',
}, {
  title: '策略描述',
  dataIndex: 'strategyRemark',
  width: 120,
  key: 'strategyRemark',
}, {
  title: '启用状态',
  width: 120,
  dataIndex: 'enableStatus',
  key: 'enableStatus',
}, {
  title: '操作',
  width: 180,
  key: 'operation',
}];
const data = ref([])

const props = defineProps({
  cid: {
    default: String
  },
});
watch(props, (value, old) => {
  console.log(props.cid)
  if (props.cid == 0) {
    props.cid = ''
  }
  formState.value.strategySort = props.cid
  loading.value = true
  formState.value.size = 10
  formState.value.current = 1
  initData()
})


onMounted(() => {
  initData()
});
const search = () => {
  loading.value = true
  formState.value.size = 10
  formState.value.current = 1
  initData()
}
const selectedRowKeys = ref([])
const rowSelection = {
		onChange: (rowKeys) => {
			selectedRowKeys.value = rowKeys
		}
	}
const onChange = (v) => {
  // console.log(v)
  loading.value = true
  // formState.value.size = 10
  formState.value.current = v
  initData()
}
const onShowSizeChange = (current, pageSize) => {
    console.log(current);
    formState.value.current = current
    formState.value.size = pageSize;
    initData()
  };
const emit = defineEmits(['some-event'])
const lookInfo = (v) => {
  emit('some-event', addTable, false, v.id, true)
}

const editInfo = (v) => {
  emit('some-event', addTable, false, v.id, false)
}

const del = (v) => {
  SafetySysApi.securitybaseDel([
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
    SafetySysApi.securitybaseDel(params).then(()=>{
      search()
        })
}
const initData = () => {

  SafetySysApi.securitybase(formState.value).then((res) => {
    data.value = res.records
    loading.value = false
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