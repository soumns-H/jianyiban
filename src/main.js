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

import VueResource from 'vue-resource'
Vue.use(VueResource);

//配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.headers.post['content-Type']='application/x-www-form-urlencode;chatset=UTF-8';
axios.interceptors.request.use(config => {
  console.log(config);
  // 获取token
  config.headers.Authorization = window.sessionStorage.getItem('token')
// 最後必須return config
  return config
})

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
