import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'


const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})


service.interceptors.request.use(config => {

  config.headers['Content-Type'] = 'application/json;charset=utf-8'

  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }


  return config

}, error => {

  console.log('请求出现了异常....错误信息为：'+error)
  return Promise.reject(error)
})


service.interceptors.response.use(response => {

    const {data} = response

    if (!Object.is(data.code,200)) {

      if (Object.is(401,data.code)) { //处理 401
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })

      }
      Message({message: data.message, type: 'error', duration: 3000})
      return Promise.reject('error')
    }

    return data

  },
  error => {
    console.log('响应出现了异常....错误信息为：' + error)
    Message({message: error.message, type: 'error', duration: 3000})
    return Promise.reject(error)
  }
)





export default service
