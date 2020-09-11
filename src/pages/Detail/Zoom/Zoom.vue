<template>
  <div class="spec-preview">
    <img :src="skuDefaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big" ref="big">
      <img :src="skuDefaultImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  name: "Zoom",
  // props: ["skuDefaultImg"],
  props: ["imgList"],
  data() {
    return {
      defaultindex: 0,
    };
  },
  methods: {
    move: throttle(
      function(e) {
        const mask = this.$refs.mask;
        const big = this.$refs.big;
        const bigImg = this.$refs.bigImg;
        const { offsetX, offsetY } = e;
        const { clientWidth: maskWidth, clientHeight: maskHeight } = mask;
        const { clientWidth: bigWidth, clientHeight: bigHtight } = big;

        let maskLeft = offsetX - maskWidth / 2;
        let maskTop = offsetY - maskHeight / 2;

        if (maskLeft <= 0) {
          maskLeft = 0;
        } else if (maskLeft >= bigWidth - maskWidth) {
          maskLeft = bigWidth - maskWidth;
        }
        if (maskTop <= 0) {
          maskTop = 0;
        } else if (maskTop >= bigHtight - maskHeight) {
          maskTop = bigHtight - maskHeight;
        }
        mask.style.left = maskLeft + "px";
        mask.style.top = maskTop + "px";
        bigImg.style.left = -2 * maskLeft + "px";
        bigImg.style.top = -2 * maskTop + "px";
        // console.log(e);
      },
      50,
      { trailing: false }
    ),

    //修改默认图片
    changeImg(index) {
      this.defaultindex = index;
    },
  },
  mounted() {
    this.$bus.$on("changeImg", this.changeImg);
  },
  computed: {
    skuDefaultImg() {
      return this.imgList[this.defaultindex] || {};
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
