<template>
    <a-row>
        <a-col :span="24">
			<a-card :bordered="false" style="margin-bottom: 10px">
				<a-form ref="searchFormRef" name="advanced_search" class="ant-advanced-search-form" :model="searchFormState">
					<a-row :gutter="24">
						<a-col :span="6">
							<a-form-item name="searchKey" label="IP地址">
								<a-input v-model:value="searchFormState.searchKey" placeholder="请输入IP地址"></a-input>
							</a-form-item>
						</a-col>
                        <a-col :span="6">
                            <a-form-item name="status" label="主机状态" >
                                <a-select v-model:value="searchFormState.status" placeholder="请选主机状态" allowClear>
                                    <a-select-option v-for="item in statusData" :key="item.value" :value="item.value">
                                    {{item.key}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item name="groupId" label="标签" >
                                <a-select v-model:value="searchFormState.groupId" placeholder="请选标签" allowClear>
                                    <a-select-option v-for="item in groupList" :key="item.value" :value="item.value">
                                    {{item.key}}
                                    </a-select-option>
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
            <a-card :bordered="false"><!--:expand-row-by-click="true"-->
                <s-table
                    ref="table"
                    :columns="columns"
                    :data="loadDate"
                    :alert="options.alert.show"
                    bordered
                    :row-key="(record) => record.id"
                    :row-selection="options.rowSelection"
                    :tool-config="toolConfig"
                    :scroll="{ x: 1000 }"
                >
                <template #operator class="table-operator">
                    <!-- <a-space>
                        <a-button type="primary" @click="exportExcel" > 
                            <component v-bind:is="upload-outlined" />
                            导出EXCEL
                        </a-button>
                      
                        <a-button type="primary" @click="addgoods(0)"> 
                            <template #icon><plus-outlined /></template>
                            新增
                        </a-button>
                        
                    </a-space> -->
                </template>
                <template #bodyCell="{ column, record }">
                    <!-- <template v-if="column.dataIndex === 'thumb'">
                        <a-image :src="record.thumb" height="100px" width="100px" />
                    </template> -->
                    <template v-if="column.dataIndex === 'win'">
                        <a-tooltip>
                            <template #title>{{record.win}}1111111</template>
                            <img src="../../../assets/images/index_002.png" style="width: 30px;height: 30px;"/>
                        </a-tooltip>
                    </template>
                    <template v-if="column.dataIndex === 'ip'">
                       <span v-if="record.status == 2" style="background: red;color: #FFF;">
                            
                            <a-tooltip>
                                <template #title>{{record.ip}}可能已下线</template>
                                {{record.ip}}
                            </a-tooltip>
                        </span> 
                       <span v-else>
                            <a-tooltip>
                                <template #title>{{record.ip}}</template>
                                {{record.ip}}
                            </a-tooltip>
                       </span>
                    </template>
                    <template v-if="column.dataIndex === 'upspeed'">
                        {{record.upspeed}}KB/s
                    </template>
                    <template v-if="column.dataIndex === 'downspeed'">
                        {{record.downspeed}}KB/s
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                        <a @click="clickSys(record.id)">系统</a>
                        <a-divider type="vertical" />
                        <a @click="view.onOpen(record)">图表</a>
                        <a-divider type="vertical" />
                        <a @click="view.onOpen(record)">画像</a>
                        
                    </template>
                </template>
                </s-table>
            </a-card>
		</a-col>
    </a-row>
</template>
<script setup name="resourceList">
import { useRouter } from 'vue-router'
// 定义tableDOM
const table = ref(null)
const form = ref()
const searchFormRef = ref()
let searchFormState = reactive({})
const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
let selectedRowKeys = ref([])
const router = useRouter()
// 列表选择配置
const options = {
    alert: {
        show: false,
        clear: () => {
            selectedRowKeys = ref([])
        }
    },
    rowSelection: {
        type:'checkbox',
        onChange: (selectedRowKey, selectedRows) => {
            selectedRowKeys.value = selectedRowKey
        },
        getCheckboxProps: record => ({
            // disabled: record.goodsStatus !== 3,
            // Column configuration not to be checked
            name: record.name,
        }),
    }
}
const columns = [
    {
        title: '序号',
        align: 'center',
        fixed: 'left',
        dataIndex: 'id',
        width: '50px',
    },
    {
        title: '系统',
        dataIndex: 'win',
        align: 'left',
        fixed: 'left',
        width: '80px',
        //ellipsis:true,
    },
    {
        title: 'IP',
        dataIndex: 'ip',
        fixed: 'left',
        ellipsis:true,
        width: '100px',
        sorter: (a, b) => a.ip - b.ip,
        defaultSortOrder: 'descend',
    },
    {
        title: '内存%',
        dataIndex: 'memoryPercentage',
        width: '80px',
        sorter: (a, b) => a.memoryPercentage - b.memoryPercentage,
        defaultSortOrder: 'descend',
    },
    {
        title: 'CPU%',
        dataIndex: 'cpu',
        width: '80px',
        sorter: (a, b) => a.cpu - b.cpu,
        defaultSortOrder: 'descend',
    },
    {
        title: '磁盘%',
        dataIndex: 'disk',
        width: '100px',
        sorter: (a, b) => a.disk - b.disk,
        defaultSortOrder: 'descend',
    },
    {
        title: 'CPU核数',
        dataIndex: 'audit',
        width: '100px',
        sorter: (a, b) => a.audit - b.audit,
        defaultSortOrder: 'descend',
    },
    {
        title: '内存',
        dataIndex: 'memory',
        width: '80px',
    },
    {
        title: '下行速率',
        dataIndex: 'upspeed',
        width: '100px',
        sorter: (a, b) => a.upspeed - b.upspeed,
        defaultSortOrder: 'descend',
    },
    {
        title: '上行速率',
        dataIndex: 'downspeed',
        width: '100px',
        sorter: (a, b) => a.downspeed - b.downspeed,
        defaultSortOrder: 'descend',
    },
    {
        title: '系统负载',
        dataIndex: 'winload',
        width: '100px',
        sorter: (a, b) => a.winload - b.winload,
        defaultSortOrder: 'descend',
    },
    {
        title: '连接数量',
        dataIndex: 'num',
        width: '100px',
        sorter: (a, b) => a.num - b.num,
        defaultSortOrder: 'descend',
    },
    {
        title: '更新时间',
        dataIndex: 'updatedAt',
        width: '150px',
    },
    {
        title: '标签',
        dataIndex: 'gropupName',
        width: '80px',
    },
    {
        title: '备注',
        dataIndex: 'remark',
        width: '120px',
        ellipsis:true,
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '150px'
        
    }
]
const statusData = [
    {
        value: 0,
        key: '全部'
    },
    {
        value:1,
        key:'在线'
    },
    {
        value:2,
        key:'已下线'
    },
    
]
const groupList = [
    {
        value:'1637767401057681408',
        key:'存储'
    },
    {
        value:'1659749792353484800',
        key:'北京'
    },
    {
        value:'1659749814210002944',
        key:'正式'
    },
    
]
// 表格查询 返回 Promise 对象v
const loadDate = (parameter) => {
    return new Promise((resolve)=>{
        return resolve({
            total: 2, 
            current: 1, 
            size: "10", 
            pages: 1, 
            records:[
                {
                    id:1,
                    win:'win',
                    ip:'10.0.3.99',
                    memoryPercentage:'82.3',
                    status:1,
                    cpu:'6.35',
                    disk:'30.25',
                    audit:'8',
                    memory:'7.67G',
                    upspeed:'1.07',
                    downspeed:'0.34',
                    winload:'1.27',
                    num:298,
                    updatedAt:'2023-06-29 16:53:17',
                    gropupName:'北京',
                    remark:'11111111'

                },
                {
                    id:2,
                    win:'win1',
                    ip:'9.0.3.99',
                    memoryPercentage:'80.3',
                    status:2,
                    cpu:'5.35',
                    disk:'20.25',
                    audit:'6',
                    memory:'4.67G',
                    upspeed:'2.07',
                    downspeed:'2.34',
                    winload:'2.27',
                    num:300,
                    updatedAt:'2023-06-29 16:53:17',
                    gropupName:'北京',
                    remark:'222'

                }
            ] 
        })
    })
}
const clickSys = (id)=>{
    router.push({
        path:'/host/sys',
        query: {
            goodsId: id
        }
    })
}
</script>
<style lang="less" scoped>
.snowy-buttom-left{
    margin-left: 8px;
}
</style>