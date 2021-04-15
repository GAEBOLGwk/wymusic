<template>
  <div>
    <!-- 轮播图 -->
    <div class="banners">
      <el-carousel :interval="4000" type="card" height="230px">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index" @click="touch(item.id)">
          <h6 class="desc">{{ item.copywriter }}</h6>
          <i class="el-icon-video-play"></i>
          <img :src="item.picUrl" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="new">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index" @click="play(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <div class="song-name">
              <span>{{ item.name }}</span>
              <span class="f">{{ item.song.artists[0].name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mv">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mv" :key="index">
          <div class="mv-wrap">
            <img :src="item.picUrl" alt="" />
          </div>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      banners: [],
      songs: [],
      mv: [],
    };
  },
  created() {
    //轮播图
    axios.get("https://autumnfish.cn/banner").then((res) => {
      // console.log(res);
      this.banners = res.data.banners;
    });
    // 推荐歌单
    axios
      .get("https://autumnfish.cn/personalized", {params:{ limit: 10 }})
      .then((res) => {
        // console.log(res);
        this.list = res.data.result;
      });
    // 最新音乐
    axios.get("https://autumnfish.cn/personalized/newsong").then((res) => {
      // console.log(res);
      this.songs = res.data.result;
    });
    // 最新MV
    axios.get("https://autumnfish.cn/personalized/mv").then((res) => {
      // console.log(res);
      this.mv = res.data.result;
    });
  },
  methods: {
    touch(id) {
      console.log(id);
      this.$router.push(`/singlepage?id=${id}`)
    },
     play(id) {
      axios({
          url: 'https://autumnfish.cn/song/url',
          method: 'get',
          params: {
            id 
          }
        }).then(res => {
          // console.log(res)
          let url = res.data.data[0].url
          // this.$emit('play', this.playUrl)
          console.log(url);
          // console.log(this.$parent.musicUrl)
          // 设置给父组件的 播放地址
          this.$parent.musicUrl = url
        })
    },
  },
};
</script>

<style lang="less" scoped>
.el-carousel {
  margin: 10px;
}
.title {
  font-weight: normal;
  margin: 25px 0 25px 0;
  padding-left: 8px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.banners {
  height: 230px;
  width: 100%;
}
.recommend {
  margin-bottom: 40px;
  .items {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 200px;
      margin: 10px;
      position: relative;
      overflow: hidden;
      .desc {
        position: absolute;
        color: white;
        font-size: 16px;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        max-height: 50px;
        padding: 5px;
        overflow: hidden;
        display: none;
      }
      .el-icon-video-play {
        position: absolute;
        top: 68%;
        left: 75%;
        color: #dd6d60;
        font-size: 40px;
        opacity: 0;
        display: none;
      }

      img {
        width: 200px;
        height: 200px;
        border-radius: 5px;
      }
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 14px;
      }
    }
  }
}
.item :hover .desc {
  opacity: 1;
  display: block;
}

.new {
  margin-bottom: 40px;
  .items {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 500px;
    .item {
      height: 100px;
      width: 50%;
      position: relative;
      display: flex;
      align-content: center;
      &:hover {
        background: #f5f5f5;
      }
      .img-wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .song-name {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px;
        height: 100%;
        .f {
          font-size: 16px;
          color: #808080;
          opacity: 0.5;
        }
      }
      img {
        width: 80px;
        height: 80px;
        cursor: pointer;
      }
    }
  }
}

.mv {
  margin-bottom: 40px;
  .items {
    display: flex;
    
    width: 100%;
    position: relative;
    justify-content: space-around;
    .item {
      width: 100%;
      cursor: pointer;
      flex:1;
      justify-content: space-around;
      .mv-wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 160px;
          width: 100%;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>