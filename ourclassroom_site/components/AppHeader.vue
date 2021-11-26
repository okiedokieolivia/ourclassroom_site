<template>
  <!-- header -->
  <header id="header">
    <section class="container">
      <h1 id="logo">
        <a href="#" title="Ourclassroom">
          <img src="~/assets/img/welcome_logo.png" width="100%" alt="Ourclassroom">
        </a>
      </h1>
      <div class="h-r-nsl">
        <ul class="nav">
          <router-link to="/" tag="li" active-class="current" exact>
            <a>Homepage</a>
          </router-link>
          <router-link to="/course" tag="li" active-class="current">
            <a>Courses</a>
          </router-link>
          <router-link to="/teacher" tag="li" active-class="current">
            <a>Instructors</a>
          </router-link>
          <!-- <router-link to="/article" tag="li" active-class="current">
            <a>Articles</a>
          </router-link>
          <router-link to="/question" tag="li" active-class="current">
            <a>Forum</a>
          </router-link> -->
        </ul>
        <!-- / nav -->
        <ul class="h-r-login">
          <li v-if="!userInfo" id="no-login">
            <a href="/login" title="login">
              <!-- <em class="icon18 login-icon">&nbsp;</em> -->
              <em class="icon24-iconfont iconfont icon-user"/>
              <span class="vam ml5">Login</span>
            </a>
            |
            <a href="/register" title="signup">
              <span class="vam ml5">Sign Up</span>
            </a>
          </li>
          <!-- class undis: hide the element -->
          <!-- <li v-if="userInfo" id="is-login-one" class="mr10">
            <a id="headerMsgCountId" href="#" title="message">
              <em class="icon18 news-icon">&nbsp;</em>
            </a>
            <q class="red-point">&nbsp;</q>
          </li> -->
          <!-- class undis: hide the element -->
          <li v-if="userInfo" id="is-login-two" class="h-r-user">
            <a href="/ucenter" title>
              <img
                :src="userInfo.avatar"
                width="30"
                height="30"
                class="vam picImg"
                alt
              >
              <span id="userName" class="vam disIb">{{ userInfo.username }}</span>
            </a>
            <a href="javascript:void(0)" title="Logout" class="ml5" @click="logout()">Logout</a>
          </li>

        </ul>
        <aside class="h-r-search">
          <form action="#" method="post">
            <label class="h-r-s-box">
              <input type="text" placeholder="What do you want to learn?" name="queryCourse.courseName" value>
              <button type="submit" class="s-btn">
                <em class="icon18">&nbsp;</em>
              </button>
            </label>
          </form>
        </aside>
      </div>
      <aside class="mw-nav-btn">
        <div class="mw-nav-icon"/>
      </aside>
      <div class="clear"/>
    </section>
  </header>
  <!-- /header -->
</template>

<script>
import loginApi from '~/api/login'
import cookie from 'js-cookie'
import '~/assets/css/iconfont.css'

export default {

  data() {
    return {
      userInfo: null
    }
  },

  created() {
    this.getUserInfo()
  },

  mounted() {
    // get the jwt token
    this.token = this.$route.query.token
    if (this.token) {
      // save the token into the cookie
      cookie.set('ourclassroom_jwt_token', this.token, { domain: 'localhost' })
      // redirect: remove the cookie in the route
      // note that since the window object cannot be visited in created function, we should write the redirect function in the mounted function
      window.location.href = '/'
    }
  },

  methods: {
    getUserInfo() {
      if (!cookie.get('ourclassroom_jwt_token')) {
        return
      }
      loginApi.getLoginInfo().then(response => {
        this.userInfo = response.data.userInfo
      })
    },

    logout() {
      // remove the cookie
      cookie.set('ourclassroom_jwt_token', '', { domain: 'localhost' })
      window.location.href = '/'
    }
  }
}
</script>
