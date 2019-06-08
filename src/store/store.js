import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    active: 0, //控制Tab显示哪个组件
    isLogined: false,   //登录状态
    loginName: '',
    showMoreMenus: false,  //控制 actionsheet组件弹出
    accessToken:'',
    unLoginMoreMenus:[
      {name:'登录', className:'login'}
    ],
    loginMoreMenus:[
      {name:'个人中心',className:'center'},
      {name: '消息通知',className:'message'},
      {name:'退出登录',className:'logout'}
    ],
    topics: [
      {name: 'all',desc: '全部'},
      {name: 'good',desc: '精华'},
      {name: 'share',desc: '分享'},
      {name: 'ask',desc: '问答'},
      {name: 'job',desc: '招聘'},
      {name: 'dev',desc: '测试'},

    ]
  },
  //状态数据的计算属性
  getters:{
    moreMenus: function(state){
      if(state.isLogined){
        return state.loginMoreMenus
      }
      return state.unLoginMoreMenus
    },
  },
  mutations,
  actions,

  }
)
