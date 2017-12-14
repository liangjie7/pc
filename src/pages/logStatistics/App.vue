<template>
  <div id="app">
    <Nav_></Nav_>
    <Aside_ ></Aside_>
    <MainContet ></MainContet>
    
  </div>
</template>

<script>

  import Aside_ from "./components/aside";
  import Nav_ from "../../components/nav.vue";
  import MainContet from "./components/mainContent";
  export default {
    name: 'app',
   
    
     
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
