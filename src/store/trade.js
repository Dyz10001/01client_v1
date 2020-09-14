import { reqTrade, reqSubmitTrade } from "@/Api";
const state = {
  tradeInfo: {},
};
const mutations = {
  RECEIVETRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
};
const actions = {
  //获取订单信息
  async getTradeInfo({ commit }) {
    const result = await reqTrade();
    if (result.code === 200) {
      commit("RECEIVETRADEINFO", result.data);
    }
  },

  //提交订单
  async getSubmitTrade({ commit }, { tradeNo, tradeInfo }) {
    // console.log(tradeNo, tradeInfo);
    const result = await reqSubmitTrade(tradeNo, tradeInfo);
    if (result.code === 200) {
      return result.data;
    } else {
      return Promise.reject(new Error(result.message));
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
