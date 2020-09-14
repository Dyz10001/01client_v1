import Ajax from "@/ajax/Ajax";
import Mock from "@/ajax/Mock";

//请求三级分类列表 /api/product/getBaseCategoryList
export const reqCategoryList = () => {
  return Ajax({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};

//请求banner图片数据（mock）
export const reqBannerList = () => {
  return Mock({
    url: "/banner",
  });
};

//请求首页Floor图片数据（mock）
export const reqFloorList = () => {
  return Mock({
    url: "/floor",
  });
};

//请求搜索页商品列表
export const reqGoodList = (searchParams) => {
  // console.log(searchParams);
  return Ajax({
    url: "/list",
    method: "POST",
    data: searchParams,
  });
};

//请求详情页数据 /api/item/{ skuId }
export const reqDetailInfo = (skuId) => {
  return Ajax({
    url: `/item/${skuId}`,
    method: "GET",
  });
};

//添加购物车 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddCart = (skuId, skuNum) => {
  return Ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "POST",
  });
};

//获取购物车列表 /api/cart/cartList
export const reqCartList = () => {
  return Ajax({
    url: "/cart/cartList",
    method: "GET",
  });
};

//修改购物车商品（单个）选中状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqChangeIsChecked = (skuId, isChecked) => {
  return Ajax({
    method: "GET",
    url: `/cart/checkCart/${skuId}/${isChecked}`,
  });
};

//删除购物车单个商品 /api/cart/deleteCart/{skuId}
export const reqRemoveSku = (skuId) => {
  return Ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE",
  });
};

//订单交易界面信息 /api/order/auth/trade
export const reqTrade = () => Ajax.get("/order/auth/trade");

//注册  /api/user/passport/register
export const reqReginster = (userInfo) => {
  return Ajax({
    url: `/user/passport/register`,
    method: "POST",
    data: userInfo,
  });
};

//登录 /api/user/passport/login
export const reqLogin = (userInfo) => {
  return Ajax({
    url: `/user/passport/login`,
    method: "POST",
    data: userInfo,
  });
};

//退出登录 /api/user/passport/logout
export const reqLogout = () => {
  return Ajax({
    url: "/user/passport/logout",
  });
};

//提交订单/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitTrade = (tradeNo, tradeInfo) => {
  return Ajax({
    method: "POST",
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data: tradeInfo,
  });
};

//获取订单支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
  return Ajax({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`,
  });
};

//请求订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => {
  return Ajax({
    method: "GET",
    url: `/payment/weixin/queryPayStatus/${orderId}`,
  });
};

//获取我的订单列表/api/order/auth/{page}/{limit}
export const reqOrderList = (page, limit) => {
  return Ajax({
    url: `/order/auth/${page}/${limit}`,
  });
};
