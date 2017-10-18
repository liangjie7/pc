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
        uploadedCount: [],
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
        getUploadCount(state) {
            state.uploadedCount.push(1)
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
                        commit('getUploadCount');

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
        },
        addFile_({}, info) { //目录
            return ajax('/jescloud/manage_materialclass', 'put', info, true)
        },
        addSeries_({}, info) { //电视剧
            return ajax('/jescloud/manage_material', 'put', info, true)
        },
        getRsourceList({}, info) {
            return ajax('/jescloud/manage_material', 'get', info, true)

        },
        delete({}, info) {
            return ajax('/jescloud/manage_material', 'delete', info, true)
        }

    }
})