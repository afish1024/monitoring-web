<template>
    <table >
        <tr>
            <td width="15%">人员姓名</td>
            <td width="20%">IP地址</td>
            <td width="15%">浏览器</td>
            <td width="30%">系统</td>
            <td width="20%">时间</td>
        </tr>
       
        <tr v-for="(item,index) in logData" :key="index">
            <td>{{ item.opUser }}</td>
            <td>{{ item.opIp }}</td>
            <td>{{ item.opBrowser }}</td>
            <td>{{ item.opOs }}</td>
            <td>{{ item.opTime }}</td>
        </tr>

    </table>
</template>
<script setup name="loginuser">
	import { onMounted,ref } from 'vue'
	const props = defineProps({
		logData:Array,
	})
</script>

<style scoped>
table{
    width: 100%;
    margin-top: 10px;
}
table td{
    border: 1px solid #F0F0F2;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis;
    text-align: center;
    height: 10px;
}
</style>