<template>
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
</template>

<script>
import songItem from "@/components/songItem.vue";
import songHeader from "@/components/songHeader.vue";
import { artistMusic } from "@/network/api.js";
export default {
  components: {
    songItem,
    songHeader,
  },
  data() {
    return {
      aid: "",
      pn: 1,
      rn: 20,
      song_list: [],
      total: 0,
    };
  },
  created() {
    this.aid = this.$route.query.aid;
    this.get_artistMusic();
		let _this = this
    this.$bus.on("playAllSingerMusic", function () {
      _this.$store.commit("changePlaylist", _this.song_list);
      _this.$bus.emit("playMusic");
    });
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_artistMusic();
    },
    get_artistMusic() {
      artistMusic(this.aid, this.pn, this.rn).then((res) => {
        this.song_list = res.data.list;
        this.total = parseInt(res.data.total);
      });
    },
  },
};
</script>

<style>
</style>