import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,

  timeout: 5000
})
request.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    const res = response.data
    const { message, success } = res
    if (!success) {
      Message.error(message)
      return Promise.reject(new Error(message))
    }

    return res
  },
  function(error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message.error('请求出错')
    return Promise.reject(error)
  }
)
export default request
