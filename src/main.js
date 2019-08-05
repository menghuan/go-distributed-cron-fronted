import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})

Vue.prototype.$appConfirm = function(callback) {
  this.$confirm('确定执行此操作?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    callback()
  })
}

Vue.filter('formatTime', function(time) {
  const fillZero = function(num) {
    return num >= 10 ? num : '0' + num
  }
  const date = new Date(time)
  const result = date.getFullYear() + '-' +
      (fillZero(date.getMonth() + 1)) + '-' +
      fillZero(date.getDate()) + ' ' +
      fillZero(date.getHours()) + ':' +
      fillZero(date.getMinutes()) + ':' +
      fillZero(date.getSeconds())
  if (result.indexOf('20') !== 0) {
    return ''
  }
  return result
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
