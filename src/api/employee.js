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
