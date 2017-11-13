<template>
    <div class="examine-content">
        <div class="examine-filter-group">
            <el-dialog title="审核" :visible.sync="examinedialog" class="series-dialog" size="tiny">
                <el-form>
                    <div>
                        <el-radio class="radio" v-model="status" label="1">通过</el-radio>
                        <el-radio class="radio" v-model="status" label="2">未通过</el-radio>
                    </div>
                    <div>
                        <el-input type="textarea" :rows="2" placeholder="审核理由" class="examine-reason" v-model="reason">
                        </el-input>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="examinedialog = false">取 消</el-button>
                    <el-button type="primary" @click="toExamine">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="详情" :visible.sync="check_detail" class="examine-check_dialog" size="small" custom-class="check-dialog">
                <ul class="examine-check_detail">
                    <li><span class="label">文件名称：</span><span class="content" v-html="checkObj.name" :title="checkObj.name"></span></li>
                    <li><span class="label">文件大小：</span><span class="content">{{checkObj.size | bytesToSize}}</span></li>
                    <li><span class="label">发布日期：</span><span class="content" :title="checkObj.time">{{checkObj.time }}</span></li>
                    <li><span class="label">文件类型：</span><span class="content">{{checkObj.type|typeFilter}}</span></li>
                    <li><span class="label">文件来源：</span><span class="content" :title="checkObj.source" v-html="checkObj.source"></span></li>
                    <li v-if="checkObj.type != 9"><span class="label">审核状态：</span><span class="content" >{{checkObj.status|statusFilter}}</span></li>
                    <li v-if="checkObj.reason"><span class="label">审核理由：</span><span class="content" :title="checkObj.reason" v-html="checkObj.reason"></span></li>
                </ul>
            </el-dialog>
            <el-dialog :title="series_title" :visible.sync="check_series" class="examine-check_series" size="small" custom-class="check-series_dialog">
                <el-table :data="getSeries" style="width: 100%"  max-height="350" stripe>
                    <el-table-column prop="resource_name" title="resource_name" label="剧集名称" width="180">
                    </el-table-column>
                    <el-table-column prop="create_time" label="上传时间" width="180">
                    </el-table-column>
                    <el-table-column prop="creator" label="上传人">
                    </el-table-column>
                    <el-table-column prop="check_status"  :formatter="formatter" label="审核状态">
                    </el-table-column>
                </el-table>
            </el-dialog>
            <el-button class="icon-btn examine-filter file-examine " :class="{ 'checked':checking==0 } " @click="getCurrentCheckList(0) "><i class="icon "></i><span class="label ">文件审核</span></el-button>
            <el-button class="icon-btn examine-filter examine-record " :class="{ 'checked':checking==1 } " @click="getCurrentCheckList(1) "><i class="icon "></i><span class="label ">历史审批</span></el-button>
            <el-button class="icon-btn examine-filter apply-self " :class="{ 'checked':checking==2 } " @click="getCurrentCheckList(2) "><i class="icon "></i><span class="label ">我的申请</span></el-button>
            <el-popover ref="sortpopover" placement="bottom" width="100">
                <div>
                    <div class="resource-sort ">
                        <a href="javascript:; " @click="sortType( 'create_time') " :class="{ 'sort':sort_name=='create_time' } ">发布日期</a>
                        <a href="javascript:; " @click="sortType( 'name') " :class="{ 'sort':sort_name=='name' } ">文件名称</a>
                        <a href="javascript:; " @click="sortType( 'size') " :class="{ 'sort':sort_name=='size' } ">文件来源</a>
                        <a href="javascript:; " @click="sortType( 'check_status') " :class="{ 'sort':sort_name=='check_status' } ">审核状态</a>
                    </div>
                </div>
            </el-popover>
            <el-button v-popover:sortpopover class="file-filter">文件筛选设置</el-button>
        </div>
        <div class="el-row pc-table exmine-table ">
            <div class="el-row pc-tb_header ">
                <el-col :span="8 " class="pc-tb_td ">
                    文件名称
                </el-col>
                <el-col :span="3 " class="pc-tb_td ">
                    文件大小
                </el-col>
                <el-col :span="3 " class="pc-tb_td ">
                    文件来源
                </el-col>
                <el-col :span="6 " class="pc-tb_td ">
                    发布日期
                </el-col>
                <el-col :span="4 " class="pc-tb_td ">
                    审批状态
                </el-col>
            </div>
            <div class="el-row pc-tbody"  v-loading="loading" element-loading-text="拼命加载中" customClass="myloading">
                <div class="el-row pc-tb_tr " v-for="item in checkList " :key="item.check_id ">
                    <el-col :span="8 " class="pc-tb_td ">
                        <div class="pc-icon ">
                            <img src="../../../../assets/img/folder.png" />
                        </div>
                        <div class="pc-name ">
                            <a href="javascript:; " :title="item.name ">{{item.name}}</a>
                        </div>
                        <div class="examine-result ">
                            <a href="javascipt:;" @click="check_detail_(item.name,item.size,item.create_time,item.resource_type,item.creator,item.check_status,item.reason)">详情</a>
                            <a href="javascipt:; " v-if="item.resource_type==9" @click="check_series_(item.check_id,item.name)">剧集</a>
                        </div>
                    </el-col>
                    <el-col :span="3 " class="pc-tb_td ">
                        {{item.size | bytesToSize}}
                    </el-col>
                    <el-col :span="3 " class="pc-tb_td ">
                        {{item.creator}}
                    </el-col>
                    <el-col :span="6 " class="pc-tb_td ">
                        {{item.create_time}}
                    </el-col>
                    <el-col :span="4 " class="pc-tb_td " v-if="checking==0 ">
                        <!--文件审核-->
                        <a href="javascript:; " class="toExamine examine " v-if="item.check_status==0 || item.check_status==- 1 " @click="examine_(item.check_id,item.resource_id) ">待审核</a>
                    </el-col>
                    <el-col :span="4 " class="pc-tb_td " v-if="checking==1 || checking==2 ">
                        <a href="javascript:; " class=" examine " v-if="item.check_status==0 ">待审核</a>
                        <a href="javascript:; " class="toExamine examine " v-if="item.check_status==- 1 "  @click="check_series_(item.check_id,item.name)">剧集</a>
                        <a href="javascript:; " class=" examine " v-if="item.check_status==1 ">已通过</a>
                        <a href="javascript:; " class=" examine " v-if="item.check_status==2 ">未通过</a>
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
                checking: 0, //选中的按钮
                sortArr: {},
                status: '0',
                checkList: [], //获取的审核列表
                sort_type: "up",
                sort_name: "create_time",
                examinedialog: false,
                reason: '',
                check_id: '',
                check_detail: false,
                check_series: false,
                checkObj: {
                    name: '',
                    size: '',
                    time: '',
                    type: '',
                    source: '',
                    status: '',
                    reason: ''
                },
                getSeries: [],
                series_title:'',
                loading:false
            }
        },
        methods: {
            sortType(name) {
                this.sort_name = name;
                if (this.sort_type == 'up') {
                    this.sort_type = 'down'
                } else {
                    this.sort_type = 'up'
                }
                this.getCurrentCheckList(this.checking);
            },
            getCheckList() {
                var vm = this;
                var params = {
                    successFn(res) {
                        console.log(res)
                        if (res.rescode == 200) {
                            vm.checkList = res.content;
                        }
                    }
                }
                this.$store.dispatch("getCheckList", params);
            },
            query_historycheck() {
                var vm = this;
                var params = {
                    successFn(res) {
                        console.log(res)
                        if (res.rescode == 200) {
                            vm.checkList = res.content;
                        }
                    }
                }
                this.$store.dispatch("query_historycheck", params);
            },
            query_mycheck() {
                var vm = this;
                var params = {
                    successFn(res) {
                        console.log(res)
                        if (res.rescode == 200) {
                            vm.checkList = res.content;
                        }
                    }
                }
                this.$store.dispatch("query_mycheck", params);
            },
            getCurrentCheckList(index) {
                this.loading = false;
                this.checking = index;
                var current;
                if (index == 0) {
                    current = 'getCheckList'; //文件审核
                }
                if (index == 1) {
                    current = 'query_historycheck'; //历史审核
                }
                if (index == 2) {
                    current = 'query_mycheck'; //我的申请
                }
                var vm = this;
                var params = {
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.checkList = res.content;
                            vm.loading = false;
                        }
                    }
                }
                var info = {};
                if ((vm.sort_name != "") && (vm.sort_type != "")) {
                    info.sort_data = JSON.stringify([{
                        'sort_name': vm.sort_name,
                        'sort_type': vm.sort_type,
                    }]);
                }
                params.data = info;
                this.$store.dispatch(current, params);
            },
            toExamine() {
                var vm = this;
                if (!vm.reason) {
                    vm.$notify({
                        title: '提示',
                        message: '请填写审核理由',
                        type: 'info'
                    });
                    return
                }
                var params = {
                    data: {
                        'data': JSON.stringify({
                            'check_status': vm.status,
                            'reason': vm.reason,
                            'check_id': vm.check_id,
                        }),
                    },
                    successFn(res) {
                        console.log(res)
                        if (res.rescode == 200) {
                            vm.$notify({
                                title: '成功',
                                message: '提交审核成功',
                                type: 'success'
                            });
                            vm.getCurrentCheckList(vm.checking)
                            vm.examinedialog = false;
                            vm.reason = "";
                        }
                    }
                };
                this.$store.dispatch('toExamine', params);
            },
            examine_(cid) {
                this.status = 0;
                this.check_id = cid;
                this.examinedialog = true;
            },
            check_detail_(name, size, time, resource_type, source_summary, check_status, reason) { //查看详情
                this.checkObj = {
                    name: name,
                    size: size,
                    time: time,
                    type: resource_type,
                    source: source_summary,
                    status: check_status,
                    reason: reason
                };
                this.check_detail = true;
            },
            check_series_(cid,name) {
                this.check_series = true;
                
                var index = this.checking;
                var current;
                if (index == 0) {
                    current = 'getCheckList'; //文件审核
                }
                if (index == 1) {
                    current = 'query_historycheck'; //历史审核
                }
                if (index == 2) {
                    current = 'query_mycheck'; //我的申请
                }
                var vm = this;
                var params = {
                    data: {
                        'series_id': cid
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.getSeries = res.content;
                            vm.series_title = name+"--共"+res.content.length+'集';
                        }
                    }
                }
                this.$store.dispatch(current, params);
            },
            formatter(row, column){
                var val = row.check_status;
                var status;
                if (val == 0) {
                    status = '待审核';
                }
                if (val == 1) {
                    status = '已通过';
                }
                if (val == 2) {
                    status = '未通过';
                }
                return status
            }
           
        },
        created() {
            this.checking = 0;
            this.getCurrentCheckList(0)
        },
        filters: {
            bytesToSize(bytes) {
                if (bytes === 0 || bytes === null) return '0 B';
                var k = 1024;
                var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
                //后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            },
            statusFilter(val) {
                var status;
                if (val == 0) {
                    status = '待审核';
                }
                if (val == 1) {
                    status = '已通过';
                }
                if (val == 2) {
                    status = '未通过';
                }
                return status
            },
            typeFilter(typeId) {
                var type;
                if (typeId == -1) {
                    type = '其他'
                }
                if (typeId == 1) {
                    type = '视频'
                }
                if (typeId == 2) {
                    type = '直播'
                }
                if (typeId == 3) {
                    type = 'pdf'
                }
                if (typeId == 4) {
                    type = '图片'
                }
                if (typeId == 5) {
                    type = 'ppt'
                }
                if (typeId == 6) {
                    type = 'APK'
                }
                if (typeId == 7) {
                    type = '网页'
                }
                if (typeId == 8) {
                    type = '音频'
                }
                if (typeId == 9) {
                    type = '电视剧集合'
                }
                if (typeId == 10) {
                    type = '单集电视剧'
                }
                if (typeId == 11) {
                    type = '资源分类'
                }
                return type
            }
        },
    }
</script>

<style lang="scss" scoped>
    .sortCheck {
        display: flex; // justify-content: center;
        .label {
            font-size: 14px;
        }
    }
    .sortCheck+.sortCheck {
        margin-top: 10px;
    }
    .pc-checkbox_outer {
        border: 1px solid #d8dce6;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        &.is-checked {
            .pc-checkbox_inner {
                border-radius: 100%;
                width: 8px;
                height: 8px;
                background-color: #50acdb;
                display: inline-block;
            }
        }
        input[type="checkbox"] {
            opacity: 0;
            outline: none;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0
        }
    }
</style>
