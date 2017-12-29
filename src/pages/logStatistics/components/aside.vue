//侧边栏
<template>
  <div id="aside">
   <div class="gotoIndex" @click="gobackIndex">
      <img src="../../assets/img/index.png" alt="平台首页" title="返回平台首页">
      <span>平台首页</span>
    </div>
     <ul id="side-nav">
        <router-link  to="/resourcecLog" tag="li" class="nav-item" @click.native="getId(log_backend_id)" v-if="log_backend_show" exact><img src="../../assets/img/logIcon.png" /><span>资源日志</span></router-link>
     </ul>
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
      data(){
        return{
          'log_backend_show':false,
          'log_backend_id':"",
        }
      },
      methods: {
        gobackIndex() {
          location.assign('index.html');
        },
        initAside() {
          
          var vm = this;
          var params = {
            'data': {
              'route_code_id': localStorage.auth_id
            },
            successFn(res) {
              if (res.rescode == 200) {
                var data = res.result;
                var route_name = vm.$route.name;
                var sign = false;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].auth_code == 'log_backend') {
                    vm.log_backend_show = true
                    if (route_name == 'resourcecLog') {
                      sign = true
                    }
                    vm.log_backend_id = data[i].auth_id;
                  }
                  
                  
                }
                if (!sign) {
                  if (vm.log_backend_show) {
                    vm.$router.replace({
                      name: "resourcecLog"
                    });
                    vm.$route.meta.id = vm.log_backend_id;
                    localStorage.r_id = vm.$route.meta.id;
                    vm.getAuth(vm.$route.meta.id);
                }
              }else{
                  vm.getAuth( localStorage.r_id);
              }
            }
            
          }
        }
      this.$store.dispatch('getModules', params)
    },
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
            
            }
          }
        }
        this.$store.dispatch('getModules', params)
    },
    getId(id) {
        this.clickRoute = true;
        localStorage.r_id = id;
        this.getAuth(id)
    },
  },
  mounted(){
    this.initAside();
  }
}
</script>

<style lang="scss">

</style>
