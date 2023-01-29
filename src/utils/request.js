import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,

  timeout: 5000
})
request.interceptors.request.use(
  function(config) {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    const {
      data: { success, message }
    } = response
    if (!success) {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
    return response.data
  },
  function(error) {
    if (error.response.status === 401 && error.response.data.code === 10002) {
      Message.error('都一个小时候，你还在浏览网页？滚登录页面吧！！（狗头）')
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error('请求出错')
    }
    console.log(error)
    // const {
    //   response: {
    //     status,
    //     data: { message }
    //   }
    // } = error

    // Message({
    //   showClose: true,
    //   message,
    //   type: 'error'
    // })

    // if (status === 401) {
    //   store.dispatch('user/logout')
    //   router.push('/login')
    // }
    return Promise.reject(error)
  }
)
export default request
