<template>
  <div class="pagination">
    <button :disabled="page <= 1" @click="changePage(page - 1)">上一页</button>
    <button v-if="startEnd.start > 1" @click="changePage(1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <button
      v-show="pageNum >= startEnd.start"
      v-for="pageNum in startEnd.end"
      :key="pageNum"
      :class="{ active: pageNum === page }"
      @click="changePage(pageNum)"
    >
      {{ pageNum }}
    </button>

    <button v-if="startEnd.end < totalPage - 1">···</button>
    <button v-if="startEnd.end < totalPage" @click="changePage(totalPage)">
      {{ totalPage }}
    </button>
    <button :disabled="page >= totalPage" @click="changePage(page + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["page", "total", "pageSize", "continuePage"],
  methods: {
    changePage(page) {
      if (page < 0) return;
      if (page > this.totalPage) return;
      this.$emit("changePage", page);
    },
  },
  computed: {
    //计算总页码
    totalPage(page) {
      return Math.ceil(this.total / this.pageSize);
    },
    startEnd() {
      const { totalPage, total, continuePage, page } = this;
      let start = null;
      let end = null;
      let disNum = 0;
      if (totalPage < continuePage) {
        start = 1;
        end = totalPage;
      } else {
        start = page - Math.floor(continuePage / 2);
        end = page + Math.floor(continuePage / 2);
        if (start < 1) {
          disNum = 1 - start;
          start = start + disNum;
          end = end + disNum;
        } else if (end > totalPage) {
          disNum = totalPage - end;
          start = start + disNum;
          end = end + disNum;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
