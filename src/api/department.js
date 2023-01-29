import request from '@/utils/request'
// 树状数据
export const getDepartments = () =>
  request({
    url: '/company/department'
  })
//   删除数据
export const deleteDepartments = id =>
  request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
// 新增部门
/**
 *
 * @param {*} id
 */
export const addDepartments = data =>
  request({
    url: `/company/department`,
    method: 'post',
    data
  })
// 修改部门
export const putDepartments = data =>
  request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
// 部门详情
export const getDepartmentsdetails = id =>
  request({
    url: `/company/department/${id}`
  })
