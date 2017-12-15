<template>
    <div id="live-content">
        <el-dialog :title="action_title" :visible.sync="addCdn_dialog" custom-class="addCdn_dialog" size="tiny">
            <div class="addCdn_input">
                cdn名称：
                <el-input type="text" placeholder="cdn名称" v-model="cdn_name">
                </el-input>
            </div>
            <div class="addCdn_input">
                cdnIP：
                <el-input type="text" placeholder="cdn IP" v-model="cdn_ip">
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCdn_dialog = false">取 消</el-button>
                <el-button type="primary" @click="actionMain">确 定</el-button>
            </div>
        </el-dialog>
        <section id="cdnList">
            <div id="cdnShow">
                <p id="showTitle">CDN中心节点</p>
            </div>
            <ul class="list">
                <li class="lis" v-for="(item,index) in cdn_nodes_main" :key="item.cdn_id">
                    <span class="lis_name">{{item.cdn_name}}</span>
                    <p class="lis_tool">
                        <span class="cdn-tools" @click="deleteCdn(item.cdn_id,item.cdn_type)">删除</span>
                        <span class="cdn-tools" @click="showDialog('edit','main',item.cdn_id,item.cdn_name,item.cdn_ip)">编辑</span>
                    </p>
                </li>
            </ul>
            <div class="addCdn" @click="showDialog('add','main')">
                <img src="../../../../assets/img/addCdn.png" />新增
            </div>
        </section>
        <section id="cdnContent">
            <div class="cdn-content">
                <p class="cdnContent_title">CDN边缘节点</p>
                <el-table :data="cdn_nodes_edge" style="width: 100%" class="nodeList">
                    <el-table-column prop="cdn_name" label="节点名称">
                    </el-table-column>
                    <el-table-column prop="cdn_ip" label="IP">
                    </el-table-column>
                    <el-table-column prop="online" label="状态">
                        <template slot-scope="scope">
                                <span v-if="scope.row.online == 1">在线</span>
                                <span v-else>离线</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="操作" width="180" prop="cdn_id">
                        <template slot-scope="scope">
                            <span class="cdn-tools" @click="deleteCdn(scope.row.cdn_id,scope.row.cdn_type)">删除</span>
                            <span class="cdn-tools"  @click="showDialog('edit','edge',scope.row.cdn_id,scope.row.cdn_name,scope.row.cdn_ip)">编辑</span>
                        </template>
                    
                    </el-table-column>
                </el-table>
                <div class="addNodeWrapper">
                    <button id="addNode" @click="showDialog('add','edge')">
                        添加边缘节点
                    </button>
                </div>
            </div>
         
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addCdn_dialog: false, //添加CDN
                cdn_ip: "",
                cdn_name: "",
                cdn_nodes_main: [], //主节点
                cdn_nodes_edge: [], //边缘节点
                action_title: "添加",
                cdn_id: "", //操作的id
                action_type: "",
                node_type: "", //操作的节点的类型 main 或者 edge
            }
        },
        methods: {
            getCdnmain() {
                var vm = this;
                var params = {
                    data: {},
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.cdn_nodes_main = res.cdn_nodes;
                            if (vm.cdn_nodes_main.length) {}
                        } else {
                            alert("获取出错")
                        }
                    }
                };
                this.$store.dispatch("getCdnMain", params);
            },
            showDialog(action_type, node_type, id, name, ip) { //
                this.cdn_name = "";
                this.cdn_ip = "";
                this.addCdn_dialog = true;
                this.cdn_id = id;
                this.cdn_ip = ip;
                this.cdn_name = name;
                this.action_type = action_type;
                this.node_type = node_type;
                
                if (node_type == 'main') {
                    if (action_type == 'add') {
                        this.action_title = "添加CDN主节点";
                    } else {
                        this.action_title = "编辑CDN主节点";
                    }
                } else {
                    if (action_type == 'add') {
                        this.action_title = "添加CDN边缘节点";
                    } else {
                        this.action_title = "编辑CDN边缘节点";
                    }
                }
            },
            addCdn() {
                if(!this.cdn_name || !this.cdn_ip){
                    alert('请输入节点名称和IP');
                    return;
                }
                var vm = this;
                var params = {
                    data: {
                        'data': {
                            'cdn_name': vm.cdn_name,
                            'cdn_ip': vm.cdn_ip
                        }
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success'
                            });
                            if(vm.node_type == "main"){
                                vm.getCdnmain();
                            }else{
                                vm.getCdnEdge();
                            }
                            vm.addCdn_dialog = false;
                        } else {
                            alert("添加出错")
                        }
                    }
                };
                if(this.node_type == "main"){
                    this.$store.dispatch("addCdnMain", params);
                }else{
                    this.$store.dispatch("addCdnEdge", params);
                }
                
            },
            editCdn() {
                if(!this.cdn_name || !this.cdn_ip){
                    alert('请输入节点名称和IP');
                    return;
                }
                var vm = this;
                var params = {
                    data: {
                        'data': JSON.stringify({
                            'cdn_name': vm.cdn_name,
                            'cdn_ip': vm.cdn_ip,
                            
                        })
                    },
                    'cdn_id': vm.cdn_id,
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            
                            if(vm.node_type == "main"){
                                vm.getCdnmain();
                            }else{
                                vm.getCdnEdge();
                            }
                            vm.addCdn_dialog = false;
                        } else {
                            alert(res.errInfo)
                        }
                    }
                };
                if(this.node_type == "main"){
                    this.$store.dispatch("editCdnMain", params);
                }else{
                    this.$store.dispatch("editCdnMain", params);
                    
                }
                
            },
            actionMain() {
            
                if(this.action_type == 'add'){
                    this.addCdn()
                }else{
                    this.editCdn();
                }
            },
            getCdnEdge() {
                var vm = this;
                var params = {
                    data: {},
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.cdn_nodes_edge = res.cdn_nodes;
                        } else {
                            alert("获取出错")
                        }
                    }
                };
                this.$store.dispatch("getCdnEdge", params);
            },
            deleteCdn(id, type) {
                var vm = this;
                var params = {
                    data: {},
                    cdn_id: id,
                    successFn(res) {
                        if (res.rescode == 200) {
                            if (type == 'edge') {
                                vm.getCdnEdge();
                            } else {
                                vm.getCdnmain();
                            }
                            vm.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                        } else {
                            alert("删除出错")
                        }
                    }
                };
                this.$store.dispatch("deleteCdn", params);
            },
          
        },
        created() {
            this.getCdnmain();
            this.getCdnEdge();
        }
    }
</script>

<style>

</style>
