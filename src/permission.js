import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let token = store.getters.token
  if (token) {
    if (to.path == '/login') {
      next('/')
      NProgress.done()
    } else {
      if (!store.state.user.userInfo.userId) {
        let { roles } = await store.dispatch('user/getUserInfo')
        const otherRoutes = await store.dispatch(
          'routerinfo/filterRoutes',
          roles.menus
        )
        router.addRoutes([
          ...otherRoutes,
          {
            path: '*',
            redirect: '/404',
            hidden: true
          }
        ])
        next({
          ...to,
          replace: true
        })
        return
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
