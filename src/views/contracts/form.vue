<template>
	<a-drawer
		:title="formData.id ? '编辑检测委托单' : '申请检测委托单'"
		:width="620"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
	>

		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="委托单位：" name="account">
						<a-input v-model:value="formData.account" placeholder="请输入委托单位" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="工序：" name="name">
						<a-input v-model:value="formData.name" placeholder="请输入工序" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="生产令号：" name="gender">
						<a-input v-model:value="formData.nickname" placeholder="请输入生产令号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="图号：" name="nickname">
						<a-input v-model:value="formData.nickname" placeholder="请输入图号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="零部件名称：" name="phone">
						<a-input v-model:value="formData.phone" placeholder="请输入零部件名称" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="数量：" name="email">
						<a-input v-model:value="formData.email" placeholder="请输入数量" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="零部件编号：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入零部件编号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="外观质量：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入外观质量" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="检件材质：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入检件材质" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="检件规格：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入检件规格" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="检测标准：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入检测标准" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="检测比例：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入检测比例" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="分析检测项目：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入分析检测项目" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="验收标准：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入验收标准" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="申请人员：" name="birthday">
						<a-input v-model:value="formData.email" placeholder="请输入申请人员" allow-clear />
					</a-form-item>
				</a-col>
				
			</a-row>
					
				
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="formLoading" @click="onSubmit">保存</a-button>
		</template>
	</a-drawer>
</template>

<script setup>
	import userApi from '@/api/sys/userApi'
	import { required, rules } from '@/utils/formRules'
	// 默认是关闭状态
	let visible = $ref(false)
	const formRef = ref()
	const activeTabsKey = ref('1')
	const { proxy } = getCurrentInstance()
	const emit = defineEmits({ successful: null })
	const formLoading = ref(false)
	const treeData = ref([])
	const treeDefaultExpandedKeys = ref([])
	// 主职职位数据
	let positionData = ref([])
	// 主职主管人员数据
	let directorData = ref([])

	// 定义一个装机构跟职位的壳
	let childrenOrgPosArray = ref([])
	// 表单数据
	let formData = ref({})

	// 打开抽屉
	const onOpen = (record) => {
		visible = true
		formData.value = {
			gender: '男',
			positionJson: []
		}
		if (record) {
			convertFormData(record)
		}
		// 机构选择器数据
		userApi.userOrgTreeSelector().then((res) => {
			if (res !== null) {
				treeData.value = res
				// 默认展开2级
				treeData.value.forEach((item) => {
					// 因为0的顶级
					if (item.parentId === '0') {
						treeDefaultExpandedKeys.value.push(item.id)
						// 取到下级ID
						if (item.children) {
							item.children.forEach((items) => {
								treeDefaultExpandedKeys.value.push(items.id)
							})
						}
					}
				})
			}
		})
	}
	// 关闭抽屉
	const onClose = () => {
		treeData.value = []
		treeDefaultExpandedKeys.value = []
		positionData.value = []
		directorData.value = []
		visible = false
	}
	// 回显数据
	const convertFormData = (record) => {
		const param = {
			id: record.id
		}
		// 查询详情
		userApi.userDetail(param).then((data) => {
			if (data.positionJson) {
				const positionJsonLocal = JSON.parse(data.positionJson).map((item) => {
					childOrgSelect(item)
					return item
				})
				// 替换表单中的格式与后端查到的
				data.positionJson = positionJsonLocal
			}
			formData.value = Object.assign(formData.value, data)
			selePositionData(formData.value.orgId)
		})
	}
	// 默认要校验的
	const formRules = {
		account: [required('请输入账号')],
		name: [required('请输入姓名')],
		sex: [required('请选择性别')],
		orgId: [required('请选择组织')],
		positionId: [required('请选择职位')]
	}
	// 机构选择后查询对应的职位
	const selePositionData = (orgId, type) => {
		if (orgId) {
			const param = {
				orgId: orgId
			}
			userApi.userPositionSelector(param).then((res) => {
				positionData.value = res
			})
			userApi.userSelector(param).then((res) => {
				directorData.value = res
			})
			// 此类型代表选择的时候重置后面的职位
			if (type === 0) {
				formData.value.positionId = undefined
				formData.value.directorId = undefined
			}
		} else {
			formData.value.positionId = undefined
			formData.value.directorId = undefined
		}
	}
	// 附属职位信息增行
	const addDomains = () => {
		if (formData.value.positionJson === null) {
			formData.value.positionJson = []
		}
		formData.value.positionJson.push({
			orgId: undefined,
			positionId: undefined,
			directorId: undefined
		})
	}
	// 删减行
	const delDomains = (index) => {
		formData.value.positionJson.splice(index, 1)
	}
	// 子表行内选择机构
	const childOrgSelect = async (data, type) => {
		// 说明正在切换机构，我们就将他的后面的设置空
		if (type === 0) {
			formData.value.positionJson.filter((item) => {
				if (item.orgId === data.orgId) {
					item.positionId = undefined
					item.directorId = undefined
				}
			})
		}
		const param = {
			orgId: data.orgId
		}
		// 查询职位
		const posList = await userApi.userPositionSelector(param)
		// 查询人员
		const userList = await userApi.userSelector(param)
		const obj = {
			orgId: data.orgId,
			posList: posList,
			userList: userList
		}
		childrenOrgPosArray.value.push(obj)
	}
	// 获取行内职位数据
	const childPosData = (value) => {
		const resultData = childrenOrgPosArray.value.filter((item) => item.orgId === value)
		if (resultData.length > 0) {
			return resultData[0].posList
		}
	}
	// 获取行内用户数据
	const childUserData = (value) => {
		const resultData = childrenOrgPosArray.value.filter((item) => item.orgId === value)
		if (resultData.length > 0) {
			return resultData[0].userList
		}
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			// 因为不切断，我下面转换数据格式，影响上面表单会报错
			let formDatas = JSON.parse(JSON.stringify(formData.value))
			if (formDatas.positionJson && formDatas.positionJson.length > 0) {
				formDatas.positionJson = JSON.stringify(formDatas.positionJson)
			} else {
				delete formDatas.positionJson
			}
			formLoading.value = true
			userApi
				.submitForm(formDatas, !formDatas.id)
				.then(() => {
					onClose()
					emit('successful')
				})
				.finally(() => {
					formLoading.value = false
				})
		})
	}
	// 性别
	const genderOptions = proxy.$TOOL.dictTypeList('GENDER').map((item) => {
		return {
			value: item['dictValue'],
			label: item['name']
		}
	})
	// 民族
	const nationOptions = proxy.$TOOL.dictTypeList('NATION').map((item) => {
		return {
			value: item['dictValue'],
			label: item['name']
		}
	})
	// 身份证件
	const idcardTypeOptions = proxy.$TOOL.dictTypeList('IDCARD_TYPE').map((item) => {
		return {
			value: item['dictValue'],
			label: item['name']
		}
	})
	// 文化程度
	const cultureLevelOptions = proxy.$TOOL.dictTypeList('CULTURE_LEVEL').map((item) => {
		return {
			value: item['dictValue'],
			label: item['name']
		}
	})

	// 调用这个函数将子组件的一些数据和方法暴露出去
	defineExpose({
		onOpen
	})
</script>

<style scoped type="less">
	.childAddButton {
		margin-bottom: 10px;
	}
	.form-row {
		background-color: var(--item-hover-bg);
		margin-left: 0px !important;
	}
	.form-row-con {
		padding-bottom: 5px;
		padding-top: 5px;
		padding-left: 15px;
	}
	.dashedButton {
		margin-top: 10px;
		width: 100%;
	}
	.form-div {
		padding-top: 10px;
	}
</style>
