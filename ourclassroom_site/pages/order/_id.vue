<template>

  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f24">Order Details</h1>
      <div class="clear"/>
    </div>
    <table class="GoodList">
      <tbody>
        <tr>
          <td colspan="3" class="teacher f16">Instructor：{{ order.teacherName }}</td>
        </tr>
        <tr class="good">
          <td class="name First">
            <a :href="'/course/'+order.courseId" target="_blank">
              <img :src="order.courseCover">
            </a>
            <div class="goodInfo">
              <a :href="'/course/'+ order.courseId" target="_blank">{{ order.courseTitle }}</a>
            </div>
          </td>
          <td class="green priceNew Last">$<strong>{{ order.totalAmount }}</strong></td>
        </tr>
      </tbody>
    </table>
    <div class="Finish">
      <div class="check fr">
        <!-- <el-checkbox v-model="agree">Agree to these<a href="javascript:" target="_blank"> Terms of Service</a></el-checkbox> -->
        <el-checkbox v-model="agree" class="agree-checkbox">Agree to these<a href="javascript:" target="_blank"> Terms of Service</a></el-checkbox>
      </div>
      <div class="clear"/>
      <div class="Main fl">
        <div class="fl f18">
          <a :href="'/course/'+order.courseId" class="green">Return</a>
        </div>
      </div>
      <!-- <el-button :disabled="!agree" class="checkout-button">Checkout</el-button> -->
      <button :disabled="!agree" class="checkout-button" @click="pay()">Checkout</button>
      <div class="clear"/>
    </div>
  </div>
</template>

<script>
import orderApi from '~/api/order'
import payApi from '~/api/pay'

export default {
  data() {
    return {
      order: {},
      agree: true
    }
  },

  created() {
    orderApi.getById(this.$route.params.id).then(response => {
      this.order = response.data.item
    })
  },

  methods: {
    pay() {
      if (this.agree) {
        payApi.createPayment(this.order.orderNo).then(response => {
          const url = response.data.link
          window.location.href = url
        })
      }
    }
  }
}
</script>

<style>
.checkout-button {
  background-color: rgb(231, 188, 198);
  color: rgb(83, 81, 81);
  border: 1px solid #dcdfe6;
}

.checkout-button:hover {
  background-color: rgb(255, 205, 220);
  color: rgb(32, 32, 32);
  box-shadow: 0 10px 10px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.checkout-button:disabled{
  background-color: rgb(216, 191, 199);
  color: antiquewhite;
  cursor: not-allowed;
}

.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#909399;
  border-color: #909399;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #909399;
}
.el-checkbox.is-bordered.is-checked{
  border-color: #909399;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #909399;
}

</style>
