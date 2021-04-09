<template>
  <div class="recommend">
    <div class="block">
      <el-carousel height="230px" ref="banner">
        <el-carousel-item v-for="item in banner_list" :key="item.id">
          <img class="small" :src="item.pic" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="rcm">
      <div class="title">
        <h3>推荐歌单</h3>
        <span :class="{ selected: rcm_index === -1 }" @click="getRecommend"
          >每日推荐</span
        >
        <span
          :class="{ selected: rcm_index === index }"
          v-for="(item, index) in rcm_tags"
          :key="item.id"
          @click="rcmClicked(item.id, index)"
          >{{ item.name }}</span
        >
        <span @click="toPlaylist">更多<i class="iconfont icon-right"></i></span>
      </div>
      <div class="rcm-list" ref="rcm">
        <playlist-item
          v-for="item in rcm_playlist"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>
    <div class="rank">
      <div class="title">
        <h3>排行榜</h3>
        <span @click="toRank">更多<i class="iconfont icon-right"></i></span>
      </div>
      <div class="rank-list">
        <div class="rank-item" v-for="item in rank_list" :key="item.id">
          <img :src="item.pic" />
          <div
            class="song"
            v-for="(music, index) in item.musicList"
            :key="music.rid"
          >
            <div class="song-num">
              {{ index + 1 }}
            </div>
            <div class="song-info">
              <div class="song-name">
                <span @click="play(music)">{{ music.name }}</span>
              </div>
              <div class="song-artist">
                <span @click="toSingerDetail(music.artistid)">{{
                  music.artist
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="artist">
      <div class="title">
        <h3>歌手推荐</h3>
        <span
          :class="{ selected: index === artist_index }"
          v-for="(item, index) in artist_tags"
          :key="item.id"
          @click="artistClicked(item.id, index)"
          >{{ item.name }}</span
        >
        <span @click="toSingers">更多<i class="iconfont icon-right"></i></span>
      </div>
      <div class="artist-list">
        <singer-item v-for="item in artist_list" :key="item.id" :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  indexInfo,
  recommendPlayList,
  tagPlayList,
  artistInfo,
} from "@/network/api.js";

import singerItem from "@/components/singerItem";
import playlistItem from "@/components/playlistItem";

export default {
  name: "Recommend",
  components: {
    playlistItem,
    singerItem,
  },
  data() {
    return {
      banner_list: [],
      rcm_playlist: [],
      rcm_tags: [],
      rcm_index: null,
      rank_list: [],
      artist_tags: [],
      artist_list: [],
      artist_index: null,
    };
  },
  created() {
    const loadbanner = this.$loading({
      target: this.$refs.banner,
      text: "加载中",
    });
    indexInfo().then((res) => {
      this.rcm_tags = res.data.playlist_tag;
      this.rank_list = res.data.rank_list;
      this.artist_tags = res.data.artist_tag;
      this.banner_list = res.data.banner;
      setTimeout(() => {
        this.$refs.banner.setActiveItem(0);
				loadbanner.close()
      }, 0);
    });
    this.getRecommend();
    this.artistClicked(11, 0);
  },
  methods: {
    getRecommend() {
      if (this.rcm_index === -1) return;
      this.rcm_index = -1;
      const loadrcm = this.$loading({
        target: this.$refs.rcm,
        text: "加载中",
      });
      recommendPlayList(1, 5).then((res) => {
        this.rcm_playlist = res.data.data.slice(0, 5);
        loadrcm.close();
      });
    },
    rcmClicked(id, index) {
      if (this.rcm_index === index) return;
      this.rcm_index = index;
      this.loadrcm = true;
      tagPlayList(id, 1, 5).then((res) => {
        this.rcm_playlist = res.data.data;
        this.loadrcm = false;
      });
    },
    artistClicked(id, index) {
      if (this.artist_index === index) return;
      this.artist_index = index;
      artistInfo(id, 1, 6).then((res) => {
        this.artist_list = res.data.artistList;
      });
    },
    play(data) {
      this.$store.commit("addPlaylist", data);
      this.$bus.emit("playMusic");
    },
    toPlaylist() {
      this.$router.push({
        name: "Playlist",
      });
    },
    toRank() {
      this.$router.push({
        name: "Rank",
      });
    },
    toSingers() {
      this.$router.push({
        name: "Singers",
      });
    },
    toSingerDetail(aid) {
      this.$router.push({
        name: "SingerDetail",
        query: { aid },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  max-width: 1500px;
  margin: 0 auto;
}
.rcm {
  height: 350px;
  &-list {
    display: flex;
    justify-content: space-evenly;
  }
}

.rank {
  &-list {
    display: flex;
    justify-content: space-evenly;
  }

  &-item {
    width: 18.85%;
    background-color: #fff;
    box-shadow: 0 0 30px 0 #d5d5d5;
    border-radius: 5px;

    img {
      width: 100%;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}

.song {
  display: flex;
  align-items: center;
  overflow: hidden;

  &-num {
    padding: 20px;
  }

  &-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-right: 10px;
  }

  &-name {
    font-size: 17px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-artist {
    font-size: 14px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.artist {
  &-list {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
