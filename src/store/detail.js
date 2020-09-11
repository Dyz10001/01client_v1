import { reqDetailInfo } from "@/Api";
const state = {
  detailInfo: {},
};
const mutations = {
  RECEIVEDETAILINFO(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
};
const actions = {
  async getDetailInfo({ commit }, skuId) {
    const result = await reqDetailInfo(skuId);
    if (result.code === 200) {
      commit("RECEIVEDETAILINFO", result.data);
    }
  },
};
const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.detailInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
