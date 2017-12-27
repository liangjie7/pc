import Vue from 'vue'
import Router from 'vue-router'
import personalQuery from '../components/modules/personalQuery/personalQuery.vue'; //权限管控

Vue.use(Router)
var router = new Router({
    routes: [{
            path: '/',

        },
        {
            path: '/personalQuery', //平台预览
            name: 'personalQuery',
            component: personalQuery

        }

    ]
});


export default router