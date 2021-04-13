<template>
  <div class="mv-list">
    <mv-item
      v-for="(item, index) in mv_list"
      :key="item.rid"
      :data="item"
      :num="index"
    ></mv-item>
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
import mvItem from "@/components/mvItem.vue";
import { artistMv } from "@/network/api.js";
export default {
  components: {
    mvItem,
  },
  data() {
    return {
      aid: "",
      pn: 1,
      rn: 20,
      mv_list: [],
      total: 0,
    };
  },
  created() {
    this.aid = this.$route.query.aid;
    this.get_artistMv();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_artistMv();
    },
    get_artistMv() {
      artistMv(this.aid, this.pn, this.rn).then((res) => {
        this.mv_list = res.data.mvlist;
        this.total = parseInt(res.data.total);
      });
    },
  },
};
</script>

<style>
.mv-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 20px;
}
</style>