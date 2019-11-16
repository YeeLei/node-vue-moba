import axios from 'axios'
import Vue from 'vue'
import router from './router'
import { Loading } from 'element-ui'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,.7)'
  })
}
function endLoading() {
  loading.close()
}

//请求拦截
http.interceptors.request.use(
  function(config) {
    //加载动画
    startLoading()
    //判断请求的时候是否有token
    if (localStorage.token) {
      // 加Bearer后面不要忘了空格
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

//响应拦截
http.interceptors.response.use(
  res => {
    //结束加载动画
    endLoading()
    return res
  },
  err => {
    //错误提醒
    endLoading()
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
    }
    if (err.response.status === 401) {
      //如果请求码为401,则说明没有登录
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default http
