<template>
  <div>
    <el-container>
      <el-aside width="240px" style="margin-left: 20px;">
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
          <div class="play-all"><i class="iconfont icon-cnt"></i>播放全部</div>
          <div class="like"><i class="iconfont icon-unlike"></i>收藏</div>
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
  },
};
</script>

<style lang="scss" scoped>
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