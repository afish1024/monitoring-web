
import { baseRequest } from '@/utils/requestpython'
const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
/**
 * python接口数据
 *
 * @author fish
 * @date 2023-09-6 
 */
export default {
    business(data){
        return request('business', data,'post')
    },
    hostsinfo(data){
        return request('hostsinfo', data,'post')
    }
}