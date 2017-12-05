<template>
    <ul class="treeview treeview-collapse">
        <li v-for="item in list" :key="item.class_id">
            <div class="treeview-node">
                <label class="pc-checkbox treeCheckbox" @click="checktree($event,item.class_id,item.type_id)">
                    <div class="pc-checkbox_input" >
                        <span class="pc-checkbox_inner" >
                        </span>
                    </div>            
                </label>
                </el-checkbox><em class="plus icon-operate" @click.stop.prevent="open($event)" :class="{'show':!item.child_class.length}"></em><em class="treeview-ic" :class="{'catalog':item.type_id == 11,'series':item.type_id == 9}"></em><span>{{item.class_name}}</span></div>
            <tree v-if="item.child_class.length" :list="item.child_class"></tree>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'tree',
        props: {
            list: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        methods: {
            open(ev) {
                var target = $(ev.currentTarget);
                var that = target.parent().parent();
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
            change(ev) {
            
                var treeCheckbox = document.getElementsByClassName("treeCheckbox");
                if (ev.currentTarget.checked) {
                    for (var i = 0; i < treeCheckbox.length; i++) {
                        if (treeCheckbox[i].checked) {
                            $(treeCheckbox[i]).props('checked', false);
                        }
                    }
                    $("ev.currentTarget").find(".el-checkbox__input").addClass("is_checked");
                }
            },
            checktree(event,class_id,type_id){
                var that = $(event.currentTarget);
                if(that.find(".is_checked").length){
                    that.children('.pc-checkbox_input').removeClass('is_checked');
                }else{
                    $(".treeCheckbox .is_checked").each(function(i){
                        $(this).removeClass("is_checked");
                    })
                    that.children('.pc-checkbox_input').addClass('is_checked');
                }
                this.$emit('changeId',class_id,type_id)
            }
        }
    }
</script>

<style>

</style>
