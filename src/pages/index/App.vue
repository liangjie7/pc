<template>
  <div id="app" onselectstart="return false;">
    <Nav_></Nav_>
    <Content_></Content_>
    
  </div>
</template>

<script>
  // import Aside_ from "./components/aside";
  import Nav_ from "../../components/nav.vue";
  import Content_ from "./components/content.vue";
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
    components: {
      Nav_,
      Content_
    },
    created () {
      document.getElementsByTagName("title")[0].innerHTML = window.g.title;
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/index.scss";
</style>
