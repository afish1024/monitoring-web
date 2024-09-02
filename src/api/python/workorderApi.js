
import { baseRequest } from '@/utils/requestpython'
const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
 /**
  * 工单接口api
  *
  * @author fish
  * @date 2023-10-25 
  */
 export default {
     // 获取工单分页
     workorderPage(data) {
        return request('workorders', data, 'post')
     },
     
 }
 