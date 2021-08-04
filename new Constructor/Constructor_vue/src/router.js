import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login.vue'
import Cabinet from './views/cabinet.vue'
import Playable from './views/playable.vue'
import AdminCabinet from './views/admincabinet.vue'
import { runInNewContext } from 'vm';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: Cabinet,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admincabinet',
      name: 'admincabinet',
      component: AdminCabinet,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/playable/:id',
      name: 'playable',
      component: Playable,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router

router.beforeEach((to, from,  next) => {
  let user
  try {
    user = JSON.parse(window.localStorage.getItem('user'))
  } catch(err) {
    user = {}
  }
  user = user || {}
  if (to.meta.requiresAuth) {
    if (user.token) next()
    else next({ path: '/' })
  } else {
    next()
  }
})