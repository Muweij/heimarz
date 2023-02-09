import request from '@/utils/request'
// 获取员工列表
export const getUserListApi = (page = 1, size = 5) =>
  request({
    url: `/sys/user`,
    params: {
      page,
      size
    }
  })
// 删除员工
export const delUserListApi = id =>
  request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
//新增员工
export const addUserListApi = data =>
  request({
    url: `/sys/user`,
    method: 'post',
    data
  })
//批量新增员工
export const batchUserListApi = data =>
  request({
    url: `/sys/user/batch`,
    method: 'post',
    data
  })
// 修改员工基本信息
export const appUserListApi = data =>
  request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
// 获取员工个人信息
export const reqGetPersonalDetail = id =>
  request({
    url: `/employees/${id}/personalInfo`
  })
//更新员工的基础信息
export const reqUpdataPersonal = data =>
  request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
// 获取用户岗位信息
export const reqGetJobDetail = id =>
  request({
    url: `/employees/${id}/jobs`
  })
// 更新岗位信息
export const reqUodataJob = data =>
  request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
// 给员工分配角色
export const editAssignRolesAPi = (id, roleIds) =>
  request({
    url: `/sys/user/assignRoles`,
    method: 'put',
    data: {
      id,
      roleIds
    }
  })
