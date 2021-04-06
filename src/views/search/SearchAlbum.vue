<template>
  <div>
    <div class="album-list">
      <album-item v-for="item in album_list" :key="item.albumid" :data="item" />
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
import albumItem from "@/components/albumItem.vue";
import { searchAlbum } from "@/network/api.js";
export default {
  components: {
    albumItem,
  },
  data() {
    return {
      pn: 1,
      rn: 20,
      album_list: [],
      total: 0,
      keyword: "",
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.get_searchAlbum();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_searchAlbum();
    },
    get_searchAlbum() {
      searchAlbum(this.keyword, this.pn, this.rn).then((res) => {
        this.album_list = res.data.albumlist;
        this.total = parseInt(res.data.total);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.album-list {
  display: flex;
  justify-content: space-evenly;
	flex-wrap: wrap;
}
</style>