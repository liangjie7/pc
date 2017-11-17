//侧边栏
<template>
  <div id="aside">
    <div class="gotoIndex" @click="gobackIndex">
      <img src="../../assets/img/index.png" alt="平台首页" title="返回平台首页">
      <span>平台首页</span>
    </div>
    <div id="site-nav">
      <div class="section_wrapper">
        <div @click="showReview('platform')" class="section-header">
          <router-link tag="a" href="javascript:;" exact class="platform_review " to="/platform" active-class="site_active"><img src="../../assets/img/permissions.png" />平台概览</router-link>
        </div>
        <ul v-show="showAside == 'platform'" class="platformList">
          <router-link v-for="i in sitelist" :to="{'path':'/subsite/'+i.subsystem_id}" :key="i.subsystem_id"  @click.native="getSingleInfo(i)" class="site-aside" tag="li" active-class="site_active"><span>{{i.subsystem_name}}</span></router-link>
        </ul>
      </div>
      <div class="section_wrapper">
        <div @click="showReview('version')" class="section-header">
          <router-link tag="a" href="javascript:;" exact class="platform_review " to="/version" active-class="site_active"><img src="../../assets/img/permissions.png" />版本管理</router-link>
        </div>
        <ul v-show="showAside == 'version'">
          <router-link to="/version/subSystem" class="site-aside" tag="li" active-class="site_active"><span>子系统版本</span></router-link>
          <router-link to="/version/teminal" class="site-aside" tag="li" active-class="site_active"><span>终端版本</span></router-link>
        </ul>
      </div>
      <div class="section_wrapper">
        <div @click="showReview('mistake')" class="section-header"> 
          <router-link tag="a" href="javascript:;" exact class="platform_review " to="/mistake" active-class="site_active"><img src="../../assets/img/permissions.png" />报错管理</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    data() {
      return {
        showAside: '', //平台概览展示
        sitelist:[],
      }
    },
    methods: {
      gobackIndex() {
        location.assign(window.g.path + 'index.html');
      },
      showReview(show) {
      
        if (show == this.showAside) {
          this.showAside = "";
        } else {
          this.showAside = show;
          this.getSubsite();
        }
      },
      getSubsite(){
        var vm = this;
        var params = {
          data:{

          },
          successFn(res){
            vm.sitelist = res.subsiteList;
            vm.$store.commit('initSitelist', res.subsiteList);
          }
        };
        this.$store.dispatch("getSubsite",params);
      },
      getRoute(){
        if(this.$route.name == 'site' || this.$route.name =='platform' ){
          this.showAside = 'platform';
        }
      },
      getSingleInfo(data){
        this.$store.commit('getsingleSite', data);
      }
    },
    created(){
      this.getSubsite();
      this.getRoute();
     
     
    },
    watch:{
      '$route' (to, from) {
         this.getRoute();  
        }
    }
  }
</script>

<style lang="scss">

</style>
