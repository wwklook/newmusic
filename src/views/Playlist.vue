<template>
  <div class="playlist">
    <el-container>
      <el-aside width="200px" style="margin: 20px;">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            v-for="item in tag_list"
            :key="item.id"
            :title="item.name"
            :name="item.name"
          >
            <div
              class="tag-item"
              v-for="tag in item.data"
              :key="tag.id"
              @click="changeTag(tag.id)"
            >
              <span :class="{ selected: tag_id === tag.id }">{{
                tag.name
              }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main class="content">
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import playlistItem from "@/components/playlistItem";
import { tagList, tagPlayList } from "@/network/api.js";
export default {
  components: {
    playlistItem,
  },
  data() {
    return {
      tag_list: [],
      playlist: [],
      activeName: "主题",
      tag_id: "1848",
      pn: 1,
      rn: 30,
      total: 0,
    };
  },
  created() {
    tagList().then((res) => {
      this.tag_list = res.data.data;
      this.get_playlist();
    });
  },
  methods: {
    changePage(pn) {
      this.pn = pn;
      this.get_playlist();
    },
    changeTag(id) {
      if (id === this.tag_id) return;
      this.tag_id = id;
      this.pn = 1;
      this.get_playlist();
    },
    get_playlist() {
      const loading = this.$loading({
        text: "加载中",
      });
      tagPlayList(this.tag_id, this.pn, this.rn)
        .then((res) => {
          this.playlist = res.data.data;
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
.playlist {
  max-width: 1400px;
  margin: 0 auto;
}
.content {
  margin-top: 20px;
}
.active {
  background-color: #66ccff;
}
.tag-item {
  font-size: 15px;
  position: relative;
  cursor: pointer;
}

.rcm {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
