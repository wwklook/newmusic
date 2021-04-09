<template>
  <div class="artist">
    <h1>收藏的歌单</h1>
    <div class="artist-list">
      <singer-item
        v-for="item in artist_list"
        :key="item.data.id"
        :data="item.data"
      />
    </div>
  </div>
</template>

<script>
import singerItem from "@/components/singerItem";
export default {
  components: {
    singerItem,
  },
  computed: {
    artist_list() {
      return this.$store.state.singer_list;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 20px;
}
.artist {
  max-width: 1500px;
  margin: 0 auto;

  &-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
}
</style>