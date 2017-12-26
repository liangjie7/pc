<template>
    <div class="content-wrapper">
        <section class="right-group_wrapper">
            <div class="right-group_header">
                <!-- 编辑弹出框 -->
                <el-dialog :title="userDialog_title" :visible.sync="eidtiVisible" custom-class="eidtiVisible" :before-close="clearDialog">
                    <el-form>
                        <el-form-item label="账号:" :label-width="formLabelWidth">
                            <el-input auto-complete="off" v-model="account" @change="validataUser('account')" placeholder="账号（必填）"></el-input>
                            <p class="tips error" ref="account">请输入账号</p>
                        </el-form-item>
                        <el-form-item label="中文名:" :label-width="formLabelWidth">
                            <el-input auto-complete="off" v-model="name_zh" @change="validataUser('name_zh')" placeholder="中文名称（必填）"></el-input>
                            <p class="tips error" ref="name_zh">请输入中文名</p>
                        </el-form-item>
                        <el-form-item :label="psdLabel" :label-width="formLabelWidth">
                            <el-input auto-complete="off" v-model="password" @change="validataUser('password')" type="password" :placeholder="psdTips"></el-input>
                            <p class="tips error" ref="password">请输入初始密码</p>
                        </el-form-item>
                        <el-form-item label="备注:" :label-width="formLabelWidth">
                            <el-input auto-complete="off" v-model="remarks" @change="validataUser('remarks')" placeholder="备注（可选）"></el-input>
                            <p class="tips error" ref="remarks">请输入备注</p>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="clearDialog">取 消</el-button>
                        <el-button type="primary" @click="postUser">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 编辑弹出框 -->
                <!-- 新建用户 -->
                <el-dialog :title="edtiGrouptitle" :visible.sync="addUserGroupiVisible" custom-class="addUserGroupiVisible">
                    <el-form>
                        <el-form-item label="用户组:" :label-width="formLabelWidth">
                            <el-input auto-complete="off" v-model="userGroupName" @change="validataUser('userGroupName')" placeholder="用户组名称"></el-input>
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
                        <li v-for="item in role_list" :title="item.role_name" class="role" @click="moveChecked(item.role_id,$event)" :key="item.role_id">
                            <span class="pc-checkbox treeCheckbox moveCheckbox">
                                <div class="pc-checkbox_input" >
                                    <span class="pc-checkbox_inner" ></span>
                                </div>
                            </span>
                            <span>{{ item.role_name }}</span>
                        </li>
                    </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moveDialog = false">取 消</el-button>
                <el-button type="primary" @click="moveUser()">确 定</el-button>
            </div>
            </el-dialog>
            <!-- 移动 -->
            <div class="right-tool">
                <a href="javascript:;" title="编辑用户组" @click="editUserGroup" v-if="role_id!=-1"><img src="../../../../assets/img/edit-icon.png" alt="编辑"></a>
                <a href="javascript:;" title="删除" @click="deleteUserGroup" v-if="role_id!=-1 && role_id!=1"><img src="../../../../assets/img/delete-icon.png" alt="删除"></a>
            </div>
            <button class="addUserGroup" title="添加组" @click="addUserGroup">添加组</button>
    </div>
    <div class="userGroup">
        <div v-for="(item,index) in role_list" :key="item.role_id">
            <div class="one_group" :class="{'is_checked':selected == index,'is_target':selected == index}" @click.stop.prevent="getGroupdetail(index)">
                <span class="group-name">
                                <span class="userGroup_icon" ></span>
                <span class="group-title" :title="item.role_name">{{item.role_name}}</span>
                </span>
                <span class="group-count">组员：{{item.count_user}}</span>
            </div>
        </div>
    </div>
    </section>
    <section class="right-detail">
        <div class="user-tool_group">
            <a href="javascript:;" class="tools" title="移动" @click="openMoveDialog"><img src="../../../../assets/img/moveUser.png" /></a>
            <a href="javascript:;" class="tools" @click="deleteUser"><img src="../../../../assets/img/deleteUser.png" /></a>
            <el-button type="primary" size="small" @click.stop="editUser" class="addUser" v-show="(multipleSelection.length<2)&&(user_id!=-1)">编 辑</el-button>
            <el-button type="primary" size="small" @click.stop="addUser" class="addUser" v-show="role_id != -1">添加用户</el-button>
        </div>
        <el-table ref="multipleTable" :data="child_user" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="userTable">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="姓名">
                <template slot-scope="scope">{{ scope.row.user_name }}
</template>
        </el-table-column>
        <el-table-column
        prop="account"
        label="账号">
        </el-table-column>
        <el-table-column
        prop="description"
        label="备注"
        show-overflow-tooltip>
        </el-table-column>
    </el-table>
  </section>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                currentType: 'group', //当前是组还是用户
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
                moveDialog: false,
                moveTargetId: "", //移动到的分组
                addUserid: "", //添加分组的roleid
                edtiGrouptitle: '添加用户组',
                userDialog_title: "添加",
                psdTips: "重置密码（可选）",
                psdLabel: "初始密码",
                oldChecked: "",
                child_user: [], //用户组下用户
                selected: "", //勾选的
                role_id: "", //group的id;
                multipleSelection: [], //多选用户
                user_id: "", //当前的userid
            }
        },
        methods: {
            loadUserList() {
                var vm = this;
                var params = {
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.role_list = res.role_user_list;
                            if (!vm.selected) {
                                vm.selected = 0;
                            }
                            vm.role_id = vm.role_list[vm.selected].role_id;
                            vm.child_user = vm.role_list[vm.selected].child_user;
                            vm.userGroupName = vm.role_list[vm.selected].role_name;
                        }
                    }
                }
                this.$store.dispatch('getUserGroup', params)
            },
            addUserGroup() { //添加用户组
                this.addUserGroupiVisible = true;
                this.userGroupName = '';
                this.groupType = 'add';
                this.edtiGrouptitle = '添加用户组';
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
                                message: res.info,
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
                            'role_id': vm.role_id
                        }
                    }
                }
                this.$store.dispatch('postUserGroup', params);
            },
            getGroupdetail(index) {
                this.child_user = this.role_list[index].child_user;
                this.selected = index;
                this.role_id = this.role_list[this.selected].role_id;
                this.userGroupName = this.role_list[this.selected].role_name;
            },
            editUserGroup() {
                this.groupType = 'update';
                this.addUserGroupiVisible = true;
                this.edtiGrouptitle = '编辑用户组'
            },
            postUser() { //提交用户信息
                if (!this.validataUser()) {
                    return
                }
                var params = {
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.eidtiVisible = false;
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
                        } else {
                            vm.$notify({
                                title: '提示',
                                message: res.info,
                                type: 'info'
                            });
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
                                'user_id': vm.multipleSelection[0].user_id
                            }),
                            'action': 'update'
                        }
                    } else {
                        params.data = {
                            'user_data': JSON.stringify({
                                'name': vm.name_zh,
                                'account': vm.account,
                                'description': vm.remarks,
                                'user_id': vm.multipleSelection[0].user_id
                            }),
                            'action': 'update'
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
                            'role_id': vm.addUserid
                        })
                    };
                    this.$store.dispatch("addUser", params); //新建
                }
            },
            addUser() { //新建用户
                // this.addUseriVisible = true;
                this.userType = 'add';
                this.addUserid = this.role_id;
                this.userDialog_title = "添加";
                this.psdTips = "初始密码（必填）";
                this.psdLabel = "初始密码";
                this.eidtiVisible = true;
            },
            clearDialog(key) {
                this.eidtiVisible = false;
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
                if ($target.hasClass("disabled")) {
                    return
                }
                var vm = this;
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
                    } else if (vm.currentType == 'user') {
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
            openMoveDialog() {
                if (!this.multipleSelection.length) {
                    this.$notify({
                        title: '提示',
                        message: '请先勾选一个用户',
                        type: 'info'
                    });
                    return
                }
                this.moveDialog = true;
                $(".moveList .is_checked").removeClass("is_checked");
            },
            moveChecked(role_id, event) { //勾选要移动到的分组
                var $target = $(event.currentTarget).find(".pc-checkbox_input");
                if ($target.hasClass('is_checked')) {
                    $target.removeClass('is_checked');
                } else {
                    $(".moveList .is_checked").removeClass('is_checked');
                    $target.addClass('is_checked');
                    this.moveTargetId = role_id;
                }
            },
            moveUser() { //移动用户
                var user_ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    user_ids.push(this.multipleSelection[i].user_id);
                }
                var vm = this;
                var params = {
                    data: {
                        'user_ids': JSON.stringify(user_ids),
                        'role_id': vm.moveTargetId,
                        'action': 'move'
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.currentType = 'group';
                            vm.loadUserList();
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
                            // this.$refs.password.innerHTML = '请输入初始密码';
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
                    } else {
                        if (this.password) {
                            if (!/^[A-Za-z0-9]{1,20}$/.test(this.password)) {
                                this.$refs.password.innerHTML = '密码只能由数字和字母组成，长度最大20';
                                this.$refs.password.style.visibility = "visible";
                                return false;
                            } else {
                                this.$refs.password.style.visibility = "hidden";
                            }
                        }
                    }
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
                            if (this.userType != 'update') {
                                this.$refs.password.innerHTML = '请输入初始密码';
                                this.$refs.password.style.visibility = "visible";
                                return false;
                            } else {
                                this.$refs.password.style.visibility = "hidden";
                            }
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if (this.multipleSelection.length == 1) {
                    this.user_id = this.multipleSelection[0].user_id;
                }
            },
            deleteUserGroup() {
                var vm = this;
                var params = {
                    data: {
                        'role_data': JSON.stringify({
                            'role_id': vm.role_id
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
                            vm.selected = 0;
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
            },
            deleteUser() {
                if (!this.multipleSelection.length) {
                    this.$notify({
                        title: '提示',
                        message: '请先勾选一个用户',
                        type: 'info'
                    });
                    return
                }
                var user_ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    user_ids.push(this.multipleSelection[i].user_id);
                }
                var vm = this;
                var params = {
                    data: {
                        'user_ids': JSON.stringify(user_ids)
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
            },
            editUser(id) {
                if (!this.multipleSelection.length) {
                    this.$notify({
                        title: '提示',
                        message: '请先勾选一个用户',
                        type: 'info'
                    });
                    return
                }
                this.userDialog_title = "编辑用户";
                this.psdTips = "重置密码（可选）";
                this.psdLabel = "重置密码";
                this.userType = 'update';
                this.account = this.multipleSelection[0].account;
                this.name_zh = this.multipleSelection[0].user_name;
                this.password = "";
                this.remarks = this.multipleSelection[0].description;
                this.eidtiVisible = true;
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
