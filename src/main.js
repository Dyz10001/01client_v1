import Vue from "vue";
import App from "./App";

import router from "@/router";
import store from "@/store";
import "@/mock/mockServe";
import TypeNav from "@/components/TypeNav";
import SliderLoop from "@/components/SliderLoop";
import Pagination from "@/components/Pagination";

Vue.component("TypeNav", TypeNav);
Vue.component("SliderLoop", SliderLoop);
Vue.component("Pagination", Pagination);

const vm = new Vue({
  el: "#app",
  //全局事件总线注入
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: (h) => h(App),
});
