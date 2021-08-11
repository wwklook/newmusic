<template>
  <div class="singer">
    <div class="singer-detail">
      <img class="singer-pic" :src="singer_info.pic300" />
      <div class="singer-info">
        <div class="singer-name" v-html="singer_info.name"></div>
        <div class="singer-data">
          <span>单曲：{{ singer_info.musicNum }}</span>
          <span>专辑：{{ singer_info.albumNum }}</span>
          <span>MV：{{ singer_info.mvNum }}</span>
          <span>粉丝：{{ singer_info.artistFans }}</span>
        </div>
        <div class="singer-other">
          <span v-html="'英文名：' + singer_info.aartist"></span>
          <span>国籍：{{ singer_info.country }}</span>
          <span>语言：{{ singer_info.language }}</span>
          <span>出生地：{{ singer_info.birthplace }}</span>
          <span>星座：{{ singer_info.constellation }}</span>
        </div>
        <div class="btn">
          <div class="play-all" @click="playAll" v-if="name === 'SingerMusic'">
            <i class="iconfont icon-cnt"></i>播放全部
          </div>
          <div class="like" @click="like">
            <i class="iconfont" :class="likeIcon"></i>收藏
          </div>
        </div>
      </div>
    </div>
    <div class="singer-page">
      <span :class="{ selected: name === 'SingerMusic' }" @click="toSingerMusic"
        >单曲</span
      >
      <span :class="{ selected: name === 'SingerAlbum' }" @click="toSingerAlbum"
        >专辑</span
      >
      <span :class="{ selected: name === 'SingerMv' }" @click="toSingerMv"
        >MV</span
      >
      <span :class="{ selected: name === 'SingerInfo' }" @click="toSingerInfo"
        >简介</span
      >
    </div>
    <router-view :singer_info="singer_info"></router-view>
  </div>
</template>

<script>
import { artist } from "@/network/api.js";
import { addSinger, delSinger } from "@/network/profile";
export default {
  computed: {
    name() {
      return this.$route.name;
    },
    islike() {
      return this.$store.state.singer_id.indexOf(this.aid + "") !== -1;
    },
    likeIcon() {
      return this.islike ? "icon-like" : "icon-unlike";
    },
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.name !== "SingerMusic") return;
        this.aid = newVal.query.aid;
        artist(this.aid).then((res) => {
          this.singer_info = res.data;
        });
      },
    },
  },
  data() {
    return {
      singer_info: [],
      aid: "",
    };
  },
  created() {
    this.aid = this.$route.query.aid;
    artist(this.aid).then((res) => {
      this.singer_info = res.data;
    });
  },
  methods: {
    toSingerMusic() {
      this.$router.push({ name: "SingerMusic", query: { aid: this.aid } });
    },
    toSingerAlbum() {
      this.$router.push({ name: "SingerAlbum", query: { aid: this.aid } });
    },
    toSingerMv() {
      this.$router.push({ name: "SingerMv", query: { aid: this.aid } });
    },
    toSingerInfo() {
      this.$router.push({ name: "SingerInfo", query: { aid: this.aid } });
    },
    playAll() {
      this.$bus.emit("playAllSingerMusic");
    },
    like() {
      if (!this.$store.state.isLogin) {
        this.$message({
          message: "请先登录！",
          type: "warning",
        });
        return;
      }
      if (this.islike) {
        this.$confirm(
          `是否将《${this.singer_info.name}》从“收藏的歌手”中移除？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            delSinger(this.aid).then(() => {
              let index = this.$store.state.singer_id.indexOf(this.aid + "");
              this.$store.commit("delSinger", index);
              this.$message({
                message: `已从“收藏的歌手”中移除《${this.singer_info.name}》！`,
                type: "success",
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      } else {
        addSinger(this.singer_info).then(() => {
          this.$store.commit("addSinger", this.singer_info);
          this.$message({
            message: `已添加《${this.singer_info.name}》至“收藏的歌手”`,
            type: "success",
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.singer {
  max-width: 1400px;
  margin: 0 auto;
  &-detail {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 42px 0;
  }
  &-pic {
    width: 230px;
    margin-left: 100px;
    border-radius: 50%;
  }
  &-info {
    margin-left: 50px;
  }
  &-name {
    font-size: 32px;
    font-weight: bold;
  }
  &-data {
    font-size: 18px;
    margin: 16px 0;
    color: #999;

    span {
      margin-right: 40px;
    }
  }
  &-other {
    font-size: 18px;
    margin: 16px 0;
    color: #999;

    span {
      margin-right: 30px;
    }
  }
}

.btn {
  display: flex;
  margin: 20px 0;

  div {
    font-size: 17px;
    margin-right: 20px;
    padding: 10px 30px;
    background-color: #eee;
    border-radius: 20px;
    cursor: pointer;
  }

  i {
    margin-right: 5px;
  }
}

.singer-page {
  margin-top: 20px;
  padding: 20px;
  span {
    font-size: 24px;
    margin-right: 30px;
  }
}
</style>
