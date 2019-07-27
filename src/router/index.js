import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/jobmanage',
    component: Layout,
    redirect: '/jobmanage/joblist',
    name: 'Jobmanage',
    meta: { title: '任务管理', icon: 'example' },
    children: [
      {
        path: 'add',
        name: 'Form',
        component: () => import('@/views/joblist/add'),
        meta: { title: '任务添加', icon: 'form' }
      },
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/joblist/index'),
        meta: { title: '任务列表', icon: 'table' }
      },
      {
        path: 'log',
        name: 'Tree',
        component: () => import('@/views/joblist/log'),
        meta: { title: '任务日志', icon: 'tree' }
      }
    ]
  },


  {
    path: '/workermanage',
    component: Layout,
    redirect: '/workermanage/workerlist',
    name: 'Workermanage',
    meta: { title: '节点管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/workerlist/index'),
        meta: { title: '工作节点', icon: 'table' }
      },
      {
        path: 'fail',
        name: 'Table',
        component: () => import('@/views/workerlist/fail'),
        meta: { title: '失败节点', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
