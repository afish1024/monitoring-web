<template>
    <a-row :gutter="24">
        <a-col :span="24">
            <a-card :bordered="false" style="margin-bottom: 10px">
				<a-form ref="searchFormRef" name="advanced_search" class="ant-advanced-search-form" :model="searchFormState">
					<a-row :gutter="24">
						<a-col :span="6">
							<a-form-item name="keywords" label="主机名称">
								<a-input v-model:value="searchFormState.keywords" placeholder="请输入主机名称" allow-clear></a-input>
							</a-form-item>
						</a-col>
                        <a-col :span="6">
                            <a-form-item name="groupId" label="请选择组">
                                <a-select v-model:value="searchFormState.groupId" placeholder="请选择组" allowClear>
                                    <a-select-option v-for="item in hostGroupList" :key="item.id" :value="item.id">{{
                                        item.name
                                    }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                       
						<a-col :span="6">
							<a-button type="primary" @click="table.refresh(true)">
								<template #icon><SearchOutlined /></template>
								查询
							</a-button>
							<a-button class="snowy-buttom-left" @click="() => searchFormRef.resetFields()">
								<template #icon><redo-outlined /></template>
								重置
							</a-button>
						</a-col>
					</a-row>
				</a-form>
			</a-card>
            <a-card :bordered="false">
				<s-table
					ref="table"
					:columns="columns"
					:data="loadData"
					:expand-row-by-click="true"
					:alert="options.alert.show"
					bordered
					:row-key="(record) => record.id"
                    :scroll="{ x: 1000 }"
                    :tool-config="toolConfig"
                    :size="50"
				>
                    <template #operator class="table-operator">
                        <a-space>
                            <a-button type="primary" @click="form.onOpen(undefined)"  v-if="hasPerm('addhosts')">
                                <template #icon><plus-outlined /></template>
                                新增主机
                            </a-button>
                        </a-space>
					</template>
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'monitor_status'">
                            <a-switch
                                :loading="loading"
                                :checked="record.monitor_status =='1' ? true :false"
                                @change="editStatus($event,record)"
                                checked-children="开启" 
                                un-checked-children="关闭"
                            />
                        </template>
                        <template v-if="column.dataIndex === 'nodeName'">
                            <div v-if="record.nodeName.length > 0">
                                 
                                <div :style="{width:'170px',display:'flex',float:'left'}" v-for="(item,index) in record.nodeName" :key="index">
                                    <div :style="{width:(index%2 == 1 ? '80px':'55px'),display:'flex'}"> {{ item.name }}</div>
                                    <div style="width: 90px;display: flex;">
                                        <span>连通性：</span>
                                        <span v-if="item.connect == '1'" style="color:green;">正常</span>
                                        <span v-else style="color: red;">异常</span>
                                    </div>
                                </div>
                                 
                            </div>
                        </template>
                        <template v-if="column.dataIndex === 'msg'">
                            <p v-if="record.msg.length > 0">
                               {{record.msg[0]['content'].substr(0,10)}} 
                               <span style="float: right;color: #1890ff;cursor: pointer;" @click="msgerror.onOpen(record.msg)">更多</span>
                            </p>
                        </template>
                        <template v-if="column.dataIndex === 'network_status'">
                            <span v-if="record.network_status == '0'" style="color: red;">异常</span>
                            <span v-else style="color:green;">正常</span>
                        </template>
                        <template v-if="column.dataIndex === 'status'">
                            <span v-if="record.status == '0'" style="color: red;">异常</span>
                            <span v-else style="color:green;">正常</span>
                        </template>
                        <template v-if="column.dataIndex === 'disk1_usage'">
                            <span v-if="record.disk1_full_name && record.disk1_full_name!='0.00'">{{ record.disk1_full_name }} : {{ record.disk1_usage }}</span>
                            <span v-else>{{ record.disk1_usage }}</span>
                        </template>
                        <template v-if="column.dataIndex === 'disk2_usage'">
                            <span v-if="record.disk2_full_name && record.disk2_full_name!='0.00'">{{ record.disk2_full_name }} : {{ record.disk2_usage }}</span>
                            <span v-else>{{ record.disk2_usage }}</span>
                        </template>
                        <template v-if="column.dataIndex === 'disk3_usage'">
                            <span v-if="record.disk3_full_name && record.disk3_full_name!='0.00'">{{ record.disk3_full_name }} : {{ record.disk3_usage }}</span>
                            <span v-else>{{ record.disk3_usage }}</span>
                        </template>
                        <template v-if="column.dataIndex === 'disk4_usage'">
                            <span v-if="record.disk4_full_name && record.disk4_full_name!='0.00'">{{ record.disk4_full_name }} : {{ record.disk4_usage }}</span>
                            <span v-else>{{ record.disk4_usage }}</span>
                        </template>
                        <template v-if="column.dataIndex === 'disk5_usage'">
                            <span v-if="record.disk5_full_name && record.disk5_full_name!='0.00'">{{ record.disk5_full_name }} : {{ record.disk5_usage }}</span>
                            <span v-else>{{ record.disk5_usage }}</span>
                        </template>
                        <template v-if="column.dataIndex === 'disk6_usage'">
                            <span v-if="record.disk6_full_name && record.disk6_full_name !='0.00'">{{ record.disk6_full_name }} : {{ record.disk6_usage }}</span>
                            <span v-else>{{ record.disk6_usage }}</span>
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                            <a @click="form.onOpen(record)"  v-if="hasPerm('addhosts')">编辑</a>
                            <a-divider type="vertical"  v-if="hasPerm(['addhosts', 'monitoringsystemSetupHosts'], 'and')"/>
                            <a @click="set.onOpen(record)"  v-if="hasPerm('monitoringsystemSetupHosts')">监控系统设置</a>
                            <a-divider type="vertical" v-if="hasPerm(['monitoringsystemSetupHosts', 'hostCategorySettings'], 'and')" />
                            <!-- <a @click="setTypeHost.onOpen(record)"  v-if="hasPerm('hostCategorySettings')">主机类别设置</a>
                            <a-divider type="vertical" v-if="hasPerm(['hostCategorySettings', 'hostsdelete'], 'and')"/> -->
                            <a-popconfirm title="确定删除此主机？" @confirm="removeOrg(record)"  v-if="hasPerm('hostsdelete')">
								<a-button type="link" danger size="small">删除</a-button>
							</a-popconfirm>
                            <a-divider type="vertical" v-if="hasPerm(['hostsdelete', 'hostsInfo'], 'and')"/>
                            <a @click="hostsInfoClick(record)"  v-if="hasPerm('hostsInfo')">详情</a>
                        </template>
                    </template>
				</s-table>
			</a-card>
        </a-col>
        <Form ref="form" @successful="table.refresh(true)" />
        <MonitorSet ref="set" @successful="table.refresh(true)"/>
        <HostType ref="setTypeHost" @successful="table.refresh(true)"/>
        <HostsInfo ref="hostsinfo" @successful="table.refresh(true)"/>
        <MsgError ref="msgerror"></MsgError>
    </a-row>
</template>
<script setup name="hostList">
import { message, Empty } from 'ant-design-vue'
import indexApi from '@/api/python/indexApi'
import Form from './form.vue'
import MonitorSet from './set.vue'
import HostType from'./hosttype.vue'
import HostsInfo from'./hostsinfo.vue'
import router from '@/router/index'
import MsgError from './msgerror.vue' 
let loading = ref(false)
const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
// 定义tableDOM
const table = ref(null)
const form = ref()
const set = ref()
const setTypeHost = ref()
const hostsinfo = ref()
const hostGroupList = ref([])
const hostTemplatelist = ref([])
const searchFormRef = ref()
let selectedRowKeys = ref([])
const msgerror = ref()
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
let searchFormState = reactive({
    keywords:"",
    groupId:null,
    templateId:null,
})
const columns = [
    {
        title: '主机名称',
        fixed: 'left',  
        dataIndex: 'host',
        width: '200px'
    },
    {
        title: 'cpu使用率%',
        dataIndex: 'cpu_usage',
        align: 'center',
        width: '120px',
        sorter: true,
    },
    {
        title: '内存使用率%',
        dataIndex: 'memory_usage',
        align: 'center',
        width: '120px',
        sorter: true,
    },
    {
        title: '网络连通性',
        dataIndex: 'network_status',
        align: 'center',
        width: '120px',
    },
    {
        title: '网络上行速度kbps',
        dataIndex: 'network_bits_recevied',
        align: 'center',
        width: '150px',
        sorter: true,
    },
    {
        title: '网络下行速度kbps',
        dataIndex: 'network_bits_sent',
        align: 'center',
        width: '150px',
        sorter: true,
    },
    {
        title: '磁盘使用率%',
        dataIndex: 'disk1_usage',
        align: 'center',
        width: '140px',
        sorter: true,
    },
    {
        title: '磁盘使用率%',
        dataIndex: 'disk2_usage',
        width: '150px',
    },
    {
        title: '磁盘使用率%',
        dataIndex: 'disk3_usage',
        align: 'center',
        width: '140px',
        sorter: true,
    },
    {
        title: '磁盘使用率%',
        dataIndex: 'disk4_usage',
        align: 'center',
        width: '120px',
    },
    {
        title: '磁盘使用率%',
        dataIndex: 'disk5_usage',
        width: '140px',
        sorter: true,
    },
    {
        title: '磁盘使用率%',
        dataIndex: 'disk6_usage',
        width: '140px',
    },
    {
        title: '磁盘综合使用率%',
        dataIndex: 'disk_usage',
        width: '150px',
        sorter: true,
    },
    {
        title: '监控状态',
        dataIndex: 'monitor_status',
        width: '80px',
    },
    {
        title: '主机IP',
        // fixed: 'left',  
        dataIndex: 'ip',
        width: '120px'
    },
    {
        title: '操作系统',
        dataIndex: 'groupName',
        width: '100px'
    },
    {
        title: '异常状态',
        dataIndex: 'status',
        align: 'center',
        width: '80px',
    },
    {
        title: '健康度',
        dataIndex: 'health_score',
        align: 'center',
        width: '80px',
        sorter: true,
    },
    
    {
        title: '描述',
        dataIndex: 'description',
        width: '120px',
        // ellipsis:true,
    },
    {
        title: '异常消息',
        dataIndex: 'msg',
        width: '200px',
        // ellipsis:true
    },
    {
        title: '数据库',
        dataIndex: 'nodeName',
        width: '380px',
        // ellipsis:true
    },
    {
        title: '节点',
        dataIndex: 'node_flag',
        width: '80px',
        align: 'center',
        customRender: (text) => {
            return text.value == 1 ? '是' :'否'
        }
        // ellipsis:true
    },
    {
        title: '网络',
        dataIndex: 'network_flag',
        width: '80px',
        align: 'center',
        customRender: (text) => {
            return text.value == 1 ? '是' :'否'
        }
        // ellipsis:true
    },
]

// 操作栏通过权限判断是否显示
if (hasPerm(['edithosts','hostsdelete','monitoringsystemSetupHosts','hostCategorySettings','hostsInfo'])) {
    columns.push({
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '350px'
    })
}


// 表格查询 返回 Promise 对象
const loadData = (parameter) => {
    return indexApi.hostListInfo(Object.assign(parameter, searchFormState)).then((res)=>{
        hostGroupList.value = res.hostGrouplist
        hostTemplatelist.value = res.hostTemplatelist
            return res
    })

}
// 批量删除
const deleteBatchRole = () => {
		if (selectedRowKeys.value.length < 1) {
			message.warning('请选择一条或多条数据')
			return false
		}
		const params = selectedRowKeys.value.map((m) => {
			return {
				id: m
			}
		})
        indexApi.delHost(params).then(() => {
			table.value.refresh(true)
		})
	}
// 删除
const removeOrg = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		console.log(params)
        indexApi.delHost(params).then(() => {
			table.value.refresh(true)
		})
	}
const hostsInfoClick = (record) => {
  
    let routeData = router.resolve({ path: '/hostsinfo', query: { hostsid: record.id } });
    window.open(routeData.href, '_blank');
}
const editStatus = (e,record) => {
    loading.value = true
    if(e === false){
        // record.monitor_status = '0'
        indexApi.hostMonitorStatus({hostId:record.id,monitor_status:'0'}).then(()=>{
            loading.value = false
            table.value.refresh(true)
        })
    }else{
        // record.monitor_status = '1'
        indexApi.hostMonitorStatus({hostId:record.id,monitor_status:'1'}).then(()=>{
            loading.value = false
            table.value.refresh(true)
        })
    }
}
</script>
<style lang="less" scoped>
.snowy-buttom-left{
    margin-left: 10px;
}
.ant-table-thead > tr > th {
    border-bottom: none;
}
.green{
    color: red;
}
</style>