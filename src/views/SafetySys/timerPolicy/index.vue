<template>

  <a-row :gutter="16">
    <!-- <a-col :span="5">
      <a-card title="策略分类" size="small" style="width: 100%;overflow-y:auto;min-height: 600px;max-height: 800px;" :hoverable="true">

        <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" :tree-data="treeData">
          <template #title="{ dictLabel }">
            <span v-if="dictLabel.indexOf(searchValue) > -1">
              {{ dictLabel.substr(0, dictLabel.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ dictLabel.substr(dictLabel.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ dictLabel }}</span>
          </template>
        </a-tree>
      </a-card>

    </a-col> -->
    <a-col :span="24">

      <a-card size="small" style="width: 100%;overflow-y:auto;;min-height: 600px;max-height: 800px;" :hoverable="true">
        <div>
          <a-form :model="formState1" name="horizontal_login" layout="inline" autocomplete="off">

            <a-form-item label="其他条件">
              <a-input v-model:value="formState1.searchKey">

              </a-input>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" @click="search">查询</a-button>
              <a-button type="primary" style="margin-left:10px" @click="addData">
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
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">定时策略列表</div>
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
        bordered :columns="columns" 
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
        <!-- <a-pagination style="margin-top:20px" v-model:current="formState.current" v-model:pageSize="formState.size" show-quick-jumper :total="total" @change="onChange" /> -->
        <a-pagination 
        :show-total="total => `共${total}条`" 
        style="margin-top:20px" 
        v-model:current="formState1.current"
         v-model:pageSize="formState1.size" 
         show-size-changer
         :total="total" 
         @showSizeChange="onShowSizeChange"
         @change="onChange" />
      </a-card>

      <!-- <component @some-event="callback" :is="currentComponent"></component> -->
    </a-col>

  </a-row>
  <a-drawer title="定时策略详情" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" :footer-style="{ textAlign: 'right' }" @close="onClose">
    <p style="font-size:18px;font-weight: 600;">基本参数</p>

    <a-form ref="formRef" :model="formState" @finish="onFinish" :label-col="{span: 6, offset: 2}" :wrapper-col="wrapperCol">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="策略名称" name="strategyName" :rules="[{ required: true, message: '请输入策略名称!' }]">
            <a-input :disabled='disabled' v-model:value="formState.strategyName" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="执行周期" name="executionCycle" :rules="[{ required: true, message: '请输入执行周期!' }]">
            <a-input :disabled='disabled' v-model:value="formState.executionCycle" placeholder="请输入" />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="设备类型" name="deviceType" :rules="[{ required: true, message: '请输入设备分类!' }]">
            <a-input :disabled='disabled' v-model:value="formState.deviceType" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="设备数量" name="deviceCount" :rules="[{ required: true, message: '请输入设备数量!' }]">
            <a-input :disabled='disabled' v-model:value="formState.deviceCount" placeholder="请输入" />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="组合策略" name="combinationStrategy" :rules="[{ required: true, message: '请输入组合策略!' }]">
            <a-input :disabled='disabled' v-model:value="formState.combinationStrategy" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="接收人" name="recipient" :rules="[{ required: true, message: '请输入接收人!' }]">
            <a-input :disabled='disabled' v-model:value="formState.recipient" placeholder="请输入" />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="策略描述" name="extJson" :rules="[{ required: true, message: '请输入策略名称!' }]">
            <a-textarea :disabled='disabled' v-model:value="formState.extJson" placeholder="请输入" :rows="2" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="启用状态" name="enableStatus" :rules="[{ required: true, message: '请选择策略分类!' }]">
            <a-switch :disabled='disabled' v-model:checked="formState.enableStatus" />
          </a-form-item>
        </a-col>

      </a-row>
      <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
        <a-button :disabled='disabled' type="primary" html-type="submit">保存</a-button>
      </a-form-item>

    </a-form>

  </a-drawer>
</template>
<script setup name="network">
import { ref } from 'vue';
import { toRaw } from "@vue/reactivity";
import SafetySysApi from '@/api/SafetySys/SafetySysApi'
import table from './table.vue'
import { message, Empty } from 'ant-design-vue'
const currentComponent = ref(table);
const defaultExpandedKeys = ref([])
const ids = ref('')
const formRef = ref();
const disabled = ref(false)
const formState = reactive({
  strategyName: '',
  deviceType: '',
  executionCycle: '',
  deviceCount: '',
  recipient: '',
  enableStatus: true,
  extJson: '',
  combinationStrategy: '',
  id: ''
})
const selectedRowKeys = ref([])
const rowSelection = {
		onChange: (rowKeys) => {
			selectedRowKeys.value = rowKeys
		}
	}
  
const loading = ref(true)
const total = ref(0)
const formState1 = ref({
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
  width: 150,
  key: 'operation',
}];
const data = ref([])




const visible = ref(false);
const strategyModel = ref(
  [
    {
      title: 'FTP登录文件服务器'
    },
    {
      title: 'FTP服务密码输入'
    },
    {
      title: '拉取文件'
    },
    {
      title: 'FTP退出'
    }
  ]
)
const onClose = () => {
  visible.value = false;
};

const addData = () => {
  visible.value = true
  disabled.value = false
  formState.strategyName = ''
  formState.deviceType = ''
  formState.executionCycle = ''
  formState.deviceCount = ''
  formState.recipient = ''
  formState.enableStatus = true,
    formState.extJson = ''
  formState.combinationStrategy = ''
  formState.id = ''
}

const expandedKeys = ref(['0-0-0', '0-0-1']);
const treeData = ref([])

onMounted(() => {
  initData()
  initData1()
})
const initData = () => {
  SafetySysApi.listForLabel({ dictValue: 'STRATEGY_SORT' }).then((res) => {
    console.log(res)
    if (res !== null) {
      treeData.value = [
        {
          id: 0,
          parentId: '-1',
          dictLabel: '全部',
          children: res
        }
      ]
      treeData.value.forEach((item) => {
        defaultExpandedKeys.value.push(item.id)
        if (item.children) {
          item.children.forEach((items) => {
            defaultExpandedKeys.value.push(items.id)
          })
        }
      })
    }

  }).catch((err) => {
    console.log(err);
  })


}



const onFinish = values => {
  const value = toRaw(formState)
  if (value.id == '' || value.id == null) {
    SafetySysApi.securityregularAdd(value).then((res) => {
      setTimeout(() => {
        formRef.value.resetFields();
        visible.value = false
        initData1()
      }, 500)
    }).catch((err) => {
      console.log(err);
    })
  } else {
    SafetySysApi.securityregularEdit(value).then((res) => {
      setTimeout(() => {
        formRef.value.resetFields();
        visible.value = false
        initData1()
      }, 500)
    }).catch((err) => {
      console.log(err);
    })
  }

};

const onChange = (v) => {

  loading.value = true
  // formState1.value.size = 10
  formState1.value.current = v
  initData1()
}
const onShowSizeChange = (current, pageSize) => {
    // console.log(current);
    formState1.value.current = current
    formState1.value.size = pageSize;
    initData1()
  };
const search = (flag = false) => {
  if (flag == true) {
    formState1.value.searchKey = ''
  }
  loading.value = true
  formState1.value.size = 10
  formState1.value.current = 1
  initData1()
}
const initData1 = () => {

  SafetySysApi.securityregular(formState1.value).then((res) => {
    loading.value = false
    data.value = res.records
    total.value = res.total

  }).catch((err) => {
    console.log(err);
  })
}


const lookInfo = (v) => {
  visible.value = true
  disabled.value = true
  formState.strategyName = v.strategyName
  formState.deviceType = v.deviceType
  formState.executionCycle = v.executionCycle
  formState.deviceCount = v.deviceCount
  formState.recipient = v.recipient
  formState.enableStatus = v.enableStatus
  formState.extJson = v.extJson
  formState.combinationStrategy = v.combinationStrategy
  formState.id = ''

}

const editInfo = (v) => {
  visible.value = true
  disabled.value = false
  formState.strategyName = v.strategyName
  formState.deviceType = v.deviceType
  formState.executionCycle = v.executionCycle
  formState.deviceCount = v.deviceCount
  formState.recipient = v.recipient
  formState.enableStatus = v.enableStatus
  formState.extJson = v.extJson
  formState.combinationStrategy = v.combinationStrategy
  formState.id = v.id
}


const del = (v) => {
  SafetySysApi.securityregularDel([
    {
      "id": v.id
    }
  ]).then((res) => {
    initData1()
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
    SafetySysApi.securityregularDel(params).then(()=>{
      initData1()
        })
}
</script>
<style lang="less" scoped>
.iconleft{
    width: 4px;
    height: 25px;
    background-color: #0069d2;
    float: left;
}
</style>