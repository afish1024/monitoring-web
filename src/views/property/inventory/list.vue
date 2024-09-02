<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" style="margin-bottom: 10px">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="5">
					<a-form-item label="资产分类" name="assetCategoryId">
						<a-input v-model:value="searchFormState.assetCategoryId" placeholder="请输入设备名称" allow-clear></a-input>
					</a-form-item>
				</a-col>
                <a-col :span="5">
					<a-form-item label="资产状态" name="assetStatus">
						<a-select v-model:value="searchFormState.assetStatus" placeholder="请选择资产状态" allowClear style="margin-right:20px;">
                            <a-select-option v-for="item in statusList" :key="item.dictValue" :value="item.dictValue">{{
                                item.dictLabel
                            }}</a-select-option>
                        </a-select>


					</a-form-item>
				</a-col>
                <a-col :span="5">
					<a-form-item label="品牌" name="assetBrand">
						<a-select v-model:value="searchFormState.assetBrand" placeholder="请选择品牌" allowClear style="margin-right:20px;">
                            <a-select-option v-for="item in brandList" :key="item.dictValue" :value="item.dictValue">{{
                                item.dictLabel
                            }}</a-select-option>
                        </a-select>

					</a-form-item>
				</a-col>
                <a-col :span="5">
					<a-form-item label="责任人" name="responsibleUser">
						<a-select v-model:value="searchFormState.responsibleUser" placeholder="请选择责任人" allowClear style="margin-right:20px;">
							<a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{
								item.name
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
                <a-col :span="5">
					<a-form-item label="在用人" name="requisitionUser">
						<a-select v-model:value="searchFormState.requisitionUser" placeholder="请选择在用人" allowClear style="margin-right:20px;">
							<a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{
								item.name
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
                <a-col :span="5">
					<a-form-item label="关键字" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="请输入资产名称或资产编码" allow-clear></a-input>
					</a-form-item>
				</a-col>
				
				<a-col :span="5">
					<a-button type="primary" html-type="submit" @click="table.refresh()">查询</a-button>
				</a-col>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false">
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
			:scroll="{ x: 1500 }"
			:pagination="{defaultPageSize:20}"
		>

		<template #operator class="table-operator">
			<a-space>
				<a-button type="primary" @click="form.onOpen()">
					<template #icon><plus-outlined /></template>
					新增资产清单
				</a-button>
			</a-space>
		</template>


		<template #bodyCell="{ column, record }">
			<template v-if="column.dataIndex === 'alarmLevel'">
			<div class="lists-level" 
				:class="{'bg-yellow':record.alarmLevel == 'secondary',
				'bg-orage':record.alarmLevel == 'primary',
				'bg-error':record.alarmLevel =='serious',
				'bg-unknown':record.alarmLevel =='unknown',
				'bg-red':record.alarmLevel == 'disconnect'
			}" >
				{{ record.alarmLevelName }}
			</div>
				
			</template>

			<template v-if="column.dataIndex === 'alarmType'">
		
				<div >
					{{ record.alarmTypeName }}
				</div>
					
				</template>
			<template v-if="column.dataIndex === 'ipAddress'">
				{{ record.deviceName }}
				<br/>
				{{ record.ipAddress }}
			</template>
			<template v-if="column.dataIndex === 'assetName'">
				<a @click="details.onOpen(record)" >{{ record.assetName }}</a>
			</template>
			<template v-if="column.dataIndex === 'action'">
				<a-space>
					<a @click="form.onOpen(record)" >编辑</a>
					<a-popconfirm title="确定要删除此数据吗？" @confirm="removeList(record)">
						<a-button type="link" danger size="small">
							删除</a-button>
					</a-popconfirm>
					
				</a-space>
			</template>

		</template>

		</s-table>
	</a-card>
	<Form ref="form" @successful="table.refresh(true)" />
	<Details ref="details" @successful="table.refresh(true)" />
</template>

<script setup name="processlist">
	import assetApi from '@/api/biz/assetApi'
	import dictApi from '@/api/dev/dictApi'
	import userApi from '@/api/sys/userApi'
	import Form from './form.vue'
	import Details from './details.vue'
	import tool from '@/utils/tool'
	const table = ref()
	let form = ref(null)
	const formRef = ref()
	let details = ref(null)
	const detailsRef = ref()
	const url = ref(import.meta.env.VITE_API_BASEURL)
	let searchFormState = reactive({})
	const toolConfig = { refresh: true, height: true, striped: false }

	const typsList = ref([]) 
	const brandList = ref([]) 
	const statusList = ref([]) 
	const userList =  ref([]) 
	const columns = [
		{
			title: '资产状态',
			dataIndex: 'assetStatusName',
			width: 80,
			fixed: 'left'
		},
		{
			title: '资产名称',
			dataIndex: 'assetName',
			width: 150,
		},
		{
			title: '资产编码',
			dataIndex: 'assetCode',
			width: 150,
		},
		{
			title: '品牌',
			dataIndex: 'assetBrandName',
			width: 100,
		},
		{
			title: '责任人',
			dataIndex: 'responsibleUser',
			width: 80,
		},
		{
			title: '在用人',
			dataIndex: 'requisitionUserName',
			width: 80,
		},
        {
			title: '在用部门',
			dataIndex: 'requisitionDepartment',
			width: 80,
		},
		{
			title: '维保到期时间',
			dataIndex: 'maintenanceExpirationDate',
			width: 150,
		},
        {
			title: '监控状态',
			dataIndex: 'monitorStatus',
			width: 150,
		}

	]

    // 操作栏通过权限判断是否显示
	
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '150px'
		})
	
    
	const selectedRowKeys = ref([])
	// 列表选择配置
	const options = {
		// columns数字类型字段加入 needTotal: true 可以勾选自动算账
		alert: {
			show: false,
			clear: () => {
				selectedRowKeys.value = ref([])
			}
		},
		rowSelection: {
			onChange: (selectedRowKey, selectedRows) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}
	const loadData = (parameter) => {
		return assetApi.inventoryPage(Object.assign(parameter, searchFormState)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	onMounted(()=>{
		searchData()
	})
	//选择网络
	const searchData = ()=>{
    	dictApi.dictListForLabel({category:'biz',dictValue:'ASSET_STATUS'}).then((data) => {
			statusList.value = data.value = data
		})
		dictApi.dictListForLabel({category:'biz',dictValue:'ASSET_BRAND'}).then((data) => {
		    brandList.value = data
		})
		dictApi.dictListForLabel({category:'biz',dictValue:'ALARM_TYPE'}).then((data) => {
			typsList.value = data
		})
		userApi.useList({}).then((data) => {
			userList.value = data
		})
	}

	// 删除
	const removeList = (record) => {
		let params = [
			{
				id: record.id
			}
		]
        assetApi.inventoryDelete(params).then(() => {
			table.value.refresh(true)
		})
	}



</script>
<style lang="less" >
.lists-level{
	color: #FFF;
	text-align: center;
	padding: 5px 0px;
	border-radius: 15px;
	width: 60px;
}
.bg-yellow{
	background-color: #f4cc61;
}
.bg-orage{
	background-color: #fd945f;
}
.bg-red{
	background-color: #f56372;
}
.bg-error{
	background-color: red;
}
.bg-unknown{
	background-color: #ececec;
}
</style>