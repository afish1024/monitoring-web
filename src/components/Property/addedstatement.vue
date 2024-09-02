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
                    <a-form-item label="入库日期" name="deviceName">
                        <a-range-picker v-model:value="searchFormState.dates" :show-time="true" format="YYYY-MM-DD HH:mm:ss" @change="dateChange" 
						/>  
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
                    <a-form-item label="规格型号" name="deviceName">
                        <a-select v-model:value="searchFormState.assetBrand" placeholder="请选择规格型号" allowClear style="margin-right:20px;">
                            <a-select-option v-for="item in specificationList" :key="item.dictValue" :value="item.dictValue">{{
                                item.dictLabel
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="关键字" name="deviceName">
                        <a-input v-model:value="searchFormState.deviceName" placeholder="请输入资产名称/资产编码" allow-clear></a-input>
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
                
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'path'">
                        <span v-if="record.menuType === 'MENU'">{{record.path}}</span>
                        <span v-else>-</span>
                    </template>
                    <template v-if="column.dataIndex === 'component'">
                        <span v-if="record.menuType === 'MENU'">{{record.component}}</span>
                        <span v-else>-</span>
                    </template>
                    <template v-if="column.dataIndex === 'icon'">
                        <component :is="record.icon" />
                    </template>
                    <template v-if="column.dataIndex === 'menuType'">
                        <a-tag v-if="record.menuType === 'CATALOG'" color="cyan">
                            {{ $TOOL.dictTypeData('MENU_TYPE', record.menuType) }}
                        </a-tag>
                        <a-tag v-if="record.menuType === 'MENU'" color="blue">
                            {{ $TOOL.dictTypeData('MENU_TYPE', record.menuType) }}
                        </a-tag>
                        <a-tag v-if="record.menuType === 'IFRAME'" color="purple">
                            {{ $TOOL.dictTypeData('MENU_TYPE', record.menuType) }}
                        </a-tag>
                        <a-tag v-if="record.menuType === 'LINK'" color="orange">
                            {{ $TOOL.dictTypeData('MENU_TYPE', record.menuType) }}
                        </a-tag>
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                        <a-space>
                            <a @click="form.onOpen(record, moduleType)">编辑</a>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定要删除此菜单吗？" @confirm="deleteMenu(record)">
                                <a-button type="link" danger size="small">删除</a-button>
                            </a-popconfirm>
                            <div v-if="record.parentId === '0' || record.menuType === 'MENU'">
                                <a-divider type="vertical" />
                                <a-dropdown>
                                    <a class="ant-dropdown-link">
                                        更多
                                        <DownOutlined />
                                    </a>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-if="record.parentId === '0'">
                                                <a @click="changeModuleFormRef.onOpen(record)">更改模块</a>
                                            </a-menu-item>
                                            <a-menu-item v-if="record.menuType === 'MENU'">
                                                <a @click="button.onOpen(record)">按钮权限</a>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                        </a-space>
                    </template>
                </template>
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
    const brandList = ref([]) 
    const statusList = ref([]) 
    const specificationList =  ref([]) 
    const props = defineProps({
		categoryList:Object,
	})
    const categoryList = props.categoryList
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

	const toolConfig = { refresh: true, height: true, striped: false }
	const columns = [
		{
			title: '资产状态',
			dataIndex: 'assetStatusName',
			width: 120
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
			title: '入库日期',
			dataIndex: 'receiptDate',
			ellipsis: true,
			width: 150
		},
		{
			title: '品牌',
			dataIndex: 'assetBrandName',
			sorter: true
		},
		{
			title: '规格型号',
			dataIndex: 'assetSpecification',
			ellipsis: true,
			sorter: true
		}
	]
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
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
		dictApi.dictListForLabel({category:'biz',dictValue:'ASSET_BRAND'}).then((data) => {
		    brandList.value = data
		})
        dictApi.dictListForLabel({category:'biz',dictValue:'ASSET_STATUS'}).then((data) => {
			statusList.value = data
		})
        dictApi.dictListForLabel({category:'biz',dictValue:'ASSET_SPECIFICATION'}).then((data) => {
			specificationList.value = data
		})
        
        return categoryApi.addedStatement(Object.assign(parameter, searchFormState)).then((data) => {
            return data.records;
        })
		
        
	}

</script>