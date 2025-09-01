/*********
 * 请求模块
 */

import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径
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
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过调用这里
  //  config： 本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意： 这里务必要返回 config 配置对象， 否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了 （还没有发出去） 会进入这里
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response) => {
  // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
  return response.data
}, async (error) => {
  // 响应失败的回调函数
  const status = error.response.status
  if (status === 400) {
    // 客户请求参数错误
    Toast.fail('客户请求参数异常')
  } else if (status === 401) {
    // token 无效
    // 如果没有user或user.token，直接去登录
    const { user } = store.state
    if (!user || !user.token) {
      // 直接跳转到登录页
      return redirectLogin()
    }
    // 如果没有refresh_token,则请求获取新的token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log(data)
      // 拿到新的token之后把它更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)
      // 把失败的请求从新发出去
      // error.config 是本次请求的相关配置对象
      return request(error.config)
    } catch (error) {
      // 刷新token都失败了，直接跳转登录
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限操作
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常，请稍后再试')
  }
  return Promise.reject(error)
})

function redirectLogin () {
  router.replace({
    name: 'login',
    // 传递查询参数
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
