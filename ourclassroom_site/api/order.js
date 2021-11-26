import request from '~/utils/request'

export default {
  createOrder(courseId) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/transaction/order/auth/save/${courseId}`,
      method: 'post'
    })
  },

  getById(orderId) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/transaction/order/auth/get/${orderId}`,
      method: 'get'
    })
  },

  getByOrderNo(orderNo) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/transaction/order/auth/get-by-order-number/${orderNo}`,
      method: 'get'
    })
  },

  isBuy(courseId) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/transaction/order/auth/is-buy/${courseId}`,
      method: 'get'
    })
  },

  getList() {
    return request({
      // baseURL: 'http://localhost:8170',
      url: '/api/transaction/order/auth/list',
      method: 'get'
    })
  },

  removeById(orderId) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/transaction/order/auth/remove/${orderId}`,
      method: 'delete'
    })
  }

}
