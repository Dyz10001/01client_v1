import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import ShopCart from "@/pages/ShopCart";
import AddCartSuccess from "@/pages/AddCartSuccess";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/components/MyOrder";
import GroupOrder from "@/pages/Center/components/GroupOrder";

export default [
  {
    path: "/center",
    name: "Center",
    component: Center,
    children: [
      {
        path: "/center/myOrder",
        component: MyOrder,
      },
      {
        path: "/center/groupOrder",
        component: GroupOrder,
      },
      {
        path: "/",
        redirect: "/myOrder",
      },
    ],
  },
  {
    path: "/paySuccess",
    name: "PaySuccess",
    component: PaySuccess,
  },
  {
    path: "/pay",
    name: "Pay",
    component: Pay,
  },
  {
    path: "/trade",
    name: "Trade",
    component: Trade,
  },
  {
    path: "/addCartSuccess",
    name: "AddCartSuccess",
    component: AddCartSuccess,
  },
  {
    path: "/shopCart",
    name: "ShopCart",
    component: ShopCart,
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/search/:keyword?",
    name: "Search",
    component: Search,
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHide: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHide: true,
    },
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/",
    redirect: "/home",
  },
];
