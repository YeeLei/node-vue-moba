import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'
import store from './store'
Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    // 由于element-ui自带的底层的ajax请求库,没办法是用axios，所以为所有的上传图片Authorization设置上当前的token
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

import Bread from './components/Bread'
Vue.component('bread', Bread)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
