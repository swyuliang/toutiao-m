// 对于axios进行二次封装
import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios,只不过稍微配置一下
const requests = axios.create({
// 配置对象
// 基础路径，发请求的时候，路径当中会出现api
  baseURL: '/mock',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }],
  // 代表请求超时的时间5s
  timeout: 5000
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
// config:配置对象，对象里面有一个属性很重要，headers请求头
  //  config： 本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// 响应拦截器
requests.interceptors.response.use((response) => {
  // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
  return response.data
}, (error) => {
  // 响应失败的回调函数
  return Promise.reject(error)
})
// 对外暴露
export default requests
