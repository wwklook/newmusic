<template>
  <div class="item">
    <div class="song_num">
      <div>{{ num + 1 }}</div>
    </div>
    <div class="song_name">
      <i
        v-if="data.hasmv == 1"
        title="播放MV"
        @click="toMV"
        class="iconfont icon-mv"
        style="font-size: 20px; margin-left: 5px"
      />
      <span @click="play" v-html="data.name"></span>
    </div>
    <div class="song_singer">
      <span @click="toSinger" v-html="data.artist"></span>
    </div>
    <div class="song_time">{{ data.songTimeMinutes }}</div>
    <div class="ctrl">
      <i class="iconfont icon-play" @click="play"></i>
      <i class="iconfont icon-add" @click="add"></i>
      <i class="iconfont" :class="likeIcon" @click="like"></i>
      <a
        class="iconfont icon-download"
        :href="
          'https://www.wwklook.com/api/music_url?rid=' +
            data.rid +
            '&name=' +
            data.name
        "
      ></a>
      <i class="el-icon-delete" @click="del"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "num"],
  computed: {
    islike() {
      return this.$store.state.iloverid.indexOf(this.data.rid + "") !== -1;
    },
    likeIcon() {
      return this.islike ? "icon-like" : "icon-unlike";
    },
  },
  methods: {
    play() {
      this.$store.commit("addPlaylist", this.data);
      this.$bus.emit("playMusic");
    },
    add() {
      this.$bus.emit("addLikeSong", this.data);
    },
    toSinger() {
      if (this.$route.name != "SingerDetail") {
        this.$router.push({
          name: "SingerDetail",
          query: { aid: this.data.artistid },
        });
      }
    },
    toAlbum() {
      if (this.$route.name != "Album") {
        this.$router.push({
          name: "Album",
          query: { aid: this.data.albumid },
        });
      }
    },
    toMV() {
      this.$router.push({ name: "Mv", query: { rid: this.data.rid } });
    },
    del() {
      this.$store.commit("delPlaylist", this.num);
      if (this.$store.state.playList.length === 0) {
        this.$bus.emit("playInit");
        return;
      }
      if (this.num === this.$store.state.playIndex) {
        this.$bus.emit("playMusic");
      }
    },
    like() {
      this.$bus.emit("like", this.data);
    },
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
  font-size: 14px;
}

.item {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #fafafa;
  user-select: none;
}
.item:hover .ctrl {
  visibility: visible;
  background-color: #eee;
}

.item:hover {
  background-color: #eee;
}

.song_num {
  display: flex;
  align-items: center;
  width: 10%;
  font-weight: 600;
  margin-left: 30px;
}
.song_name {
  width: 30%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.song_album {
  width: 20%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.song_singer {
  width: 30%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.song_time {
  width: 10%;
}

.photo {
  margin-left: 10px;
  height: 48px;
  width: 48px;
}
.mv {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 3px;
}
.ctrl {
  width: 150px;
  position: absolute;
  height: 60px;
  display: flex;
  visibility: hidden;
  justify-content: space-around;
  align-items: center;
  background-color: #f5f5f5;
  right: 0;
}
</style>
