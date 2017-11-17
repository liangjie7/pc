import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);

import utils from '../../assets/js/utils'
var ajax = utils.ajax;

export default new VueX.Store({
    state: {
        sitelist: [],
        singleSiteinfo: {}
    },
    mutations: {
        initSitelist(state, list) {
            state.sitelist = list;
        },
        getsingleSite(state, info) {
            state.singleSiteinfo = info;
        }

    },

    actions: {
        logOut({}, info) { //登出
            return ajax('/jescloud/loginout', 'post', info, true)
        },
        resetPassword({}, info) { //用户重置密码
            return ajax('/jescloud/reset_password', 'post', info, true)
        },
        getSubsite({ commit }, info) { //获取站点信息（搜索、排序）
            return ajax('/jescloud/manage_subsite', 'get', info, true);
        },


    }
})