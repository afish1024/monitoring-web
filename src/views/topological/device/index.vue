<template>
  <a-row class="device">
    <a-col :span="5" class="bordered-r">
      <a-card class="aside-card" title="设备分类">
        <div>
          <a-tree v-if="treeData.length" v-model:selectedKeys="selectedKeys" @select="handleSelect" :tree-data="treeData" show-icon :field-names="treeFieldNames" default-expand-all>

          </a-tree>
        </div>
      </a-card>
    </a-col>
    <a-col :span="19">
      <a-card class="main">
        <a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
          <a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="" name="deviceName">
                  <a-input v-model:value="searchFormState.deviceName" placeholder="设备名/IP 请输入设备名称或IP" @keyup.enter="table.refresh(true)"></a-input>
                </a-form-item>
              </a-col>
              <a-button type="primary" @click="table.refresh(true)">查询</a-button>
            </a-row>
          </a-form>
        </a-card>
        <a-card :bordered="false">
          <div class="table-tools">
            <h2 class="title">

            </h2>

            <a-space :size="2">
              <a-button @click="form.onOpen()">
                <template #icon><plus-outlined /></template>

              </a-button>
              <a-button @click="deleteModule">
                <template #icon><delete-outlined /></template>
              </a-button>
            </a-space>
          </div>
          <!-- </div> -->
          <s-table ref="table" 
          :columns="columns" 
          :data="loadData" 
          :alert="options.alert.show" 
          bordered :row-key="(record) => record.id" 
          :tool-config="toolConfig" 
          :scroll="{ x: 1000 }" 
          :row-selection="options.rowSelection"
          :size="20"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'ipAddress'">
                {{ record.ipAddress }} : {{ record.devicePort }}
              </template>
              <template v-if="column.dataIndex === 'deviceName'">
                <span style="color:#409EFF;cursor: pointer;" @click="jumpInfo(record.id)">{{ record.deviceName }}</span>
              </template>

              <template v-if="column.dataIndex === 'action'">
                <edit-outlined @click="form.onOpen(record)" />
                <a-divider type="vertical" />
                <eye-outlined @click="jumpInfo(record.id)" />
                <a-divider type="vertical" />
                <a-popconfirm title="确定要操作吗？" @confirm="confirm(record)">
                  <delete-outlined />
                </a-popconfirm>
              </template>
            </template>
          </s-table>
        </a-card>
      </a-card>
    </a-col>
  </a-row>
  <deviceFrom ref="form" @successful="table.refresh(true)" :deviceList="deviceTypeList"></deviceFrom>
  <a-modal :closable="true" v-model:visible="visible" :footer="null" @ok="handleOk" width="1200px">
    <ul class="menuUl">
      <li @click="jump(i.component)" v-for="(i,l) in menuList" :class="[ isActive == i.component ? 'activeClass' : '']">
        <img :src="i.imgSrc" alt="">
        <p>{{i.title}}</p>
      </li>
    </ul>

    <div class="components">
      <component :is="currentComponent" :ids="ids"></component>
    </div>
  </a-modal>
</template>

<script setup name="device">
import { message } from 'ant-design-vue'
import deviceApi from '@/api/topological/deviceApi'
import alarmApi from '@/api/alarm/indexApi'
import deviceFrom from './from.vue'
import overview from '../../topology/rightkey/overview.vue'
import staticInfo from '../../topology/rightkey/staticInfo.vue'
import alarm from '../../topology/rightkey/alarm.vue'
import equipmentLog from '../../topology/rightkey/equipmentLog.vue'
import performance from '../../topology/rightkey/performance.vue'
import sbgl from '@/assets/images/sbgl2.svg';
import ssgj from '@/assets/images/ssgj.svg';
import xnfx from '@/assets/images/xnfx.svg';
import sbrz from '@/assets/images/sbrz.svg';
import jtxx from '@/assets/images/jtxx.svg';
import insertCss from 'insert-css'
insertCss(`
  .g6-component-contextmenu {
    padding: 0
  }
  .g6-component-contextmenu ul {
    margin: 0;
    text-align: center;
  }
  .g6-component-contextmenu ul li {
    padding: 6px 20px;
    list-style:none;
    cursor: pointer;
  }
  .g6-component-contextmenu ul li:hover {
    background: #b4b4b4;
  }
`)
const menuList = ref([
  {
    imgSrc: sbgl,
    title: '设备概览',
    component: overview
  }, {
    imgSrc: ssgj,
    title: '实时告警',
    component: alarm
  },
  {
    imgSrc: xnfx,
    title: '性能分析',
    component: performance
  },
  // {
  //   imgSrc: sbrz,
  //   title: '设备日志',
  //   component: equipmentLog
  // },
  {
    imgSrc: jtxx,
    title: '静态信息',
    component: staticInfo
  }
])
let searchFormState = reactive({
  deviceType: null,
  searchKey: null
})
const formRef = ref()
const table = ref()
const form = ref()
const deviceTypeList = ref([])

const visible = ref(false);
const isActive = ref(overview);
const currentComponent = ref(overview);

const jump = (v) => {
  isActive.value = v
  currentComponent.value = v
}

import { ref, provide } from 'vue';
const ids = ref('')
const jumpInfo = (v) => {
  ids.value = v

  isActive.value = overview
  currentComponent.value = overview
  visible.value = true
  // setTimeout(() => {
  //   provide('ids', computed(() => ids))
  // }, 1000)

  // provide('ids', computed(() => ids))
  // provide('ids', ids)
}



const treeData = ref([
  {
    dictLabel: '全部',
    dictValue: '-1',
    children: []
  }
])
const selectedKeys = ref(['-1'])
const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }

const treeFieldNames = { children: 'children', title: 'dictLabel', key: 'dictValue' }
const columns = [
  {

    title: '设备名称',
    width: 200,
    dataIndex: 'deviceName',
    key: 'deviceName',
  },
  {
    title: 'IP/端口',
    dataIndex: 'ipAddress',
    sorter: false,
    width: 150
  },
  {
			title: '所属网络',
			dataIndex: 'networkName',
			width: 120
	},
  {
    title: '监控状态',
    dataIndex: 'monitoringStatusName',
    width: 80
  },
  {
    title: '设备状态',
    dataIndex: 'deviceStatusName',
    width: 80
  },

  {
    title: '告警信息',
    dataIndex: 'alarmInformation',
    sorter: true,
    width: 100
  },
  {
    title: '最新监控时间',
    dataIndex: 'discoveryTime',
    sorter: true,
    width: 140
  },
  {
    title: '设备类型',
    dataIndex: 'deviceTypeName',
    sorter: true,
    width: 100,
    customRender: (text) => {

    }
  },
  {
    title: '在线状态',
    dataIndex: 'onlineStatusName',
    sorter: true,
    width: 100
  },
  {
    title: '描述',
    dataIndex: 'remark',
    width: 100,
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: '100px'
  }
]
let selectedRowKeys = ref([])
// 列表选择配置
const options = {
  alert: {
    show: false,
    clear: () => {
      selectedRowKeys = ref([])
    }
  },
  rowSelection: {
    onChange: (selectedRowKey, selectedRows) => {
      selectedRowKeys.value = selectedRowKey
    }
  }
}
const loadData = (parameter) => {
  return deviceApi.devicePage(Object.assign(parameter, searchFormState)).then((res) => {
    return res
  })
}

const handleSelect = (selectedKeys, e) => {
  //  console.log(selectedKeys)
  if (selectedKeys.length > 0) {
    const node = e.node;
    if (node.dictValue == '-1') {
      searchFormState.deviceType = null
    } else {
      if (node.dictValue) {
        searchFormState.deviceType = node.dictValue
      } else {
        searchFormState.deviceType = null
      }
    }

  } else {
    searchFormState.deviceType = null
  }
  table.value.refresh(true)
}
onMounted(() => {
  loadTreeData()
})
const loadTreeData = () => {
  alarmApi.alramTypeListForLabel({ dictValue: 'DEVICE_TYPE' }).then(res => {
    deviceTypeList.value = res
    treeData.value[0].children = res
  })
}
// 删除
const confirm = (record) => {
  let params = [
    {
      id: record.id
    }
  ]
  deviceApi.deviceDelete(params).then(() => {
    table.value.refresh(true)
  })
}
// 批量删除
const deleteModule = () => {
  if (selectedRowKeys.value.length < 1) {
    message.warning('请选择一条或多条数据')
    return false
  }
  const params = selectedRowKeys.value.map((m) => {
    return {
      id: m
    }
  })
  deviceApi.deviceDelete(params).then(() => {
    table.value.refresh(true)
  })
}
</script>

<style lang="less" scoped>
.device {
	width: 100%;
	background-color: #fff;

	.aside-card {
		border: 0;
	}
}
.bordered-r {
	border-right: 1px solid var(--border-color-split);
}
.main {
	flex-grow: 1;
}
.table-tools {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.title {
		padding-left: 10px;
		line-height: 16px;
		font-weight: 500;
		font-size: 16px;
		border-left: 4px solid #3a6fd7;
	}

	.btn-group {
		// margin-right: 15px;
		margin-left: 15px;
		box-sizing: border-box;
		padding: 0;
		color: #000000d9;
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5715;
		list-style: none;
		font-feature-settings: 'tnum';
		display: inline-block;
		font-size: 0;
		border: 1px solid #d9d9d9;
		border-radius: 2px;
		background-color: #fff;
	}
	.btn-group .ant-btn {
		border: 0;
	}
	.btn-group .ant-btn ~ .ant-btn {
		border-left: 1px solid #d9d9d9;
	}
}

.activeClass {
	background: #f0f1fe;
}
.menuUl {
	display: flex;
}
.menuUl li {
	list-style: none;
	border-radius: 5px;
	cursor: pointer;
	margin-right: 20px;
	width: 80px;
	height: 80px;
	padding-top: 5px;
	p {
		width: 100%;
		text-align: center;
		font-weight: 600;
	}
	// padding: 10px 10px 10px 10px;
	img {
		width: 50px;
		height: 50px;
		margin: 0 auto;
		display: block;
	}
}
</style>
