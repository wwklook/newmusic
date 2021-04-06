<template>
  <div>
    <div class="song-list">
      <song-header></song-header>
      <song-item
        v-for="(item, index) in song_list"
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
  </div>
</template>

<script>
import songItem from "@/components/songItem.vue";
import songHeader from "@/components/songHeader.vue";
import { searchMusic } from "@/network/api.js";
export default {
  components: {
    songItem,
    songHeader,
  },
  watch: {
    $route: {
      handler(newVal) {
				if (newVal.name !== "SearchMusic") return
        this.keyword = newVal.query.keyword;
        this.get_searchMusic();
      },
    },
  },
  data() {
    return {
      pn: 1,
      rn: 20,
      song_list: [],
      total: 0,
      keyword: "",
      history_keyword: [],
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.history_keyword =
      JSON.parse(localStorage.getItem("history_keyword")) || [];
    this.get_searchMusic();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_searchMusic();
    },
    get_searchMusic() {
      if (!this.keyword) {
        this.$message({
          message: "搜索关键词不能为空！",
          type: "success",
        });
        return;
      }
      searchMusic(this.keyword, this.pn, this.rn).then((res) => {
        this.song_list = res.data.songlist;
        this.total = parseInt(res.data.total);
      });
      let index = this.history_keyword.indexOf(this.keyword);
      if (index !== -1) {
        this.history_keyword.splice(index, 1);
      }
      this.history_keyword.unshift(this.keyword);
      localStorage.setItem(
        "history_keyword",
        JSON.stringify(this.history_keyword)
      );
    },
  },
};
</script>

<style>
</style>