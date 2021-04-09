<template>
  <div class="artist-item">
    <img
      :src="
        data.pic ||
        'https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png'
      "
      @click="toSingerDetail"
    />
    <div class="artist-name" >
      <span style="cursor: pointer;" v-html="data.name " @click="toSingerDetail"></span>
    </div>
    <div>{{ data.musicNum }}首歌曲</div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    toSingerDetail() {
      this.$router.push({
        name: "SingerDetail",
        query: { aid: this.data.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.artist {
  &-item {
    width: 12%;
		padding: 1.2%;
		margin: 20px 1.1%;
    text-align: center;

    img {
      width: 100%;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  &-name {
    text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
  }
}
</style>