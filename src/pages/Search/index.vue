<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchInfo.categoryName">
              {{ searchInfo.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchInfo.keyword">
              {{ searchInfo.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- trademark -->
            <li class="with-x" v-show="searchInfo.trademark">
              {{ (searchInfo.trademark || "").split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchInfo.props"
              :key="prop"
            >
              {{ prop.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @searchForTrademark="searchForTrademark"
          @searchForAttr="searchForAttr"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: orderFlag === '1' }">
                  <a href="javascript:;" @click="changeOrder('1')"
                    >综合<i
                      v-show="orderFlag === '1'"
                      class="iconfont"
                      :class="{
                        icondown: orderType === 'desc',
                        iconup: orderType === 'asc',
                      }"
                    ></i
                  ></a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{ active: orderFlag === '2' }">
                  <a href="javascript:;" @click="changeOrder('2')"
                    >价格<i
                      v-show="orderFlag === '2'"
                      class="iconfont"
                      :class="{
                        icondown: orderType === 'desc',
                        iconup: orderType === 'asc',
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:;" @click="toDetail(good.id)"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            :page="searchInfo.pageNo"
            :total="goodInfoList.total"
            :pageSize="searchInfo.pageSize"
            :continuePage="5"
            @changePage="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchInfo: {
        category1Id: "61",
        category2Id: "",
        category3Id: "",
        categoryName: "手机",
        keyword: "",
        order: "1:desc", //排序规则
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
      },
    };
  },
  beforeMount() {
    this.handelSearchParams();
  },
  mounted() {
    this.$store.dispatch("getGoodInfoList", this.searchInfo);
  },

  methods: {
    //处理搜索参数,由于在mounted发送请求，需要在beforeMount中整理参数
    handelSearchParams() {
      const { keyword } = this.$route.params;
      // console.log(keyword);
      const {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;
      const searchInfo = {
        ...this.searchInfo,
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      };
      const searchKeys = Object.keys(searchInfo);
      searchKeys.forEach((item) => {
        if (searchInfo[item] === "") {
          delete searchInfo[item];
        }
      });
      this.searchInfo = searchInfo;
    },

    //根据品牌搜索
    searchForTrademark(trademark) {
      this.pageNo = 1;
      this.searchInfo.trademark = trademark;
      this.$store.dispatch("getGoodInfoList", this.searchInfo);
    },

    //根据属性搜索
    searchForAttr(attrInfo) {
      this.pageNo = 1;
      this.searchInfo.props.push(attrInfo);
      this.$store.dispatch("getGoodInfoList", this.searchInfo);
    },

    //删除三级分类列表面包屑
    removeCategoryName() {
      this.searchInfo.categoryName = "";
      this.pageNo = 1;
      const loaction = { name: "Search" };
      // this.$store.dispatch("getGoodInfoList", this.searchInfo);
      const params = this.$route.params;
      if (params) {
        loaction.params = params;
      }
      this.$router.replace(loaction);
    },

    //删除品牌面包屑
    removeTrademark() {
      this.searchInfo.trademark = "";
      this.searchInfo.pageNo = 1;
      this.$store.dispatch("getGoodInfoList", this.searchInfo);
    },

    //删除关键字搜索面包屑
    removeKeyword() {
      this.searchInfo.keyword = "";
      this.pageNo = 1;
      const loaction = { name: "Search" };
      const query = this.$route.query;
      // this.$store.dispatch("getGoodInfoList", this.searchInfo);
      if (query) {
        loaction.query = query;
      }
      this.$bus.$emit("removeKeyword");
      this.$router.replace(loaction);
    },

    //删除平台属性面包屑
    removeAttr(index) {
      this.searchInfo.props.splice(index, 1);
      this.searchInfo.pageNo = 1;
      this.$store.dispatch("getGoodInfoList", this.searchInfo);
    },

    //综合排序规则
    changeOrder(index) {
      let [orderFlag, orderType] = this.searchInfo.order.split(":");
      if (index === orderFlag) {
        orderType = orderType === "desc" ? "asc" : "desc";
      } else {
        orderFlag = index;
        orderType = "desc";
      }
      this.searchInfo.order = `${orderFlag}:${orderType}`;
      console.log(this.searchInfo.order);
      this.$store.dispatch("getGoodInfoList", this.searchInfo);
    },

    //更改页码
    changePage(page = 1) {
      this.searchInfo.pageNo = page;
      this.$store.dispatch("getGoodInfoList", this.searchInfo);
    },

    //去往详情页
    toDetail(skuId) {
      this.$router.push(`/detail?skuId=${skuId}`);
    },
  },

  computed: {
    ...mapGetters(["goodsList"]),
    // ...mapState(["goodInfoList"]),
    ...mapState({
      goodInfoList: (state) => state.search.goodInfoList || {},
    }),
    orderFlag() {
      return (this.searchInfo.order || "").split(":")[0];
    },
    orderType() {
      return (this.searchInfo.order || "").split(":")[1];
    },
  },
  components: {
    SearchSelector,
  },
  watch: {
    //监视路由变化，发送请求
    $route() {
      this.handelSearchParams();
      this.$store.dispatch("getGoodInfoList", this.searchInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
