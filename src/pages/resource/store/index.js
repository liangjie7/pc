import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);

import utils from '../../assets/js/utils'
var ajax = utils.ajax;

export default new VueX.Store({
    state: {
        currentView: "resourceManage",
        vmode: 'list',
        auth: [],
        loaded: [],
        uploadedCount: 0,
    },
    mutations: {
        changeView(state, view) {
            state.currentView = view;
        },
        vmode(state, vmode) {
            state.vmode = vmode;
        },
        changeAuth(state, auth) {
            var arr = Object.assign([], auth);
            state.auth = auth
        },
        getLoaded(state, obj) {
            let ob = obj;
            console.log('ob.key == ' + ob.key)
            state.loaded.splice(ob.key, 1, ob.loaded);
        },
        getUploadCount(state, count) {
            state.uploadedCount = count;
        }

    },

    actions: {
        logOut({}, info) { //登出
            return ajax('/jescloud/loginout', 'post', info, true)
        },
        getModules({}, info) { //权限
            return ajax('/jescloud/route', 'get', info, true)
        },
        upload({ commit }, info) { //上传资源

            let data = info;

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function(event) {
                    let loaded = (event.loaded / event.total * 100).toFixed(2);
                    let progress = {
                        loaded: loaded,
                        key: data.key
                    }
                    commit('getLoaded', progress);
                    if (loaded == 100) {
                        commit('getUploadCount', data.key + 1);

                    }

                }
            }
            return ajax('/upload', 'post', data, false, config)
        },
        uploadToService({}, info) {
            // manage_material
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            }
            return ajax('/jescloud/manage_material', 'put', info, true)
        }
    }
})