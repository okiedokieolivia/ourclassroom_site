<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- instructor intro -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">Abount Me</span>
        </h2>
      </header>
      <div class="t-infor-wrap">
        <!-- instructor basic info -->
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">
            <section class="t-infor-pic">
              <img :src="teacher.avatar" :alt="teacher.name">
            </section>
            <h3 class="hLh30">
              <span class="fsize24 c-333">{{ teacher.name }}
                &nbsp;
                {{ teacher.level===1?'Principal Instructor':'Lead Instructor' }}
              </span>
            </h3>
            <section class="mt10">
              <span class="t-tag-bg">{{ teacher.intro }}</span>
            </section>
            <section class="t-infor-txt">
              <p class="mt20">{{ teacher.career }}</p>
            </section>
            <div class="clear"/>
          </div>
        </section>
        <!-- /instructor basic info -->
        <div class="clear"/>
      </div>
      <section class="mt30">
        <div>
          <header class="comm-title all-teacher-title c-course-content">
            <h2 class="fl tac">
              <span class="c-333">My Courses</span>
            </h2>
            <section class="c-tab-title">
              <a href="javascript: void(0)">&nbsp;</a>
            </section>
          </header>
          <!-- no data found -->
          <section v-if="courseList.length===0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">Oops! No course found so far</span>
          </section>
          <!-- /no data found-->

          <!-- course list-->
          <article class="comm-course-list">
            <ul class="of">
              <li v-for="course in courseList" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="Start Learning" target="_blank" class="comm-btn c-btn-1">Start Learning</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      :href="'/course/'+course.id"
                      :title="course.title"
                      class="course-title fsize18 c-333">{{ course.title }}</a>
                  </h3>
                </div>
              </li>
            </ul>
            <div class="clear"/>
          </article>
          <!-- /course list-->
        </div>
      </section>
    </section>
    <!-- /instructor intro -->
  </div>
</template>

<script>
import teacherApi from '~/api/teacher'

export default {
  async asyncData(page) {
    const response = await teacherApi.getById(page.route.params.id)

    return {
      teacher: response.data.teacher,
      courseList: response.data.courseList
    }
  }
}
</script>
