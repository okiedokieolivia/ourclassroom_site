<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- course list -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">Courses</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">Categories</span>
            </dt>
            <dd class="c-s-dl-li">
              <!-- primary category -->
              <ul class="clearfix">
                <li :class="{current:!$route.query.subjectParentId}">
                  <a
                    title="all"
                    href="javascript:void(0);"
                    @click="searchPrimarySubject('')"
                  >All</a>
                </li>
                <li
                  v-for="item in subjectNestedList"
                  :key="item.id"
                  :class="{current:$route.query.subjectParentId===item.id}">
                  <a
                    :title="item.title"
                    href="javascript:void(0);"
                    @click="searchPrimarySubject(item.id)"
                  >{{ item.title }}</a>
                </li>

              </ul>
              <!-- /primary category -->
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"/>
            </dt>
            <dd class="c-s-dl-li">
              <!-- secondary category -->
              <ul v-if="$route.query.subjectParentId" class="clearfix">
                <li :class="{current:!$route.query.subjectId}">
                  <a
                    title="All"
                    href="javascript:void(0);"
                    @click="searchSecondarySubject('')"
                  >All</a>
                </li>
                <li
                  v-for="item in subSubjectList"
                  :key="item.id"
                  :class="{current:$route.query.subjectId===item.id}"
                >
                  <a
                    :title="item.title"
                    href="javascript:void(0);"
                    @click="searchSecondarySubject(item.id)"
                  >{{ item.title }}</a>
                </li>

              </ul>
              <!-- /secondary category -->
            </dd>
          </dl>
          <div class="clear"/>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <!-- sort -->
            <ol class="js-tap clearfix">
              <li :class="{'current bg-purple':searchObj.buyCountSort}">
                <a
                  title="Most Popular"
                  href="javascript:void(0);"
                  @click="searchBuyCount"
                >Most Popular
                  <!-- <i>👇</i> -->
                </a>
              </li>
              <li :class="{'current bg-purple':searchObj.gmtCreateSort}">
                <a
                  title="Newest"
                  href="javascript:void(0);"
                  @click="searchGmtCreate()"
                >Newest
                  <!-- <i>👇</i> -->
                </a>
              </li>
              <li :class="{'current bg-purple':searchObj.priceSort}">
                <a
                  v-if="!searchObj.priceSort"
                  title="Price"
                  href="javascript:void(0);"
                  @click="searchPrice(1)"
                >Price
                  <i/>
                </a>
                <!-- order by price asc -->
                <a
                  v-if="searchObj.priceSort == 1"
                  title="Price"
                  href="javascript:void(0);"
                  @click="searchPrice(2)"
                >Price
                  <i>👆</i>
                </a>
                <!-- order by price desc -->
                <a
                  v-if="searchObj.priceSort == 2"
                  title="Price"
                  href="javascript:void(0);"
                  @click="searchPrice(1)"
                >Price
                  <i>👇</i>
                </a>
              </li>
            </ol>
            <!-- /sort -->
          </section>
        </div>
        <div class="mt40">
          <!-- /alternative: no data -->
          <section v-if="courseList.length===0" class="no-data-wrap">
            <em class="icon30 no-data-ico2">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">Oops! No course found...</span>
          </section>
          <!-- /alternative: no data -->

          <!-- courses -->
          <article v-if="courseList.length>0" class="comm-course-list">
            <ul id="bna" class="of">
              <li v-for="item in courseList" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" :alt="item.title" class="img-responsive">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="Start Learning" class="comm-btn c-btn-1">Start Learning</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{ item.title }}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span v-if="Number(item.price) === 0" class="fr jgTag bg-blue">
                      <i class="c-fff fsize12 f-fA">Free</i>
                    </span>
                    <span v-else class="fr jgTag ">
                      <i class="c-blue fsize12 f-fA"> ${{ item.price }}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ item.viewCount }} views</i>
                      |
                      <i class="c-999 f-fA">{{ item.buyCount }} students</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"/>
          </article>
          <!-- /courses -->
        </div>
      </section>
    </section>
    <!-- /course list  -->
  </div>
</template>

<script>
import courseApi from '~/api/course'
import querystring from 'querystring'

export default {
  async asyncData(page) {
    const searchObj = {}
    const query = page.route.query
    searchObj.subjectId = query.subjectId || ''
    searchObj.subjectParentId = query.subjectParentId || ''
    searchObj.buyCountSort = query.buyCountSort || ''
    searchObj.priceSort = query.priceSort || '' // 1: low to high 2: high to low
    searchObj.gmtCreateSort = query.gmtCreateSort || ''

    const courseListResponse = await courseApi.getList(searchObj)
    const courseList = courseListResponse.data.courseList

    // get subject categories
    const subjectNestedListResponse = await courseApi.getSubjectNestedList()
    const subjectNestedList = subjectNestedListResponse.data.items

    let subSubjectList = []
    for (let i = 0; i < subjectNestedList.length; i++) {
      if (subjectNestedList[i].id === searchObj.subjectParentId) {
        subSubjectList = subjectNestedList[i].children
      }
    }

    return {
      courseList,
      subjectNestedList,
      subSubjectList, // secondary subjects
      searchObj
    }
  },

  methods: {

    // select the primary subject
    searchPrimarySubject(subjectParentId) {
      window.location = 'course?subjectParentId=' + subjectParentId
    },

    // select the secondary subject
    searchSecondarySubject(subjectId) {
      // window.location = 'course?subjectId=' + subjectId + '&subjectParentId=' + this.searchObj.subjectParentId
      const queryObj = {
        subjectId: subjectId,
        subjectParentId: this.searchObj.subjectParentId
      }
      const querys = querystring.stringify(queryObj)
      window.location = 'course?' + querys
    },

    // order by buy_count desc
    searchBuyCount() {
      // window.location = 'course?buyCountSort=1' + '&subjectId=' + this.searchObj.subjectId + '&subjectParentId=' + this.searchObj.subjectParentId
      const queryObj = {
        subjectId: this.searchObj.subjectId,
        subjectParentId: this.searchObj.subjectParentId,
        buyCountSort: 1
      }
      const querys = querystring.stringify(queryObj)
      window.location = 'course?' + querys
    },

    searchGmtCreate() {
      const queryObj = {
        subjectId: this.searchObj.subjectId,
        subjectParentId: this.searchObj.subjectParentId,
        gmtCreateSort: 1
      }
      const querys = querystring.stringify(queryObj)
      window.location = 'course?' + querys
    },

    searchPrice(priceSort) {
      const queryObj = {
        subjectId: this.searchObj.subjectId,
        subjectParentId: this.searchObj.subjectParentId,
        priceSort: priceSort
      }
      const querys = querystring.stringify(queryObj)
      window.location = 'course?' + querys
    }
  }
}
</script>
