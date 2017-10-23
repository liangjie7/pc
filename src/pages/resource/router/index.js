import Vue from 'vue'
import Router from 'vue-router'
import indexShow from '../components/modules/index/indexShow.vue';
import resourceManage from '../components/modules/resource/resourceManage.vue'
import List from '../components/modules/resource/list.vue'
import Grid from '../components/modules/resource/grid.vue'
import Share from '../components/modules/share/share.vue'
import Issue from '../components/modules/issue/issue.vue'
import examine from '../components/modules/examine/examine.vue'
Vue.use(Router)
var router = new Router({
        routes: [{
                path: '/',
                redirect: '/indexShow',

            }, {
                path: '/indexShow',
                component: indexShow,
                name: 'index'

            }, {
                path: '/resourceManage',
                component: resourceManage,
                redirect: '/resourceManage/list',
                name: "resource",
                children: [{

                    path: 'list',
                    component: List,
                    name: "list",

                }, {

                    path: 'grid',
                    component: Grid,
                    name: "grid"
                }],


            },
            {
                path: '/share',
                component: Share,
                name: "share"
            }, {
                path: '/issue',
                component: Issue,
                name: "issue"
            }, {
                path: '/examine',
                component: examine,
                name: "examine"
            }
        ]
    })
    // router.beforeEach((to, from, next) => {

//     // if () {
//     //     next({ path: to.fullPath })
//     // }else
//     // 
// })
export default router