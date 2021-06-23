<template>
  <div>
    <div class="top-wrap">
      <div>
        
        <ul class="tabs-wrap">
        <span>地区:</span>
          <li class="tab">
            <span class="title" :class="{active:area=='全部'}" @click="area='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='内地'}" @click="area='内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='港台'}" @click="area='港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='欧美'}" @click="area='欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='日本'}" @click="area='日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='韩国'}" @click="area='韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <div>
        
        <ul class="tabs-wrap">
        <span>类型:</span>
          <li class="tab">
            <span class="title" :class="{active:type=='全部'}" @click="type='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:type=='官方版'}" @click="type='官方版'">官方</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:type=='原声'}" @click="type='原声'">原声</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:type=='现场版'}" @click="type='现场版'">现场</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:type=='网易出品'}" @click="type='网易出品'">网易</span>
          </li>
        </ul>
      </div>
      <div>
        
        <ul class="tabs-wrap">
        <span>排序:</span>
          <li class="tab">
            <span class="title" :class="{active:order=='上升最快'}" @click="order='上升最快'">最快</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:order=='最热'}" @click="order='最热'">最热</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:order=='最新'}" @click="order='最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="mv-list">
      <div class="items">
        <div class="item"  v-for="(item,index) in mvlist" :key="index" @click="toMv(item.id)">
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="num-wrap">
              <div class="el-icon-caret-right"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
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
      :page-size="8"
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
      mvlist: [],
      total: 20,
      page: 1,
      limit: 8,
      area: "全部",
      type: "全部",
      order: "上升最快",
    };
  },
  watch: {
    area(){
      this.page=1;
      this.getmv();
    },
    type(){
      this.page=1;
      this.getmv();
    },
    order(){
      this.page=1;
      this.getmv();
    }
  },
  created() {
      this.getmv()
  },
  
  methods: {

    toMv(id){
       this.$router.push(`/video?id=${id}`)
    },

    getmv() {
      // 最新音乐
      axios
        .get("https://autumnfish.cn/mv/all", {
          params: {
            area: this.area,
            type: this.type,
            order: this.order,
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
          },
        })
        .then((res) => {
          //   console.log(res);
          this.mvlist = res.data.data;
        //  这里和下面的区别是什么 区别在于判断总数 this.total = res.data.count;
          if(res.data.count){
          this.total=res.data.count
          }
        });
    },
    change(currentpage) {
        this.page = currentpage;
        this.getmv();
    },
  },
};
</script>

<style lang="less" scoped>
@media only screen and (max-width:850px),
only screen and (max-device-width:850px) and(min-device-width:500px){
    span{
      display: flex;
      direction: columns;
      align-items: center;
    }
}

li{
  list-style: none;
}
.tabs-wrap {
    display: flex;
    margin: 20px;
    .title {
        margin: 10px;
        color: gray;
    }
}

.el-pagination {
  margin-top: 50px;
  text-align: center;
}

span.title.active{
  color: #dd6d60;
}

.items{
    display: flex;
    flex-wrap: wrap;
    .item{
        width: 250px;
        position: relative;
        overflow: hidden;
        margin-right: 10px;
        .img-wrap{
            display: flex;
            img{
                height: 140px;
                width: 250px;
                border-radius: 8px;
            }
            .num {
                position: absolute;
                left: 86%;
                color: white;
                }
            .el-icon-caret-right {
                position: absolute;
                left: 76%;
                color: white;
                font-size: 20px;
                }
            
        }
        
        
    }
}
</style>