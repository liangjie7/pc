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
      <button class="upload r-button" v-if="material_mange_upload"><input type="file"  ref="file"  @change="upload($event)"  multiple="multiple"/><img src="../../../../assets/img/upload1.png" class="icon" /><span class="label" >上传资源</span></button>
      <el-dialog title="下发至子站点" :visible.sync="subsite_Visible">
        <el-table :data="subsiteList" max-height="300" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column property="subsystem_name" label="站点名称" width="150" sortable></el-table-column>
          <el-table-column property="subsystem_mac" label="站点mac" width="200" sortable></el-table-column>
          <el-table-column property="subsystem_address" label="地址" sortable></el-table-column>
        </el-table>
        <el-button type="primary" class="issued-confirm" @click="issued_material">下发</el-button>
      </el-dialog>
      <button class="r-button r-btn-style" v-if="material_mange_issued" @click="getSite"><img src="../../../../assets/img/download.png" class="icon" /><span class="label" >下发资源</span></button>
      <div class="addFile-wrapper" @click="showFileFn()">
        <button class="r-button r-btn-style" v-show="((material_mange_addClass || material_mange_upload) &&type_id !=9)"><img src="../../../../assets/img/build.png" class="icon" /><span class="label" >新建文件</span></button>
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
        <span class="ellipsis-route" v-show="ellipsis_route">
                <a href="javascript:;">...</a>
                <span><img src="../../../../assets/img/arrow.png" /></span>
        </span>
        <span class="bread-route" v-show="!ellipsis_route">
                <a href="javascript:;" @click="changeRoute(-1)">全部文件</a>
                <span><img src="../../../../assets/img/arrow.png" /></span>
        </span>
        <span v-for="(item,key) in route_" class="bread-route" :key="item.name">
            <a href="javascript:;" :title="item.name" @click="changeRoute(item.mid)">{{item.name}}</a>
            <span><img src="../../../../assets/img/arrow.png" /></span>
        </span>
      </div>
      <el-input placeholder="输入关键字" icon="search" class="r-search" v-model="search_data2" @blur="initResourceList" :on-icon-click="initResourceList" @keyup.enter.native="initResourceList">
      </el-input>
      <el-popover ref="sort-popover" placement="bottom" width="100" v-model="sortVisible" class="sort-popover">
        <div class="resource-sort">
          <a href="javascript:;" @click="sortType('updatetime')" :class="{'sort':sort_name == 'updatetime'}">修改日期</a>
          <a href="javascript:;" @click="sortType('name')" :class="{'sort':sort_name == 'name'}">文件名称</a>
          <a href="javascript:;" @click="sortType('size')" :class="{'sort':sort_name == 'size'}">文件大小</a>
        </div>
      </el-popover>
      <div class="sort" title="排序" v-popover:sort-popover></div>
      <div href="javascipt:;" class="list" title="" @click="changeView"></div>
      <!-- <div href="javascipt:;" class="fresh" title="刷新"></div> -->
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
          <li v-for="(item,key) in uploadList" :key="key">
            <div class="icon"><img src="../../../../assets/img/folder.png"></div><span class="upload-name">{{item.name}}</span><span class="progress-wrapper"><span  class="progress" :style="'width:' + progressList[key] + '%'" :class="{'finished':finished}"></span></span>
            <a class="abort" v-show="progressList[key] != 100 && !finished" href="javascript:;" @click="abort(key)">X</a>
          </li>
        </ul>
      </div>
    </transition>
    <router-view :rlist="resourceList" @get_rid="getIdFromChild" @reload="childInitrsource" :parentMaterialid="material_id" :parentTypeid="type_id"></router-view>
  </div>
</template>

<script>
  import List from "./list";
  import Grid from "./grid";
  import tree from './dialogList.vue'
  import axios from 'axios'
  export default {
    data() {
      return {
        search_data1: '', //下拉选择类型
        search_data2: '', //关键字搜索
        currentView: 'List',
        material_mange_upload: false, //上传
        material_mange_issued: false, //下发
        material_mange_addClass: false, //新建分类
        material_mange_delClass: false, //删除分类
        material_mange_delMaterial: false, //删除资源
        material_mange_updateMaterial: false, //编辑资源
        uploadList: [], //上传的列表
        upl_list: [], //记录xhr
        progressList: [], //记录上传的progress
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
        material_id: -1,
        type_id: 11, //当前目录的typeid
        resourceList: [],
        sortVisible: false, //排序是否可见
        category_id: "-1",
        sort_name: "updatetime",
        sort_type: "down",
        subsite_Visible: false, //下发子监狱列表是否可见
        subsiteList: [],
        resource_id: [],
        siteList: [], //下发选择的监狱
        issued_list: [],
        route_: [],
        ellipsis_route: false,
        allFile: true,
        upload_info: '', //上传结果信息
        finished: false,
        loading: true
      }
    },
    methods: {
      //下发
      issued_material() {
        if (!this.siteList.length) {
          this.$notify({
            title: '提示',
            message: '请勾选要下发的站点',
            type: 'info'
          });
          return
        }
        var vm = this;
        if (this.$route.name == 'list') {
          $(".tb-list .is_checked").each(function() {
            var that = $(this).parents(".tb-list")
            var obj = {};
            if (that.attr('type_id') == 9) {
              obj.is_series = true;
              obj.count = that.attr("count");
            } else {
              obj.is_series = false;
              obj.count = 0;
            }
            obj.material_id = that.attr("material_id");
            vm.issued_list.push(obj)
          })
        } else {
          $(".grid-block.is_checked").each(function() {
            var obj = {};
            if ($(this).attr('tid') == 9) {
              obj.is_series = true;
              obj.count = $(this).attr("count");
            } else {
              obj.is_series = false;
              obj.count = 0;
            }
            obj.material_id = $(this).attr("mid");
            vm.issued_list.push(obj)
          })
        }
        var vm = this;
        var params = {
          data: {
            'issued_list': JSON.stringify(vm.issued_list),
            'subsystem_ids': JSON.stringify(vm.siteList)
          },
          successFn(res) {
            if (res.rescode == 200) {
              vm.$notify({
                title: '成功',
                message: '下发成功！',
                type: 'success'
              });
              vm.subsite_Visible = false;
            }
          }
        }
        this.$store.dispatch('issued_material', params)
      },
      handleSelectionChange(val) { //勾选下发的监狱列表
        this.siteList = [];
        for (let value of val) {
          this.siteList.push(value.subsystem_id);
        }
      },
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
        if (!e.target.files.length) {
          return
        }
        var vm = this;
        if (this.uploadSuccess == false) {
          this.$refs.file.value = ""
          this.$notify({
            title: '提示',
            message: '请等待所有资源上传完成！',
            type: 'info'
          });
          vm.showlistBtn = true;
          vm.showlist = true;
          return
        } else {
          vm.uploadList = [];
          this.$store.state.uploadedCount = [];
          vm.upl_list = [], //记录xhr
            vm.progressList = []
        };
        // FormData 对象
        var vm = this;
        var items = e.target.files;
        vm.finished = false;
        for (let i = 0; i < items.length; i++) {
          this.uploadSuccess = false;
          var form = new FormData();
          form.append("SelectedFile", items[i]); // 文件对象
          let xhr = new XMLHttpRequest();
          vm.upl_list.push(xhr)
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              let data_ = JSON.parse(xhr.responseText);
              data_.category_id = vm.category_id;
              if (data_.type_id == 9) {
                data_.type_id = 10;
              }
              var params = {
                'data': {
                  'action': 'add',
                  'data': JSON.stringify(data_),
                },
                successFn(res) {
                  if (res.rescode == 200) {
                    vm.$store.commit('getUploadCount');
                    vm.upload_info = res.info;
                  }
                }
              }
              vm.$store.dispatch('uploadToService', params)
            }
          }
          xhr.open("post", '/upload', true);
          let j =i;
          vm.upl_list[j].upload.onprogress = function(e) {
            if (e.lengthComputable) {
              var loaded = event.loaded / event.total * 100;
              loaded = loaded.toFixed(2);
              console.log(j)
              vm.progressList.splice(j, 1, loaded);
              console.log(vm.progressList)
            }
          }
          vm.uploadList.push(items[i]);
          vm.showlistBtn = true;
          vm.showlist = true; //侧边上传的div
          
          xhr.send(form);
          
        }
        // if (!e.target.files.length) {
        //   return
        // }
        // var vm = this;
        // if (this.uploadSuccess == false) {
        //   this.$notify({
        //     title: '提示',
        //     message: '请等待所有资源上传完成！',
        //     type: 'info'
        //   });
        //   vm.showlistBtn = true;
        //   vm.showlist = true;
        //   return
        // } else {
        //   vm.uploadList = [];
        //   this.$store.state.uploadedCount = [];
        //   vm.finished
        // };
        // var items = e.target.files;
        // if (items.length > 0) {
        //   vm.showlistBtn = true;
        //   vm.showlist = true;
        // }
        // for (let i = 0; i < items.length; i++) {
        //   vm.uploadList.push(items[i]);
        //   var form = new FormData();
        //   form.append("SelectedFile", items[i]);
        //   var info = {
        //     'data': form,
        //     key: i,
        //     successFn(res) {
        //       if (res.rescode == 200) {
        //         res.category_id = vm.category_id;
        //         if (vm.type_id == 9) {
        //           res.type_id = 10;
        //         }
        //         var params = {
        //           'data': {
        //             'action': 'add',
        //             'data': JSON.stringify(res),
        //           },
        //           successFn(res) {
        //             if (res.rescode == 200) {
        //               vm.$store.commit('getUploadCount');
        //               vm.upload_info = res.info;
        //             }
        //           }
        //         }
        //         vm.$store.dispatch('uploadToService', params)
        //       }
        //     }
        //   }
        //   this.$store.dispatch('upload', info)
        // }
      },
      abort(index) {
        this.upl_list[index].abort();
        this.progressList.splice(index, 1);
        this.uploadList.splice(index, 1);
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
              vm.initResourceList();
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
        if (vm.type_id != 9) {}
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
              vm.initResourceList()
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
        if ((vm.sort_name != "") && (vm.sort_type != "")) {
          data.sort_data = JSON.stringify([{
            'sort_name': vm.sort_name,
            'sort_type': vm.sort_type,
          }]);
        }
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
      },
      sortType(name) {
        this.sort_name = name;
        if (this.sort_type == 'up') {
          this.sort_type = 'down'
        } else {
          this.sort_type = 'up'
        }
        this.initResourceList()
      },
      //获取下发的子站点列表
      getSite() {
        if (!this.resource_id.length) {
          this.$notify({
            title: '提示',
            message: '请先勾选资源',
            type: 'info'
          });
          return
        }
        var vm = this;
        var params = {
          successFn(res) {
            if (res.rescode == 200) {
              vm.subsiteList = res.subsiteList;
              if (!vm.subsiteList.length) {
                this.$notify({
                  title: '提示',
                  message: '请先添加站点信息',
                  type: 'info'
                });
              } else {
                vm.subsite_Visible = true;
              }
            }
          }
        }
        this.$store.dispatch('manage_subsite', params);
      },
      //从子组件获取勾选的id
      getIdFromChild(idArr) {
        this.resource_id = idArr
      },
      childInitrsource(val) {
        this.initResourceList()
      },
      changeRoute(mid) {
        if (mid != -1) {
          var path = JSON.parse(this.$route.query.path);
          for (var i = 0; i < path.length; i++) {
            if (path[i].mid == mid) {
              path.splice(i + 1)
              this.$router.push({
                path: this.$route.name,
                query: {
                  path: JSON.stringify(path)
                }
              });
              return
            }
          }
        } else {
          this.$router.push({
            path: this.$route.name,
          });
        }
      },
    },
    mounted() {
      this.initResourceList()
    },
    created() {
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
        this.getAuth(val); //权限
      },
      progress(arr) {
        this.pro = arr; //上传进度
      },
      count(val) {
        var vm = this;
        if (val.length == this.uploadList.length) {
          vm.finished = true;
          this.$refs.file.value = ""
          this.uploadSuccess = true;
          this.initResourceList();
          this.$notify({
            title: '成功',
            message: vm.upload_info,
            type: 'success'
          });
        }
        this.counted = val.length; //上传数量
      },
      $route(to, from) {
        var vm = this;
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
        $(".checkedAll").removeClass("is_checked");
        $(".pc-checkbox_input_all").removeClass("is_checked");
        if (this.$route.query.path) {
          var path = JSON.parse(this.$route.query.path);
          this.route_ = [];
          if (path.length > 3) {
            for (var i = path.length - 3; i < path.length; i++) {
              this.route_.push(path[i])
            }
            vm.ellipsis_route = true;
          } else {
            for (var i = 0; i < path.length; i++) {
              this.route_.push(path[i])
            }
            vm.ellipsis_route = false;
          }
        } else {
          this.route_ = [];
          vm.ellipsis_route = false;
        }
      }
    },
    components: {
      List,
      Grid,
      tree
    },
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
