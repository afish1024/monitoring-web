<template>
	<a-row>
		<a-col :span="24">
			<a-card :bordered="false">
				<s-table
					ref="table"
					:columns="columns"
					:data="loadData"
					:expand-row-by-click="true"
					bordered
					:alert="options.alert.show"
					:row-key="(record) => record.id"
					:row-selection="options.rowSelection"
				>
					<template #operator class="table-operator">
						<a-form
							ref="searchFormRef"
							name="advanced_search"
							class="ant-advanced-search-form"
							:model="searchFormState"
						>
							<a-row :gutter="24">
								<a-col :span="6">
									<a-form-item name="searchKey">
										<a-input v-model:value="searchFormState.searchKey" placeholder="请输入姓名或账号"></a-input>
									</a-form-item>
								</a-col>
								<a-col :span="6">
									<a-form-item name="userStatus">
										<a-select v-model:value="searchFormState.userStatus" placeholder="请选择状态">
											<a-select-option v-for="item in statusData" :key="item.dictValue" :value="item.dictValue">{{
												item.name
											}}</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :span="6">
									<a-form-item name="testStatus">
										<a-select v-model:value="searchFormState.testStatus" placeholder="修复状态">
											<a-select-option v-for="item in testData" :key="item.dictValue" :value="item.dictValue">{{
												item.name
											}}</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :span="6">
									<a-button type="primary" @click="table.refresh(true)">{{ $t('common.searchButton') }}</a-button>
									<a-button class="snowy-buttom-left" @click="() => searchFormRef.resetFields()">{{
										$t('common.resetButton')
									}}</a-button>
								</a-col>
								<a-col :span="6" style="padding-top: 10px;">
									<a-button type="primary" class="primaryAdd" @click="form.onOpen()">
										<span>{{ $t('common.addButton') }}{{ $t('model.user') }}</span>
									</a-button>
									<a-button danger @click="removeBatchUser()">{{
										$t('common.batchRemoveButton')
									}}</a-button>
								</a-col>
							</a-row>
						</a-form>
					</template>
					<template #bodyCell="{ column, record }">
						<template v-if="column.dataIndex === 'avatar'">
							<a-avatar :src="record.avatar" style="margin-bottom: -5px; margin-top: -5px" />
						</template>
						<template v-if="column.dataIndex === 'gender'">
							{{ $TOOL.dictTypeData('GENDER', record.gender) }}
						</template>
						<template v-if="column.dataIndex === 'userStatus'">
							<a-switch
								:loading="loading"
								:checked="record.userStatus === 'ENABLE'"
								@change="editStatus(record)"
								checked-children="开启" 
                                un-checked-children="关闭"
							/>
						</template>
						<template v-if="column.dataIndex === 'action'">
							<a @click="form.onOpen(record)">{{ $t('common.editButton') }}</a>
							<a-divider type="vertical" />
							<a @click="selectRole(record)">角色</a>
							<a-divider type="vertical" />
							<!-- <a-popconfirm title="确定重置此用户密码？" @confirm="resetPassword(record)">
								<a>重置密码</a>
							</a-popconfirm>
							<a-divider type="vertical" /> -->
							<a @click="set.onOpen(record)">监控告警设置</a>
							<a-divider type="vertical" />
							<a-popconfirm title="确定要删除此用户吗？" @confirm="removeUser(record)">
								<a-button type="link" danger size="small">{{
									$t('common.removeButton')
									}}</a-button>
							</a-popconfirm>
						</template>
					</template>
				</s-table>
			</a-card>
		</a-col>
	</a-row>
	<Form ref="form" @successful="table.refresh(true)" />
	<role-selector-plus 
		ref="RoleSelectorPlus"
		page-url="/sys/user/roleSelector"
		org-url="/sys/user/orgTreeSelector"
		@onBack="roleBack"
	/>
	<MonitorSet ref="set" @successful="table.refresh(true)"/>
</template>

<script setup name="sysUser">
	import { message, Empty } from 'ant-design-vue'
	import { getCurrentInstance } from 'vue'
	import roleApi from '@/api/sys/roleApi'
	import userApi from '@/api/sys/userApi'
	import roleSelectorPlus from '@/components/Selector/roleSelectorPlus.vue'
	import Form from './form.vue'
	import MonitorSet from './set.vue'
	onMounted(()=>{
		//dataRoleList()
	})
	const columns = [
		// {
		// 	title: '头像',
		// 	dataIndex: 'avatar',
		// 	align: 'center',
		// 	width: '80px'
		// },
		{
			title: '账号',
			dataIndex: 'account',
			ellipsis: true,
			fixed: 'left',
			width: '100px'
		},
		{
			title: '姓名',
			dataIndex: 'name',
			width: '100px'
		},
		{
			title: '角色',
			dataIndex: 'roleName',
			width: '120px'
		},
		{
			title: '手机',
			dataIndex: 'phone',
			ellipsis: true,
			width: '100px'
		},
		{
			title: '监控数量',
			dataIndex: 'appType',
			width: '100px',
			ellipsis: true,
			sorter: true,
		},
		{
			title: '告警状态',
			dataIndex: 'monitorType',
			width: '80px',
			customRender:({text})=>{
				switch(text) {
					case '1':
					return '开启';
					case '2':
					return '关闭';
				}
				
			}
		},
		{
			title: '状态',
			dataIndex: 'userStatus',
			width: '80px'
		},
		{
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			fixed: 'right',
			width: '240px'
		}
	]
	const { proxy } = getCurrentInstance()
	const statusData = proxy.$TOOL.dictTypeList('COMMON_STATUS')
	const searchFormRef = ref()
	let defaultExpandedKeys = ref([])
	let searchFormState = reactive({})
	const set = ref()
	const table = ref(null)
	const treeData = ref([])
	let selectedRowKeys = ref([])
	const treeFieldNames = { children: 'children', title: 'name', key: 'id' }
	let form = ref(null)
	let RoleSelector = ref()
	let RoleSelectorPlus = ref()
	const selectedRecord = ref({})
	const loading = ref(false)
	const cardLoading = ref(true)
	let testData = ref([{
		'name':11,
		'dictValue':11,
	},{
		'name':22,
		'dictValue':22,
		
	}])
	// 表格查询 返回 Promise 对象
	const loadData = (parameter) => {
		parameter.isLogin = 1
		return userApi.userPage(Object.assign(parameter, searchFormState)).then((res) => {
			if(res.records.length > 0){
				res.records.map((item)=>{
					if(item.appType){
						item.appType = item.appType.split(",").length
					}else{
						item.appType = 0
					}
				})
			}
			return res
		})
	}
	// 左侧树查询
	userApi.userOrgTreeSelector().then((res) => {
		cardLoading.value = false
		if (res !== null) {
			treeData.value = res
			// 默认展开2级
			treeData.value.forEach((item) => {
				// 因为0的顶级
				if (item.parentId === '0') {
					defaultExpandedKeys.value.push(item.id)
					// 取到下级ID
					if (item.children) {
						item.children.forEach((items) => {
							defaultExpandedKeys.value.push(items.id)
						})
					}
				}
			})
		}
	})
	// 列表选择配置
	const options = {
		alert: {
			show: false,
			clear: () => {
				selectedRowKeys = ref([])
			}
		},
		rowSelection: {
			onChange: (selectedRowKey, selectedRows) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}
	// 点击树查询
	const treeSelect = (selectedKeys) => {
		if (selectedKeys.length > 0) {
			searchFormState.orgId = selectedKeys.toString()
		} else {
			delete searchFormState.orgId
		}
		table.value.refresh(true)
	}
	// 修改状态
	const editStatus = (record) => {
		loading.value = true
		if (record.userStatus === 'ENABLE') {
			userApi
				.userDisableUser(record)
				.then(() => {
					table.value.refresh()
				})
				.finally(() => {
					loading.value = false
				})
		} else {
			userApi
				.userEnableUser(record)
				.then(() => {
					table.value.refresh()
				})
				.finally(() => {
					loading.value = false
				})
		}
	}
	// 删除用户
	const removeUser = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		userApi.userDelete(params).then(() => {
			table.value.refresh()
		})
	}
	// 批量删除用户
	const removeBatchUser = () => {
		if (selectedRowKeys.value.length < 1) {
			message.warning('请选择一条或多条数据')
			return
		}
		const params = selectedRowKeys.value.map((m) => {
			return {
				id: m
			}
		})
		userApi.userDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
	// 打开角色选择器
	const selectRole = (record) => {
		selectedRecord.value = record
		// 查询到已有角色，并转为ids的格式，给角色选择器
		const param = {
			id: record.id
		}
		userApi.userOwnRole(param).then((data) => {
			RoleSelectorPlus.value.showRolePlusModal(data)
		})
	}
	// 角色选择回调
	const roleBack = (value) => {
		let params = {
			id: selectedRecord.value.id,
			roleIdList: []
		}
		if (value.length > 0) {
			value.forEach((item) => {
				params.roleIdList.push(item.id)
			})
		}
		userApi.grantRole(params).then(() => {})
	}
	// 重置用户密码
	const resetPassword = (record) => {
		userApi.userResetPassword(record).then(() => {})
	}
</script>

<style scoped>
	.cardImp {
		margin-right: 10px;
	}
	.ant-form-item {
		margin-bottom: 0 !important;
	}
	.primaryAdd {
		margin-right: 10px;
	}
	.snowy-table-avatar {
		margin-top: -10px;
		margin-bottom: -10px;
	}
	.snowy-buttom-left {
		margin-left: 8px;
	}
</style>
