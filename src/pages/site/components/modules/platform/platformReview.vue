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
        <el-dialog title="添加子站点" :visible.sync="addSiteDialog" class="series-dialog" size="tiny">
            <el-form>
                <div class="siteDialog">
                    <span class="dialog-title">名称:</span>
                    <el-input type="text" placeholder="子站点名称" class="site_name" v-model="site_name"></el-input>
                </div>
                <div class="site-intro">
                    <span>简介:</span>
                    <el-input type="textarea" :rows="2" placeholder="简介" v-model="site_intro"></el-input>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addSiteDialog = false">取 消</el-button>
                <el-button type="primary" @click="addSite">确 定</el-button>
            </div>
        </el-dialog>
        <div class="review-section">
            <button class="addNewsite" @click="initSiteDialog">添加</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sitelist: [],
                addSiteDialog: false,
                site_name: "", //子站点名称
                site_intro: "", //子站点简介
            }
        },
        methods: {
            getPath(path, data) {
                this.$store.commit('getsingleSite', data);
                this.$router.push({
                    path: path
                });
            },
            initSiteDialog() {
                this.site_name = "";
                this.site_intro = "";
                this.addSiteDialog = true;
            },
            addSite() {
                if(!vm.site_name && !vm.site_intro){
                    vm.$notify({
                        title: '提示',
                        message: '请填入子站点名称和简介',
                        type: 'info'
                    });
                    return
                }
                var vm = this;
                var params = {
                    data: {
                        'data': JSON.stringify({
                            'subsystem_name': vm.site_name,
                            'site_intro': vm.site_intro
                        })
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.addSiteDialog = false;
                            vm.$emit("reload");
                            vm.$notify({
                                title: '成功',
                                message: '成功添加子站点',
                                type: 'success'
                            });
                        }else{
                            vm.$notify({
                                title: '提示',
                                message: res.info,
                                type: 'info'
                            });
                        }
                    }
                };
                this.$store.dispatch("addSite", params);
            }
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
