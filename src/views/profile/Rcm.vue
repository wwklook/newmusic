<template>
  <div>
    <div class="rcm-title">
      <div class="title">
        <h1>{{ groupinfo.name }}</h1>
        <div class="playall" @click="playAll">播放全部</div>
      </div>
      <div>
        <el-button type="danger" size="small" @click="delLikeGroup"
          >删除</el-button
        >
      </div>
    </div>
    <song-header></song-header>
    <likesong-item
      v-for="(item, index) in likesong"
      :key="item.rid"
      :data="item.data"
      :num="index"
    ></likesong-item>
  </div>
</template>

<script>
import likesongItem from "@/components/likesongItem.vue";
import songHeader from "@/components/songHeader.vue";
import { getLike, delLikeGroup, getLikeGroup } from "@/network/profile.js";
export default {
  components: {
    likesongItem,
    songHeader,
  },
  data() {
    return {
      likesong: [],
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.name !== "Rcm") return;
        this.getLikeSong();
      },
    },
  },
  computed: {
    groupinfo() {
      for (let i = 0; i < this.$store.state.likegroup.length; i++) {
        const item = this.$store.state.likegroup[i];
        if (item.group_id == this.$route.query.gid) {
          return item;
        }
      }
      return {};
    },
  },
  created() {
    this.getLikeSong();
    this.$bus.on("getLikeSong", this.getLikeSong);
  },
  methods: {
    playAll() {
      this.$store.commit(
        "changePlaylist",
        this.likesong.map((value) => {
          return value.data;
        })
      );
      this.$bus.emit("playMusic");
    },
    getLikeSong() {
      if (!this.$route.query.gid) return;
      getLike(this.$route.query.gid).then((res) => {
        this.likesong = res.data.like_song;
      });
    },
    delLikeGroup() {
      if (!this.$route.query.gid) return;

      this.$confirm(
        `是否将《${this.groupinfo.name}》从“我的歌单”中移除？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delLikeGroup(this.$route.query.gid).then(() => {
            getLikeGroup().then((res) => {
              this.$store.commit("changeLikeGroup", res.data.like_group);
              if (this.$store.state.like_group.length > 0) {
                this.$router.push(
                  "/music/profile/rcm?gid=" +
                    this.$store.state.like_group[index].group_id
                );
              }
            });
            this.$message({
              message: `已移除《${this.groupinfo.name}》！`,
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
    },
  },
};
</script>

<style lang="scss" scoped>
.rcm-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
