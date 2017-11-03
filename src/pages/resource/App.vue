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
    methods: {},
    mounted() {
      document.getElementsByTagName("title")[0].innerHTML = window.g.title;
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
