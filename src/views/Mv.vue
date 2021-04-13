<template>
  <div class="mv">
    <div class="mv-content">
      <video :src="mv_url" controls autoplay></video>
      <div class="control"></div>
    </div>
    <div class="mv-info">
      <div class="mv-name">
        {{ mv_info.name }}<span class="mv-artist">-{{ mv_info.artist }}</span>
      </div>
      <div class="mv-cnt">
        <i class="iconfont icon-cnt"></i
        ><span>播放量: {{ mv_info.mvPlayCnt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mvInfo } from "@/network/api.js";
export default {
  data() {
    return {
      mv_info: {},
      mv_url: "",
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.name !== "Mv") return;
        mvInfo(this.$route.query.rid).then((res) => {
          this.mv_info = res.data.info;
          this.mv_url = res.data.url;
        });
      },
    },
  },
  created() {
    mvInfo(this.$route.query.rid).then((res) => {
      this.mv_info = res.data.info;
      this.mv_url = res.data.url;
    });
  },
};
</script>

<style lang="scss" scoped>
.mv {
  background-color: #000;

  &-content {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
  }

  &-info {
    color: #fff;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
  }

  &-name {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  &-artist {
    font-size: 24px;
  }
}

video {
  width: 100%;
}

video:focus {
  outline: none;
}
</style>