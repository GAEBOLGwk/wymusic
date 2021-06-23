<template>
  <div class="top-container">
    <div class="left-top">
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
    </div>

    <div class="right-top">
      <el-input
        type="text"
        size="small"
        prefix-icon="el-icon-search"
        v-model="inputValue"
        placeholder="搜索"
        @keyup.native.enter="toResult"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    toResult() {
      if (!this.inputValue.trim()) {
        return this.$message("warning", "请输入内容");
      }
      // 携带参数跳转路由
      // this.$router.push({
      //   path: "/result",
      //   params: {
      //     key: this.inputValue,
      //   },
      // });
      // path 和params不能同时出现
      // 携带参数跳转路由
      // this.$parent.keywords = this.inputValue
      this.$router.push('/result?query='+this.inputValue)
      
      // 清空搜索框内容
      this.inputValue = "";
    },
  },
};
</script>

<style lang="less" scoped>
.top-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #f9f9f9;
  width: 100vw;
  box-sizing: border-box;
}
.left-top {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100px;
  height: 60px;
  .circle {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    display: inline-block;
    text-align: center;
    line-height: 18px;
    background: #dd6d60;
    border-radius: 50%;
  }
}
.right-top {
  position: absolute;
  right: 30px;
}
</style>