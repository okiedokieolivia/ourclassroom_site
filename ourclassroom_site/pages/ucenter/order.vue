<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">

            <a href="javascript: void(0)" title="My Orders" class="current">
              My Orders
            </a>
          </section>
        </div>
        <div class="mt40">
          <section v-if="orderList.length === 0" class="no-data-wrap">
            <em class="icon30 no-data-ico2">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam" >You don't have orders</span>
          </section>

          <!-- form -->
          <el-table
            v-if="orderList.length>0"
            :data="orderList"
            border
            fit
            highlight-current-row>

            <el-table-column label="Courses" width="200" align="center" >
              <template slot-scope="scope">
                <div class="info" >
                  <div class="pic">
                    <img :src="scope.row.courseCover" alt="scope.row.courseTitle" width="100px">
                  </div>
                  <div class="title">
                    <a :href="'/course/'+scope.row.courseId">{{ scope.row.courseTitle }}</a>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Total Price" width="100" align="center" >
              <template slot-scope="scope">
                {{ scope.row.totalAmount }}
              </template>
            </el-table-column>
            <el-table-column label="Date" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.gmtCreate.substr(0, 10) }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="Status" width="180" align="center" >
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 0 ? 'warning' : 'success'">{{ scope.row.status === 0 ? 'Pending Payment' : 'Completed' }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="Actions" width="200" align="center">
              <template slot-scope="scope" >
                <!-- checkout -->
                <router-link v-if="scope.row.status === 0" :to="'/order/'+scope.row.id">
                  <el-button type="text" size="mini">
                    <em class="icon20-iconfont iconfont icon-order"/>
                    Checkout</el-button>
                </router-link>
                <!-- start learning (if paid) -->
                <router-link v-if="scope.row.status === 1" :to="'/course/'+scope.row.courseId">
                  <el-button type="text" size="mini">
                    <em class="icon20-iconfont iconfont icon-menu"/>
                    Start Learning</el-button>
                </router-link>
                <!-- delete the order (if not paid) -->
                <el-button v-if="scope.row.status === 0" type="text" size="mini" @click="removeById(scope.row.id)">
                  <em class="icon20-iconfont iconfont icon-delete"/>
                  Delete</el-button>
              </template>

            </el-table-column>
          </el-table>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import orderApi from '~/api/order'

export default {
  data() {
    return {
      orderList: []
    }
  },

  created() {
    this.fetchOrderList()
  },

  methods: {
    fetchOrderList() {
      orderApi.getList().then(response => {
        this.orderList = response.data.items
      })
    },

    removeById(id) {
      this.$confirm('Are you sure to delete this order', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return orderApi.removeById(id)
      }).then((response) => {
        this.fetchOrderList()
        this.$message({
          type: 'success',
          message: response.message
        })
      }).catch(error => {
        if (error === 'cancel') {
          this.$message({
            message: 'Delete canceled'
          })
        }
      })
    }
  }
}
</script>
