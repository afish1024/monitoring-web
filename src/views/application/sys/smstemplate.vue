<template>
    <a-drawer
		:title="formData.id ? '设置短信模板' : '增加监控系统'"
		:width="500"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
		:maskClosable="false"
		@close="onClose"
	>
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
            <a-form-item label="系统名称：" name="name">
				<a-input v-model:value="formData.name" placeholder="请输入系统名称" disabled />
			</a-form-item>
            <a-form-item label="短信模板：" name="templateId">
                <a-select v-model:value="formData.templateId" placeholder="请选择" allowClear>
                    <a-select-option v-for="item in smsTemplateList" :key="item.id" :value="item.id">
                    {{item.templateName}}
                    </a-select-option>
                </a-select>
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
	import bizTypeApi from '@/api/biz/bizTypeApi'
	import sysConfig from '@/config/index'
	import axios from 'axios'
	import tool from '@/utils/tool'
    let visible = $ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
    const submitLoading = ref(false)
	const smsTemplateList = ref([])
	// 表单数据，也就是默认给一些数据
	const formData = ref({})
    // 打开抽屉
	const onOpen = (record) => {
		visible = true
		if (record) {
			record.templateId = record.template_id
			formData.value = Object.assign({}, record)
		}
		// bizTypeApi.smsList().then((res)=>{
		// 	console.log(res)
		// })
		var url = sysConfig.API_URL+'/biz/smstemplate/list'
		axios.get(
		url,
		{headers: { token: tool.data.get('TOKEN')}}
		).then(res => {
			smsTemplateList.value = res.data.data.records
		})
	}
    // 默认要校验的
	const formRules = {
		templateId: [required('请选择短信模板')]
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		visible = false
	}
    // 验证并提交数据
	const onSubmit = () => {
		formRef.value
			.validate()
			.then(() => {
				submitLoading.value = true
				bizTypeApi.submitForm(formData.value, !formData.value.id).then(() => {
					submitLoading.value = false
					visible = false
					emit('successful')
				})
			}).finally(() => {
				submitLoading.value = false
			})
	}
    // 调用这个函数将子组件的一些数据和方法暴露出去
	defineExpose({
		onOpen
	})
</script>