<template>
  <div class="album">
    <el-container>
      <el-aside width="240px" style="margin-left: 20px">
        <img :src="album_info.pic" />
        <h2>专辑简介</h2>
        <div class="info">
          {{ album_info.albuminfo || "暂无简介" }}
        </div>
      </el-aside>
      <el-main class="song">
        <h1>{{ album_info.album }}</h1>
        <div class="artist">{{ album_info.artist }}</div>
        <div class="other">
          语种:
          <div class="other-item">{{ album_info.lang }}</div>
          发行时间:
          <div class="other-item">{{ album_info.releaseDate }}</div>
        </div>

        <div class="btn">
          <div class="play-all" @click="playAll">
            <i class="iconfont icon-cnt"></i>播放全部
          </div>
          <div class="like" @click="like">
            <i class="iconfont" :class="likeIcon"></i>收藏
          </div>
        </div>

        <div class="song-list">
          <song-header></song-header>
          <song-item
            v-for="(item, index) in album_info.musicList"
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import songItem from "@/components/songItem.vue";
import songHeader from "@/components/songHeader.vue";
import { albumInfo } from "@/network/api.js";
import { addAlbum, delAlbum } from "@/network/profile";
export default {
  components: {
    songItem,
    songHeader,
  },
  data() {
    return {
      album_info: [],
      aid: "",
      total: 0,
      pn: 1,
      rn: 20,
    };
  },
  created() {
    this.aid = this.$route.query.aid;
    this.get_album_info();
  },
  computed: {
    islike() {
      return this.$store.state.album_id.indexOf(this.aid + "") !== -1;
    },
    likeIcon() {
      return this.islike ? "icon-like" : "icon-unlike";
    },
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_album_info();
    },
    get_album_info() {
      albumInfo(this.aid, this.pn, this.rn).then((res) => {
        this.album_info = res.data;
        this.total = res.data.total;
      });
    },
    playAll() {
      this.$store.commit("changePlaylist", this.album_info.musicList);
      this.$bus.emit("playMusic");
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
          `是否将《${this.album_info.album}》从“收藏的专辑”中移除？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            delAlbum(this.aid).then(() => {
              let index = this.$store.state.album_id.indexOf(this.aid + "");
              this.$store.commit("delAlbum", index);
              this.$message({
                message: `已从“收藏的专辑”中移除《${this.album_info.album}》！`,
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
        let data = { ...this.album_info };
        delete data.musicList;
        addAlbum(data).then(() => {
          this.$store.commit("addAlbum", data);
          this.$message({
            message: `已添加《${this.album_info.album}》至“收藏的专辑”`,
            type: "success",
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.album {
  max-width: 1400px;
  margin: 0 auto;
}
.song {
  margin-left: 20px;

  &-list {
    margin-top: 50px;
    flex: 1;
  }
  &-item {
    padding: 5px 10px;
    font-size: 15px;
    cursor: pointer;
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
.artist {
  margin: 10px 0;
  font-size: 18px;
}
.other {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #555;

  &-item {
    font-size: 16px;
    color: #000;
    margin-right: 30px;
    margin-left: 10px;
  }
}
</style>
