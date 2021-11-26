import axios from 'axios'
import { Message } from 'element-ui'
import cookie from 'js-cookie'

// axios
const service = axios.create({
  // baseURL: 'http://localhost:9110',
  baseURL: 'http://47.89.235.2:9110',
  // baseURL: 'http://172.24.49.199:9110',
  timeout: 12000 // timeout
})

// http request interceptor
service.interceptors.request.use(
  config => {
    // if the token is included in the cookie, directly send the token along with the header
    if (cookie.get('ourclassroom_jwt_token')) {
      config.headers['token'] = cookie.get('ourclassroom_jwt_token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor --> handle exception&error returned from the server
service.interceptors.response.use(
  response => {
    /**
       * throw error when the code returned != 20000
       */
    const res = response.data

    if (res.code === 20000) {
      return response.data
    } else if (res.code === 23004) {
      // fail to fetch the userInfo
      // remove the cookie
      cookie.set('ourclassroom_jwt_token', '', { domain: 'localhost' })
      return response.data
    } else if (res.code === 28004) { // authentication failed. 28004 is returned by the apigateway global filter
      // relocate to login page
      window.location.href = '/login'
      return
    } else {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    }
  },
  error => {
    console.log('err：' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
