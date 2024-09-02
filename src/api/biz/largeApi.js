
 import { baseRequest } from '@/utils/request'
 const request = (url, ...arg) => baseRequest(`/biz/databoard/${url}`, ...arg)
 /**
  * 看板数据
  *
  * @author fish
  * @date 2023-06-24 22:33:20
  */
 export default {
     // 获取大屏数据
    databoardPost(data) {
        return request('info', data,'post')
    },
   
 }
 