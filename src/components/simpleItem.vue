<template>
  <div class="item">
    <div class="song_num">
      <div>{{ num + 1 }}</div>
      <!-- <img
        v-if="data.hasmv == 1"
        class="mv"
        title="播放MV"
        @click="toMV"
        src="~assets/icon/MV.png"
      /> -->
    </div>
    <div class="song_name">
      <span @click="play">{{ data.name }}</span>
    </div>
    <div class="song_singer">
      <span @click="toSinger">{{ data.artist }}</span>
    </div>
    <div class="song_time">{{ data.songTimeMinutes }}</div>
    <div class="ctrl">
      <i class="iconfont icon-play" @click="play"></i>
      <i class="iconfont" :class="likeIcon" @click="like"></i>
      <i class="iconfont icon-download"></i>
			<i class="iconfont el-icon-delete" @click="del"></i>
    </div>
  </div>
</template>

<script>
import { addLike, addIlove, delILove } from "@/network/profile";
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
      // addLike(this.data, this.data.rid).then((res) => {
      //   console.log(res);
      // });
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
      this.$router.push({ name: "MvPage", params: { index: this.num } });
    },
		del() {
			this.$store.commit("delPlaylist", this.num);
			if(this.$store.state.playList.length === 0) {
				this.$bus.emit("playInit");
				return
			}
			if (this.num === this.$store.state.playIndex) {
				this.$bus.emit("playMusic");
			}
		},
    like() {
      if (this.islike) {
        this.$confirm(`是否将《${this.data.name}》从“我喜欢”中移除？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delILove(this.data.rid).then(() => {
              let index = this.$store.state.iloverid.indexOf(
                this.data.rid + ""
              );
              this.$store.commit("delLove", index);
              this.$message({
                message: `已从“我喜欢”移除《${this.data.name}》！`,
                type: "success",
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        addIlove(this.data, this.data.rid).then(() => {
          this.$store.commit("addLove", this.data);
          this.$message({
            message: `已添加《${this.data.name}》至“我喜欢”`,
            type: "success",
          });
        });
      }
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
