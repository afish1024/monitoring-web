import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`${url}`, ...arg)

export default {

    // 综合健康度
    healthInfo(data) {
        return request('/biz/displayplatform/networkScreen/health', data, 'get')
    },
    alertTop(data){
        return request('/biz/displayplatform/networkScreen/top', data, 'get')
    },
    trendList(data){
        return request('/biz/displayplatform/networkScreen/trend', data, 'get')
    },
    alamLevelType(data){
        return request('/biz/displayplatform/networkScreen/level', data, 'get')
    },
    deveiceType(data){
        return request('/biz/displayplatform/networkScreen/type', data, 'get')
    },
    sevenDistribution(data){
        return request('/biz/displayplatform/networkScreen/distribution', data, 'get')
    },
    alarmPage(data){
        return request('/biz/alarm/page', data, 'get')
    },

    //综合大屏


    //综合健康度
    integratedHealth(data){

        return request('/biz/displayplatform/comprehensiveScreen/health', data, 'get')
    },

    integratedTotal(data){
        return request('/biz/displayplatform/comprehensiveScreen/total', data, 'get')
    },
    //链路状态
    linkStateTotal(data){
        return request('/biz/displayplatform/comprehensiveScreen/linkState', data, 'get')
    },
    //设备类型统计
    deceiveTypeTotal(data){
        return request('/biz/displayplatform/comprehensiveScreen/deviceType', data, 'get')
    },
    //资源类型统计
    resourceTypeTotal(data){
        return request('/biz/displayplatform/comprehensiveScreen/sourceType', data, 'get')
    },
    //一周统计
    comprehensTotal(data){
        return request('/biz/displayplatform/comprehensiveScreen/fault', data, 'get')
    },


    //top大屏
    pingInfo(data){
        return request('/biz/businessanalysis/topScreen/ping', data, 'get')
    },
    cpuInfo(data){
        return request('/biz/businessanalysis/topScreen/cpu', data, 'get')
    },
    throughputInfo(data){
        return request('/biz/businessanalysis/topScreen/throughput', data, 'get')
    },
    memoryInfo(data){
        return request('/biz/businessanalysis/topScreen/memory', data, 'get')
    },
    deceiveAlarmInfo(data){
        return request('/biz/businessanalysis/topScreen/device', data, 'get')
    },
    diskInfo(data){
        return request('/biz/businessanalysis/topScreen/disk', data, 'get')
    },

    //监控大屏
    monitoringInfo(data){
        return request('/biz/displayplatform/monitorScreen', data, 'get')
    },

    //告警大屏

    //今日告警总量
    alarmTotalInfo(data){
        return request('/biz/displayplatform/alarmScreen/level', data, 'get')
    },

    //今日七日设备告警分析
    deviceAlarmSevenInfo(data){
        return request('/biz/displayplatform/alarmScreen/device', data, 'get')
    },
    //24小时告警
    hourAlarmInfo(data){
        return request('/biz/displayplatform/alarmScreen/trend', data, 'get')
    },
    //最新告警TOP5
    newAlarmTop(data){
        return request('/biz/displayplatform/alarmScreen/top', data, 'get')
    },
    //进7日资源告警
    resourceSevenInfo(data){
        return request('/biz/displayplatform/alarmScreen/resource', data, 'get')
    },
    //最新告警状态分析
    newAlarmTypeInfo(data){
        return request('/biz/displayplatform/alarmScreen/status', data, 'get')
    },
    //任务状态分析
    taskStatusInfo(data){
        return request('/biz/displayplatform/alarmScreen/taskStatus', data, 'get')
    }
}