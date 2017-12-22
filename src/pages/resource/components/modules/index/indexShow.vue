<template>
  <div id="index-wrapper">
    <div class="site-general-wrapper">
      <div class="site-general purple">
        <div class="info-intro">
          <div class="info-intro">
            <ul class="info-list">
              <li>总文件数：10G</li>
              <li>总文件大小：20G</li>
            </ul>
            <span class="bg"></span>
          </div>
        </div>
        <p class="general-title">文件总览</p>
      </div>
      <div class="site-general blue">
        <div class="info-intro">
          <div class="info-intro">
            <ul class="info-list">
              <li>本周上传文件：10G</li>
              <li>本月上传文件：20G</li>
            </ul>
            <span class="bg"></span>
          </div>
        </div>
        <p class="general-title">文件上传</p>
      </div>
      <div class="site-general green">
        <div class="info-intro">
          <div class="info-intro">
            <ul class="info-list">
              <li>本周下发文件：10G</li>
              <li>本月下发文件：20G</li>
            </ul>
            <span class="bg"></span>
          </div>
        </div>
        <p class="general-title">文件下发</p>
      </div>
      <div class="site-general orange">
        <div class="info-intro">
          <div class="info-intro">
            <ul class="info-list">
              <li>本周分享文件：10G</li>
              <li>本月分享文件：20G</li>
            </ul>
            <span class="bg"></span>
          </div>
        </div>
        <p class="general-title">监区分享</p>
      </div>
    </div>
    <div class="charts-wrapper">
      <div id="pieChartWrapper">
        <div id="pieChart"></div>
      </div>
      <div id="barChartWrapper">
        <div id="barChart"></div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="latest-statistics">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      drawCharts() {
        $("#pieChartWrapper").hide();
        $("#pieChartWrapper").show();
        let chart1 = this.$echarts.init(document.getElementById('pieChart'))
        // 绘制图表
        var option1 = {
          title: {
            text: '当前资源数量比重',
            x: 'center',
            textStyle: {
              fontSize: "16",
              fontWeight: "normal",
              color: "#ddd"
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: ['#5196db', '#50acdb', '#f4e569', '#f29422', '#85c690', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          series: [{
            name: '资源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
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
        let chart2 = this.$echarts.init(document.getElementById('barChart'))
        var option2 = {
          color: ['#6bbda8', '#50acdb', '#e4ad64'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          title: {
            text: '上传下发分享统计',
            x: 'center',
            textStyle: {
              fontSize: "16",
              fontWeight: "normal",
              color: "#ddd"
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: ['上传', '下发', '分享'],
            padding: [20, 10],
            left: 'right',
          },
          xAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            // name:"数量",
            axisLabel: {
              formatter: '{value} 个'
            }
          }],
          series: [{
              name: '上传',
              type: 'bar',
              data: [10, 52, 200, 334, 1000, 330, 220]
            },
            {
              name: '下发',
              type: 'bar',
              data: [19, 52, 200, 334, 390, 330, 220]
            },
            {
              name: '分享',
              type: 'bar',
              data: [15, 52, 200, 334, 390, 330, 220]
            }
          ]
        };
        chart2.setOption(option2);
        window.onresize = function() {
          setTimeout(()=>{
            chart1.resize();
          },300)
            
            chart2.resize();
        
          
        }
      }
    },
    mounted() {
      this.drawCharts()
    },
    created() {}
  }
</script>

<style>

</style>
