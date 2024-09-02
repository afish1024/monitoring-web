<template>
    <a-modal
    :title="formData.id ? '编辑SLA' : '新增SLA'"
     v-model:visible="visible"
     :width="1100"
     @cancel="onClose"
     :forceRender="true"
     :destroyOnClose="true"
   >
        <div style="font-weight: bold;margin-bottom: 10px;">基础参数</div>
        <a-form ref="formRef" :model="formData" :rules="formRules" :label-col="{ span: 4 }">
            <a-form-item label="SLA名称：" name="slaName">
               <a-input v-model:value="formData.slaName" placeholder="请输入SLA名称" allow-clear />
           </a-form-item>
           <a-form-item label="SLA描述：" name="slaDescribe">
                <a-textarea
                    v-model:value="formData.slaDescribe "
                    placeholder="请输入SLA描述"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                />
           </a-form-item>
           <a-form-item label="工单模板：" name="workerTemplateId">
                <a-select v-model:value="formData.workerTemplateId" placeholder="请选择模板" allowClear>
                    <a-select-option v-for="item in porps.templateList" :key="item.id" :value="item.id">
                        {{item.templateName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
        <div style="font-weight: bold;margin-bottom: 10px;">触发条件</div>
        <a-card :bordered="false" style="background-color: #f0f0f0;">
            <div v-for="(positionInfo, index) in formData.workerTriggerList" >
                <a-form  :model="formData" :label-col="{ span:2 }" style="display: flex;">
                    <a-form-item
                        :name="['workerTriggerList', index, 'priority']"
                        :rules="{ required: true, message: '请选择优先级' }"
                        
                    >
                            <a-select
                                v-model:value="positionInfo.priority"
                                :options="optionsPriority"
                                :field-names="{ label: 'dictLabel', value: 'dictValue' }"
                                placeholder="请选择优先级"
                                style="width: 140px;"
                                allow-clear
                                @change="selectChange($event,1,index)"
                            >
                            </a-select>
                    </a-form-item>
                    <a-form-item
                        :name="['workerTriggerList', index, 'triggerType']"
                        :rules="{ required: true, message: '请选择超时方式' }"
                    >
                            <a-select
                                v-model:value="positionInfo.triggerType"
                                :options="optionsTriggerType"
                                :field-names="{ label: 'dictLabel', value: 'dictValue' }"
                                placeholder="请选择超时方式"
                                style="width: 140px;margin-left: 10px;"
                                allow-clear
                                @change="selectChange($event,2,index)"
                            >
                            </a-select>
                    </a-form-item>
                    <a-form-item
                        :name="['workerTriggerList', index, 'triggerDay']"
                        :rules="{ required: true, message: '请选择日期' }"
                    >
                            <a-input-number 
                            v-model:value="positionInfo.triggerDay" 
                            placeholder="请选择日期" 
                            allow-clear 
                            :min="0" 
                            type="number" 
                            style="margin-left: 10px;width: 80px;" 
                            class="ant-input-number-focused"
                            @change="change($event,1,index)"
                            />&nbsp;天
                    </a-form-item>
                    <a-form-item
                        :name="['workerTriggerList', index, 'triggerHour']"
                        :rules="{ required: true, message: '请选择小时' }"
                    >
                            <a-input-number 
                            v-model:value="positionInfo.triggerHour" 
                            placeholder="请选择小时" 
                            allow-clear 
                            :min="0" 
                            type="number" 
                            style="margin-left: 10px;width: 80px;" 
                            class="ant-input-number-focused"
                            @change="change($event,2,index)"
                            />&nbsp;时
                    </a-form-item>
                    <a-form-item
                        :name="['workerTriggerList', index, 'triggerMinute']"
                        :rules="{ required: true, message: '请选择分钟' }"
                    >
                            <a-input-number 
                            v-model:value="positionInfo.triggerMinute" 
                            placeholder="请选择分钟" 
                            allow-clear 
                            :min="0" 
                            type="number" 
                            style="margin-left: 10px;width: 80px;"
                            class="ant-input-number-focused"
                             @change="change($event,3,index)"
                             />&nbsp;分
                    </a-form-item>
                    <a-form-item
                        :name="['workerTriggerList', index, 'triggerConditions']"
                        :rules="{ required: true, message: '请选择变更方式' }"
                    >
                            <a-select
                                v-model:value="positionInfo.triggerConditions"
                                :options="optionsTriggerConditions"
                                :field-names="{ label: 'dictLabel', value: 'dictValue' }"
                                placeholder="请选择变更方式"
                                style="margin-left: 10px;width: 140px;"
                                allow-clear
                                @change="selectChange($event,3,index)"
                            >
                            </a-select>
                    </a-form-item>
                    <a-form-item
                        :name="['workerTriggerList', index, 'changeContent']"
                        :rules="{ required: true, message: '请选择变更内容' }"
                    >
                            <a-select
                                v-model:value="positionInfo.changeContent"
                                :options="optionsChangeContent"
                                :field-names="{ label: 'dictLabel', value: 'dictValue' }"
                                style="margin-left: 10px;width: 140px;"
                                placeholder="请选择变更内容"
                                allow-clear
                                @change="selectChange($event,4,index)"
                            >
                            </a-select>
                    </a-form-item>
                    <minus-circle-outlined  @click="delDomains(index)" style="color: red;margin-left: 10px;margin-top: 8px;"/>
                    
                </a-form>
            </div>
            <a-row :gutter="24">
                <a-col :span="4" style="color: var(--primary-color);cursor: pointer;" @click="addDomains()">
                    <plus-circle-outlined />添加条件
                </a-col>
            </a-row>
        </a-card>
        <template #footer>
           <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
           <a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
       </template>
   </a-modal>
</template>
<script setup name="slaInfo">
import { required, rules } from '@/utils/formRules'
import orderApi from '@/api/workorder/orderApi'
import userApi from '@/api/sys/userApi'
const porps = defineProps({
    templateList:{
        type:Array,
        default:()=>[]
    }
})
const optionsChangeContent = ref([])
const optionsTriggerType = ref([
    {
        dictLabel:'响应超时',
        dictValue:'responseTimeout'
    },
    {
        dictLabel:'处理超时',
        dictValue:'processingTimeout'
    },
])
const optionsTriggerConditions = ref([
    {
        dictLabel:'变更优先级',
        dictValue:'changePriority'
    },
    {
        dictLabel:'变更处理人',
        dictValue:'changeProcessingUser'
    },
])
const change = (e,number,index)=>{
    if(number == 1){
        formData.value.workerTriggerList[index].triggerDay = e
    }else if(number == 2){
        formData.value.workerTriggerList[index].triggerHour = e
    }else if(number == 3){
        formData.value.workerTriggerList[index].triggerMinute = e
    }

    console.log(formData.value.workerTriggerList)
}
const selectChange = (e,number,index)=>{
    if(number == 1){
        formData.value.workerTriggerList[index].priority = e
    }else if(number == 2){
        formData.value.workerTriggerList[index].triggerType = e
    }else if(number == 3){
        formData.value.workerTriggerList[index].triggerConditions = e
        if(e ==  'changePriority'){
            optionsChangeContent.value = optionsPriority.value
        }else{
            userApi.userPage({isLogin:1,size:1000}).then((res) => {
                if(res.records.length > 0){
                    res.records.map((item)=>{
                        optionsChangeContent.value.push({dictValue:item.id,dictLabel:item.name})
                    })
                }
               
            })
            
        }
    }else if(number == 4){
        formData.value.workerTriggerList[index].changeContent = e
    }
}
const childUserData = ()=>{
    
}
// 删减行
const delDomains = (index) => {
    formData.value.workerTriggerList.splice(index, 1)
}
const addDomains = ()=>{
    console.log(formData.value.workerTriggerList)
    if (formData.value.workerTriggerList === null) {
        formData.value.workerTriggerList = []
    }
    formData.value.workerTriggerList.push({
        priority:null,
        triggerType:null,
        triggerDay:0,
        triggerHour:0,
        triggerMinute:0,
        triggerConditions:null,
        changeContent:null
    })
}
const emit = defineEmits({ successful: null })
let visible = $ref(false)
const submitLoading = ref(false)
const optionsPriority = ref([])
const formRef = ref()
const formData = ref({
    id:'',
    
})
// 默认要校验的
const formRules = {
    slaName:[required('请输入SLA名称')],
    workerTemplateId:[required('请选择模板')],
}
const onOpen = (record) => {
  visible = true
  formData.value = {
    slaName:'',
    slaDescribe:'',
    workerTemplateId:null,
    workerTriggerList:[],
    
  }
  if(record){
      formData.value = Object.assign(formData.value, record)
  }
   orderApi.dictListForLabel({dictValue:'WORKER_PRIORITY'}).then(res=>{
        // console.log(res)
        optionsPriority.value = res
    })
    
}
// 关闭抽屉
const onClose = () => {
   formRef.value.resetFields()
   visible = false
}
const onSubmit = ()=>{
   formRef.value
       .validate()
       .then(() => {
           submitLoading.value = true
        //    console.log(JSON.stringify(formData.value))
           orderApi.submitStatusForm(formData.value, !formData.value.id).then(res=>{
               submitLoading.value = false
               visible = false
               emit('successful')
           }).catch(err=>{
               submitLoading.value = false
           })
       }).finally(() => {
           submitLoading.value = false
       })
}
defineExpose({
   onOpen
})
</script>
<style lang="less" scoped>
// :deep(.ant-input-number-focused){
//     border-color: none !important;
//     box-shadow:none;
// }
.ant-input-number-focused{
    //border-color: transparent;
    //box-shadow:none;
    border: 1px solid var(--border-color-base);
    border-color: var(--border-color-base);
    box-shadow: none;
    
}
</style>