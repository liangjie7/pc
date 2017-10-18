<template>
    <div class="r-table">
        <div class="grid-toolbar el-row">
            <button class="gird-tool checkedAll " @click="checkAll">全选</button>
            <button class="gird-tool">下载</button>
            <button class="gird-tool">删除</button>
            <button class="gird-tool">重命名</button>
            <button class="gird-tool">移动到</button>
        </div>
        <div class="grid-content">
            <!-- is_checked -->
            <div class="grid-block " v-for="(item,key) in rlist" >
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
        methods: {
            checked(ev, id) {
                window.event ? window.event.cancelBubble = true : ev.stopPropagation();
                window.event ? window.event.returnValue = false : ev.preventDefault();
                if ($(ev.target).parents(".pc-checkbox_input").hasClass("is_checked")) {
                    $(ev.target).parents(".pc-checkbox_input").removeClass("is_checked");
                    $(".pc-checkbox_input_all").removeClass("is_checked");
                    $(ev.target).parents(".grid-block").removeClass("is_checked");
                    $(".checkedAll").removeClass("is_checked");
                } else {
                    $(ev.target).parents(".pc-checkbox_input").addClass("is_checked");
                    $(ev.target).parents(".grid-block").addClass("is_checked");
                    if ($(".grid-block.is_checked").length == this.rlist.length) {
                        $(".pc-checkbox_input_all").addClass("is_checked");
                        $(".checkedAll").addClass("is_checked");
                    }
                    this.checkArr.push(id);
                    console.log(this.checkArr)
                }
            },
            checkAll(ev) {
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
            }
        }
    }
</script>

<style>

</style>
