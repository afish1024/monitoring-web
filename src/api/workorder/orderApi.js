import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
/**
 * 工单
 *
 * 
 * @date 2022-09-22 22:33:20
 */
export default {

    submitTemplateForm(data, edit = false) {
		return request(edit ? '/biz/template/add' : '/biz/template/edit', data)
	},
    templateList(data){
        return request('/biz/template/page', data,'get')
    },
    delTemplate(data){
        return request('/biz/template/delete', data,'post')
    },
    statusList(data){
        return request('/biz/status/page', data,'get')
    },
    submitStatusForm(data, edit = false){
        return request(edit ? '/biz/status/add' : '/biz/status/edit', data)
    },
    delStatus(data){
        return request('/biz/status/delete', data,'post')
    },
    workOrderList(data){
        return request('/biz/worder/base/page', data,'get')
    },
    submitOrderForm(data, edit = false){
        return request(edit ? '/biz/worder/base/add' : '/biz/worder/base/edit', data)
    },
    workSlaList(data){
        return request('/biz/sla/page', data,'get')
    },
    
    dictListForLabel(data) {
		return request('/dev/dict/listForLabel', data, 'get')
	},
    slaPage(data){
        return request('/biz/sla/page', data, 'get')
    },
    //工单预览
    workOrderPreview(data){
        return request('/biz/worder/homepage/totalStatistics', data,'get')
    },
    workPriority(data){
        return request('/biz/asset/homepage/workPriorityStatistics', data,'get')
    },
    workProcessingInfo(data){
        return request('/biz/asset/homepage/workProcessingTimeStatistics', data,'get')
    },
    workResponseInfo(data){
        return request('/biz/asset/homepage/workResponseTimeStatistics', data,'get')
    },


    //工单配置
    submitFiledForm(data, edit = false){
        return request(edit ? '/biz/worder/templatefield/add' : '/biz/worder/templatefield/edit', data)
    },
    delField(data){
        return request('/biz/worder/templatefield/delete', data,'post')
    },
    getTemplateField(data){
        return request('/biz/templatefield/list', data,'get')
    }
}