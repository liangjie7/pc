//侧边栏
<template>
  <div id="aside">
    <div class="gotoIndex" @click="gobackIndex">
      <img src="../../assets/img/index.png" alt="平台首页" title="返回平台首页">
      <span>平台首页</span>
    </div>
    <div id="site-nav">
      <div class="section_wrapper" v-show="subsite_view_show" @click="getId(subsite_view_id)">
        <div @click="showReview('platform')" class="section-header">
          <router-link tag="a" href="javascript:;" exact class="platform_review " to="/platform" active-class="site_active"><img src="../../assets/img/permissions.png" />平台概览</router-link>
          <img src="../../assets/img/down.png" alt="" class="icon" v-show="showAside == 'site'">
          <img src="../../assets/img/right.png" alt="" class="icon" v-show="showAside != 'site'">
        </div>
        <ul v-show="showAside == 'site'" class="platformList">
          <router-link :title="i.subsystem_name" v-for="i in sitelist" :to="{'path':'/subsite/'+i.subsystem_id}" :key="i.subsystem_id" @click.native="getSingleInfo(i)" class="site-aside" tag="li" active-class="site_active"><span>{{i.subsystem_name}}</span></router-link>
        </ul>
      </div>
      <div class="section_wrapper" v-show="subsite_version_show"  @click="getId(subsite_version_id)">
        <div @click="showReview('version')" class="section-header" :class="{'active':showAside == 'version'}">
          <router-link tag="a" href="javascript:;" exact class="platform_review " to="/version" active-class="site_active"><img src="../../assets/img/editor.png" />版本管理</router-link>
          <img src="../../assets/img/down.png" alt="" class="icon" v-show="showAside == 'version'">
          <img src="../../assets/img/right.png" alt="" class="icon" v-show="showAside != 'version'">
        </div>
        <ul v-show="showAside == 'version'">
          <router-link to="/version/subSystem" class="site-aside" tag="li" active-class="site_active"><span>服务器版本</span></router-link>
          <router-link to="/version/terminal" class="site-aside" tag="li" active-class="site_active"><span>终端版本</span></router-link>
        </ul>
      </div>
      <div class="section_wrapper" v-show="subsite_live_show"  @click="getId(subsite_live_id)">
        <div @click="showReview('error')" class="section-header" :class="{'active':showAside == 'error'}">
          <router-link tag="a" href="javascript:;" exact class="platform_review " to="/live" active-class="site_active"><img src="../../assets/img/cdn.png" />直播分发</router-link>
        </div>
      </div>
      <div class="section_wrapper" v-show="subsite_errorlog_show"  @click="getId(subsite_errorlog_id)">
        <div @click="showReview('error')" class="section-header" :class="{'active':showAside == 'error'}">
          <router-link tag="a" href="javascript:;" exact class="platform_review " to="/error" active-class="site_active"><img src="../../assets/img/warning.png" />报错信息</router-link>
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
        showIndex: "", //点的是不是section-header
        sitelist: [],
        subsite_live_show: false, //直播分发
        subsite_live_id:"",
        subsite_errorlog_show: false, //报错信息
        subsite_errorlog_id: "", 
        subsite_version_show: false, //版本管理
        subsite_version_id:"",
        subsite_view_show: false, //平台概览
        subsite_view_id:"",
        auth_id:[],
        
      }
    },
    methods: {
      gobackIndex() {
        location.assign('index.html');
      },
      showReview(show) {
        if (show == this.showAside) {
          if (this.showAside == "platform") {
            this.showAside = "site";
          } else {
            this.showAside = "";
          }
        } else {
          this.showAside = show;
          this.$emit("getSite");
        }
      },
     
      getRoute() {
        if (this.$route.name == 'site' || this.$route.name == 'platform') {
          this.showAside = 'platform';
        }
        if (this.$route.name == 'site') {
          this.showAside = 'site';
        }
        if (this.$route.name == 'version') {
          this.showAside = 'version';
        }
      },
      getSingleInfo(data) {
        this.$store.commit('getsingleSite', data);
      },
      initAside() {
        var vm = this;
        var params = {
          'data': {
            'route_code_id': localStorage.auth_id
          },
          successFn(res) {
            if (res.rescode == 200) {
              var data = res.result;
              var route_name = vm.$route.name;
              var sign = false;
              for (let i = 0; i < data.length; i++) {
                if (data[i].auth_code == 'subsite_live') {
                  vm.subsite_live_show = true
                  if (route_name == 'live') {
                    sign = true
                  }
                  vm.subsite_live_id = data[i].auth_id;
                }
                if (data[i].auth_code == 'subsite_errorlog') {
                  vm.subsite_errorlog_show = true
                  if (route_name == 'error') {
                    sign = true
                  }
                  vm.subsite_errorlog_id = data[i].auth_id;
                }
                if (data[i].auth_code == 'subsite_version') {
                  vm.subsite_version_show = true
                  if (route_name == 'version') {
                    sign = true
                  }
                  vm.subsite_version_id = data[i].auth_id;
                }
                if (data[i].auth_code == 'subsite_view') {
                  vm.subsite_view_show = true
                  if (route_name == 'site' || route_name == 'platform') {
                    sign = true
                  }
                  vm.subsite_view_id = data[i].auth_id;
                }
               
              }
              if (!sign) {
                if (vm.subsite_view_show) {
                  vm.$router.replace({
                    path: "/platform"
                  });
                  vm.$route.meta.id = vm.subsite_view_id;
                } else if (vm.subsite_version_show) {
                  vm.$router.replace({
                    name: 'version'
                  })
                  vm.$route.meta.id = vm.subsite_version_id;
                } else if (vm.subsite_live_show) {
                  vm.$router.replace({
                    name: 'live'
                  })
                  vm.$route.meta.id = vm.subsite_live_id;
                } else if (vm.subsite_errorlog_show) {
                  vm.$router.replace({
                    path: "/error"
                  })
                 vm.$route.meta.id = vm.subsite_errorlog_id;
                }
                localStorage.r_id = vm.$route.meta.id;
                vm.getAuth(vm.$route.meta.id);
              }else{
                vm.getAuth(localStorage.r_id);
              }
            }
          }
        }
        this.$store.dispatch('getModules', params)
      },
      getAuth(id) {
        var vm = this;
        var arr = [];
        var params = {
          'data': {
            'route_code_id': id
          },
          successFn(res) {
            if (res.rescode == 200) {
              var data = res.result;
              var arr2 = arr.splice(0, arr.length);
              arr2 = data
              vm.$store.commit('changeAuth', data);
            
            }
          }
        }
        this.$store.dispatch('getModules', params)
      },
      getId(id) {
        localStorage.r_id = id;
        this.getAuth(id)
      },
    },
    created() {
      this.getRoute();
      this.sitelist = this.$store.state.sitelist
    },
    mounted() {
      this.initAside();
    },
    watch: {
      '$route' (to, from) {
        this.getRoute();
        
      },
      list(val) {
        this.sitelist = val
      },
    },
    computed: {
      list() {
        return this.$store.state.sitelist
      }
    },
  }
</script>

<style lang="scss">

</style>
