import { reqCategoryList, reqBannerList, reqFloorList } from "@/Api";
const state = {
  categoryList: {},
  bannerList: [],
  floorList: [],
};
const mutations = {
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  RECEIVEBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  RECEIVEFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  //请求三级分类列表
  async getCategoryList({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("RECEIVECATEGORYLIST", result.data);
    }
  },

  //请求banner数据
  async reqBannerList({ commit }) {
    const result = await reqBannerList();
    if (result.code === 200) {
      commit("RECEIVEBANNERLIST", result.data);
    }
  },

  //请求Floor数据
  async reqFloorList({ commit }) {
    const result = await reqFloorList();
    if (result.code === 200) {
      commit("RECEIVEFLOORLIST", result.data);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
