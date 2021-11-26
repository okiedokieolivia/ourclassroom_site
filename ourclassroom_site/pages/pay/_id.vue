<template>
  <div class="cart py-container">
    <section v-if="order.status === 1" class="no-data-wrap">
      <em class="icon30 ok-icon">&nbsp;</em>
      <span class="c-666 fsize14 ml10 vam" >Awesome! Payment Successful!
        <a :href="'/course/'+order.courseId" class="green">Click to go back to the course</a>
      </span>
    </section>

    <section v-else class="no-data-wrap">
      <em class="icon30 no-icon">&nbsp;</em>
      <span class="c-666 fsize14 ml10 vam" >Ooops!Payment Failed
        <a :href="'/course/'+order.courseId" class="green">Click to go back to the course</a>
      </span>
    </section>

  </div>
</template>
<script>
import orderApi from '~/api/order'

export default {
  data() {
    return {
      order: {}
    }
  },

  created() {
    orderApi.getByOrderNo(this.$route.params.id).then(response => {
      this.order = response.data.item
    })
  }

}
</script>
