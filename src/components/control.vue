<template>
  <div class="tool">
    <div class="control">
      <div class="left">
        <img id="img" :src="songInfo.pic120 || defaultImg" @click="toLrc" />
        <div class="info">
          <div class="song">
            <div class="song-info">
              <span id="sname" :title="songInfo.name || ''" @click="toLrc">{{
                songInfo.name
              }}</span>
              <span>&nbsp;-&nbsp;</span>
              <span
                id="sartist"
                @click="toSinger"
                :title="songInfo.artist || ''"
                >{{ songInfo.artist || "" }}</span
              >
            </div>
            <span id="time">{{ time || "00:00/00:00" }}</span>
          </div>
          <input
            type="range"
            max="400"
            min="0"
            step="1"
            v-model="progress"
            @change="change"
            @input="input"
            :style="{ backgroundSize: progress / 4 + '% 100%' }"
          />
        </div>
      </div>

      <div class="center">
        <el-tooltip effect="light" content="上一首" placement="top">
          <i class="iconfont icon-last" @click="lastSong"></i>
        </el-tooltip>
        <el-tooltip effect="light" content="播放" placement="top">
          <i
            class="iconfont"
            :class="playIcon"
            style="font-size: 30px"
            @click="paused"
          ></i>
        </el-tooltip>
        <el-tooltip effect="light" content="下一首" placement="top">
          <i class="iconfont icon-next" @click="nextSong"></i>
        </el-tooltip>
      </div>
      <div class="right">
        <el-tooltip effect="light" content="收藏" placement="top">
          <i class="iconfont" :class="likeIcon" @click="like"></i>
        </el-tooltip>
        <el-tooltip effect="light" content="下载" placement="top">
          <i class="iconfont icon-download"></i>
        </el-tooltip>
        <el-tooltip effect="light" :content="loopName" placement="top">
          <i class="iconfont" :class="loopIcon" @click="loop"></i>
        </el-tooltip>
        <el-popover placement="top" width="500px" trigger="click">
          <div class="playlist">
            <div class="head">
              <h4>播放列表</h4>
              <div class="song-total">共({{ playList.length }})首</div>
            </div>

            <div class="song-list">
              <simple-item
                v-for="(item, index) in playList"
                :class="{ active: index === playIndex }"
                :key="item.rid"
                :data="item"
                :num="index"
              ></simple-item>
            </div>
          </div>
          <template #reference><i class="iconfont icon-playlist"></i></template>
        </el-popover>
        <el-tooltip effect="light" content="歌词" placement="top">
          <i class="iconfont icon-open-lyric" style="font-size: 24px"></i>
        </el-tooltip>
        <el-tooltip effect="light" content="音量" placement="top">
          <i class="iconfont icon-sound" @click="click_vol"></i>
        </el-tooltip>
        <el-slider v-model="volume" @input="input_vol"></el-slider>
      </div>
    </div>
    <audio
      ref="audio"
      :src="url"
      @ended="end"
      @loadstart="start"
      @loadedmetadata="metadata"
      @timeupdate="update"
    ></audio>
  </div>
</template>

<script>
import { songinfo } from "@/network/api.js";
import { addIlove, delILove } from "@/network/profile.js";
import simpleItem from "@/components/simpleItem.vue";
export default {
  components: {
    simpleItem,
  },
  data() {
    return {
      url: "",
      isPlaying: false, // 是否正在播放
      isClickSlider: false, // 是否点击进度条
      isInit: false, // 是否初始化(指播放第一首音乐)
      time: "00:00/00:00", // 播放时间文本
      volume: 80, // 音量
      // vol_img: require("assets/icon/volume.png"),
      defaultImg:
        "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png",
      songInfo: {
        pic: "",
        name: "享受好歌,默认最高音质播放 - -",
        artist: "",
        artistId: 0,
      },
      lrclist: [],
      isLrcCreated: false, // 是否初始化歌词页
      loopName: "列表循环",
      loopIcon: "icon-loop",
      isLoading: false, // 是否正在加载数据
      progress: 0,
    };
  },
  computed: {
    playList() {
      return this.$store.state.playList;
    },
    playIndex() {
      return this.$store.state.playIndex;
    },
    islike() {
      return this.$store.state.iloverid.indexOf(this.songInfo.rid + "") !== -1;
    },
    likeIcon() {
      return this.islike ? "icon-like" : "icon-unlike";
    },
    playIcon() {
      return this.isPlaying ? "icon-pause" : "icon-play";
    },
  },
  created() {
    let data = JSON.parse(localStorage.getItem("songinfo"));
    if (data) {
      this.songInfo = data.songinfo;
      this.$store.commit("addPlaylist", this.songInfo);
      this.lrclist = data.lrc;
      this.url = data.url;
      this.isInit = true;
    }

    this.$bus.on("playMusic", this.replay);
    this.$bus.on("playInit", this.playInit);
    this.$bus.on("changePlay", (index) => {
      if (index == this.playList.length - 1) {
        this.playIndex = 0;
      } else {
        this.playIndex = index;
      }
      this.replay();
    });
  },
  methods: {
    like() {
      if (!this.isInit) {
        this.$message({
          message: "请先播放一首歌曲！",
          type: "success",
        });
        return;
      }
      if (this.islike) {
        this.$confirm(
          `是否将《${this.playList[this.playIndex].name}》从“我喜欢”中移除？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            delILove(this.playList[this.playIndex].rid).then(() => {
              let index = this.$store.state.iloverid.indexOf(
                this.playList[this.playIndex].rid + ""
              );
              this.$store.commit("delLove", index);
              this.$message({
                message: `已从“我喜欢”移除《${
                  this.playList[this.playIndex].name
                }》！`,
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
        addIlove(
          this.playList[this.playIndex],
          this.playList[this.playIndex].rid
        ).then(() => {
          this.$store.commit("addLove", this.playList[this.playIndex]);
          this.$message({
            message: `已添加《${
              this.playList[this.playIndex].name
            }》至“我喜欢”`,
            type: "success",
          });
        });
      }
    },
    replay() {
      if (this.playList.length === 0 || this.isLoading) {
        return;
      }
      this.isLoading = true;
      let rid = this.playList[this.playIndex].rid;
      this.$store.commit("changePlayIndex", this.playIndex);
      this.isInit = true;
      this.$message({
        message: "正在获取歌曲信息...",
        type: "success",
      });
      songinfo(rid)
        .then((res) => {
          this.isLoading = false;
          this.isPlaying = false;
          this.url = res.data.url;
          this.lrclist = res.data.lrc;
          this.songInfo = this.playList[this.playIndex];
          document.title = this.songInfo.name + "-" + this.songInfo.artist;
          localStorage.setItem("songinfo", JSON.stringify(res.data));
          this.$store.commit("addHistory", this.songInfo);
          setTimeout(() => {
            this.$refs.audio.play();
            this.isPlaying = true;
            this.$message({
              message: "获取歌曲信息成功，正在播放！",
              type: "success",
            });
          }, 100);
        })
        .catch((err) => {
          this.$message({
            message: "获取歌曲信息失败！",
            type: "error",
          });
          this.isLoading = false;
        });
    },
    playInit() {
      this.songInfo = {
        pic: "",
        name: "享受好歌,默认最高音质播放 - -",
        artist: "",
        artistId: 0,
      };
      this.isInit = false;
    },
    lastSong() {
      if (!this.isInit) {
        this.$message({
          message: "请先播放一首歌曲！",
          type: "success",
        });
        return;
      }
      if (this.playIndex === 0) {
        this.$store.commit("changePlayIndex", this.playList.length - 1);
      } else {
        this.$store.commit("changePlayIndex", this.playIndex - 1);
      }
      this.replay();
    },
    nextSong() {
      if (!this.isInit) {
        this.$message({
          message: "请先播放一首歌曲！",
          type: "success",
        });
        return;
      }
      if (this.playIndex < this.playList.length - 1) {
        this.$store.commit("changePlayIndex", this.playIndex + 1);
      } else {
        this.$store.commit("changePlayIndex", 0);
      }
      this.replay();
    },
    loop() {
      if (this.loopName == "列表循环") {
        this.loopIcon = "icon-single";
        this.loopName = "单曲循环";
      } else if (this.loopName == "单曲循环") {
        this.loopIcon = "icon-random";
        this.loopName = "随机播放";
      } else {
        this.loopIcon = "icon-loop";
        this.loopName = "列表循环";
      }
    },
    showPlaylist() {
      if (this.$route.name == "Playlist") {
        this.$router.back();
      } else {
        this.$router.push({ name: "Playlist" });
      }
    },
    end: function () {
      if (this.loopName == "列表循环") {
        this.nextSong();
      } else if (this.loopName == "单曲循环") {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      } else {
        let r = parseInt(Math.random() * this.playList.length);
        this.playIndex = r;
        this.$store.commit("changePlayIndex", r);
        this.replay();
      }
    },
    update: function () {
      let audio = this.$refs.audio;
      if (this.$route.name == "Lrc") {
        let num = this.lrclist.length - 1;
        for (let i = 0; i < this.lrclist.length; i++) {
          if (audio.currentTime <= this.lrclist[i]["time"]) {
            num = i - 1;
            break;
          }
        }
        if (num != this.lrcindex) {
          this.lrcindex = num;
          this.$bus.emit("changeLrc", num);
        }
      }
      this.time =
        this.toTime(audio.currentTime) + "/" + this.toTime(audio.duration);
      if (this.isClickSlider == false) {
        this.progress = (audio.currentTime / audio.duration) * 400;
      }
    },
    start: function () {
      this.time = "00:00/00:00";
      this.progress = 0;
    },
    metadata: function () {
      this.progress = 0;
      this.$bus.emit("changeLrcList");
    },
    paused: function () {
      if (!this.isInit) {
        this.$message({
          message: "请先播放一首歌曲！",
          type: "success",
        });
        return;
      }
      if (this.isPlaying) {
        this.$refs.audio.pause();
        this.isPlaying = false;
      } else {
        this.$refs.audio.play();
        this.isPlaying = true;
      }
    },
    change: function () {
      if (!this.isInit) {
        this.$message({
          message: "请先播放一首歌曲！",
          type: "success",
        });
        return;
      }
      this.isClickSlider = false;
      let audio = this.$refs.audio;
      audio.currentTime = (this.progress * audio.duration) / 400;
    },
    input: function () {
      this.isClickSlider = true;
    },
    click_vol() {
      if (this.$refs.audio.muted) {
        this.$refs.audio.muted = false;
        this.volume = 80;
      } else {
        this.volume = 0;
        this.$refs.audio.muted = true;
      }
    },
    input_vol() {
      this.$refs.audio.volume = this.volume;
      if (this.volume === 0) {
        this.$refs.audio.muted = true;
      } else {
        this.$refs.audio.muted = false;
      }
    },
    toLrc() {
      if (!this.isInit) {
        this.$message({
          message: "请先播放一首歌曲！",
          type: "success",
        });
        return;
      }
      if (this.$route.name === "Lrc") {
        this.$router.back();
        return;
      }
      if (this.isLrcCreated) {
        this.$router.push({
          name: "Lrc",
        });
      } else {
        this.isLrcCreated = true;
        this.$router.push({
          name: "Lrc",
          params: { lrclist: this.lrclist, songInfo: this.songInfo },
        });
      }
    },
    toSinger() {
      this.$router.push({
        name: "SingerDetail",
        query: { aid: this.songInfo.artistid },
      });
    },
    toTime(x) {
      let m = parseInt(x / 60); // 分
      let s = parseInt(x % 60); // 秒
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
    },
  },
};
function animate(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;
    for (var k in json) {
      if (k === "opacity") {
        var leader = getComputedStyle(obj, null)[k] * 100;
        var tag = json[k] * 100;
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj.style[k] = leader / 100;
      } else if (k === "scrollTop") {
        var leader = obj[k];
        var tag = json[k];
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj[k] = leader;
      } else {
        var leader = parseInt(getComputedStyle(obj, null)[k]) || 0;
        var tag = json[k];
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj.style[k] = leader + "px";
      }
      if (leader !== tag) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
  }, 15);
}
</script>

<style lang="scss" scoped>
.tool {
  width: 100%;
  height: 60px;
  background: #eee;
  box-shadow: 0 0 1px 0px #000;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.control {
  display: flex;
  justify-content: space-evenly;
}

.active {
  background-color: #ccc;
}

.info {
  height: 100%;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 15px;
}

.song {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.song-info {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}

#sname {
  cursor: pointer;
}

#sartist {
  cursor: pointer;
}

.info input[type="range"] {
  -webkit-appearance: none;
  width: 400px;
  height: 5px;
  border-radius: 2px;
  background: -webkit-linear-gradient(#ffffff, #409eff) no-repeat, #e4e7ed;
  background-size: 0% 100%;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb,
-moz-range-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border: 0;
  /*background: url("../../assets/icon/ico.png");*/
  background-size: cover;
}

input[type="range"]::-ms-fill-lower {
  -webkit-appearance: none;
  background: #82a5a3;
}

i {
  cursor: pointer;
  margin-left: 30px;
  margin-right: 15px;
}

.bar {
  height: 20px;
}

.bar:hover input[type="range"] {
  display: block;
}

.bar input[type="range"] {
  -webkit-appearance: none;
  width: 80px;
  height: 5px;
  right: 10px;
  bottom: 75px;
  border-radius: 2px;
  background: linear-gradient(#ffffff, #5cdee4) no-repeat, #82a5a3;
  background-size: 100% 100%;
  display: none;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  outline: none;
  transform: rotate(270deg);
}

.left,
.center,
.right {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#img {
  height: 60px;
  width: 60px;
  cursor: pointer;
}

.el-slider {
  width: 60px;

  :deep(&__runway) {
    height: 3px;
  }

  :deep(&__bar) {
    height: 3px;
  }

  :deep(&__button-wrapper) {
    top: -15.5px;
  }

  :deep(&__button) {
    width: 10px;
    height: 10px;
  }
}

.song-list {
  height: 450px;
  overflow: auto;
}

.head {
  margin: 20px;
  display: flex;
  align-items: center;
  font-size: 21px;
}

.song-total {
  margin: 0 5px;
  font-size: 17px;
}
</style>
