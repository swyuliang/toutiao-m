import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'
Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requireAuth: false } // 路由元信息，添加额外的自定义数据
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requireAuth: false }
  },
  {
    path: '/',
    // 如果父路由有默认子路由，name没有意义
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        // path留空就是默认子路由,只能由一个
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requireAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requireAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requireAuth: false }
      },
      {
        path: '/my',
        name: 'my ',
        component: () => import('@/views/my'),
        meta: { requireAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requireAuth: false }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
    meta: { requireAuth: true }
  },
  {
    path: '/article/:articleId?',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, // 使用props传参，只能传递params,
    meta: { requireAuth: false }
  }
]

const router = new VueRouter({
  routes
})

// to: 要访问的页码路由信息
// from： 来自哪个页码的路由信息
// next: 放行标志
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.user) {
    // 校验登录状态，没有就提示用户
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    })
      .then(() => {
      // 确认执行这里
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
      // 取消执行这里
      // 取消了，停止路由导航
        next(false)
      })
  } else {
    // 不需要登录状态的页面，直接过去
    next()
  }
})
export default router
