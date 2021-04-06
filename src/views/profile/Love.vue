<template>
  <div>
    <div class="title">
      <h1>我喜欢</h1>
      <div class="playall" @click="playAll">播放全部</div>
    </div>
    <song-header></song-header>
    <song-item
      v-for="(item, index) in ilovelist"
      :key="item.rid"
      :data="item.data"
      :num="index"
    ></song-item>
  </div>
</template>

<script>
import songItem from "@/components/songItem.vue";
import songHeader from "@/components/songHeader.vue";
export default {
  components: {
    songItem,
    songHeader,
  },
  data() {
    return {};
  },
  computed: {
    ilovelist() {
      return this.$store.state.ilovelist;
    },
  },
  methods: {
    playAll() {
      this.$store.commit(
        "changePlaylist",
        this.ilovelist.map((value) => {
          return value.data;
        })
      );
      this.$bus.emit("playMusic");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
