<template>
  <div class="mv-item">
    <div class="mv-img" @click="toMV">
      <img :src="data.pic" />
      <div class="mv-cnt">
        <i class="iconfont icon-cnt"></i>{{ ellipsis(data.mvPlayCnt) }}
      </div>
      <div class="mv-time">{{ data.songTimeMinutes }}</div>
      <div class="mv-shadow"></div>
    </div>
    <div class="mv-name">
      <span @click="toMV">{{ data.name }}</span>
    </div>
    <div class="mv-artist">
      <span @click="toSinger">{{ data.artist }}</span>
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
    toMV() {
      this.$router.push({ name: "Mv", query: { rid: this.data.id } });
    },
    toSinger() {
      this.$router.push({
        name: "SingerDetail",
        query: { aid: this.data.artistid },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mv {
  &-item {
    width: 18.5%;
    margin: 20px 0;
  }

  &-img {
    position: relative;
    color: #fff;
    font-size: 15px;
    overflow: hidden;
		cursor: pointer;

    img {
      width: 100%;
      cursor: pointer;
      display: block;
      transition: 0.5s;
    }

    img:hover {
      transform: scale(1.1);
    }
  }

  &-shadow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.3));
  }

  &-cnt {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 1;
  }

  &-time {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 1;
  }

  &-name {
    font-size: 20px;
    padding: 8px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    :hover {
      font-weight: bold;
    }
  }

  &-artist {
    font-size: 15px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    :hover {
      color: #000;
    }
  }
}
</style>