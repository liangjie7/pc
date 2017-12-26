import Vue from 'vue'
import Router from 'vue-router'
import resourcecLog from '../components/modules/resourcecLog/resourcecLog.vue'; //权限管控

Vue.use(Router)
var router = new Router({
    
    routes: [{
            path: '/',
            // redirect: '/resourcecLog',

        },
        {
            path: '/resourcecLog', //资源日志
            name: 'resourcecLog',
            component: resourcecLog

        }

    ]
});


export default router