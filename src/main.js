import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mitt from "mitt";
import installElementPlus from "./plugins/element";
import Cookies from "js-cookie";
import { getUserInfo, getCSRFtoken } from "@/network/profile.js";

const app = createApp(App);

app.config.globalProperties.$bus = new mitt(); //绑定事件总线
installElementPlus(app);
app
  .use(store)
  .use(router)
  .mount("#app");

getCSRFtoken().then((res) => {
  store.commit("setToken", res.data.token);
});

// 获取本地配置信息
const setting = {
  volume: 80,
  play_list: [],
  loop: "loop",
  play_index: 0,
  main_color: "#fff",
  show_lrc: false,
};

store.commit("changeSetting", setting);

// 获取用户“我喜欢”列表
getUserInfo().then((res) => {
  if (!res.data.login) return;
  store.commit("Init", res.data);
});

// 获取用户播放历史
let historyList = JSON.parse(localStorage.getItem("historyList")) || [];
store.commit("changeHistoryList", historyList);
