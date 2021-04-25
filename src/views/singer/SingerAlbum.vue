<template>
  <div class="album-list">
    <album-item
      v-for="(item, index) in album_list"
      :key="item.albumid"
      :data="item"
      :num="index"
    ></album-item>
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
import albumItem from "@/components/albumItem.vue";
import { artistAlbum } from "@/network/api.js";
export default {
  components: {
    albumItem,
  },
  data() {
    return {
      aid: "",
      pn: 1,
      rn: 20,
      album_list: [],
      total: 0,
    };
  },
  created() {
    this.aid = this.$route.query.aid;
    this.get_artistAlbum();
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_artistAlbum();
    },
    get_artistAlbum() {
      artistAlbum(this.aid, this.pn, this.rn).then((res) => {
        this.album_list = res.data.albumList;
        this.total = parseInt(res.data.total);
      });
    },
  },
};
</script>

<style>
.album-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>