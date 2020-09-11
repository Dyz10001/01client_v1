import Vue from "vue";
import Vuex from "vuex";
import home from "./home";
import search from "./search";
import detail from "./detail";
import user from "./user";
import shopCart from "./shopCart";

Vue.use(Vuex);
const state = {};
const getters = {};
const actions = {};
const mutations = {};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,

  modules: {
    home,
    search,
    detail,
    user,
    shopCart,
  },
});
export default store;
