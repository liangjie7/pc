<template>
    <div id="query-content">
        <el-dialog title="改造内容" :visible.sync="edudialogVisible" size="small">
            <el-table :data="process_list" style="width: 100%">
                <el-table-column prop="create_time" label="日期">
                </el-table-column>
                <el-table-column prop="assess" label="导员评价">
                    <template slot-scope="scope">
                        <div slot="reference" class="tooltipwrapper" :title="scope.row.assess">
                            {{ scope.row.assess }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="改造内容">
                <template slot-scope="scope">
              
                    <div slot="reference" class="tooltipwrapper" :title="scope.row.content">
                        {{ scope.row.content }}
                    </div>
                </template>
                     
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="edudialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="edudialogVisible = false">确 定</el-button>
              </span>
        </el-dialog>
        <div id="r-toolbar">
            <!-- <el-input v-model="name_search" placeholder="请输入查询姓名" icon="search" id="nameInput"></el-input> -->
            <!-- <el-input v-model="name_search" placeholder="请输入服刑编号" icon="search" id="identifierInput"></el-input> -->
            <!-- <el-select v-model="value" placeholder="请选择" id="prisonSelect">
                                                                <el-option label="全部" value="0">
                                                                </el-option>
                                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                                </el-option>
                                                            </el-select> -->
            <!-- <el-button type="primary" id="search-btn">开始查询</el-button> -->
            <el-select v-model="student_name" placeholder="请选择" id="prisonSelect" @change="getStudentInfo">
                <el-option v-for="item in studentArr" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
            </el-select>
        </div>
        <div class="personal-info">
            <div class="base-info">
                <p class="info-header">个人基本信息</p>
                <div class="info-show">
                    <img src="../../../../assets/img/personPic.png" alt="" class="persion-pic">
                    <ul class="info-detail">
                        <li>
                            <span class="info-title">姓名</span>
                            <span class="info-value">{{student_name}}</span>
                        </li>
                        <li>
                            <span class="info-title">编号</span>
                            <span class="info-value">{{student_code}}</span>
                        </li>
                        <li>
                            <span class="info-title">监区</span>
                            <span class="info-value">{{student_prison}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="edu-info">
                <div class="edu-detail">
                    <p class="current-learning">
                        <span class="edu-title">当前改造类型：</span>
                        <span class="current">{{current_process.process_name}}</span>
                    </p>
                    <p class="edu-content">
                        <span class="edu-title">改造教育内容：</span>
                        <ul class="edu-list">
                            <li v-for="(item,index) in contract_list" :key="index"><span>{{item.process_name}}</span></li>
                            <!-- <span><span>小学3年级语文</span></li>
                                        <li><span>小学3年级语文</span></li> -->
                            <!-- <li>小学3年级语文</li> -->
                        </ul>
                        <a href="javascript:;" class="checkDetail" v-if="contract_list.length>2" @click="edudialogVisible = true">查看详情</a>
                    </p>
                </div>
                <div class="reform-progress">
                    <p class="edu-title">改造进度</p>
                    <div class="progress-wraper">
                        <canvas id="canvas" width="130" height="130"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-experience">
            <p>重要个人经历</p>
            <el-table :data="process_list" style="width: 100%" id="experience-content">
                <el-table-column prop="create_time" label="日期"  empty-text="暂无">
                </el-table-column>
                <el-table-column prop="assess" label="导员评价"  empty-text="暂无">
                </el-table-column>
                <el-table-column prop="content" label="改造内容"  empty-text="暂无">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name_search: "", //搜索的名称
                studentArr: [{
                        id: "0",
                        name: "张三"
                    },
                    {
                        id: "1",
                        name: "张无忌"
                    },
                    {
                        id: "2",
                        name: "赵敏"
                    },
                    {
                        id: "3",
                        name: "周芷若"
                    },
                    {
                        id: "4",
                        name: "牧云笙"
                    },
                ],
                student_name: '张三',
                student_code: '',
                student_prison: "",
                current_process: {}, //当前的学习的
                process_list: [], //学习列表
                contract_list: [], //改造内容展示三条
                progress: 0,
                speed: 0,
                experienceList: [],
                edudialogVisible: false,
            }
        },
        methods: {
            drawRound(percent, a, b, r) {
                var percent = parseFloat(percent)
                var rad = Math.PI * 2 / 100;
                var canvas = document.getElementById("canvas");
                var context = canvas.getContext("2d");
                //圆
                context.clearRect(0, 0, 160, 160);
                context.strokeStyle = '#c7c7c7';
                context.arc(a, b, r - 1, 0, 2 * Math.PI, true);
                context.stroke();
                context.beginPath();
                context.moveTo(a, b);
                context.arc(a, b, r - 2, 0, Math.PI * 2, false);
                context.closePath();
                context.fillStyle = '#f7f7f7';
                context.fill();
                //圆
                // context.lineWidth = 15;
                // context.lineCap = "round";
                // var radius = r-2 - context.lineWidth;
                context.save();
                context.beginPath();
                context.moveTo(a, b);
                context.arc(a, b, r - 2 - 7, 0, Math.PI * 2, false);
                context.closePath();
                context.fillStyle = '#d9d9d9';
                context.fill();
                context.restore();
                //圆环
                context.save();
                var grad = context.createRadialGradient(a, b, r - 2 - 15, a, b, r - 2);
                grad.addColorStop(0, '#50acdb'); // 黄  
                // grad.addColorStop(0.1, '#50acdb'); // 蓝  
                grad.addColorStop(1, '#d9ebee'); //青  
                context.strokeStyle = grad;
                context.lineWidth = 17;
                context.lineCap = "round";
                var radius = r - 2 - context.lineWidth;
                context.beginPath();
                context.arc(a, b, radius, -Math.PI / 2, -Math.PI / 2 + percent * rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)  
                context.stroke();
                context.closePath();
                context.restore();
                //圆
                context.save();
                context.beginPath();
                context.moveTo(a, b);
                context.arc(a, b, radius - 7, 0, Math.PI * 2, false);
                context.closePath();
                context.fillStyle = '#f7f7f7';
                context.fill();
                context.restore();
                context.save(); //save和restore可以保证样式属性只运用于该段canvas元素  
                context.fillStyle = "#515151";
                var font_size = 20;
                context.font = font_size + "px Helvetica";
                var text_width = context.measureText(percent + "%").width;
                context.fillText(percent + "%", r - 2 - text_width / 2, r - 2 + font_size / 2);
                context.restore();
            },
            getStudentInfo() {
                var vm = this;
                var params = {
                    data: {
                        'student_name': vm.student_name
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            var progress_bar = 0;
                            var data = res.student;
                            vm.student_code = data.student_code;
                            vm.student_prison = data.student_prison;
                            vm.current_process = data.current_process;
                            vm.process_list = data.process_list;
                            vm.contract_list = vm.process_list.slice(0, 3);
                            vm.experienceList = [];
                            // for(let i=0;i<vm.process_list.length;i++){
                            //     if(vm.process_list[i].status){
                            //         vm.experienceList.push(vm.process_list[i]);
                            //     }
                            // }
                            vm.progress = data.progress_bar;
                            // window.requestAnimationFrame(drawFrame);  
                            vm.drawRound(vm.progress, 65, 65, 65);
                            progress_bar = parseFloat(data.progress_bar)
                            var speed = 0;
                            if (!window.requestAnimationFrame) {
                                window.requestAnimationFrame = (
                                    window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.msRquestAniamtionFrame ||
                                    window.oRequestAnimationFrame
                                )
                            }
                            (function draw() {
                                window.requestAnimationFrame(draw);
                                vm.drawRound(speed, 65, 65, 65);
                                if (speed >= parseFloat(data.progress_bar)) {
                                    return
                                } else {
                                    speed += 1;
                                };
                            }())
                        }
                    }
                }
                this.$store.dispatch('getStudentInfo', params);
            },
        },
        mounted() {
            this.getStudentInfo();
        }
    }
</script>

<style>

</style>
