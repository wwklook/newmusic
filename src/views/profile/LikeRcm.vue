<template>
  <div class="playlist">
    <h1>收藏的歌单</h1>
    <div class="rcm">
      <playlist-item
        v-for="item in playlist"
        :key="item.data.id"
        :data="item.data"
      />
    </div>
  </div>
</template>

<script>
import playlistItem from "@/components/playlistItem";

export default {
  components: {
    playlistItem,
  },
  computed: {
    playlist() {
      return this.$store.state.rcm_list;
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  max-width: 1500px;
  margin: 0 auto;
}

h1 {
	margin-top: 20px;
}

.rcm {
  display: flex;
  flex-wrap: wrap;
	margin-top: 20px;
}
</style>

