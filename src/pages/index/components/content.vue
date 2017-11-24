<template>
    <div id="index-content">
        <div class="index-section" v-if="show.length  && authloading">
            <div class="index-block" @click="getAuth(item.route,item.auth_id)" v-for="item in show" :key="item.auth_id">
                <p class="header">{{item.auth_name}}</p>
                <div class="content">
                    <span class="tips">
                            {{item.decoration}}
                        </span>
                    <div class="logo"><img :src="item.path" /></div>
                </div>
            </div>
        </div>
        <div v-if="!show.length && authloading" class="wraning-auth">
            什么都没有哦
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                material: 'false',
                authloading:false,
                show: [],
                flatArr: [{
                        'auth_code': 'material',
                        'path': require('../../assets/img/resource.png'),
                        'decoration': '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                        'auth_name': '资源管理',
                        'route': 'resource'
                    },
                    {
                        'auth_code': 'subsite',
                        'path': require('../../assets/img/site.png'),
                        'decoration': '测试2',
                        'auth_name': '站点管理',
                        'route': 'site'
                    }, {
                        'auth_code': 'site',
                        'path': require('../../assets/img/target-flow.png'),
                        'decoration': '测试2',
                        'auth_name': '任务流程'
                    },
                    {
                        'auth_code': 'system',
                        'path': require('../../assets/img/jurisdiction.png'),
                        'decoration': '测试2',
                        'auth_name': '系统配置',
                        'route': 'system'
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
            getAuth(val, id) {
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
                                for (let j = 0; j < vm.flatArr.length; j++)
                                    if (data[i].auth_code == vm.flatArr[j].auth_code) {
                                        let newObj = Object.assign({}, vm.flatArr[j], data[i]);
                                        vm.show.push(newObj);
                                    }
                            }
                            console.log(vm.show.length)
                            vm.authloading = true;
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
    .index-notice {
        font-size: 20px;
    }
</style>
