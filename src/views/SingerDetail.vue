<template>
  <div class="singer">
    <div class="singer-detail">
      <img class="singer-pic" :src="singer_info.pic300" />
      <div class="singer-info">
        <div class="singer-name">{{ singer_info.name }}</div>
        <div class="singer-data">
          <span>单曲：{{ singer_info.musicNum }}</span>
          <span>专辑：{{ singer_info.albumNum }}</span>
          <span>MV：{{ singer_info.mvNum }}</span>
          <span>粉丝：{{ singer_info.artistFans }}</span>
        </div>
        <div class="singer-other">
          <span>英文名：{{ singer_info.aartist }}</span>
          <span>国籍：{{ singer_info.country }}</span>
          <span>语言：{{ singer_info.language }}</span>
          <span>出生地：{{ singer_info.birthplace }}</span>
          <span>星座：{{ singer_info.constellation }}</span>
        </div>
        <div class="btn">
          <div class="play-all" @click="playAll">
            <i class="iconfont icon-cnt"></i>播放全部
          </div>
          <div class="like" @click="like">
            <i class="iconfont" :class="likeIcon"></i>收藏
          </div>
        </div>
      </div>
    </div>
    <div class="singer-page">
      <span :class="{ selected: name === 'SingerDetail' }">单曲</span>
      <span>专辑</span>
      <span>MV</span>
      <span>简介</span>
    </div>
    <div class="song-list">
      <song-header></song-header>
      <song-item
        v-for="(item, index) in song_list"
        :key="item.rid"
        :data="item"
        :num="index"
      ></song-item>
      <el-pagination
        style="text-align: center; margin-top: 20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="rn"
        :current-page="pn"
        :hide-on-single-page="true"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import songItem from "@/components/songItem.vue";
import songHeader from "@/components/songHeader.vue";
import { artist, artistMusic } from "@/network/api.js";
import { addSinger, delSinger } from "@/network/profile";
export default {
  components: {
    songItem,
    songHeader,
  },
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
        if (newVal.name !== "SingerDetail") return;
        this.aid = newVal.query.aid;
        artist(this.aid).then((res) => {
          this.singer_info = res.data;
        });
        this.get_artistMusic();
      },
    },
  },
  data() {
    return {
      singer_info: [],
      aid: "",
      pn: 1,
      rn: 20,
      song_list: [],
      total: 0,
    };
  },
  created() {
    this.aid = this.$route.query.aid;
    artist(this.aid).then((res) => {
      this.singer_info = res.data;
    });
    this.get_artistMusic();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_artistMusic();
    },
    get_artistMusic() {
      artistMusic(this.aid, this.pn, this.rn).then((res) => {
        this.song_list = res.data.list;
        this.total = parseInt(res.data.total);
      });
    },
    playAll() {
      this.$store.commit("changePlaylist", this.song_list);
      this.$bus.emit("playMusic");
    },
    like() {
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