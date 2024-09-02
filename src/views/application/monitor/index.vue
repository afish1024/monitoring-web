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
                    :row-selection="options.rowSelection"
					
				>   <template #headerCell="{ column }">
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
					<template #operator class="table-operator" >
						<a-space>
                            <a-button type="primary" @click="form.onOpen(undefined)"   v-if="hasPerm('apiAdd')">
								<template #icon><plus-outlined /></template>
								新增接口
							</a-button>
							<a-button type="primary" @click="monitorRecords"  v-if="hasPerm('apiAlarmRecord')">
								报警记录
							</a-button>
							<a-button type="primary" @click="historyRecords.onOpen(searchFormState)" v-if="searchFormState.app > 0">
                                最新报警
                            </a-button>
                            <a-button danger @click="deleteBatchMenu()"  v-if="hasPerm('apiMoreDelete')">删除</a-button>
						</a-space>
					</template>
					<template v-slot:bodyCell="{text, record, index, column}"	>
                        <template v-if="column.dataIndex === 'id'">
							{{index+1 }}
						</template>
						<template v-if="column.dataIndex === 'responsetime'">
							<span>{{record.responsetime ? record.responsetime.substring(0,3) : ''}}</span>
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
							{{record.addtime }}
						</template>
                        <template v-if="column.dataIndex === 'monitorStatus'">
							<a-switch
                                :loading="loading"
                                :checked="record.monitorStatus ==1 ? true :false"
                                @change="editStatus($event,record)"
                                checked-children="开启" 
                                un-checked-children="关闭"
                            />
						</template>
						<template v-if="column.dataIndex === 'action'">
                            <a-space>
                                <a @click="form.onOpen(record)"  v-if="hasPerm('apiEdit')">编辑</a>
                                <a-divider type="vertical"  v-if="hasPerm(['apiEdit', 'apiSendSms'], 'and')"/>
                                <a @click="send.onOpen(record)"  v-if="hasPerm('apiSendSms')">发送告警短信</a>
                                <a-divider type="vertical"  v-if="hasPerm(['apiSendSms', 'apiDelete'], 'and')"/>
                                <a-popconfirm title="确定要删除吗？" @confirm="deleteMenu(record)"  v-if="hasPerm('apiDelete')">
                                    <a-button type="link" danger size="small">删除</a-button>
                                </a-popconfirm>
                            </a-space>
                        </template>
					</template>
				</s-table>
			</a-card>
        </a-col>
    </a-row>
    <viewInfo ref="historyRecords"/>
    <SendSms ref="send" @successful="table.refresh(true)" />
    <Form ref="form" @successful="table.refresh(true)" />
</template>
<script setup name="applicationList">
import { message, Empty } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import indexApi from '@/api/python/indexApi'
import tool from '@/utils/tool'
import viewInfo from './view.vue'
import SendSms from'./sendsms.vue'
import Form from './form.vue'
import global from '@/store/modules/global.js'
import bizTypeApi from '@/api/biz/bizTypeApi'
let loading = ref(false)
const editStatus = (e,record) => {
    loading.value = true
    if(e === false){
        record.monitorStatus = 0
        bizTypeApi.monitorSubmitForm(record, !record.id).then(()=>{
            loading.value = false
            table.value.refresh(true)
        })
    }else{
        record.monitorStatus = 1
        bizTypeApi.monitorSubmitForm(record, !record.id).then(()=>{
            loading.value = false
            table.value.refresh(true)
        })
    }
}
let  ismute =  ref(global.state.ismute)
const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
const visibleRemind = ref(true)
const createCreative = ref(null);
const historyRecords = ref()
const send = ref()
let timer = ref()
onMounted(() => {
   
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
        width: '120px'
    },
    
    {
        title: '系统',
        dataIndex: 'appname',
        width: '100px'
    },
    {
        title: '接口地址',
        dataIndex: 'url',
        width: '160px'
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
        width: '100px',
    },
    {
        title: '响应状态',
        dataIndex: 'status',
        width: '180px'
    },
    {
        title: '监控状态',
        dataIndex: 'monitorStatus',
        width: '80px',
    
    },
  
    {
        title: '响应时间(秒)',
        dataIndex: 'responsetime',
        width: '120px',
        sorter:true
    },
    {
        title: '排序',
        dataIndex: 'sort',
        width: '80px',
        sorter:true
    },
    {
        title: '更新时间',
        dataIndex: 'updatedAt',
        width: '120px',
        sorter:true,
    }
  
]

// 操作栏通过权限判断是否显示
if (hasPerm(['apiAlarmRecord','apiEdit','apiSendSms','apiDelete'])) {
    columns.push({
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '240px'
    })
}

const router = useRouter()
const routerString = ref(true)
onMounted(()=>{
    loadTreeData()
    if(router.currentRoute._value.query.app != undefined){
        selectedKeys.value = [router.currentRoute._value.query.app]
    }
})
let selectedRowKeys = ref([])
const monitorRecords = ()=>{
    router.push({
        path:'/alarm/statistics' 
    })
}
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
    searchFormState.app = router.currentRoute._value.query.app != undefined && routerString.value ? router.currentRoute._value.query.app : searchFormState.app
    return indexApi.monitorlist(Object.assign(parameter, searchFormState)).then((res)=>{
            return res
    })

    // return new Promise((resolve)=>{
    //     return resolve({
    //         total: 2, 
    //         current: 1, 
    //         size: "10", 
    //         pages: 1,
    //         records:[
    //             {
    //                 id:1,
    //                 mouthpieceName:'网站接口',
    //                 mouthpieceAddress:'http://192.168.9.0',
    //                 responseMethod:'post',
    //                 responseStatus:200,
    //                 responseTime:100,
    //                 monitorStatus:'停用',
    //                 updatedAt:'2023-06-29 16:53:17'

    //             },
    //             {
    //                 id:2,
    //                 mouthpieceName:'商品接口',
    //                 mouthpieceAddress:'http://192.168.9.0',
    //                 responseMethod:'post',
    //                 responseStatus:200,
    //                 responseTime:100,
    //                 monitorStatus:'启用',
    //                 updatedAt:'2023-06-29 16:53:17'

    //             }
    //         ] 
    //     })
    // })
}
// 加载左侧的树
const loadTreeData = () => {
    indexApi.monitorTree().then((res) => {
        cardLoading.value = false
        if (res !== null) {
            //console.log(res)
            treeData.value = res.records
            treeData.value.unshift({
                name:"全部",
                type:"0"
            })
            // treeData.value = res
            // // 默认展开2级
            // treeData.value.forEach((item) => {
            //     // 因为0的顶级
            //     if (item.parentId === '0') {
            //         defaultExpandedKeys.value.push(item.id)
            //         // 取到下级ID
            //         if (item.children) {
            //             item.children.forEach((items) => {
            //                 defaultExpandedKeys.value.push(items.id)
            //             })
            //         }
            //     }
            // })
        }
    })
}
// 点击树查询
const treeSelect = (selectedKeys) => {
    routerString.value = false
    if (selectedKeys.length > 0) {
        searchFormState.type = selectedKeys.toString()
        searchFormState.app = selectedKeys.toString()
    } else {
        delete searchFormState.type
    }
    table.value.refresh(true)
}
// 删除
const deleteMenu = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		bizTypeApi.delMonitor(params).then(()=>{
            table.value.refresh(true)
        })
	}
// 批量删除
const deleteBatchMenu = () => {
    if (selectedRowKeys.value.length < 1) {
        message.warning('请选择一条或多条数据')
        return false
    }
    const params = selectedRowKeys.value.map((m) => {
        return {
            id: m
        }
    })
    bizTypeApi.delMonitor(params).then(()=>{
            table.value.refresh(true)
        })
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