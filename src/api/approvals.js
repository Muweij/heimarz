import request from '@/utils/request'
export const getCompany = id =>
  request({
    url: `/user/process/instance/${id}`
  })
export function getApprovalList(data) {
  return request({
    url: `/user/process/instance/${data.page}/${data.pageSize}`,
    method: 'put',
    data
  })
}
