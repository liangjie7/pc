<template>
    <div class="share-content_wrapper">
        <div class="darkwrapper" size="tiny" v-show="dateWrapershow" >
            <div class="date-wrapper" >
                <p class="header"><span>下载设置管理</span></p>
                <p class="target_num">最大任务数
                    <el-input-number v-model="targetnum" :min="1" :max="100" size="small"></el-input-number>
                </p>
                <div class="setting-wrapper">
                    <p class="setting-title">下载时间限制</p>
                    <div class="choose-type">
                        <el-radio-group v-model="chooseTime" size="small">
                            <el-radio :label="1" size="small">无限制</el-radio>
                            <el-radio :label="2" size="large">自定义</el-radio>
                        </el-radio-group>
                    </div>
                    <p class="buttonWrapper" v-show="chooseTime==2"><button class="addTimeslot" @click.stop="addtimeslot">添加时间段</button></p>
                    <div class="time-setting" v-show="chooseTime==2">
                        <div class="time-slot" v-for="(item,index) in timelist" :key="index"  >
                            <div class="layui-input-inline ">
                                <input type="text" class="layui-input time-input" :id="'time'+index" placeholder="输入时间" :time="item" :value="item.s_time+ ' - ' +item.e_time"  @focus.stop="changeindex(index)"/>
                            </div>
                            <button class="deleteTime" @click="deletetime(index)"></button>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <el-button type="primary" @click="downloadSetting">确定</el-button>
                    <el-button @click="dateWrapershow = false">取消</el-button>
                </div>
            </div>
        </div>
        <div class="el-row content-header">
            <el-select v-model="prison_select" class="prison_select" clearable filterable @change="getQueryList" placeholder="分享来源">
                <el-option v-for="item in subsiteList" :label="item.subsystem_name" :value="item.subsystem_id" :key="item.subsystem_mac">
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
                        <a href="javascript:;" @click="sortType('resource_name')" :class="{'sort':sort_name == 'resource_name'}">文件名称</a>
                        <a href="javascript:;" @click="sortType('resource_size')" :class="{'sort':sort_name == 'resource_size'}">文件大小</a>
                    </div>
                </el-popover>
                <el-button v-popover:sort-popover>排序</el-button>
            </div>
            <el-button @click="datedialogShow" type="primary" class="downloadSetting" v-if="material_share_time">下载设置</el-button>
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
                <el-col :span="3" class="share-tb_td">
                    上传来源
                </el-col>
                <el-col :span="4" class="share-tb_td">
                    分享时间
                </el-col>
                <el-col :span="4" class="share-tb_td">
                    授权状态
                </el-col>
                <el-col :span="5" class="share-tb_td">
                    文件状态
                </el-col>
            </div>
            <div class="share-tb_tbody el-row">
                <div class="el-row share-tb_tr row-style" v-for="(item,index) in sharelist" :key="item.share_id">
                    <el-col :span="5" class="share-tb_td">
                        <div class="share-icon" v-if="item.resource_type == -1" title="其他">
                            <!-- //电视剧 -->
                            <img src="../../../../assets/img/other.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 1" title="视频">
                            <!-- //视频 -->
                            <img src="../../../../assets/img/video.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 2" title="直播">
                            <!-- //视频 -->
                            <img src="../../../../assets/img/live.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 3" title="pdf">
                            <!-- //pdf-->
                            <img src="../../../../assets/img/PDF.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 4" title="图片">
                            <!-- //图片 -->
                            <img src="../../../../assets/img/pic.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 5" title="ppt">
                            <!-- //图片 -->
                            <img src="../../../../assets/img/PPT.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 6" title="apk">
                            <!-- //apk -->
                            <img src="../../../../assets/img/APK.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 7" title="网页">
                            <!-- //网页 -->
                            <img src="../../../../assets/img/web.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 8" title="音频">
                            <!-- //音频 -->
                            <img src="../../../../assets/img/audio.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 9" title="电视剧">
                            <!-- //电视剧 -->
                            <img src="../../../../assets/img/series.png" />
                        </div>
                        <div class="share-icon" v-if="item.resource_type == 10">
                            <!-- //单集电视剧 -->
                            <img src="../../../../assets/img/video.png" />
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
                    <el-col :span="3" class="share-tb_td">
                        <div class="td-padding">{{item.subsystem_name}}</div>
                    </el-col>
                    <el-col :span="4" class="share-tb_td">
                        <div class="td-padding">{{item.share_time}}</div>
                    </el-col>
                    <el-col :span="3" class="share-tb_td">
                        <div class="td-padding">{{item.download_status|statusFilter}}</div>
                    </el-col>
                    <el-col :span="4" class="share-tb_td">
                        <span class="progress-wrapper"><span class="progress " :class="{'finished':(item.download_process == '100.0%'&& item.download_status == 3),'error_':(item.download_status == -1)}" :style="'width:'+item.download_process+';'" ></span></span>
                        <div class="share-more" @click.stop="moreTogglshow($event,index,item.share_id)" title="更多"  v-if='item.download_status != 3 && item.download_status != -1 && (material_share_pause || material_share_level)'>
                            <img src="../../../../assets/img/more-gray.png" />
                            <ul class="more-wrapper" v-show="targetid == item.share_id">
                                <li v-if="item.is_pause == 0 && material_share_pause" @click.stop="setSharestrategy(item.share_id,item.is_pause,item.level_game)"><a href="javascript:;">暂停</a></li>
                                <li v-if="item.is_pause == 1 && material_share_pause" @click.stop="setSharestrategy(item.share_id,item.is_pause,item.level_game)"><a href="javascript:;">继续</a></li>
                                <li v-show="material_share_level"><a href="javascript:;" @click.stop="setPriority(item.share_id,item.is_pause)">优先</a></li>
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
                chooseTime:1,
                targetnum: 1,
                datedialog: false,
                dateWrapershow: false,
                sort_name: "share_time",
                sort_type: "down",
                prison_select: "",
                sort_select: "",
                subsiteList: [], //子站点列表
                subsite_id: [], //筛选分享的子站点
                sharelist: [],
                targetid: "",
                material_share_time: false, //设置下载时间段
                material_share_pause: false, //暂停下载/继续下载
                material_share_level: false, //调整下载有限级
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
                sortVisible: false,
                timelist:[],//时间列表
                focusIndex:"",//当前点击的index
                
            }
        },
        methods: {
            getAuth(val) {
                if (val.length) {
                    for (let auth of val) {
                        if (auth.auth_code == "material_share_time") {
                            this.material_share_time = true;
                        }
                        if (auth.auth_code == 'material_share_level') {
                            this.material_share_level = true;
                        }
                        if (auth.auth_code == 'material_share_pause') {
                            this.material_share_pause = true;
                        }
                    }
                }
            },
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
                if (this.time&&this.time[0]&&this.time[1]) {
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
            moreTogglshow(ev, index, targetid) {
                var morewrapper = document.getElementsByClassName('more-wrapper');
                if (targetid == this.targetid) {
                    this.targetid = "";
                } else {
                    this.targetid = targetid;
                }
               
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
                this.targetid = "";
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
                    vm.targetid = "";
                }).catch(() => {
                    vm.targetid = "";
                });
            },
            datedialogShow() {
                var vm = this;
                
                var params = {
                    data:{},
                    successFn(res){
                        if(res.rescode == 200){
                            var data = res.config_list;
                            for(let i=0;i<data.length;i++){
                                if(data[i].config_name == "download_time"){
                                    vm.timelist = JSON.parse(data[i].config_value);
                                    if(!vm.timelist.length){
                                        vm.chooseTime = 1;
                                    }else{
                                         vm.chooseTime = 2;
                                    }
                                     vm.$nextTick(function () {
                                        layui.use('laydate', function() {
                                            var laydate = layui.laydate;
                                            //执行一个laydate实例
                                            //时间范围
                                            for (let i = 0; i < vm.timelist.length; i++) {
                                                laydate.render({
                                                    elem: '#time' + i,
                                                    type: 'time',
                                                    range: true,
                                                    format: "HH:mm",
                                                    theme: '#3a9399',
                                                    btns: ['confirm'],
                                                    done: function(value, date, endDate) {
                                                        var index = vm.focusIndex;
                                                        var s_time = $.trim(value.split('-')[0]);
                                                        var e_time = $.trim(value.split('-')[1]);
                                                        vm.timelist[index].s_time = s_time;
                                                        vm.timelist[index].e_time = e_time;
                                                        if(s_time>=e_time){
                                                            layer.msg("初始时间不能大于或等于结束时间")
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    })
                                   
                                    
                                }
                                if(data[i].config_name == "process_count"){
                                    vm.targetnum = data[i].config_value;
                                }
                                vm.dateWrapershow = true;
                            }
                        }
                    }
                }
                this.$store.dispatch("getTimeList",params);
               
              
            },
            addtimeslot() {
               
                var vm = this;
             
                this.timelist.push({'s_time':'00:00','e_time':'00:00'});
                this.$nextTick(function () {
                    layui.use('laydate', function() {
                    var laydate = layui.laydate;
                    //执行一个laydate实例
                    //时间范围
                    for (var i = 0; i < vm.timelist.length; i++) {
                       
                        laydate.render({
                            elem: '#time' + i,
                            type: 'time',
                            range: true,
                            format: "HH:mm",
                            theme: '#50acdb',
                            btns: ['confirm'],
                            done: function(value, date, endDate) {
                                var index = vm.focusIndex;
                                var s_time = $.trim(value.split('-')[0]);
                                var e_time = $.trim(value.split('-')[1]);
                                vm.timelist[index].s_time = s_time;
                                vm.timelist[index].e_time = e_time;
                                if(s_time>=e_time){
                                    layer.msg("初始时间不能大于或等于结束时间")
                                }
                            }
                        });
                    }
                });
                })
                
            },
            changeindex(index){
               
                this.focusIndex = index;
            },
            deletetime(index){
                this.timelist.splice(index,1);

            },
            downloadSetting(){//保存下载设置
                var vm = this;
                var params = {
                    data:{
                        
                    },
                    successFn(res){
                        if(res.rescode == 200){
                             vm.$notify({
                                title: '成功',
                                message: res.errInfo,
                                type: 'success'
                            });
                            vm.dateWrapershow = false;
                        }else{
                             vm.$notify({
                                title: '提示',
                                message: res.errInfo,
                                type: 'info'
                            });
                            vm.dateWrapershow = false;
                        }
                    }
                };
                var arr = [];
                arr.push({'config_value':vm.targetnum,'config_name':'process_count'});
                if(vm.chooseTime != 1){
                    if(!vm.timelist.length){
                        layer.msg("请先添加下载时间");
                        return
                    }
                    for(let i=0;i<vm.timelist.length;i++){
                        if(vm.timelist[i].s_time>=vm.timelist[i].e_time){
                            layer.msg("初始时间不能大于或等于结束时间");
                            return
                        }
                    }
                    arr.push({'config_value':vm.timelist,'config_name':'download_time'});
                }else{
                    
                    arr.push({'config_value':[],'config_name':'download_time'});
                }
                
                params.data['data'] = JSON.stringify(arr);
                this.$store.dispatch('downloadSetting',params)

            }
        },
        mounted() {},
        created() {
            this.getSite();
            this.getQueryList();
        },
        computed: {
            auth() {
                return this.$store.state.auth
            }
        },
        watch: {
            auth(val) {
                this.getAuth(val); //权限
            }
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
