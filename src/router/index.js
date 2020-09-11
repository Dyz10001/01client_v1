import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

//修正路由跳往同一地址的报错的错误
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, onResolve, onReject) {
  if (onResolve === undefined && onReject === undefined) {
    originPush.call(this, location).catch(() => {});
  } else {
    originPush.call(this, location, onResolve, onReject);
  }
};
VueRouter.prototype.replace = function(location, onResolve, onReject) {
  if (onResolve === undefined && onReject === undefined) {
    originReplace.call(this, location).catch(() => {});
  } else {
    originReplace.call(this, location, onResolve, onReject);
  }
};

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
export default router;
