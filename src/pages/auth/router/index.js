import Vue from 'vue'
import Router from 'vue-router'
import jurisdiction from '../components/modules/jurisdiction/jurisdiction.vue'; //权限管控
import user from '../components/modules/user/user.vue'; //用户
Vue.use(Router)
var router = new Router({
    routes: [{
            path: '/',
            // redirect: 'user', //权限管控

        }, {
            path: '/jurisdiction',
            component: jurisdiction,
            name: 'jurisdiction' //权限管控

        },
        {
            path: '/user',
            component: user,
            name: 'user' //用户

        },

    ]
})


export default router