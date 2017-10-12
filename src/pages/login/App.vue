<template>
  <div id="app" class="login-wrapper" v-loading="loading" element-loading-text="登录中">
    <div class="header">
      {{title}}
    </div>
    <div class="login-content">
      <div class="content">
        <div class="acount-wrapper"><img src="../assets/img/secret.png" /><input type="text" placeholder="请输入账号" v-model="account" value="account" @keyup.enter="login()" /></div>
        <div class="acount-wrapper"><img src="../assets/img/account.png" /><input type="password" placeholder="请输入密码" v-model="password" value="password" @keyup.enter="login()" /></div>
        <div class="login-help">
          <span>
              <el-checkbox label="记住密码" class="restorePsd" v-model="rememberPassword" ></el-checkbox>
            </span>
          <a href="javascipt:;" class="forgetPsd" @click="forgetPsd()">忘记密码</a>
        </div>
        <el-button type="primary" class="login-btn" @click="login()">登陆</el-button>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script>

  import utils from '../assets/js/utils'
 
  export default {
    name: 'app',
    data() {
      return {
        title: window.g.title,
        password: '',
        account: '',
        loading: false,
        rememberPassword: false,
      }
    },
    watch: {},
    methods: {
      forgetPsd() {
        this.$alert('忘记密码,请联系管理员。', '忘记密码', {
          confirmButtonText: '确定',
          callback: action => {}
        });
      },
      login() {
        var vm = this;
        if (!vm.account) {
          this.$notify({
            title: '提示',
            message: '账号不能为空',
            type: 'info',
            duration: '2000'
          });
          return
        }
        if (!vm.password) {
          this.$notify({
            title: '提示',
            message: '密码不能为空',
            type: 'info',
            duration: '2000'
          });
          return
        }
        var params = {
          account: vm.account,
          password: vm.password
        }
        this.$store.dispatch('login', params).then((res) => {
          var data = res.data;
          if (data.rescode == 200) {
            console.log(data.info);
            utils.setCookie('account', vm.account, 1);
            if (vm.rememberPassword) {
              utils.setCookie('password', vm.password, 1);
               localStorage.account =vm.account;
            } else {
              utils.clearCookie('password');
              sessionStorage.account =vm.account;
            }
            vm.loading = true;
            setTimeout(function() {
              location.assign(window.g.path + 'index.html');
            }, 500)
          } else if (data.rescode == 404) {
            this.$notify.error({
              title: '错误',
              message: '账号或者密码不正确',
              duration: '2000'
            });
            return
          }
        }, (res) => {})
      },
    },
    mounted() {

    },
    created() {
      if (utils.getCookie('account') && utils.getCookie('password')) {
        this.rememberPassword = true;
        this.account = utils.getCookie('account');
        this.password = utils.getCookie('password');
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/index.scss";
  .login-wrapper {
    height: 100%;
    background-image: url("../assets/img/login.png");
    background-repeat: no-repeat;
    position: relative;
    background-size: cover;
    .login-content {
      height: 60%;
      display: flex;
      justify-content: center;
      flex-flow: column;
      min-height: 280px;
    }
    .header {
      height: 20%;
      background-color: rgba(255, 255, 255, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 26px;
      min-height: 100px;
      letter-spacing: 10px;
    }
    .footer {
      display: flex;
      height: 20%;
      background-color: rgba(255, 255, 255, 0.15);
      min-height: 100px;
    }
    .acount-wrapper {
      width: 300px;
      background-color: #d9ebee;
      display: flex;
      align-items: center;
      height: 35px;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 25px;
      &:nth-of-type(2) {
        margin-bottom: 10px;
      }
      img {
        font-size: 0;
        height: 20px;
        margin: 0 5px;
      }
      input {
        width: 276px;
        border: none;
        background-color: transparent;
        font-size: 16px;
        height: 100%;
        outline: none;
      }
    }
    .content {
      display: flex;
      flex-flow: column;
      margin: 0 auto;
    }
    .login-btn {
      width: 300px;
      letter-spacing: 10px;
      font-size: 16px;
      &:focus {
        background: #20a0ff;
        border-color: #20a0ff;
        color: #fff;
      }
    }
    .login-help {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .restorePsd {
        color: #fff;
      }
      .forgetPsd {
        color: #f8cf85;
      }
    }
  }
</style>
