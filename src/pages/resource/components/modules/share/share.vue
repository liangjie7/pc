<template>
    <div class="share-content_wrapper">
        <div class="el-row content-header">
            <el-select v-model="prison_select" class="prison_select" clearable filterable @change="getQueryList">
                <el-option v-for="(item,key) in subsiteList" :label="item.subsystem_name" :value="item.subsystem_id" :key="item.subsystem_mac">
                </el-option>
            </el-select>
            <div class="time-wrapper">
                <el-date-picker class="time-picker" format="yyyy-MM-dd" align="center" v-model="time" type="daterange" :picker-options="pickerOptions2" placeholder="选择时间范围" @change="getQueryList">
                </el-date-picker>
            </div>
            <div class="search-wrapper">
                <el-input class="search-text" placeholder="请输入选择内容" icon="search" v-model="search" @keyup.enter.native="getQueryList" @blur="getQueryList" :on-icon-click="getQueryList">
                </el-input>
            </div>
            <div class="sort-wrapper">
                <el-popover ref="sort-popover" placement="bottom" width="100" v-model="sortVisible" class="sort-popover">
                    <div class="resource-sort">
                        <a href="javascript:;" @click="sortType('share_time')" :class="{'sort':sort_name == 'share_time'}">修改日期</a>
                        <a href="javascript:;" @click="sortType('subsystem_name')" :class="{'sort':sort_name == 'subsystem_name'}">文件名称</a>
                        <a href="javascript:;" @click="sortType('resource_size')" :class="{'sort':sort_name == 'resource_size'}">文件大小</a>
                    </div>
                </el-popover>
                <el-button v-popover:sort-popover>排序</el-button>
            </div>
        </div>
        <div class="el-row share-tb">
            <div class="el-row share-tb_header el-row">
                <el-col :span="5" class="share-tb_td">
                    资源名称
                </el-col>
                <el-col :span="2" class="share-tb_td">
                    资源大小
                </el-col>
                <el-col :span="2" class="share-tb_td">
                    优先级
                </el-col>
                <el-col :span="5" class="share-tb_td">
                    上传来源
                </el-col>
                <el-col :span="3" class="share-tb_td">
                    分享时间
                </el-col>
                <el-col :span="2" class="share-tb_td">
                    授权状态
                </el-col>
                <el-col :span="5" class="share-tb_td">
                    文件状态
                </el-col>
            </div>
            <div class="share-tb_tbody el-row">
                <div class="el-row share-tb_tr row-style" v-for="(item,index) in sharelist" :key="item.share_id">
                    <el-col :span="5" class="share-tb_td">
                        <div class="share-icon">
                            <img src="../../../../assets/img/folder.png" />
                        </div>
                        <div class="share-name">
                            <a href="javascript:;" :title="item.resource_name">{{item.resource_name}}</a>
                        </div>
                    </el-col>
                    <el-col :span="2" class="share-tb_td">
                        <div class="td-padding">{{item.resource_size|bytesToSize}}</div>
                    </el-col>
                    <el-col :span="2" class="share-tb_td">
                        <div class="td-padding">{{item.level_game}}</div>
                    </el-col>
                    <el-col :span="5" class="share-tb_td">
                        <div class="td-padding">{{item.subsystem_name}}</div>
                    </el-col>
                    <el-col :span="3" class="share-tb_td">
                        <div class="td-padding">{{item.share_time}}</div>
                    </el-col>
                    <el-col :span="2" class="share-tb_td">
                        <div class="td-padding">{{item.download_status|statusFilter}}</div>
                    </el-col>
                    <el-col :span="3" class="share-tb_td">
                        <span class="progress-wrapper"><span class="progress " :class="{'finished':(item.download_process == '100.0%')}" :style="'width:'+item.download_process+';'" ></span></span>
                        <div class="share-more" @click="moreTogglshow($event,index)" title="更多" v-if="item.download_status != 3">
                            <img src="../../../../assets/img/more-gray.png" />
                            <ul class="more-wrapper" style="display: none;">
                                <li v-if="item.is_pause == 0" @click="setSharestrategy(item.share_id,item.is_pause,item.level_game)"><a href="javascript:;">暂停</a></li>
                                <li v-if="item.is_pause == 1" @click="setSharestrategy(item.share_id,item.is_pause,item.level_game)"><a href="javascript:;">继续</a></li>
                                <li><a href="javascript:;" @click="setPriority(item.share_id,item.is_pause)">优先</a></li>
                            </ul>
                        </div>
                    </el-col>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sort_name: "share_time",
                sort_type: "up",
                prison_select: "",
                sort_select: "",
                subsiteList: [], //子站点列表
                subsite_id: [], //筛选分享的子站点
                sharelist: [],
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                time: '',
                search: "",
                sortVisible: false
            }
        },
        methods: {
            getSite() {
                var vm = this;
                var params = {
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.subsiteList = res.subsiteList;
                        } else {
                            vm.$notify({
                                title: '提示',
                                message: '获取站点信息失败',
                                type: 'info'
                            });
                        }
                    }
                }
                this.$store.dispatch('manage_subsite', params);
            },
            sortType(name) {
                this.sort_name = name;
                if (this.sort_type == 'up') {
                    this.sort_type = 'down'
                } else {
                    this.sort_type = 'up'
                }
                this.getQueryList()
            },
            getQueryList() {
                var vm = this;
                var data = {};
                if (this.time) {
                    let month1 = this.time[0].getMonth() + 1;
                    if (month1 < 10) {
                        month1 = "0" + month1;
                    }
                    let date1 = this.time[0].getDate();
                    if (date1 < 10) {
                        date1 = "0" + date1;
                    }
                    let month2 = this.time[1].getMonth() + 1;
                    if (month2 < 10) {
                        month2 = "0" + month2;
                    }
                    let date2 = this.time[1].getDate();
                    if (date2 < 10) {
                        date2 = "0" + date2;
                    }
                    data.start_time = this.time[0].getFullYear() + '-' + month1 + '-' + date1 + " 00:00";
                    data.end_time = this.time[1].getFullYear() + '-' + month2 + '-' + date2 + " 23:59";
                }
                if (vm.search) {
                    data.search_data = {
                        'resource_name': vm.search,
                        'subsystem_name': vm.search
                    };
                }
                if ((vm.sort_name != "") && (vm.sort_type != "")) {
                    data.sort_data = JSON.stringify([{
                        'sort_name': vm.sort_name,
                        'sort_type': vm.sort_type,
                    }])
                }
                if (vm.prison_select) {
                    data.subsystem_id = vm.prison_select;
                }
                var params = {
                    data: data,
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.sharelist = res.content;
                        } else {
                            vm.$notify({
                                title: '提示',
                                message: '获取分享列表失败',
                                type: 'info'
                            });
                        }
                    }
                }
                this.$store.dispatch('query_share', params);
            },
            moreTogglshow(ev, index) {
                var morewrapper = document.getElementsByClassName('more-wrapper');
                for (var i = 0; i < morewrapper.length; i++) {
                    if (index != i) {
                        morewrapper[i].style.display = 'none';
                    }
                }
                var target = ev.currentTarget.children[1];
                var style = target.style.display;
                target.style.display = style == 'none' ? "block" : 'none';
            },
            setSharestrategy(id, is_pause, level_game) {
                if (is_pause == 0) {
                    is_pause = 1;
                } else {
                    is_pause = 0;
                }
                var vm = this;
                var params = {
                    data: {
                        'data': JSON.stringify([{
                            'share_id': id,
                            'is_pause': is_pause,
                            'level_game': level_game
                        }])
                    },
                    successFn(res) {
                        console.log(res)
                        if (res.rescode == 200) {
                            vm.$notify({
                                title: '成功',
                                message: '设置策略成功',
                                type: 'success'
                            });
                            // setTimeout(function(){
                                vm.getQueryList();
                            // },1000)
                            
                        } else {
                            vm.$notify({
                                title: '提示',
                                message: '设置策略失败',
                                type: 'info'
                            });
                        }
                    }
                }
                this.$store.dispatch("setSharestrategy", params);
            },
            setPriority(id, is_pause) {
                var vm = this;
                this.$prompt('请输入优先级', '优先级', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[0-9]+$/,
                    inputErrorMessage: '请填入数字'
                }).then(({
                    value
                }) => {
                    vm.setSharestrategy(id, is_pause, value);
                }).catch(() => {});
            }
        },
        created() {
            this.getSite(),
                this.getQueryList()
        },
        filters: {
            statusFilter(val) {
                var status;
                if (val == 0) {
                    status = '等待分享';
                }
                if (val == 1) {
                    status = '分享中';
                }
                if (val == 2) {
                    status = '分享暂停';
                }
                if (val == 3) {
                    status = '分享完成';
                }
                if (val == -1) {
                    status = '分享异常';
                }
                return status
            },
            bytesToSize(bytes) {
                if (bytes === 0 || bytes === null) return '0 B';
                var k = 1024;
                var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
                //后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            }
        }
    }
</script>

<style>

</style>
