<template>
    <div id="log-content" v-loading="check"  element-loading-text="查询中">
        <div class="filtersGroup">
            <span class="filter-tool">操作IP<input v-model="actionip"  class="filter-input" type="text" placeholder="输入查询IP"></input> <p class="right-line"></p></span>
            <span class="filter-tool">操作人<input v-model="actionusername" class="filter-input" placeholder="输入操作人姓名"></input><p class="right-line"></p></span>
            <span class="filter-tool">操作行为<input v-model="actionmove" class="filter-input" placeholder="输入操作行为"></input><p class="right-line"></p></span>
            <span class="filter-tool">操作内容<input v-model="actioncontent" class="filter-input" placeholder="输入操作内容"></input></span>
        </div>
        <div class="filtersGroup">
            <span class="filter-tool">时间范围
                <el-date-picker v-model="timeInterval"  :editable="false" :clearable="false" type="datetimerange" :default-value="new Date()" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right" class="filter-time" >
                </el-date-picker>
            </span>
            <button @click="getLogList">开始查询</button>
            <button @click="exportLog" v-if="log_backend_export">导出日志</button>
        </div>
        <!-- <span>操作人<el-input  placeholder="请输入操作人性别"></el-input></span>
                        <span>操作人<el-input  placeholder="请输入操作人性别"></el-input></span> -->
        <el-table :data="logList" style="width: 100%" id="logList">
            <el-table-column prop="actionip" label="操作IP" width="180">
                <template slot-scope="scope">
                    <div slot="reference" :title="scope.row.actionip" class="slot">
                        {{scope.row.actionip}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="actiontime" label="时间" width="180">
                <template slot-scope="scope">
                    <div slot="reference" :title="scope.row.actiontime" class="slot">
                        {{scope.row.actiontime}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="actionusername" label="操作人"  width="180">
                <template slot-scope="scope">
                    <div slot="reference" :title="scope.row.actionusername" class="slot">
                        {{scope.row.actionusername}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="actionmove" label="操作行为">
                <template slot-scope="scope">
                    <div slot="reference" :title="scope.row.actionmove" class="slot">
                        {{scope.row.actionmove}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="actioncontent" label="操作内容">
                <template slot-scope="scope">
                    <div slot="reference" :title="scope.row.actioncontent | actionConetentFilters" class="slot">
                        {{scope.row.actioncontent | actionConetentFilters}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logList: [], //日志列表
                log_backend_export:false,//导出日志功能
                actionip: "",
                actionusername: "",
                actionmove: "",
                actioncontent: "",
                check:false,
                timeInterval: [new Date() - 8.64e7 * 6, new Date()],
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
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
            }
        },
        methods: {
            getLogList() {
                var vm = this;
                if (!vm.timeInterval[0]) {
                    alert('请选择时间范围')
                    return
                }
                vm.check = true;
                var params = {
                    data: {
                        'search_data': {
                            'actionip': vm.actionip,
                            'actionusername': vm.actionusername,
                            'actionmove': vm.actionmove,
                            'actionuseraccount': "",
                            'actioncontent': vm.actioncontent,
                            'start_time': vm.timeFormat(vm.timeInterval[0]),
                            'end_time': vm.timeFormat(vm.timeInterval[1]),
                        }
                    },
                    successFn(res) {
                        vm.check = false;
                        if (res.rescode == 200) {
                            vm.logList = res.reslut.content;
                        }
                    }
                };
                this.$store.dispatch("getLog", params);
            },
            exportLog() {
                var vm = this;
                if (!vm.timeInterval[0]) {
                    alert('请选择时间范围')
                    return
                }
                var search_data = {
                    'actionip': vm.actionip,
                    'actionusername': vm.actionusername,
                    'actionmove': vm.actionmove,
                    'actionuseraccount': "",
                    'actioncontent': vm.actioncontent,
                    'start_time': vm.timeFormat(vm.timeInterval[0]),
                    'end_time': vm.timeFormat(vm.timeInterval[1]),
                };
                window.open('jescloud/get_logbackendcsv?search_data=' + JSON.stringify(search_data));
            },
            timeFormat(date) {
                var date = new Date(date);
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var minute = date.getMinutes();
                var hour = date.getHours();
                var sec = date.getSeconds();
                if (month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (minute >= 0 && minute <= 9) {
                    minute = "0" + minute;
                }
                if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
                }
                if (sec >= 0 && sec <= 9) {
                    sec = "0" + sec;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                    " " + hour + seperator2 + minute +
                    seperator2 + sec
                return currentdate;
            },
            getAuth(val) {
                if (val.length) {
                    for (let auth of val) {
                        if (auth.auth_code == "log_backend_export") {//导出日志
                            this.log_backend_export = true;
                        }
                    }
                    this.authLoading = true;
                } else {
                    this.authLoading = true;
                }
            },
        },
        created() {
            this.getLogList()
        },
        mounted() {
            document.getElementsByTagName("title")[0].innerHTML = window.g.title;
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
        filters:{
            actionConetentFilters(val){
                if(Object.prototype.toString.call(val)=='[object Array]'){
                    val = val.join(",");
                }
                return val
            }
        },
    }
</script>

<style>

</style>
