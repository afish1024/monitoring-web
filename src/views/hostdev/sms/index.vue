<template>
    <a-row :gutter="24">
        <a-col :span="5">
            <a-card class="cardImp" :bordered="false" :loading="cardLoading">
				<a-tree
					v-if="treeData.length > 0"
					v-model:expandedKeys="defaultExpandedKeys"
					:tree-data="treeData"
					:field-names="treeFieldNames"
                    v-model:selectedKeys="selectedKeys"
					@select="treeSelect"
                    show-icon
				>
                    <template #icon="{app_icon}">
                        <component :is="app_icon" />
                    </template>
				</a-tree>
				<a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" />
			</a-card>
		</a-col>
        <a-col :span="19">
            <a-card :bordered="false" style="margin-bottom: 10px">
				<a-form ref="searchFormRef" name="advanced_search" class="ant-advanced-search-form" :model="searchFormState">
					<a-row :gutter="24">
						<a-col :span="6">
							<a-form-item name="keywords" label="主机名称">
								<a-input v-model:value="searchFormState.keywords" placeholder="请输入主机名称" allow-clear></a-input>
							</a-form-item>
						</a-col>
                       
						<a-col :span="6">
							<a-button type="primary" @click="table.refresh(true)">
								<template #icon><SearchOutlined /></template>
								查询
							</a-button>
							<a-button class="snowy-buttom-left" @click="() => searchFormRef.resetFields()">
								<template #icon><redo-outlined /></template>
								重置
							</a-button>
						</a-col>
					</a-row>
				</a-form>
			</a-card>
            <a-card :bordered="false">
				<s-table
					ref="table"
					:columns="columns"
					:data="loadData"
					:expand-row-by-click="true"
					:alert="options.alert.show"
					bordered
                    :tool-config="toolConfig"
                    :size="50"
                    :scroll="{ x: 1000 }"
				>

                 <template #headerCell="{ column }">
                     
                        <template v-if="column.dataIndex === 'sms_status'">
                            <a-popover title="短信响应状态">
                                <template #content>
                                    <p>200：表示从客户端成功发出去请求到服务端了,服务端也接收到<br/>了这条请求并正确返回</p>
                                    <p>204：No Content 请求已经成功了，但是却没有返回任何结果(实体)</p>
                                    <p>206：Partial Content 范围请求状态码</p>
                                    <p>301：Moved Permanently 表示你请求的页面资源现在已经转移位置，<br/>你需要到新的地方去需找该页面。这个即重定向，<br/>服务器的response首部里会有location字段值来提示。</p>
                                    <p>302：Found 表示你请求的页面资源现在已经转移位置了，你要到新的地方去寻找。<br/>但是新的地方也不是固定的，说不定过几天还要换。<br/>不提示用户保存书签，提示用户跳转。</p>
                                    <p>400：Bad Request 报文语法错误</p>
                                    <p>401：Unauthorized 需要通过HTTP认证 (BASIC 或者DIGEST)</p>
                                    <p>403：Forbidden 目录、文件权限错误都会报此状态码</p>
                                    <p>404：Not Found 服务器上无此资源，一般情况为路径错误</p>
                                    <p>500：Internal Server Error 服务端错误，有可能是WEB应用存在错误</p>
                                    <p>502：Bad Gateway 服务端错误有可能是服务端服务以及停止运行</p>
                                    <p>503：Serveice Unavailable 服务器超负荷运行</p>
                                </template>
                                短信响应状态<QuestionCircleOutlined style="padding-left: 10px;"/>
                            </a-popover>
                        </template>
                    </template>
                    <template v-slot:bodyCell="{text, record, index, column}">
                        <template v-if="column.dataIndex === 'index'">
                            <span>{{ index+1 }}</span>
                        </template>
                        <template v-if="column.dataIndex === 'sms_status'">
                            <span :class="record.sms_status != 200 ? 'fontred' : ''" >{{ record.sms_status_message }}</span>
						</template>
                        <template v-if="column.dataIndex === 'action'">
                        
                        </template>
                    </template>
				</s-table>
			</a-card>
        </a-col>
       
    </a-row>
</template>
<script setup name="hostList">
import { message, Empty } from 'ant-design-vue'
import indexApi from '@/api/python/indexApi'

const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false,columnTitle:' ' }
// 定义tableDOM
const table = ref(null)
const data = ref([])
let pageNumber = ref(1)
let pageSize = ref(0)
let total = ref(0)
let current = ref(1)
let reportNumber = ref(null)


const searchFormRef = ref()
let searchFormState = reactive({
    keywords:"",
    hostsid:0,
})
let defaultExpandedKeys = ref([])
const treeData = ref([])
// 替换treeNode 中 title,key,children
const treeFieldNames = { children: 'children', title: 'name', key: 'hostid' }
const cardLoading = ref(true)




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

const columns = [
    {
        title: '序号',
        fixed: 'left',  
        dataIndex: 'index',
        key: 'index',
        width: '50px'
    },
    {
        title: '主机名称',
        dataIndex: 'host_name',
        fixed: 'left',  
        width: '200px',
    },
    {
        title: '资源类别',
        dataIndex: 'content_type_name',
        fixed: 'left',  
        width: '120px',
    },
    {
        title: '异常信息',
        dataIndex: 'content',
        width: '180px',
        ellipsis:true
    },
    {
        title: '人员',
        dataIndex: 'sms_user',
        width: '150px',
    },
    {
        title: '手机号码',
        dataIndex: 'sms_mobile',
        width: '120px',
    },
    {
        title: '发送内容',
        dataIndex: 'sms_msg',
        ellipsis:true,
        width: '120px'
    },
    {
        title: '短信响应状态',
        dataIndex: 'sms_status',
        ellipsis:true,
        width: '180px'
    },
    {
        title: '时间',
        dataIndex: 'addtime',
        width: '200px'
    }
]
const serialNumber = (pageIndex, pageSize, index) => {
	return (pageIndex - 1) * pageSize + Number(index) + 1;
}
// 表格查询 返回 Promise 对象
const loadData = (parameter) => {
    return indexApi.hostLog(Object.assign(parameter, searchFormState)).then((res)=>{
        data.value = res.records
        pageSize.value = res.size
        pageNumber.value = res.current
        current.value = res.current
        total.value = res.total
      
        return res
    })
   
}

onMounted(()=>{
    loadTreeData()
})
// 加载左侧的树
const loadTreeData = () => {
    indexApi.hostsTree().then((res) => {
        cardLoading.value = false
        if (res !== null) {
            treeData.value = res
            treeData.value.unshift({
                name:"全部",
                type:"0"
            })
        }
    })
}
// 点击树查询
const treeSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
        searchFormState.hostsid = selectedKeys.toString()
    } else {
        delete searchFormState.hostsid
    }
    table.value.refresh(true)
}

</script>
<style lang="less" scoped>
.snowy-buttom-left{
    margin-left: 10px;
}
.ant-table-thead > tr > th {
    border-bottom: none;
}
.fontred{
    background-color: red;
}
</style>