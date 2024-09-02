<template>
   <a-row :gutter="16" class="systemoverview" justify="space-around">
            <a-col :span="5">
                <div class="item blue">
                    <div class="title">
                        监控系统
                    </div>
                    <div class="bottom">
                        <a-row :gutter="16" justify="end">
                            <a-col :span="12">
                                <windows-filled :style="{fontSize:'50px',color:'#FFF'}"/>
                            </a-col>
                            <a-col :span="12">
                                <div class="number">{{ summary.system_count ?  summary.system_count : 0}}</div>
                            </a-col>
                        </a-row>

                    </div>
                </div>
            </a-col>
            <a-col :span="5">
                <div class="item green">
                    <div class="title">
                        监控接口
                    </div>
                    <div class="bottom">

                        <a-row :gutter="16" justify="end">
                            <a-col :span="12">
                                <link-outlined :style="{fontSize:'50px',color:'#FFF'}"/>
                            </a-col>
                            <a-col :span="12">
                                <div class="number">{{ summary.api_goods_count ?  summary.api_goods_count : 0}}</div>
                            </a-col>
                        </a-row>


                    </div>
                </div>
            </a-col>
            <a-col :span="5">
                <div class="item orange">
                    <div class="title">
                        异常系统
                    </div>
                    <div class="bottom">
                       
                        <a-row :gutter="16" justify="end">
                            <a-col :span="12">
                                <windows-filled :style="{fontSize:'50px',color:'#FFF'}"/>
                            </a-col>
                            <a-col :span="12">
                                <div class="number">{{ summary.system_error_count ?  summary.system_error_count : 0}}</div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-col>
            <a-col :span="5">
                <div class="item saffron">
                    <div class="title">
                        异常接口
                    </div>
                    <div class="bottom">
                        <a-row :gutter="16" justify="end">
                            <a-col :span="12">
                                <alert-outlined  :style="{fontSize:'50px',color:'#FFF'}"/>
                            </a-col>
                            <a-col :span="12">
                                <div class="number">{{ summary.api_error_count ?  summary.api_error_count : 0}}</div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-col>
        </a-row>
    
</template>

<script setup name="systemoverview">
	
	import { onMounted,ref } from 'vue'
	const props = defineProps({
		summary:Array,
	})

	
	
</script>
<style lang="less" >
.systemoverview{
	height: 180px;
	margin-top: 20px;
	.item{
       color: #FFF;
       height: 120px;
       .title{
            text-align: center;
            font-size: 18px;
            font-weight: 500;
            height: 40px;
            line-height: 40px;
            width: 100%;
            margin-bottom: 10px;
       }
       .bottom{
            height: 60px;
            width: 80%;
            margin: 0 auto;
            .number{
                font-size: 20px;
                font-weight: 500;
                text-align: center;
            }
       }
    }
	.saffron{
        background-color: #ff6b48;
    }
    .green{
        background-color: #29cfb2;
    }
    .orange{
        background-color: #ec974e;
    }
    .blue{
        background-color: #2694fd;
    }

}
</style>