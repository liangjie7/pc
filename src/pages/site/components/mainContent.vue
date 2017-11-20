<template>
  <div id="main-content">
   
    
    <router-view  @reload="getlist"></router-view>
  </div>
</template>

<script>
 
  export default {
   methods: {
     getlist(){
       this.$emit("reload");
     }
   }
 
  }
</script>

<style>

</style>
