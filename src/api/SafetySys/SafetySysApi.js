
import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/securitytask/${url}`, ...arg)
const request1 = (url, ...arg) => baseRequest(url, ...arg)
export default {
  // 1、最近执行动态
  recentExecutionUpdatesPage(data) {
    return request('recentExecutionUpdatesPage', data, 'get')
  },
   // 2、数据概览
  dataOverview(data) {
    return request('dataOverview', data, 'get')
  } ,
  // 3、执行状态统计
  executionStatusStatistics(data) {
    return request('executionStatusStatistics', data, 'get')
  },

  // 2、基础策略列表
  securitybase (data) { return request1('/biz/securitybase/page', data, 'get') },

  // 2、基础策略列表新增
  securitybaseAdd (data) { return request1('/biz/securitybase/add', data, 'post') },

  securitybaseEdit (data) { return request1('/biz/securitybase/edit', data, 'post') },

  securitybaseDel (data) { return request1('/biz/securitybase/delete', data, 'post') },

  // 2、基础策略列表详情
  securitybaseInfo(data) {return request1('/biz/securitybase/detail', data, 'get')},

   // 1、设备类型
  listForLabel(data) {return request1('/dev/dict/listForLabel', data, 'get')},

  // 2、右键策略列表
  securityrightclick (data) { return request1('/biz/securityrightclick/page', data, 'get') },
    
    //1. 定时策略列表
  securityregular(data) {return request1('/biz/securityregular/page', data, 'get')},
    
    // 1、日志
  securitytask (data) { return request1('/biz/securitytask/page', data, 'get') },

  //添加右键策略
  securityrightclickAdd (data) { return request1('/biz/securityrightclick/add', data, 'post') },

  //编辑右键策略
  securityrightclickEdit (data) { return request1('/biz/securityrightclick/edit', data, 'post') },
  //删除右键策略
  securityrightclickDel (data) { return request1('/biz/securityrightclick/delete', data, 'post') },
  // 右键策略列表详情
  securityrightclickInfo(data) {return request1('/biz/securityrightclick/detail', data, 'get')},
  //定时策略
  securityregularAdd (data) { return request1('/biz/securityregular/add', data, 'post') },
  //编辑右键策略
  securityregularEdit (data) { return request1('/biz/securityregular/edit', data, 'post') },
   //删除右键策略
   securityregularDel (data) { return request1('/biz/securityregular/delete', data, 'post') },
  
}

