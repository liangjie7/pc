import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);

import utils from '../../assets/js/utils'
var ajax = utils.ajax;

export default new VueX.Store({
    state: {
        sitelist: [], //子站点列表
        singleSiteinfo: {}, //单个子站点信息
        auth: [],
    },
    mutations: {
        initSitelist(state, list) {
            state.sitelist = [];

            Object.assign(state.sitelist, list)
        },
        getsingleSite(state, info) {
            state.singleSiteinfo = info;
        },
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
        getModules({}, info) { //权限
            return ajax('/jescloud/route', 'get', info, true)
        },
        getSubsite({ commit }, info) { //获取站点信息（搜索、排序）
            return ajax('/jescloud/manage_subsite', 'get', info, true);
        },
        addSite({}, info) { //新建子站点信息
            return ajax('/jescloud/manage_subsite', 'put', info, true);
        },
        getVersionHistory({}, info) { //获取历史版本记录（根据不同子站点）
            return ajax('/jescloud/manage_versionHistory', 'get', info, true);
        },
        getServiceVersion({}, info) { //获取版本信息列表(搜索、排序) 服务器
            return ajax('/jescloud/manage_versionInfo', 'get', info, true);
        },
        getServiceVersion_terminal({}, info) { //获取版本信息列表(搜索、排序) 终端
            return ajax('/jescloud/manage_versionTermInfo', 'get', info, true);
        },
        addNewVersion({}, info) { //新增版本信息（上传版本文件之后调用）
            return ajax('/jescloud/manage_versionInfo', 'PUT', info, true);
        },
        addNewVersion_terminal({}, info) { //新增终端版本信息（上传版本文件之后调用）
            return ajax('/jescloud/manage_versionTermInfo', 'PUT', info, true);
        },
        issueVersion({}, info) { //下发版本至子站点（批量下发）
            return ajax('/jescloud/manage_versionHistory', 'PUT', info, true);
        },
        getType({}, info) { //获取终端版本支持类型
            return ajax('/jescloud/manage_versionSupportType', 'get', info, true);
        },
        getCdnMain({}, info) { //获取cdn主节点
            return ajax('/jescloud/cdn_info/main', 'get', info, true);
        },
        addCdnMain({}, info) { //添加cdn主节点
            return ajax('/jescloud/cdn_info/main', 'put', info, true);
        },
        editCdnMain({}, info) { //编辑cdn主节点
            return ajax('/jescloud/cdn_info/' + info.cdn_id, 'post', info, true);
        },
        getCdnEdge({}, info) { //获取边缘主节点
            return ajax('/jescloud/cdn_info/edge ', 'get', info, true);
        },
        deleteCdn({}, info) {
            return ajax('/jescloud/cdn_info/' + info.cdn_id, 'delete', info, true);
        },
        addCdnEdge({}, info) { //添加cdn边缘节点
            return ajax('/jescloud/cdn_info/edge', 'put', info, true);
        },



    }
})