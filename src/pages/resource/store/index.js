import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);

import utils from '../../assets/js/utils'
var ajax = utils.ajax;

export default new VueX.Store({
    state: {
        currentView: "resourceManage",
        vmode: 'list',
        auth: []
    },
    mutations: {
        changeView(state, view) {
            state.currentView = view;
        },
        vmode(state, vmode) {
            state.vmode = vmode;
        },
        changeAuth(state, auth) {
            console.log(auth)
                // state.auth = auth;
                // state.auth.splice(0, auth.length);
            state.auth = auth
        }

    },

    actions: {
        logOut({}, info) { //登出
            return ajax('/jescloud/loginout', 'post', info, true)
        },
        getModules({}, info) {
            return ajax('/jescloud/route', 'get', info, true)
        },
    }
})