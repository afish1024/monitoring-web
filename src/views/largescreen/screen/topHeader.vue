<template>
    <div id="top-header">
      <!-- <dv-decoration-8 class="header-left-decoration" />
      <dv-decoration-5 class="header-center-decoration" />
      <dv-decoration-8 class="header-right-decoration" :reverse="true" /> -->
       <div class="center-title">
            <div class="imgdiv"><img src="/img/logo.png"/></div>
            <div class="title">{{ paramName }}</div>
        </div>
        <div class="dateinfo">
            <div>
                <span>{{year}}</span>
                <span style="padding-left: 5px;">年</span>
            </div>
            <div>
                <span style="padding-left: 5px;">{{month > 9 ? month :'0'+month}}</span>
                <span style="padding-left: 5px;">月</span>
            </div>
            <div>
                <span style="padding-left: 3px;">{{day > 10 ? day :'0'+day }}</span>
                <span style="padding-left: 3px;">日</span>
            </div>
            <div>
                <span style="color: #bdbd03;padding-left: 5px;">{{ weekDay }}</span>
            </div>
            <div>
                <span style="color: #007710;line-height: 1.5rem;padding-left: 5px;">{{hours}}:{{minutes > 10 ? minutes :'0'+minutes}}</span>
            </div>
            
        </div>
       
    </div>

</template>
<script setup name="topHeaders">
    var date = new Date();
    const year = date.getFullYear();  //获取年份
    const month = date.getMonth() + 1   //获取月份
    const day = date.getDate();  //获取日期
    const hours = date.getHours();  //获取小时
    const minutes = date.getMinutes();  //获取分钟



    const props = defineProps({
		paramName:String,
	})

    const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let today = new Date();
    let weekday = today.getDay();
    const weekDay = days[weekday];

</script> 
<style lang="less">
  #top-header {
    position: relative;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    .center-title {
      display: flex;
      position: absolute;
      font-size: 22px;
      font-weight: bold;
      left: 5%;
      top: 15px;
      transform: translateX(-10%);
       .imgdiv{
            width:75px;
            height:55px;
            img {
                width:100%;
                height:100%;
            }
       }
       .title{
            margin-left: 15px;
            margin-top: 25px;
       }
    }
    .dateinfo{
        display: flex;
        margin-top: 0.7rem;
        height: 3rem;
        font-size: 16px;
        position: absolute;
        right:0px;
        
    }
    .dateinfo1{
        display: flex;
        margin-top: 0.4rem;
        height: 3rem;
        font-size: 18px;
        position: absolute;
        right: 15px;
        .circle{
            width: 35px;
            height:20px;
            padding-left: 15px;
            img{
                width:100%;
                height:100%;
            }
        }
    }
    
  }
  </style>