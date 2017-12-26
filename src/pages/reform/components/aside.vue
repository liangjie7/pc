//侧边栏
<template>
  <div id="aside">
   <div class="gotoIndex" @click="gobackIndex">
      <img src="../../assets/img/index.png" alt="平台首页" title="返回平台首页">
      <span>平台首页</span>
    </div>
     <ul id="side-nav">
        <router-link  to="/personalQuery" tag="li" class="nav-item" @click.native="getId(reform_student_id)" v-if="reform_student_show" exact><img src="../../assets/img/personalSer.png" /><span>个人查询</span></router-link>
     </ul>
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    data(){
      return{
        "reform_student_show":false,
        "reform_student_id":"",
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
              console.log(res)
              for (let i = 0; i < data.length; i++) {
                if (data[i].auth_code == "reform_student") {
                  vm.reform_student_show = true
                  if (route_name == 'personalQuery') {
                    sign = true
                  }
                  vm.reform_student_id = data[i].auth_id;
                }
             
               
              }
              
              if (!sign) {
                if (vm.subsite_view_show) {
                  vm.$router.replace({
                    name: "personalQuery"
                  });
                  vm.$route.meta.id = vm.reform_student_id;
                }
                localStorage.r_id = vm.$route.meta.id;
                vm.getAuth(vm.$route.meta.id);
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
    mounted() {
      this.initAside();
    },
  }
</script>

<style lang="scss">

</style>
