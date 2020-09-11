<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @click="toSearch">
      <div @mouseleave="moveLeaveDiv" @mouseenter="moveInDiv">
        <!-- 标题 -->
        <h2 class="all">全部商品分类</h2>
        <!-- 三级分类列表 -->
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(category, index) in categoryList"
              :class="{ item_on: currentIndex === index }"
              :key="category.categoryId"
              @mouseenter="showCategory(index)"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-categoryName="category.categoryName"
                  :data-category1Id="category.categoryId"
                  >{{ category.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="(c1, index) in category.categoryChild"
                    :key="c1.categoryId"
                  >
                    <dt>
                      <a
                        href="javascript:;"
                        :data-categoryName="c1.categoryName"
                        :data-category2Id="c1.categoryId"
                        >{{ c1.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c2, index) in c1.categoryChild"
                        :key="c2.categoryId"
                      >
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category3Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="javascript:;">服装城</a>
        <a href="javascript:;">美妆馆</a>
        <a href="javascript:;">尚品汇超市</a>
        <a href="javascript:;">全球购</a>
        <a href="javascript:;">闪购</a>
        <a href="javascript:;">团购</a>
        <a href="javascript:;">有趣</a>
        <a href="javascript:;">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  methods: {
    //显示三级分类列表
    showCategory: throttle(
      function(index) {
        this.currentIndex = index;
        //console.log(index);
      },
      30,
      { trailing: false }
    ),

    //点击三级分类列表的某一项，去往搜索页面
    toSearch(event) {
      let {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = event.target.dataset;
      // console.log(event.target.dataset);
      // console.log(categoryName);
      if (categoryname) {
        const location = { name: "Search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        if (this.$route.params.keyword) {
          location.params = { keyword: this.$route.params.keyword };
        }
        // console.log(location);
        if (this.$route.path === "/home") {
          this.$router.push(location);
        } else {
          this.$router.replace(location);
        }
      }
    },

    //进入div显示三级分类列表
    moveInDiv() {
      this.isShow = true;
    },
    moveLeaveDiv() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &.item_on {
            .item-list {
              display: block;
            }
          }
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}
</style>
