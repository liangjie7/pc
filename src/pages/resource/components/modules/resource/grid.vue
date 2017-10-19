<template>
    <div class="r-table">
        <div class="grid-toolbar el-row">
            <button class="gird-tool checkedAll " @click="checkAll">全选</button>
            <button class="gird-tool">下载</button>
            <button class="gird-tool" @click="delelteConfirm">删除</button>
            <button class="gird-tool" v-if="rename">重命名</button>
            <button class="gird-tool">移动到</button>
        </div>
        <div class="grid-content">
            <!-- is_checked -->
            <div class="grid-block " v-for="(item,key) in rlist" :key="item.material_id" :mid="item.material_id">
                <div class="grid-radio">
                    <label class="pc-checkbox_round">
                            <div class="pc-checkbox_input">
                                <span class="pc-checkbox_inner">
                                    <input type="checkbox" @click.stop.prevent="checked($event,item.material_id)"/>
                                </span>
                            </div>
                            
                        </label>
                </div>
                <div class="grid-icon" v-if="(item.type_id == 11)||(item.type_id == 9)" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/folder-large.png" alt="">
                </div>
                <div class="grid-icon" v-else @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <img src="../../../../assets/img/music.png" alt="">
                </div>
                <div class="grid-name" @click.stop.prevent="nextPage(item.type_id,item.material_id,item.material_id,item.name,$event)">
                    <a href="javascript:;" title="item.name">{{item.name}}</a>
                </div>
                <div></div>
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
                }
            },
            checkArr: { //勾选的目录或者资源的id
                type: Array,
                default () {
                    return []
                }
            }
        },
        data(){
            return{
                delete_id:[],
                rename:true
            }
        },
        methods: {
            checked(ev, id) {
                window.event ? window.event.cancelBubble = true : ev.stopPropagation();
                window.event ? window.event.returnValue = false : ev.preventDefault();
                var index = this.delete_id.indexOf(id);
                if ($(ev.target).parents(".pc-checkbox_input").hasClass("is_checked")) {
                    $(ev.target).parents(".pc-checkbox_input").removeClass("is_checked");
                    $(".pc-checkbox_input_all").removeClass("is_checked");
                    $(ev.target).parents(".grid-block").removeClass("is_checked");
                    $(".checkedAll").removeClass("is_checked");
                    if(index!=-1){
                        this.delete_id.splice(index,1)
                    }
                } else {
                    $(ev.target).parents(".pc-checkbox_input").addClass("is_checked");
                    $(ev.target).parents(".grid-block").addClass("is_checked");
                    if ($(".grid-block.is_checked").length == this.rlist.length) {
                        $(".pc-checkbox_input_all").addClass("is_checked");
                        $(".checkedAll").addClass("is_checked");
                    }
                    if(index==-1){
                        this.delete_id.push(id);
                    }
                }
                if(this.delete_id.length>0){
                    this.rename = true;
                }
            },
            checkAll(ev) {
                this.delete_id = [];
                var vm = this;
                if($(ev.target).hasClass("is_checked")){
                     vm.delete_id = [];
                }else{
                    $(".grid-block").each(function(){
                        vm.delete_id.push($(this).attr("mid"))
                    })
                }
                if ($(ev.target).hasClass("is_checked")) {
                    $(ev.target).removeClass("is_checked");
                    $(".grid-block").each(function() {
                        $(this).removeClass('is_checked');
                        $(this).find(".pc-checkbox_input").removeClass('is_checked');
                    })
                } else {
                    $(ev.target).addClass("is_checked");
                    $(".grid-block").each(function() {
                        $(this).addClass('is_checked');
                        $(this).find(".pc-checkbox_input").addClass('is_checked');
                    })
                }
                
                
                console.log(this.delete_id)
                if(this.delete_id.length>0){
                    this.rename = false;
                }
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
            },
             delelteConfirm() {
                
                this.$confirm('此操作将删除所选文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('成功')
                    this.delete_();
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
            
            },
            delete_() {
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
        }
    }
</script>

<style>

</style>
