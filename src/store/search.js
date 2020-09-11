import { reqGoodList } from "@/Api/index";
const state = {
  goodInfoList: {},
};
const mutations = {
  RECEIVEGOODINFOLIST(state, goodInfoList) {
    state.goodInfoList = goodInfoList;
  },
};
const actions = {
  async getGoodInfoList({ commit }, searchParams) {
    // console.log(searchParams);
    const result = await reqGoodList(searchParams);
    if (result.code === 200) {
      commit("RECEIVEGOODINFOLIST", result.data);
    }
  },
};
const getters = {
  goodsList(state) {
    return state.goodInfoList.goodsList || [];
  },
  trademarkList(state) {
    return state.goodInfoList.trademarkList || [];
  },
  attrsList(state) {
    return state.goodInfoList.attrsList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
