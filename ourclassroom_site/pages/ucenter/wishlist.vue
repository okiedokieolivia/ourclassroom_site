<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">

            <a href="javascript: void(0)" title="My Wishlist" class="current">
              Wishlist
            </a>
          </section>
        </div>
        <div class="mt40">
          <section v-if="wishlist.length === 0" class="no-data-wrap">
            <em class="icon30 no-data-ico2">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">Your wishlist is empty</span>
          </section>

          <!-- form -->
          <el-table
            v-if="wishlist.length > 0"
            :data="wishlist"
            border
            fit
            highlight-current-row>

            <el-table-column label="Course" align="center" >
              <template slot-scope="scope">
                <div class="info" >
                  <div class="pic">
                    <img :src="scope.row.cover" alt="scope.row.title" width="100px">
                  </div>
                  <div class="title">
                    <a :href="'/course/'+scope.row.courseId">{{ scope.row.title }}</a>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Instructor" align="center">
              <template slot-scope="scope">
                {{ scope.row.teacherName }}
              </template>
            </el-table-column>
            <el-table-column label="Price" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.price === 0 ? "Free": scope.row.price }}
              </template>
            </el-table-column>

            <el-table-column label="Actions" width="150" align="center">
              <template slot-scope="scope">
                <em class="icon20-iconfont iconfont icon-delete"/>
                <a href="javascript:void(0);" title="Remove" @click="removeFromWishlist(scope.row.courseId)">Remove</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import wishlistApi from '~/api/wishlist'

export default {
  data() {
    return {
      wishlist: []
    }
  },

  created() {
    this.fetchWishlist()
  },

  methods: {
    fetchWishlist(memberId) {
      wishlistApi.getWishlist().then(response => {
        this.wishlist = response.data.items
      })
    },

    removeFromWishlist(courseId) {
      wishlistApi.removeFromWishlist(courseId).then(response => {
        this.fetchWishlist()
      })
    }
  }
}
</script>
