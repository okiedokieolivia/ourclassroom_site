<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">SIGN IN</a>
      <span>|</span>
      <a href="/register">SIGN UP</a>
    </div>

    <div class="sign-up-container">
      <form action="register">
        <div class="input-prepend restyle">
          <input
            v-model="user.email"
            type="text"
            placeholder="Email">
          <i class="iconfont icon-email1"/>
        </div>
        <div class="input-prepend">
          <input
            v-model="user.password"
            type="password"
            placeholder="Password">
          <i class="iconfont icon-password"/>
        </div>
        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="Login"
            @click="submitLogin()">
        </div>
      </form>
      <!-- continue with google -->
      <div class="more-sign">
        <h6>Continue with Google</h6>
        <ul>
          <!-- remove target="_blank" -->
          <li><a id="google" class="google" href="http://47.89.235.2:9110/api/ucenter/google/login"><i class="iconfont icon-google"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import cookie from 'js-cookie'
import loginApi from '~/api/login'

export default {
  layout: 'sign',

  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    submitLogin() {
      loginApi.submitLogin(this.user).then(response => {
        cookie.set('ourclassroom_jwt_token', response.data.token, { domain: 'localhost' })
        // locate to the last visited page
        const domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port

        if (document.referrer === '' || document.referrer.indexOf(domain) === -1 || document.referrer.indexOf('register') !== -1 || document.referrer.indexOf('login') !== -1 || document.referrer.indexOf('ucenter') !== -1) {
          window.location.href = '/'
        } else {
          window.location.href = document.referrer
        }
        // window.location.href = '/'
      })
    }
  }
}
</script>
