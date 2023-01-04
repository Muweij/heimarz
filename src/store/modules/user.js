import { getUserInfo, login, getStaffInfo } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
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
  }
}
const actions = {
  async getToken({ commit }, obj) {
    let { data } = await login(obj)
    commit('setToken', data)
    return data
  },
  // getToken({ commit }, data) {
  //   return new Promise((resolve, reject) => {
  //     login(data)
  //       .then(res => {
  //         resolve()
  //         commit('setToken', res.data)
  //       })
  //       .catch(err => {
  //         reject()
  //         console.log(err)
  //       })
  //   })
  // },
  async getUserInfo({ commit }) {
    let { data: data1 } = await getUserInfo()
    let { data: data2 } = await getStaffInfo(data1.userId)
    let obj = {
      ...data1,
      ...data2
    }
    commit('setUserInfo', obj)
    return obj
  }
  // getUserInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getUserInfo()
  //       .then(res => {
  //         let { data } = res
  //         commit('setUserInfo', data)
  //         resolve()
  //       })
  //       .catch(err => {
  //         reject()
  //         console.log(err)
  //       })
  //   })
  // }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
