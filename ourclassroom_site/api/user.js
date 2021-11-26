import request from '~/utils/request'

export default{
  getUserInfo() {
    return request({
      url: '/api/ucenter/member/get-user-info',
      method: 'get'
    })
  }
}
