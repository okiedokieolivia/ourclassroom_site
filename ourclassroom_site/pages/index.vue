<template>

  <div>
    <!-- banner -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="topBannerAd in topBannerAdList" :key="topBannerAd.id" :style="'background:' + topBannerAd.color" class="swiper-slide">
          <a :href="topBannerAd.linkUrl" target="_blank">
            <img :src="topBannerAd.imageUrl" :alt="topBannerAd.title">
          </a>
        </div>

      </div>
      <div class="swiper-pagination swiper-pagination-white"/>
      <div slot="button-prev" class="swiper-button-prev swiper-button-white"/>
      <div slot="button-next" class="swiper-button-next swiper-button-white"/>
    </div>
    <!-- /banner -->

    <div id="aCoursesList">
      <!-- popular courses -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">Students are viewing</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul id="bna" class="of">
                <li v-for="course in courseList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="course.cover"
                        :alt="course.title"
                        class="img-responsive"
                      >
                      <div class="cc-mask">
                        <a :href="'/course/'+course.id" title="Start Learning" class="comm-btn c-btn-1">Start Learning</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{ course.title }}</a>
                    </h3>
                    <span v-if="Number(course.price) === 0" class="fr jgTag bg-blue">
                      <i class="c-fff fsize12 f-fA">Free</i>
                    </span>
                    <span v-else class="fr jgTag ">
                      <i class="c-blue fsize12 f-fA"> ${{ course.price }}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.viewCount }} views</i>
                      |
                      <i class="c-999 f-fA">{{ course.buyCount }} students</i>
                    </span>
                  </div>
                </li>
              </ul>
              <div class="clear"/>
            </article>
            <section class="tac pt20">
              <a href="/course/" title="Load More" class="comm-btn c-btn-2">See All Courses</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /popular courses -->
      <!-- popular instrucotrs -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">Popular Instructors</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                        <img :src="teacher.avatar" :alt="teacher.name" height="142">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name" class="fsize18 c-666">{{ teacher.name }}</a>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"/>
            </article>
            <section class="tac pt20">
              <a href="teacher" title="All instructors" class="comm-btn c-btn-2">See All Instructors</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /popular instructors -->
    </div>
  </div>
</template>

<script>
import indexApi from '~/api/index'
export default {

  async asyncData() {
    // banner data
    const bannerResponse = await indexApi.getTopBannerAdList()
    const topBannerAdList = bannerResponse.data.items
    // instructor and courses info for homepage
    const indexDataResponse = await indexApi.getIndexData()
    const courseList = indexDataResponse.data.courseList
    const teacherList = indexDataResponse.data.teacherList

    return {
      topBannerAdList,
      teacherList,
      courseList
    }
  },

  data() {
    return {
      swiperOption: {
        // page break
        pagination: {
          el: '.swiper-pagination'
        },
        // nav
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>
