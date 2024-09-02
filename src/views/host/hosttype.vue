<template>
	<a-drawer
		:title="formData.host"
		width="50%"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
        :maskClosable="false"
	>
        <a-card :bordered="false">
            <a-table :dataSource="dataSource" :columns="columns" :pagination="false" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'sys'">
                       <span v-if="record.sys ==1">
                            <a-row>
                                <a-col :span="8">
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
                        <a-checkbox-group v-model:value="checkValue" @change="checkboxMonitor($event)">
                            <a-row>
                                <a-col :span="8">
                                     <a-checkbox :value="item.id" v-for="(item,index) in newarray" :key="index">{{item.name}}</a-checkbox>
                                </a-col>
                            </a-row>
                        </a-checkbox-group>
                        </span>
                       <span v-else>
                        <!-- <a-radio-group v-model:value="monitorValue" @change="radioMonitor($event)">
                            <a-radio :value="1">开启</a-radio>
                            <a-radio :value="2">关闭</a-radio>
                        </a-radio-group> -->
                       </span>
                    </template>
                </template>
            </a-table>
        </a-card>
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
		</template>
    </a-drawer>
</template>
<script setup name="MonitorSetInfo">
import indexApi from '@/api/python/indexApi'
import { message, Empty } from 'ant-design-vue'
const emit = defineEmits({ successful: null })
    // 默认是关闭状态\
    const monitorValue = ref(0)
    const indeterminate = ref(false)
    const checkValue = ref([])
    let loading = ref(false)
    let visible = $ref(false)
    const formData = ref({
        name:''
    })
    const submitLoading = ref(false)
    const formRef = ref()
    const columns = [
		{
			title: '主机名称',
			dataIndex: 'name',
			width: 150
		},
		{
			title: '类别',
			dataIndex: 'sys' 
		} 
	]
    const dataSource = ref([])
    const newarray = ref([])
    const onOpen = (record)=>{
        visible = true
        if (record) {
            formData.value = Object.assign({}, record)
            formData.value.ids = []
        }
        indexApi.paramsList().then((res) => {
            if(res.hostTag.length > 0){
                res.hostTag.forEach(itemVue => {
                    newarray.value.push({name:itemVue.name,id:itemVue.id})
                });
            }
            dataSource.value = [
                {
                    name:formData.value.host,
                    sys:1
                },
                // {
                //     name:'短信警告',
                //     sys:2
                // }
            ]
            
        })
        indexApi.hostTypeId({hostId:record.hostId}).then((res)=>{
            console.log(res.hostTagIds)
            checkValue.value = res.hostTagIds ? res.hostTagIds:[]
            if(res.hostTagIds.length > 0){
                indeterminate.value = true
            }else{
                indeterminate.value = false
            }
        })
    }
    // 关闭抽屉
	const onClose = () => {
        //formRef.value.resetFields()
        indeterminate.value = false
        checkValue.value = []
        newarray.value = []
        monitorValue.value = 1
        submitLoading.value = false
        visible = false
	}
    const checkboxMonitor = (e)=>{
        formData.value.ids = e
        if(e.length > 0){
            indeterminate.value = true
        }else{
            indeterminate.value = false
        }
    }
    const radioMonitor = (e) =>{
        monitorValue.value = e.target.value
        
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
    const onSubmit = ()=>{
        if(checkValue.value.length === 0){
            message.error('请选择主机类别')
            return false
        }
        var params = {
            hostId:formData.value.hostId,
            hostType:checkValue.value.join(',')
        }
        console.log(params)
        submitLoading.value = true
        indexApi
            .hostTypeSet(params)
            .then(() => {
                onClose()
                emit('successful')
            })
            .finally(() => {
                submitLoading.value = false
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