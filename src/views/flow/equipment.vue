<template>
    <v-scale-screen style="background-color: rgb(16, 11, 43);" >
        <div id="pages">
            <div class="top">
                <div class="title">
                    设备级流量大屏
                </div>
                <div class="dateinfo">
                    <div class="time">{{hours}}:{{minutes > 9 ? minutes :'0'+minutes}}:{{seconds > 9 ? seconds :'0'+seconds}}</div>
                    <div class="date">
                        <span>{{year}}/{{month > 9 ? month : '0'+month}}/{{day > 9 ? day :'0'+day}}</span>
                        <span>{{ weekDay }}</span>
                    </div>
                </div>
            </div>
            <a-row :gutter="10" justify="space-between" >
                <a-col :span="7" >
                    <div class="items">
                        <div class="title">接口流入速率TOP5</div>
                        <div class="content">
                            <influxrate style="height: 400px;width:100%;"></influxrate>
                        </div>
                    </div>

                    <div class="items">
                        <div class="title">接口流出速率TOP5</div>
                        <div class="content">
                            
                            <outflowrate style="height: 400px;width:100%;"></outflowrate>
                        </div>
                    </div>
                </a-col>
                <a-col :span="10">
                    <div class="items" style="height: 980px;">
                        <div class="title">接口实时流量</div>
                        <div class="content">
                            <apirealtime></apirealtime>
                        </div>
                    </div>
                </a-col>

                <a-col :span="7">
                 
                    <div class="items">
                        <div class="title">接口流入使用率流量TOP5</div>
                        <div class="content">
                            <utilizationinflow style="height: 400px;width:100%;"> </utilizationinflow>
                        </div>
                    </div>
                    <div class="items">
                        <div class="title">接口流出使用率流量TOP5</div>
                        <div class="content">
                            <utilizationoutflow style="height: 400px;width:100%;"> </utilizationoutflow>
                        </div>
                    </div>
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

    .items{
        background-color: #181140;
        width: 100%;
        margin-bottom: 20px;
        opacity: 0.8;
        border-radius: 5px;
        height: 480px;
        .title{
            color: #FFF;
            height: 50px;
            padding-left: 15px;
            line-height: 50px;
            font-size: 18px;
            background: linear-gradient(to right, #2c5c8b, #181140); 
            border-bottom: 1px solid #ececec;
            opacity: 0.8;
        }
    }
}
</style>