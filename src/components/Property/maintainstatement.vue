<template>
	
	<div id="">

        <a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="资产分类" name="assetCategoryId">
                        <a-select v-model:value="searchFormState.assetCategoryId" placeholder="请选择资产分类" allowClear style="margin-right:20px;">
                            <a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">{{
                                item.categoryName
                            }}</a-select-option>
                        </a-select>
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
                <a-col :span="7">
                    <a-form-item label="维保到期" name="deviceName">
                        <a-range-picker v-model:value="searchFormState.dates" :show-time="true" format="YYYY-MM-DD HH:mm:ss" @change="dateChange" 
						/>  
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="维保单位" name="maintenanceUnit">
                        <a-input v-model:value="searchFormState.maintenanceUnit" placeholder="请输入维保单位" allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="联系人" name="contactUser">
                        <a-select v-model:value="searchFormState.operationUser" placeholder="请选择联系人" allowClear style="margin-right:20px;">
							<a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{
								item.name
							}}</a-select-option>
						</a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="关键字" name="searchKey">
                        <a-input v-model:value="searchFormState.searchKey" placeholder="请输入资产名称或资产编码" allow-clear></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-button type="primary" html-type="submit" @click="table.refresh()">查询</a-button>
                </a-col>
            </a-row>
        </a-form>
        
        <div class="title">
            <div class="line"></div>
            <div class="value">资产分类报表</div>
        </div>    


        <a-card :bordered="false">
            <s-table
                ref="table"
                :columns="columns"
                :data="loadData"
                :alert="options.alert.show"
                bordered
                :row-key="(record) => record.id"
                :show-pagination="false"
                :tool-config="toolConfig"
                :row-selection="options.rowSelection"
            >
                
               
            </s-table>
        </a-card>


    </div>
       
</template>

<script  setup name="categorystatement">
	import { onMounted } from 'vue'
    import { Empty } from 'ant-design-vue'
    import categoryApi from '@/api/biz/categoryApi'
    import dictApi from '@/api/dev/dictApi'
    const selectedKeys = ref([])
    let searchFormState = reactive({})
    const statusList = ref([]) 
    const table = ref()
    const props = defineProps({
		categoryList:Object,
        userList:Object,
	})
    const categoryList = props.categoryList
    const userList =  props.userList
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
	const moduleType = ref()
	let moduleTypeList = ref([])
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '资产状态',
			dataIndex: 'assetStatus',
			width: 100
		},
		{
			title: '资产名称',
			dataIndex: 'assetName',
            width: 200
		},
		{
			title: '资产编码',
			dataIndex: 'assetCode',
            width: 100
		},
		{
			title: '资产分类',
			dataIndex: 'categoryName',
			ellipsis: true,
			width: 150
		},
		{
			title: '维保到期日期',
			dataIndex: 'maintenanceExpirationDate',
			ellipsis: true,
			width: 150
		},
		{
			title: '维保单位',
			dataIndex: 'maintenanceUnit',
			sorter: true,
            width: 150
		},
		{
			title: '联系人',
			dataIndex: 'contactUserName',
			ellipsis: true,
			sorter: true,
            width: '100px',
		},
		{
			title: '联系方式',
			dataIndex: 'contactWay',
			width: '200px',
		}
	]
	
	const loadData = (parameter) => {
        
        dictApi.dictListForLabel({category:'biz',dictValue:'ASSET_STATUS'}).then((data) => {
			statusList.value = data
		})
        return categoryApi.maintainStatement({}).then((data) => {
            return data.records;
        })
	}

</script>