<template>
     <a-row :gutter="24">
        <a-col :span="24">
            <a-card :bordered="false" style="margin-bottom: 10px">
                <a-form ref="searchFormRef"  :model="searchFormState">
                    <a-row :gutter="24">
						<a-col :span="8">
							<a-form-item name="searchKey" label="模糊查询">
								<a-input v-model:value="searchFormState.searchKey" placeholder="请输入关键字" allow-clear></a-input>
							</a-form-item>
						</a-col>
                        <a-col :span="8">
							<a-button type="primary" @click="table.refresh(true)">
								<template #icon><SearchOutlined /></template>
								查询
							</a-button>
						</a-col>
                        <a-col :span="8">
                            <div style="text-align: right;">
                                <a-button type="primary" @click="form.onOpen()">
                                    <template #icon><plus-outlined /></template>
                                    新增
                                </a-button>
                            </div>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24">
        <a-col :span="24" style="padding-left: 11px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">故障解决方案</div>
                <div style="text-align: right;">
                    <a-button @click="deleteBatchMenu()">
                        <template #icon><delete-outlined /></template>
                    </a-button>
                </div>
            </a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: -10px;">
        <a-col :span="24" style="padding-left: 11px;">
            <a-card :bordered="false">
                <s-table
					ref="table"
					:columns="columns"
					:data="loadData"
					:expand-row-by-click="true"
                    :alert="options.alert.show"
					bordered
					:row-key="(record) => record.id"
                    :row-selection="options.rowSelection"
				>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.dataIndex === 'action'">
                                <edit-outlined @click="form.onOpen(record)"/> 
                                <a-divider type="vertical"/>
                                <a-popconfirm title="确定要操作吗？" @confirm="confirm(record)">
                                     <delete-outlined /> 
                                </a-popconfirm>
                            </template>
                        
                        </template>
                </s-table>
			</a-card>
        </a-col>
    </a-row>
    <FromPlan ref="form" @successful="table.refresh(true)"></FromPlan>
</template>
<script setup name="planInfo">
import { message, Empty } from 'ant-design-vue'
import planApiList from '@/api/alarm/indexApi'
import FromPlan from './formplan.vue'
const searchFormRef = ref()
const table = ref()
const form = ref()
let searchFormState = reactive({
    searchKey:"",

})
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
const columns = [
    {
        title: '问题原因',
        align: 'center',
        dataIndex: 'problemReason'
    },
    {
        title: '问题解决方案',
        align: 'center',
        dataIndex: 'solutionContent'
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '350px'
    }
]
const loadData = (parameter)=>{
    return planApiList.planList(Object.assign(parameter, searchFormState)).then((res)=>{
         return res
    })
}
const confirm = (record) => {
    let params = [
        {
            id: record.id
        }
    ]
    planApiList.delPlan(params).then(()=>{
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
    planApiList.delPlan(params).then(()=>{
            table.value.refresh(true)
        })
}
let labels = [
    {"id": 2, "name": "艾瑞", "label": "D"}, 
    {"id": 4, "name": "大时代", "label": "D"}, 
    {"id": 1, "name": "道合顺", "label": "D"}, 
    {"id": 3, "name": "时间", "label": "A"}, 
    {"id": 5, "name": "代码", "label": "A"}, 
];
    function alpha_sort(labels){
       let alpha_dict = new Object();
       let factories = new Array();
       for(var i=0;i<labels.length;i++){
          let factory = labels[i];
          let label = factory.label;
          if(alpha_dict[label] == undefined){
             factories.push({"label": label, "children": [factory]});
             alpha_dict[label] = factories.length -1;
          }else {
               factories[alpha_dict[label]].children.push(factory);
          }
       }
       console.log(alpha_dict);
       console.log(factories);
       return factories;
    }
    console.log(alpha_sort(labels))
</script>
<style lang="less" scoped>
.iconleft{
    width: 4px;
    height: 25px;
    background-color: #0069d2;
    float: left;
}
:deep(.ant-card-body){
 padding: 10px;
}
</style>