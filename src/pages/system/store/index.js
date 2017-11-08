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
        }


    }
})