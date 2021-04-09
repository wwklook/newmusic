<template>
  <div>
    <div class="title">
      <h1>{{ groupinfo.name }}</h1>
      <div class="playall" @click="playAll">播放全部</div>
    </div>
    <song-header></song-header>
    <likesong-item
      v-for="(item, index) in likesong"
      :key="item.rid"
      :data="item.data"
      :num="index"
    ></likesong-item>
  </div>
</template>

<script>
import likesongItem from "@/components/likesongItem.vue";
import songHeader from "@/components/songHeader.vue";
import { getLike } from "@/network/profile.js";
export default {
  components: {
    likesongItem,
    songHeader,
  },
  data() {
    return {
      likesong: [],
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.name !== "Rcm") return;
        this.getLikeSong();
      },
    },
  },
  computed: {
    groupinfo() {
			if (this.$store.state.likegroup.length === 0) return {}
      return this.$store.state.likegroup[this.$route.query.index] || {};
    },
  },
  created() {
    this.getLikeSong();
		this.$bus.on("getLikeSong", this.getLikeSong)
  },
  methods: {
    playAll() {
      this.$store.commit(
        "changePlaylist",
        this.likesong.map((value) => {
          return value.data;
        })
      );
      this.$bus.emit("playMusic");
    },
    getLikeSong() {
      if (!this.$route.query.gid) return;
      getLike(this.$route.query.gid).then((res) => {
        this.likesong = res.data.like_song;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
