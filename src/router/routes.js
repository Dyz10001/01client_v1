import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import ShopCart from "@/pages/ShopCart";

export default [
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
