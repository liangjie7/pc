<template>
    <div class="platform-content_wrapper">
       
        <div class="review-section" v-for="i in sitelist" :key="i.subsystem_id">
            <div class="platform_detail">
                <div class="platform_vs">
                    <span>{{i.subsystem_name}}</span>
                    <span class="version"><img src="../../../../assets/img/vs.png"/><p>{{i.version_num}}</p></span>
                </div>
                <ul class="platfrom_general">
                    <li><span class="spot red"></span><span class="general-title">磁盘空间：</span><span>{{i.disk_free}}/{{i.disk_total}}</span></li>
                    <li><span class="spot green"></span><span class="general-title">cpu 占用：</span><span>{{i.subsystem_cpu}}</span></li>
                    <li><span class="spot blue"></span><span class="general-title">内存大小：</span><span>{{i.mem_total}}</span></li>
                    <li><span class="spot orange"></span><span class="general-title">使用时长：</span><span>{{i.subsystem_cpu}}</span></li>
                </ul>
            </div>
            <div class="platform_tool">
                <div class="platform_online " :class="{'online':i.online,'offline':!i.online}">
                    <span class="bg"></span>
                    <span class="online-tip" v-if="i.online">当前在线</span>
                    <span class="online-tip" v-else>当前离线</span>
                </div>
                <div class="platform_check"><button class="check-detail" @click="getPath('/subsite/'+i.subsystem_id)">查看详情</button></div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                sitelist:[]
            }
        },
        methods:{
            getPath(path){
                this.$router.push({
                    path: path
                });
            }
        },  
        created(){
            
            this.sitelist = this.$store.state.sitelist;
        },
        computed:{
            list(){
                return this.$store.state.sitelist
            }
        },
        watch:{
             list(val) {
                this.sitelist = val
            },
            
        }


    }
</script>

<style>

</style>
