import request from '@/utils/request'

export default {
  isAdded(courseId) {
    return request({
      url: `/api/edu/wishlist/auth/is-added/${courseId}`,
      method: 'get'
    })
  },

  addToWishlist(courseId) {
    return request({
      url: `/api/edu/wishlist/auth/save/${courseId}`,
      method: 'post'
    })
  },

  getWishlist() {
    return request({
      url: '/api/edu/wishlist/auth/list',
      method: 'get'
    })
  },

  removeFromWishlist(courseId) {
    return request({
      url: `/api/edu/wishlist/auth/remove/${courseId}`,
      method: 'delete'
    })
  }
}
