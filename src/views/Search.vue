<template>
  <div class="search">
    <div class="search-head">
      <el-autocomplete
        style="flex: 1; max-width: 600px; height: 50px"
        v-model="keyword"
        :fetch-suggestions="querySearch"
        placeholder="搜索音乐/MV/歌单/歌手"
        @select="handleSelect"
        @keyup.enter.native="searchMusic"
      >
        <template #suffix>
          <i class="el-icon-search" @click="searchMusic"></i>
        </template>
      </el-autocomplete>
    </div>
    <div class="title">
      <h3>搜索结果</h3>
      <span :class="{ selected: name === 'SearchMusic' }" @click="searchMusic"
        >单曲</span
      >
      <span :class="{ selected: name === 'SearchAlbum' }" @click="searchAlbum"
        >专辑</span
      >
      <span :class="{ selected: name === 'SearchMv' }" @click="searchMv"
        >MV</span
      >
      <span
        :class="{ selected: name === 'SearchPlaylist' }"
        @click="searchPlaylist"
        >歌单</span
      >
      <span :class="{ selected: name === 'SearchSinger' }" @click="searchSinger"
        >歌手</span
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { searchKey } from "@/network/api";
export default {
  data() {
    return {
      keyword: "",
      history_keyword: [],
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.history_keyword =
      JSON.parse(localStorage.getItem("history_keyword")) || [];
  },
  methods: {
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
        name: "SearchMusic",
        query: {
          keyword: this.keyword,
        },
      });
    },
    searchAlbum() {
      this.$router.push({
        name: "SearchAlbum",
        query: {
          keyword: this.keyword,
        },
      });
    },
    searchMv() {
      this.$router.push({
        name: "SearchMv",
        query: {
          keyword: this.keyword,
        },
      });
    },
    searchPlaylist() {
      this.$router.push({
        name: "SearchPlaylist",
        query: {
          keyword: this.keyword,
        },
      });
    },
    searchSinger() {
      this.$router.push({
        name: "SearchSinger",
        query: {
          keyword: this.keyword,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.search {
	max-width: 1500px;
	margin: 0 auto;
}
.search-head {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(.el-input) {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
  }

  :deep(.el-input__inner) {
    height: 60px;
    line-height: 60px;
  }
}
</style>