<template>
  <div class="playlist">
    <el-container>
      <el-aside width="240px" style="margin-left: 20px;">
        <img :src="playlist_info.img300" />
        <h2>歌单简介</h2>
        <div class="info">
          {{ playlist_info.info || "暂无简介" }}
        </div>
      </el-aside>
      <el-main class="song-list">
        <h1>{{ playlist_info.name }}</h1>
        <div class="user">
          <img :src="playlist_info.uPic" />
          <div class="user-name">{{ playlist_info.uname }}</div>
        </div>
        <div class="tag">{{ playlist_info.tag }}</div>

        <div class="btn">
          <div class="play-all" @click="playAll">
            <i class="iconfont icon-cnt"></i>播放全部
          </div>
          <div class="like"><i class="iconfont icon-unlike"></i>收藏</div>
        </div>

        <song-header></song-header>
        <song-item
          v-for="(item, index) in playlist_info.musicList"
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import songItem from "@/components/songItem.vue";
import songHeader from "@/components/songHeader.vue";
import { playListInfo } from "@/network/api.js";
export default {
  components: {
    songItem,
    songHeader,
  },
  data() {
    return {
      playlist_info: [],
      pid: "",
      total: 0,
      pn: 1,
      rn: 20,
    };
  },
  created() {
    this.pid = this.$route.query.pid;
    this.get_playList();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_playList();
    },
    get_playList() {
      playListInfo(this.pid, this.pn, this.rn).then((res) => {
        this.playlist_info = res.data;
        this.total = res.data.total;
      });
    },
    playAll() {
      this.$store.commit("changePlaylist", this.playlist_info.musicList);
      this.$bus.emit("playMusic");
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist {
	max-width: 1500px;
	margin: 0 auto;
}

.song {
  &-list {
    flex: 1;
		margin-left: 20px;
  }
  &-item {
    padding: 5px 10px;
    font-size: 15px;
    cursor: pointer;
  }
}
.user {
  display: flex;
  align-items: center;
  margin: 20px 0;
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  &-name {
    margin-left: 15px;
  }
}
.tag {
  margin-bottom: 20px;
  font-size: 15px;
  color: #66ccff;
}
.info {
  margin-top: 10px;
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
</style>