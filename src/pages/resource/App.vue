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
  import Nav_ from "./components/nav";
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

    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log(1)
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
  @import "./assets/css/index.scss";
  body,
  html,
  #app {
    height: 100%;
    min-width: 1103px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

 
</style>
