import axios from 'axios'

// const cq_config = require("cq_config");
import cookieHelper from './cookies'
// import GLOBAL from './constant'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/json'
// 创建axios实例
const service = axios.create({
  // baseURL: cq_config.url, // url = base url + request url
  withCredentials: true, // 设置cookies在请求服务端时
  timeout: 10000, // 超时
})
axios.defaults.withCredentials = true

service.interceptors.request.use(
  config => {
    // console.log("config。。。", config)
    // // 在请求前操作
    // const USER_COOKIE_KEY = cookieHelper.getCookieData(GLOBAL.USER_COOKIE_KEY)
    // const USER_COOKIE_TENANTID_KEY = cookieHelper.getCookieData(GLOBAL.USER_COOKIE_TENANTID_KEY)
    // if (USER_COOKIE_KEY && USER_COOKIE_TENANTID_KEY) {
    //     config.headers['Cookies'] = GLOBAL.USER_COOKIE_KEY + '=' + USER_COOKIE_KEY + "; " +
    //         GLOBAL.USER_COOKIE_TENANTID_KEY + '=' + USER_COOKIE_TENANTID_KEY
    // }
    return config
  },
  error => {
    // 请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  response => {
    //console.log('response', response)
    const res = response.data
    // 说明guest用户cookie失效
    // if (res.toString().indexOf("<!doctype html>") > -1 || res.toString().indexOf("<!DOCTYPE html>") > -1) {
    //     cookieHelper.clearCookieData();
    //     window.location.reload();
    //     return false;
    // }

    // 苍穹未登录  // 统一认证未登录
    if (res.error_code && (res.error_code === 1 || res.errorCode === 1)) {
      cookieHelper.clearCookieData()
      if (
        typeof localStorage === 'object' &&
        localStorage.getItem('errorTimes') > 2
      ) {
        console.error(res)
        return false
      } else {
        // if (cq_config.baseURL && cq_config.baseURL !== "") {
        //     window.location.href = "/" + cq_config.baseURL + "/home";
        // } else {
        //     window.location.href = "/home";
        // }
        if (typeof localStorage === 'object')
          localStorage.setItem(
            'errorTimes',
            localStorage.getItem('errorTimes') + 1
          )
        return false
      }
    }
    return res
  },
  error => {
    console.log('error', error)
    return Promise.reject(error)
  }
)

export default service
