<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />

    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import Brand from "./Brand/Brand";
import Floor from "./Floor/Floor";
import Like from "./Like/Like";
import ListContainer from "./ListContainer/ListContainer";
import Rank from "./Rank/Rank";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import { mapState } from "vuex";
export default {
  name: "Home",
  methods: {
    reqFloorList() {
      this.$store.dispatch("reqFloorList");
    },
  },
  mounted() {
    this.reqFloorList();
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
};
</script>

<style lang="less" scoped></style>
