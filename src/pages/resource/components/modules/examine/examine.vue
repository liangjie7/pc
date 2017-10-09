<template>
    <div class="examine-content">
        <div class="examine-filter-group">
            <el-button class="icon-btn examine-filter file-examine" :class="{'checked':checking == 0}" @click="chooseFilter(0)"><i class="icon"></i><span class="label">文件审核</span></el-button>
            <el-button class="icon-btn examine-filter examine-record" :class="{'checked':checking == 1}" @click="chooseFilter(1)"><i class="icon"></i><span class="label">历史审批</span></el-button>
            <el-button class="icon-btn examine-filter apply-self" :class="{'checked':checking == 2}" @click="chooseFilter(2)"><i class="icon"></i><span class="label">我的申请</span></el-button>
            <el-popover ref="sort-popover" placement="bottom" width="100">
                <div>
                    <label class="sortCheck" @click="choseSorttype('timesort')">
                            <span class="pc-checkbox_outer" :class="{'is-checked':sortArr.timesort==1}" >
                                <span class="pc-checkbox_inner"></span>
                            </span>
                            <span class="label">按时间排序</span>
                    </label>
                    <label class="sortCheck"  @click="choseSorttype('filesort')">
                            <span class="pc-checkbox_outer" :class="{'is-checked':sortArr.filesort==1}">
                                <span class="pc-checkbox_inner"></span>
                            </span>
                            <span class="label">按文件排序</span>
                    </label>
                    <!-- <label class="sortCheck">
                            <span class="pc-checkbox_outer " :class="{'is-checked':sortArr.filesort==1}">
                                <span class="pc-checkbox_inner"></span>
                            </span>
                            <span class="label">按排序</span>
                    </label> -->
                    <label class="sortCheck"  @click="choseSorttype('prisonsort')">
                            <span class="pc-checkbox_outer " :class="{'is-checked':sortArr.prisonsort==1}">
                                <span class="pc-checkbox_inner"></span>
                            </span>
                            <span class="label">按监狱排序</span>
                    </label>
                   
                </div>
                <!-- <el-radio label="1" class="sort-checkbox" @change="timesort" v-model="timesort">按文件排序</el-radio> -->
                <!-- <el-radio label="2" class="sort-checkbox">按文件排序</el-radio>
                    <el-radio label="3" class="sort-checkbox">按人员排序</el-radio>
                    <el-radio label="4" class="sort-checkbox">按监狱排序</el-radio> -->
            </el-popover>
            <el-button v-popover:sort-popover class="file-filter">文件筛选设置</el-button>
        </div>
        <div class="el-row pc-table exmine-table">
            <div class="el-row  pc-tb_header">
                <el-col :span="8" class="pc-tb_td">
                    文件名称
                </el-col>
                <el-col :span="6" class="pc-tb_td">
                    文件来源
                </el-col>
                <el-col :span="6" class="pc-tb_td">
                    发布日期
                </el-col>
                <el-col :span="4" class="pc-tb_td">
                    审批状态
                </el-col>
            </div>
            <div class="el-row  pc-tbody">
                <div class="el-row pc-tb_tr">
                    <el-col :span="8" class="pc-tb_td">
                        <div class="pc-icon">
                            <img src="../../../assets/img/folder.png" />
                        </div>
                        <div class="pc-name">
                            <a href="javascript:;" title="监狱资源">监狱资源</a>
                        </div>
                    </el-col>
                    <el-col :span="6" class="pc-tb_td">
                        一监狱
                    </el-col>
                    <el-col :span="6" class="pc-tb_td">
                        2017-9-29 15:26:50
                    </el-col>
                    <el-col :span="4" class="pc-tb_td">
                        <a href="javascript:;" class="toExamine examine">未审核</a>
                    </el-col>
                </div>
                <div class="el-row pc-tb_tr">
                    <el-col :span="8" class="pc-tb_td">
                        <div class="pc-icon">
                            <img src="../../../assets/img/folder.png" />
                        </div>
                        <div class="pc-name">
                            <a href="javascript:;" title="监狱资源">监狱资源</a>
                        </div>
                    </el-col>
                    <el-col :span="6" class="pc-tb_td">
                        一监狱
                    </el-col>
                    <el-col :span="6" class="pc-tb_td">
                        2017-9-29 15:26:50
                    </el-col>
                    <el-col :span="4" class="pc-tb_td">
                        <a href="javascript:;" class="toExamine unpass">未通过</a>
                    </el-col>
                </div>
                <div class="el-row pc-tb_tr">
                    <el-col :span="8" class="pc-tb_td">
                        <div class="pc-icon">
                            <img src="../../../assets/img/folder.png" />
                        </div>
                        <div class="pc-name">
                            <a href="javascript:;" title="监狱资源">监狱资源</a>
                        </div>
                    </el-col>
                    <el-col :span="6" class="pc-tb_td">
                        一监狱
                    </el-col>
                    <el-col :span="6" class="pc-tb_td">
                        2017-9-29 15:26:50
                    </el-col>
                    <el-col :span="4" class="pc-tb_td">
                        <a href="javascript:;" class="toExamine passed">已通过</a>
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
                checking: 0, //选中的按钮
                sortArr: {
                    
                },
                radio: '1'
            }
        },
        methods: {
            chooseFilter(index) {
                this.checking = index;
            },
            timesort() {
                if (sortArr.timesort == 1) {
                    delete sortArr.timesort
                }
            },
            choseSorttype(type){
                console.log(type)
                 console.log(this.sortArr[type])
                if(this.sortArr[type]){
                    this.sortArr[type] = "";
                    console.log(2)
                }else{
                    console.log(1)
                    //  this.sortArr[type] = "1";
                     this.$set(this.sortArr,type,'1')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sortCheck{
        display: flex;
        
        // justify-content: center;
        .label{
            font-size: 14px;
        }
    }
    .sortCheck+.sortCheck{
        margin-top:10px;
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
        margin-right:10px;
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
