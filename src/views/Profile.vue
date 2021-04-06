<template>
  <div class="profile">
    <el-container>
      <el-aside width="200px">
        <div class="title">
          <h2>我的音乐</h2>
          <div>
            <span :class="{ selected: name === 'Love' }" @click="toLove"
              >我喜欢</span
            >
          </div>
        </div>
        <div class="title">
          <h2>我的歌单</h2>
          <div>
            <span
              :class="{
                selected: index === group_index && name === 'Rcm',
              }"
              v-for="(item, index) in likegroup"
              :key="item.group_id"
              @click="toLike(index)"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="title">
          <h2>我的收藏</h2>
          <div>
            <span
              :class="{
                selected: name === 'LikeRcm',
              }"
              @click="toLikeRcm"
              >歌单</span
            >
          </div>
          <div>
            <span
              :class="{
                selected: name === 'LikeSinger',
              }"
              @click="toLikeSinger"
              >歌手</span
            >
          </div>
          <div>
            <span
              :class="{
                selected: name === 'LikeAlbum',
              }"
              @click="toLikeAlbum"
              >专辑</span
            >
          </div>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      group_index: 0,
    };
  },
  computed: {
    likegroup() {
      return this.$store.state.likegroup;
    },
    name() {
      return this.$route.name;
    },
  },
  methods: {
    toLike(index) {
      this.$router.push("/profile/rcm?index=" + index);
    },
    toLove() {
      this.$router.push("/profile/love");
    },
    toLikeSinger() {
      this.$router.push("/profile/like_singer");
    },
    toLikeAlbum() {
      this.$router.push("/profile/like_album");
    },
    toLikeRcm() {
      this.$router.push("/profile/like_rcm");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
	max-width: 1500px;
	margin: 0 auto;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: unset;
}
</style>
