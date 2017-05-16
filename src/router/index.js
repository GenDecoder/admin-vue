import Vue from 'vue'
import Router from 'vue-router'

import Header from "@/components/Header"
import LogIn from "@/components/LogIn"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Header      
    },
    {
      path: '/login',
      component: LogIn
    }
  ]
})
