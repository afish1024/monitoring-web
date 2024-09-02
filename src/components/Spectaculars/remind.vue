<template>
        <a-modal
            v-model:visible="remindvisibleRemind"
            :ok-button-props="{ props: { disabled: true } }"
            :cancel-button-props="{ props: { disabled: true } }"
            :closable="true"
            :footer="null"
            width="100%"
            :maskStyle="{'opacity':'0.2'}"
            :destroyOnClose="false"
            :maskClosable="false"
            @cancel="cancelModal"
            :mask="false"
            wrap-class-name="full-modal"
        >
            <template #title>
                <div style="cursor: pointer;" @click="clickTtile">工单消息</div>
            </template>
           
            <a-row :gutter="1" justify="start" class="info">
                <a-col :span="24"  style="background-color: #FFF;">
                    <a-row :gutter="1" justify="start"  v-for="(item, index) in alertList" :key="index" @click="statusUpdate(item,index)">
                        <div>{{ index+1 }}、【{{ item.app_name }} 】
                            <template v-if="item.order_type == 'api'"> {{ item.app_api_name }}</template>
                            <template v-if="item.order_type != 'api'">{{ item.host_name }}</template>
                            <span v-if="item.order_type=='api'" class="infodesc">{{ item.status_message }}</span>
                            <span v-if="item.order_type != 'api'" class="infodesc">{{ item.status }}</span>
                            <span> {{ item.confirm_status_name }}</span> 
                        </div>
                    </a-row>
                </a-col>
            </a-row>

            <audio controls="controls" hidden  ref="audio" muted>
                <source src="/static/alarm.mp3" type="audio/mpeg">
            </audio>
        </a-modal>
        <a-modal
            :title="generateTitle"
            v-model:visible="generateVisible"
            @cancel="generateVisible = false"
            @ok="statusAffirm"
            :okButtonProps="{
                disabled: disabledValue
            }"
        >
            <div>系统：{{ generateContent.app_name }}</div>
            <div v-if="generateContent.order_type != 'api'">主机：{{ generateContent.host_name }}</div>
            <div v-if="generateContent.order_type == 'api'">接口：{{ generateContent.app_api_name }}</div>
            <div v-if="generateContent.order_type == 'api'">异常状态：{{ generateContent.status_message }}</div>
            <div v-if="generateContent.order_type != 'api'">异常状态：{{ generateContent.status }}</div>
            <div>异常信息：{{ generateContent.msg }}</div>
            <div>创建时间：{{ generateContent.create_time }}</div>
	</a-modal>
</template>
<script setup  name="remind" >
	import { onMounted,ref,onUnmounted } from 'vue'
    import store from '@/store'
    import indexApi from '@/api/python/indexApi'
    import tool from '@/utils/tool'
    import router from '@/router/index'
    let remindvisibleRemind = ref(false)
    let alertList = ref([]) // alertList
    let timer = ref() // 定时器
    let alertIndex = ref(0)
    let alertId = ref(0)
    let disabledValue = ref(false)
    
    let okButtonProps =  {
        disabled: disabledValue.value,
    }
    
	let generateTitle = ref('请确认工单消息')
	let generateVisible = ref(false)
	let generateContent = ref([])
    const userInfo = ref(tool.data.get('USER_INFO'))
    const audio = ref()
    const startplay = () => {
        if(audio.value){
            audio.value.currentTime = 0 //从头开始播放提示音
            audio.value.muted = false
            audio.value.play() //播放 
        }
    }
    let alertData = () => {
        var parameter = {}
        parameter.isNormalUser = 1 // 普通用户
        if(userInfo.value.roleCodeList.indexOf('superAdmin') != -1){
            parameter.isNormalUser = 0 // 超管
            disabledValue.value = true
        }
        parameter.userid = userInfo.value.id

        indexApi.alarmlog(parameter).then((res) => {
            alertList.value = []
            for(let i = 0; i< res.records.length; i++) {
                 alertList.value.push(res.records[i])
            }
            if(res.isalert){
                remindvisibleRemind.value = true
                const ismute = store.state.global.ismute
          
                if(ismute){
                    startplay()
                }
            }else{
                remindvisibleRemind.value = false
            }

        })
    }
    onMounted(() => {
        setTimeout(async () => {
            alertData()
        }, 8000) // 延时8秒钟加载
    })

    timer.value = setInterval(async () => {
        alertData()
    }, 30000) // 30秒钟

    onUnmounted(() => {
        alertList.value = []
        clearInterval(timer)
    })
    
    const cancelModal = (e) => {
        clearInterval(timer)
        alertList.value = []
        remindvisibleRemind.value = false
    }
    const statusUpdate  = (item,index) => {
        if(item.is_confirm == 1){
            alertId.value = item.id
            alertIndex.value = index
            generateVisible.value = true
            generateContent.value = item
        }
        
    }
    const statusAffirm = () => {
        if(alertList.value[alertIndex.value].confirm_status_name != '已确认' ){
            indexApi.updatedata({id:alertId.value,userid:userInfo.value.id}).then((res) => {
                alertList.value[alertIndex.value].confirm_status_name = '已确认'
                generateVisible.value = false
            })
        }
    }
    const clickTtile  = () => {
        router.push({
			path : '/sys/workorder',
			query: {
            	
        	}
		})
    }

</script>

<style lang="less" >

.full-modal {
    width: 28%;
    height: 280px;
    top:unset !important;
    left:unset !important;
    position: fixed;
    top: none;
    box-shadow:-3px 5px 20px 0px rgba(0,0,0,0.5);
    bottom: 1% !important;

    .ant-modal {
        bottom:0 !important;
        right:10px;
        position:absolute !important;
        height: 100% !important;
        top: auto !important;
    }
    .ant-modal .ant-modal-header{
        background-color: #e4e0e0 !important;
    }
    .ant-modal-title {
        color:#fd544c !important;
    }
    .ant-modal-body {
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-x: hidden;
        height: 280px;
    }
}
</style>
<style lang="less" scoped>
.info{
    height: 25px;
    line-height: 25px;
    cursor: pointer;
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