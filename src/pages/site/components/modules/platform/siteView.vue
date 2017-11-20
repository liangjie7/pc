<template>
  <div class="platform-content_wrapper">
    <div class="site-general-wrapper">
      <div class="site-general green">
        <div class="info-intro">
          <span class="info" v-if="singleData.online">
            当前在线
          </span>
          <span class="info" v-else>
            当前离线
          </span>
          <span class="bg">
          </span>
        </div>
        <p class="general-title">平台状况</p>
      </div>
      <div class="site-general blue">
        <div class="info-intro">
          <ul class="info-list">
            <li>磁盘剩余：{{singleData.disk_free | chackInfo}}</li>
            <li>cpu 占用：{{singleData.subsystem_cpu | chackInfo}}</li>
            <li>内存容量：{{singleData.mem_total | chackInfo}}</li>
          </ul>
          <span class="bg"></span>
        </div>
        <p class="general-title">基本信息</p>
      </div>
      <div class="site-general orange">
        <div class="info-intro">
          <span class="info">{{singleData.online_days | chackInfo}}</span>
          <span class="bg"></span>
        </div>
        <p class="general-title">使用时长</p>
      </div>
      <div class="site-general purple">
        <div class="info-intro">
          <span class="info">{{singleData.version_num | chackInfo}}</span>
          <span class="bg"></span>
        </div>
        <p class="general-title">当前版本</p>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="charts-wrapper">
        <div class="charts">
          <div id="pieChart"></div>
          <div id="annularChart"></div>
        </div>
      </div>
      <div class="version-wrapper">
        <div class="newest-version" v-if="singleData.subsystem_uuid"> 
          <div class="subsystem_uuid">
            <span :title="singleData.subsystem_uuid">{{singleData.subsystem_uuid}}</span>
            <input type="text"  id="copy" :value="singleData.subsystem_uuid" readonly />
          </div> 
          <button class="copy"  @click="copy">复制密钥</button>
        </div>
        <p class="newest-version">最新版本：<span class="version_num">{{singleData.version_num | chackInfo}}</span></p>
        <div class="upgrade">
          <button class="pramary-btn" title="升级至最新版本">升级至最新版本</button>
        </div>
        <div class="update-header">
            <span style="width:30%;display:inline-block;">历史更新</span>
            <span style="width:45%;display:inline-block;">时间</span>
            <span style="width:20%;display:inline-block;">状态</span>
        </div>
        <ul class="updateHistory">
          <li v-for="item in updatelist" :key="item.version_id">
            <span style="width:30%;display:inline-block;" title="item.version_code">{{item.version_code}}</span>
            <span style="width:45%;display:inline-block;" title="item.update_time">{{item.update_time}}</span>
            <span style="width:20%;display:inline-block;">成功</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        singleData:this.$store.state.singleSiteinfo,
        codeShow:true,
        updatelist:[],
      }
    },
    methods: {
     
      charts() {
        let chart1 = this.$echarts.init(document.getElementById('pieChart'))
        // 绘制图表
        var option1 = {
          title: {
            text: '某站点用户访问来源',
            x: 'center',
            textStyle: {
              fontSize: "16",
              fontWeight: "normal"
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            itemWidth: 10,
            itemHeight: 10,
            padding: [30, 10],
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          color: ['#5196db', '#50acdb', '#f4e569', '#f29422', '#85c690', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['40%', '60%'],
            data: [{
                value: 335,
                name: '直接访问'
              },
              {
                value: 310,
                name: '邮件营销'
              },
              {
                value: 234,
                name: '联盟广告'
              },
              {
                value: 135,
                name: '视频广告'
              },
              {
                value: 1548,
                name: '搜索引擎'
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        chart1.setOption(option1);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('annularChart'))
        // 绘制图表
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          title: {
            text: '某站点用户访问来源',
            x: 'center',
            textStyle: {
              fontSize: "16",
              fontWeight: "normal"
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            itemWidth: 10,
            itemHeight: 10,
            padding: [30, 10],
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          color: ['#5196db', '#50acdb', '#f4e569', '#f29422', '#85c690', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '10',
                  fontWeight: 'normal'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
                value: 335,
                name: '直接访问'
              },
              {
                value: 310,
                name: '邮件营销'
              },
              {
                value: 234,
                name: '联盟广告'
              },
              {
                value: 135,
                name: '视频广告'
              },
              {
                value: 1548,
                name: '搜索引擎'
              }
            ]
          }]
        };
        myChart.setOption(option);
        this.chart1 = myChart;
        var vm = this;
        window.onresize = function() {
          myChart.resize();
          chart1.resize();
        }
      },
      copy() {
          var code = document.getElementById("copy");
          // window.clipboardData.setData("Text",code);
          // alert("复制密钥成功！");
          code.select();
          document.execCommand("Copy");
          alert("复制密钥成功！");
        
        
      },
      getUpdateHistory(){
        var vm = this;
        var params = {
          data:{
            'subsite_id':vm.$route.params.id
          },
          successFn(res){
            if(res.rescode == 200){
              vm.updatelist = res.version_list;
            
            }
          }
        };
        this.$store.dispatch("getVersionHistory",params);
      }
    },
    created(){
      this.getUpdateHistory();
    },
    mounted() {
      this.charts();
    },
    computed: {
      data() {
        return this.$store.state.singleSiteinfo
      }
    },
    watch: {
      data(val) {
        this.singleData = val
      },
      '$route' (to, from) {
        if(from.params.id != to.params.id){
          this.getUpdateHistory();
        }
      }
    },
    filters:{
      chackInfo(val){
        
        if(!val){
          return '暂无'
        }else{
          return val
        }
      }
    }
  }
</script>

<style>

</style>
