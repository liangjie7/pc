<template>
  <div id="app">
    <Nav_></Nav_>
    <Aside_></Aside_>
    <MainContet></MainContet>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import Aside_ from "./components/aside";
  import Nav_ from "../../components/nav.vue";
  import MainContet from "./components/mainContent";
  export default {
    name: 'app',
    data() {
      return {}
    },
    watch: {
      viewIndex: function() {}
    },
    methods: {
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
              vm.$route.meta.id = id
            }
          }
        }
        this.$store.dispatch('getModules', params)
      }
    },
    mounted() {
      document.getElementsByTagName("title")[0].innerHTML = window.g.title;
    },
    created() {
      // if(this.$route.meta.id){
      //   this.getAuth(this.$route.meta.id);
      // }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        window.onbeforeunload = function() {
          var status = $('#upl_preview').attr('status');
          if (status == 'uploading') {
            var warning = "有资源正在上传，确定取消上传？";
            return warning;
          }
        }
      }
    },
    components: {
      Aside_,
      Nav_,
      MainContet
    },
  }
</script>

<style lang="scss">
  @import "../assets/css/index.scss";
</style>

 
</style>
