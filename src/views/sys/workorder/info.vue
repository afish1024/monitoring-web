<template>
	<a-drawer
	    :title="title"
		:width="1000"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '20px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
		:maskClosable="false"
		class="diagram"
	>
		<table class="table1">
			<tr>
				<td class="title" width="8%">系统</td>
				<td class="value" width="30%">{{ formData.app_name }}</td>
				<td class="title" width="8%">工单类别</td>
				<td class="value" width="30%" >{{ formData.order_type_name }}</td>
			</tr>
			<tr v-if="formData.order_type=='api'">
				<td class="title">接口名称</td>
				<td class="value" colspan="3">{{ formData.app_api_name }}</td>
			</tr>
			<tr v-if="formData.order_type != 'api'">
			
				<td class="title">主机名称</td>
				<td class="value"  colspan="3">{{ formData.host_name }}</td>
			</tr>
			<tr>
				<td class="title">确认状态</td>
				<td class="value">{{ formData.confirm_status_name }}</td>
				<td class="title">确认时间</td>
				<td class="value"  colspan="3">{{ formData.confirm_time }}</td>
			</tr>
			<tr>
				<td class="title">修复状态</td>
				<td class="value" >{{ formData.repaired_status_name }}</td>
				<td class="title">修复时间</td>
				<td class="value">{{ formData.repaired_time }}</td>
			</tr>
			<tr>
				<td class="title">创建时间</td>
				<td class="value">{{ formData.create_time }}</td>
			</tr>

			<tr v-if="formData.order_type == 'api'">
				<td class="title">异常状态</td>
				<td class="value"  colspan="3">{{ formData.status_message }}</td>
			</tr>
			<tr v-if="formData.order_type != 'api'">
				<td class="title">异常状态</td>
				<td class="value"  colspan="3">{{ formData.status }}</td>
			</tr>
			<tr>
				<td class="title">异常信息</td>
				<td class="value"  colspan="3">{{ formData.msg }}</td>
			</tr>
			<tr v-if="formData.order_type == 'api'">
				<td class="title">扩展信息</td>
				<td class="value" colspan="3">{{ formData.api_ext_json }}</td>
			</tr>
			<tr v-if="formData.order_type != 'api'">
				<td class="title">扩展信息</td>
				<td class="value"  colspan="3">{{ formData.host_ext_json }}</td>
			</tr>
			
		</table>
		
	</a-drawer>
</template>
<script setup name="screenTestCommissionsInfo">
	import { cloneDeep } from 'lodash-es'
	import screenTestCommissionsApi from '@/api/biz/screenTestCommissionsApi'
	import screenProcessListApi from '@/api/biz/screenProcessListApi'
	import dictApi from '@/api/dev/dictApi'
	import tool from '@/utils/tool'

	import { onMounted,ref } from 'vue'

	// 抽屉状态
	let visible = $ref(false)
	const formRef = ref()
	const emit = defineEmits({ successful: null })
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	let title = ref('工单详情') 
	let processList = []
	let processOptions = ref([])
	let formtype = ref(null)
	let categoryOptions = ref([])
	let open = ref(false)
	const userInfo = ref(tool.data.get('USER_INFO'))

	let itemOptions = ref([])
	// 打开抽屉
	const onOpen = (record,type) => {
		visible = true
		
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = recordData
			console.log(recordData)
		}
		
	}
	// 关闭抽屉
	const onClose = () => {
		visible = false
	}

	// 抛出函数
	defineExpose({
		onOpen
	})
</script>

<style scoped type="less">

	table{
		border-collapse: collapse;
		width: 100%;
		margin-top: 2%;
		word-break: break-all;
	}
	table tr{
		height: 50px;
		line-height: 30px;
	}
	table td{
		border: 1px solid #F0F0F2;
		overflow:hidden;
		text-overflow:ellipsis;
		padding-left: 15px;
		overflow-wrap: break-word !important;
    	white-space: normal;
	}
</style>
