import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TopicList from '@/components/TopicList'
import Topic from '@/components/Topic'

import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Message from '@/components/Message'
import Center from '@/components/Center'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/topiclist/all'
    },
    {
      path: '/topiclist/:name',
      name: 'topiclist',
      component: TopicList,
      props:true ,

    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic,
      props:true ,


    },
    //登录操作
    {
       path: '/login',
       name:'login',
       component: Login
    },
    {
      path: '/center',
      name:'center',
      component: Center
   },
   {
      path: '/user/:loginName',
      name: 'user',
      component: User,
      props: true

   },
   {
    path: '/message',
    name:'message',
    component: Message
    },
    {
      path: '/logout',
      name:'logout',
      component: Logout
    },


  ]
})
