<template>
  <div id="app" class="login-wrapper" v-loading="loading" element-loading-text="登录中">
    <div class="header">
      {{title}}
    </div>
    <div class="login-content">
      <div class="login-container">
        <img src="../assets/img/left-bg.png" class="left-bg" />
        <div class="border-line"></div>
        <div class="content">
          <img src="../../../static/logo.png" class="login-icon" />
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
    </div>
    <div class="footer">
      <p>上海清鹤科技股份有限公司提供技术支持</p>
      <p><span>电话：0512-123456</span><span>地址：祖冲之12322313</span></p>
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
            console.log(data)
            utils.setCookie('account', vm.account, 1);
            if (vm.rememberPassword) {
              utils.setCookie('password', vm.password, 1);
              console.log(data.user_name)
              localStorage.userName = data.user_name;
              localStorage.account = vm.account;
            } else {
              utils.clearCookie('password');
              sessionStorage.account = vm.account;
              console.log(data.user_name)
              localStorage.userName = data.user_name;
            }
            vm.loading = true;
            // setTimeout(function() {
            location.assign('index.html');
            // }, 500)
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
    mounted() {},
    created() {
      document.getElementsByTagName("title")[0].innerHTML = window.g.title;
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
    background-color: #5289c5;
    background-repeat: no-repeat;
    position: relative;
    background-size: cover;
    min-width: 1200px;
    min-height: 550px;
    .login-content {
      height: calc(100% - 120px);
      display: flex;
      justify-content: center;
      flex-flow: column;
      min-height: 280px;
      width: 100%;
    }
    .login-container {
      height: 100%;
      width: 1100px;
      display: flex;
      align-items: center;
      margin: 0 auto;
      justify-content: space-between;
    }
    @media screen and (min-width:1400px) {
      .login-content {
        height: calc(100% - 160px);
      }
      .login-container {
        width: 1400px;
      }
    }
    .header {
      height: 60px;
      background-color: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-size: 26px;
      letter-spacing: 10px;
    }
    @media screen and (min-width:1400px) {
      .header {
        height: 80px;
        font-size: 30px;
      }
    }
    .footer {
      display: flex;
      height: 60px;
      background-color: #f8f8f8;
      justify-content: center;
      align-items: center;
      color: #656565;
      width:100%;
      flex-flow: column;
      p+p{
        margin-top:10px;
      }
      p{
        span+span{
          margin-left:20px;
        }
      }
    }
    @media screen and (min-width:1400px) {
      .footer {
        height: 80px;
      }
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
        width: calc(100% - 30px);
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
      float: left;
      .login-icon {
        width: 100px;
        align-self: center;
        margin-bottom: 30px;
      }
      @media screen and (min-width:1400px) {
        .login-icon {
          width: 150px;
          margin-bottom: 40px;
        }
        .acount-wrapper {
          height: 40px;
          width: 330px;
          margin-bottom: 35px;
        }
      }
    }
    .login-btn {
      width: 300px;
      letter-spacing: 10px;
      font-size: 16px;
      background-color: #26b4e7;
      &:focus {
        background: #20a0ff;
        border-color: #20a0ff;
        color: #fff;
      }
    }
    @media screen and (min-width:1400px) {
      .login-btn {
        width: 330px;
      }
    }
    .login-help {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      .restorePsd {
        color: #fff;
      }
      .forgetPsd {
        color: #f8cf85;
      }
    }
    .left-bg {
      width: 400px;
    }
    .border-line {
      height: 350px;
      width: 1px;
     
      background-color: rgba(248,248,248,0.45);
    }
  }
  @media screen and (min-width:1400px) {
    .login-wrapper {
      min-height: 770px;
      .left-bg {
        width: 650px;
      }
      .border-line {
        height: 550px;
        width: 1px;
        background-color: rgba(248,248,248,0.45);
      }
    }
  }
</style>
