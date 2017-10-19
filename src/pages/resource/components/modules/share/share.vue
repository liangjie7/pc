<template>
    <div class="share-content_wrapper">
        <div class="el-row content-header">
             <el-select v-model="prison_select" class="prison_select" clearable filterable >
                <el-option v-for="(item,key) in subsiteList" :label="item.subsystem_name" :value="item.subsystem_id" :key="item.subsystem_mac">
                </el-option>
            </el-select>
            <div class="time-wrapper">
                <el-date-picker class="time-picker" format="yyyy-MM-dd" align="center" v-model="time" type="daterange" :picker-options="pickerOptions2" placeholder="选择时间范围">
                </el-date-picker>
            </div>
            <div class="search-wrapper">
                <el-input class="search-text" placeholder="请输入选择内容" icon="search" v-model="search" >
                </el-input>
            </div>
            <div class="sort-wrapper">
                  <el-popover ref="sort-popover" placement="bottom" width="100" v-model="sortVisible" class="sort-popover">
                    <div class="resource-sort">
                        <a href="javascript:;" @click="sortType('updatetime')" :class="{'sort':sort_name == 'updatetime'}">修改日期</a>
                        <a href="javascript:;" @click="sortType('subsystem_name')" :class="{'sort':sort_name == 'subsystem_name'}">文件名称</a>
                        <a href="javascript:;" @click="sortType('size')" :class="{'sort':sort_name == 'size'}">文件大小</a>
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
                <el-col :span="5" class="share-tb_td">
                    上传来源
                </el-col>
                <el-col :span="5" class="share-tb_td">
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
                <div class="el-row share-tb_tr">
                    <el-col :span="5" class="share-tb_td">
                        <div class="share-icon">
                            <img src="../../../../assets/img/folder.png" />
                        </div>
                        <div class="share-name">
                            <a href="javascript:;" title="监狱资源">监狱资源</a>
                        </div>
                    </el-col>
                    <el-col :span="5" class="share-tb_td">
                        一监狱
                    </el-col>
                    <el-col :span="5" class="share-tb_td">
                        2017-9-29 15:26:50
                    </el-col>
                    <el-col :span="4" class="share-tb_td">
                        未完成
                    </el-col>
                    <el-col :span="5" class="share-tb_td">
                        100%
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
                sort_name: "",
                sort_type:"",
                prison_select: "",
                sort_select: "",
                subsiteList:[],//子站点列表
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
                        console.log(res)
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
                console.log(this.sort_type)
                this.getIssuedList()
            },
              getQueryList() {
                var vm = this;
                var data = {};
                if (this.time) {
                    data.start_time = this.time[0].getFullYear() + '-' + (this.time[0].getMonth() + 1) + '-' + this.time[0].getDate();
                    data.end_time = this.time[0].getFullYear() + '-' + (this.time[0].getMonth() + 1) + '-' + this.time[0].getDate();
                }
                if (vm.search) {
                    data.search_data = {
                        'subsystem_name': vm.search,
                        'subsystem_mac': vm.search
                    };
                }
                if((vm.sort_name != "") && (vm.sort_type != "")){
                    data.sort_data = JSON.stringify([{'sort_name':vm.sort_name,'sort_type':vm.sort_type,}])
                }
                if (vm.prison_select) {
                    data.subsystem_id = vm.prison_select;
                }
                var params = {
                    data: data,
                    successFn(res) {
                        console.log(res);
                        if (res.rescode == 200) {
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
        },
        created(){
            this.getSite()
        }
    }
</script>

<style>

</style>
