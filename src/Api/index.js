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
