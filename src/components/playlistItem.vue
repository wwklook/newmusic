<template>
  <div class="rcm-item">
    <div class="rcm-img">
      <img :src="data.img" @click="toPlaylistDetail" />
    </div>
    <div class="rcm-name">
      <span @click="toPlaylistDetail">{{ data.name }}</span>
    </div>
    <div class="rcm-cnt">
      <i class="iconfont icon-cnt"></i>
      <div>{{ ellipsis(data.listencnt) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    ellipsis() {
      return function (num) {
        if (num >= 10000) {
          num = (num / 10000).toFixed(1) + "万";
        }
        return num;
      };
    },
  },
  methods: {
    toPlaylistDetail() {
      this.$router.push({
        name: "PlaylistDetail",
        query: { pid: this.data.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.rcm {
  &-item {
    width: 17%;
		margin: 0 1.5% 40px;
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

  &-cnt {
    display: flex;
    align-items: center;
    color: #999;

    i {
      margin-right: 5px;
    }
  }
}
</style>