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
                show:[],
            
                flatArr: [{
                        'auth_code': 'material',
                        'path': require('../../assets/img/resource.png'),
                        'decoration': '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                        'auth_name': '资源管理',
                        'route': 'resource'
                    },
                    {
                        'auth_code': 'live',
                        'path': require('../../assets/img/resource.png'),
                        'decoration': '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                        'auth_name': '直播CND',
                        'route': 'resource'
                    },
                    {
                        'auth_code': 'subsite',
                        'path': require('../../assets/img/site.png'),
                        'decoration': '测试2',
                        'auth_name': '平台运维',
                        'route': 'site'
                    }, {
                        'auth_code': 'reform',
                        'path': require('../../assets/img/target-flow.png'),
                        'decoration': '测试2',
                        'auth_name': '改造流程',
                        'route': 'reform'
                    },
                    {
                        'auth_code': 'log',
                        'path': require('../../assets/img/log.png'),
                        'decoration': '测试2',
                        'auth_name': '日志统计',
                        'route': 'logStatistics'
                    },
                    {
                        'auth_code': 'system',
                        'path': require('../../assets/img/jurisdiction.png'),
                        'decoration': '测试2',
                        'auth_name': '用户权限',
                        'route': 'system'
                    },
                    
                ]
            }
        },
        methods: {
            getAuth(val, id) {
                localStorage.auth_id = id;
                
                location.assign(val + '.html');
            },
            getModules() {
                var vm = this;
                var show =[{},{},{},{},{},{}];
                var params = {
                    'data': {
                        'route_code_id': '-1'
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            var data = res.result;
                            for (let i = 0; i < data.length; i++) {
                               
                                    if (data[i].auth_code == vm.flatArr[0].auth_code) {
                                        let newObj = Object.assign({}, vm.flatArr[0], data[i]);
                                        show[0] = newObj;
                                    }
                                    if (data[i].auth_code == vm.flatArr[1].auth_code) {
                                        let newObj = Object.assign({}, vm.flatArr[1], data[i]);
                                        show[1] = newObj;
                                    }
                                    if (data[i].auth_code == vm.flatArr[2].auth_code) {
                                        let newObj = Object.assign({}, vm.flatArr[2], data[i]);
                                        show[2] = newObj;
                                    }
                                    if (data[i].auth_code == vm.flatArr[3].auth_code) {
                                        let newObj = Object.assign({}, vm.flatArr[3], data[i]);
                                        show[3] = newObj;
                                    }
                                    if (data[i].auth_code == vm.flatArr[4].auth_code) {
                                        let newObj = Object.assign({}, vm.flatArr[4], data[i]);
                                        show[4] = newObj;
                                    }
                                    if (data[i].auth_code == vm.flatArr[5].auth_code) {
                                        let newObj = Object.assign({}, vm.flatArr[5], data[i]);
                                        show[5] = newObj;
                                    }
                            }
                            
                            for(let j=0;j<show.length;j++){
                                if(show[j].auth_name){
                                    vm.show.push(show[j]);
                                }
                            }
                            
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
