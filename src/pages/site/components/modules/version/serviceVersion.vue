<template>
    <div class="version-wrapper">
        <el-dialog title="新增版本" :visible.sync="versionDialog" :close-on-click-modal="false" custom-class="versionDialog"  v-loading="uploading"  element-loading-text="上传中,请耐心等待。。。">
            <el-input placeholder="填写最新的版本号" class="version_num" size="small" v-model="version_code"></el-input>
            <div class="relyVersion">
                <span>依赖版本:</span>
                <el-select v-model="value" placeholder="请选择" size="small">
                    <el-option v-for="item in options" :key="item.version_id" :label="item.version_code" :value="item.version_id">
                    </el-option>
                </el-select>
            </div>
            <ul class="versionList">
                <li v-for="item in uploadList" :key="item.resource_id">
                    <div class="version_info"><span class="version_title">文件信息</span><span class="version_name" :title="item.name">{{item.name}}</span><span class="version_size">{{item.size | bytesToSize}}</span><a href="javascript:;" class="delete" @click="deleteVersion">删除</a></div>
                </li>
            </ul>
            <div>
                <button class="upload"><input type="file" @change = "upload_web($event)" ref="file"/><span class="label">上传资源</span></button>
            </div>
            <el-input type="textarea" placeholder="版本说明" class="version_description" :rows="4" v-model="content">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="versionDialog = false">取 消</el-button>
                <el-button type="primary" @click="upload">确 定</el-button>
            </div>
        </el-dialog>
        <div class="addWrapper">
            <button @click="openNewVersion">新增版本</button>
        </div>
        <el-row class="version-header version-tr">
            <el-col :span="4">
                <div class="grid-content ">版本编号</div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content ">文件名称</div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content ">文件大小</div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content ">上传人</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">上传时间</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">版本说明</div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content ">下发升级</div>
            </el-col>
        </el-row>
        <el-dialog title="下发" :visible.sync="issueDialog" custom-class="issueDialog">
            <el-table ref="multipleTable" :data="sitelist" border tooltip-effect="light" :stripe="true" style="width: 100%" max-height="300" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="subsystem_name" label="子站点名称">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="issueDialog = false">取 消</el-button>
                <el-button type="primary" @click="issue">确 定</el-button>
            </div>
        </el-dialog>
        <div class="version-tbody">
            <el-row class="version-tr" v-for="item in version_list" :key="item.version_id">
                <el-col :span="4">
                    <div class="grid-content " :title="item.version_code">{{item.version_code}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content " :title="item.version_name">{{item.version_name}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content ">{{item.version_size | bytesToSize}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content ">{{item.user_name}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content " v-html="item.create_time"></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content " :title="item.content">{{item.content}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content "><button @click="getSubsite(item.version_id)" title="下发">下发</button></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                version_list: [], //服务器版本信息列表
                versionDialog: false,
                options: [],
                version_code: "",
                value: '',
                uploadList: [],
                content: "",
                sitelist: [],
                issueDialog: false,
                subsite_ids: [],
                version_id: "",
                uploading:false,
            }
        },
        methods: {
            openNewVersion() {
                this.value = "";
                this.version_code = "";
                this.content = "";
                this.uploadList = [];
                this.versionDialog = true;
            },
            getServiceVerison() {
                var vm = this;
                var params = {
                    data: {},
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.version_list = res.version_list;
                            vm.options = res.version_list;
                        }
                    }
                }
                this.$store.dispatch('getServiceVersion', params);
            },
            upload_web(e) {
                if (this.uploadList.length) {
                    alert("只能添加一个版本，请先删除已有版本，再继续上传。");
                    return;
                }
                var vm = this;
                var items = e.target.files;
                vm.uploadList.push(items[0]);
            },
            upload() {
                var vm = this;
                var items = vm.uploadList;
                if (!vm.version_code) {
                    vm.$notify({
                        title: '提示',
                        message: '请填写最新的版本名称',
                        type: 'info'
                    });
                    return;
                }
                if (!vm.uploadList.length) {
                    vm.$notify({
                        title: '提示',
                        message: '请添加版本文件',
                        type: 'info'
                    });
                    return;
                }
                if (!vm.content) {
                    vm.$notify({
                        title: '提示',
                        message: '请填写版本说明',
                        type: 'info'
                    });
                    return;
                }
                this.uploading = true;
                for (let i = 0; i < items.length; i++) {
                    var form = new FormData();
                    form.append("SelectedFile", items[i]);
                    form.append("custom_file_type", 'version');
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            let data_ = JSON.parse(xhr.responseText);
                            if (data_.rescode == 200) {
                                let last_id;
                                if (vm.value == "") {
                                    last_id = -1
                                } else {
                                    last_id = vm.value;
                                }
                                var params = {
                                    data: {
                                        'version_name': data_.name,
                                        'version_code': vm.version_code,
                                        'resource_id': data_.resource_id,
                                        'last_id': last_id,
                                        'content': vm.content
                                    },
                                    successFn(res) {
                                        if (res.rescode == 200) {
                                            vm.uploading = false;
                                            vm.$notify({
                                                title: '成功',
                                                message: res.info,
                                                type: 'success'
                                            });
                                            vm.$refs.file.value = ""
                                            vm.getServiceVerison();
                                            vm.versionDialog = false;
                                        }else{
                                            vm.uploading = false;
                                            vm.$notify({
                                                title: '提示',
                                                message: res.info,
                                                type: 'info'
                                            });
                                        }
                                    }
                                }
                                vm.$store.dispatch('addNewVersion', params);
                            } else {
                                this.uploading = false;
                                alert("上传版本文件失败，请重新上传。");
                                return
                            }
                        }
                    }
                    xhr.open("post", '/upload', true);
                    xhr.send(form);
                }
            },
            deleteVersion() {
                if (this.uploadList[0].resource_id) {} else {
                    this.uploadList = [];
                }
                this.$refs.file.value = "";
            },
            getSubsite(vid) {
                var vm = this;
                this.version_id = vid;
                this.subsite_ids = [];
                
                var params = {
                    data: {},
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.sitelist =[];
                            for(var i=0;i<res.subsiteList.length;i++){
                                if(!(res.subsiteList[i].subsystem_id < 0)){
                                   vm.sitelist.push(res.subsiteList[i]);
                                }
                            }
                            
                            vm.$store.commit('initSitelist', res.subsiteList);
                        } else {
                            vm.$notify({
                                title: '提示',
                                message: res.info,
                                type: 'info'
                            });
                        }
                    }
                };
                this.$store.dispatch("getSubsite", params);
                this.issueDialog = true;
            },
            handleSelectionChange(val) { //勾选下发的监狱列表
                this.subsite_ids = [];
                for (let value of val) {
                    this.subsite_ids.push(value.subsystem_id);
                }
            },
            issue() {
                if (!this.subsite_ids.length) {
                    this.$notify({
                        title: '提示',
                        message: '请先勾选子站点',
                        type: 'info'
                    });
                    return
                }
                var vm = this;
                var params = {
                    data: {
                        'subsite_ids': JSON.stringify(vm.subsite_ids),
                        'version_id': vm.version_id,
                        'version_type':0
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.$notify({
                                title: '成功',
                                message: res.info,
                                type: 'success'
                            });
                            vm.getServiceVerison();
                            vm.issueDialog = false;
                        } else {
                            vm.$notify({
                                title: '提示',
                                message: res.info,
                                type: 'info'
                            });
                        }
                    }
                };
                this.$store.dispatch("issueVersion", params);
            }
        },
        created() {
            this.getServiceVerison();
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
    }
</script>

<style>

</style>
