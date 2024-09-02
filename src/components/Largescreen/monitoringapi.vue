<template>
   
    <a-row :gutter="0" justify="space-between" class="item">
        <a-col :span="16">
            系统名称
        </a-col>
        <a-col :span="6">
            接口数
        </a-col>
    </a-row>

</template>

<script setup name="monitoringapi">
	import { onMounted,ref } from 'vue'
	
	
</script>
<style lang="less" >
.item{
    height: 20px;
    margin:15px 0px;
}
</style>