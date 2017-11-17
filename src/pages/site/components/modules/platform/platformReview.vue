<template>
    <div class="platform-content_wrapper">
        <div class="review-section" v-for="i in sitelist" :key="i.subsystem_id">
            <div class="platform_detail">
                <div class="platform_vs">
                    <span>{{i.subsystem_name | chackInfo_ }}</span>
                    <span class="version"><img src="../../../../assets/img/vs.png"/><p>{{i.version_num  | chackInfo_}}</p></span>
                </div>
                <ul class="platfrom_general">
                    <li><span class="spot red"></span><span class="general-title">磁盘空间：</span><span>{{i.disk_free  | chackInfo_}}/{{i.disk_total  | chackInfo_}}</span></li>
                    <li><span class="spot green"></span><span class="general-title">cpu 占用：</span><span>{{i.subsystem_cpu  | chackInfo_}}</span></li>
                    <li><span class="spot blue"></span><span class="general-title">内存大小：</span><span>{{i.mem_total  | chackInfo_}}</span></li>
                    <li><span class="spot orange"></span><span class="general-title">使用时长：</span><span>{{i.online_days | chackInfo_ }}</span></li>
                </ul>
            </div>
            <div class="platform_tool">
                <div class="platform_online " :class="{'online':i.online,'offline':!i.online}">
                    <span class="bg"></span>
                    <span class="online-tip" v-if="i.online">当前在线</span>
                    <span class="online-tip" v-else>当前离线</span>
                </div>
                <div class="platform_check"><button class="check-detail" @click="getPath('/subsite/'+i.subsystem_id,i)">查看详情</button></div>
            </div>
        </div>
        <div class="review-section">
            <button class="addNewsite">添加</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sitelist: []
            }
        },
        methods: {
            getPath(path, data) {
                this.$store.commit('getsingleSite', data);
                this.$router.push({
                    path: path
                });
            },
        },
        created() {
            this.sitelist = this.$store.state.sitelist;
        },
        filters: {
            chackInfo_(val) {
                if (!val) {
                    return '暂无'
                } else {
                    return val
                }
            },
            
        },
        computed: {
            list() {
                return this.$store.state.sitelist
            }
        },
        watch: {
            list(val) {
                this.sitelist = val
            },
        },
        
    }
</script>

<style>

</style>
