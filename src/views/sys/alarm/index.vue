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
									<a-button type="primary" @click="table.refresh(true)">{{ $t('common.searchButton') }}</a-button>
									<a-button class="snowy-buttom-left" @click="() => searchFormRef.resetFields()">{{
										$t('common.resetButton')
									}}</a-button>
								</a-col>
								<a-col :span="6">
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
							<!-- <a @click="set.onOpen(record)">监控告警设置</a>
							<a-divider type="vertical" /> -->
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
	import roleSelectorPlus from '@/components/Selector/roleSelectorPlus.vue'
	import Form from './form.vue'
	import MonitorSet from './set.vue'
    import userApi from '@/api/sys/userApi'
	const loading = ref(false)
	onMounted(()=>{
	})
	const columns = [
		{
			title: '人员名称',
			dataIndex: 'name',
			ellipsis: true,
			fixed: 'left',
			width: '100px'
		},
		{
			title: '手机号',
			dataIndex: 'phone',
			width: '100px'
		},
		
		// {
		// 	title: '监控系统数量',
		// 	dataIndex: 'appType',
		// 	width: '100px',
		// 	ellipsis: true
		// },
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
			width: '220px'
		}
	]
	const { proxy } = getCurrentInstance()
	const statusData = proxy.$TOOL.dictTypeList('COMMON_STATUS')
	const searchFormRef = ref()
    let searchFormState = reactive({})
	const set = ref()
	const table = ref(null)
	let form = ref(null)
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

    const loadData = (parameter) => {
		searchFormState.isLogin = 0
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
