import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import request from './ajax.js'

import fastClick from 'fastclick'
import 'github-markdown-css'
import './assets/style/reset.css' //解决手机默认样式不同的问题

Vue.prototype.$http=request

Vue.config.productionTip = false
fastClick.attach(document.body)

import {Button,Tab,Tabs,NavBar,Popup,Actionsheet,Toast, Cell, CellGroup ,PullRefresh, Pagination ,Field  } from 'vant'
Vue.use(Button).use(Tab).use(Tabs).use(NavBar).use(Cell).use(CellGroup).use(Field)
.use(Popup).use(Actionsheet).use(Toast).use(PullRefresh ).use(Pagination )


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
