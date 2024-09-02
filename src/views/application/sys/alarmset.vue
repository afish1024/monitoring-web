<template>
	<a-drawer
		:title="formData.name"
		width="50%"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px'}"
		:footer-style="{ textAlign: 'right' }"
        :maskClosable="false"
		@close="onClose"
	>
    <!-- <a-card :bordered="false"> -->
            <a-table :dataSource="dataSource" :columns="columns" :pagination="false" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'name'">
                        <a-row v-if="record.name ==1">
                            <a-col>
                                <a-checkbox
                                    v-model:checked="indeterminate"
                                    :indeterminate="indeterminate"
                                    @change="onCheckAllChange($event)"
                                    style="margin-bottom: 10px;"
                                    >
                                    <span style="font-weight: 700;font-size: 16px;">全选</span>
                                </a-checkbox>
                            </a-col>
                        </a-row>
                        <a-checkbox-group v-model:value="checkValue" @change="checkboxMonitor($event)" v-if="record.name ==1">
                            <a-row v-for="(item,index) in newarray" :key="index" style="margin-bottom: 10px;">
                                <a-col>
                                    <a-checkbox :value="item.id" >{{item.name}}</a-checkbox>
                                </a-col>
                            </a-row>
                        </a-checkbox-group>
                    </template>
                </template>
            </a-table>
        <!-- </a-card> -->
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
		</template>
    </a-drawer>
</template>
<script setup name="AlarmSetInfo">
import { message, Empty } from 'ant-design-vue'
import bizTypeApi from '@/api/biz/bizTypeApi'
import userApi from '@/api/sys/userApi'
const emit = defineEmits({ successful: null })
const indeterminate = ref(false)
const checkValue = ref([])
let loading = ref(false)
let visible = $ref(false)
const submitLoading = ref(false)
const formData = ref({
    name:''
})
const columns = [
    {
        title: '监控系统',
        dataIndex: 'sys',
        width: 150
    },
    {
        title: '人员',
        dataIndex: 'name' 
    } 
]
const dataSource = ref([])
const newarray = ref()
const onOpen = (record)=>{
    visible = true
    if (record) {
        formData.value = Object.assign({}, record)
        formData.value.ids = []
    }
    userApi.userSelector().then((res)=>{
        //console.log(res.monitorType)
        newarray.value = res
    })
    dataSource.value = [
        {
            sys:formData.value.name,
            name:1
        },
    ]
    bizTypeApi.setMonitorInfo({appType:record.type}).then((res)=>{
        console.log(res.records)
        if(res.records.length > 0){
            res.records.map((item)=>{
                checkValue.value.push(item.id)
            })
            indeterminate.value = true
        }else{
            indeterminate.value = false
        }
        //checkValue.value = res.appType ? res.appType.split(','):[]
        // if(res.appType){
        //     indeterminate.value = true
        // }else{
        //     indeterminate.value = false
        // }
    })
    // indexApi.monitorTree().then((res) => {
    //     if(res.records.length > 0){
    //         res.records.forEach(itemVue => {
    //             newarray.value.push({name:itemVue.name,id:itemVue.type})
    //         });
    //     }
    //     dataSource.value = [
    //         {
    //             name:formData.value.name,
    //             sys:1
    //         },
    //         {
    //             name:'短信警告',
    //             sys:2
    //         }
    //     ]
        
    // })
    
}
const checkboxMonitor = (e)=>{
    formData.value.ids = e
    if(e.length > 0){
        indeterminate.value = true
    }else{
        indeterminate.value = false
    }
}
const onCheckAllChange = (e)=>{
    //console.log(e)
    if(e.target.checked === true){
        newarray.value.map((item,index)=>{
            formData.value.ids.push(item.id)
            checkValue.value.push(item.id)
        })
    }else{
        formData.value.ids = []
        checkValue.value = []
    }
    if(checkValue.value.length > 0){
        indeterminate.value = true
    }else{
        indeterminate.value = false
    }
}
// 关闭抽屉
const onClose = () => {
    //formRef.value.resetFields()
    indeterminate.value = false
    checkValue.value = []
    //newarray.value = []
    submitLoading.value = false
    visible = false
}
const onSubmit = ()=>{
    if(checkValue.value.length === 0){
        message.error('请选人员')
        return false
    }
    var params = {
        userId:formData.value.id,
        userIds:checkValue.value,
        appType:formData.value.type
    }
    //console.log(params)
    bizTypeApi.setMonitor(params).then(() => {
            onClose()
            emit('successful')
        })
        .finally(() => {
            //formLoading.value = false
        })
}
defineExpose({
    onOpen
})
</script>
<style lang="less" scoped>
:deep(.ant-checkbox-wrapper + .ant-checkbox-wrapper){
    margin-top:10px
}
:deep(.ant-checkbox-wrapper:first-child){
    margin-left:8px
}
</style>