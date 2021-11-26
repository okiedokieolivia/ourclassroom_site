<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section class="c-infor-tabTitle c-tab-title">
        <a href="javascript: void(0)" title="My Profile" class="current">
          My Profile
        </a>
      </section>

      <!-- <div class="mt40">
        <section class="u-infor-pic">
          <img :src="userInfo.avatar" :alt="userInfo.username">
        </section>

        <h3 class="hLh30">
          <span class="fsize18 c-333 green">{{ userInfo.username }}
          </span>
        </h3>

        <h3 class="hLh30">
          <span class="fsize16 c-333 green">{{ userInfo.email }}
          </span>
        </h3>

      </div> -->

      <div>
        <section class="c-infor-tabTitle c-tab-title">
          <a title href="javascript:void(0)">Hi! {{ userInfo.username }}</a>
        </section>

        <!-- user info -->
        <section class="stud-act-list">
          <ul style="height: auto;">
            <li>
              <div class="u-face">
                <a href="#">
                  <img :src="userInfo.avatar" width="50" height="50" alt>
                </a>
              </div>
              <section class="hLh30 txtOf">
                <span href="#" class="c-333 fsize14 fl">{{ userInfo.email }}</span>
              </section>
              <section class="hLh20 txtOf">
                <span class="c-999">{{ userInfo.bio }}</span>
              </section>
            </li>
          </ul>
        </section>

        <!-- course list -->
        <section class="c-infor-tabTitle c-tab-title">
          <a title href="javascript:void(0)">Courses you are enrolled in</a>
        </section>

        <section v-if="courseList.length === 0" class="no-data-wrap">
          <em class="icon30 no-data-ico2">&nbsp;</em>
          <span class="c-666 fsize14 ml10 vam" >You haven't been enrolled any course</span>
        </section>

        <article class="comm-course-list">
          <ul id="bna" class="of">
            <li v-for="course in courseList" :key="course.id">
              <div class="cc-l-wrap">
                <section class="course-img">
                  <img
                    :src="course.courseCover"
                    :alt="course.title"
                    class="img-responsive"
                  >
                  <div class="cc-mask">
                    <a :href="'/course/'+ course.courseId" title="Start Learning" class="comm-btn c-btn-1">Start Learning</a>
                  </div>
                </section>
                <div class="title" style="text-align:center">
                  {{ course.courseTitle }}
                </div>

              </div>
            </li>
          </ul>
          <div class="clear"/>
        </article>
      </div>
    </div>
  </article>
</template>

<script>
import userApi from '~/api/user'
import orderApi from '~/api/order'

export default {

  data() {
    return {
      userInfo: {
        avatar: '',
        username: '',
        email: '',
        id: '',
        bio: ''
      },

      courseList: []
    }
  },

  created() {
    this.getUserInfo()
    this.fetchCourseList()
  },

  methods: {
    getUserInfo() {
      userApi.getUserInfo().then(response => {
        this.userInfo = response.data.user
      })
    },

    fetchCourseList() {
      orderApi.getList().then(response => {
        const orderList = response.data.items
        for (let i = 0; i < orderList.length; i++) {
          const course = orderList[i]
          if (course.status === 1) {
            this.courseList.push(course)
          }
        }
      })
    }
  }
}
</script>

<style>
.u-infor-pic{float:left;margin:0 30px 0 0;background:#fff;border:1px solid #f0f0f0;box-shadow:5px 5px 0 rgba(0,0,0,.04);overflow:hidden;}
.u-infor-pic img{margin:20px auto;width:200px;display:block}
</style>
