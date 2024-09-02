<template>
	
	<div id="">

        <a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
            <a-row :gutter="24">
                <a-col :span="7">
                    <a-form-item label="资产分类" name="categoryName">
                        <a-input v-model:value="searchFormState.categoryName" placeholder="请输入资产分类进行模糊查询" allow-clear></a-input>
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
    const selectedKeys = ref([])
    let searchFormState = reactive({})
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
			title: '资产分类',
			dataIndex: 'categoryName',
			width: 200
		},
		{
			title: '资产数量',
			dataIndex: 'assetAmount',
			width: 100
		},
		{
			title: '在用数量',
			dataIndex: 'useAmount',
			width: 100
		},
		{
			title: '闲置数量',
			dataIndex: 'unusedAmount',
			ellipsis: true,
			width: 100
		},
		{
			title: '维修数量',
			dataIndex: 'maintenanceAmount',
			ellipsis: true,
			width: 100
		},
		{
			title: '报废数量',
			dataIndex: 'disposalAmount',
			sorter: true,
			width: 100
		},
		{
			title: '维保到期数量',
			dataIndex: 'createTime',
			ellipsis: true,
			sorter: true,
			width: 100
		},
		{
            title: '已监控数量',
			dataIndex: 'monitorAmount',
			ellipsis: true,
			sorter: true,
			width: 100
		}
	]
	
	const loadData = (parameter) => {
	
        return categoryApi.categoryTree(Object.assign(parameter, searchFormState)).then((data) => {
           return data;
        })
	}

</script>