<template>
  <div>
    <section v-if="videoUrl" class="video-container">
      <video class="video" width="720px" height="480px" controls preload="none" poster="~assets/img/welcome_logo.png">
        <source
          :src="videoUrl"
          type="video/mp4">
      </video>
    </section>

    <section v-if="!videoUrl" class="no-data-wrap">
      <em class="icon30 no-data-ico2">&nbsp;</em>
      <span class="c-666 fsize14 ml10 vam">Oops! The video is not available yet...</span>
    </section>
  </div>

</template>

<script>
import courseApi from '~/api/course'
export default {
  async asyncData(page) {
    const vid = page.route.params.vid
    let videoUrl = ''
    if (vid && vid !== 'null') {
      const response = await courseApi.getPlayAuth(vid)
      videoUrl = response.data.playAuth
    }

    return {
      vid: vid,
      videoUrl: videoUrl
    }
  }

}
</script>

<style>
.video-container{
    /* width: 800px;
    height: 500px; */
    border: solid;
    text-align: center;
}

.video{
    /* width: 100%;
    height: 100%; */
    background:transparent url("~assets/img/video_poster.png") 50% 50% no-repeat;
    background-size: 800px 500px;
    /* -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-size:cover; */
}
</style>
