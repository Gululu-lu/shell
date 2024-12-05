import request  from "../utils/axiosUtils"
export const findAllBook=()=>{
  return  request.get('/getdata')
}
export function querybook(data){
  return request({
      url:'/querydata',
      method:'get',
      params:data//get请求发送数据
  })
  
}