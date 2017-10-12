<template>
  <nav id="nav">
    <img src="../../assets/img/logo.png" id="pc-logo" />
    <h1 id="pc-title">智慧监狱管理云平台</h1>
    <div class="nav-welcome" >
      <span @click.stop.prevent="showList()" class="acoount-wrapper">欢迎您登陆,{{account}}</span>
      <ul v-show="show" class="nav-toolBar">
        <li><a href="javascript:;">注销登陆</a></li>
        <li><a href="javascript:;">修改密码</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        account: '某某某',
        show: false
      }
    },
    methods: {
      showList() {
        this.show = !(this.show);
      }
    },
    created() {
      if (this.utils.getCookie('account')) {
        this.account = this.utils.getCookie('account');
      }
    }
  }
</script>

<style lang="scss">

</style>
