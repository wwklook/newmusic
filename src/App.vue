<template>
  <router-view v-slot="{ Component }"
    ><keep-alive> <component class="view" :is="Component" /> </keep-alive
  ></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("~@/assets/css/iconfont.css");
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover,
a:active,
a:focus,
a:visited {
  color: inherit;
}

h1 {
  font-size: 32px;
}

h2 {
  font-size: 26px;
  margin-top: 10px;
}

h3 {
  font-size: 28px;
  margin-right: 20px;
}

img {
  width: 100%;
}

li {
  list-style-type: none;
}

span {
  cursor: pointer;
  position: relative;
}

.title {
  display: flex;
  align-items: center;
  margin: 40px 20px;
}

.title span {
  margin: 0 20px;
}

.playall {
  margin-left: 20px;
  font-size: 18px;
  color: #fff;
  background-color: #aaa;
  padding: 5px 20px;
  border-radius: 20px;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f2f2f2;
}

.selected {
  font-weight: bold;
  z-index: 1;
}

.selected::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 6px;
  bottom: 0;
  left: 0;
  border-radius: 3px;
  background-color: #66ccff;
  z-index: -1;
}

.icon-right {
  font-size: 12px;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-main {
  padding: 0 !important;
}
</style>
