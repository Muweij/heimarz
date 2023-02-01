import Vue from 'vue'
import VueRouter from 'vue-router'
import approvalsRouter from './modules/approvals.js'
import departmentsRouter from './modules/departments.js'
import employeesRouter from './modules/employees.js'
import permissionRouter from './modules/permission.js'
import attendancesRouter from './modules/attendances.js'
import salarysRouter from './modules/salarys.js'
import settingRouter from './modules/setting.js'
import socialRouter from './modules/social.js'
import zijixieRouter from './modules/zijixie.js'
Vue.use(VueRouter)
export const asyncRoutes = [
  departmentsRouter,
  zijixieRouter,
  settingRouter,
  employeesRouter,
  permissionRouter,
  approvalsRouter,
  attendancesRouter,
  salarysRouter,
  socialRouter
]
/* Layout */
import Layout from '@/layout'
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
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/import',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/import/index'),
        meta: { title: 'excel上传' }
      }
    ],
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes, ...asyncRoutes]
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
