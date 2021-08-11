<template>
  <div class="artist">
    <div class="artist-list">
      <singer-item v-for="item in artist_list" :key="item.id" :data="item" />
    </div>
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
import singerItem from "@/components/singerItem";
import { searchSinger } from "@/network/api.js";
export default {
  components: {
    singerItem,
  },
  data() {
    return {
      artist_list: [],
      keyword: "",
      pn: 1,
      rn: 30,
      total: 0,
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.get_searchSinger();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_searchSinger();
    },
    get_searchSinger() {
      const loading = this.$loading({
        text: "加载中",
      });
      searchSinger(this.keyword, this.pn, this.rn)
        .then((res) => {
          this.artist_list = res.data.artistList;
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
.artist {
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}
</style>
