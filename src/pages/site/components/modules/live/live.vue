<template>
    <div id="live-content">
        <section id="cdnList">
            <div id="cdnShow">
                <p id="showTitle">中心CDN服务器</p>
                <!-- <div id="showContent">
                              <img src="../../../../assets/img/cdnShow.png" alt="" id="icon">
                              <ul>
                                  <li>型号</li>
                              </ul>
                          </div> -->
            </div>
            <ul class="list">
               
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                <li class="lis">
                    <span class="lis_name">cdn服务器</span>
                    <p class="lis_tool">
                        <span class="cdn-tools">删除</span>
                        <span class="cdn-tools">编辑</span>
                    </p>
                </li>
                 
            </ul>
            <div class="addCdn">
                    <img src="../../../../assets/img/addCdn.png" />新增
            </div>
        </section>
        <section id="cdnContent">
            <p class="cdnContent_title">当前CDN边缘节点</p>
            <el-table :data="tableData" style="width: 100%" class="nodeList">
                <el-table-column prop="date" label="节点名称">
                </el-table-column>
                <el-table-column prop="name" label="状态">
                </el-table-column>
                <el-table-column prop="address" label="IP">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                            <span class="cdn-tools">删除</span>
                            <span class="cdn-tools">编辑</span>
                    </template>
                    
                </el-table-column>
            </el-table>
            <div class="addNodeWrapper">
                <button id="addNode">
                    添加节点
                </button>
            </div>
        </section>
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
                }, {
                    date: '2016-05-03',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style>

</style>
