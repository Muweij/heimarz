import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import routerinfo from './modules/routerinfo'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tagsView,
    app,
    settings,
    user,
    routerinfo
  },
  getters
})

export default store
