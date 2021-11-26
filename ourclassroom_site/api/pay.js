import request from '~/utils/request'

export default {
  createPayment(orderNo) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/transaction/paypal/create-payment/${orderNo}`,
      method: 'post'
    })
  },

  queryPayStatus(orderNo) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/transaction/order/query-payment-status/${orderNo}`,
      method: 'get'
    })
  }
}
