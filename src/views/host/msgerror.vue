<template>
    <a-modal
    v-model:visible="myTableInfo.visible"
    width="70%"
    :title="myTableInfo.title"
    :destroyOnClose="true"
    :maskClosable="false"
    :forceRender="true"
    >
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false"/>
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
		</template>
    </a-modal>
</template>
<script setup>
const myTableInfo = reactive({
    title:'异常信息',
    visible:false,

})
const dataSource = ref([])
const onClose = ()=>{
    myTableInfo.visible = false
    dataSource.value = []
}
const columns = [
    {
        title: '异常信息',
        dataIndex: 'content',
        // width:'200px',
        // ellipsis:true
    },
    // {
    //     title: '名称',
    //     dataIndex: 'contentType',
    // },
    {
        title: '分数值',
        dataIndex: 'scoreValue',
        width:'100px',
    },
    {
        title: '阈值',
        dataIndex: 'thresholdValue',
        width:'100px',
    },
]
const onOpen = (data)=>{
    myTableInfo.visible = true
    dataSource.value = data
    console.log(data)
}
defineExpose({
    onOpen
})
</script>
<style>
.ant-modal-footer{
    border-top:none !important;
}
</style>