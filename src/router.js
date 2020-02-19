import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from './components/login'
import Anime from './components/libraryAnime'
import Manga from './components/libraryManga'
import Manage from './components/library_comp/libraryManage'
import Admin from './components/admin'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '*',
      redirect: '/library/anime'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/library/anime',
      name: 'Anime',
      component: Anime,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/library/manga',
      name: 'Manga',
      component: Manga,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/library/manage',
      name: 'Manage',
      component: Manage,
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