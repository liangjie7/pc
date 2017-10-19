<template>
    <div class="el-row r-table">
        <div class="r-tb_header el-row r-row">
            <el-col :span="8" class="r-td">
                <label class="pc-checkbox" >
                        <div class="pc-checkbox_input pc-checkbox_input_all">
                            <span class="pc-checkbox_inner">
                                    <input type="checkbox" @click="checkAll($event)"/>
                            </span>
                        </div>
                        <span class="pc-checkbox_label">全选</span>
                    </label>
            </el-col>
            <el-col :span="4" class="r_td" >
                <div class="r-td_tool" style="visibility:hidden">
                    <img src="../../../../assets/img/download_.png" />
                    <img src="../../../../assets/img/delete.png" @click="delelteConfirm(item.material_id)" />
                    <img src="../../../../assets/img/more-gray.png" />
                </div>
            </el-col>
            <el-col :span="6" class="r-td">
                文件大小
            </el-col>
            <el-col :span="6" class="r-td">
                修改日期
            </el-col>
        </div>
        
        <div class="r-tb_tbody el-row">
            <div class=" el-row r-row" v-for="(item,key) in rlist" :type_id="item.type_id" :material_id="item.material_id" :key="item.material_id">
                <el-col :span="8" class="r_td">
                    <label class="pc-checkbox"  >
                        <div :class="classObject" :id="item.type_id" >
                            <span class="pc-checkbox_inner" >
                                <input type="checkbox" @click="checked($event)" checked="false" />
                            </span>
                        </div>            
                    </label>
                    <div class="r-icon" v-if="item.type_id ==9">
                        <!-- //电视剧 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==4">
                        <!-- //图片 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==3">
                        <!-- //电视剧 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==8">
                        <!-- //音频 -->
                        <img src="../../../../assets/img/video.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==1">
                        <!-- //电视剧 -->
                        <img src="../../../../assets/img/video.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==5">
                        <!-- //图片 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==6">
                        <!-- //apk -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==7">
                        <!-- //网页 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==10">
                        <!-- //单集电视剧 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==11">
                        <!-- //目录 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-name">
                        <a href="javascript:;" title="item.name" @click="nextPage(item.type_id,item.material_id,item.material_id,item.name)">{{item.name}}</a>
                    </div>
                </el-col>
                <el-col :span="4" class="r_td">
                    <div class="r-td_tool">
                        <img src="../../../../assets/img/download_.png" />
                        <img src="../../../../assets/img/delete.png" @click="delelteConfirm(item.material_id)" />
                        <img src="../../../../assets/img/more-gray.png" />
                    </div>
                </el-col>
                <el-col :span="6" class="r_td">
                    <div class="r-size" v-if="item.type_id!=9 && item.type_id!=11">{{item.size | bytesToSize}}</div>
                    <div class="r-size" v-else>---</div>
                </el-col>
                <el-col :span="6" class="r_td">
                    <div class="r-date">{{item.updatetime}}</div>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            rlist: {
                type: Array,
                default () {
                    return []
                },
            }
        },
        data() {
            return {
                delete_id: [],
                classObject: {
                    'is_checked': false,
                    'pc-checkbox_input': true
                },
                
            }
        },
        methods: {
            delelteConfirm(material_id) {
                this.delete_id = material_id;
                this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('成功')
                    this.delete();
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                this.delete_id = [];
                this.delete_id.push(material_id);
            },
            delete() {
                var vm = this;
                var params = {
                    data: {
                        data: {
                            'material_ids': vm.delete_id
                        },
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    }
                }
                this.$store.dispatch("delete", params)
            },
            checked(ev) {
                if ($(ev.target).parents(".pc-checkbox_input").hasClass("is_checked")) {
                    $(ev.target).parents(".pc-checkbox_input").removeClass("is_checked");
                    $(".pc-checkbox_input_all").removeClass("is_checked");
                } else {
                    $(ev.target).parents(".pc-checkbox_input").addClass("is_checked");
                    if ($(".r-tb_tbody .is_checked").length == this.rlist.length) {
                        $(".pc-checkbox_input_all").addClass("is_checked");
                    }
                }
            },
            checkAll(ev) {
                if ($(ev.target).parents(".pc-checkbox_input").hasClass("is_checked")) {
                    $(ev.target).parents(".pc-checkbox_input").removeClass("is_checked");
                    $(".pc-checkbox_input").each(function() {
                        $(".pc-checkbox_input").removeClass('is_checked');
                    })
                } else {
                    $(ev.target).parents(".pc-checkbox_input").addClass("is_checked");
                    $(".pc-checkbox_input").each(function() {
                        $(".pc-checkbox_input").addClass('is_checked');
                    })
                }
            },
            nextPage(tid, mid, cid, name) { // 页面跳
                if (tid == 11 || tid == 9) {
                    var queryArr = this.$route.query.path;
                    var arr = [];
                    if (this.$route.query.path && queryArr != []) {
                        arr = JSON.parse(queryArr)
                    }
                    arr.push({
                        'tid': tid,
                        'mid': mid,
                        'cid': cid,
                        'name': name
                    });
                    this.$router.push({
                        path: this.$route.name,
                        query: {
                            path: JSON.stringify(arr)
                        }
                    });
                }
            }
        },
        mounted() {},
        filters: {
            bytesToSize(bytes) {
                if (bytes === 0) return '0 B';
                var k = 1024;
                var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
                //后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            }
        },
    }
</script>

<style>

</style>
