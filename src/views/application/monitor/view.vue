<template>
	<a-drawer
		title="最新报警"
		width="85%"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
        :maskClosable="false"
	>
           
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
          
            <s-table
            ref="table"
            :columns="columns"
            :data="loadData"
            :expand-row-by-click="true"
            :alert="options.alert.show"
            bordered
            :row-key="(record) => record.id"
            :scroll="{ y: 300 }"
            @chageTable = "chageTable"
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
            </template>
        </s-table>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
		</template>
	</a-drawer>
</template>

<script setup name="historyRecordsView">
import indexApi from '@/api/python/indexApi'
import tool from '@/utils/tool'
// 定义emit事件
const emit = defineEmits({ successful: null })
const chageTable = ()=>{
    setTimeout(()=>{
        const tableBody = document.querySelector('.ant-table-body')
        if(tableBody){
            tableBody.setAttribute("style","overflow-y:scroll;max-height:420px")
        }
    },500)
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
// 默认是关闭状态
let visible = $ref(false)
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
    // {
    //     title: '模块',
    //     dataIndex: 'type',
    //     width: '100px'
    // },
    {
        title: '系统',
        dataIndex: 'appname',
        width: '100px'
    },
    {
        title: '接口地址',
        dataIndex: 'url',
        width: '160px',
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
       // sorter: (a, b) => a.responsetime - b.responsetime,
    },
    // {
    //     title: '监控状态',
    //     dataIndex: 'monitorStatus',
    //     width: '80px'
    // },
    {
        title: '更新时间',
        dataIndex: 'updatedAt',
        width: '120px'
    },
    // {
    //     title: '操作',
    //     dataIndex: 'action',
    //     align: 'center',
    //     fixed: 'right',
    //     width: '150px'
        
    // }
]
// 定义tableDOM
const table = ref(null)
const form = ref()
const searchFormRef = ref()
let searchFormState = reactive({
    app: "1",
    keywords: "",
    type: 0,
    allstatus: 0
})

// 打开抽屉
const onOpen = (record) => {
    searchFormState.app = record.app
    visible = true
    nextTick(()=>{
        setTimeout(()=>{
            const tableBody = document.querySelector('.ant-table-body')
            if(tableBody){
                tableBody.setAttribute("style","overflow-y:scroll;max-height:420px")
            }
        },500)
       
    })
}

const loadData = (parameter) => {
    searchFormState.userId = tool.data.get('USER_INFO').id
    return indexApi.alarmlog(Object.assign(parameter, searchFormState)).then((res)=>{
            return res
    })
}
// 关闭抽屉
const onClose = () => {
    visible = false
}
// 调用这个函数将子组件的一些数据和方法暴露出去
defineExpose({
    onOpen
})
</script>
<style lang="less" scoped>
.snowy-buttom-left {
    margin-left: 8px;
}
.cardImp {
		margin-right: 10px;
	}
</style>
