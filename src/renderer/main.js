import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import vuetify from '../plugins/vuetify'
import '../renderer/assets/style/index.less'

import 'animate.css/animate.min.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})
Vue.config.productionTip = false

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import transTime from '@/filters/transTime'
import playCount from '@/filters/playCount'
import formatDate from '@/filters/formatDate'
/* eslint-disable no-new */
Vue.filter('transTime', transTime)
Vue.filter('playCount', playCount)
Vue.filter('formatDate', formatDate)

Vue.prototype.cSktData = function(length) {
    return Array.from({ length }, (item, index) => {
        return {
            id: index
        }
    })
}
new Vue({
    vuetify,
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')
