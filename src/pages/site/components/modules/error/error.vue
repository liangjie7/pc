<template>
  <div id="error-content">
    <div id="errorStatistics">
      <p class="error-list"><label>总报错次数：</label><span>23</span></p>
      <p class="error-list"><label>本月报错次数：</label><span>10</span></p>
    </div>
    <el-table
      :data="tableData" class="error-table">
      <el-table-column
        prop="module"
        label="报错模块">
      </el-table-column>
      <el-table-column
        prop="action"
        label="操作">
      </el-table-column>
      <el-table-column
        prop="date"
        label="报错时间">
      </el-table-column>
      <el-table-column
        prop="content"
        label="报错内容">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tableData:[{
        module:"资源管理",
        action:"上传资源",
        date:"2017-10-20",
        content:"网络连接失败"
      },
      {
        module:"审核管理",
        action:"审核资源",
        date:"2017-11-01",
        content:"数据库连接失败"
      },
      {
        module:"版本管理",
        action:"下发服务器版本",
        date:"2017-11-03",
        content:"网络连接失败"
      },
      {
        module:"分享管理",
        action:"下载资源",
        date:"2017-11-05",
        content:"资源不存在",
      },{
        module:"平台运维",
        action:"子站点接入",
        date:"2017-11-08",
        content:"子站点停止接入"
      }]
    }
  }
}
</script>

<style>

</style>
