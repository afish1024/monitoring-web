
import { baseRequest } from '@/utils/requestpython'
const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
/**
 * python接口数据
 *
 * @author fish
 * @date 2023-07-6 
 */
export default {
    // 监控列表
    monitorlist(data) {
       return request('apilist', data,'post')
   },
   monitorTree(data){
      return request('apptree', data,'post')
   },
   alarmlog(data){
      return request('alertlist', data,'post')
   },
   largescreen(data) {
      return request('largescreen', data,'post')
   },
   historyList(data){
      return request('apihistorylist', data,'post')
   },
   messageList(data){
      return request('smslist', data,'post')
   },
   sysList(data){
      return request('applist', data,'post')
   },
   sysConfig(data){
      return request('appconfig', data,'post')
   },
   statistics(data){
      return request('statistics', data,'post')
   },
   updatedata(data){
      return request('updatedata', data,'post')
   },
   sendSms(data){
      return request('sendsms', data,'post')
   },
   alarmBigGreen(data){
      return request('alarmlist', data,'post')
   },
   hostListInfo(data){
      return request('hostlist', data,'post')
   },
   paramsList(data){
      return request('params', data,'post')
   },
   submitHostForm(data, edit = false) {
		return request(edit ? 'createhost' : 'createhost', data)
	},
   delHost(data){
      return request('delete', data,'post')
   },
   hostCorrelationMonitor(data){
      return request('hostmonitor', data,'post')
   },
   monitorObtainType(data){
      return request('obtainapptype', data,'post')
   },
   allHostList(){
      return request('allhostlist','post')
   },
   obtainHost(data){
      return request('obtainhost', data,'post')
   },
   hostSet(data){
      return request('hostset', data,'post')
   },
   healthClickList(data){
      return request('healthlist', data,'post')
   },
   hostTypeSet(data){
      return request('hosttype', data,'post')
   },
   hostTypeId(data){
      return request('tagid', data,'post')
   },
   hostLog(data){
      return request('hostsms', data,'post')
   },
   hostHistory(data){
      return request('hosthistory', data,'post')
   },
   hostStatistics(data){
      return request('hoststatistics', data,'post')
   },
   hostsTree(data){
      return request('hosts', data,'post')
   },
   hostsTemplateIds(data){
      return request('templateid', data,'post')
   },
   hostMonitorStatus(data){
      return request('monitorstatus', data,'post')
   },
   adminHealthList(data){
      return request('adminhealth', data,'post')
   },
   adminResourceList(data){
      return request('adminresource', data,'post')
   }
}