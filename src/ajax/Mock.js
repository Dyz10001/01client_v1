import Axios from "axios";
import nProgress from "nprogress";

const instance = Axios.create({
  baseURL: "/mock",
  timeout: "20000",
});
instance.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});
instance.interceptors.response.use(
  (result) => {
    nProgress.done();
    return result.data;
  },
  (error) => {
    nProgress.done();
    alert("网络请求错误" + error.message);
    return new Promise(() => {});
  }
);
export default instance;
