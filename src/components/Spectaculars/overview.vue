<template>
      <a-row :gutter="10">
            <a-col :span="4">
                <div class="item green" :class="{'saffron':summary.system_error_count > 0}">
                    <div class="title">
                        监控系统
                    </div>
                    <div class="bottom">
                        <a-row :gutter="0" justify="center">
                            <a-col :span="6">
                                <fund-projection-screen-outlined  :style="{fontSize:'40px',color:'#FFF'}"/>
                            </a-col>
                        </a-row>
                        <a-row :gutter="0" justify="center">
                            <a-col :span="24">
                                <div class="number">
                                    系统异常数/系统总数 
                                    <p><span class="error">{{ summary.system_error_count ?  summary.system_error_count : 0}}</span>/<span class="normal">{{ summary.system_count ?  summary.system_count : 0}}</span></p>                        
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-col>
            <a-col :span="4">
                <div class="item green" :class="{'orangeRed':summary.api_error_count > 0}">
                    <div class="title">
                        监测节点
                    </div>
                    <div class="bottom">
                        <a-row :gutter="0" justify="center">
                            <a-col :span="5">
                                <alert-outlined  :style="{fontSize:'40px',color:'#FFF'}"/>
                            </a-col>
                        </a-row>
                        <a-row :gutter="0" justify="center">
                            <a-col :span="24">
                                <div class="number">
                                    节点异常数/节点总数
                                    <p><span class="error">{{ summary.api_error_count ?  summary.api_error_count : 0}} </span>/<span class="normal">{{ summary.api_count ?  summary.api_count : 0}}</span></p></div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-col>
            <a-col :span="4">
                <div class="item green" :class="{'orangeRed1':summary.hosts_error_count > 0}">
                    <div class="title">
                        资源
                    </div>
                    <div class="bottom">
                      
                        <a-row :gutter="0" justify="center">
                            <a-col :span="5">
                                <bg-colors-outlined  :style="{fontSize:'40px',color:'#FFF'}"/>
                            </a-col>
                           
                        </a-row>
                        <a-row :gutter="0" justify="center">
                            <a-col :span="24">
                                <div class="number">
                                    资源异常数/资源总数 
                                    <p><span class="error">{{ summary.hosts_error_count ?  summary.hosts_error_count : 0}} </span>/<span class="normal">{{ summary.hosts_count ?  summary.hosts_count : 0}}</span></p></div>
                            </a-col>
                        </a-row>

                    </div>
                </div>
            </a-col>
            <a-col :span="4">
                <div  class="item green" :class="{'orangeRed2':summary.network_error_count > 0}">
                    <div class="title">
                        网络
                    </div>
                    <div class="bottom">
                        <a-row :gutter="0" justify="center">
                            <a-col :span="6">
                                <global-outlined :style="{fontSize:'40px',color:'#FFF'}"/>
                            </a-col>
                           
                        </a-row>
                        <a-row :gutter="0" justify="center">
                            <a-col :span="24">
                                
                                <div class="number">
                                    网络异常数/网络总数 
                                    <p><span class="error">{{ summary.network_error_count ?  summary.network_error_count : 0}} </span>/<span class="normal">{{ summary.network_count ?  summary.network_count : 0}}</span></p></div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-col>
            <a-col :span="4">
                <div  class="item green" :class="{'saffron':summary.db_error_count > 0}">
                    <div class="title">
                        数据库
                    </div>
                    <div class="bottom">

                        <a-row :gutter="16" justify="center" >
                            <a-col :span="6">
                                <console-sql-outlined :style="{fontSize:'40px',color:'#FFF'}"/>
                            </a-col>
                            
                        </a-row>
                        <a-row :gutter="16" justify="center">
                            <a-col :span="24">
                                 <div class="number">
                                    数据库异常数/数据库总数 
                                    <p><span class="error">{{ summary.db_error_count ?  summary.db_error_count : 0}} </span>/<span class="normal">{{ summary.db_count ?  summary.db_count : 0}}</span></p></div>
                            </a-col>
                           
                        </a-row>

                    </div>
                </div>
            </a-col>
            <a-col :span="4">
                <div class="item">
                    <div class="title">
                        docker容器
                    </div>
                    <div class="bottom">
                        <a-row :gutter="16" justify="center">
                            <a-col :span="6">
                                <img :src="dolphinIcon" />
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" justify="center">
                            <a-col :span="24">
                                <div class="number">0</div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-col>
           
        </a-row>
</template>

<script setup name="overview">
	import { onMounted,ref } from 'vue'
    import dolphinIcon from '@/assets/images/dolphin.svg'
	const props = defineProps({
		summary:Array,
	})	
</script>