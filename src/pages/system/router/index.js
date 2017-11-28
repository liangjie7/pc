import Vue from 'vue'
import Router from 'vue-router'
import jurisdiction from '../components/modules/jurisdiction/jurisdiction.vue'; //权限管控

Vue.use(Router)
var router = new Router({
    routes: [{
            path: '/',
            redirect: 'jurisdiction', //权限管控

        }, {
            path: '/jurisdiction',
            component: jurisdiction,
            name: 'jurisdiction' //权限管控

        },

    ]
})


export default router