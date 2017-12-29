<template>
  <div>
    <nav id="nav">
      <el-dialog title="报错提示" :visible.sync="dialogVisible" custom-class="nav-warning_dialog" >
        <el-table
        :data="warning_list"
        style="width: 100%">
        <el-table-column
          prop="subsystem_name"
          label="子站点">
        </el-table-column>
        <el-table-column
          prop="last_heart_beat_time"
          label="报错时间">
        </el-table-column>
        <el-table-column
          label="报错内容">
          <template slot-scope="scope">
             连接局端失败
          </template>
        </el-table-column>
      </el-table>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <img src="../../static/logo.png" id="pc-logo" />
      <h1 id="pc-title">{{title}}</h1>
      <div class="nav-welcome">
        <img src="../pages/assets/img/nav-error.png" title="报警提示" class="error-icon"  @click="dialogVisible = true" v-if="warning_list.length"/>
        <el-popover ref="popover5" placement="bottom">
            <ul class="nav-toolBar">
              <li><a href="javascript:;" @click="logOut()">注销登陆</a></li>
              <li><a href="javascript:;" @click="resetpsdFn">修改密码</a></li>
            </ul>
        </el-popover>
        <p class="logDialog" v-popover:popover5>
          <img src="../pages/assets/img/head.png" alt="" class="head-icon"/>
        </p>
        <span class="acoount-wrapper">欢迎您登陆,{{account}}</span>
        
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
import utils from '../pages/assets/js/utils'
var ajax = utils.ajax;

  export default {
    data() {
      return {
        account: '某某某',
        
        title: window.g.title,
        resetpsd: false,
        formLabelWidth: '80px',
        password_old: '',
        password_new: '',
        password_confirm: '',
        check: false, //验证密码输入是否符合规则
        dialogVisible:false,
        warning_list:[],//报错
      }
    },
    methods: {
      logOut() {
        var data = {
          successFn(res) {
            if (res.rescode == 200) {
              location.assign('login.html');
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
              setTimeout(function() {
                location.assign('login.html');
              }, 1500)
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
      },
      getWarning(){
        var vm = this;
        var params = {
          data:{},
          successFn(res){
            if(res.rescode == 200){
              vm.warning_list = res.warning_list;
            }
          }
        }

        ajax('/jescloud/get_warning', 'get', params, true);
      }
    },
    created() {
      if (this.utils.getCookie('account')) {
        this.account = localStorage.userName;
      } else {
        alert('登录过期，请重新登录');
        location.assign('login.html');
      };
      this.getWarning();
      setInterval(()=>{
        this.getWarning();
      },5*1000)
      
    }
  }
</script>

<style lang="scss">

</style>
