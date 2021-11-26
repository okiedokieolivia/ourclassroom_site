<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- instructors -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">Instructors</span>
        </h2>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- no data found-->
          <section v-if="items.length===0" class="no-data-wrap">
            <em class="icon30 no-data-ico2">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">Oops! No Data Found</span>
          </section>
          <!-- no data found -->

          <!-- list -->
          <article v-if="items.length>0" class="i-teacher-list">
            <ul class="of">
              <li v-for="(item, index) in items" :key="index">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :title="item.name" :href="'/teacher/'+item.id">
                      <img :src="item.avatar" :alt="item.name" width="142">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :title="item.name" :href="'/teacher/'+item.id" class="fsize18 c-666">{{ item.name }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999" >{{ item.intro }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ item.career }}</p>
                  </div>
                </section>
              </li>

            </ul>
            <div class="clear"/>
          </article>
          <!-- /list-->
        </div>
      </section>
    </section>
    <!-- /instructors -->
  </div>
</template>

<script>
import teacherApi from '~/api/teacher'
export default {
  asyncData() {
    return teacherApi.getList().then(response => {
      return {
        items: response.data.items
      }
    })
  }

}
</script>
