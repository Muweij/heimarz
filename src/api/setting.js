import request from '@/utils/request'
// 获取角色列表
export const getRoleList = (page = 1, pagesize = 10) =>
  request({
    url: `/sys/role`,
    params: {
      page,
      pagesize
    }
  })
// 新增角色
export const addRole = data =>
  request({
    url: `/sys/role`,
    method: 'post',
    data
  })
// 删除角色
export const delRole = id =>
  request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
// 获取角色详情
export const getdelRole = id =>
  request({
    url: `/sys/role/${id}`
  })
// 编辑接口
export const editRoleDeta = data =>
  request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
// 分配权限
export const assRoleDeta = (id, permIds) =>
  request({
    url: `/sys/role/assignPrem`,
    method: 'put',
    data: {
      id,
      permIds
    }
  })
