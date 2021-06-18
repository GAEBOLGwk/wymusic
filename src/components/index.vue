<template>
  <div class="index-container">
    <!-- 导航区域 -->
    <div class="nav" >
         <el-aside width="auto" class="aside">
                <el-menu
                    background-color="#ededed"
                    text-color="#000"
                    active-text-color="#dd6d60"
                    router
                    >
                    <el-menu-item index="/findmusic">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">发现音乐</span>
                    </el-menu-item>
                    <el-menu-item index="/playlist">
                         <i class="el-icon-set-up"></i>
                        <span slot="title">推荐歌单</span>
                    </el-menu-item>
                     <el-menu-item index="/newmusic">
                        <i class="el-icon-service"></i>
                        <span slot="title">最新音乐</span>
                    </el-menu-item>
                     <el-menu-item index="/newvideo">
                        <i class="el-icon-video-camera"></i>
                        <span slot="title">最新MV</span>
                    </el-menu-item>
                </el-menu>
        </el-aside>
    </div>
    <!-- 主题区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <audio autoplay controls :src="musicUrl" class="music" ></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['musicUrl'],
  data() {
    return {
    
    }
  },
  

};
</script>

<style lang="less" scoped>
.music{
  width: 100%;
}
span{
    line-height: 24px;
}
.index-container{
    display: flex;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 60px;
    position: fixed;
      
}
.nav{
    background-color: #ededed;
    width: 200px;
    height: 100%;
}
.player{

    background: #f1f3f4;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
.el-menu-item{
    font-size: 18px;
}

.main{
  flex: 1;
  overflow-y: scroll;
  padding: 10px 20px;
}
.main >div{
  max-width: 1100px;
  margin: 0 auto;
}
</style>
