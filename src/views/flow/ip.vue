<template>
    <v-scale-screen style="background-color: rgb(16, 11, 43);" >
        <div id="pages">
            <div class="top">
                <div class="title">
                    IP级流量大屏
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
                <a-col :span="10" >
                    <div class="item-title">
                        <div class="title">应用流入流出流量TOP5 </div>
                        <div class="border"><div class="borderred">&nbsp;</div></div>
                    </div>
                    <a-row :gutter="10" justify="space-between" >
                        <a-col :span="12" >
                            <div class="icon">
                                <div  class="title blue">流入流量</div>
                                <img src="/src/assets/images/blue-icon.png">
                            </div>
                            <div class="lists">
                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value blue">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#24acc3" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>

                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value blue">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#24acc3" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>

                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value blue">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#24acc3" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>

                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value blue">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#24acc3" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>

                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value blue">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#24acc3" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="12" >
                            <div class="icon">
                                <div class="title green">流出流量</div>
                                <img src="/src/assets/images/green-icon.png">
                            </div>
                            <div class="lists">
                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value green">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#0cc2a5" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>

                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value green">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#0cc2a5" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>

                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value green">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#0cc2a5" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>

                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value green">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#0cc2a5" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>

                                <div class="line">
                                      
                                    <a-row :gutter="10" justify="space-between" >
                                        <a-col :span="10" >
                                            <div class="ip">192.168.87.5</div>
                                        </a-col>
                                        <a-col :span="6" >
                                            <div class="value green">0.13<span class="unit">MB</span></div>
                                        </a-col>
                                    </a-row>
                                    <a-progress percent="20"  :width="120" stroke-color="#0cc2a5" >
                                        <template #format="percent">
                                            <span>20%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>    
                            </div>
                        </a-col>
                    </a-row>

                </a-col>
                <a-col :span="14" >
                   
                    <a-row :gutter="10" justify="space-between" >
                        <a-col :span="24" >
                            <div class="item-title">
                                <div class="title">24小时流量趋势 </div>
                                <div class="border"><div class="borderred">&nbsp;</div></div>
                            </div>
                            <hourstrend  style="height:650px;width:100%;"></hourstrend>
                           
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

    .item-title{
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        .border{
            height: 2px;
            background-color: #2c3460;
            border-radius: 15px;
            .borderred{
                width: 50px;
                height: 3px;
                background-color: #07b096;
                margin-left: 15px;
                border-radius: 15px;

            }
        }
    }
    .icon{
        width: 100%;
        margin-bottom: 30px;
        margin-top: 30px;
        .title{
            text-align: center;
        }
        .green{
           
            color: #07b096;
        }
        .blue{
            color: #1ac7e6;
        }
        img{
            width: 100px;
            margin: 0 auto;
            display: block; /* 将图片转为块元素 */
    
        }
    }

    .lists{
        .line{
            color: #bebebe;
            font-size: 18px;
            margin-bottom: 20px;
            .unit{
                font-size: 12px;
                color: #5a5a5a;
                margin-left: 5px;
            }
            .blue{
                color: #1ac7e6;
                font-size: 20px;
                font-weight: bold;
            }
            .green{
                color: #07b096;
                font-size: 20px;
                font-weight: bold;
            }
        }
    }


}
</style>