import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`${url}`, ...arg)

/**
 * 首页
 *
 * 
 * @date 2024-01-16
 */
export default {
    //首页总数统计
    totalHomeStatistics(data){
        return request('/biz/homepage/totalStatistics', data, 'post')
    },
    //首页网络统计
    networkHomeStatistics(data){
        return request('/biz/homepage/networkStatistics', data, 'post')
    },
    //首页告警统计
    alarmHomeStatistics(data){
        return request('/biz/homepage/alarmStatistics', data, 'post')
    },
    //首页性能统计
    performanceHomeStatistics(data){
        return request('/biz/homepage/performanceStatistics', data, 'post')
    }
}