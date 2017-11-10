<template>
  <div class="content-wrapper">
    <section class="right-group_wrapper">
      <div class="right-group_header">
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="eidtiVisible" custom-class="eidtiVisible" :before-close="clearDialog">
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
              <el-input auto-complete="off" v-model="password" @change="validataUser('password')" type="password"></el-input>
              <p class="tips error" ref="password">请输入初始密码</p>
            </el-form-item>
            <el-form-item label="备注:" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="remarks" @change="validataUser('remarks')"></el-input>
              <p class="tips error" ref="remarks">请输入备注</p>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="eidtiVisible = false">取 消</el-button>
            <el-button type="primary" @click="postUser">确 定</el-button>
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
        <!-- 新建用户 -->
        <el-dialog title="添加用户组" :visible.sync="addUserGroupiVisible" custom-class="addUserGroupiVisible">
          <el-form>
            <el-form-item label="用户组:" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="userGroupName" @change="validataUser('userGroupName')"></el-input>
              <p class="tips error" ref="userGroupName">请输入用户组名</p>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addUserGroupiVisible = false">取 消</el-button>
            <el-button type="primary" @click="postUserGroup()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 新建用户 -->
        <!-- 移动 -->
        <el-dialog title="移动--勾选分组" :visible.sync="moveDialog" custom-class="moveDialog">
          <ul class="moveList">
            <li v-for="item in role_list" :title="item.role_name" class="role" @click="moveChecked(item.role_id,$event)"> 
              <span class="pc-checkbox treeCheckbox moveCheckbox">
                  <div class="pc-checkbox_input" >
                    <span class="pc-checkbox_inner"></span>
                  </div>
              </span>
              <span>{{item.role_name}}</span>
            </li>
          </ul>
          <div slot="footer" class="dialog-footer">
            <el-button @click="moveDialog = false">取 消</el-button>
            <el-button type="primary" @click="moveUser()">确 定</el-button>
          </div>
          
        </el-dialog>
        <!-- 移动 -->
        <div class="right-tool">
          <a href="javascript:;" title="编辑" @click="editFn"><img src="../../../../assets/img/edit-icon.png" alt="编辑"></a>
          <a href="javascript:;" title="移动" v-if="is_target != is_group" @click="openMoveDialog"><img src="../../../../assets/img/move-icon.png" alt="移动"></a>
          <a href="javascript:;" title="删除" @click="deleteFn"><img src="../../../../assets/img/delete-icon.png" alt="删除"></a>
        </div>
        <button class="addUserGroup" title="添加组" @click="addUserGroup">添加组</button>
      </div>
      <div class="userGroup">
        <div v-for="item in role_list" :key="item.role_id">
          <div class="one_group" :class="{'is_checked':is_group == item.role_id,'is_target':is_target == item.role_id && currentType == 'group','no_checked':is_group != item.role_id }" @click.stop.prevent="getGroupdetail(item.role_id,item.role_id,item,'group')">
            <span class="group-name">
              <span class="icon" ></span>
            <span class="group-title" :title="item.role_name">{{item.role_name}}</span>
            </span>
            <span class="group-count">组员：{{item.count_user}}</span>
          </div>
          <div v-show="is_group == item.role_id && is_open" class="adduser-wrapper">
            <el-button type="primary" size="mini" @click="addUser">添加用户</el-button>
          </div>
          <transition name="fade">
            <ul v-show="is_group == item.role_id && is_open && item.child_user.length" :id="'children' + item.role_id">
              <li class="one_group  on-group_user" v-for="i in item.child_user" :userId="i.user_id" :key="i.role_id" @click.stop="getGroupdetail(i.role_id,i.user_id,i,'user')" :class="{'is_checked':is_target == i.user_id && currentType == 'user','is_target':is_target == i.user_id && currentType == 'user','no_checked':is_target != i.user_id ||currentType != 'user'}">
                <span class="user_name" :title="i.user_name">{{i.user_name}}</span></li>
            </ul>
          </transition>
        </div>
      </div>
    </section>
    <section class="right-detail">
      <!-- <el-button class="save_auth" type="">保存</elbutton> -->
      <el-button type="primary" class="save_auth" @click="saveAuth" v-if="is_group != -1">保&nbsp;&nbsp;存</el-button>
      <ul class="auth-tree">
        <li v-for="item in authTree" :key="item.sign" class="first-tree">
          <p class="auth-tree-leaves first-leaf">
            <span class="pc-checkbox treeCheckbox treecheckbox">
                <div class="pc-checkbox_input" :class="{'is_checked':item.is_have !='false','disabled':is_target!=is_group&&item.is_have=='group'}"  @click="checked(item.is_have,$event)" :have="item.is_have" :auth_id="item.auth_id" >
                  <span class="pc-checkbox_inner"></span>
                </div>
            </span>{{item.auth_name}}
          </p>
      <ul>
    <!-- 第一级 -->
    <li v-for="item_child in item.auth_children" :key="item_child.sign" :sign="item_child.sign">
      <p class="auth-tree-leaves second-leaf ">
        <span class="pc-checkbox treeCheckbox treecheckbox">
          <div class="pc-checkbox_input" :class="{'is_checked':item_child.is_have !='false','disabled':is_target!=is_group&&item_child.is_have=='group'}"  @click="checked(item_child.is_have,$event)" :have="item_child.is_have"  :auth_id="item_child.auth_id">
          <span class="pc-checkbox_inner"></span>
        </div>
        </span>{{item_child.auth_name}}
        <!-- 第二级 -->
      </p>
      <ul class="second-parent">
        <li v-for="item_children in item_child.auth_children" :key="item_children.sign" :sign="item_children.sign">
          <p class="auth-tree-leaves third-leaf">
            <span class="pc-checkbox treeCheckbox treecheckbox">
                <div class="pc-checkbox_input" :c="item_children.is_have !='false'" :class="{'is_checked':item_children.is_have !='false','disabled':is_target!=is_group&&item_children.is_have=='group'}"  @click="checked(item_children.is_have,$event)" :have="item_children.is_have"  :auth_id="item_children.auth_id">
                <span class="pc-checkbox_inner"></span>
            </div>
            </span>{{item_children.auth_name}}
            <!-- 第三级 -->
          </p>
        </li>
      </ul>
    </li>
  </ul>
  </li>
  </ul>
  </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        is_group: -3, //选中的组id
        is_target: -3, //选中的目标的id
        currentType:'group', //当前是组还是用户
        is_open: true, //是否打开
        checklist: [], //勾选的id
        eidtiVisible: false, //编辑弹出框
        formLabelWidth: '80px',
        addUseriVisible: false, //新建用户
        addUserGroupiVisible: false, //新建用户组
        account: "", //账号
        name_zh: "", //中文名字
        password: "", //初始密码
        remarks: "", //备注
        role_list: [], //获取的分组列表
        userGroupName: '', //用户组名称
        groupType: '', //用户组 新增或者编辑
        userType: '', //用户 新增或者编辑
        targetInfo: {}, //当前的勾选的用户信息
        authTree: [], //权限树
        authChecked: [], //勾选的的权限
        moveDialog:false,
        moveTargetId:"",//移动到的分组
      }
    },
    methods: {
      loadUserList() {
        var vm = this;
        var params = {
          successFn(res) {
            if (res.rescode == 200) {
              vm.role_list = res.role_user_list;
              if (vm.is_group == -3) {
                vm.is_group = res.role_user_list[0].role_id;
                vm.is_target = res.role_user_list[0].role_id;
                vm.getAuthTree();
              } else {
                if (vm.currentType == 'user') {
                  var data = res.role_user_list;
                  for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].child_user.length; j++) {
                      if (data[i].child_user[j].user_id == vm.is_target) {
                        vm.targetInfo = data[i].child_user[j];
                      }
                    }
                  }
                }
              }
            }
          }
        }
        this.$store.dispatch('getUserGroup', params)
      },
      addUserGroup() { //添加用户组
        this.addUserGroupiVisible = true;
        this.userGroupName = '';
        this.groupType = 'add';
        if (this.$refs.userGroupName) {
          this.$refs.userGroupName.style.visibility = "hidden";
        }
      },
      postUserGroup() { //提交用户组
        if (!this.userGroupName) {
          this.$refs.userGroupName.innerHTML = '请输入用户组名';
          this.$refs.userGroupName.style.visibility = "visible";
          return
        } else {
          this.$refs.userGroupName.style.visibility = "hidden";
        };
        var vm = this;
        var params = {
          successFn(res) {
            if (res.rescode == 200) {
              vm.addUserGroupiVisible = false;
              vm.$notify({
                title: '成功',
                message: '用户组创建完成',
                type: 'success'
              });
              vm.loadUserList();
            }
          }
        }
        if (this.groupType == "add") {
          params.data = {
            'action': 'add',
            'role_data': {
              'role_name': vm.userGroupName,
            }
          }
        } else if (this.groupType == "update") {
          params.data = {
            'action': 'update',
            'role_data': {
              'role_name': vm.userGroupName,
              'role_id': vm.is_target
            }
          }
        }
        this.$store.dispatch('postUserGroup', params);
      },
      getGroupdetail(groupId, targetId, data,type) {
        let oldId = this.is_group;
        this.is_group = groupId;
        this.is_target = targetId;
        this.currentType = type;
        if (oldId == groupId && this.currentType == 'group') {
          this.oldId = -3;
        } else {
          if (oldId != -3) {
            this.checklist = [];
            //清除之前勾选的数据
          }
          this.is_open = true;
          this.targetInfo = data;
          
        };
        this.getAuthTree();
      },
      editFn() { //编辑名称
        if (this.currentType == 'group') {
          this.groupType = 'update';
          this.addUserGroupiVisible = true;
        } else {
          this.eidtiVisible = true;
          this.userType = 'update';
          this.account = this.targetInfo.account;
          this.name_zh = this.targetInfo.user_name;
          this.password = "";
          this.remarks = this.targetInfo.description;
        }
      },
      postUser() { //提交用户信息
        if (!this.validataUser()) {
          return
        }
        var params = {
          successFn(res) {
            if (res.rescode == 200) {
              if (vm.userType == "add") {
                vm.addUseriVisible = false;
              } else {
                vm.eidtiVisible = false;
              }
              vm.$notify({
                title: '成功',
                message: res.info,
                type: 'success'
              });
              vm.account = "";
              vm.name_zh = "";
              vm.password = "";
              vm.remarks = "";
              vm.loadUserList();
            }
          }
        }
        var vm = this;
        if (this.userType == 'update') {
          if (vm.password) {
            params.data = {
              'user_data': JSON.stringify({
                'name': vm.name_zh,
                'account': vm.account,
                'password': vm.password,
                'description': vm.remarks,
                'user_id': vm.is_target
              }),
              'action':'update'
              
            }
          } else {
            params.data = {
              'user_data': JSON.stringify({
                'name': vm.name_zh,
                'account': vm.account,
                'description': vm.remarks,
                'user_id': vm.is_target
              })
            }
          }
          this.$store.dispatch("modifyUser", params);
        }
        if (this.userType == "add") {
          params.data = {
            'user_data': JSON.stringify({
              'name': vm.name_zh,
              'account': vm.account,
              'description': vm.remarks,
              'password': vm.password,
              'role_id': vm.is_group
            })
          };
          this.$store.dispatch("addUser", params); //新建
        }
      },
      addUser() { //新建用户
        this.addUseriVisible = true;
        this.userType = 'add';
      },
      getAuthTree() {
        var vm = this;
        console.log(vm.currentType == 'group')
        var params = {
          successFn(res) {
            if (res.rescode == 200) {
              vm.authTree = [];
              Object.assign(vm.authTree,res.auth_role_tree)
              vm.$forceUpdate()
            }
          }
        }
        if (vm.currentType != 'group') {
          params.data = {
            'role_id': vm.is_group,
            'user_id': vm.is_target,
          };
        } else {
          params.data = {
            'role_id': vm.is_group,
          };
        }
        this.$store.dispatch("getAuth", params);
      },
      clearDialog(key) {
        if (this.userType == 'update') {
          this.eidtiVisible = false;
        } else {
          this.addUseriVisible = false;
        }
        this.account = "";
        this.name_zh = "";
        this.password = "";
        this.remarks = "";
        this.$refs.account.style.visibility = "hidden";
        this.$refs.name_zh.style.visibility = "hidden";
        this.$refs.password.style.visibility = "hidden";
        this.$refs.remarks.style.visibility = "hidden";
      },
      checked(is_have, ev) {
        var $target = $(ev.currentTarget);
        var vm = this;
        console.log(is_have)
        if (is_have == 'false') {
          if ($target.hasClass('is_checked')) {
            $target.removeClass('is_checked');
          } else {
            $target.addClass('is_checked')
          }
        } else {
          if (vm.currentType == 'group') {
            if (is_have == 'group' || is_have == 'false') {
              if ($target.hasClass('is_checked')) {
                $target.removeClass('is_checked');
              } else {
                $target.addClass('is_checked')
              }
            }
          }
          if (vm.currentType == 'user') {
            if (is_have == 'user' || is_have == 'false') {
              if ($target.hasClass('is_checked')) {
                $target.removeClass('is_checked');
              } else {
                $target.addClass('is_checked')
              }
            }
          }
        }
      },
      openMoveDialog(){
        this.moveDialog = true;
        $(".moveList .is_checked").removeClass('is_checked');
      },
      moveChecked(role_id,event){//勾选要移动到的分组
        var $target = $(event.currentTarget).find(".pc-checkbox_input");
        if($target.hasClass('is_checked')){
          $target.removeClass('is_checked');
        }else{
          $(".moveList .is_checked").removeClass('is_checked');
          $target.addClass('is_checked');
          this.moveTargetId = role_id;
        }
      },
      moveUser(){//移动用户
        var moveTarget = [];
        moveTarget.push(this.is_target);
        var vm = this;
        var params = {
          data:{
            'user_ids':JSON.stringify(moveTarget),
            'role_id':vm.moveTargetId,
            'action':'move'
          },
          successFn(res){
            if(res.rescode == 200){
              vm.is_target = vm.is_group;
              vm.currentType = 'group';
            
              vm.loadUserList();
              vm.getAuthTree();
              vm.$notify({
                title: '成功',
                message: res.info,
                type: 'success'
              });
              vm.moveDialog = false;
            }
          }
        }
        this.$store.dispatch("modifyUser", params);
      },
      validataUser(key) {
        if (!key) {
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
          if (!this.name_zh) {
            this.$refs.name_zh.innerHTML = '请输入中文名称';
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
          if (this.userType != 'update') {
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
          // if (!this.remarks) {
          //   this.$refs.remarks.innerHTML = '请输入备注';
          //   this.$refs.remarks.style.visibility = "visible";
          //   return false;
          // } else {
          //   this.$refs.remarks.style.visibility = "hidden";
          // }
        } else {
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
          if (key == 'userGroupName') {
            if (!this.userGroupName) {
              this.$refs.userGroupName.innerHTML = '请输入用户组名';
              this.$refs.userGroupName.style.visibility = "visible";
              return false;
            }
            this.$refs.userGroupName.style.visibility = "hidden";
          }
        }
        return true
      },
      deleteFn() { //删除
        let title;
        var vm = this;
        if (vm.currentType == 'group') {
          title = "确认删除该用户组？"
        } else {
          title = "确认删除该用户？"
        }
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(({
          value
        }) => {
          if (vm.currentType == 'group') {
            var params = {
              data: {
                'role_data': JSON.stringify({
                  'role_id': vm.is_group
                }),
                'action': 'delete'
              },
              successFn(res) {
                if (res.rescode == 200) {
                  vm.$notify({
                    title: '提示',
                    message: res.info,
                    type: 'success'
                  });
                  vm.loadUserList();
                } else {
                  vm.$notify({
                    title: '提示',
                    message: res.info,
                    type: 'info'
                  });
                }
              }
            };
            vm.$store.dispatch('postUserGroup', params);
          } else {
            var params = {
              data: {
                'user_id': vm.is_target
              },
              successFn(res) {
                if (res.rescode == 200) {
                  vm.$notify({
                    title: '提示',
                    message: res.info,
                    type: 'success'
                  });
                  vm.loadUserList();
                } else {
                  vm.$notify({
                    title: '提示',
                    message: res.info,
                    type: 'info'
                  });
                }
              }
            };
            vm.$store.dispatch('deleteUser', params);
          }
        }).catch(() => {});
      },
      saveAuth() {
        var auth_checked = [];
        $(".treecheckbox .is_checked").each(function(i) {
          auth_checked.push({
            'auth_id': $(this).attr("auth_id")
          });
        })
        var vm = this;
        var params = {
          successFn(res) {
            if (res.rescode == 200) {
              vm.loadUserList();
              vm.$notify({
                title: '提示',
                message: res.info,
                type: 'success'
              });
            }
          }
        };
        if (vm.currentType == 'group') {
          params.data = {
            'role_id': vm.is_group,
            'action': 'update',
            'auth_array': JSON.stringify(auth_checked)
          }
          this.$store.dispatch('saveGroupAuth', params);
        } else {
          params.data = {
            'user_id': vm.is_target,
            'action': 'update',
            'auth_array': JSON.stringify(auth_checked)
          }
          this.$store.dispatch('saveUserAuth', params);
        }
      }
    },
    created() {
      this.loadUserList();
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
