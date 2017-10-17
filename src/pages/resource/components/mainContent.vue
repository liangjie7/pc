<template>
  <div id="main-content">
    <!-- <component :is="view"></component> -->

    <router-view></router-view>
  </div>
</template>

<script>
  import indexShow from './modules/index/indexShow';
  import resourceManage from './modules/resource/resourceManage'
  export default {
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
      view() {
        return this.$store.state.currentView
      },
      
    },
    components: {
      indexShow,
      resourceManage
    },
    
  }
</script>

<style>

</style>
