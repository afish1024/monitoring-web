<template>
    <div>
        <a-row :gutter="10" justify="space-between" >
            <a-col :span="9">
                <div class="items">
                    <div class="line-title">
						<div class="left-line"></div>
						<span class="title">
							今日告警量
						</span>
					</div>
					
					<a-row :gutter="0" justify="space-between" >
						<a-col :span="15"> 	
							<quantity style="height: 220px;"  v-on:customEvent="handleCustomEvent"/>
					   </a-col>
					   <a-col :span="1"  ><div class="vertical-line">&nbsp;</div></a-col>
						<a-col :span="8"  >
						   
						   <div class="statistics-info">
								<div class="item">
									<div class="title">今日告警总量</div>
									<div class="value">{{ quantityData.alarmCount }}</div>
								</div>
								<div class="item">
									<div class="title">今日事件总量</div>
									<div class="value">{{ quantityData.eventCount }}</div>
								</div>
						   </div>
						</a-col>
			
					   
					</a-row>
                       
                  
                </div>
            </a-col>
            <a-col :span="9">
                <div class="items">
                    <div class="line-title">
						<div class="left-line"></div>
						<span class="title">
							今日确认状态分析
						</span>
						
					</div>
					<a-row :gutter="0" justify="space-between" >
						<a-col :span="15"> 	
							<notarize style="height: 220px;"  v-on:customNotarize="handleCustomEvent2"/>
					   </a-col>
					   <a-col :span="1"  ><div class="vertical-line">&nbsp;</div></a-col>
						<a-col :span="8"  >
						   
						   <div class="statistics-info">
								<div class="item">
									<div class="title">已确认告警数</div>
									<div class="value">{{ notarizeData.confirmedCount }}</div>
								</div>
								<div class="item">
									<div class="title">未确认告警数</div>
									<div class="value">{{ notarizeData.unconfirmedCount }}</div>
								</div>
						   </div>
						</a-col>
			
					   
					</a-row>
                </div>
            </a-col>

            <a-col :span="6">
                <div class="items">
                    <div class="line-title">
						<div class="left-line"></div>
						<span class="title">
							近7天告警趋势分析
						</span>
						<trendpie style="height: 220px;width:100%;" />
					</div>
                </div>
            </a-col>
        </a-row>


        <a-row :gutter="10" justify="space-between" style="margin-top: 15px;">
            <a-col :span="18">
                <div class="items" style="height: auto;">
                    <div class="line-title list-title" >
						<div class="left-line"></div>
						<span class="title">
							实时告警列表
						</span>
						
					</div>
                    <lists style="height:auto;width:100%;margin-top:20px;" />
                </div>
            </a-col>
            <a-col :span="6">
                <a-row :gutter="10" justify="space-between" >
                    <a-col :span="24">
                        <div class="items">
                            <div class="line-title">
                                <div class="left-line"></div>
                                <span class="title">
                                    近7天告警级别分析
                                </span>
                                
                            </div>
                            <level style="height: 220px;width:100%;margin-top:20px;" />
                        </div>
                    </a-col>
                    <a-col :span="24"  style="margin-top: 15px;">
                        <div class="items">
                            <div class="line-title">
                                <div class="left-line"></div>
                                <span class="title">
                                    近7天设备售罄TOP5
                                </span>
                                
                            </div>
                            <top style="height: 220px;width:100%;" />
                        </div>
                        
                    </a-col>
        
                   
                </a-row>
            </a-col>

           
        </a-row>


    </div>
</template>

<script setup name="indexHome">
import { onMounted } from 'vue'
import VScaleScreen from 'v-scale-screen'

import quantity from '@/components/Alerts/Index/quantity.vue' 
import notarize from '@/components/Alerts/Index/notarize.vue' 
import trendpie from '@/components/Alerts/Index/trendpie.vue'  // 售罄趋势分析
import level from '@/components/Alerts/Index/level.vue' // 告警级别
import top from '@/components/Alerts/Index/top.vue' // 设备告警TOP
import lists from '@/components/Alerts/Index/lists.vue' // 实时告警列表

const quantityData = ref({})
const notarizeData = ref({})

let handleCustomEvent= (data) => {
    quantityData.value  = data;
}
let handleCustomEvent2= (data) => {
    notarizeData.value  = data;
}

</script>
<style lang="less" >
.items{
    background-color: #FFF;
    height: 260px;
    width: 100%;
    .line-title{
        width: 90%;
        height: 25px;
        padding-top: 20px;
        margin-left: 5%;
        .left-line{
            height: 25px;
            width: 4px;
            background-color: #0069d2;
            float: left;
            border-radius: 15px;
        }
        .title{
            line-height: 25px;
            margin-left: 10px;
            font-weight: 550;
            font-size: 14px;
            cursor: pointer;
            margin-right: 30px;
        }
    }
    .list-title{
        margin-left: 2.3% !important;
    }
	.vertical-line{
		height: 200px;
		background-color: #ececec;
		width: 1px;
	}
	.statistics-info{
		margin-top: 50px;
		.item{
			margin-bottom: 20px;
			.title{
				color: #ccc;
				font-size: 16px;
			}
			.value{
				font-size: 18px;
			}
		}
	}
    .lists-level{
        color: #FFF;
        text-align: center;
        padding: 5px 0px;
        border-radius: 15px;
        width: 60px;
    }
    .bg-yellow{
        background-color: #f4cc61;
    }
    .bg-orage{
        background-color: #fd945f;
    }
    .bg-red{
        background-color: #f56372;
    }
    .bg-error{
        background-color: red;
    }
    .bg-unknown{
        background-color: #ececec;
    }
}
</style>