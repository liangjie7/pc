<template>
    <div class="el-row r-table">
        <div class="r-tb_header el-row r-row">
            <el-col :span="12" class="r-td">
                <label class="pc-checkbox">
                                            <div class="pc-checkbox_input is_checked">
                                              <span class="pc-checkbox_inner">
                                              </span>
                                            </div>
                                            <span class="pc-checkbox_label">全选</span>
                                        </label>
            </el-col>
            <el-col :span="6" class="r-td">
                文件大小
            </el-col>
            <el-col :span="6" class="r-td">
                修改日期
            </el-col>
        </div>
        <div class="r-tb_tbody el-row">
            <div class=" el-row r-row" v-for="(item,key) in rlist" :category_id="item.category_id" :material_id="item.material_id">
                <el-col :span="12" class="r_td">
                    <label class="pc-checkbox">
                                <div class="pc-checkbox_input">
                                    <span class="pc-checkbox_inner">
                                    </span>
                                </div>
                            </label>
                    <div class="r-icon" v-if="item.type_id ==9">
                        <!-- //电视剧 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==4">
                        <!-- //图片 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==3">
                        <!-- //电视剧 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==8">
                        <!-- //音频 -->
                        <img src="../../../../assets/img/video.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==1">
                        <!-- //电视剧 -->
                        <img src="../../../../assets/img/video.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==5">
                        <!-- //图片 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==6">
                        <!-- //apk -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==7">
                        <!-- //网页 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-icon" v-if="item.type_id ==10">
                        <!-- //单集电视剧 -->
                        <img src="../../../../assets/img/folder.png" />
                    </div>
                    <div class="r-name">
                        <a href="javascript:;" title="item.name">{{item.name}}</a>
                    </div>
                </el-col>
                <el-col :span="6" class="r_td">
                    <div class="r-size">36G</div>
                </el-col>
                <el-col :span="6" class="r_td">
                    <div class="r-date">2017-09-26 16:31</div>
                </el-col>
            </div>
            <!-- <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                <div class="pc-checkbox_input">
                                    <span class="pc-checkbox_inner">
                                    </span>
                                </div>
                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div>
                    <div class=" el-row r-row">
                        <el-col :span="12" class="r_td">
                            <label class="pc-checkbox">
                                                <div class="pc-checkbox_input">
                                                  <span class="pc-checkbox_inner">
                                                  </span>
                                                </div>
                                            </label>
                            <div class="r-icon">
                                <img src="../../../../assets/img/folder.png" />
                            </div>
                            <div class="r-name">
                                <a href="javascript:;" title="监狱资源">监狱资源</a>
                            </div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-size">36G</div>
                        </el-col>
                        <el-col :span="6" class="r_td">
                            <div class="r-date">2017-09-26 16:31</div>
                        </el-col>
                    </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            rlist: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        mounted() {
            window.onresize = function temp() {
                var timer;
                if (!timer) {
                    timer = true;
                    setTimeout(function() {
                        // var main = document.getElementById("main-content");
                        // var tool = document.getElementById("r-toolbar");
                        // var routeBar = document.getElementById("route-bar");
                        // var tb = document.getElementsByClassName("r-table")[0];
                        // var header = document.getElementsByClassName("r-tb_header")[0];
                        // main.clientHeight - tb.offsetTop
                        // console.log(main.clientHeight - tb.offsetTop - header.clientHeight);
                        // timer = false;
                    }, 500)
                }
            };
        }
    }
</script>

<style>

</style>
