<template>
  <div>
		<h1>收藏的专辑</h1>
    <div class="album-list">
      <album-item v-for="item in album_list" :key="item.data.albumid" :data="item.data" />
    </div>
  </div>
</template>

<script>
import albumItem from "@/components/albumItem.vue";
export default {
  components: {
    albumItem,
  },
  computed: {
    album_list() {
      return this.$store.state.album_list;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 20px;
}

.album-list {
  display: flex;
  flex-wrap: wrap;
	margin-top: 20px;
}
</style>