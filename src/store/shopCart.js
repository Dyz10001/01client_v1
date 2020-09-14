import { reqCartList, reqChangeIsChecked, reqRemoveSku } from "@/Api";

const state = {
  cartList: [],
};
const mutations = {
  RECEIVECARTLIT(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //请求购物车列表
  async getCartList({ commit }) {
    const result = await reqCartList();
    if (result.code === 200) {
      commit("RECEIVECARTLIT", result.data);
    }
  },

  //请求修改单个商品选中状态
  async reqChangeIsChecked({ commit }, { skuId, isChecked }) {
    const result = await reqChangeIsChecked(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("请求失败"));
    }
  },

  //请求修改多个商品状态
  reqIsCheckAll({ dispatch, state }, isChecked) {
    let promises = [];
    state.cartList.forEach((item) => {
      if (item.isChecked === isChecked) return;
      const promise = dispatch("reqChangeIsChecked", {
        skuId: item.skuId,
        isChecked,
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },

  //删除购物车一个商品
  async removeSku({ commit }, skuId) {
    const result = await reqRemoveSku(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //删除全部选中商品
  reqRemoveAllSku({ commit, dispatch, state }) {
    let promises = [];
    state.cartList.forEach((item) => {
      if (item.isChecked === 0) return;
      const promise = dispatch("removeSku", item.skuId);
      promises.push(promise);
    });
    return Promise.all(promises);
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
