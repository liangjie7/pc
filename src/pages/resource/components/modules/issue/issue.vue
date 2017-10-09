<template>
    <div class="share-content_wrapper">
        <div class="el-row content-header">
            <el-select v-model="prison_select" class="prison_select">
                <el-option label="全部" value="">
                </el-option>
            </el-select>
            <div class="time-wrapper">
                <el-date-picker class="time-picker" format="yyyy-MM-dd" v-model="time" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right">
                </el-date-picker>
            </div>
            <div class="search-wrapper">
                <el-input class="search-text" placeholder="请输入选择内容" icon="search" v-model="search" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="sort-wrapper">
                <el-select v-model="sort_select" class="sort_select">
                    <el-option label="无排序" value="">
                    </el-option>
                </el-select>
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
                <el-col :span="6" class="share-tb_td">
                    下载次数
                </el-col>
               
            </div>
            <div class="share-tb_tbody el-row">
                <div class="el-row share-tb_tr">
                    <el-col :span="6" class="share-tb_td">
                        <div class="share-icon">
                            <img src="../../../assets/img/folder.png" />
                        </div>
                        <div class="share-name">
                            <a href="javascript:;" title="监狱资源">监狱资源</a>
                        </div>
                    </el-col>
                    <el-col :span="6" class="share-tb_td">
                        一监狱
                    </el-col>
                    <el-col :span="6" class="share-tb_td">
                        2017-9-29 15:26:50
                    </el-col>
                    <el-col :span="6" class="share-tb_td">
                        250
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
                value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                time: '',
                search: ""
            }
        },
        methods: {
            handleIconClick(ev) {
                console.log(ev);
            }
        }
    }
</script>

<style>

</style>
