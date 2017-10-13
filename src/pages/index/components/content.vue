<template>
    <div id="index-content">
        <div class="index-section">
          
            <div class="index-block" @click="getAuth(item.resource,item.auth_id)" v-for="item in show" v-if="show.length">
                <p class="header">{{item.auth_name}}</p>
                <div class="content">
                    <span class="tips">
                                        {{item.decoration}}
                                </span>
                    <div class="logo"><img :src="item.path" /></div>
                </div>
            </div>
            <div v-if="!show.length" class="index-notice">
                什么都没有哦
            </div>

        </div>
       
    </div>
</template>

<script>
    export default {
        data() {
            return {
                material: 'false',
                show:[],
                flatArr: [{
                        'auth_code': 'material',
                        'path': require('../../assets/img/resource.png'),
                        'decoration': '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                        'auth_name': '资源管理',
                        'route':'resource'
                    },
                    {
                        'auth_code': 'site',
                        'path': require('../../assets/img/site.png'),
                        'decoration': '测试2',
                        'auth_name': '站点管理'
                    }, {
                        'auth_code': 'site',
                        'path': require('../../assets/img/target-flow.png'),
                        'decoration': '测试2',
                        'auth_name': '任务流程'
                    },
                    {
                        'auth_code': 'site',
                        'path': require('../../assets/img/jurisdiction.png'),
                        'decoration': '测试2',
                        'auth_name': '权限控制'
                    },
                    {
                        'auth_code': 'site',
                        'path': require('../../assets/img/log.png'),
                        'decoration': '测试2',
                        'auth_name': '日志统计'
                    },
                ]
            }
        },
        methods: {
            getAuth(val,id) {
                localStorage.auth_id = id;
                location.assign(window.g.path + val + '.html');
            },
            getModules() {
                var vm = this;
                var params = {
                    'data': {
                        'route_code_id': '-1'
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            var data = res.result;
                            for (let i = 0; i < data.length; i++) {
                                for(let j =0;j<vm.flatArr.length;j++)
                                if (data[i].auth_code == vm.flatArr[j].auth_code) {
                                    let newObj = Object.assign({},vm.flatArr[j],data[i]);
                                    vm.show.push(newObj);
                                }
                            }
                        }
                    }
                }
                this.$store.dispatch('getModules', params)
            }
        },

        created() {
            this.getModules();

        }
    }
</script>

<style lang="scss">
    .index-notice{
        font-size: 20px;
    }
</style>
