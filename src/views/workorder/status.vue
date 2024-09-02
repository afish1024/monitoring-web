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
   
           <a-form-item label="状态名称：" name="statusName">
               <a-input v-model:value="formData.statusName" placeholder="请输入状态名称" allow-clear />
           </a-form-item>
           <a-form-item label="状态码：" name="statusCode">
               <a-input v-model:value="formData.statusCode" placeholder="请输入状态code" allow-clear />
           </a-form-item>
           <a-form-item label="状态描述：" name="statusDescribe">
               <a-textarea
               v-model:value="formData.statusDescribe "
               placeholder="请输入模板描述"
               :auto-size="{ minRows: 3, maxRows: 5 }"
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
   
    statusName:[required('请输入状态名称')],
    statusCode:[required('请输入状态code')]
 
}
const onOpen = (record) => {
   visible = true
   formData.value = {
       statusName:'',
       statusCode:'',
       worderTemplateId:porps.tempId
   }
   if(record){
       formData.value = Object.assign(formData.value, record)
   }
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
           console.log(formData.value)
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

</style>