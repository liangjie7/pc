<template>
    <div class="version-wrapper">
        <el-dialog title="新增版本" :visible.sync="versionDialog" :close-on-click-modal="false" custom-class="versionDialog">
            <el-input placeholder="填写最新的版本号" class="version_num" size="small" v-model="version_code"></el-input>
            <ul class="versionList">
                <li v-for="(item,index) in uploadList" :key="item.name">
                    <div class="version_info"><span class="version_title">文件信息</span><span class="version_name" :title="item.name">{{item.name}}</span><span class="version_size">13.3MB</span><a href="javascript:;" class="delete" @click="deleteVersion(index)">删除</a></div>
                </li>
            </ul>
            <div>
                <button class="upload"><input type="file"ref="file" multiple="multiple" @change="upload_web($event)"/><span class="label">上传资源</span></button>
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
            <el-col :span="6">
                <div class="grid-content ">版本编号</div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content ">上传时间</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">上传者</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">版本详情</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">下发升级</div>
            </el-col>
        </el-row>
        <div class="version-tbody">
            <el-row class="version-tr">
                <el-col :span="6">
                    <div class="grid-content ">201912912</div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ">数据库接</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content ">1.0G</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content "><button>查看详情</button></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content "><button>下发升级</button></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                versionDialog: false,
                uploadList: [],
                version_code: "",
                content: ""
            }
        },
        methods: {
            openNewVersion() {
                this.versionDialog = true;
            },
            upload_web(e) {
                var vm = this;
                var items = e.target.files;
                console.log(items)
                for (var i = 0; i < items.length; i++) {
                    vm.uploadList.push(items[i]);
                }
            },
            upload() {
                var vm = this;
                var resources = [];
                var items = vm.uploadList;
                for (let i = 0; i < items.length; i++) {
                    var form = new FormData();
                    form.append("SelectedFile", items[i]);
                    form.append("custom_file_type", 'version');
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var obj = {};
                            let data_ = JSON.parse(xhr.responseText);
                            obj.version_name = items[i].name;
                            obj.resource_id = data_.resource_id;
                            resources.push(obj);
                            // obj.version_support_type_id = items[i].name;
                            // obj.version_support_type_name = items[i].name;
                            if (i + 1 == vm.uploadList.length) {
                                var params = {
                                    data: {
                                        'resources': JSON.stringify(resources),
                                        'version_code': vm.version_code,
                                        'content': vm.content,
                                    },
                                    successFn(res) {
                                        console.log(res);
                                    }
                                }
                                vm.$store.dispatch('addNewVersion_terminal', params);
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
            }
        },
        created() {},
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
