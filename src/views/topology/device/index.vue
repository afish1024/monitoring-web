<template>
    <a-row>
		<a-col :span="5">
            <deviceTree @tableRefresh="tableRefresh" ref="treeRef"></deviceTree>
        </a-col>
        <a-col :span="19">
            <a-card :bordered="false" style="margin-bottom: 10px">
                <a-form ref="searchFormRef" class="ant-advanced-search-form" :model="searchFormState">
                    <a-row :gutter="24">
						<a-col :span="8">
							<a-form-item name="keywords" label="设备名称">
								<a-input v-model:value="searchFormState.keywords" placeholder="请输入设备名称" allow-clear></a-input>
							</a-form-item>
						</a-col>
                        <a-col :span="8">
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
            
        </a-col>
    </a-row>
</template>
<script setup name="deviceList">
import deviceTree from '@/components/DeviceTreeList/deviceTreeList.vue'
let searchFormState = reactive({
    keywords:"",
    groupId:null,
    templateId:null,
})
const tableRefresh = (data)=>{
    
}
</script>
<style lang="less" scoped>
.snowy-buttom-left{
    margin-left: 10px;
}

</style>