<template>
  <div class="album-item">
    <div class="album-img">
      <img :src="data.pic" @click="toAlbum" />
    </div>
    <div class="album-name">
      <span v-html="data.album" @click="toPlaylistDetail"></span>
    </div>
    <div class="album-date">
      <div>{{ data.releaseDate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    toAlbum() {
      this.$router.push({
        name: "Album",
        query: { aid: this.data.albumid },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.album {
  &-item {
    width: 17%;
		margin: 20px 1.5%;
  }

  &-img {
    overflow: hidden;
    margin-bottom: 10px;
    border-radius: 5px;

    img {
      width: 100%;
      cursor: pointer;
      transition: 0.5s;
      display: block;
    }
    img:hover {
      transform: scale(1.1);
    }
  }

  &-name {
    font-size: 17px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 2.5em;
    margin-bottom: 5px;

    :hover {
      font-weight: bold;
    }
  }

  &-date {
    display: flex;
    align-items: center;
    color: #999;
  }
}
</style>