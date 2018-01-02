<template>
    <div class="share-content_wrapper">
        <div class="share-content">
            <div class="el-row content-header">
                <el-select v-model="prison_select" class="prison_select" clearable filterable @change="getIssuedList" placeholder="下发位置">
                    <el-option v-for="item in subsiteList" :label="item.subsystem_name" :value="item.subsystem_id" :key="item.subsystem_mac">
                    </el-option>
                </el-select>
                <div class="time-wrapper">
                    <el-date-picker class="time-picker" v-model="time" type="daterange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right" @change="getIssuedList" format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="search-wrapper">
                    <el-input class="search-text" placeholder="请输入选择内容" icon="search" v-model="search" :on-icon-click="getIssuedList" @keyup.enter.native="getIssuedList" @blur="getIssuedList">
                    </el-input>
                </div>
                <div class="sort-wrapper">
                    <el-popover ref="sort-popover" placement="bottom" width="100" v-model="sortVisible" class="sort-popover">
                        <div class="resource-sort">
                            <a href="javascript:;" @click="sortType('issued_time')" :class="{'sort':sort_name == 'issued_time'}">修改日期</a>
                            <a href="javascript:;" @click="sortType('material_name')" :class="{'sort':sort_name == 'material_name'}">文件名称</a>
                            <a href="javascript:;" @click="sortType('size')" :class="{'sort':sort_name == 'size'}">文件大小</a>
                        </div>
                    </el-popover>
                    <el-button v-popover:sort-popover>排序</el-button>
                </div>
            </div>
            <div class="el-row share-tb">
                <div class="el-row share-tb_header el-row">
                    <el-col :span="6" class="share-tb_td">
                        资源名称
                    </el-col>
                    <el-col :span="6" class="share-tb_td">
                        下发位置
                    </el-col>
                    <el-col :span="6" class="share-tb_td">
                        下发时间
                    </el-col>
                    <el-col :span="3" class="share-tb_td">
                        状态
                    </el-col>
                    <el-col :span="3" class="share-tb_td">
                        操作人
                    </el-col>
                </div>
                <div class="share-tb_tbody el-row">
                    <div class="el-row share-tb_tr" v-for="(item,index) in issued_list" :key="index">
                        <el-col :span="6" class="share-tb_td">
                           
                            <div class="share-icon" v-if="item.type_id == -1" title="其他">
                                <!-- //电视剧 -->
                                <img src="../../../../assets/img/other.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 1" title="视频">
                                <!-- //视频 -->
                                <img src="../../../../assets/img/video.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 2" title="直播">
                                <!-- //视频 -->
                                <img src="../../../../assets/img/live.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 3" title="pdf">
                                <!-- //pdf-->
                                <img src="../../../../assets/img/PDF.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 4" title="图片">
                                <!-- //图片 -->
                                <img src="../../../../assets/img/pic.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 5" title="ppt">
                                <!-- //图片 -->
                                <img src="../../../../assets/img/PPT.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 6" title="apk">
                                <!-- //apk -->
                                <img src="../../../../assets/img/APK.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 7" title="网页">
                                <!-- //网页 -->
                                <img src="../../../../assets/img/web.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 8" title="音频">
                                <!-- //音频 -->
                                <img src="../../../../assets/img/audio.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 9" title="电视剧">
                                <!-- //电视剧 -->
                                <img src="../../../../assets/img/series.png" />
                            </div>
                            <div class="share-icon" v-if="item.type_id == 10">
                                <!-- //单集电视剧 -->
                                <img src="../../../../assets/img/video.png" />
                            </div>
                        
                            <div class="share-name">
                                <a href="javascript:;" :title="item.material_name">{{item.material_name}}</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="share-tb_td">
                            {{item.subsystem_name}}
                        </el-col>
                        <el-col :span="6" class="share-tb_td">
                            {{item.issued_time}}
                        </el-col>
                        <el-col :span="3" class="share-tb_td">
                            {{item.issued_status | statusFilter}}
                        </el-col>
                        <el-col :span="3" class="share-tb_td">
                            {{item.user_name}}
                        </el-col>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
</template>

<script>
    export default {
        data() {
            return {
               
                authLoading: false, //权限获取完成
                sort_name: "issued_time",
                sort_type: "down",
                prison_select: "",
                sort_select: "",
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
                time: '',
                search: "",
                subsiteList: [], //子站点列表
                issued_list: [], //下发列表
                sortVisible: false
            }
        },
        methods: {
            handleIconClick(ev) {},
            //获取下发的子站点列表
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
            getIssuedList() {
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
                        'subsystem_name': vm.search,
                        'subsystem_mac': vm.search
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
                            this.authLoading = true;
                            vm.issued_list = res.result;
                        } else {
                            vm.$notify({
                                title: '提示',
                                message: '获取下发列表失败',
                                type: 'info'
                            });
                        }
                    }
                }
                this.$store.dispatch('getIssuedlist', params);
            },
            sortType(name) {
                this.sort_name = name;
                if (this.sort_type == 'up') {
                    this.sort_type = 'down'
                } else {
                    this.sort_type = 'up'
                }
                this.getIssuedList()
            },
           
        },
        created() {
            this.getSite();
            this.getIssuedList()
          
        },
        filters: {
            statusFilter(val) {
                var status;
                if (val == 0) {
                    status = '等待下发';
                }
                if (val == 1) {
                    status = '下发中';
                }
                if (val == 2) {
                    status = '下发暂停';
                }
                if (val == 3) {
                    status = '下发完成';
                }
                if (val == -1) {
                    status = '下发异常';
                }
                return status
            }
        }
    }
</script>

<style>

</style>
