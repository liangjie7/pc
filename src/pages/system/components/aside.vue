//侧边栏
<template>
  <div id="aside">
    <div class="gotoIndex" @click="gobackIndex">
        <img src="../../assets/img/index.png" alt="平台首页" title="返回平台首页">
        <span>平台首页</span>
    </div>
    <ul id="side-nav">
      <router-link  :to="{ name: 'jurisdiction'}" tag="li" class="nav-item"><img src="../../assets/img/permissions.png" /><span>权限管控</span></router-link>

    </ul>
    
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    methods: {
      gobackIndex(){
         location.assign(window.g.path + 'index.html');
      }
    }
  }
</script>

<style lang="scss">

</style>
