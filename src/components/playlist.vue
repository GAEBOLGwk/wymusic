<template>
  <div>
    <!-- 歌单顶部 -->
    <div class="boutique">
      <div class="item">
        <div class="item-left">
          <img :src="topList.coverImgUrl" alt="" />
        </div>
        <div class="item-right">
          <h3 class="tag">精品歌单</h3>
          <div class="title">
            {{ topList.name }}
          </div>
          <div class="content">
            {{ topList.description }}
          </div>
        </div>
        <div class="backg">
          <img :src="topList.coverImgUrl" alt="" class="bg" />
        </div>
      </div>
    </div>
    <!-- 歌单导航栏 -->
    <div class="tab-container">
      <div class="tab-bar">
        <span
          class="item-tag"
          :class="{ active: tag == '全部' }"
          @click="tag = '全部'"
          >全部</span
        >
        <span
          class="item-tag"
          :class="{ active: tag == '欧美' }"
          @click="tag = '欧美'"
          >欧美</span
        >
        <span
          class="item-tag"
          :class="{ active: tag == '华语' }"
          @click="tag = '华语'"
          >华语</span
        >
      </div>
      <!-- 歌单列表 -->
      <div class="list-content">
        <div class="list-items">
          <div
            class="list-item"
            v-for="(item, index) in list"
            :key="index"
            @click="tosinglepage(item.id)"
          >
            <div class="num-wrap">
              播放量:
              <span class="num">{{ item.playCount }}</span>
            </div>
            <div class="list-img">
              <img :src="item.coverImgUrl" />
            </div>

            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 总计文件数 -->
    <!-- <div>{{ total }}</div> -->
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      topList: {},
      tag: "全部",
      list: [],
      total: 0,
      page: 1,
    };
  },
  //监听器
  watch: {
    tag() {
      console.log(this.tag);
      this.topData(), this.listData();
      this.page = 1;
    },
  },
  created() {
    this.topData(), this.listData();
  },
  methods: {
    topData() {
      //顶部数据
      axios
        .get("https://autumnfish.cn/top/playlist/highquality", {
          params: { limit: 1, cat: this.tag },
        })
        .then((res) => {
          // console.log(res);
          this.topList = res.data.playlists[0];
        });
    },
    listData() {
      //歌单内容
      axios
        .get("https://autumnfish.cn/top/playlist", {
          params: { limit: 10, cat: this.tag, offset: (this.page - 1) * 10 },
        })
        .then((res) => {
          // console.log(res);
          this.total = res.data.total;
          this.list = res.data.playlists;
        });
    },
    tosinglepage(id) {
      this.$router.push(`/singlepage?id=${id}`);
    },
    change(currentpage) {
      //页面
      this.page = currentpage;
      // console.log(this.page);
      // console.log(this.total);
      this.listData();
    },
  },
};
</script>

<style lang="less" scoped>
@media only screen and (max-width:850px),
only screen and (max-device-width:850px) and(min-device-width:500px){
    .boutique{
      display: none !important;
    }
}



.list-items {
  display: flex;
  flex-wrap: wrap;
  .list-item {
    width: 200px;
    margin: 10px;
    position: relative;
    overflow: hidden;
    &:hover .num-wrap {
      top: 0;
      cursor: pointer;
      transition: 0.5s;
    }
    .num-wrap {
      position: absolute;
      top: -30px;
      left: 0;
      width: 100%;
      height: 30px;
      font-size: 14px;
      color: white;
      line-height: 30px;
      padding-left: 5px;
      overflow: hidden;
    }
    img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
    }
  }
}

span.item-tag.active{
  color: #dd6d60;
}
.tab-bar {
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  // 这里由于是局部原因active无法使用
  // .item-tag .active {
  //     color: #dd6d60;
  // background-color: #fcf6f5;
  // border-radius: 20px;
  //   }
  .item-tag {
    margin-right: 20px;
    color: gray;
  }
}


.boutique {
  width: 100%;
  height: 200px;
  padding: 20px;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}
.item {
  display: flex;
  padding: 10px;
  position: relative;
  background: #888482;
  border-radius: 5px;
  .bg {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    opacity: 0.3;
  }
  .item-left {
    img {
      height: 170px;
      width: 170px;
      border: 10px;
    }
  }
  .item-right {
    display: flex;
    width: 100%;
    flex-direction: column;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
  }
  .tag {
    color: #dfac67;
  }
  .title {
    position: relative;
    display: flex;
    margin: 5px;
    color: #ffffff;
  }
  .content {
    position: relative;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: #c4c1c0;
    -webkit-line-clamp: 5;
    font-size: 14px;
    z-index: 1;
  }
}
.el-pagination {
  margin-top: 50px;
  text-align: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #dd6d60;
  color: #fff;
}
.el-pager li.active {
  color: #dd6d60;
  cursor: default;
}
</style>