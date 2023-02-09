const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  fixedHeader: state => state.settings.fixedHeader,
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  routes: state => state.routerinfo.routes,
  roles: state => state.user.userInfo.roles
}
export default getters
