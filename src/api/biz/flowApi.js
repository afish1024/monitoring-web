/**
 *  Copyright [2022] [https://www.xiaonuo.vip]
 *	Snowy采用APACHE LICENSE 2.0开源协议，您在使用过程中，需要注意以下几点：
 *	1.请不要删除和修改根目录下的LICENSE文件。
 *	2.请不要删除和修改Snowy源码头部的版权声明。
 *	3.本项目代码可免费商业使用，商业使用请保留源码和相关描述文件的项目出处，作者声明等。
 *	4.分发源码时候，请注明软件出处 https://www.xiaonuo.vip
 *	5.不可二次分发开源参与同类竞品，如有想法可联系团队xiaonuobase@qq.com商议合作。
 *	6.若您的项目无法满足以上几点，需要更多功能代码，获取Snowy商业授权许可，请在官网购买授权，地址为 https://www.xiaonuo.vip
 */
 import { baseRequest } from '@/utils/request'

 const request = (url, ...arg) => baseRequest(`/biz/flow/${url}`, ...arg)

 export default {
   
   totalStatistics(data) {  // 总计数据统计
      return request('totalStatistics', data)
   },
   analysis(data) {  // 设备流量分析
      return request('analysis', data,'get')
   },
   rateTop(data) {  // 设备速率top5
      return request('rateTop', data,'get')
   },
   ipTop(data) {  // IP流量top5
      return request('top', data,'get')
   },

   influxRate(data) {  // 流入速率top5
      return request('device/interfaceInflowRatesTop', data,'get')
   },
   outflowRate(data) {  // 流出速率top5
      return request('device/interfaceOutflowRateTop', data,'get')
   },

   inflowRate(data) {  // 流入使用率top5
      return request('device/interfaceOutflowUsageRatesTop', data,'get')
   },
   outflowUtilizationRate(data) {  // 流出使用率top5
      return request('device/interfaceInflowUsageRatesTop', data,'get')
   },
   bytesInsight(data) {  // 接口实时流量
      return request('device/portRealtimeFlow', data,'get')
   },

   flowTrend(data) {  // 24小时流量趋势
      return request('ip/flowTrend', data,'get')
   },

   networkFlowTrend(data) {  // 24小时流量趋势
      return request('network/flowTrend', data,'get')
   },

   
   inflowTop(data) {  //IP流入流量TOP5
      return request('network/inflowTop', data,'get')
   },

   outflowTop(data) {  //IP流出流量TOP5
      return request('network/outflowTop', data,'get')
   },

   totalStatistics(data) {  //获取总计数据统计
      return request('network/totalStatistics', data)
   },

   
 }
 