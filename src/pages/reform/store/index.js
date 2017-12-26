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
        getStudentInfo({}, info) { //根据名称获取学员里程碑信息
            return ajax('/jescloud/manage_student', 'get', info, true)
        },
        getModules({}, info) { //权限
            return ajax('/jescloud/route', 'get', info, true)
        },


    }
})