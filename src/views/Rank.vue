<template>
  <div class="rank">
    <el-collapse class="aside" v-model="activeName" accordion>
      <el-collapse-item
        v-for="item in rank_menu"
        :key="item.name"
        :title="item.name"
        :name="item.name"
      >
        <div
          class="rank-item"
          v-for="rank in item.list"
          :key="rank.id"
          @click="changeRank(rank)"
        >
          <span :class="{ selected: rank.sourceid === rid }">{{
            rank.name
          }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="song-list">
      <div class="title">
        <h1>{{ rank_info.name }}</h1>
        <div class="playall" @click="playAll">播放全部</div>
      </div>
      <song-header></song-header>
      <song-item
        v-for="(item, index) in rank_list"
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
import { rankMenu, rankList } from "@/network/api.js";
import songItem from "@/components/songItem.vue";
import songHeader from "@/components/songHeader.vue";
export default {
  name: "Rank",
  components: {
    songItem,
    songHeader,
  },
  data() {
    return {
      activeName: "官方榜",
      rank_menu: [],
      rank_list: [],
      total: 0,
      pn: 1,
      rn: 20,
      rid: "",
      rank_info: {},
    };
  },
  created() {
    rankMenu().then((res) => {
      this.rank_menu = res.data.data;
      this.changeRank(this.rank_menu[0].list[0]);
    });
  },
  methods: {
    changeRank(rank) {
      if (rank.sourceid === this.rid) return;
      this.rank_info = rank;
      this.rid = rank.sourceid;
      this.pn = 1;
      this.rank_list = [];
      this.getRankList();
    },
    changePage(pn) {
      this.pn = pn;
      this.getRankList();
    },
    getRankList() {
      const loading = this.$loading({
        text: "加载中",
      });
      rankList(this.rid, this.pn, this.rn).then((res) => {
        this.rank_list = res.data.musicList;
        this.total = parseInt(res.data.num);
        loading.close();
      });
    },
		playAll() {
			this.$store.commit("changePlaylist", this.rank_list)
			this.$bus.emit("playMusic");
		}
  },
};
</script>

<style lang="scss" scoped>
.aside {
  width: 200px;
}

.rank {
  display: flex;
	margin-left: 20px;
	max-width: 1500px;
	margin: 0 auto;
}

.song {
  &-list {
    flex: 1;
		margin-left: 20px;
  }
  &-item {
    padding: 5px 10px;
    font-size: 15px;
    cursor: pointer;
  }
}
</style>