<template>
  <div id="resource-content">
    <div id="r-toolbar">
      <el-select placeholder="请选择" v-model="search_data1" class="r-select r-btn-style" @change="initResourceList">
        <el-option label="全部" value=""></el-option>
        <el-option label="图片" value="4"></el-option>
        <el-option label="视频" value="1"></el-option>
        <el-option label="音频" value="8"></el-option>
        <el-option label="pdf" value="3"></el-option>
        <el-option label="电视剧" value="9"></el-option>
        <el-option label="资源分类" value="11"></el-option>
      </el-select>
      <button class="upload r-button" v-if="material_mange_upload"><input type="file" @change="upload($event)"  multiple="multiple"/><img src="../../../../assets/img/upload1.png" class="icon" /><span class="label" >上传资源</span></button>
      <button class="r-button r-btn-style" v-if="material_mange_issued"><img src="../../../../assets/img/download.png" class="icon" /><span class="label" >下发资源</span></button>
      <div class="addFile-wrapper" @click="showFileFn()" >
        <button class="r-button r-btn-style"  v-show="(material_mange_addClass || material_mange_upload)"><img src="../../../../assets/img/build.png" class="icon" /><span class="label" >新建文件</span></button>
        <transition name="fade">
          <div class="addFile" v-show="showFileBtn && (material_mange_addClass  || material_mange_upload)">
            <a href="javascript:;" v-show="material_mange_addClass" @click.stop.prevent="file_dialogFormVisible = true">新建文件夹</a>
            <a href="javascript:;" v-show="material_mange_upload" @click.stop.prevent="series_dialogFormVisible = true ">新建电视剧</a>
          </div>
        </transition>
      </div>
      <!-- <button class="r-button r-btn-style"><img src="../../../../assets/img/more.png" class="icon" /><span class="label">更多选择</span></button> -->
      <div class="showList" @click="showList()" v-if="showlistBtn">上传列表</div>
    </div>
    <div id="route-bar" class="el-row">
      <div href="javascript:;" class="reback" title="返回" @click="reback"></div>
      <div class="route-wrapper">
        <span>
              <a href="javascript:;">全部文件</a>
              <span><img src="../../../../assets/img/arrow.png" ></span>
        </span>
        <span>
            <a href="javascript:;">文件夹</a>
            <span><img src="../../../../assets/img/arrow.png" ></span>
        </span>
      </div>
      <el-input placeholder="输入关键字" icon="search" class="r-search" v-model="search_data2" @blur="initResourceList" :on-icon-click="initResourceList">
      </el-input>
      <el-popover ref="sort-popover" placement="top" width="160" v-model="sortVisible">
      </el-popover>
      <div class="sort" title="排序" v-popover:sort-popover></div>
      <div href="javascipt:;" class="list" title="" @click="changeView"></div>
      <div href="javascipt:;" class="fresh" title="刷新"></div>
    </div>
    <el-dialog title="新建电视剧" :visible.sync="series_dialogFormVisible" class="series-dialog" size="tiny">
      <el-form :model="seriesForm">
        <el-form-item label="电视剧名称" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="seriesForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_dialog()">取 消</el-button>
        <el-button type="primary" @click="addSeries(9)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建文件夹" :visible.sync="file_dialogFormVisible" class="series-dialog" size="tiny">
      <el-form :model="fileForm">
        <el-form-item label="文件夹名称" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="fileForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_dialog()">取 消</el-button>
        <el-button type="primary" @click="addFile(11)">确 定</el-button>
      </div>
    </el-dialog>
    <transition name="slide-fade">
      <div class="upload-wrapper" v-show="showlist">
        <div class="upload-header">
          <span class="upload-all">总共上传数：{{uploadList.length}}</span>
          <span class="uploaded">已上传数：{{counted}}</span>
        </div>
        <ul class="upload-list">
          <li v-for="(item,key) in uploadList">
            <div class="icon"><img src="../../../../assets/img/folder.png"></div><span class="upload-name">{{item.name +'--'+ pro[key]}}</span><span class="progress-wrapper"><span  class="progress" :style="'width:' + pro[key] + '%'"></span></span><span class="abort" v-show="pro[key] != 100">X</span></li>
        </ul>
      </div>
    </transition>
    <router-view :rlist="resourceList"></router-view>
  </div>
</template>

<script>
  import List from "./list";
  import Grid from "./grid"
  export default {
    data() {
      return {
        search_data1: '', //下拉选择类型
        search_data2: '', //关键字搜索
        currentView: 'List',
        // childAuth:this.$store.state.auth,
        material_mange_upload: false, //上传
        material_mange_issued: false, //下发
        material_mange_addClass: false, //新建分类
        material_mange_delClass: false, //删除分类
        material_mange_delMaterial: false, //删除资源
        material_mange_updateMaterial: false, //编辑资源
        uploadList: [],
        pro: [],
        uploadedCount: this.$store.state.uploadedCount,
        counted: 0,
        showlist: false,
        showlistBtn: false,
        uploadSuccess: true,
        showFileBtn: false,
        formLabelWidth: '100px',
        seriesForm: {
          name: ''
        },
        fileForm: {
          name: ''
        },
        series_dialogFormVisible: false, //电视剧弹出框
        file_dialogFormVisible: false, //目录弹出框
        material_id: '-1',
        type_id: '11',
        resourceList: [],
        sortVisible: false, //排序是否可见
        category_id: "-1"
      }
    },
    methods: {
      changeView() {
        var path = this.$route.path;
        var lastpath = path.split("/")[path.split("/").length - 1];
        if (lastpath == 'list') {
          var queryvalue = this.$route.query;
          if (queryvalue.path != "") {}
          this.$router.push({
            path: "grid",
            query: queryvalue
          });
        } else {
          this.$router.push({
            path: "list"
          });
        }
      },
      upload(e) {
        var vm = this;
        if (this.uploadSuccess == false) {
          this.$notify({
            title: '警告',
            message: '请等待所有资源上传完成！',
            type: 'warning'
          });
          vm.showlistBtn = true;
          vm.showlist = true;
          return
        } else {
          vm.uploadList = [];
        };
        var items = e.target.files;
        if (items.length > 0) {
          vm.showlistBtn = true;
          vm.showlist = true;
        }
        for (let i = 0; i < items.length; i++) {
          vm.uploadList.push(items[i]);
          var form = new FormData();
          form.append("SelectedFile", items[i]);
          var info = {
            'data': form,
            key: i,
            successFn(res) {
              if (res.rescode == 200) {
                res.category_id = vm.category_id;
                if (vm.type_id == 9) {
                  res.series_id = vm.material_id;
                  res.type_id = 10;
                }
                var params = {
                  'data': {
                    'action': 'add',
                    'data': JSON.stringify(res),
                  },
                  successFn(res) {
                    if (res.rescode == 200) {}
                  }
                }
                vm.$store.dispatch('uploadToService', params)
              }
            }
          }
          this.$store.dispatch('upload', info)
        }
      },
      getAuth(arr) {
        if (arr.length) {
          for (let val of arr) {
            if (val.auth_code == 'material_mange_upload') {
              this.material_mange_upload = true;
            }
            if (val.auth_code == 'material_mange_issued') {
              this.material_mange_issued = true;
            }
            if (val.auth_code == 'material_mange_addClass') {
              this.material_mange_addClass = true;
            }
            if (val.auth_code == 'material_mange_delClass') {
              this.material_mange_delClass = true;
            }
            if (val.auth_code == 'material_mange_delMaterial') {
              this.material_mange_delMaterial = true;
            }
            if (val.auth_code == 'material_mange_updateMaterial') {
              this.material_mange_updateMaterial = true;
            }
          }
        }
      },
      showList() {
        this.showlist = !this.showlist;
      },
      showFileFn() {
        this.showFileBtn = !this.showFileBtn;
      },
      addFile(typeid) { //文件夹typeid=11
        var vm = this;
        if (vm.fileForm.name == "") {
          vm.$notify({
            title: '提示',
            message: '请输入文件夹名称',
            type: 'warning'
          });
          return;
        }
        var params = {
          'data': {
            data: JSON.stringify({
              'type_id': typeid,
              'name': vm.fileForm.name,
              'category_id': vm.category_id
            })
          },
          successFn(res) {
            if (res.rescode == 200) {
              vm.$notify({
                title: '成功',
                message: '新建文件夹成功',
                type: 'success'
              });
              vm.fileForm.name = "";
              vm.showFileBtn = false;
              vm.file_dialogFormVisible = false;
            } else {
              vm.$notify({
                title: '失败',
                message: '新建文件夹失败',
                type: 'error'
              });
            }
          }
        }
        this.$store.dispatch('addFile_', params);
      },
      addSeries(typeid) { //文件夹typeid=9
        var vm = this;
        if (vm.type_id != 9) {
          
        }
        if (vm.seriesForm.name == "") {
          vm.$notify({
            title: '提示',
            message: '请输入电视剧名称',
            type: 'warning'
          });
          return;
        }
        var params = {
          'data': {
            data: JSON.stringify({
              'type_id': typeid,
              'name': vm.seriesForm.name,
              'category_id': vm.category_id
            })
          },
          successFn(res) {
            if (res.rescode == 200) {
              vm.$notify({
                title: '成功',
                message: '新建电视剧成功',
                type: 'success'
              });
              vm.series_dialogFormVisible = false;
              vm.showFileBtn = false;
              vm.seriesForm.name = "";
            } else {
              vm.$notify({
                title: '失败',
                message: '新建电视剧失败',
                type: 'error'
              });
            }
          }
        }
        this.$store.dispatch('addSeries_', params);
      },
      cancel_dialog() {
        this.seriesForm.name = "";
        this.fileForm.name = "";
        this.series_dialogFormVisible = false;
        this.file_dialogFormVisible = false;
        this.showFileBtn = false;
      },
      initResourceList() {
        var vm = this;
        var data;
        if (vm.material_id == -1) {
          data = {
            'parent_type_id': 11,
            'parent_material_id': vm.material_id,
            'type_id': vm.search_data1
          }
        } else {
          data = {
            'parent_type_id': vm.type_id,
            'parent_material_id': vm.material_id,
            'type_id': vm.search_data1
          }
        }
        data.search_data = JSON.stringify({
          'name': vm.search_data2,
          'size': vm.search_data2,
          'updatetime': vm.search_data2
        });
        var params = {
          data,
          successFn(res) {
            if (res.rescode == 200) {
              vm.resourceList = res.content;
            }
          }
        }
        this.$store.dispatch('getRsourceList', params)
      },
      selectChange() {
        this.initResourceList()
      },
      reback() {
        var queryArr = this.$route.query.path;
        if (queryArr && queryArr != "[]") {
          var arr = JSON.parse(queryArr);
          arr.pop();
          if (arr.length > 0) {
            this.$router.push({
              path: this.$route.name,
              query: {
                path: JSON.stringify(arr)
              }
            });
          } else {
            this.$router.push({
              path: this.$route.name,
            });
          }
         
        }
      }
    },
    mounted() {
      this.initResourceList()
    },
    created() {
      // this.auth = this.$store.state.auth;
      var vm = this;
    },
    computed: {
      auth() {
        return this.$store.state.auth
      },
      progress() {
        return this.$store.state.loaded
      },
      count() {
        return this.$store.state.uploadedCount
      }
    },
    watch: {
      auth(val) {
        this.getAuth(val);
      },
      progress(arr) {
        this.pro = arr;
      },
      count(val) {
        if (val.length == this.uploadList.length) {
          this.uploadSuccess = true;
          this.$notify({
            title: '成功',
            message: (val.length) + '条资源上传成功',
            type: 'success'
          });
        }
        this.counted = val.length;
      },
      $route(to, from) {
        var query = this.$route.query.path;
        if (query && query != "[]") {
          query = JSON.parse(query);
          this.material_id = query[query.length - 1].mid;
          this.type_id = query[query.length - 1].tid;
          this.category_id = query[query.length - 1].cid
        } else {
          this.material_id = -1;
          this.type_id = 11;
          this.category_id = -1;
        }
        this.initResourceList();
      }
    },
    components: {
      List,
      Grid
    },
    // beforeRouteUpdate(to, from, next) {
    //   console.log(this.$route.query.path)
    // }
  }
</script>

<style lang="scss">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter,
  .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-to
  /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0
  }
</style>
