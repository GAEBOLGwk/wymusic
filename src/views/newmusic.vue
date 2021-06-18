<template>
  <div>
    <div class="new">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in songs"
          :key="index"
          @click="play(item.id)"
        >
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
  </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            songs:[]
        }
    },
    created(){
         axios.get("https://autumnfish.cn/personalized/newsong").then((res) => {
      // console.log(res);
      this.songs = res.data.result;
    });
    }
};
</script>

<style lang="less" scoped>

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
</style>