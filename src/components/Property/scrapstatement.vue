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
                <a-col :span="4">
                    <a-form-item label="报废人" name="deviceName">
                        <a-select v-model:value="searchFormState.operationUser" placeholder="请选择报废人" allowClear style="margin-right:20px;">
							<a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{
								item.name
							}}</a-select-option>
						</a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="报废日期" name="deviceName">
                        <a-range-picker v-model:value="searchFormState.dates" :show-time="true" format="YYYY-MM-DD HH:mm:ss" @change="dateChange" 
                />  
                    </a-form-item>
                </a-col>
                <a-col :span="5">
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
            <div class="value">清理报废资产报表</div>
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
    const selectedKeys = ref([])
    let searchFormState = reactive({})
    const props = defineProps({
		categoryList:Object,
        userList:Object,
	})
    const categoryList = props.categoryList
    const userList =  props.userList
    const table = ref()
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
			dataIndex: 'assetStatusName',
			width: 260
		},
		{
			title: '资产名称',
			dataIndex: 'assetName'
		},
		{
			title: '资产编码',
			dataIndex: 'assetCode'
		},
		{
			title: '资产分类',
			dataIndex: 'categoryName',
			ellipsis: true,
			width: 150
		},
		{
			title: '报废日期',
			dataIndex: 'disposalDate',
			ellipsis: true,
			width: 150
		},
		{
			title: '报废人',
			dataIndex: 'disposalUser',
			sorter: true
		},
		{
			title: '报废部门',
			dataIndex: 'disposalDepartment',
			ellipsis: true,
			sorter: true
		}
	]
	
	const loadData = (parameter) => {
        return categoryApi.scrapStatement({}).then((data) => {
            return data.records;
        })
	}

</script>