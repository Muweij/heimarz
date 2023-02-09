import request from '@/utils/request'
export const getsocial = data =>
  request({
    url: '/social_securitys/list',
    method: 'POST',
    data
  })
