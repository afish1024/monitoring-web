<template>
    <div>
        <div class="title">流量大屏</div>
        <a-row :gutter="10" justify="space-between" >
            <a-col :span="8">
                <a href="/flow/equipment" target="_blank">
                <div class="hdpis">
                    <img src="/src/assets/images/demo.png">
                    <div class="title">
                        设备级流量大屏
                    </div>
                </div>
                </a>
            </a-col>
            <a-col :span="8">
                <a href="/flow/ip" target="_blank">
                    <div class="hdpis">
                        <img src="/src/assets/images/demo.png">
                        <div class="title">
                            IP级流量大屏
                        </div>
                    </div>
                </a>
            </a-col>
            <a-col :span="8">
                <a href="/flow/network" target="_blank">
                <div class="hdpis">
                    <img src="/src/assets/images/demo.png">
                    <div class="title">
                        网络级流量大屏
                    </div>
                </div>
                </a>
            </a-col>
        </a-row>
    </div>
</template>

<style lang="less" >
.title{
    color: #56585a;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    margin-left:20px;
}
.hdpis{
    background-color: #FFF;
    height: 300px;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
    img{
        height: 240px;
        width: 100%;
        border-radius: 10px 10px 0 0;
    }
    
    
    .title{
        height: 60px;
        line-height: 60px;
        text-align: center;
    }
  
}
</style>