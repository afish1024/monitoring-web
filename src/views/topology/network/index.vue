<template>
    <a-row>
        <a-col :span="24">
            <a-card :bordered="false" style="margin-bottom: 10px">
                <a-form ref="searchFormRef" class="ant-advanced-search-form" :model="searchFormState">
                    <a-row :gutter="24">
						<a-col :span="8">
							<a-form-item name="keywords" label="网络名称">
								<a-input v-model:value="searchFormState.keywords" placeholder="请输入网络名称" allow-clear></a-input>
							</a-form-item>
						</a-col>
                        <a-col :span="8">
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
        </a-col>
    </a-row>
    <a-row :gutter="24">
        <a-col :span="24" style="padding-left: 11px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">网络列表</div>
                <div style="text-align: right;">
                    <a-button @click="form.onOpen()">
                        <template #icon><plus-outlined /></template>

                    </a-button>
                </div>
            </a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: -10px;">
        <a-col :span="24" style="padding-left: 11px;">
            <!-- :alert="options.alert.show" :row-selection="options.rowSelection" -->
            <a-card :bordered="false">
                <s-table
					ref="table"
					:columns="columns"
					:data="loadData"
					:expand-row-by-click="true"
					bordered
					:row-key="(record) => record.id"
				>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.dataIndex === 'action'">
                                <edit-outlined @click="form.onOpen(record)" v-if="record.id > 0"/> 
                                <a-divider type="vertical" v-if="record.id > 0"/>
                                <a-popconfirm title="确定要操作吗？" @confirm="confirm(record)" v-if="record.id > 0">
                                     <delete-outlined /> 
                                </a-popconfirm>
                            </template>
                        
                        </template>
                </s-table>
			</a-card>
        </a-col>
        <FromNetwork ref="form" @successful="table.refresh(true)"></FromNetwork>
    </a-row>
</template>
<script setup name="networkList">
import { message, Empty } from 'ant-design-vue'
import networkApi from '@/api/topology/networkApi'
import FromNetwork from './formnetwork.vue'
const table = ref()
const form = ref()
let searchFormState = reactive({
    keywords:"",
})
// 列表选择配置
// const options = {
//     alert: {
//         show: false,
//         clear: () => {
//             selectedRowKeys = ref([])
//         }
//     },
//     rowSelection: {
//         onChange: (selectedRowKey, selectedRows) => {
//             selectedRowKeys.value = selectedRowKey
//         }
//     }
// }
const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }

const columns = [
    {
        title: '网络名称',
        fixed: 'left',  
        dataIndex: 'networkName',
        width: '100px'
    },
    {
        title: '网络状态',
        fixed: 'left',  
        dataIndex: 'networkStatusName',
        width: '100px'
    },
    {
        title: '网络类型',
        fixed: 'left',  
        dataIndex: 'type',
        width: '100px',
        customRender: (text) => {
            switch(text.value) {
                case 'intranet':
                return '企业网络';
                case 'equipment':
                return '终端设备';
            }
        }
    },
    {
        title: '网络描述',
        fixed: 'left',  
        dataIndex: 'networkDescribe',
        width: '100px',
        ellipsis:true
    },
    {
        title: '添加时间',
        fixed: 'left',  
        dataIndex: 'createTime',
        width: '120px'
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '120px'
    }
]
const loadData = (parameter)=>{
    return networkApi.networkList(Object.assign(parameter, searchFormState)).then((res)=>{
         return res
    })
}
</script>
<style lang="less" scoped>
.snowy-buttom-left{
    margin-left: 10px;
}
.iconleft{
    width: 4px;
    height: 25px;
    background-color: #0069d2;
    float: left;
}
:deep(.ant-card-body){
 padding: 10px;
}
</style>