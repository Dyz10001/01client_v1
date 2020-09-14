import Vue from "vue";
import { MessageBox, Message, Pagination } from "element-ui";
import App from "./App";

import router from "@/router";
import store from "@/store";
import "@/mock/mockServe";
import TypeNav from "@/components/TypeNav";
import SliderLoop from "@/components/SliderLoop";
import Pagination1 from "@/components/Pagination";
import * as API from "@/Api";

Vue.component("TypeNav", TypeNav);
Vue.component("SliderLoop", SliderLoop);
Vue.component("Pagination1", Pagination1);
//elementUi
Vue.use(Pagination);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

const vm = new Vue({
  el: "#app",
  //全局事件总线注入
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
  render: (h) => h(App),
});
