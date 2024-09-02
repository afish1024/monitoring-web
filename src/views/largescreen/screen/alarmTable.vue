<template>
    <div class="scrollbar alarmtable">
        <!-- <dv-scroll-board :config="config" /> -->
        <table>
            <thead>
                <tr>
                    <th>图标</th>
                    <th>监控名称</th>
                    <th>监控接口数量</th>
                    <th>报警数量</th>
                    <th>CPU</th>
                    <th>磁盘</th>
                    <th>内存</th>
                    <th>网络</th>
                </tr>
            </thead>
            <tbody>
                
                <tr v-for="(item, index) in smsTemplateList" :key="index">
                    <td style="color: #ffff21;">
                        <component :is="item.icon" />
                    </td>
                    <td>
                        <router-link :to="`/businessmonitoring?type=${item.type}`" target="_blank" style="color: #00a904;">{{item.name}}</router-link>
                        
                    </td>
                    <td style="color: #00a904;">{{item.api_count}}</td>
                    <td style="color: #00a904;">0</td>
                    <td style="color: #00a904;">10%</td>
                    <td style="color: #00a904;">5%</td>
                    <td style="color: #00a904;">20%</td>
                    <td style="color: #00a904;">4Mbps</td>
                </tr>
            </tbody>
            
        </table>
    </div>
</template>
<script setup>
// const iocn = 'logout-outlined'
import indexApi from '@/api/python/indexApi'
const smsTemplateList = ref([])
    indexApi.sysList({allStatus:1}).then((res)=>{
            return res
    }).then((res=>{
        // console.log(res.records)
        smsTemplateList.value = res.records
    }))
// console.log(smsTemplateList)
// const config = {
//     header: ['时间', '病害信息', '数量', '标段'],
//         data: [
//           ['2019-07-01 19:25:00', '路面危害-松散', '5', 'xxxxxxx'],
//           ['2019-07-02 17:25:00', '路面危害-路面油污清理', '13', 'xxxxxxx'],
//           ['2019-07-03 16:25:00', '交安设施-交通标志牌结构', '6', 'xxxxxxx'],
//           ['2019-07-04 15:25:00', '路基危害-防尘网', '2', 'xxxxxxx'],
//           ['2019-07-05 14:25:00', '交安设施-交通标志牌结构', '1', 'xxxxxxx'],
//           ['2019-07-06 13:25:00', '路面危害-松散', '3', 'xxxxxxx'],
//           ['2019-07-07 12:25:00', '路基危害-防尘网', '4', 'xxxxxxx'],
//           ['2019-07-08 11:25:00', '路面危害-路面油污清理', '2', 'xxxxxxx'],
//           ['2019-07-09 10:25:00', '交安设施-交通标志牌结构', '5', 'xxxxxxx'],
//           ['2019-07-10 09:25:00', '路基危害-防尘网', '3', 'xxxxxxx']
//         ],
//         index: true,
//         columnWidth: [50, 170, 300],
//         align: ['center'],
//         rowNum: 7,
//         headerBGC: '#112255',
//         headerHeight: 45,
//         oddRowBGC: 'rgba(0, 44, 81, 0.8)',
//         evenRowBGC: '#112255'
// }
</script>
<style lang="less" scoped>
table {
    width: 100%;
    text-align: left;
    thead{
        tr{
            background: #112255;
            opacity: 0.8;
            height: 31px;
        }
    }
    tbody{
        
        tr:nth-child(odd) { 
            //background-color: #000;  //奇数行，浅灰色
            opacity: 0.8;
            height: 31px;
        }
        tr:nth-child(even) { 
            background-color: #112255;  //偶数行，白色
            height: 31px;
        }
    }
}
.alarmtable{
        padding-left: 35px;
        padding-right: 35px;
        overflow-y: scroll; 
        // max-height: 240px;
        margin-top: -15px;
        height: 60%;
    }
    .scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 4px;
    }
    .scrollbar::-webkit-scrollbar-track-piece {
        background-color: transparent; //滚动槽
        -webkit-border-radius: 6px;
    }
    .scrollbar::-webkit-scrollbar-thumb:vertical {
        height: 2px;
        background-color: #efefef;
        -webkit-border-radius: 6px;
    }
    .scrollbar::-webkit-scrollbar-thumb:horizontal {
        width: 2px;
        background-color: #efefef;
        -webkit-border-radius: 6px;
    }
    .scrollbar::-webkit-scrollbar-thumb:vertical:hover,::-webkit-scrollbar-thumb:horizontal:hover
    {
        background-color: #6a6a8c;
    }
</style>