import Vue from 'vue'
import Router from 'vue-router'
import Platform from '../components/modules/platform/platformReview.vue'; //权限管控
import Site from '../components/modules/platform/siteView.vue'
import serviceVersion from '../components/modules/version/serviceVersion.vue'
import terminalVersion from '../components/modules/version/terminalVersion.vue'
import live from '../components/modules/live/live.vue'
import error from '../components/modules/error/error.vue'
Vue.use(Router)
var router = new Router({
    routes: [{
            path: '/',
            // redirect: '/platform',

        },
        {
            path: '/platform', //平台预览
            name: 'platform',
            component: Platform

        }, {
            path: '/subsite/:id', //平台预览
            name: 'site',
            component: Site

        }, {
            path: '/version', //版本管理
            redirect: '/version/subSystem',
            name: "version"

        },
        {
            path: '/version/subSystem', //版本管理
            component: serviceVersion,
            name: "version"
        },
        {
            path: '/version/terminal', //版本管理
            component: terminalVersion,
            name: "version"
        },
        {
            path: '/live', //直播cdn
            component: live,
            name: "live"
        }, {
            path: '/error', //报错
            component: error,
            name: "error"
        }

    ]
});


export default router