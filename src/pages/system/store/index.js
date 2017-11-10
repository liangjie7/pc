import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);

import utils from '../../assets/js/utils'
var ajax = utils.ajax;

export default new VueX.Store({
    state: {

    },
    mutations: {


    },

    actions: {
        logOut({}, info) { //登出
            return ajax('/jescloud/loginout', 'post', info, true)
        },
        resetPassword({}, info) { //用户重置密码
            return ajax('/jescloud/reset_password', 'post', info, true)
        },
        getUserGroup({}, info) { //获取角色（用户组）列表
            return ajax('/jescloud/role_manage', 'get', info, true)
        },
        postUserGroup({}, info) { //角色管理新增，编辑，删除用户组
            return ajax('/jescloud/role_manage', 'POST', info, true)
        },

        addUser({}, info) { //新增用户
            return ajax('/jescloud/user_manage', 'put', info, true)
        },
        modifyUser({}, info) { //修改用户
            return ajax('/jescloud/user_manage', 'post', info, true)
        },
        deleteUser({}, info) { //删除
            return ajax('/jescloud/user_manage', 'delete', info, true)
        },
        getAuth({}, info) { //获取权限树
            return ajax('/jescloud/auth_role_manage', 'get', info, true)
        },
        saveGroupAuth({}, info) { // 角色权限管理
            return ajax('/jescloud/auth_role_manage', 'post', info, true)
        },
        saveUserAuth({}, info) { // 用户权限管理
            return ajax('/jescloud/auth_user_manage', 'post', info, true)
        }

    }
})