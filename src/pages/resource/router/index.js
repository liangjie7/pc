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
        routes: [
            // {
            //     // path: '/',
            //     // redirect: '/indexShow',

            // },
            {
                path: '/indexShow',
                component: indexShow,
                name: 'indexShow',
                meta: {
                    id: ""
                }

            }, {
                path: '/resourceManage',
                component: resourceManage,
                redirect: '/resourceManage/list',
                name: "resource",
                meta: {
                    id: ""
                },
                children: [{

                    path: 'list',
                    component: List,
                    name: "list",
                    meta: {
                        id: ""
                    }


                }, {

                    path: 'grid',
                    component: Grid,
                    name: "grid",
                    meta: {
                        id: ""
                    }

                }],


            },
            {
                path: '/share',
                component: Share,
                name: "share",
                meta: {
                    id: ""
                }

            }, {
                path: '/issue',
                component: Issue,
                name: "issue",
                meta: {
                    id: ""
                }
            }, {
                path: '/examine',
                component: examine,
                name: "examine",
                meta: {
                    id: ""
                }
            }
        ]
    })
    // router.beforeEach((to, from, next) => {
    //     if ((from.name == "resource" || from.name == "list" || from.name == "grid")) {
    //         if (confirm('当前操作可能会导致资源上传失败，是否继续？')) {
    //             next();
    //         } else {
    //             next(false)
    //         }

//     } else if (from.name != "platform") {
//         next();
//     }


// })
export default router