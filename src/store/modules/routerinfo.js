import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  // 路由表, 标记当前用户所拥有的所有路由
  routes: constantRoutes // 默认静态路由表
}
const mutations = {
  // otherRoutes登录成功后, 需要添加的新路由
  setRoutes(state, otherRoutes) {
    // 静态路由基础上, 累加其他权限路由
    state.routes = [...constantRoutes, ...otherRoutes]
  }
}
const actions = {
  filterRoutes({ commit }, menus) {
    const otherRoutes = asyncRoutes.filter(item =>
      menus.includes(item.children[0].name)
    )
    commit('setRoutes', otherRoutes)
    return otherRoutes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
