//侧边栏
<template>
  <div id="aside">
    <ul id="side-nav">
      <router-link to="/indexShow" tag="li" class="nav-item" exact ><img src="../../assets/img/overview.png"/><span>首页展示</span></router-link>
      <router-link :to="{ name: 'resource'}" tag="li" class="nav-item"><img src="../../assets/img/resources.png"/><span>资源管理</span></router-link>
      <router-link to="/share" tag="li" class="nav-item"><img src="../../assets/img/resources.png"/><span>分享管理</span></router-link>
      <router-link to="/issue" tag="li" class="nav-item"><img src="../../assets/img/resources.png"/><span>下发记录</span></router-link>
       <router-link to="/examine" tag="li" class="nav-item"><img src="../../assets/img/resources.png"/><span>审核管理</span></router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        index: "0",
        // vmode:this.$store.state.vmode
        
      }
    },
    methods: {
      changeView(val) {
        this.$store.commit('changeView', val)
      },
      
      
      
    },
    computed: {
      vmode() {
        console.log()
        return this.$store.state.vmode
      }
    },
  }
</script>

<style lang="scss">

</style>
