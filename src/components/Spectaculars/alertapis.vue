<template>
    
    <div v-for="(item, index) in alertData" :key="index">
        <a-row  :gutter="1" justify="start" class="info" >
            <a-col :span="24">
                <a-row  :gutter="0" justify="start" >
                   <div>【{{ item.app_name }}】
                        <template v-if="item.order_type == 'api'"> {{ item.app_api_name }}</template>
                        <template v-if="item.order_type != 'api'">{{ item.host_name }}</template>
                        <span v-if="item.order_type == 'api'" class="infodesc">{{ item.status_message }}</span>
                        <span v-if="item.order_type != 'api'" class="infodesc">{{ item.status }}</span>
                        {{ item.create_time }}
                    </div>
                </a-row>
            </a-col>
        </a-row>
    </div>
</template>
<script setup name="alertapis">
	import { onMounted,ref } from 'vue'
	const props = defineProps({
		alertData:Array,
	})
</script>
<style lang="less" scoped>
.info{
    line-height: 40px;
    .acol{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .infodesc{
        color: #fd5436;
        overflow: hidden;
        margin-left: 3px;
        margin-right: 3px;
    }
}
</style>