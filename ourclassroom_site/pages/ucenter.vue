<template>
  <!-- content -->
  <div class="bg-fa of">
    <section class="container">
      <div class="u-body mt40">
        <menu class="col-3 fl uMenu">
          <header class="comm-title"><h2 class="fl tac"><span class="c-333">Welcome!</span></h2></header>
          <dl>
            <dd class="u-m-dd">
              <ul>
                <li>
                  <span>My Account</span>
                  <ol>
                    <!-- <li>
                      <a href="uc_base.html" title="">
                        Basics
                      </a>
                    </li>
                    <li>
                      <a href="uc_avatar.html" title="">
                        Photo
                      </a>
                    </li>
                    <li>
                      <a href="uc_password.html" title="">
                        Password
                      </a>
                    </li> -->
                    <router-link to="/ucenter/order" tag="li" active-class="current" exact>
                      <a>Orders</a>
                    </router-link>
                  </ol>
                </li>
              </ul>
              <ul>
                <li>
                  <span>My Learning</span>
                  <ol>
                    <!-- <router-link to="/ucenter/mycourses" tag="li" active-class="current" exact>
                      <a>All Courses</a>
                    </router-link> -->
                    <router-link to="/ucenter/wishlist" tag="li" active-class="current" exact>
                      <a>Wishlist</a>
                    </router-link>
                  </ol>
                </li>
              </ul>

            </dd>
          </dl>
        </menu>

        <nuxt-child />

        <div class="clear"/>
      </div>
    </section>
  </div>
  <!-- /content -->
</template>
<script>

export default {

}
</script>

