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
        <p class="newest-version">最新版本：<span>{{singleData.version_num | chackInfo}}</span></p>
        <div class="upgrade">
          <button>升级至最新版本</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        singleData:this.$store.state.singleSiteinfo
      }
    },
    methods: {
      pieChart() {
        // 基于准备好的dom，初始化echarts实例
      },
      annularChart() {
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
    },
    mounted() {
      var vm = this;
      this.annularChart();
      this.pieChart();
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
