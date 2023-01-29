import request from '@/utils/request'
// 获取公司信息
export const getCompany = id =>
  request({
    url: `/company/${id}`
  })
