import { reqCartList } from "@/Api";

const state = {
  cartList: [],
};
const mutations = {
  RECEIVECARTLIT(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  async getCartList({ commit }) {
    const result = await reqCartList();
    if (result.code === 200) {
      commit("RECEIVECARTLIT", result.data);
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
