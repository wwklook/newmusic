<template>
  <el-container>
    <el-header v-if="isShow">
      <headers></headers>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component }"
        ><keep-alive :include="['Recommend', 'Rank']">
          <component class="view" :is="Component" /> </keep-alive
      ></router-view>
    </el-main>
    <el-footer v-if="isShow">
      <control></control>
    </el-footer>
  </el-container>
</template>

<script>
import Headers from "@/components/headers";
import Control from "@/components/control";
export default {
  components: { Headers, Control },
  computed: {
    isShow() {
      return !["Login", "Register"].includes(this.$route.name);
    },
  },
};
</script>

<style></style>
