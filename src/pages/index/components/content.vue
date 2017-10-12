<template>
    <div id="index-content">
        <div class="index-section">
          
            <div class="index-block" @click="get('resource')" v-for="item in show">
                <p class="header">{{item.auth_name}}</p>
                <div class="content">
                    <span class="tips">
                                        {{item.decoration}}
                                </span>
                    <div class="logo"><img :src="item.path" /></div>
                </div>
            </div>
            <!-- <div class="index-block" @click="get('resource')">
                        <p class="header">资源管理</p>
                        <div class="content">
                            <span class="tips">
                                        这是资源管理这是资源管理这是资源管理这是资源管理
                                </span>
                            <div class="logo"><img src="../../assets/img/resource.png" /></div>
                        </div>
                    </div>
                    <div class="index-block" @click="get('resource')">
                        <p class="header">站点管理</p>
                        <div class="content">
                            <span class="tips">
                                        这是资源管理这是资源管理这是资源管理这是资源管理
                                </span>
                            <div class="logo"><img src="../../assets/img/site.png" /></div>
                        </div>
                    </div>
                    <div class="index-block" @click="get('resource')">
                        <p class="header">任务流程</p>
                        <div class="content">
                            <span class="tips">
                                        这是资源管理这是资源管理这是资源管理这是资源管理
                                </span>
                            <div class="logo"><img src="../../assets/img/target-flow.png" /></div>
                        </div>
                    </div>
                    <div class="index-section">
                        <div class="index-block" @click="get('resource')">
                            <p class="header">权限控制</p>
                            <div class="content">
                                <span class="tips">
                                        这是资源管理这是资源管理这是资源管理这是资源管理
                                </span>
                                <div class="logo"><img src="../../assets/img/jurisdiction.png" /></div>
                            </div>
                        </div>
                        <div class="index-block" @click="get('resource')">
                            <p class="header">日志统计</p>
                            <div class="content">
                                <span class="tips">
                                        这是资源管理这是资源管理这是资源管理这是资源管理
                                </span>
                                <div class="logo"><img src="../../assets/img/log.png" /></div>
                            </div>
                        </div>
                    </div> -->
        </div>
        <!-- <div class="index-section">
                        <div class="index-block"  @click="get('resource')">
                            <p class="header">权限控制</p>
                            <div class="content">
                                <span class="tips">
                                        这是资源管理这是资源管理这是资源管理这是资源管理
                                </span>
                                <div class="logo"><img src="../../assets/img/jurisdiction.png"/></div>
                            </div>
                        </div>
                        <div class="index-block"  @click="get('resource')">
                            <p class="header">日志统计</p>
                            <div class="content">
                                <span class="tips">
                                        这是资源管理这是资源管理这是资源管理这是资源管理
                                </span>
                                <div class="logo"><img src="../../assets/img/log.png"/></div>
                            </div>
                        </div>
                    </div> -->
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
                        'auth_name': '资源管理'
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
            get(val) {
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
        filters: {
            statusFilter(val) {
                var str;
                if (val == 0) {
                    str = '等待下载';
                }
                if (val == 1) {
                    str = '下载中';
                }
                if (val == 2) {
                    str = '下载暂停';
                }
                if (val == 3) {
                    str = '下载完成';
                }
                if (val == -1) {
                    str = '下载异常';
                }
                return str
            }
        },
        created() {
            this.getModules();

        }
    }
</script>

<style lang="scss">

</style>
