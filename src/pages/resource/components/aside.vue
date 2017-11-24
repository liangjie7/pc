//侧边栏
<template>
  <div id="aside">
    <div class="gotoIndex" @click="gobackIndex">
      <img src="../../assets/img/index.png" alt="平台首页" title="返回平台首页">
      <span>平台首页</span>
    </div>
    <ul id="side-nav">
      <router-link @click.native="getId(aside[0].auth_id)" to="/indexShow" tag="li" class="nav-item" v-if="aside[0].show" exact><img src="../../assets/img/overview.png" /><span>首页展示</span></router-link>
      <router-link @click.native="getId(aside[1].auth_id)" :to="{ name: 'resource'}" tag="li" class="nav-item" v-if="aside[1].show"><img src="../../assets/img/resources.png" /><span>资源管理</span></router-link>
      <router-link @click.native="getId(aside[2].auth_id)" to="/share" tag="li" class="nav-item" v-if="aside[2].show"><img src="../../assets/img/resources.png" /><span>分享管理</span></router-link>
      <router-link @click.native="getId(aside[3].auth_id)" to="/issue" tag="li" class="nav-item" v-if="aside[3].show"><img src="../../assets/img/resources.png" /><span>下发记录</span></router-link>
      <router-link @click.native="getId(aside[4].auth_id)" to="/examine" tag="li" class="nav-item" v-if="aside[4].show"><img src="../../assets/img/resources.png" /><span>审核管理</span></router-link>
      <!-- <router-link  v-for="item in aside"  :to="item.route" tag="li" class="nav-item" exact><img :src="item.img" /><span>{{item.name}}</span></router-link> -->
    </ul>
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    data() {
      return {
        index: "0",
        aside: [{
            name: '首页展示',
            auth_code: 'material_home',
            route: 'indexShow',
            img: require('../../assets/img/overview.png'),
            show: false
          },
          {
            name: '资源管理',
            auth_code: 'material_mange',
            route: 'resource',
            img: require('../../assets/img/resources.png'),
            show: false
          },
          {
            name: '分享管理',
            auth_code: 'material_share',
            route: 'share',
            img: require('../../assets/img/resources.png'),
            show: false
          }, {
            name: '下发记录',
            auth_code: 'material_issued',
            route: 'issue',
            img: require('../../assets/img/resources.png'),
            show: false
          },
          {
            name: '审核管理',
            auth_code: 'material_check',
            route: 'examine',
            img: require('../../assets/img/resources.png'),
            show: false
          }
        ],
        data: []
      }
    },
    methods: {
      gobackIndex() {
        location.assign(window.g.path + 'index.html');
      },
      changeView(val) {
        this.$store.commit('changeView', val)
      },
      initAside() {
        var vm = this;
        var params = {
          'data': {
            'route_code_id': localStorage.auth_id
          },
          successFn(res) {
            var sign = -1;
            if (res.rescode == 200) {
              var data = res.result;
              var flag = false;
              for (var j = 0; j < vm.aside.length; j++) {
                for (var i = 0; i < data.length; i++) {
                  if (data[i].auth_code == vm.aside[j].auth_code) {
                    if (sign == -1) {
                      sign = j;
                    }
                    vm.aside[j].show = true;
                    Object.assign(vm.aside[j], data[i])
                  }
                  if ((vm.$route.name == vm.aside[j].route) && vm.aside[j].show) {
                    flag = true;
                  }
                  if ((vm.$route.name == 'grid') || (vm.$route.name == 'list')) {
                    flag = true;
                  }
                }
                if (j == vm.aside.length - 1) {
                  if (flag) {
                    for (var i = 0; i < vm.aside.length; i++) {
                      if (vm.$route.name == vm.aside[i].route || (vm.aside[i].route == 'resource' && vm.$route.name == "list") || (vm.aside[i].route == 'resource' && vm.$route.name == "grid")) {
                        vm.getAuth(vm.aside[i].auth_id);
                      }
                    }
                  } else {
                    vm.$router.replace({
                      name: vm.aside[sign].route
                    });
                    for (var i = 0; i < vm.aside.length; i++) {
                      if (vm.$route.name == vm.aside[i].route || (vm.aside[i].route == 'resource' && vm.$route.name == "list") || (vm.aside[i].route == 'resource' && vm.$route.name == "grid")) {
                        vm.getAuth(vm.aside[i].auth_id);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        this.$store.dispatch('getModules', params)
      },
      getId(id) {
        localStorage.r_id = id;
        this.getAuth(id)
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
              vm.$store.commit('changeAuth', data)
            }
          }
        }
        this.$store.dispatch('getModules', params)
      }
    },
    created() {},
    mounted() {
      this.initAside()
    },
    computed: {
      vmode() {
        return this.$store.state.vmode
      }
    },
  }
</script>

<style lang="scss">

</style>
