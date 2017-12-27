//侧边栏
<template>
  <div id="aside">
    <div class="gotoIndex" @click="gobackIndex">
      <img src="../../assets/img/index.png" alt="平台首页" title="返回平台首页">
      <span>平台首页</span>
    </div>
    <ul id="side-nav">
      <router-link :to="{ name: 'user'}" tag="li" class="nav-item" @click.native="getId(auth_user_id)"><img src="../../assets/img/userManage.png" /><span>用户管理</span></router-link>
      <router-link :to="{ name: 'jurisdiction'}" tag="li" class="nav-item" @click.native="getId(auth_manage_id)"><img src="../../assets/img/permissions.png" /><span>权限管理</span></router-link>
    </ul>
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    data() {
      return {
        'auth_user_show': false,
        'auth_user_id': '',
        'auth_manage_show': false,
        'auth_manage_id': '',
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
                if (data[i].auth_code == "auth_user") {
                  vm.auth_user_show = true
                  if (route_name == 'user') {
                    sign = true
                  }
                  vm.auth_user_id = data[i].auth_id;
                };
                if (data[i].auth_code == "auth_manage") {
                  vm.auth_manage_show = true
                  if (route_name == 'jurisdiction') {
                    sign = true
                  }
                  vm.auth_manage_id = data[i].auth_id;
                }
              }
              console.log(sign)
              if (!sign) {
                if (vm.auth_user_show) {
                  vm.$router.replace({
                    name: "user"
                  });
                  vm.$route.meta.id = vm.auth_user_id;
                } else if (vm.auth_manage_show) {
                  vm.$router.replace({
                    name: "jurisdiction"
                  });
                  vm.$route.meta.id = vm.auth_manage_id;
                }
                localStorage.r_id = vm.$route.meta.id;
                vm.getAuth(vm.$route.meta.id);
              } else {
                vm.getAuth(localStorage.r_id);
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
