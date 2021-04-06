<template>
  <div class="artist">
    <div class="title">
      <span
        :class="{ selected: index === artist_index }"
        v-for="(item, index) in artist_tags"
        :key="item.id"
        @click="artistClicked(item.id, index)"
        >{{ item.name }}</span
      >
    </div>
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
import { artistTags, artistInfo } from "@/network/api.js";
export default {
  components: {
    singerItem,
  },
  data() {
    return {
      artist_tags: [],
      artist_index: 0,
      artist_list: [],
      tag_id: "0",
      pn: 1,
      rn: 30,
      total: 0,
    };
  },
  created() {
    artistTags().then((res) => {
      this.artist_tags = res.data.artist_tags;
      this.get_artistlist(this.tag_id);
    });
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_artistlist();
    },
    artistClicked(id, index) {
      if (id === this.tag_id) return;
      this.tag_id = id;
      this.artist_index = index;
      this.pn = 1;
      this.get_artistlist();
    },

    get_artistlist() {
      const loading = this.$loading({
        text: "加载中",
      });
      artistInfo(this.tag_id, this.pn, this.rn).then((res) => {
        this.artist_list = res.data.artistList;
        this.total = parseInt(res.data.total);
        loading.close();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.artist {
	max-width: 1500px;
	margin: 0 auto;
  &-list {
    display: flex;
    flex-wrap: wrap;
		justify-content: space-evenly;
  }
}
</style>