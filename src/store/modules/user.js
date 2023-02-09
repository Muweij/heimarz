import { getUserInfo, login, getStaffInfo } from '@/api/user'
import { resetRouter } from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  removeToken(state) {
    state.token = ''
    removeToken()
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async getToken({ commit }, obj) {
    let { data } = await login(obj)
    commit('setToken', data)
    return data
  },
  async getUserInfo({ commit }) {
    let { data: data1 } = await getUserInfo()
    let { data: data2 } = await getStaffInfo(data1.userId)
    let obj = {
      ...data1,
      ...data2
    }
    commit('setUserInfo', obj)
    return obj
  },
  logout({ commit }) {
    commit('removeToken')
    commit('removeUserInfo')
    resetRouter()
    commit('routerinfo/setRoutes', [], { root: true })
    commit('settings/ resetTheme', [], { root: true })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
