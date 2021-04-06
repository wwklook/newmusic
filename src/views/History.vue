<template>
  <div class="history">
    <div class="title">
      <h1>播放历史</h1>
      <div class="playall" @click="playAll">播放全部</div>
    </div>
    <song-header></song-header>
    <history-item
      v-for="(item, index) in historyList"
      :key="item.rid"
      :data="item"
      :num="index"
    ></history-item>
  </div>
</template>

<script>
import historyItem from "@/components/historyItem.vue";
import songHeader from "@/components/songHeader.vue";
export default {
  components: {
    historyItem,
    songHeader,
  },
  data() {
    return {};
  },
  computed: {
    historyList() {
      return this.$store.state.historyList;
    },
  },
  methods: {
    playAll() {
      this.$store.commit("changePlaylist", this.historyList);
      this.$bus.emit("playMusic");
    },
  },
};
</script>

<style lang="scss" scoped>
.history {
	max-width: 1500px;
	margin: 0 auto;
}
</style>
