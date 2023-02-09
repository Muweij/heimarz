import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import '@/icons'
import '@/permission'
import * as directiveObj from '@/directives'
import * as filter from '@/filter'
import components from './components'
import Print from 'vue-print-nb'
import i18n from '@/lang'
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Print)
for (let key in directiveObj) {
  Vue.directive(key, directiveObj[key])
}
for (let key in filter) {
  Vue.filter(key, filter[key])
}
Vue.use(components)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
