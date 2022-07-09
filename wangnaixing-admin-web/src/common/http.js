import axios from "axios"
import store from "../store";
import {Message, MessageBox} from "element-ui";
import { getToken } from '@/utils/auth'

axios.defaults.withCredentials = true
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'



axios.interceptors.request.use(config => {

  config.headers['Content-Type'] = 'application/json;charset=utf-8'

  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }


  return config

}, error => {

  console.log('请求出现了异常....错误信息为：'+error)
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {

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

    return response

  },
  error => {
    console.log('响应出现了异常....错误信息为：' + error)
    Message({message: error.message, type: 'error', duration: 3000})
    return Promise.reject(error)
  }
)


let $http = {
  urlPrefix:process.env.BASE_API,
  put: (uri, data = {}) => {
    return new Promise((resolve, reject) => {
      axios.put($http.urlPrefix + uri, JSON.stringify(data))
        .then(response => {

          resolve(response.data)

        }, err => {

          reject(err)

        })
    })
  },
  delete: (uri, data = {}) =>{
    return new Promise((resolve, reject) => {
      axios.delete($http.urlPrefix + uri, { params: data })
        .then(response => {

          resolve(response.data)

        }, err => {

          reject(err)

        })

    })
  },


  post: (uri, data = {}) => {
    return new Promise((resolve, reject) => {

      axios.post($http.urlPrefix + uri, JSON.stringify(data))
        .then(response => {

          resolve(response.data)

        }, err => {

          reject(err)

        })

    })
  },
  postUrl:  (url, data = {}) => {
    return new Promise((resolve, reject) => {

      axios.post(url, JSON.stringify(data))
        .then(response => {

          resolve(response.data)
        }, err => {

          reject(err)

        })
    });
  },


  get:  (uri, data = {}) => {
    return new Promise((resolve, reject) => {
      axios.get($http.urlPrefix + uri, { params: data })
        .then(response => {

          resolve(response.data)

        }, err => {

          reject(err)

        })
    })
  },
  getUrl(url, params = {}, responseType) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params, responseType })
        .then(response => {

        resolve(response.data)

      }, err => {

        reject(err)

      })
    })
  }

}

export default  $http


