<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" style="margin-bottom: 10px">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
			
				<a-col :span="4">
					<a-form-item label="操作人" name="operationUser">
						<a-select v-model:value="searchFormState.operationUser" placeholder="请选择操作人" allowClear style="margin-right:20px;">
							<a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{
								item.name
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
                <a-col :span="5">
					<a-form-item label="业务类型" name="operationType">
						<a-select v-model:value="searchFormState.operationType" placeholder="请选择业务类型" allowClear style="margin-right:20px;">
                            <a-select-option v-for="item in statusList" :key="item.dictValue" :value="item.dictValue">{{
                                item.dictLabel
                            }}</a-select-option>
                        </a-select>

					</a-form-item>
				</a-col>
                <a-col :span="7">
					<a-form-item label="时间范围" name="deviceName">
						<a-range-picker v-model:value="searchFormState.dates" :show-time="true" format="YYYY-MM-DD HH:mm:ss" @change="dateChange" 
						/>  
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="关键字" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="请输入资产名称/资产编码" allow-clear></a-input>
					</a-form-item>
				</a-col>
              
				
				<a-col :span="3">
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
			:scroll="{ x: 1000 }"
			:pagination="{defaultPageSize:20}"
		>


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

			<template v-if="column.dataIndex === 'action'">
				<a-space>
					<a @click="logInfo(record)" >查看</a>
				
					
				</a-space>
			</template>

		</template>

		</s-table>
	</a-card>
	<a-modal
		title="日志详情"
		v-model:visible="modalVisible"
		@cancel="modalVisible = false"
		@ok="submit"
		destroy-on-close
		append-to-body
		:width="600"
		:footer="null"
	>
		<div>
			<a-row :gutter="24" class="mb15">
				<a-col :span="12">
					<a-row :gutter="24">
						<a-col :span="7">
							操作人
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false" v-model:value="info.operationUserName" />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="24">
						<a-col :span="7">
							资产名称
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false" v-model:value="info.assetName" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

			<a-row :gutter="24"  class="mb15">
				<a-col :span="12">
					<a-row :gutter="24">
						<a-col :span="7">
							资产编码
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false" v-model:value="info.assetCode"/>
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="24">
						<a-col :span="7">
							业务类型
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false" v-model:value="info.operationTypeName" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

			<a-row :gutter="24">
				<a-col :span="12">
					<a-row :gutter="24">
						<a-col :span="7">
							操作时间
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false" v-model:value="info.operationDate"/>
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="24">
						<a-col :span="7">
							操作描述
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false" v-model:value="info.operationDescription" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>
		</div>
	</a-modal>
</template>

<script setup name="processlist">
    import categoryApi from '@/api/biz/categoryApi'
	import dictApi from '@/api/dev/dictApi'
	import userApi from '@/api/sys/userApi'

	import tool from '@/utils/tool'
	const dateFormat = 'YYYY-MM-DD HH:mm:ss';

	const table = ref()
	let form = ref(null)
	const formRef = ref()
	const infoRef = ref()
	const url = ref(import.meta.env.VITE_API_BASEURL)
	let searchFormState = reactive({})
	const toolConfig = { refresh: true, height: true, striped: false }
	let modalVisible = ref(false)
	const statusList = ref([]) 
	const userList =  ref([]) 
	const info = ref([]) 
	const columns = [
		{
			title: '操作人',
			dataIndex: 'operationUserName',
			width: 50,
			fixed: 'left'
		},
		{
			title: '资产名称',
			dataIndex: 'assetName',
			width: 80,
		},
		{
			title: '资产编码',
			dataIndex: 'assetCode',
			width: 80,
		},
		{
			title: '业务类型',
			dataIndex: 'operationTypeName',
			width: 50,
		},
		{
			title: '操作时间',
			dataIndex: 'operationDate',
			width: 50,
		}

	]

    // 操作栏通过权限判断是否显示
	
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: 20
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
	const dateChange = (dates) => {
    
		if (dates != null) {
			searchFormState.startDate = dates[0].format('YYYY-MM-DD HH:mm:ss')
			searchFormState.endDate = dates[1].format('YYYY-MM-DD HH:mm:ss')

			searchFormState.dates = [
				dayjs(dates[0], dateFormat),
				dayjs(dates[1], dateFormat),
			]

		}

	}
	const loadData = (parameter) => {
		return categoryApi.logsPage(Object.assign(parameter, searchFormState)).then((data) => {
			return data
		})
	}
	const logInfo = (data) => {

		info.value = data;
		modalVisible.value = true
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	onMounted(()=>{
		searchData()
	})
	const searchData = ()=>{
    	dictApi.dictListForLabel({category:'biz',dictValue:'OPERATION_TYPE'}).then((data) => {
			statusList.value = data.value = data
		})
		userApi.useList({}).then((data) => {
			userList.value = data
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
.mb15{
	margin-bottom:15px;
}
</style>