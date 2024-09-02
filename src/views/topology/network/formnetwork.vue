<template>
    <a-drawer
		:title="formData.id ? '编辑网络' : '增加网络'"
		:width="500"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
        :maskClosable="false"
		@close="onClose"
	>
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
            <a-form-item label="网络名称：" name="networkName">
                <a-input v-model:value="formData.networkName" placeholder="请输入网络名称" allow-clear />
			</a-form-item>
            <a-form-item label="网络描述：" name="networkDescribe">
                <a-textarea
                    v-model:value="formData.networkDescribe"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
			</a-form-item>

        </a-form>
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
		</template>
    </a-drawer>
</template>
<script setup>
import { required, rules } from '@/utils/formRules'
import planApiList from '@/api/alarm/indexApi'
let visible = $ref(false)
const emit = defineEmits({ successful: null })
const formRef = ref()
const submitLoading = ref(false)
// 表单数据，也就是默认给一些数据
const formData = ref({})
// 打开抽屉
const onOpen = (record) => {
    visible = true
    formData.value = {
        networkName:'',
        networkDescribe:'',
        networkStatus:'',
        type:''
    }
    if (record) {
        formData.value = Object.assign(formData.value, record)
    }

}
// 默认要校验的
const formRules = {
    networkName: [required('请输入网络名称')],
    
}
// 关闭抽屉
const onClose = () => {
    formRef.value.resetFields()
    visible = false
}
// 验证并提交数据
const onSubmit = () => {
    // formRef.value
    //     .validate()
    //     .then(() => {
    //         submitLoading.value = true
    //         planApiList.submitForm(formData.value, !formData.value.id).then(() => {
	// 				submitLoading.value = false
	// 				visible = false
	// 				emit('successful')
	// 			})
    //     }).catch(() => {
    //         submitLoading.value = false
    //     })
}
// 调用这个函数将子组件的一些数据和方法暴露出去
defineExpose({
    onOpen
})
</script>