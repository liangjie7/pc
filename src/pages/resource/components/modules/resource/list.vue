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
                    <div class="r-icon" v-if="item.type_id == -1" title="其他">
                        <!-- //电视剧 -->
                        <img src="../../../../assets/img/other.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 1" title="视频">
                        <!-- //视频 -->
                        <img src="../../../../assets/img/video.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 2" title="直播">
                        <!-- //视频 -->
                        <img src="../../../../assets/img/live.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 3" title="pdf">
                        <!-- //pdf-->
                        <img src="../../../../assets/img/PDF.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 4" title="图片">
                        <!-- //图片 -->
                        <img src="../../../../assets/img/pic.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 5" title="ppt">
                        <!-- //图片 -->
                        <img src="../../../../assets/img/PPT.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 6" title="apk">
                        <!-- //apk -->
                        <img src="../../../../assets/img/APK.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 7" title="网页">
                        <!-- //网页 -->
                        <img src="../../../../assets/img/web.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 8" title="音频">
                        <!-- //音频 -->
                        <img src="../../../../assets/img/audio.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 9" title="电视剧">
                        <!-- //电视剧 -->
                        <img src="../../../../assets/img/series.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 10">
                        <!-- //单集电视剧 -->
                        <img src="../../../../assets/img/video.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id == 11" title="文件夹">
                        <!-- //目录 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-name">
                        <a href="javascript:;" :title="item.name" :type="item.type_id" @click="nextPage(item.type_id,item.material_id,item.material_id,item.name)">{{item.name}}</a>
                    </div>
                </el-col>
                <el-col :span="4" class="r_td">
                    <div class="r-td_tool">
                        <a id="download" href="javascript:;"></a>
                        <img src="../../../../assets/img/download_.png" title="下载" @click="downloadFile(item.name,item.path)" v-if="(item.type_id !=9)&&(item.type_id !=11)" />
                        <img src="../../../../assets/img/delete.png" title="删除" @click="delelteConfirm(item.material_id)"  v-if="authList.material_mange_delMaterial"/>
                        <p class="more-tool" @click="showMore($event)" v-if="authList.material_mange_updateMaterial">
                            <img src="../../../../assets/img/more-gray.png" />
                            <ul class="more-wrapper">
                                <li><a href="javascript:;" title="重命名" @click="rename(item.material_id,parentMaterialid,item.type_id)">重命名</a></li>
                                <li><a href="javascript:;" title="移动" @click="getCatalogList(item.material_id,item.type_id)">移动</a></li>
                                <!-- <li><a href="javascript:;">优先</a></li> -->
                            </ul>
                        </p>
                    </div>
                </el-col>
                <el-col :span="6" class="r_td">
                    <div class="r-size" v-if="item.type_id!=9 && item.type_id!=11">{{item.size | bytesToSize}}</div>
                    <div class="r-size" v-else>----</div>
                </el-col>
                <el-col :span="6" class="r_td">
                    <div class="r-date">{{item.updatetime}}</div>
                </el-col>
            </div>
        </div>
        <el-dialog title="移动" :visible.sync="catalog_show" class="examine-check_dialog" size="small" custom-class="tree_dialog">
            <ul class="catalog-tree_menu treeview ">
                <li>
                    <div class="treeview-node ">
                        <label class="pc-checkbox treeCheckbox" @click="checktree($event,-1,11)">
                            <div class="pc-checkbox_input" >
                                <span class="pc-checkbox_inner" >
                                </span>
                            </div>            
                        </label>
                        <em class="b-in-blk plus icon-operate" @click.stop.prevent="open($event)"></em><em class="treeview-ic catalog"></em><span>全部文件</span></div>
                    <tree v-if="catalogList.length" :list="catalogList" @changeId="getId"></tree>
                </li>
            </ul>
            <el-button type="primary" class="move-confirm" @click="moveConfirm()">移动</el-button>
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
            },
            parentTypeid: {
                type: Number
            },
            authList:{
                type:Object,
                default(){
                    return {}
                }
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
                },
                moveParams: {},
                category_id_new: '', //	新目录id
                category_type_new: '', //现在目录的类型
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
                if(target){
                    target.style.visibility = 'hidden'
                }
               
            },
            rename(mid, parentMaterialid, tid) {
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
                                'label': '',
                                'type_id': tid
                            })
                        },
                        successFn(res) {
                            if (res.rescode == 200) {
                                vm.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                vm.$emit("reload");
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: res.errInfo
                                });
                            }
                        }
                    }
                    this.$store.dispatch("rename", params)
                }).catch(() => {
                });
            },
            downloadFile(fileName, url) {
                var vm = this;
                try {
                    var a = document.getElementById('download');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                } catch (e) {
                    vm.$notify({
                        title: '提示',
                        message: '下载错误',
                        type: 'info'
                    });
                }
            },
            //加载移动的树
            getCatalogList(mid, tid) {
                var vm = this;
                vm.moveParams.material_id = mid;
                vm.moveParams.type_id = tid;
                var params = {
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.catalog_show = true;
                            vm.catalogList = res.class_tree;
                        }
                    }
                }
                this.$store.dispatch('getCatalogList', params);
            },
            checktree(event, class_id, type_id) {
                var that = $(event.currentTarget);
                if (that.find(".is_checked").length) {
                    that.children('.pc-checkbox_input').removeClass('is_checked');
                } else {
                    $(".treeCheckbox .is_checked").each(function(i) {
                        $(this).removeClass("is_checked");
                    })
                    that.children('.pc-checkbox_input').addClass('is_checked');
                    this.category_id_new = class_id;
                    this.category_type_new = type_id;
                }
            },
            open(ev) {
                var target = $(ev.currentTarget);
                var that = target.parents('li');
                if (that.children(".treeview").length) {
                    if (that.children(".treeview-collapse").length) {
                        that.children(".treeview").each(function(i) {
                            $(this).removeClass("treeview-collapse");
                        })
                        target.addClass("minus")
                    } else {
                        that.children(".treeview").each(function(i) {
                            $(this).addClass("treeview-collapse")
                        })
                        target.removeClass("minus")
                    }
                }
            },
            moveConfirm() {
                var vm = this;
                if (!this.category_id_new) {
                    vm.$notify({
                        title: '提示',
                        message: '请先勾选要移动到的目录',
                        type: 'info'
                    });
                }
                var params = {
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.catalog_show = false;
                            vm.$emit("reload");
                            vm.$notify({
                                title: '提示',
                                message: '移动成功',
                                type: 'info'
                            });
                        }
                        if (res.rescode == 706) {
                            vm.$notify({
                                title: '提示',
                                message: res.errInfo,
                                type: 'info'
                            });
                        }
                    }
                };
                var info = {
                    'category_id_new': vm.category_id_new,
                    'category_type_new': vm.category_type_new,
                    'category_type_old': vm.$props.parentTypeid,
                }
                var arr = [];
                arr.push(vm.moveParams);
                info.data = JSON.stringify(arr);
                params.data = info;
                this.$store.dispatch("moveResource", params);
            },
            getId(mid, tid) {
                this.category_id_new = mid;
                this.category_type_new = tid;
            },
             getAuth(arr) {
                
            },
        },
        mounted() {},
        computed: {
            auth() {
                return this.$store.state.auth
            },
        },
        watch: {
            $route(to, from) {
                this.delete_id = [];
            },
            auth(val) {
                this.getAuth(val); //权限
            },
        },
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
        },
       
        
    }
</script>

<style>

</style>
