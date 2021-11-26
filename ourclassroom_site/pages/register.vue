<template>
  <div class="main">
    <div class="title">
      <a href="/login">SIGN IN</a>
      <span>|</span>
      <a class="active" href="/register">SIGN UP</a>
    </div>

    <div class="sign-up-container">
      <form action="register">
        <div class="input-prepend restyle">
          <input
            v-model="member.username"
            type="text"
            placeholder="Username">
          <i class="iconfont icon-user"/>
        </div>
        <div class="input-prepend restyle no-radius">
          <input
            v-model="member.email"
            type="text"
            placeholder="Email">
          <i class="iconfont icon-email1"/>
        </div>
        <!-- <div class="input-prepend restyle no-radius" style="position:relative">
          <input
            v-model="member.code"
            type="text"
            placeholder="验证码">
          <i class="iconfont icon-yanzhengma"/>
          <a
            href="javascript:"
            type="button"
            style="position:absolute;right: 10px;top: 15px;"
            @click="getCodeFun()">{{ codeText }}</a>
        </div> -->
        <div class="input-prepend">
          <input
            v-model="member.password"
            type="password"
            placeholder="Password">
          <i class="iconfont icon-password"/>
        </div>
        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="Create Account"
            @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
          By continuing, you agree to Ourclassroom’s Terms of Service and confirm that you have read Ourclassroom’s Privacy Policy.
          <br>
          <a target="_blank" href="#">Terms of Service</a>
          and
          <a target="_blank" href="#">Privacy Policy</a>
        </p>
      </form>
      <!-- continue with google -->
      <div class="more-sign">
        <h6>Continue with Google</h6>
        <ul>
          <!-- remove the target="_blank" -->
          <li><a id="google" class="google" href="http://47.89.235.2:9110/api/ucenter/google/login"><i class="iconfont icon-google"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import registerApi from '~/api/register'
// import cookie from 'js-cookie'

export default {
  layout: 'sign',
  data() {
    return {
      member: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {

    // register
    submitRegister() {
      if (!this.checkUsername(this.member.username)) {
        this.$message.error('Invalid Username. Username should be between 4 to 16 characters long, and only contain alphanumeric characters, underscore(_) and hyphen(-)')
      } else if (!this.checkEmail(this.member.email)) {
        this.$message.error('Invalid email. Please enter email as name@email.com')
      } else if (!this.checkPassword(this.member.password)) {
        this.$message.error('Invalid password. Mininum 8 characters required, at least 1 letter and 1 number')
      } else {
        registerApi.register(this.member).then(response => {
          this.$message.success(response.message)
          this.$router.push({ path: 'login' })
        })
      }
    },

    checkUsername(username) {
      const pattern = /^[a-zA-Z0-9_-]{4,16}$/
      return pattern.test(username)
    },

    checkPassword(password) {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      return pattern.test(password)
    },

    checkEmail(email) {
      const pattern = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.\w+$/
      return pattern.test(email)
    }
  }
}
</script>

