<template>
    <div class="version-wrapper">
        <el-dialog title="新增版本" :visible.sync="versionDialog" :close-on-click-modal="false" custom-class="versionDialog">
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
        <div class="version-tbody">
            <el-row class="version-tr" v-for="item in version_list" :key="item.version_id">
                <el-col :span="4">
                    <div class="grid-content ">{{item.version_code}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content ">{{item.version_name}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content ">{{item.version_size | bytesToSize}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content ">{{item.user_name}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content " v-html="item.create_time">1017/10/11</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content "><a href="javascript:;" class="checkDetail">查看详情</a></div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content "><button>下发</button></div>
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
                // version_name: "",
                content: "",
            }
        },
        methods: {
            openNewVersion(){
                this.value = "";
                this.version_code = "";
                // this.version_name = "";
                this.content = "";
                this.uploadList = [];
                this.versionDialog = true;
                
            },
            getServiceVerison() {
                var vm = this;
                var params = {
                    data: {},
                    successFn(res) {
                        console.log(res);
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
                console.log(vm.value)
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
                for (let i = 0; i < items.length; i++) {
                    var form = new FormData();
                    form.append("SelectedFile", items[i]);
                    form.append("custom_file_type", 'version');
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            console.log(JSON.parse(xhr.responseText))
                            let data_ = JSON.parse(xhr.responseText);
                        
                            let last_id;
                            if(vm.value == ""){
                                last_id = -1
                            }else{
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
                                    console.log(res)
                                    if (res.rescode == 200) {
                                        vm.$notify({
                                            title: '成功',
                                            message: res.info,
                                            type: 'success'
                                        });
                                        vm.$refs.file.value = ""
                                        vm.getServiceVerison();
                                        vm.versionDialog = false;
                                    }
                                }
                            }
                            vm.$store.dispatch('addNewVersion', params);
                        }
                    }
                    xhr.open("post", '/upload', true);
                    xhr.send(form);
                }
            },
            deleteVersion(){
                if(this.uploadList[0].resource_id){

                }else{
                    this.uploadList = [];
                }
                this.$refs.file.value = "";
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
