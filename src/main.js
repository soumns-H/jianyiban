// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL = 'http:/127.0.0.1:8080/api/private/v1'
Vue.use(Element)


Vue.config.productionTip = false
Vue.config.$http=axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
