<template>
     <a-modal
     :title="formData.id ? '编辑模板' : '新增模板'"
      v-model:visible="visible"
      :width="700"
      @cancel="onClose"
      :forceRender="true"
      :destroyOnClose="true"
    >
       <a-form ref="formRef" :model="formData" :rules="formRules" :label-col="{ span: 4 }">
    
            <a-form-item label="模板名称：" name="templateName">
                <a-input v-model:value="formData.templateName" placeholder="请输入模板名称" allow-clear />
            </a-form-item>
            <a-form-item label="模板描述：" name="extJson">
                <a-textarea
                v-model:value="formData.extJson "
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
const emit = defineEmits({ successful: null })
let visible = $ref(false)
const submitLoading = ref(false)
const formRef = ref()
const formData = ref({
    id:'',
})
// 默认要校验的
const formRules = {
    
    templateName:[required('请输入模板名称')],
  
}
const onOpen = (record) => {
    visible = true
    formData.value = {
        templateName:'',
        extJson:''
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
            orderApi.submitTemplateForm(formData.value, !formData.value.id).then(res=>{
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