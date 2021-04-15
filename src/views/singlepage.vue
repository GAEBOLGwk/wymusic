<template>
  <div>
    <div class="single-top">
      <div class="item-left">
        <img :src="detail.coverImgUrl" alt="" />
      </div>

      <div class="item-right">
        <span> {{ detail.name }} </span>
        <div class="right-tage">
          <span> 标签: </span>
          <span v-for="(tags, index) in detail.tags" :key="index">
            {{ tags }}
          </span>
        </div>
        <div>播放全部</div>
        <div class="right-descrip">
          <span> 简介: </span>
          <span> {{ detail.description }} </span>
        </div>
      </div>
    </div>

    <el-tabs v-model="active_index">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in detail.tracks"
              :key="index"
              @click="play(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="el-icon-video-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span class="el-icon-video-camera"></span>
                  </div>
                  <span></span>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="评论" name="2">
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论<span class="number">({{ total }})</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <span class="date">{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      detail: [],
      active_index: "1",
      comments: [],
      limit: 10,
      page: 1,
      total: 0,
      comTotal:1,

    };
  },
  created() {
    //歌单内容
    axios
      .get("https://autumnfish.cn/playlist/detail", {
        params: { limit: 10, id: this.$route.query.id },
      })
      .then((res) => {
        // console.log(res);
        this.detail = res.data.playlist;
        let arr = this.detail.tracks;

        for (let i = 0; i < arr.length; i++) {
          let duration = arr[i].dt;
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          //console.log(min+" "+sec)
          this.detail.tracks[i].dt = `${min}:${sec}`;
        }
      });
    this.comment()
  },
  methods: {
    comment() {
          // 评论
    axios
      .get("https://autumnfish.cn/comment/playlist", {
        params: {
          id: this.$route.query.id,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      })
      .then((res) => {
        console.log(res);
        this.comments = res.data.comments;
        this.total = res.data.total;

          for(let i=0;i<this.comments.length;i++){
          var unixTimestamp = new Date(this.comments[i].time) ;
          //重载方法
          Date.prototype.toLocaleString = function() {
                this.hour = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
                this.minute = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
                this.second = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
                return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.hour  + ":" + this.minute + ":" + this.second;
          };
          this.comments[i].time = unixTimestamp.toLocaleString();
        }
      });
    },

    change(currentpage) {
      this.page = currentpage;
      this.comment();
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
.item {
  display: flex;
  margin-top: 20px;
  .icon-wrap {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .content {
    margin-bottom: 10px;
    .name {
      color: #517eaf;
      font-size: 14px;
    }
    .comment {
      font-size: 14px;
    }
  }
  .date {
    color: #bebebe;
    font-size: 14px;
  }
}

.img-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 70px;
    height: 70px;
  }
  .el-icon-video-play {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 30px;
    justify-content: center;
    align-items: center;
    -webkit-box-align: center;
    color: #dd6d60;
    transform: translate(-50%, -50%);
  }
}
.el-icon-video-camera {
  margin: 5px;
  color: #dd6d60;
  font-size: 15px;
}

.single-top {
  display: flex;
  width: 100%;
  height: 320px;
  .item-left {
    display: flex;
    margin-right: 30px;
    img {
      width: 230px;
      height: 230px;
    }
  }
  .item-right {
    display: flex;
    border: 10px;
    flex-direction: column;
    .right-tage {
      height: 40px;
      border: 10px;
      line-height: 40px;
      overflow: hidden;
    }
    .right-descrip {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>