<template>
    <div class="version-wrapper">
        <el-dialog title="支持类型" :visible.sync="typeDialog" :close-on-click-modal="false" custom-class="versionDialog">
            <div class="type_group">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="item in typeList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="typeDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateType">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增版本" :visible.sync="versionDialog" :close-on-click-modal="false" custom-class="versionDialog" v-loading="uploading" element-loading-text="上传中,请耐心等待。。。">
            <el-input placeholder="填写最新的版本号" class="version_num" size="small" v-model="version_code"></el-input>
            <ul class="versionList">
                <li v-for="(item,index) in uploadList" :key="item.name">
                    <div class="version_info"><span class="version_title">文件信息</span><span class="version_name" :title="item.name">{{item.name}}</span><span class="version_size">13.3MB</span><a href="javascript:;" class="delete" @click="deleteVersion(index)">删除</a></div>
                    <div class="version_type">
                        <span class="version_title">文件类型</span>
                        <div class="typeGroup">
                            <div class="type" v-for="(i,index2) in item.chooseType" :key="index2">
                                <span class="typeTitle">{{i.name}}</span>
                                <span class="deleteType" @click="deleteType(index,index2,i.name,i.id,i.name)">x</span>
                            </div>
                            <div class="addType" @click="getType(index)"></div>
                        </div>
                    </div>
                </li>
            </ul>
            <div>
                <button class="upload"><input type="file"ref="file" multiple="multiple" @change="upload_web($event)"/><span class="label">添加版本文件</span></button>
            </div>
            <el-input type="textarea" placeholder="版本说明" class="version_description" :rows="4" v-model="content">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="versionDialog = false">取 消</el-button>
                <el-button type="primary" @click="upload">确 定</el-button>
            </div>
        </el-dialog>
        <div class="addWrapper">
            <button @click="openNewVersion" title="新增版本">新增版本</button>
        </div>
        <el-row class="version-header version-tr">
            <el-col :span="4">
                <div class="grid-content ">版本编号</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">上传时间</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">上传人</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">版本说明</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">版本文件</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">下发升级</div>
            </el-col>
        </el-row>
        <el-dialog title="版本文件" :visible.sync="detailDialog" custom-class="detailDialog">
            <ul>
                <li v-for="item in checkArr" :key="item.version_id"><span class="list_title" :title="item.version_name">{{item.version_name}}</span><span class="list_size" >{{item.version_size | bytesToSize}}</span></li>
            </ul>
        </el-dialog>
        <el-dialog title="下发" :visible.sync="issueDialog" custom-class="issueDialog">
            <el-table ref="multipleTable" :data="sitelist" border tooltip-effect="light" style="width: 100%" max-height="300" :stripe="true" @selection-change="handleSelectionChange">
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
                <el-col :span="4">
                    <div class="grid-content " :title="item.create_time">{{item.create_time}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content " :title="item.user_name">{{item.user_name}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content " :title="item.content">{{item.content}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content "><a href="javascript:;" class="checkDetail" @click="checkDetail(item.resources)" title="查看">查看</a></div>
                </el-col>
                <el-col :span="4">
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
                checkList: [],
                versionDialog: false,
                detailDialog: false,
                uploadList: [],
                version_code: "",
                content: "",
                version_list: [],
                checkArr: [],
                sitelist: [],
                issueDialog: false,
                subsite_ids: [],
                version_id: "",
                uploading: false,
                typeDialog: false,
                typeList: [], //类型
                typeIndex: "", //给哪个资源添加类型
            }
        },
        methods: {
            openNewVersion() {
                this.version_code = "";
                this.content = "";
                this.uploadList = [];
                this.versionDialog = true;
            },
            upload_web(e) {
                var vm = this;
                var items = e.target.files;
                for (var i = 0; i < items.length; i++) {
                    vm.uploadList.push(items[i]);
                }
            },
            checkDetail(info) {
                this.detailDialog = true;
                this.checkArr = info;
            },
            upload() {
                var vm = this;
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
               
                var resources = [];
                var items = vm.uploadList;
                 for(let j=0;j<items.length;j++){
                    if(!(items[j].version_support_type_id && items[j].version_support_type_id.length)){
                        vm.$notify({
                        title: '提示',
                        message: '请先添加文件类型',
                        type: 'info'
                    });
                    return;
                    }
                }
                this.uploading = true;
                var uploadSign = 0;//上传条数
                for (let i = 0; i < items.length; i++) {
                    var form = new FormData();
                    form.append("SelectedFile", items[i]);
                    form.append("custom_file_type", 'version');
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            let data_ = JSON.parse(xhr.responseText);
                            if (data_.rescode == 200) {
                               uploadSign = uploadSign+1;
                                var obj = {};
                                obj.version_name = items[i].name;
                                obj.resource_id = data_.resource_id;
                                resources.push(obj);
                                obj.version_support_type_id = items[i].version_support_type_id;
                                obj.version_support_type_name = items[i].version_support_type_name;
                                if (uploadSign == vm.uploadList.length) {
                                    console.log(uploadSign,vm.uploadList.length)
                                    var params = {
                                        data: {
                                            'resources': JSON.stringify(resources),
                                            'version_code': vm.version_code,
                                            'content': vm.content,
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
                                                vm.getServiceVersion_terminal();
                                                vm.versionDialog = false;
                                            } else {
                                                vm.uploading = false;
                                                vm.$notify({
                                                    title: '提示',
                                                    message: res.info,
                                                    type: 'info'
                                                });
                                            }
                                        }
                                    }
                                    vm.$store.dispatch('addNewVersion_terminal', params);
                                }
                            } else {
                                vm.uploading = false;
                                alert("上传版本文件失败，请重新上传。");
                                return
                            }
                        }
                    }
                    xhr.open("post", '/upload', true);
                    xhr.send(form);
                }
            },
            deleteVersion(index) {
                if (this.uploadList[index].resource_id) {} else {
                    this.uploadList.splice(index, 1);
                }
                this.$refs.file.value = "";
            },
            getServiceVersion_terminal() { //获取终端信息列表
                var vm = this;
                var params = {
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.version_list = res.version_list;
                        }
                    }
                }
                this.$store.dispatch("getServiceVersion_terminal", params);
            },
            getSubsite(vid) {
                var vm = this;
                this.version_id = vid;
                this.subsite_ids = [];
                var params = {
                    data: {},
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.sitelist = [];
                            for (var i = 0; i < res.subsiteList.length; i++) {
                                if (!(res.subsiteList[i].subsystem_id < 0)) {
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
                        'version_type': 1
                    },
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.$notify({
                                title: '成功',
                                message: res.info,
                                type: 'success'
                            });
                            vm.getServiceVersion_terminal();
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
            },
            getType(index) {
                var vm = this;
                var params = {
                    data: {},
                    successFn(res) {
                        if (res.rescode == 200) {
                            vm.typeList = res.version_list;
                            if (vm.typeList.length) {
                                vm.typeIndex = index;
                                if(vm.uploadList[index].version_support_type_id && vm.uploadList[index].version_support_type_id.length){
                                    vm.checkList = vm.uploadList[index].version_support_type_id;
                                    console.log(vm.checkList)
                                }else{
                                    vm.checkList = [];
                                }
                                
                                vm.typeDialog = true;
                            } else {
                                vm.$notify({
                                    title: '提示',
                                    message: '暂无文件类型',
                                    type: 'info'
                                });
                            }
                        } else {
                            vm.$notify({
                                title: '提示',
                                message: res.info,
                                type: 'info'
                            });
                        }
                    }
                }
                this.$store.dispatch("getType", params);
            },
            updateType() {
              
                var index = this.typeIndex;
                var checkList = this.checkList;
                var typeList = this.typeList;
                var type_id = [];
                var type_name = [];
                var chooseType = [];
                for (let i = 0; i < typeList.length; i++) {
                    for (let j = 0; j < checkList.length; j++) {
                        if (typeList[i].id == checkList[j]) {
                            type_name.push(typeList[i].name);
                            type_id.push(typeList[i].id);
                            var obj = {};
                            obj.name = typeList[i].name;
                            obj.id = typeList[i].id;
                            chooseType.push(obj);
                        }
                    }
                }
                this.uploadList[index].version_support_type_id = type_id;
                this.uploadList[index].version_support_type_name = type_name;
                this.uploadList[index].chooseType = chooseType;
                this.typeDialog = false;
            },
            deleteType(index1, index2, id, name) {
                var index_ = this.uploadList[index1].version_support_type_name.indexOf(name);
                this.uploadList[index1].version_support_type_name.splice(index_, 1);
                this.$set(this.uploadList, index1, this.uploadList[index1]);
                var index = this.uploadList[index1].version_support_type_id.indexOf(id);
                this.uploadList[index1].version_support_type_id.splice(index, 1);
                this.$set(this.uploadList, index1, this.uploadList[index1]);
                var chooseType = this.uploadList[index1].chooseType.splice(index2, 1);
                this.$set(this.uploadList, index1, this.uploadList[index1]);
                console.log(this.uploadList)
            }
        },
        created() {
            this.getServiceVersion_terminal();
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
