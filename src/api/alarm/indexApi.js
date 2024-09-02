import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
/**
 * 拓扑图
 *
 * 
 * @date 2022-09-22 22:33:20
 */
export default {
	// 获取机构树
	planList(data) {
		return request('/biz/solution/page', data, 'get')
	},
	submitForm(data, edit = false) {
		return request(edit ? '/biz/solution/add' : '/biz/solution/edit', data)
	},
	delPlan(data){
        return request('/biz/solution/delete', data, 'post')
    },

    //事件分析
    eventNumStatistics(data){
        return request('/biz/event/eventQuantityStatistics', data,'get')
	},
    eventSourcesStatistics(data){
        return request('/biz/event/sevenDayEventSourcesStatistics', data,'get')
    },
    eventPriorityStatistics(data){
        return request('/biz/event/sevenDayEventPriorityQuantityStatistics', data,'get')
    },
    eventTypeStatistics(data){
        return request('/biz/event/sevenDayEventTypeStatistics', data,'get')
    },
    eventReceivedStatistics(data){
        return request('/biz/event/sevenDayReceivedEventTotalStatistics', data,'get')
    },
    eventDeviceStatistics(data){
        return request('/biz/event/sevenDayDeviceReceivedEventTotalTop5', data,'get')
    },
    eventEmergencyDegreeStatistics(data){
        return request('/biz/event/sevenDayEventSourceEmergencyDegreeDistribution', data,'get')
    },


    //事件管理

    //事件来源分析
    eventSourcesAnalysis(data){
        return request('/biz/event/eventSourcesAnalysis', data,'get')
    },
    //事件发生top5
    eventOccurredTop5(data){
        return request('/biz/event/eventOccurredTop5', data,'get')
    },
    //事件设备逻辑类型分析
    eventDeviceLogicType(data){
        return request('/biz/event/eventDeviceLogicTypeAnalysis', data,'get')
    },
    //事件列表
    eventList(data){
        return request('/biz/event/page', data,'get')
    },
    delEvent(data){
        return request('/biz/event/delete', data,'post')
    },
    eventSourcesInfo(data){
        return request('/biz/event/eventSource', data,'get')
    },
    eventNetworkInfo(data){
        return request('/biz/network/list', data,'get')
    },
    eventDeviceInfo(data){
        return request('/biz/device/list', data,'get')
    },

    //告警分析

    //告警级别分析
    alarmLevelAnalysis(data){
        return request('/biz/alarm/alarmLevelAnalysis', data,'get')
    },
    //告警数量top5
    alarmsTotalTop5Analysis(data){
        return request('/biz/alarm/alarmsTotalTop5', data,'get')
    },
    //资源类型告警分析
    alarmResourceTypeAlarmAnalysis(data){
        return request('/biz/alarm/resourceTypeAlarmAnalysis', data,'get')
    },
    //告警趋势分析
    alarmTrendAnalysis(data){
        return request('/biz/alarm/alarmTrendAnalysis', data,'get')
    },
    //告警类型分析
    alarmTypeAnalysis(data){
        return request('/biz/alarm/alarmTypeAnalysis', data,'get')
    },

    alramTypeListForLabel(data){
        return request('/dev/dict/listForLabel', data,'get')
    }
}