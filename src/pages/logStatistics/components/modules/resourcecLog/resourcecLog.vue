<template>
    <div id="log-content">
        <div class="filtersGroup">
            <span class="filter-tool">操作IP<input   class="filter-input" type="text" placeholder="输入查询IP"></input> <p class="right-line"></p></span>
            <span class="filter-tool">操作人<input  class="filter-input" placeholder="输入操作人性别"></input><p class="right-line"></p></span>
            <span class="filter-tool">操作行为<input  class="filter-input" placeholder="输入操作行为"></input><p class="right-line"></p></span>
            <span class="filter-tool">操作内容<input  class="filter-input" placeholder="输操作内容"></input></span>
            
        </div>
        <div class="filtersGroup">
            <span class="filter-tool">时间范围
                <el-date-picker v-model="value4" type="datetimerange" :picker-options="pickerOptions2" format="yyyy-MM-dd hh:mm" placeholder="选择时间范围" align="right" class="filter-time" >
                </el-date-picker>
            </span>
            <button >开始查询</button>
            <button>导出日志</button>
        </div>
        <!-- <span>操作人<el-input  placeholder="请输入操作人性别"></el-input></span>
                <span>操作人<el-input  placeholder="请输入操作人性别"></el-input></span> -->
        <el-table :data="tableData" style="width: 100%" id="logList" >
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                value4: "",
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
            }
        }
    }
</script>

<style>

</style>
