import Vue from 'vue'
import Router from 'vue-router'
import Platform from '../components/modules/platform/platformReview.vue'; //权限管控
import Site from '../components/modules/platform/siteView.vue'

Vue.use(Router)
var router = new Router({
    routes: [{
            path: '/',
            redirect: '/platform',

        },
        {
            path: '/platform', //平台预览
            name: 'platform',
            component: Platform

        }, {
            path: '/subsite/:id', //平台预览
            name: 'site',
            component: Site

        }

    ]
})

export default router