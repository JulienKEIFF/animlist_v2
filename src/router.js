import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from './components/login'
import Library from './components/library'
import Settings from './components/setting'
import Admin from './components/admin'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/library'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/library',
      name: 'Library',
      component: Library,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router