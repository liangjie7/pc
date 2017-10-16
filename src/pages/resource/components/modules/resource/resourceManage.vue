<template>
  <div id="resource-content">
    
    <div id="r-toolbar">
      <el-select placeholder="请选择" v-model="value" class="r-select r-btn-style">
        <el-option label="全部" value="all"></el-option>
        <el-option label="图片" value="pic"></el-option>
        <el-option label="视频" value="video"></el-option>
        <el-option label="文档" value="doc"></el-option>
        <el-option label="音乐" value="music"></el-option>
      </el-select>
      <button class="upload r-button"><input type="file"/><img src="../../../../assets/img/upload1.png" class="icon" /><span class="label">上传资源</span></button>
      <button class="r-button r-btn-style"><img src="../../../../assets/img/download.png" class="icon" /><span class="label">下发资源</span></button>
      <button class="r-button r-btn-style"><img src="../../../../assets/img/build.png" class="icon" /><span class="label">新建文件</span></button>
      <button class="r-button r-btn-style"><img src="../../../../assets/img/more.png" class="icon" /><span class="label">更多选择</span></button>
    </div>
    <div id="route-bar" class="el-row">
      <div href="javascript:;" class="reback"></div>
      <div class="route-wrapper">
        <span>
              <a href="javascript:;">全部文件</a>
              <span><img src="../../../../assets/img/arrow.png" ></span>
        </span>
        <span>
              <a href="javascript:;">文件夹</a>
              <span><img src="../../../../assets/img/arrow.png" ></span>
        </span>
      </div>
      <el-input placeholder="输入关键名" icon="search" class="r-search">
      </el-input>
      <div class="sort"></div>
      <div href="javascipt:;" class="list" title="" @click="changeView"></div>
      <div href="javascipt:;" class="fresh" title="刷新"></div>
    </div>
    <router-view></router-view>
    
    
  </div>
</template>

<script>
  import List from "./list";
  import Grid from "./grid"
  export default {
    data() {
      return {
        value: 'all',
        currentView: 'List',
        // childAuth:this.$store.state.auth,
      }
    },
    methods: {
      changeView() {
        var path = this.$route.path;
        var lastpath = path.split("/")[path.split("/").length - 1];
       
        if (lastpath == 'list') {
          var queryvalue = this.$route.query;
          if (queryvalue.path != "") {
          }
          this.$router.push({
            path: "grid",
            query: queryvalue
          });
        } else {
          this.$router.push({
            path: "list"
          });
        }
      },
      
    },
    created(){
      this.auth = this.$store.state.auth;
   
    },
    
    computed:{
      childAuth(){
        console.log('112')
        return this.$store.state.auth
      }
    },
    components: {
      List,
      Grid
    },
    
  }
</script>

<style lang="scss" scoped>
  
 
</style>
