import request from '@/utils/request'
// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 用户基本资料
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
//获取员工基本信息
export function getStaffInfo(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
//获取部门负责人
export function getSimpleList() {
  return request({
    url: `/sys/user/simple`
  })
}
