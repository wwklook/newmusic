<template>
  <div class="rcm">
    <playlist-item v-for="item in playlist" :key="item.id" :data="item" />
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
</template>

<script>
import playlistItem from "@/components/playlistItem";
import { searchRcm } from "@/network/api.js";
export default {
  components: {
    playlistItem,
  },
  data() {
    return {
      playlist: [],
      keyword: "",
      pn: 1,
      rn: 30,
      total: 0,
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.get_searchRcm();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_searchRcm();
    },
    get_searchRcm() {
      const loading = this.$loading({
        text: "加载中",
      });
      searchRcm(this.keyword, this.pn, this.rn)
        .then((res) => {
          this.playlist = res.data.rcmlist;
          this.total = parseInt(res.data.total);
          loading.close();
        })
        .catch(() => {
          loading.close();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.rcm {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
