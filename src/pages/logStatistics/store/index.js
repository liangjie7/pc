import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);

import utils from '../../assets/js/utils'
var ajax = utils.ajax;

export default new VueX.Store({
     state: {
        auth:[],
    },
    mutations: {
        changeAuth(state, auth) {
            var arr = Object.assign([], auth);
            state.auth = auth;
        },

    },
    actions: {
        logOut({}, info) { //登出
            return ajax('/jescloud/loginout', 'post', info, true)
        },
        resetPassword({}, info) { //用户重置密码
            return ajax('/jescloud/reset_password', 'post', info, true)
        },
        getLog({}, info) { //获取后台操作日志
            return ajax('/jescloud/get_logbackend', 'get', info, true);
        },
        getModules({}, info) { //权限
            return ajax('/jescloud/route', 'get', info, true)
        },



    }
})