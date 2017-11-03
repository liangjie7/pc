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
        getModules({}, info) {
            return ajax('/jescloud/route', 'get', info, true)
        },
        logOut({}, info) {
            return ajax('/jescloud/loginout', 'post', info, true)
        },
        resetPassword({}, info) { //用户重置密码
            return ajax('/jescloud/reset_password', 'post', info, true)
        },
    }
})