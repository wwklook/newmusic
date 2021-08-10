<template>
  <div class="profile">
    <el-container v-if="isLogin">
      <el-aside width="200px">
        <div class="title">
          <h4>我的音乐</h4>
          <div>
            <span :class="{ selected: name === 'Love' }" @click="toLove"
              >我喜欢</span
            >
          </div>
        </div>
        <div class="title">
          <h4>
            我的歌单
            <el-tooltip effect="light" content="新建歌单" placement="top">
              <i class="el-icon-plus" @click="addGroup"></i>
            </el-tooltip>
          </h4>
          <div v-for="(item, index) in likegroup" :key="item.group_id">
            <span
              :class="{
                selected: index === group_index && name === 'Rcm',
              }"
              @click="toLike(index)"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="title">
          <h4>我的收藏</h4>
          <div>
            <span
              :class="{
                selected: name === 'LikeRcm',
              }"
              @click="toLikeRcm"
              >歌单</span
            >
          </div>
          <div>
            <span
              :class="{
                selected: name === 'LikeSinger',
              }"
              @click="toLikeSinger"
              >歌手</span
            >
          </div>
          <div>
            <span
              :class="{
                selected: name === 'LikeAlbum',
              }"
              @click="toLikeAlbum"
              >专辑</span
            >
          </div>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <div v-else>
      <a
        class="no-login"
        href="https://wwklook.com/login.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="iconfont icon-nologin"></i>
        请先登录
      </a>
    </div>
  </div>
</template>

<script>
import { addLikeGroup, getLikeGroup } from "@/network/profile.js";
export default {
  data() {
    return {
      group_index: -1,
    };
  },
  computed: {
    likegroup() {
      return this.$store.state.likegroup;
    },
    name() {
      return this.$route.name;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  activated() {
    if (!this.isLogin) {
      this.$router.push("/music/login",query);
    }
  },
  methods: {
    toLike(index) {
      this.group_index = index;
      this.$router.push(
        "/music/profile/rcm?gid=" +
          this.likegroup[index].group_id +
          "&index=" +
          index
      );
    },
    toLove() {
      this.$router.push("/music/profile/love");
    },
    toLikeSinger() {
      this.$router.push("/music/profile/like_singer");
    },
    toLikeAlbum() {
      this.$router.push("/music/profile/like_album");
    },
    toLikeRcm() {
      this.$router.push("/music/profile/like_rcm");
    },
    addGroup() {
      this.$prompt("", "新建歌单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入新歌单标题",
        inputValidator: (v) => {
          if (v === undefined || v === "") return "标题不能为空";
          if (v.length > 20) return "歌单标题最多20字符";
        },
      })
        .then(({ value }) => {
          addLikeGroup(value).then((res) => {
            getLikeGroup().then((res) => {
              this.$store.commit("changeLikeGroup", res.data.like_group);
            });
            this.$message({
              type: "success",
              message: "新建“" + value + "”成功",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消新建歌单",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 18px;

  i {
    cursor: pointer;
  }
}

.profile {
  max-width: 1400px;
  margin: 0 auto;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: unset;
}

.title div {
  line-height: 30px;
  border-top: 1px solid #eee;
  padding: 5px;
}

.title span {
  margin: 0;
}
.no-login {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  i {
    font-size: 150px;
    color: #333;
    margin-bottom: 10px;
  }
}
</style>
