<template>
    <div class="r-table">
        <div class="grid-toolbar el-row">
            <button class="gird-tool checkedAll " @click="checkAll">全选</button>
            <button class="gird-tool" v-if="onlyChoice" @click="downloadFile">下载<a id="download" href="javascript:;"></a></button>
            <button class="gird-tool" @click="delelteConfirm">删除</button>
            <button class="gird-tool" v-if="onlyChoice" @click="rename">重命名</button>
            <button class="gird-tool" @click="getCatalogList">移动到</button>
        </div>
        <div class="grid-content">
            <!-- is_checked -->
            <div class="grid-block" v-for="(item,key) in rlist" :key="item.material_id" :mid="item.material_id" :tid="item.type_id" :count="item.series_count" :url="item.path" :name="item.name">
                <div class="grid-radio">
                    <label class="pc-checkbox_round">
                                    <div class="pc-checkbox_input">
                                        <span class="pc-checkbox_inner">
                                            <input type="checkbox" @click.stop.prevent="checked($event,item.material_id,item.type_id)"/>
                                        </span>
                                    </div>
                                    
                                </label>
                </div>
                 <div class="grid-icon" v-if="item.type_id == -1" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/other_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 1" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/video_large.png" alt="">
                </div>
                 <div class="grid-icon" v-if="item.type_id == 2" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/live_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 3" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/PDF_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 4" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/picture_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 5" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/ppt_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 6" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/APK_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 7" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/web_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 8" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/music_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 9" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/folder_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 10" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/video_large.png" alt="">
                </div>
                <div class="grid-icon" v-if="item.type_id == 11" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/class_large.png" alt="">
                </div>
                <div class="grid-name" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <a href="javascript:;" :title="item.name">{{item.name}}</a>
                </div>
                <div></div>
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
            <el-button type="primary" class="move-confirm" @click="moveConfirm">移动</el-button>
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
                }
            },
            checkArr: { //勾选的目录或者资源的id
                type: Array,
                default () {
                    return []
                }
            },
            parentMaterialid: { //父级的material_id
                type: Number
            },
            parentTypeid: {
                type: Number
            }
        },
        data() {
            return {
                check_id: [],
                rename_typeid:"",//重命名使用的type_id
                onlyChoice: true, //只选择了一个
                name: '', //重命名
                category_id_new: '', //	新目录id
                category_type_new: '', //现在目录的类型
                catalog_show: false,
                catalogList: [],
                moveParams: [], //移动的资源的mid和typeid
            }
        },
        methods: {
            checked(ev, id, typeId) {
                var vm = this;
                window.event ? window.event.cancelBubble = true : ev.stopPropagation();
                window.event ? window.event.returnValue = false : ev.preventDefault();
                var index = this.check_id.indexOf(id);
                if ($(ev.target).parents(".pc-checkbox_input").hasClass("is_checked")) {
                    $(ev.target).parents(".pc-checkbox_input").removeClass("is_checked");
                    $(".pc-checkbox_input_all").removeClass("is_checked");
                    $(ev.target).parents(".grid-block").removeClass("is_checked");
                    $(".checkedAll").removeClass("is_checked");
                    if (index != -1) {
                        this.check_id.splice(index, 1);
                        for (var i = 0; i < this.moveParams.length; i++) {
                            if (this.moveParams[i].material_id == id) {
                                this.moveParams.splice(i, 1);
                                break;
                            }
                        }
                    }
                } else {
                    $(ev.target).parents(".pc-checkbox_input").addClass("is_checked");
                    $(ev.target).parents(".grid-block").addClass("is_checked");
                    if ($(".grid-block.is_checked").length == this.rlist.length) {
                        $(".pc-checkbox_input_all").addClass("is_checked");
                        $(".checkedAll").addClass("is_checked");
                    }
                    if (index == -1) {
                        this.check_id.push(id);
                        var obj = {
                            'material_id': id,
                            'type_id': typeId
                        };
                        this.moveParams.push(obj);
                    }
                    this.rename_typeid = typeId;
                }
                if (this.check_id.length < 2) {
                    this.onlyChoice = true;
                } else {
                    this.onlyChoice = false;
                }
                this.pushId();
                console.log($(".grid-block .is_checked").length)
            },
            checkAll(ev) {
                this.check_id = [];
                var vm = this;
                if ($(ev.target).hasClass("is_checked")) {
                    vm.check_id = [];
                } else {
                    $(".grid-block").each(function() {
                        vm.check_id.push(parseInt($(this).attr("mid")))
                    })
                }
                if ($(ev.target).hasClass("is_checked")) {
                    $(ev.target).removeClass("is_checked");
                    $(".grid-block").each(function() {
                        $(this).removeClass('is_checked');
                        $(this).find(".pc-checkbox_input").removeClass('is_checked');
                    })
                    this.moveParams.splice(0);
                } else {
                    $(ev.target).addClass("is_checked");
                    vm.moveParams.splice(0)
                    $(".grid-block").each(function() {
                        $(this).addClass('is_checked');
                        $(this).find(".pc-checkbox_input").addClass('is_checked');
                        var that = $(this);
                        var obj = {
                            'material_id': that.attr("mid"),
                            'type_id': that.attr('tid')
                        };
                        vm.moveParams.push(obj);
                    });
                }
                if (this.check_id.length < 2) {
                    this.onlyChoice = true;
                } else {
                    this.onlyChoice = false;
                }
                vm.pushId();
            },
            nextPage(tid, mid, cid, name, ev) { // 页面跳
                window.event ? window.event.cancelBubble = true : ev.stopPropagation();
                window.event ? window.event.returnValue = false : ev.preventDefault();
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
            delelteConfirm() {
                if (!this.check_id.length) {
                    this.$notify({
                        title: '提示',
                        message: '请选择要删除的资源',
                        type: 'info'
                    });
                    return
                }
                this.$confirm('此操作将删除所选文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('成功')
                    this.delete_();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            delete_() {
                var vm = this;
                var params = {
                    data: {
                        data: {
                            'material_ids': vm.check_id
                        },
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.check_id = [];
                            vm.pushId();
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            vm.$emit("reload");
                        } else {
                            vm.check_id = [];
                            vm.pushId();
                            vm.$message({
                                type: 'success',
                                message: '删除失败!'
                            });
                        }
                    }
                }
                this.$store.dispatch("delete", params)
            },
            //向父组件pushid
            pushId() {
                this.$emit('get_rid', this.check_id);
            },
            rename() {
                var vm = this;
                if ($(".grid-block .is_checked").length == 0) {
                    vm.$notify({
                        title: '提示',
                        message: '请先勾选要重命名的资源',
                        type: 'info'
                    });
                    return
                }
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
                                'material_id': this.check_id[0],
                                'name': value,
                                'category_id': vm.parentMaterialid,
                                'label': '',
                                'type_id':vm.rename_typeid
                            })
                        },
                        successFn(res) {
                            if (res.rescode == 200) {
                                vm.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                vm.$emit("reload");
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: res.errInfo
                                });
                            }
                        }
                    }
                    this.$store.dispatch("rename", params)
                }).catch(() => {});
            },
            downloadFile() {
                var vm = this;
                var target = $(".grid-block .is_checked").parents('.grid-block ');
                console.log((target.attr('tid') == 9) || (target.attr('tid') == 11))
                if ($(".grid-block .is_checked").length == 1) { //下载
                    if ((target.attr('tid') == 9) || (target.attr('tid') == 11)) {
                        vm.$notify({
                            title: '提示',
                            message: '目录或者电视剧不能下载',
                            type: 'info'
                        });
                        return
                    }
                    var downloadUrl = target.attr("url");
                    var filename = target.attr("name");
                } else {
                    vm.$notify({
                        title: '提示',
                        message: '请先勾选一个要下载的资源',
                        type: 'info'
                    });
                    return
                }
                try {
                    var a = document.getElementById('download');
                    a.href = downloadUrl;
                    a.download = filename;
                    a.click();
                } catch (e) {
                    vm.$notify({
                        title: '提示',
                        message: '下载错误',
                        type: 'info'
                    });
                }
            },
            getId(mid, tid) {
                console.log(mid, tid)
                this.category_id_new = mid;
                this.category_type_new = tid;
            },
            //加载移动的树
            getCatalogList() {
                if (!this.moveParams.length) {
                    this.$notify({
                        title: '提示',
                        message: '请先勾选要移动的资源',
                        type: 'info'
                    });
                    return
                }
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
                var params = {
                    successFn(res) {
                        console.log(res)
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
                info.data = JSON.stringify(vm.moveParams);
                params.data = info;
                this.$store.dispatch("moveResource", params);
            },
        },
        watch: {
            $route(to, from) {
                this.check_id = [];
                this.catalogList = [];
                this.moveParams = [];
                this.onlyChoice = true;
            }
        },
        components: {
            tree
        }
    }
</script>

<style>

</style>
