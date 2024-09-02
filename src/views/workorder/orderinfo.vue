<template>
    <a-modal
        :title="formData.id ? '编辑工单' : '新增工单'"
        v-model:visible="visible"
        :width="800"
        @cancel="onClose"
        :forceRender="true"
        :destroyOnClose="true"
    >
        <a-form ref="formRef" :model="formData" :rules="formRules" :label-col="{ span: 5 }">
            <a-row :gutter="16">
                <a-col :span="24" style="font-weight: bold;border-bottom: 1px solid var(--border-color-split);margin-bottom: 10px;">基础信息</a-col>
            </a-row>
            <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item label="工单名称：" name="worderTitle">
                        <a-input v-model:value="formData.worderTitle" placeholder="请输入工单名称" allow-clear />
                    </a-form-item>
                </a-col>
           </a-row>
           <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item label="工单模板：" name="worderTemplateId">
                            <a-select v-model:value="formData.worderTemplateId" placeholder="请选择模板" allowClear>
                                <a-select-option v-for="item in templateList" :key="item.id" :value="item.id">
                                    {{item.templateName}}
                                </a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item label="工单状态：" name="worderStatus">
                            <a-select v-model:value="formData.worderStatus" placeholder="请选择工单状态" allowClear>
                                <a-select-option v-for="item in orderList" :key="item.statusCode" :value="item.statusCode">
                                    {{item.statusName}}
                                </a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item name="slaStatus" label="SLA状态">
                        <a-select v-model:value="formData.slaStatus" placeholder="请选择SLA状态" allowClear>
                            <a-select-option value="normal">正常</a-select-option>
                            <a-select-option value="abnormal">异常</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item name="processingUser" label="处理人">
                        <a-select v-model:value="formData.processingUser" placeholder="请选择处理人" allowClear>
                            <a-select-option v-for="item in userList" :key="item.id" :value="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item name="priority" label="优先级">
                        <a-select v-model:value="formData.priority" placeholder="请选择优先级" allowClear>
                            <a-select-option v-for="item in priorityList" :key="item.dictValue" :value="item.dictValue">
                                {{item.dictLabel}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item name="worderTag" label="标签">
                        <a-select v-model:value="formData.worderTag" placeholder="请选择标签" allowClear>
                            <a-select-option v-for="item in tagList" :key="item.dictValue" :value="item.dictValue">
                                {{item.dictLabel}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item name="satisfaction" label="满意度">
                        <a-select v-model:value="formData.worderTag" placeholder="请选择满意度" allowClear>
                            <a-select-option v-for="item in satisfactionList" :key="item.dictValue" :value="item.dictValue">
                                {{item.dictLabel}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
				<a-col :span="12">
                    <a-form-item name="worderContent" label="工单内容">
                        <a-textarea
                            v-model:value="formData.worderContent "
                            placeholder="请输入工单内容"
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24" style="font-weight: bold;border-bottom: 1px solid var(--border-color-split);margin-top: 10px;">扩展信息</a-col>
            </a-row>
        </a-form>

        <template #footer>
           <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
           <a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
       </template>
   </a-modal>
</template>
<script setup name="orderInfo">
import { required, rules } from '@/utils/formRules'
import orderApi from '@/api/workorder/orderApi'
const porps = defineProps({
    templateList:{
        type:Array,
        default:()=>[]
    },
    userList:{
        type:Array,
        default:()=>[]
    },
    tagList:{
        type:Array,
        default:()=>[]
    },
    priorityList:{
        type:Array,
        default:()=>[]
    },
    orderList:{
        type:Array,
        default:()=>[]
    },
    satisfactionList:{
        type:Array,
        default:()=>[]
    }
})
const emit = defineEmits({ successful: null })
let visible = $ref(false)
const submitLoading = ref(false)
const formRef = ref()
const formData = ref({
   id:'',
   
})
const onOpen = (record) => {
   visible = true
   formData.value = {
       
   }
   if(record){
       formData.value = Object.assign(formData.value, record)
   }
}
// 默认要校验的
const formRules = {
   
    worderTitle:[required('请输入工单名称')],
    worderTemplateId:[required('请选择工单模板')],
    worderStatus:[required('请选择工单状态')],
    slaStatus:[required('请选择SLA状态')],
    processingUser:[required('请选择处理人')],
    worderContent:[required('请输入工单内容')],
    priority:[required('请选择优先级')],
    satisfaction:[required('请选择满意度')],
    worderTag:[required('请选择标签')],
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
        //    console.log(formData.value)
           orderApi.submitOrderForm(formData.value, !formData.value.id).then(res=>{
               submitLoading.value = false
               visible = false
               formRef.value.resetFields()
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