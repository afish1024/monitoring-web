<template>
    <a-modal
    :title="formData.id ? '编辑状态' : '新增状态'"
     v-model:visible="visible"
     :width="700"
     @cancel="onClose"
     :forceRender="true"
     :destroyOnClose="true"
   >
      <a-form ref="formRef" :model="formData" :rules="formRules" :label-col="{ span: 4 }">
   
           <a-form-item label="字段名称：" name="fieldName">
               <a-input v-model:value="formData.fieldName" placeholder="请输入字段名称" allow-clear />
           </a-form-item>
           <a-form-item label="字段类型：" name="fieldType">
                <a-select v-model:value="formData.fieldType" placeholder="请选择字段类型" allowClear>
                    <a-select-option value="text">单行文本</a-select-option>
                    <a-select-option value="textarea">多行文本</a-select-option>
                    <a-select-option value="file">图片类型</a-select-option>
                </a-select>
           </a-form-item>
           <a-form-item label="初始值：" name="defaultValue">
               <a-input v-model:value="formData.defaultValue" placeholder="请输入初始值" allow-clear />
           </a-form-item>
           <a-form-item label="能否为空：" name="isEmpty">
                <a-switch
                    :checked="formData.isEmpty"
                    @change="editEmpty($event)"
                />
           </a-form-item>
           <a-form-item label="是否启用：" name="isEnabled">
                <a-switch
                    :checked="formData.isEnabled"
                    @change="editEnabled($event)"
                />
           </a-form-item>
      </a-form>
       <template #footer>
           <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
           <a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
       </template>
   </a-modal>
</template>

<script setup name="templateInfo">
import { required, rules } from '@/utils/formRules'
import { message, Empty } from 'ant-design-vue'
import orderApi from '@/api/workorder/orderApi'
const porps = defineProps({
    tempId:{
        type:Number,
        default:()=>''
    }
})
const emit = defineEmits({ successful: null })
let visible = $ref(false)
const submitLoading = ref(false)
const formRef = ref()
const formData = ref({
   id:'',
   
})
// 默认要校验的
const formRules = {
   
    fieldName:[required('请输入字段名称')],
    fieldType:[required('请选择字段类型')]
 
}
const editEmpty = (e)=>{
    if(e === false){
        formData.value.isEmpty = false
    }else{
        formData.value.isEmpty = true
    }
}
const editEnabled = (e)=>{
    if(e === false){
        formData.value.isEnabled = false
    }else{
        formData.value.isEnabled = true
    }
}
const onOpen = (record) => {
   visible = true
   formData.value = {
        fieldName:'',
        fieldType:null,
        defaultValue:'',
        isEmpty:true,
        isEnabled:true,
        fieldTag:'add',
        defaultValue:'',
        workerTemplateId:porps.tempId
   }
   if(record){
       record.fieldTag = 'edit'
       record.isEnabled = record.isEnabled == 'yes' ? true:false
       record.isEmpty = record.isEmpty == 'yes' ? true:false
       formData.value = Object.assign(formData.value, record)
   }
}
// 关闭抽屉
const onClose = () => {
   formRef.value.resetFields()
   visible = false
}
const onSubmit = ()=>{
    if(porps.tempId == ''){
        message.warning('请选择模板')
        return false
    }
   formRef.value
       .validate()
       .then(() => {
            submitLoading.value = true
            formData.value.isEnabled = formData.value.isEnabled===true ? 'yes':'no'
            formData.value.isEmpty = formData.value.isEmpty===true ? 'yes':'no'
            console.log(formData.value)
            orderApi.submitFiledForm(formData.value, !formData.value.id).then(res=>{
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

</style>