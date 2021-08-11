<template>
  <div class="mv">
    <div class="mv-list">
      <mv-item v-for="item in mvlist" :key="item.id" :data="item" />
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
import mvItem from "@/components/mvItem";
import { searchMv } from "@/network/api.js";
export default {
  components: {
    mvItem,
  },
  data() {
    return {
      mvlist: [],
      keyword: "",
      pn: 1,
      rn: 30,
      total: 0,
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.get_searchMv();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_searchv();
    },
    get_searchMv() {
      const loading = this.$loading({
        text: "加载中",
      });
      searchMv(this.keyword, this.pn, this.rn)
        .then((res) => {
          this.mvlist = res.data.mvlist;
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
.mv {
  &-list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 0 20px;
  }
}
</style>
