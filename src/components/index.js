import Pagetools from './PageTools'
import ImageUpload from './ImageUpload'
import ThemePicker from './ThemePicker'
import Lang from './lang'
import TagsView from './TagsView'
export default {
  install(Vue) {
    Vue.component('Pagetools', Pagetools)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('Lang', Lang)
    Vue.component('TagsView', TagsView)
  }
}
