<template>
    <a-row class="device">
        <a-col :span="24">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="工单模板" force-render>
                    <a-row :gutter="24">
                        <a-col :span="5">
                            <a-card title="工单模板" style="border-top: none;border-left: none;display: flex;" :headStyle="{fontSize:'14px',fontWeight: 'bold'}">
                                
                                <div>
                                    <plus-outlined style="position: absolute;right: 5%;top: 34%;cursor: pointer;" @click="temp.onOpen()"/>
                                </div>
                            </a-card>
                            <a-card style="border-top: none;border-bottom: none;">
                                <div class="myworkorder" v-for="(item,index) in templateDataList" :key="index" @click="clickTemplate(item)">
                                    <div :class="templateId == item.id ? 'divclick' : ''">
                                        <div class="title">{{item.templateName}}</div>
                                        <div class="edit" v-if="templateId == item.id">
                                            <edit-outlined @click="temp.onOpen(item)"/> 
                                            
                                        </div>
                                        <div class="del" v-if="templateId == item.id">
                                            <a-popconfirm title="确定要操作吗？" @confirm="confirm(item)">
                                
                                                <delete-outlined /> 
                                                
                                            </a-popconfirm>
                                        </div>
                                    </div>
                                </div>
                            </a-card>
                            <div style="border-right:1px solid var(--border-color-split);height: 100vh;"></div>
                        </a-col>
                        <a-col :span="19">
                            <a-row :gutter="24" style="margin-right: 0px;">
                                <a-col :span="24" style="padding-left: 0px;">
                                    <a-card style="border-top: none;border-right: none;border-left: none;margin-top: 10px;">
                                        <div class="iconleft"></div>
                                        <div style="float: left;padding-left: 5px;font-weight: bold;">{{templateTitle}}</div>
                                        <div style="text-align: right;">
                                            <a-button type="primary" @click="field.onOpen()">
                                                <template #icon><plus-outlined /></template>
                                                添加字段
                                            </a-button>
                                            
                                        </div>
                                    </a-card>
                                </a-col>
                               
                            </a-row>
                            <a-row :gutter="24" style="margin-top: 5px;">
                                <a-col :span="24" style="font-weight: bold;">基础信息</a-col>
                            </a-row>
                            <a-form ref="searchFormRef"  :label-col="{ span: 8 }">
                                <a-row :gutter="24" style="margin-top: 5px;">
                                    <a-col :span="8">
                                        <a-form-item label="工单模板">
                                            <a-input disabled></a-input>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item label="工单标题">
                                            <a-input disabled></a-input>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8" style="padding-right: 18px;">
                                        <a-form-item label="优先级">
                                            <a-input disabled></a-input>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="24" style="margin-top: 5px;">
                                    <a-col :span="8">
                                        <a-form-item label="处理人">
                                            <a-input disabled></a-input>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item label="工单状态">
                                            <a-input disabled></a-input>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8" style="padding-right: 18px;">
                                        <a-form-item label="工单标签">
                                            <a-input disabled></a-input>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="24" style="margin-top: 5px;">
                                    <a-col :span="24" style="padding-right: 18px;padding-left: 4%;" >
                                        <a-form-item label="工作内容" :label-col="{ span: 2 }">
                                            <a-textarea  disabled></a-textarea>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="24" style="margin-top: 5px;">
                                
                                    <a-col :span="8" style="padding-right: 18px;cursor: pointer;" v-for="(item,index) in templateFieldList" :key="index" >
                                        <a-form-item :label="item.fieldName" v-if="item.fieldType == 'text'">
                                            
                                            <a-input disabled v-if="item.fieldType == 'text'"></a-input>
                                           
                                            <div style="position: absolute;right: -25%;margin-top: -28px;z-index: 9;">
                                                <edit-outlined style="padding-left: 10px;" @click="field.onOpen(item)"/> 
                                                <a-popconfirm title="确定要操作吗？" @confirm="delField(item)">
                                                    <delete-outlined style="padding-left: 10px;"/> 
                                                </a-popconfirm>
                                                
                                            </div>
                                           
                                        </a-form-item>
                                        <a-form-item :label="item.fieldName" v-if="item.fieldType == 'textarea'">
                                            <a-textarea disabled v-if="item.fieldType == 'textarea'" :auto-size="{ minRows: 3, maxRows:5 }"></a-textarea>
                                            <div style="position: absolute;right: -25%;margin-top: -75px;z-index: 9;">
                                                <edit-outlined style="padding-left: 10px;" @click="field.onOpen(item)"/> 
                                                <a-popconfirm title="确定要操作吗？" @confirm="delField(item)">
                                                    <delete-outlined style="padding-left: 10px;"/> 
                                                </a-popconfirm>
                                            </div>
                                        </a-form-item>

                                        <a-form-item :label="item.fieldName"  v-if="item.fieldType == 'file'">
                                            <XnUpload 
                                            :uploadMode="previewUpload" 
                                            @uploadDone="uploadDone" 
                                            uploadTitle="选择文件"
                                            :uploadMumber="1"
                                            v-if="item.fieldType == 'file'"
                                            >
                                            
                                            </XnUpload>
                                            <div style="position: absolute;right: 55px;margin-top: -90px;z-index: 9;">
                                                <edit-outlined style="padding-left: 10px;" @click="field.onOpen(item)"/> 
                                                <a-popconfirm title="确定要操作吗？" @confirm="delField(item)">
                                                    <delete-outlined style="padding-left: 10px;"/> 
                                                </a-popconfirm>
                                            </div>
                                        </a-form-item>
                                    </a-col>
                                </a-row>

                            </a-form>
                        </a-col>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane key="2" tab="SLA配置" force-render>
                    <a-card :bordered="false" style="margin: 10px;">
                        <a-form ref="searchFormRef"  :model="searchFormStateSla">
                            <a-row :gutter="24" >
                                <a-col :span="8">
                                    <a-form-item label="工单模板：" name="worderTemplateId">
                                            <a-select v-model:value="searchFormStateSla.worderTemplateId" placeholder="请选择模板" allowClear>
                                                <a-select-option v-for="item in templateDataList" :key="item.id" :value="item.id">
                                                    {{item.templateName}}
                                                </a-select-option>
                                            </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-item name="slaName" label="SLA名称">
                                        <a-input v-model:value="searchFormState.slaName" placeholder="请输入SLA名称" allow-clear></a-input>
                                    </a-form-item>
                                </a-col>

                                <a-col :span="5">
                                    <a-button type="primary">
                                        <template #icon><SearchOutlined /></template>
                                        查询
                                    </a-button>
                                </a-col>
                                <a-col :span="3" >
                                    <a-button type="primary" @click="sla.onOpen()">
                                        <template #icon><plus-outlined /></template>
                                        添加SLA
                                    </a-button>
                                </a-col>
                            </a-row>
                        </a-form>
                    </a-card>
                    <a-card :bordered="false" style="margin-top: 10px;margin-left: 10px;">
                        <div class="iconleft"></div>
                        <div style="float: left;padding-left: 10px;font-weight: bold;">SLA状态列表</div>
                        <div style="text-align: right;padding-right: 22px;">
                            <a-button @click="deleteBatchMenu()">
                                <template #icon><delete-outlined /></template>
                            </a-button>
                            
                        </div>
                    </a-card>
                    <a-card :bordered="false" style="margin-top: 10px;margin-left: 10px;">
                        <s-table
                            ref="tableSla"
                            :columns="columnsSla"
                            :data="loadDataSla"
                            :expand-row-by-click="true"
                            :alert="optionsSla.alert.show"
                            bordered
                            :row-key="(record) => record.id"
                            :row-selection="optionsSla.rowSelection"
                        >
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.dataIndex === 'isEnabled'">
                                    <a-switch
                                        :loading="loading"
                                        :checked="record.isEnabled === 'yes'"
                                        @change="editStatus(record)"
                                        checked-children="开启" 
                                        un-checked-children="关闭"
							        />
                                </template>
                                <template v-if="column.dataIndex === 'action'">
                                    
                                    <edit-outlined @click="sla.onOpen(record)"/> 
                                    <a-divider type="vertical"/>
                                    <a-popconfirm title="确定要操作吗？" @confirm="delsla(record)">
                                        <delete-outlined /> 
                                    </a-popconfirm>
                                    
                                </template>
                            </template>
                        </s-table>
                    </a-card>
                </a-tab-pane>
                <a-tab-pane key="3" tab="自定义状态" force-render>
                    <a-row :gutter="24">
                        <a-col :span="5">
                            <a-card title="工单模板" style="border-top: none;border-left: none;display: flex;" :headStyle="{color:'rgb(224, 224, 224)',fontSize:'14px'}"></a-card>
                            <a-card style="border-top: none;border-bottom: none;">
                                <div class="myworkorder" v-for="(item,index) in templateDataList" :key="index" @click="clickTemplate(item)">
                                    <div :class="templateId == item.id ? 'divclick' : ''">
                                        <div class="title">{{item.templateName}}</div>
                                    </div>
                                </div>
                            </a-card>
                            <div style="border-right:1px solid var(--border-color-split);height: 100vh;"></div>
                        </a-col>
                        <a-col :span="19">
                            <a-card :bordered="false" style="margin-top: 10px">
                                <a-form ref="searchFormRef"  :model="searchFormState"  :label-col="{ span: 8 }">
                                    <a-row :gutter="24" style="margin-left: -40px;">
                                        <a-col :span="8">
                                            <a-form-item name="searchKey" label="状态名称">
                                                <a-input v-model:value="searchFormState.searchKey" placeholder="请输入状态名称" allow-clear></a-input>
                                            </a-form-item>
                                        </a-col>
                                    
                                        <a-col :span="12">
                                            <a-button type="primary" @click="tableStatus.refresh(true)">
                                                <template #icon><SearchOutlined /></template>
                                                查询
                                            </a-button>
                                        </a-col>
                                        <a-col :span="4" style="padding-left: 25px;">
                                            <a-button type="primary" @click="status.onOpen()">
                                                <template #icon><plus-outlined /></template>
                                                添加状态
                                            </a-button>
                                        </a-col>
                                    </a-row>
                                    
                                </a-form>
                            </a-card>
                            <a-card :bordered="false" style="margin-top: 10px">
                                <div class="iconleft"></div>
                                <div style="float: left;padding-left: 5px;font-weight: bold;">工单状态列表</div>
                                <div style="text-align: right;padding-right: 10px;">
                                    <a-button @click="deleteBatchMenu()">
                                        <template #icon><delete-outlined /></template>
                                    </a-button>
                                    
                                </div>
                            </a-card>
                            <a-card :bordered="false" style="margin-top: 10px">
                                <s-table
                                    ref="tableStatus"
                                    :columns="columns"
                                    :data="loadData"
                                    :expand-row-by-click="true"
                                    :alert="options.alert.show"
                                    bordered
                                    :row-key="(record) => record.id"
                                    :row-selection="options.rowSelection"
                                >
                                        <template #bodyCell="{ column, record }">
                                            <template v-if="column.dataIndex === 'action'">
                                                <div v-if="record.createUser !='1543837863788879871'">
                                                    /
                                                </div>
                                                <div v-else>
                                                    <edit-outlined @click="status.onOpen(record)"/> 
                                                    <a-divider type="vertical"/>
                                                    <a-popconfirm title="确定要操作吗？" @confirm="delstatus(record)">
                                                        <delete-outlined /> 
                                                    </a-popconfirm>
                                                </div>
                                            </template>
                                        
                                        </template>
                                </s-table>
                            </a-card>
                        </a-col>
                    </a-row>
                </a-tab-pane>
            </a-tabs>
        </a-col>
    </a-row>
    <templateInfo ref="temp" @successful="templateFul"></templateInfo>
    <addStatus ref="status" @successful="statusFul" :tempId="templateId"></addStatus>
    <slaInfo ref="sla" @successful="tableSla.refresh(true)" :templateList="templateDataList"></slaInfo>
    <fieldList ref="field" @successful="fieldFul" :tempId="templateId"></fieldList>
</template>
<script setup name="workorderconfig">
import templateInfo from './template.vue'
import addStatus from './status.vue'
import slaInfo from './sla.vue'
import fieldList from './field.vue'
import orderApi from '@/api/workorder/orderApi'
import { message, Empty } from 'ant-design-vue'
import XnUpload from '@/components/XnUpload/index.vue'
import '@/utils/objects'
const previewUpload= 'uploadCard'
const templateDataList = ref([])
const activeKey = ref('1')
const tableStatus = ref()
const templateTitle = ref('')
const temp = ref()
const status = ref()
const tableSla = ref()
const sla = ref()
const field = ref()
const loading = ref(false)
let selectedRowKeys = ref([])
const templateId = ref('')
const templateFieldList = ref([])
const fieldFul = ()=>{
    templateFieldData(templateId.value)
}
const statusFul = ()=>{
    tableStatus.value.refresh(true)
}
// 修改状态
const editStatus = (record) => {
    loading.value = true
    if (record.isEnabled === 'yes') {
            
    } else {
            
    }
}
const templateFul = ()=>{
    templateData()
    
}
onMounted(()=>{
    templateData()
    
})
const clickTemplate = (item)=>{
    templateId.value = item.id
    templateTitle.value = item.templateName
    templateFieldData(templateId.value)
}
const templateFieldData = (id)=>{
    orderApi.getTemplateField({id:id}).then(res=>{
      
        if(res.length > 0){
            res.map((item)=>{
                item.formField = item.fieldName.toPinyin()
            })
        }
        //console.log(res)
        templateFieldList.value = res
    })
}
const templateData = ()=>{
    orderApi.templateList({}).then(res=>{
        templateDataList.value = res.records
        templateId.value = res.records.length > 0 ? res.records[0].id : ''
        templateTitle.value = res.records.length > 0 ? res.records[0].templateName : ''
        // console.log(templateDataList.value)
        templateFieldData(res.records[0].id )
    })
}
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
        },
        getCheckboxProps: record => ({
            disabled: record.createUser != '1543837863788879871',

        }),
    },
    
}
let selectedRowKeysSla = ref([])
const optionsSla = {
    alert: {
        show: false,
        clear: () => {
            selectedRowKeysSla = ref([])
        }
    },
    rowSelection: {
        onChange: (selectedRowKey, selectedRows) => {
            selectedRowKeysSla.value = selectedRowKey
        }
    },
}
let searchFormState = reactive({
   
    searchKey:''
})
let searchFormStateSla = reactive({

})
const loadData = (parameter)=>{
    return orderApi.statusList(Object.assign(parameter, searchFormState)).then((res)=>{
         return res
    })
}

const loadDataSla = (parameter)=>{
    return orderApi.slaPage(Object.assign(parameter, searchFormStateSla)).then((res)=>{
         return res
    })
}
const columnsSla = [
    {
        title: 'SLA名称',
        align: 'center',
        dataIndex: 'slaName',
        sorter: true,
    },
    {
        title: 'SLA描述',
        align: 'center',
        dataIndex: 'slaDescribe',
        sorter: true,
    },
    {
        title: '是否启用',
        align: 'center',
        dataIndex: 'isEnabled',
        sorter: true,
    },
    {
        title: '关联工单模板',
        align: 'center',
        dataIndex: 'worderTemplateId',
        sorter: true,
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right' 
    }
]
const columns = [
    {
        title: '状态名称',
        align: 'center',
        dataIndex: 'statusName',
        sorter: true,
    },
    {
        title: '状态描述',
        align: 'center',
        sorter: true,
        dataIndex: 'statusDescribe'
    },
    {
        title: '创建人',
        align: 'center',
        sorter: true,
        dataIndex: 'createUser'
    },
    {
        title: '操作',
        align: 'center',
        dataIndex: 'action'
    }
]
const confirm = (record) => {
    // console.log(record)
    let params = [
        {
            id: record.id
        }
    ]
    orderApi.delTemplate(params).then(()=>{
        templateData()
    })
    
}
const delstatus = (record)=>{
    let params = [
        {
            id: record.id
        }
    ]
    orderApi.delStatus(params).then(()=>{
       tableStatus.value.refresh(true)
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
    // planApiList.delPlan(params).then(()=>{
    //         table.value.refresh(true)
    //     })
}
</script>
<style lang="less" scoped>
.device {
	width: 100%;
	background-color: #fff;
    .myworkorder{
        margin-top: 5px;
        cursor: pointer;
        line-height:3;
        border-bottom:1px solid var(--border-color-split);
        .title{
            width: 72%;
        }
        .edit{
            margin-top: 15px;
        }
        .del{
            margin-top: 15px;
            margin-right: 10px;
        }
        div{
            display: flex;
            padding-left: 5px;
        }
        .divclick{
            background: rgba(255, 237, 24, 0.14);
            
        }
    }
    .iconleft{
        width: 4px;
        height: 25px;
        background-color: #0069d2;
        float: left;
    }
}
:deep(.ant-card-head){
    // padding: 0;
    padding-left: 10px;
}
:deep(.ant-tabs-nav){
    margin:0;
    padding-left: 10px;
}
// :deep(.ant-card-head-title){
//     font-size: 14px;
//     font-weight: bold;
// }
:deep(.ant-card-body){
    padding: 0 0 5px 0
}
:deep(.ant-upload-select-picture-card){
    pointer-events: none;
}
:deep(.ant-upload.ant-upload-select-picture-card){
    width: 80px;
    height: 80px;
}
</style>