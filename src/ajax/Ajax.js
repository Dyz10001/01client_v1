import Axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import store from "@/store";

const Ajax = Axios.create({
  baseURL: "/api",
  timeout: 20000,
});

// 添加请求拦截器
Ajax.interceptors.request.use(function(config) {
  const userTempId = store.state.user.userTempId;
  // 在发送请求之前做些什么
  NProgress.start();
  config.headers.userTempId = userTempId;
  return config;
});

// 添加响应拦截器
Ajax.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    NProgress.done();
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    NProgress.done();
    alert("请求错误" + error.message || 未知错误);
    return new Promise(() => {});
  }
);

export default Ajax;
