<template>
    <v-scale-screen style="background-color: rgb(16, 11, 43);" >
        <div id="pages">
            <div class="top">
                <div class="title">
                    Demo网络级流量大屏
                </div>
                <div class="dateinfo">
                    <div class="time">{{hours}}:{{minutes > 9 ? minutes :'0'+minutes}}:{{seconds > 9 ? seconds :'0'+seconds}}</div>
                    <div class="date">
                        <span>{{year}}/{{month > 9 ? month : '0'+month}}/{{day > 9 ? day :'0'+day}}</span>
                        <span>{{ weekDay }}</span>
                    </div>
                </div>
            </div>
            <a-row :gutter="20" justify="space-between" >
                <a-col :span="6" >
                    <a-row :gutter="20" justify="space-between" >
                        <a-col :span="24" >
                            <div class="item">
                                <div class="toral"></div>
                                <a-row :gutter="0" justify="start" class="titlediv">
                                    <a-col :span="1" >
                                        <div class="icon">&nbsp;</div>
                                    </a-col>
                                    <a-col :span="10" class="title">
                                        设备流入流量TOP5
                                    </a-col>
                                </a-row>

                                <equipmentflow style="height:400px;width:100%;"
                                    :innerRadius="0.74" 
                                    nameid="equipmentflowinto"
                                    :contentcolor="`#fff`"
                                    :pieStyle="`#17233d`"
                                ></equipmentflow>
                            </div>
                        </a-col>
                    </a-row>


                    <a-row :gutter="20" justify="space-between" >
                        <a-col :span="24" >
                            <div class="item">
                                <div class="toral"></div>
 
                                <a-row :gutter="0" justify="start" class="titlediv">
                                    <a-col :span="1" >
                                        <div class="icon">&nbsp;</div>
                                    </a-col>
                                    <a-col :span="10" class="title">
                                        IP流入流量TOP5{{ ipdeviceIP.length }}
                                    </a-col>
                                </a-row>

                                <ipflow style="height:400px;width:100%;"
                                    :innerRadius="0.74" 
                                    nameid="ipflowinto"
                                    :contentcolor="`#fff`"
                                    :pieStyle="`#17233d`"
                                    :names="ipdeviceIP"
                                    :datalist="iptotalFlow"
                                    v-if="ipdeviceIP.length != 0"
                                ></ipflow>


                            </div>
                        </a-col>
                    </a-row>

                  

                </a-col>
                <a-col :span="12" >
                    <div class="networkbg">
                        <img src="/src/assets/images/networkbg2.png" >
                        <div class="flow data">
                            <div class="statistics">
                                <div class="value">{{ statistics.inflow ?  statistics.inflow : 0 }}MB</div>
                                <div class="desc">当前流入流量</div>
                            </div>
                            <div class="statistics">
                                <div class="value">{{ statistics.outflow ?  statistics.outflow : 0 }}MB</div>
                                <div class="desc">当前流出流量</div>
                            </div>
                        </div>

                        <div class="rate data">
                            <div class="statistics">
                                <div class="value">{{ statistics.inflowRate ?  statistics.inflowRate : 0 }}bps</div>
                                <div class="desc">当前流入速率</div>
                            </div>
                            <div class="statistics">
                                <div class="value">{{ statistics.outflowRate ?  statistics.outflowRate : 0 }}bps</div>
                                <div class="desc">当前流出速率</div>
                            </div>
                        </div>


                    </div>
                    <a-row :gutter="20" justify="space-between" >
                        <a-col :span="24" >
                            <div class="item" style="height:290px;">
                                <div class="toral"></div>
 
                                <a-row :gutter="0" justify="start" class="titlediv">
                                    <a-col :span="1" >
                                        <div class="icon">&nbsp;</div>
                                    </a-col>
                                    <a-col :span="10" class="title">
                                        全网24小时流量趋势 
                                    </a-col>
                                </a-row>

                                <flowtrend style="height:280px;width:100%;"
                                    :innerRadius="0.74" 
                                    nameid="flowtrend"
                                    :contentcolor="`#fff`"
                                    :pieStyle="`#17233d`"
                                ></flowtrend>


                            </div>
                        </a-col>
                    </a-row>


                </a-col>
                <a-col :span="6" >

                    <a-row :gutter="20" justify="space-between" >
                        <a-col :span="24" >
                            <div class="item">
                                <div class="toral"></div>
 
                                <a-row :gutter="0" justify="start" class="titlediv">
                                    <a-col :span="1" >
                                        <div class="icon">&nbsp;</div>
                                    </a-col>
                                    <a-col :span="10" class="title">
                                        设备流出流量TOP5
                                    </a-col>
                                </a-row>

                                <equipmentflow style="height:400px;width:100%;"
                                    :innerRadius="0.74" 
                                    nameid="equipmentoutflow"
                                    :contentcolor="`#fff`"
                                    :pieStyle="`#17233d`"
                                ></equipmentflow>

                            </div>
                        </a-col>
                    </a-row>


                    <a-row :gutter="20" justify="space-between" >
                        <a-col :span="24" >
                            <div class="item">
                                <div class="toral"></div>
 
                                <a-row :gutter="0" justify="start" class="titlediv">
                                    <a-col :span="1" >
                                        <div class="icon">&nbsp;</div>
                                    </a-col>
                                    <a-col :span="10" class="title">
                                        IP流出流量TOP5
                                    </a-col>
                                </a-row>

                                <ipflow style="height:400px;width:100%;"
                                    :innerRadius="0.74" 
                                    nameid="ipoutflow"
                                    :contentcolor="`#fff`"
                                    :pieStyle="`#17233d`"
                                    :names="ipOutflowdeviceIP"
                                    :datalist="ipOutflowtotalFlow"
                                    v-if="ipOutflowdeviceIP.length != 0"
                                ></ipflow>

                            </div>
                        </a-col>
                    </a-row>


                 

                </a-col>
            </a-row>
           
              
        </div>
    </v-scale-screen>
</template>
<script setup name="integratedbigscreen">
    import { createFromIconfontCN } from '@ant-design/icons-vue';
    import VScaleScreen from 'v-scale-screen'
    const IconFont = createFromIconfontCN({
     scriptUrl: '//at.alicdn.com/t/c/font_4427041_1iq1dcw62ag.js',
    });
    import flowApi from '@/api/biz/flowApi'
    defineComponent(() => {
        IconFont
    })
    var date = new Date();
    const year = date.getFullYear();  //获取年份
    const month = date.getMonth() + 1   //获取月份
    const day = date.getDate();  //获取日期
    const hours = date.getHours();  //获取小时
    const minutes = date.getMinutes();  //获取分钟
    const seconds = date.getSeconds()//获取秒
    const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let today = new Date();
    let weekday = today.getDay();
    const weekDay = days[weekday];
    let ipdeviceIP = ref([])
    let iptotalFlow = ref([])
    let ipOutflowdeviceIP = ref([])
    let ipOutflowtotalFlow = ref([])
    const statistics = ref([])
    let getipInflowFlow= () => {
        return flowApi.inflowTop().then((data) => {
            ipdeviceIP.value = data.deviceIP;
            iptotalFlow.value = data.totalFlow;
          
          
        })
    }

    let getipOutflowFlow= () => {
        return flowApi.outflowTop().then((data) => {
            console.log('77777777777777')
            console.log(data)
            ipOutflowdeviceIP.value = data.deviceIP;
            ipOutflowtotalFlow.value = data.totalFlow;
            console.log(ipdeviceIP.value)
            console.log(iptotalFlow.value)
            console.log('77777777777777')
        })
    }

    
    let gettotalStatistics= () => {
        return flowApi.totalStatistics().then((data) => {
            statistics.value = data
        })
    }

    

    onMounted(() => {
        getipInflowFlow(); // ip流入流量
        getipOutflowFlow();//ip流出流量
        gettotalStatistics();//统计
    })


</script>
<style lang="less" scoped>
#pages {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-size: cover !important;
    .myifame{
        border:medium none;
        width: 100%;
        height: 500px;
    }
    .top{
        width: 100%; 
        height: 80px;
        filter: hue-rotate(0deg); 
        background: url('../../assets/images/preview.webp') center center / 100% 100% no-repeat;
        .title{
            font-family: PangMenZhengDao;
            justify-content: center;
            color: rgb(255, 255, 255);
            font-size: 35px;
            letter-spacing: 4px;
            display: flex;
            align-items: center;
            padding-right: 20px;
            padding-top: 3px;
            filter: drop-shadow(rgba(0, 11, 27, 0.66) 1px 1px 6px) drop-shadow(rgb(95, 159, 255) 2px 1px 8px);
        }
        .dateinfo{
            color: #fff;
            display: flex;
            position: absolute;
            right: 8%;
            top:42%;
            .time{
                font-size: 18px;
            }
            .date{
                padding-left: 5px;
                span{
                    font-size: 18px;
                    padding-left: 5px;
                    // display: block;
                    //white-space: pre-wrap;
                }
            }
        }
    }

    .item{
        width: 100%;
        border: 1px solid #292c40;
        position: relative;
        height: 460px;
        margin-bottom: 20px;
        margin-top: 10px;
    }

    .item::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #1f5f6a;
        border-top: 2px solid #1f5f6a;
        content: "";
    }
    
    .item::after {
        position: absolute;
        top: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #1f5f6a;
        border-top: 2px solid #1f5f6a;
        content: "";
    }

    .toral{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
       
    }
    
    .toral::before{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #1f5f6a;
        border-bottom: 2px solid #1f5f6a;
        content: "";
    }
    .toral::after{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #02A6B5;
        border-bottom: 2px solid #02A6B5;
        content: "";
    }

    .titlediv{
        width: 90%;
        margin: 0 auto;
        height: 60px;
        line-height: 60px;
        color: #ccd0dd;
        font-size: 15px;
        font-weight: bold;
        .icon{
            background-color: #4fabad;
            border-radius: 50%;
            width:8px;
            height: 8px;
            margin-top: 25px;
        }
    }

    .networkbg{
        width: 100%;    
        height:57%;
        position: relative;
        img{
            width: 100%;
            height:100%;
        }
        .data{
            width: 700px;
            height: 300px;
            position: absolute;
            left: 18%;
            top: 10%;
            .statistics{
                width: 230px;
                height: 80px;
                float: left;
                margin-left:100px;
                box-shadow: inset 0px 0px 30px #4575a6;
                text-align: center;
                border-radius: 5px;
                .value{
                   font-size: 28px;
                   color:#4575a6;
                   height: 50px;
                   line-height: 50px;
                   font-weight: bold;
                }
                .desc{
                    color: #FFF;
                }
            }
        }
        .rate{
            left: 12%;
            top: 28%;
            width: 800px;
            .statistics{
                margin-left:140px;
                box-shadow: inset 0px 0px 40px #e07f17;
                .value{
                    color: #e07f17;
                }
            }
        }
    }
}
</style>