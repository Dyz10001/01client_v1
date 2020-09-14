import { getUserTempId } from "@/utils/userAbout";
import { reqReginster, reqLogin, reqLogout } from "@/Api";
const state = {
  userTempId: getUserTempId(),
  userInfo: JSON.parse(localStorage.getItem("USETTOCKEN_KEY")) || {},
};
const mutations = {
  RECEIVEUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  RECEIVELOGOUT(state) {
    state.userInfo = {};
  },
};
const actions = {
  async getReginster({ commit }, userInfo) {
    // console.log(userInfo);
    const result = await reqReginster(userInfo);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //登录
  async getLogin({ commit }, useInfo) {
    const result = await reqLogin(useInfo);
    if (result.code === 200) {
      commit("RECEIVEUSERINFO", result.data);
      localStorage.setItem("USETTOCKEN_KEY", JSON.stringify(result.data));
      // return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //退出登录
  async getLogout({ commit }) {
    const result = await reqLogout();
    if (result.code === 200) {
      commit("RECEIVELOGOUT");
      localStorage.removeItem("USETTOCKEN_KEY");
      return "ok";
    } else {
      return Promise.reject("failed");
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
