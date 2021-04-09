<template>
  <div class="menu">
    <div class="left">
      <div class="menu-item">
        <span :class="{ selected: name === 'Recommend' }" @click="toIndex"
          >推荐</span
        >
      </div>
      <div class="menu-item">
        <span :class="{ selected: name === 'Rank' }" @click="toRank"
          >排行榜</span
        >
      </div>
      <div class="menu-item">
        <span :class="{ selected: name === 'Singers' }" @click="toSingers"
          >歌手</span
        >
      </div>
      <div class="menu-item">
        <span :class="{ selected: name === 'Playlist' }" @click="toPlaylist"
          >歌单</span
        >
      </div>
      <div class="menu-item">
        <span :class="{ selected: name === 'Mvs' }" @click="toMv">MV</span>
      </div>
    </div>
    <el-autocomplete
      style="flex: 1; max-width: 400px"
      v-model="keyword"
      :fetch-suggestions="querySearch"
      placeholder="搜索音乐/MV/歌单/歌手"
      @select="handleSelect"
      :clearable="true"
      @keydown.enter="searchMusic"
    >
      <template #prefix>
        <i class="el-icon-search" @click="searchMusic"></i>
      </template>
    </el-autocomplete>
    <div class="right">
      <div class="menu-item">
        <el-popover placement="bottom" width="150px" trigger="hover">
          <div class="profile-list" v-if="islogin">
            <div class="profile-item">
              <span @click="toLove">我喜欢</span>
            </div>
            <div class="profile-item">
              <span @click="toRcm">我的歌单</span>
            </div>
            <div class="profile-item">
              <span @click="toLike">我的收藏</span>
            </div>
            <div class="profile-item">
              <span @click="logout">退出</span>
            </div>
          </div>
          <div class="profile-list" v-else>
            <div class="profile-item">
              <span
                ><a
                  href="https://wwklook.com/login.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  >登录</a
                ></span
              >
            </div>
            <div class="profile-item">
              <span
                ><a
                  href="https://wwklook.com/register.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  >注册</a
                ></span
              >
            </div>
          </div>
          <template #reference
            ><img
              class="avatar"
              src="https://i0.hdslb.com/bfs/face/member/noface.jpg"
          /></template>
        </el-popover>
      </div>

      <div class="menu-item" @click="toHistory">
        <span :class="{ selected: name === 'History' }">播放历史</span>
      </div>
      <!-- <div class="menu-item">
        <el-popover placement="bottom" width="150px" trigger="hover">
          <div class="theme-item" v-for="(item, index) in theme" :key="index">
            <span @click="changeTheme(index)">{{ item.name }}</span>
          </div>
          <template #reference><span>主题</span></template>
        </el-popover>
      </div> -->
    </div>
  </div>
</template>
        
<script>
import { searchKey } from "@/network/api";
import { LogOut } from "@/network/profile";
export default {
  data() {
    return {
      keyword: "",
      history_keyword: [],
      theme: [
        {
          name: "纯白",
          bgc: "#fff",
        },
        {
          name: "灰白",
          bgc: "linear-gradient(45deg, #aaa, transparent);",
        },
        {
          name: "测试1",
          bgc: "linear-gradient(45deg, #d0ffb9, #f4dfc1);",
        },
        {
          name: "测试2",
          bgc: "linear-gradient(to bottom, #82addb 0%, #ebb2b1 100%);",
        },
        {
          name: "污染",
          bgc: "linear-gradient(45deg, #0f0, #f00);",
        },
      ],
    };
  },
  created() {
    this.history_keyword =
      JSON.parse(localStorage.getItem("history_keyword")) || [];
  },
  computed: {
    name() {
      return this.$route.name;
    },
    islogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    toIndex() {
      this.$router.push("/music");
    },
    toRank() {
      this.$router.push("/music/rank");
    },
    toSingers() {
      this.$router.push("/music/singers");
    },
    toPlaylist() {
      this.$router.push("/music/playlist");
    },
    toMv() {
      this.$router.push("/music/mvs");
    },
    toLove() {
      this.$router.push("/music/profile/love");
    },
    toRcm() {
      this.$router.push("/music/profile/rcm");
    },
    toLike() {
      this.$router.push("/music/profile/like_rcm");
    },
    toHistory() {
      this.$router.push("/music/history");
    },
    logout() {
      LogOut().then(() => {
        this.$store.commit("changeLoginState", false);
        this.$message({
          message: "已成功登出",
          type: "success",
        });
      });
    },
    changeTheme(index) {
      document
        .querySelector("body")
        .setAttribute("style", "background:" + this.theme[index].bgc);
    },
    querySearch(queryString, cb) {
      if (queryString === "") {
        let result = this.history_keyword.map((value) => {
          return { value };
        });
        cb(result);
      } else {
        searchKey(queryString).then((res) => {
          let data = res.data.data;
          let result = data.map(this.createFilter);
          cb(result);
        });
      }
    },
    createFilter(queryString) {
      return { value: queryString.split("\n")[0].slice(8, -1) };
    },
    handleSelect(item) {
      this.$router.push({
        name: "Search",
        query: {
          keyword: item.value,
        },
      });
    },
    searchMusic() {
      if (!this.keyword) {
        this.$message({
          message: "搜索关键词不能为空！",
          type: "success",
        });
        return;
      }
      this.$router.push({
        name: "Search",
        query: {
          keyword: this.keyword,
        },
      });
    },
  },
};
</script>
        
<style lang="scss" scoped>
.menu {
  max-width: 1400px;
	min-width: 750px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-item {
    position: relative;
    font-size: 17px;
    line-height: 60px;
    padding: 0 20px;
  }
}

.left,
.right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  margin-top: 20px;
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.theme-item {
  padding: 8px;
  text-align: center;
  border-top: 1px solid #eee;
}
.theme-item:first-child {
  border-top: none;
}

.profile-item {
  border-top: 1px solid #eee;
  padding: 10px 0;
  text-align: center;
  font-size: 16px;
}

.profile-item:first-child {
  border-top: 1px solid #fff;
}
</style>