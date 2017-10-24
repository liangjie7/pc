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

                    }
                }
            }
            return ajax('/upload', 'post', data, false, config);
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
        },
        manage_subsite({}, info) { //局端获取所有子站点信息列表(搜索、排序)
            return ajax('/jescloud/manage_subsite', 'get', info, true)
        },
        issued_material({}, info) { //下发资源到多站点接口入库（支持批量下发）
            return ajax('/jescloud/issued_material', 'post', info, true)
        },
        getIssuedlist({}, info) { //获取下发列表（搜索，排序）
            return ajax('/jescloud/issued_material', 'get', info, true)
        },
        query_share({}, info) { //局端获取子站点分享的资源列表
            return ajax('/jescloud/query_share', 'get', info, true)
        },
        getCheckList({}, info) { //局端获取资源审核列表（搜索、排序）
            return ajax('/jescloud/manage_check', 'get', info, true)
        },
        query_historycheck({}, info) { //局端获取资源历史审核列表（搜索、排序）
            return ajax('/jescloud/query_historycheck', 'get', info, true)
        },
        query_mycheck({}, info) { //局端获取资源我的审核列表（搜索、排序）
            return ajax('/jescloud/query_mycheck', 'get', info, true)
        },
        setSharestrategy({}, info) { //局端批量更改子监狱分享至局端的资源下载策略
            return ajax('/jescloud/set_sharegame', 'post', info, true)
        }

    }
})