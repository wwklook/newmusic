<template>
  <div class="mv">
    <div class="title">
      <span
        :class="{ selected: tag_index === index }"
        v-for="(item, index) in mv_tags"
        :key="item.id"
        @click="mvClicked(item.id, index)"
        >{{ item.name }}</span
      >
    </div>
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
import { tagMV, mvList } from "@/network/api.js";
export default {
  components: {
    mvItem,
  },
  data() {
    return {
      mv_tags: [],
      tag_index: 0,
      mvlist: [],
      tag_id: "",
      pn: 1,
      rn: 30,
      total: 0,
    };
  },

  created() {
    tagMV().then((res) => {
      this.mv_tags = res.data.mv_tags;
      this.tag_id = res.data.mv_tags[0].id;
      this.pn = 1;
      this.get_mvlist();
    });
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_mvlist();
    },
    mvClicked(id, index) {
      if (index === this.tag_index) return;
      this.tag_index = index;
      this.tag_id = id;
      this.pn = 1;
      this.get_mvlist();
    },
    get_mvlist() {
      const loading = this.$loading({
        text: "加载中",
      });
      mvList(this.tag_id, this.pn, this.rn)
        .then((res) => {
          this.mvlist = res.data.mvlist;
          this.total = res.data.total;
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
  max-width: 1400px;
  margin: 0 auto;
  &-list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 0 20px;
  }
}
</style>
