<template>
  <div id="app">
    <Nav_></Nav_>
    <Aside_ @reload="reloadlist"></Aside_>
    <MainContet  @reload="reloadlist"></MainContet>
    
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
      
    },
    methods: {
      getSubsite(){
        var vm = this;
        var params = {
          data:{
            'sort_data':JSON.stringify([{'sort_name':'subsystem_id','sort_type':'up'}])
          },
          successFn(res){
            if(res.rescode == 200){
              vm.$store.commit('initSitelist', res.subsiteList);
              for(let i=0;i< res.subsiteList.length;i++){
                var id = vm.$route.params.id;
                  if(id && res.subsiteList[i].subsystem_id == id ){
                    vm.$store.commit('getsingleSite', res.subsiteList[i]);
                  }
                
              }
            }
         
            
          }
        };
        this.$store.dispatch("getSubsite",params);
      },
      reloadlist(){
        
        this.getSubsite()
      }
    },
    mounted() {
      document.getElementsByTagName("title")[0].innerHTML = window.g.title;
    },
    created(){
      this.getSubsite();
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
