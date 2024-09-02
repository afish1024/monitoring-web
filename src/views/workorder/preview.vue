<template>
     <a-row :gutter="10">
		<a-col :span="24" style="display: flex;padding-left:3px">
            <div style="height: 100px;width: 15%;background: #fff;">
                <div style="padding: 15px;display: flex;">
                    <div>
                        <div>所有工单</div>
                        <div style="margin-top: 10px;font-weight: bold;">{{formData.totalCount}}</div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div style="height: 100px;width: 16%;background: #fff;">
                <div style="padding: 15px;display: flex;">
                    <div>
                        <div>待处理工单</div>
                        <div style="margin-top: 10px;font-weight: bold;">{{formData.pendingCount}}</div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div style="height: 100px;width: 16%;background: #fff;">
                <div style="padding: 15px;display: flex;">
                    <div>
                        <div>处理中工单</div>
                        <div style="margin-top: 10px;font-weight: bold;">{{formData.processingCount}}</div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div style="height: 100px;width: 16%;background: #fff;">
                <div style="padding: 15px;display: flex;">
                    <div>
                        <div>已处理工单</div>
                        <div style="margin-top: 10px;font-weight: bold;">{{formData.processedCount}}</div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div style="height: 100px;width: 16%;background: #fff;">
                <div style="padding: 15px;display: flex;">
                    <div>
                        <div>已关闭工单</div>
                        <div style="margin-top: 10px;font-weight: bold;">{{formData.closedCount}}</div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div style="height: 100px;width: 17%;background: #fff;">
                <div style="padding: 15px;display: flex;">
                    <div>
                        <div>我提交的工单</div>
                        <div style="margin-top: 10px;font-weight: bold;">{{formData.mySubmittedWorkCount}}</div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div style="height: 100px;width: 17%;background: #fff;">
                <div style="padding: 15px;display: flex;">
                    <div>
                        <div>我待处理的工单</div>
                        <div style="margin-top: 10px;font-weight: bold;">{{formData.myPendingWorkCount}}</div>
                    </div>
                     
                </div>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="12" style="padding-left: 10px;padding-right: 0px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">工单优先统计</div>
            </a-card>
            <a-card :bordered="false">
                <BingZhuangTu06   
                :innerRadius="0.74" 
                style="height: 200px;"
                :colorList="formData.colorList"
                :datalist="formData.workPriorityList"
                v-if="formData.workPriorityList.length > 0"
                />
            </a-card>
        </a-col>
        <a-col :span="12">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">工单响应时长</div>
                
            </a-card>
            <a-card :bordered="false">
                <div style="margin-top: -20px;margin-left: 5px;font-size: 12px;" v-if="formData.workResponseAvg">平均响应时长：{{ formData.workResponseAvg }}</div>
                <BarWorkOrder nameid="workOrder1" style="height: 200px;" 
                :dataX="formData.workResponseX"
                :dataY="formData.workResponseY"
                v-if="formData.workResponseX.length > 0 && formData.workResponseY.length > 0"
                />
            </a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="12" style="padding-left: 10px;padding-right: 0px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">工单处理时长统计</div>
            </a-card>
            <a-card :bordered="false">
                <div style="margin-top: -20px;margin-left: 5px;font-size: 12px;" v-if="formData.workProcessingAvg">平均响应时长：{{ formData.workProcessingAvg }}</div>
                <BarWorkOrder 
                nameid="workOrder2" 
                style="height: 200px;" 
                :dataX="formData.workProcessingX"
                :dataY="formData.workProcessingY"
                v-if="formData.workProcessingX.length > 0 && formData.workProcessingY.length > 0"
                />
            </a-card>
        </a-col>
        <a-col :span="12">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">满意度统计</div>
            </a-card>
            <a-card :bordered="false">
            <RadarTu style="height: 200px;" />
            </a-card>
        </a-col>
    </a-row>
</template>
<script setup name="preview">
 import orderApi from '@/api/workorder/orderApi'

 const formData = ref({
    totalCount:0,
    pendingCount:0,
    processingCount:0,
    processedCount:0,
    closedCount:0,
    mySubmittedWorkCount:0,
    myPendingWorkCount:0,
    colorList:['#f14d68','#f58c5c','#fec540','#f8c840'],
    workPriorityList:[],
    workProcessingAvg:'',
    workProcessingX:[],
    workProcessingY:[],
    workResponseAvg:'',
    workResponseX:[],
    workResponseY:[]
 })
 onMounted(()=>{
    workOrderData()
    workPriorityData()
    workProcessingData()
    workResponseData()
 })

 //响应时长统计

const workResponseData = ()=>{
    orderApi.workResponseInfo({}).then(res=>{
        formData.value.workResponseAvg = typeof(res.avgTime) != 'undefined' ? res.avgTime :''
        if(res.list && res.list.length > 0){
            res.list.map((item)=>{
                if(item.name != ''){
                    formData.value.workResponseX.push(item.name)
                    formData.value.workResponseY.push(item.value)
                    
                }
                
            })
        }
    })
}
 //处理时长统计
 const workProcessingData = ()=>{
    orderApi.workProcessingInfo({}).then(res=>{
        formData.value.workProcessingAvg = typeof(res.avgTime) != 'undefined' ? res.avgTime :''
        if(res.list && res.list.length > 0){
            res.list.map((item)=>{
                if(item.name != ''){
                    formData.value.workProcessingX.push(item.name)
                    formData.value.workProcessingY.push(item.value)
                    
                }
                
            })
        }
        //console.log(formData.value.workProcessingY)
    })
 }
 //工单优先级
 const workPriorityData = ()=>{
    orderApi.workPriority({}).then(res=>{
        if(res.list && res.list.length > 0){
            res.list.map((item)=>{
                if(item.name != ''){
                    formData.value.workPriorityList.push({type:item.name,value:item.value})
                }
                
            })
        }
    })
 }
 const workOrderData = ()=>{
    orderApi.workOrderPreview({}).then(res=>{
        formData.value.totalCount = res.totalCount ? res.totalCount : 0
        formData.value.pendingCount = res.pendingCount ? res.pendingCount : 0
        formData.value.processingCount = res.processingCount ? res.processingCount : 0
        formData.value.processedCount = res.processedCount ? res.processedCount : 0
        formData.value.closedCount = res.closedCount ? res.closedCount : 0
        formData.value.mySubmittedWorkCount = res.mySubmittedWorkCount ? res.mySubmittedWorkCount : 0
        formData.value.myPendingWorkCount = res.myPendingWorkCount ? res.myPendingWorkCount : 0
    })
 }
</script>
<style lang="less" scoped>
.line{
    border-left:1px solid #eee;
    margin-left: 50px;
    height: 60px;
    margin-top: 5px;
}
.iconleft{
    width: 4px;
    height: 25px;
    background-color: #0069d2;
    float: left;
}
</style>