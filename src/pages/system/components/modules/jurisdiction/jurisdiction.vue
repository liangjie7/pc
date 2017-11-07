<template>
  <div class="content-wrapper">
    <section class="right-group_wrapper">
      <div class="right-group_header">
        <div class="right-tool">
          <a href="javascript:;" title="编辑"><img src="../../../../assets/img/edit-icon.png" alt="编辑"></a>
          <a href="javascript:;" title="移动"><img src="../../../../assets/img/move-icon.png" alt="移动"></a>
          <a href="javascript:;" title="删除"><img src="../../../../assets/img/delete-icon.png" alt="删除"></a>
        </div>
        <button class="addUserGroup" title="添加组">添加组</button>
      </div>
      <div class="userGroup">
        <div>
          <div class="one_group" :class="{'is_checked':is_group == 1,'no_checked':is_group != 1,'is_target':is_target == 1}" @click.stop.prevent="getGroupdetail(1,1)">
            <span class="group-name">
                  <span class="icon" ></span>
            <span class="group-title" title="分组名">分组名</span>
            </span>
            <span class="group-count">组员：20</span>
          </div>
          <div v-show="is_group == 1 && is_open" class="adduser-wrapper">
            <el-checkbox  size="small">全选</el-checkbox><el-button type="primary" size="mini">添加用户</el-button>
          </div>
          <transition name="fade">
            <ul v-show="is_group == 1 && is_open">
              <li class="one_group  on-group_user" :class="{'is_checked':is_group == 1,'no_checked':is_group != 2,'is_target':is_target == 2}" > <el-checkbox  size="small"></el-checkbox><span class="user_name">宽度框数据库的</span></li>
              <li class="one_group  on-group_user" :class="{'is_checked':is_group == 1,'no_checked':is_group != 3,'is_target':is_target == 3}" > <el-checkbox  size="small"></el-checkbox><span class="user_name">宽度框数据库的</span></li>
            </ul>
          </transition>
        </div>
        <div>
          <div class="one_group" :class="{'is_checked':is_group == 6,'no_checked':is_group != 6,'is_target':is_target ==6}" @click.stop.prevent="getGroupdetail(6,6)">
            <span class="group-name">
                  <span class="icon" ></span>
            <span class="group-title" title="分组名">分组名2</span>
            </span>
            <span class="group-count">组员：20</span>
          </div>
          <div v-show="is_group == 6 && is_open" class="adduser-wrapper">
            <el-checkbox  size="small">全选</el-checkbox><el-button type="primary" size="mini">添加用户</el-button>
          </div>
          <transition name="fade">
            <ul v-show="is_group == 6 && is_open">
              <li class="one_group on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 4,'is_target':is_target == 4}" @click.stop.prevent="getGroupdetail(6,4)">拉克丝</li>
              <li class="one_group  on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 5,'is_target':is_target == 5}" @click.stop.prevent="getGroupdetail(6,5)">拉克丝</li>
               <li class="one_group on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 4,'is_target':is_target == 4}" @click="getGroupdetail(6,4)">拉克丝</li>
              <li class="one_group  on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 5,'is_target':is_target == 5}" @click="getGroupdetail(6,5)">拉克丝</li>
               <li class="one_group on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 4,'is_target':is_target == 4}" @click="getGroupdetail(6,4)">拉克丝</li>
              <li class="one_group  on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 5,'is_target':is_target == 5}" @click="getGroupdetail(6,5)">拉克丝</li>
               <li class="one_group on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 4,'is_target':is_target == 4}" @click="getGroupdetail(6,4)">拉克丝</li>
              <li class="one_group  on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 5,'is_target':is_target == 5}" @click="getGroupdetail(6,5)">拉克丝</li>
               <li class="one_group on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 4,'is_target':is_target == 4}" @click="getGroupdetail(6,4)">拉克丝</li>
              <li class="one_group  on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 5,'is_target':is_target == 5}" @click="getGroupdetail(6,5)">拉克丝</li>
               <li class="one_group on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 4,'is_target':is_target == 4}" @click="getGroupdetail(6,4)">拉克丝</li>
              <li class="one_group  on-group_user" :class="{'is_checked':is_group == 6,'no_checked':is_group != 5,'is_target':is_target == 5}" @click="getGroupdetail(6,5)">拉克丝</li>
            </ul>
          </transition>
        </div>
      </div>
    </section>
    <section class="right-detail"></section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        is_group: -1, //选中的组id
        is_target: -1, //选中的目标的id
        is_open :true,//是否打开
      }
    },
    methods: {
      getGroupdetail(groupId, targetId) {
        let oldId = this.is_group;
        this.is_group = groupId;
        this.is_target = targetId;
        if(oldId == groupId && targetId == groupId ){
          this.is_open = false;
          this.is_group = -1;
          this.oldId = -1;
        }else{
           this.is_open = true;
        }
      }
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0s;
    transition: opacity 0s;
  }
</style>
