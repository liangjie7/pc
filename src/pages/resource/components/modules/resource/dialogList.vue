<template>
    <ul class="treeview treeview-collapse">
        
        <li v-for="item in list" :key="item.class_id">
            <div class="treeview-node" ><el-checkbox @change="change"></el-checkbox><em class="plus icon-operate" @click.stop.prevent="open($event)" :class="{'show':!item.child_class.length}"></em><em class="treeview-ic"></em><span>{{item.class_name}}</span></div>
            <tree v-if="item.child_class.length" :list="item.child_class" ></tree>
        </li>
    </ul>
</template>

<script>
    export default {
        name:'tree',
        props:{
            list:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
             open(ev) {
                var target =  $(ev.currentTarget);
               
                var that = target.parents('li');
                if (that.children(".treeview").length) {
                    if (that.children(".treeview-collapse").length) {
                        that.children(".treeview").each(function(i) {
                            $(this).removeClass("treeview-collapse");
                            
                            
                        })
                        target.addClass("minus")
                    }else{
                       that.children(".treeview").each(function(i) {
                            $(this).addClass("treeview-collapse")
                        }) 
                        target.removeClass("minus")
                    }
                }
            },
            change(){

            }
        }
    }
</script>

<style>

</style>
