import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import './assets/scss/style.scss'
import router from './router'

import fastclick from 'fastclick'
fastclick.attach(document.body)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/images/pic.jpg')
})

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import './assets/fonts/icon.scss'

import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
