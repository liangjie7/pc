<template>
    <div class="el-row r-table">
        <div class="r-tb_header el-row r-row">
            <el-col :span="8" class="r-td">
                <label class="pc-checkbox">
                                            <div class="pc-checkbox_input pc-checkbox_input_all">
                                                <span class="pc-checkbox_inner">
                                                        <input type="checkbox" @click="checkAll($event)"/>
                                                </span>
                                            </div>
                                            <span class="pc-checkbox_label">全选</span>
                                        </label>
            </el-col>
            <el-col :span="4" class="r_td">
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
            <div class=" el-row r-row tb-list" v-for="(item,key) in rlist" :type_id="item.type_id" :count="item.series_count" :material_id="item.material_id" :key="item.material_id" @mouseleave="morehidden(key)">
                <el-col :span="8" class="r_td">
                    <label class="pc-checkbox">
                                                                        <div :class="classObject" :id="item.type_id" >
                                                                            <span class="pc-checkbox_inner" >
                                                                                <input type="checkbox" @click="checked($event,item.material_id)" checked="false" />
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
                        <a id="download" href="javascript:;"></a>
                        <img src="../../../../assets/img/download_.png" title="下载" @click="downloadFile(item.name,item.path)" v-if="(item.type_id !=9)&&(item.type_id !=11)" />
                        <img src="../../../../assets/img/delete.png" title="删除" @click="delelteConfirm(item.material_id)" />
                        <p class="more-tool" @click="showMore($event)">
                            <img src="../../../../assets/img/more-gray.png" />
                            <ul class="more-wrapper">
                                <li><a href="javascript:;" title="重命名" @click="rename(item.material_id,parentMaterialid)">重命名</a></li>
                                <li><a href="javascript:;" title="移动" @click="getCatalogList">移动</a></li>
                                <!-- <li><a href="javascript:;">优先</a></li> -->
                            </ul>
                        </p>
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
        <el-dialog title="移动" :visible.sync="catalog_show" class="examine-check_dialog" size="small" custom-class="tree_dialog">
            <!-- <el-tree :data="catalogList" show-checkbox node-key="id" :props="defaultProps" accordion>
                        </el-tree> -->
            <ul class="catalog-tree_menu treeview ">
                <li>
                    <div class="treeview-node checked" @click.stop.prevent="open($event)"><em class="b-in-blk plus icon-operate"></em><em class="treeview-ic"></em><span>全部文件</span></div>
                    <tree v-if="catalogList.length" :list="catalogList"></tree>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
    import tree from './dialogList.vue'
    export default {
        props: {
            rlist: {
                type: Array,
                default () {
                    return []
                },
            },
            parentMaterialid: {
                type: Number
            }
        },
        data() {
            return {
                delete_id: [], //删除
                check_id: [], //勾选
                classObject: {
                    'is_checked': false,
                    'pc-checkbox_input': true
                },
                moreVisible: false,
                catalog_show: false,
                catalogList: [],
                defaultProps: {
                    children: 'child_class',
                    label: 'class_name',
                }
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
                            vm.$emit("reload")
                        } else {
                            vm.$message({
                                type: '提示',
                                message: '删除失败!'
                            });
                        }
                    }
                }
                this.$store.dispatch("delete", params)
            },
            checked(ev, mid, count) {
                var index = this.check_id.indexOf(mid);
                if ($(ev.target).parents(".pc-checkbox_input").hasClass("is_checked")) {
                    $(ev.target).parents(".pc-checkbox_input").removeClass("is_checked");
                    $(".pc-checkbox_input_all").removeClass("is_checked");
                    this.check_id.splice(index, 1)
                } else {
                    $(ev.target).parents(".pc-checkbox_input").addClass("is_checked");
                    console.log(index)
                    if (index == -1) {
                        this.check_id.push(mid);
                    }
                    if ($(".r-tb_tbody .is_checked").length == this.rlist.length) {
                        $(".pc-checkbox_input_all").addClass("is_checked");
                    }
                }
                this.pushId();
            },
            checkAll(ev) {
                var vm = this;
                if ($(ev.target).parents(".pc-checkbox_input").hasClass("is_checked")) {
                    $(ev.target).parents(".pc-checkbox_input").removeClass("is_checked");
                    $(".pc-checkbox_input").each(function() {
                        $(".pc-checkbox_input").removeClass('is_checked');
                    })
                    vm.check_id = [];
                } else {
                    $(ev.target).parents(".pc-checkbox_input").addClass("is_checked");
                    $(".pc-checkbox_input").each(function() {
                        $(".pc-checkbox_input").addClass('is_checked');
                    });
                    $(".tb-list").each(function() {
                        vm.check_id.push($(this).attr("material_id"))
                    })
                }
                this.pushId();
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
                this.check_id = [];
                this.pushId();
            },
            //向父组件pushid
            pushId() {
                this.$emit('get_rid', this.check_id);
            },
            showMore(ev) {
                ev.currentTarget.children[1].style.visibility = 'visible';
            },
            morehidden(index) {
                var target = document.getElementsByClassName('more-wrapper')[index];
                target.style.visibility = 'hidden'
            },
            rename(mid, parentMaterialid) {
                var vm = this;
                this.$prompt('请输入新的名字', '重命名', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\S+$/,
                    inputErrorMessage: '请填入新名字'
                }).then(({
                    value
                }) => {
                    var params = {
                        data: {
                            'data': JSON.stringify({
                                'material_id': mid,
                                'name': value,
                                'category_id': parentMaterialid,
                                'label': ''
                            })
                        },
                        successFn(res) {
                            console.log(res)
                            if (res.rescode == 200) {
                                vm.$emit("reload");
                            }
                        }
                    }
                    this.$store.dispatch("rename", params)
                    console.log(value)
                }).catch(() => {});
            },
            downloadFile(fileName, url) {
                try {
                    var a = document.getElementById('download');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                } catch (e) {}
            },
            //加载移动的树
            getCatalogList() {
                var vm = this;
                var params = {
                    successFn(res) {
                        console.log(res)
                        if (res.rescode == 200) {
                            vm.catalog_show = true;
                            vm.catalogList = res.class_tree;
                        }
                    }
                }
                this.$store.dispatch('getCatalogList', params);
            },
            open(ev) {
                var target = $(ev.currentTarget);
                var that = target.parent('li');
                if (that.children(".treeview").length) {
                    if (that.children(".treeview-collapse").length) {
                        that.children(".treeview").each(function(i) {
                            $(this).removeClass("treeview-collapse");
                        })
                        target.children('.icon-operate').addClass("minus")
                    } else {
                        that.children(".treeview").each(function(i) {
                            $(this).addClass("treeview-collapse")
                        })
                        target.children('.icon-operate').removeClass("minus")
                    }
                }
            }
        },
        mounted() {},
        filters: {
            bytesToSize(bytes) {
                if (bytes === 0 || bytes === null) return '0 B';
                var k = 1024;
                var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
                //后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            }
        },
        components: {
            tree
        }
    }
</script>

<style>

</style>
