<template>
    <a-row>
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
                    <!-- <template #icon="{app_icon}">
                        <component :is="app_icon" />
                    </template> -->
				</a-tree>
				<a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" />
			</a-card>
		</a-col>
        <a-col :span="19">
            <a-card :bordered="false" style="margin-bottom: 10px">
				<a-form ref="searchFormRef" name="advanced_search" class="ant-advanced-search-form" :model="searchFormState">
					<a-row :gutter="24">
						<a-col :span="8">
							<a-form-item name="keywords" label="接口名称">
								<a-input v-model:value="searchFormState.keywords" placeholder="请输入接口名称" allow-clear></a-input>
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
            <a-card :bordered="false"><!--:row-selection="options.rowSelection"-->
				<s-table
					ref="table"
					:columns="columns"
					:data="loadData"
					:expand-row-by-click="true"
					:alert="options.alert.show"
					bordered
					:row-key="(record) => record.id"
                    :scroll="{ x: 1000 }"
                    :tool-config="toolConfig"
				>
                    <template #headerCell="{ column }">
                        <template v-if="column.dataIndex === 'status'">
                            <a-popover title="响应状态">
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
                                响应状态<QuestionCircleOutlined style="padding-left: 10px;"/>
                            </a-popover>
                        </template>
                    </template>
					<template #operator class="table-operator">
					
					</template>
					<template v-slot:bodyCell="{text, record, index, column}">
                        <template v-if="column.dataIndex === 'id'">
                            {{index +1}}
                        </template>
						<template v-if="column.dataIndex === 'responsetime'">
							<span>{{record.responsetime.substring(0,3)}}</span>
						</template>
                        <template v-if="column.dataIndex === 'status'">
							<span v-if="record.status!=200" style="background-color: red;">{{ record.status_message }}</span>
                            <span v-else>
                                <!-- <a-popover title="响应状态">
                                    <template #content>
                                        <p>200：请求处理成功</p>
                                    </template>
                                    {{ record.status }}<QuestionCircleOutlined style="padding-left: 10px;"/>
                                </a-popover> -->
                                {{ record.status_message }}
                            </span>

						</template>
                        <template v-if="column.dataIndex === 'updatedAt'">
							{{record.addtime.$date }}
						</template>
						<template v-if="column.dataIndex === 'action'">
							<a @click="form.onOpen(record)">详情</a>
							<!-- <a-divider type="vertical" />
							<a-popconfirm title="确定要删除吗？" @confirm="removeOrg(record)">
								<a-button type="link" danger size="small">删除</a-button>
							</a-popconfirm> -->
						</template>
					</template>
				</s-table>
			</a-card>
        </a-col>
    </a-row>
  
</template>
<script setup name="alarmLogList">
import { message, Empty } from 'ant-design-vue'
import indexApi from '@/api/python/indexApi'
import tool from '@/utils/tool'
import bus from "@/utils/bus";
import global from '@/store/modules/global.js'

const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
const show = ref(false)
const visibleModel = ref(false)
const visibleRemind = ref(true)
const createCreative = ref(null);
let  ismute =  ref(global.state.ismute)
let timer = ref()
const cancelModel = () =>{
    visibleModel.value = false
}
onMounted(()=>{
    loadTreeData()
   
})
const handleCancel = ()=>{
    visibleRemind.value = false
}
const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        fixed: 'left',
        width: '60px'
    },
    {
        title: '接口名称',
        fixed: 'left',
        dataIndex: 'name',
        width: '150px'
    },
    
    {
        title: '系统',
        dataIndex: 'appname',
        width: '200px'
    },
    {
        title: '接口地址',
        dataIndex: 'url',
        width: '200px'
    },
    {
        title: '异常信息',
        dataIndex: 'msg',
        width: '160px',
        ellipsis:true,
    },
    {
        title: '请求方式',
        dataIndex: 'method',
        width: '100px'
    },
    {
        title: '响应状态',
        dataIndex: 'status',
        width: '180px'
    },
    {
        title: '响应时间(秒)',
        dataIndex: 'responsetime',
        width: '120px',
        sorter:true
        //sorter: (a, b) => a.responsetime - b.responsetime,
    },

    {
        title: '报警时间',
        dataIndex: 'addtime',
        width: '150px',
        sorter:true,
        //defaultSortOrder: 'descend',
    },
 
]

const musicSrc = ref(null)
const audio_1 = ref(null);
bus.on('bj',data=>{

})
const alarmInfo = (data)=>{
   // audio_1.value =  null
    show.value = data
    visibleModel.value = data
    musicSrc.value = '../../../../bj.mp3'
    var dom = audio_1.value
    console.dir(dom)
    if(dom){
        dom.play()
    }
    setTimeout(()=>{
        show.value = false
    },5500)
    //bus.off('Event');
}
let selectedRowKeys = ref([])
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
// 定义tableDOM
const table = ref(null)
const form = ref()
const searchFormRef = ref()
let searchFormState = reactive({
    app: "0",
    keywords:"",
    type:0,
})
// 默认展开的节点
let defaultExpandedKeys = ref([])
const selectedKeys = ref(["0"])
const treeData = ref([])
// 替换treeNode 中 title,key,children
const treeFieldNames = { children: 'children', title: 'name', key: 'type' }
const cardLoading = ref(true)
// 表格查询 返回 Promise 对象
const loadData = (parameter) => {
    
    searchFormState.userId = tool.data.get('USER_INFO').id
    return indexApi.historyList(Object.assign(parameter, searchFormState)).then((res)=>{
            return res
    })
   
}
// 加载左侧的树
const loadTreeData = () => {
    indexApi.monitorTree().then((res) => {
        cardLoading.value = false
        if (res !== null) {
            treeData.value = res.records
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
        searchFormState.type = selectedKeys.toString()
        searchFormState.app = selectedKeys.toString()
    } else {
        delete searchFormState.type
    }
    table.value.refresh(true)
}
</script>
<style lang="less" scoped>
.cardImp {
		margin-right: 10px;
	}
.ant-form-item {
    margin-bottom: 0 !important;
}
.primaryAdd {
    margin-right: 10px;
}
.snowy-buttom-left {
    margin-left: 8px;
}
:deep(.ant-tree .ant-tree-node-content-wrapper){
    padding: 0 ;
}
:deep(.ant-tree-switcher){
    width:0;
}
.create-creative :deep(.ant-modal) {
    bottom:100px !important;
    padding-bottom: 0px;
    right: 0;
    position:absolute !important;
    height: 50px !important;
    top: auto !important;
}
.create-creative :deep(.ant-modal .ant-modal-header) {
    background-color: #e4e0e0 !important;
   
}
.create-creative :deep(.ant-modal .ant-modal-title) {
    color:#fd544c !important;
}
</style>