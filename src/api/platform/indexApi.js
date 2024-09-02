
import { baseRequest } from '@/utils/request'
const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
/**
 * python接口数据
 *
 * @author fish
 * @date 2023-07-6 
 */
export default {
    // 业务总数
    businessAnalysis(data) {
        return request('/biz/displayplatform/businessAnalysis/totalData', data,'get')
    },
    // 业务健康度
    businessAnalysisHealth(data = {}){
        return request('/biz/displayplatform/businessAnalysis/health', data,'get')
    },
    // CPU使用率TOP5
    businessAnalysisCpu(data = {}){
        return request('/biz/displayplatform/businessAnalysis/cpu', data,'get')
    },
    //业务优先级统计
    businessAnalysisPriority(data = {}){
        return request('/biz/displayplatform/businessAnalysis/priority', data,'get')
    },
    //业务类型统计
    businessAnalysisType(data = {}){
        return request('/biz/displayplatform/businessAnalysis/type', data,'get')
    },
     //业务告警统计
     businessAnalysisLevel(data = {}){
        return request('/biz/displayplatform/businessAnalysis/level', data,'get')
     }

}