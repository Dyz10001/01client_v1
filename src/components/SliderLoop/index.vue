<template>
  <div class="swiper-container" ref="banner" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in imgList" :key="img.id">
        <img :src="img.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "SliderLoop",
  props: ["imgList"],
  watch: {
    imgList: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.banner, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped></style>
