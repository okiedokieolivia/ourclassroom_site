<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- Course details begins -->
    <section class="container">

      <!-- breadcrumbs begins -->
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">Homepage</a>
        \
        <a href="/course" title class="c-999 fsize14">Courses</a>
        \
        <a :href="'/course?subjectParentId='+course.primarySubjectId" class="c-333 fsize14">{{ course.primarySubject }}</a>
        \
        <a :href="'/course?subjectParentId='+course.primarySubjectId+'&subjectId='+course.secondarySubjectId" class="c-333 fsize14">{{ course.secondarySubject }}</a>
      </section>
      <!-- /breadcrumbs ends -->

      <!-- Course info begins -->
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section id="videoPlay" class="p-h-video-box">
            <img :src="course.cover" :alt="course.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <!-- <span class="c-fff">Price：</span> -->
              <b class="c-pink" style="font-size:24px;">${{ course.price }}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">Created by {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span v-if="!isAdded" class="ml10 vam">
                <!-- <em class="icon18 scIcon"/> -->
                <em class="icon20-iconfont iconfont icon-like"/>
                <a class="c-fff vam" title="add to wishlist" @click="addToWishlist(course.id)" >Add to Wishlist</a>
              </span>

              <span v-else class="ml10 vam">
                <!-- <em class="icon18 scIcon"/> -->
                <em class="icon20-iconfont iconfont icon-like2"/>
                <a class="c-fff vam" title="remove from wishlist" @click="removeFromWishlist(course.id)" >Remove from Wishlist</a>
              </span>
            </section>

            <!-- if already buy this course or this is a free course -->
            <section v-if="isBuy || course.price === 0" class="c-attr-mt">
              <a href="javascript:void(0)" title="Start Learning" class="comm-btn c-btn-3" @click="startLearning()">Start Learning</a>
            </section>

            <section v-else class="c-attr-mt">
              <a href="javascript:void(0)" title="Buy Course" class="comm-btn c-btn-3" @click="createOrder()">Buy Course</a>
            </section>

          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <h6 class="c-333 f-fM mt10">{{ course.buyCount }}</h6>
                <br>
                <span class="c-333 f-fM">Students</span>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <h6 class="c-333 f-fM mt10">{{ course.lessonNum }}</h6>
                <br>
                <span class="c-333 f-fM">Total hours</span>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <h6 class="c-333 f-fM mt10">{{ course.viewCount }}</h6>
                <br>
                <span class="c-333 f-fM">Total views</span>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"/>
      </div>
      <!-- /Course info ends -->

      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="Course Content">Course Details</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">

                <!-- Course details begins -->
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>Description</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <!-- v-html：convert the html in the description to the content -->
                    <section class="course-txt-body" v-html="course.description"/>
                  </div>
                </div>
                <!-- /Course details ends -->

                <!-- Course content begins-->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>Course Content</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- course content -->
                          <li v-for="chapter in chapterList" :key="chapter.id" class="lh-menu-stair">
                            <a :title="chapter.title" href="javascript: void(0)" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"/>{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li v-for="video in chapter.children" :key="video.id" class="lh-menu-second ml30">
                                <!-- if the course is bought or this is a free course -->
                                <a
                                  v-if="isBuy || course.price === 0 || video.free === true"
                                  :href="'/player/' + video.videoSourceId"
                                  :title="video.title"
                                  target="_blank">
                                  <span v-if="Number(course.price) !== 0 && video.free===true" class="fr">
                                    <i class="free-icon vam mr10">Preview</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>

                                <!-- else, the course is not bought yet -->
                                <a
                                  v-else
                                  :title="video.title"
                                >
                                  <span v-if="Number(course.price) !== 0 && video.free===true" class="fr">
                                    <i class="free-icon vam mr10">Preview</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>

                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                  <!-- /Course Content ends -->
              </div></article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <!-- Instructor begins-->
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">Instructor</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+course.teacherId" target="_blank">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a :href="'/teacher/'+course.teacherId" class="c-333 fsize16 fl" target="_blank">{{ course.teacherName }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
            <!-- /Instructor ends -->
          </div>
        </aside>
        <div class="clear"/>
      </div>
    </section>
    <!-- /Course details ends -->
  </div>
</template>

<script>
import courseApi from '~/api/course'
import orderApi from '~/api/order'
import wishlistApi from '~/api/wishlist'
import cookie from 'js-cookie'

export default {
  async asyncData(page) {
    const response = await courseApi.getById(page.route.params.id)

    return {
      course: response.data.course,
      chapterList: response.data.chapterVoList
    }
  },

  data() {
    return {
      isBuy: false,
      isAdded: false
    }
  },

  created() {
    const token = cookie.get('ourclassroom_jwt_token')
    if (token) {
      // check if the course is bought
      orderApi.isBuy(this.course.id).then(response => {
        this.isBuy = response.data.isBuy
      })

      // check if the course is added into wishlist
      wishlistApi.isAdded(this.course.id).then(response => {
        this.isAdded = response.data.isAdded
      })
    }
  },

  methods: {
    createOrder() {
      orderApi.createOrder(this.course.id).then(response => {
        // redirect to order preview
        this.$router.push({ path: '/order/' + response.data.orderId })
      })
    },

    startLearning() {
      // console.log(document.body.scrollHeight)
      window.scrollTo(0, document.body.scrollHeight / 2)
    },

    addToWishlist(courseId) {
      wishlistApi.addToWishlist(courseId).then(response => {
        this.isAdded = true
      })
    },

    removeFromWishlist(courseId) {
      wishlistApi.removeFromWishlist(courseId).then(response => {
        this.isAdded = false
      })
    }
  }
}
</script>

<style>
.course-txt-body ol, .course-txt-body ul{
    padding-left: 40px;
    margin: 16px 0;
}
.course-txt-body ol li{
    list-style: decimal;
}
.course-txt-body ul li{
    list-style: disc;
}
</style>
