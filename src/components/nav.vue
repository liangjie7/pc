<template>
  <div>
    <nav id="nav">
      <img src="../../static/logo.png" id="pc-logo" />
      <h1 id="pc-title">{{title}}</h1>
      <div class="nav-welcome">
        <span @click.stop.prevent="showList()" class="acoount-wrapper">欢迎您登陆,{{account}}</span>
        <ul v-show="show" class="nav-toolBar">
          <li><a href="javascript:;" @click="logOut()">注销登陆</a></li>
          <li><a href="javascript:;" @click="resetpsdFn">修改密码</a></li>
        </ul>
      </div>
    </nav>
    <el-dialog title="修改密码" :visible.sync="resetpsd" custom-class="reset-wrapper">
      <el-form>
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input auto-complete="off" type="password" v-model="password_old" @keyup.native="checkReset(1)"></el-input>
          <p ref="old">请输入旧密码</p>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input auto-complete="off" type="password" v-model="password_new" @keyup.native="checkReset(2)"></el-input>
          <p ref="new">请输入新密码</p>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input auto-complete="off" type="password" v-model="password_confirm" @keyup.native="checkReset(3)"></el-input>
          <p ref="confirm">请再次输入新密码</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetpsd = false">取 消</el-button>
        <el-button type="primary" @click="reset">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: '某某某',
        show: false,
        title: window.g.title,
        resetpsd: false,
        formLabelWidth: '80px',
        password_old: '',
        password_new: '',
        password_confirm: '',
        check: false, //验证密码输入是否符合规则
      }
    },
    methods: {
      showList() {
        this.show = !(this.show);
      },
      logOut() {
        var data = {
          successFn(res) {
            if (res.rescode == 200) {
              location.assign(window.g.path + 'login.html');
            }
          }
        }
        this.$store.dispatch('logOut', data)
      },
      resetpsdFn() {
        this.resetpsd = true;
        this.password_new = "";
        this.password_old = "";
        this.password_confirm = "";
      },
      reset() {
        if (this.check == false) {
          return
        }
        var vm = this;
        var params = {
          data: {
            'password_old': vm.password_old,
            'password_new': vm.password_new,
          },
          successFn(res) {
            console.log(res)
            if (res.rescode == 404) {
              vm.$notify({
                title: '提示',
                message: res.info,
                type: 'info'
              });
            }
            if (res.rescode == 200) {
              vm.$notify({
                title: '成功',
                message: '修改密码成功，请重新登录',
                type: 'success'
              });
              setTimeout(function(){
                 location.assign(window.g.path + 'login.html');
              },1500)
             
            }
          }
        }
        this.$store.dispatch('resetPassword', params)
      },
      checkReset(index) {
        if (index == 1) {
          if (!this.password_old) {
            this.$refs.old.style.visibility = "visible";
            return
          } else {
            this.$refs.old.style.visibility = "hidden";
          }
        }
        if (index == 2) {
          if (!this.password_new) {
            this.$refs.new.style.visibility = "visible";
            return
          } else {
            this.$refs.new.style.visibility = "hidden";
          }
          if (this.password_confirm && this.password_new && this.password_new != this.password_confirm) {
            this.$refs.new.innerHTML = "两次输入的密码不一致"
          } else {
            this.$refs.new.style.visibility = "hidden";
            this.$refs.confirm.style.visibility = "hidden";
          }
        }
        if (index == 3) {
          if (!this.password_confirm) {
            this.$refs.confirm.style.visibility = "visible";
            return
          } else {
            this.$refs.confirm.style.visibility = "hidden";
          }
          if (this.password_new != this.password_confirm) {
            this.$refs.confirm.style.visibility = "visible";
            this.$refs.confirm.innerHTML = "两次输入的密码不一致"
          }
        }
        if (this.password_old && this.password_new && (this.password_new == this.password_confirm)) {
          this.check = true;
        }
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
