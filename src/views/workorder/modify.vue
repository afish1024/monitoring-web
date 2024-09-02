<template>
    <a-modal
    title="变更工单状态"
     v-model:visible="visible"
     :width="700"
     @cancel="onClose"
     :forceRender="true"
     :destroyOnClose="true"
   >
        <a-form ref="formRef" :model="formData" :rules="formRules" :label-col="{ span: 6 }">
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
        </a-form>
         <template #footer>
           <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
           <a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
       </template>
   </a-modal>
</template>
<script setup name="modifyInfo">
import { message, Empty } from 'ant-design-vue'
import { required, rules } from '@/utils/formRules'
import orderApi from '@/api/workorder/orderApi'
const porps = defineProps({
    orderList:{
        type:Array,
        default:()=>[]
    },
    modifyIds:{
        type:Array,
        default:()=>[]
    }
})
const emit = defineEmits({ successful: null ,close:null})
let visible = $ref(false)
const submitLoading = ref(false)
const formRef = ref()
const formData = ref({
    worderStatus:null,
   
})
const onOpen = (record) => {
   visible = true
   
}
// 关闭抽屉
const onClose = () => {
   formRef.value.resetFields()
   visible = false
}
// 默认要校验的
const formRules = {
   
    worderStatus:[required('请选择工单状态')],

}
const onSubmit = ()=>{
    console.log(porps.modifyIds)
    if (porps.modifyIds.length < 1) {
        message.warning('请选择要变更的工单')
        return false
    }
   formRef.value
       .validate()
       .then(() => {
        //    submitLoading.value = true
           
       }).finally(() => {
           submitLoading.value = false
       })
}
defineExpose({
   onOpen
})
</script>