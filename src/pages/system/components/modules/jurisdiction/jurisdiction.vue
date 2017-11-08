<template>
  <div class="content-wrapper">
    <section class="right-group_wrapper">
      <div class="right-group_header">
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="eidtiVisible" custom-class="eidtiVisible">
          <el-form>
            <el-form-item label="账号:" :label-width="formLabelWidth">
              <el-input auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="中文名:" :label-width="formLabelWidth">
              <el-input auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="初始密码:" :label-width="formLabelWidth">
              <el-input auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注:" :label-width="formLabelWidth">
              <el-input auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="examinedialog = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <!-- 新建用户 -->
        <el-dialog title="添加用户" :visible.sync="addUseriVisible" custom-class="addUseriVisible" :before-close="clearDialog">
          <el-form>
            <el-form-item label="账号:" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="account" @change="validataUser('account')"></el-input>
              <p class="tips error" ref="account">请输入账号</p>
            </el-form-item>
            <el-form-item label="中文名:" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="name_zh" @change="validataUser('name_zh')"></el-input>
              <p class="tips error" ref="name_zh">请输入中文名</p>
            </el-form-item>
            <el-form-item label="初始密码:" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="password" @change="validataUser('password')"></el-input>
              <p class="tips error" ref="password">请输入初始密码</p>
            </el-form-item>
            <el-form-item label="备注:" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="remarks" @change="validataUser('remarks')"></el-input>
              <p class="tips error" ref="remarks">请输入备注</p>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="clearDialog">取 消</el-button>
            <el-button type="primary" @click="postUser">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 新建用户 -->
        <div class="right-tool">
          <a href="javascript:;" title="编辑" @click="editName"><img src="../../../../assets/img/edit-icon.png" alt="编辑"></a>
          <a href="javascript:;" title="移动"><img src="../../../../assets/img/move-icon.png" alt="移动"></a>
          <a href="javascript:;" title="删除"><img src="../../../../assets/img/delete-icon.png" alt="删除"></a>
        </div>
        <button class="addUserGroup" title="添加组">添加组</button>
      </div>
      <div class="userGroup">
        <div v-for="item in role_list" :key="item.role_id">
          <div class="one_group" :class="{'is_checked':is_group == item.role_id,'no_checked':is_group != item.role_id,'is_target':is_target == item.role_id}" @click.stop.prevent="getGroupdetail(item.role_id,item.role_id)">
            <span class="group-name">
              <span class="icon" ></span>
            <span class="group-title" :title="item.role_name">{{item.role_name}}</span>
            </span>
            <span class="group-count">组员：{{item.count_user}}</span>
          </div>
          <div v-show="is_group == item.role_id && is_open" class="adduser-wrapper">
            <!-- <el-checkbox size="small" :id="'checkAll' + item.role_id" @change="handleCheckedAll(item.role_id)">全选</el-checkbox> -->
            <el-button type="primary" size="mini" @click="addUser">添加用户</el-button>
          </div>
          <transition name="fade">
            <ul v-show="is_group == item.role_id && is_open && item.child_user.length" :id="'children' + item.role_id">
              <!-- <el-checkbox-group v-model="checklist" @change="handleCheckedUsersChange(item.role_id,item.child_user.length)"> -->
                <li class="one_group  on-group_user" v-for="i in item.child_user"  :userId="i.user_id" :key="i.role_id" @click.stop="getGroupdetail(i.role_id,i.user_id)" :class="{'is_checked':is_group == i.role_id,'no_checked':is_group != i.user_id,'is_target':is_target == i.user_id}"> <span class="user_name" :title="i.user_name">{{i.user_name}}</span></li>
              <!-- </el-checkbox-group> -->
            </ul>
          </transition>
        </div>
      </div>
    </section>
    <section class="right-detail"></section>
  </div>
</template>

<script>
  import utils from '../../../../assets/js/utils'
  console.log(utils.addClass)
  export default {
    data() {
      return {
        is_group: -1, //选中的组id
        is_target: -1, //选中的目标的id
        is_open: true, //是否打开
        checklist: [], //勾选的id
        eidtiVisible: false, //编辑弹出框
        formLabelWidth: '80px',
        addUseriVisible: false, //新建用户
        account: "", //账号
        name_zh: "", //中文名字
        password: "", //初始密码
        remarks: "", //备注
        role_list: [], //获取的分组列表
      }
    },
    methods: {
      getGroupdetail(groupId, targetId) {
        let oldId = this.is_group;
        this.is_group = groupId;
        this.is_target = targetId;
        if (oldId == groupId && targetId == groupId) {
          this.is_open = false;
          this.is_group = -1;
          this.oldId = -1;
        } else {
          if (oldId != -1) {
            var checkAll = document.getElementById('checkAll' + oldId);
            this.checklist = [];
            utils.removeClass(checkAll.children[0], 'is-checked'); //清除之前勾选的数据
          }
          this.is_open = true;
        }
      },
      editName() { //编辑名称
        this.eidtiVisible = true;
      },
      addUser() { //新建用户
        this.addUseriVisible = true;
      },
      postUser() { //提交新建的用户
        if (!this.validataUser()) {
          console.log(1)
          return
        }
      },
      clearDialog() {
        this.addUseriVisible = false;
        this.account = "";
        this.name_zh = "";
        this.password = "";
        this.remarks = "";
        this.$refs.account.style.visibility = "hidden";
        this.$refs.name_zh.style.visibility = "hidden";
        this.$refs.password.style.visibility = "hidden";
        this.$refs.remarks.style.visibility = "hidden";
      },
      handleCheckedUsersChange(role_id, count) {
        var checkAll = document.getElementById('checkAll' + role_id);
        if (this.checklist.length === count) {
          utils.addClass(checkAll.children[0], 'is-checked');
        } else {
          utils.removeClass(checkAll.children[0], 'is-checked');
        }
      },
      handleCheckedAll(role_id){
        var vm = this;
        if(vm.checklist.length){
           vm.checklist = [];
        }
        $("#children"+role_id).find('li').each(function(i){
         
          vm.checklist.push($(this).attr("userId"));
        })
        console.log(vm.checklist)
      },
      validataUser(key) {
        if (!key) {
          if (!this.account) {
            this.$refs.account.innerHTML = '请输入账号';
            this.$refs.account.style.visibility = "visible";
            return false;
          } else {
            this.$refs.account.style.visibility = "hidden";
          }
          if (!this.name_zh) {
            this.$refs.name_zh.innerHTML = '请输入中文名称';
            this.$refs.name_zh.style.visibility = "visible";
            return false;
          } else {
            this.$refs.name_zh.style.visibility = "hidden";
          }
          if (!this.password) {
            this.$refs.password.innerHTML = '请输入初始密码';
            this.$refs.password.style.visibility = "visible";
            return false;
          } else {
            this.$refs.password.style.visibility = "hidden";
          }
          if (!this.remarks) {
            this.$refs.remarks.innerHTML = '请输入备注';
            this.$refs.remarks.style.visibility = "visible";
            return false;
          } else {
            this.$refs.remarks.style.visibility = "hidden";
          }
        } else {
          console.log(key == 'account')
          if (key == 'account') {
            if (!this.account) {
              this.$refs.account.innerHTML = '请输入账号';
              this.$refs.account.style.visibility = "visible";
              return false;
            } else {
              if (!/^[A-Za-z0-9]{1,20}$/.test(this.account)) {
                this.$refs.account.innerHTML = '账号只能由数字和字母组成，长度最大20';
                this.$refs.account.style.visibility = "visible";
                return false;
              } else {
                this.$refs.account.style.visibility = "hidden";
              }
            }
          }
          if (key == 'name_zh') {
            console.log(1)
            if (!this.name_zh) {
              this.$refs.name_zh.innerHTML = '请输入初始中文名称';
              this.$refs.name_zh.style.visibility = "visible";
              return false;
            } else {
              if (!/^[\u4e00-\u9fa5]{0,}$/.test(this.name_zh)) {
                this.$refs.name_zh.innerHTML = '中文名称只能由中文组成';
                this.$refs.name_zh.style.visibility = "visible";
                return false;
              } else {
                this.$refs.name_zh.style.visibility = "hidden";
              }
            }
          }
          if (key == 'password') {
            if (!this.password) {
              this.$refs.password.innerHTML = '请输入初始密码';
              this.$refs.password.style.visibility = "visible";
              return false;
            } else {
              if (!/^[A-Za-z0-9]{1,20}$/.test(this.password)) {
                this.$refs.password.innerHTML = '密码只能由数字和字母组成，长度最大20';
                this.$refs.password.style.visibility = "visible";
                return false;
              } else {
                this.$refs.password.style.visibility = "hidden";
              }
            }
          }
        }
      },
    },
    created() {
      var vm = this;
      var params = {
        successFn(res) {
          console.log(res);
          if (res.rescode == 200) {
            vm.role_list = res.role_user_list;
          }
        }
      }
      this.$store.dispatch('getUserGroup', params)
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0s;
    transition: opacity 0s;
  }
</style>
