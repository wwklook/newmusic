<template>
  <div class="cover">
    <div
      class="bg"
      :style="{
        background: 'url(' + songInfo.pic || defaultImg + ')',
        backgroundSize: 'cover',
      }"
    ></div>
    <img class="cover-img" :src="songInfo.pic || defaultImg" />
    <div class="detail">
      <div class="cover-song">{{ songInfo.name }}</div>
      <div>
        歌手 :
        <span class="cover-name" @click="toSinger">{{ songInfo.artist }}</span>
        专辑 :
        <span class="cover-album" @click="toAlbum">{{ songInfo.album }}</span>
      </div>
      <div class="lrc" ref="lrc">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p
          v-for="(item, index) in lrclist"
          :key="index"
          :class="{ current: lrcIndex == index }"
        >
          {{ item.lineLyric }}
        </p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lrclist: [],
      songInfo: {},
      lrcIndex: 0,
      defaultImg:
        "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png",
    };
  },
  created() {
    let data = JSON.parse(localStorage.getItem("songinfo"));
    this.songInfo = data.songinfo;
    this.lrclist = data.lrc;
    this.$bus.on("changeLrc", (index) => {
      this.lrcIndex = index;
      animate(this.$refs.lrc, { scrollTop: index * 36 });
    });
    this.$bus.on("changeLrcList", () => {
      let data = JSON.parse(localStorage.getItem("songinfo"));
      this.songInfo = data.songinfo;
      this.lrclist = data.lrc;
    });
  },
  methods: {
    toAlbum() {
      this.$router.push({
        name: "Album",
        query: { aid: this.songInfo.albumid },
      });
    },
    toSinger() {
      this.$router.push({
        name: "SingerDetail",
        query: { aid: this.songInfo.artistid },
      });
    },
  },
};
function animate(obj, json, fn) {
  if (obj) {
    clearInterval(obj.timer);
  }

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
.cover {
  width: 100%;
  background-color: #8a8a8a;
  opacity: 0.9;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  top: 60px;
  bottom: 60px;
  overflow: hidden;
}
.cover-img {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  margin: 50px;
}

.bg {
  width: 100%;
  height: 100%;
  filter: blur(30px);
  z-index: -1;
  position: absolute;
}

.detail {
  width: 50%;
  height: 100%;
  color: #f3f3f3;
  text-align: center;
}
.cover-song {
  font-size: 30px;
  margin-top: 50px;
  margin-bottom: 10px;
}
.cover-name {
  margin-right: 30px;
  cursor: pointer;
}
.cover-album {
  cursor: pointer;
}

.lrc {
  overflow: hidden;
  width: 100%;
  height: 400px;
  margin-top: 50px;
}

.lrc p {
  margin-top: 0px;
  margin-bottom: 15px;
  height: 21px;
}
.current {
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: #ffffff !important;
}
</style>
