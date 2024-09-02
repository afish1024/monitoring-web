<template>
    <a-drawer
		:title="formData.hostId ? '编辑主机' : '增加主机'"
		:width="620"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
		:maskClosable="false"
	>
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-form-item label="主机名称：" name="host">
                        <a-input v-model:value="formData.host" placeholder="请输入主机名称" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-form-item name="groupId" label="请选择系统">
                        <a-select v-model:value="formData.groupId" placeholder="请选择组" allowClear @change="changeGroup($event)" :disabled="formData.hostId ? true:false">
                            <a-select-option v-for="item in hostGroupList" :key="item.id" :value="item.id">{{
                                item.name
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-form-item label="主机IP：" name="hostIp">
                        <a-input v-model:value="formData.hostIp" placeholder="请输入主机ip" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="24">
                   <a-form-item>
                    <a-button type="primary"  @click="mytable.onOpen(myTableInfo)">选择模板</a-button>
                        <!-- <div >
                            <a-checkbox-group v-model:value="templateCheckId" @change="templateCheckbox($event)" style="line-height: 2.75;">
                                <div v-for="(item,index) in hostTemplatelist" :key="index" style="display: flex;">
                                    <span v-if="item.show">
                                            <a-checkbox :value="item.id" >{{item.name}}</a-checkbox>
                                    </span>
                                    <span v-else style="width: 130px;">
                                        {{ item.name }}
                                    </span>

                                    <div v-if="typeof(item.child)!='undefined' && item.child.length > 0">
                                        <a-radio-group v-model:value="templateRadioIdValue" @change="templateRadio($event)" >
                                            <div v-for="(item_1,index_1) in item.child" :key="index_1" style="margin-left: 20px;margin-top: 8px;">
                                                <a-radio :value="item_1.id">{{item_1.name}}</a-radio>
                                            </div> 
                                        </a-radio-group>
                                    </div>
                                </div>
                            </a-checkbox-group>
                        </div> -->
                    </a-form-item>
                </a-col>
            </a-row>
            <!-- <a-row :gutter="24">
                <a-col :span="24">
                   <a-form-item>
                        <div style="border: 1px solid #eee;">
                            <a-row :gutter="24" v-for="(item,index) in hostTemplateinfo" :key="index" style="line-height: 2.75;">
                                <a-col :span="12">{{ item.name }}</a-col>
                                <a-col :span="12">
                                    <a-button danger @click="del(index,item.id)" size="small">移除</a-button>
                                </a-col>
                            </a-row>
                        </div>
                   </a-form-item>
                </a-col>
            </a-row> -->
            <div v-if="hostTemplateinfo.length > 0">
                <a-row :gutter="24" v-for="(item,index) in hostTemplateinfo" :key="index" style="line-height: 2.75;">
                    <a-col :span="12">{{ item.name }}</a-col>
                    <a-col :span="12">
                        <a-button danger @click="del(index,item.id)" size="small">移除</a-button>
                    </a-col>
                </a-row>
            </div>
            
            <!-- <a-row :gutter="24">
                <a-col :span="24">
                    <a-form-item label="内网IP：" name="netWorkIp">
                        <a-input v-model:value="formData.netWorkIp" placeholder="请输入内网ip" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row> -->
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-form-item label="描述：" name="description">
                        <a-textarea
                            v-model:value="formData.description"
                            placeholder="请输入主机描述"
                            :auto-size="{ minRows: 2, maxRows: 5 }" 
                            allow-clear
                        />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
		</template>
    </a-drawer>
    <CnTable
        :data="hostTemplatelist"
        :columns="columns" 
        ref="mytable" 
        :pagination="pagination"
        :rowSelectionType ="rowSelectionType"
        v-if="hostTemplatelist.length > 0 "
        @handleCancel="handleCancel"
        @handleOk = "handleOk"
    />
</template>
<script setup name="hostForm">
import { message, Empty } from 'ant-design-vue'
import { required, rules } from '@/utils/formRules'
import indexApi from '@/api/python/indexApi'
import CnTable from '@/components/CnTable/index.vue'
const mytable = ref()
const hostTemplateinfo = ref([])
const clearTemplates = ref([])
const isconfirm = ref(false)
const handleOk = (data)=>{
    console.log(data)
    if(data.KeysRow.length === 0){
        hostTemplateinfo.value = hostTemplateinfo.value
        console.log(111)
    }else{
        data.KeysRow = data.KeysRow.filter(item => item != undefined)
        hostTemplateinfo.value = data.KeysRow
        console.log(222)
        if(typeof(formData.value.hostId) == 'undefined'){
            const ids = []
            hostTemplateinfo.value.map((item)=>{
                ids.push(item.id)
            })
            myTableInfo.disableIds =ids 
        }
    }
    console.log(hostTemplateinfo.value)
    formData.value.templateId = data.Keys
    // myTableInfo.defaultIds = data.Keys
    // myTableInfo.disableIds = data.Keys
}
const handleCancel = ()=>{
    console.log(myTableInfo)
    console.log(hostTemplateinfo.value)
    // var cancelId = localStorage.getItem('cancelId')
    if(typeof(formData.value.hostId)!='undefined'){
        if(myTableInfo.defaultIds.length === 0){
            myTableInfo.defaultIds = []
            myTableInfo.disableIds = []
        }
        else{
            //  if(cancelId == myTableInfo.defaultIds){   
            //     myTableInfo.defaultIds = cancelId.length > 0 ? cancelId.split(",").map(Number) : []
            //     myTableInfo.disableIds = cancelId.length > 0 ? cancelId.split(",").map(Number) : []
            //  }
            // else{
            //     // console.log( myTableInfo.defaultIds)
            //     myTableInfo.defaultIds =formData.value.templateId 
            //     myTableInfo.disableIds =formData.value.templateId 
            // }
            const ids = []
            hostTemplateinfo.value.map((item)=>{
                ids.push(item.id)
            })
            myTableInfo.defaultIds =ids
            myTableInfo.disableIds =ids 
        }
       
    }else{
        const ids = []
        hostTemplateinfo.value.map((item)=>{
            ids.push(item.id)
        })
        myTableInfo.defaultIds =ids
        myTableInfo.disableIds =ids 
    }
    
    clearTemplates.value = []
    // rowSelectionType.defaultIds = [] //checkbox关键默认值
    mytable.value.refresh(true)
}
const del = (index,id)=>{
    hostTemplateinfo.value.splice(index,1)
    formData.value.templateId = formData.value.templateId.filter(item => item != id)
    if(typeof(formData.value.hostId)!='undefined'){
        // myTableInfo.templateId = id
        myTableInfo.defaultIds = myTableInfo.defaultIds.filter(item => item != id)
        myTableInfo.disableIds = myTableInfo.disableIds.filter(item => item != id)
        clearTemplates.value.push(id)
        console.log(myTableInfo.defaultIds)
    }else{
        const ids = []
        hostTemplateinfo.value.map((item)=>{
            ids.push(item.id)
        })
        myTableInfo.defaultIds =ids
        myTableInfo.disableIds =ids 
    }
    if(hostTemplateinfo.value.length === 0){
        myTableInfo.hostId = 0
    }
}
let myTableInfo = {
    title:'选择模板',
    width:'50%',
    hostId:0,
    templateId:0,
    defaultIds:[],
    disableIds:[],
    // row:[]
}
console.log("myTableInfo",myTableInfo)
const columns = [
    {
        title: '模板名称',
        dataIndex: 'name'
    },
]
const rowSelectionType = {
    type:'checkbox',
    // defaultIds:[],
    // disableIds:[]
}
let pagination = {
    size:10,
    current:1,
    show:false
}
// 默认是关闭状态
let loading = ref(false)
let visible = $ref(false)
const formRef = ref()
const hostGroupList = ref([])
const hostTemplatelist = ref([])
const submitLoading = ref(false)
const templateCheckId = ref([])
const templateRadioId = ref([])
const templateRadioIdValue = ref([])
// 定义emit事件
const emit = defineEmits({ successful: null })
const changeGroup = (e)=>{
    if (typeof e == 'undefined') {
        formData.value.groupId = null
    } else {
        formData.value.groupId = e
        
    }
}
const templateCheckbox = (e)=>{
    templateCheckId.value = e
    // if(e.target.checked == true){
    //     templateCheckId.value.push(e.target.value)
    // }else{
        
    //     let index = templateCheckId.value.indexOf(e.target.value);
        
    //     templateCheckId.value.splice(index, 1)
    // }
   //    console.log(templateCheckId.value)
}
const templateRadio = (e)=>{
    templateRadioId.value = [e.target.value]
    templateRadioIdValue.value = e.target.value
    // console.log(templateRadioId.value)
}
let validatePhone = async (_rule, value)=>{
    if(value == ''){
    
        return Promise.reject('请输入手机号码');
    }else{
        let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; 
        if (!reg.test(formData.value.phone)) {
                
            return Promise.reject('手机号码格式不正确');
        }

    }
}
// 默认要校验的
const formRules = {
		host: [required('请输入主机名称')],
        groupId:[required('请输选择主机组')],
        hostIp:[required('请输填写ip地址')]
		// phone:[{
		// 	required: true,
		// 	validator: validatePhone,
		// 	trigger: 'blur',
		// }],
	}
// 表单数据
let formData = ref({})
// 关闭抽屉
const onClose = () => {
    visible = false
    templateCheckId.value = []
    templateRadioId.value = []
    templateRadioIdValue.value = []
    hostTemplateinfo.value = []
    myTableInfo.hostId = 0
    myTableInfo.templateId = 0
    localStorage.removeItem('cancelId')
    myTableInfo.defaultIds = []
    myTableInfo.disableIds = []
}
// 打开抽屉
const onOpen = (record) => {
    visible = true
    formData.value = {
        host: '',
        groupId: undefined,
        templateId:[],
        hostIp:'0.0.0.0',
        // netWorkIp:'',
        hostType:[],
        description:''
    }
    indexApi.paramsList().then((res)=>{
        hostGroupList.value = res.hostGroup
        hostTemplatelist.value = res.hostTemplate
    })
    hostTemplateinfo.value = []
    if (record) {
        record.hostIp = record.ip
        record.hostId = record.id
        record.groupId = record.group_id
        myTableInfo.hostId = record.hostId
        // record.templateId = record.tIds
        formData.value = record
        // console.log(record)
        indexApi.hostsTemplateIds({hostId:record.hostId}).then((res)=>{
            
            if(res.hostsTemplateIds.length > 0){
                // localStorage.setItem('cancelId',res.hostsTemplateIds)
                formData.value.templateId = res.hostsTemplateIds
                myTableInfo.defaultIds = res.hostsTemplateIds
                myTableInfo.disableIds = res.hostsTemplateIds
                hostTemplatelist.value.map((item)=>{
                    // console.log(item)
                    if(res.hostsTemplateIds.includes(item.id)){
                        hostTemplateinfo.value.push(item)
                        // myTableInfo.row = hostTemplateinfo.value
                    }
                 })
            }
            console.log(hostTemplateinfo.value)
        })
        
    }
    
}

// 验证并提交数据
const onSubmit = () => {
    formRef.value.validate().then(() => {
        // if(!formData.value.templateId){
        //     message.warning('模板ID不能为空')
        //     return false
        // }
        if(typeof(formData.value.hostId) == 'undefined'){
            var templateId = formData.value.templateId 
            hostGroupList.value.map((item)=>{
                if(formData.value.groupId == item.id){
                    var a = templateId.concat([item.templateId])
                    formData.value.templateId = a
                }
            })
            // if(formData.value.groupId == 20){
            //     var a = templateId.concat([10351])
            //     formData.value.templateId = a.join(',')
            // }else if(formData.value.groupId == 2){
            //     var b = templateId.concat([10343])
            //     formData.value.templateId = b.join(',')
            // }else{
            //     formData.value.templateId = templateId.join(',')
            // }
            
        }else{
            // var templateId = templateRadioId.value.concat(templateCheckId.value)
            formData.value.add_templates = formData.value.templateId
            formData.value.clear_templates =  clearTemplates.value
        }
        formData.value.hostTemplateInfo = hostTemplateinfo.value
        console.log(formData.value)
        // if(!formData.value.templateId){
        //     message.warning('模板ID不能为空')
        //     return false
        // }
        submitLoading.value = true
        indexApi
        .submitHostForm(formData.value, !formData.value.id)
        .then(()=>{
            visible = false
            emit('successful')
        })
        .finally(() => {
            submitLoading.value = false   
        })
    })
}
const checkboxMonitor = (e)=>{
    formData.value.hostType = e
    console.log(formData.value.hostType)
    
}
// 调用这个函数将子组件的一些数据和方法暴露出去
defineExpose({
    onOpen
})
</script>